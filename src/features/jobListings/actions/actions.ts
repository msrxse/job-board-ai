"use server";

import { db } from "@/drizzle/db";
import { JobListingTable } from "@/drizzle/schema";
import { jobListingSchema } from "@/features/jobListings/actions/schemas";
import { getJobListingIdTag } from "@/features/jobListings/db/cache/JobListings";
import {
  insertJobListing,
  updateJobListing as updateJobListingDb,
} from "@/features/jobListings/db/JobListing";
import { getActiveOrganization } from "@/services/betterAuth/lib/getCurrentAuth";
import { and, eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { redirect } from "next/navigation";
import z from "zod";

export async function createJobListing(
  unsafeData: z.infer<typeof jobListingSchema>
) {
  const organization = await getActiveOrganization();

  if (organization == null) {
    return {
      error: true,
      message: "You don't have permission to create a job listing",
    };
  }

  const { success, data } = jobListingSchema.safeParse(unsafeData);

  if (!success) {
    return {
      error: true,
      message: "There was an error creating your job listing",
    };
  }

  const jobListing = await insertJobListing({
    ...data,
    organizationId: organization.id,
    status: "draft",
  });

  redirect(`/employer/job-listings/${jobListing.id}`);
}

export async function updateJobListing(
  id: string,
  unsafeData: z.infer<typeof jobListingSchema>
) {
  const organization = await getActiveOrganization();

  if (organization == null) {
    return {
      error: true,
      message: "You don't have permission to create a job listing",
    };
  }

  const { success, data } = jobListingSchema.safeParse(unsafeData);

  if (!success) {
    return {
      error: true,
      message: "There was an error creating your job listing",
    };
  }

  const jobListing = getJobListing({ id, orgId: organization.id });

  if (jobListing == null) {
    return {
      error: true,
      message: "There was an error updating your job listing",
    };
  }

  const updatedJobListing = await updateJobListingDb(id, data);

  redirect(`/employer/job-listings/${updatedJobListing.id}`);
}

async function getJobListing({ id, orgId }: { id: string; orgId: string }) {
  "use cache";
  cacheTag(getJobListingIdTag(id));

  return db.query.JobListingTable.findFirst({
    where: and(
      eq(JobListingTable.id, id),
      eq(JobListingTable.organizationId, orgId)
    ),
  });
}
