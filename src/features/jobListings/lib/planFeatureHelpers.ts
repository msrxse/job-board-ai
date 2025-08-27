import { db } from "@/drizzle/db";
import { JobListingTable } from "@/drizzle/schema";
import { getJobListingOrganizationTag } from "@/features/jobListings/db/cache/JobListings";
import { getActiveOrganization } from "@/services/betterAuth/lib/getCurrentAuth";
import { hasPlanFeature } from "@/services/betterAuth/lib/planFeatures";
import { and, count, eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export async function hasReachedMaxFeaturedJobListings() {
  const organization = await getActiveOrganization();
  if (organization == null) return true;

  const count = await getPublishedJobListingsCount(organization.id);

  const canFeature = await Promise.all([
    hasPlanFeature("post_1_job_listing").then((has) => has && count < 1),
    hasPlanFeature("post_3_job_listings").then((has) => has && count < 3),
    hasPlanFeature("post_15_job_listings").then((has) => has && count < 15),
  ]);

  // is any value in this array equal to TRUE?
  return !canFeature.some(Boolean);
}

async function getPublishedJobListingsCount(orgId: string) {
  "use cache";
  cacheTag(getJobListingOrganizationTag(orgId));

  const [res] = await db
    .select({ count: count() })
    .from(JobListingTable)
    .where(
      and(
        eq(JobListingTable.organizationId, orgId),
        eq(JobListingTable.status, "published")
      )
    );
  return res?.count ?? 0;
}
