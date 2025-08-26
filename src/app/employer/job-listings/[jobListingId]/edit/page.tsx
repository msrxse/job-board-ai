import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { JobListingTable } from "@/drizzle/schema";
import { JobListingForm } from "@/features/jobListings/components/JobListingForm";
import { getJobListingIdTag } from "@/features/jobListings/db/cache/JobListings";
import { getActiveOrganization } from "@/services/betterAuth/lib/getCurrentAuth";
import { and, eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ jobListingId: string }>;
};

export default function EditJobListingPage(props: Props) {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl fond-bold mb-2">Edit Job listing</h1>
      <Card>
        <CardContent>
          <Suspense>
            <SuspendedPage {...props} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function SuspendedPage({ params }: Props) {
  const { jobListingId } = await params;
  const organization = await getActiveOrganization();

  if (organization == null) return notFound();

  const jobListing = await getJobListing({
    id: jobListingId,
    orgId: organization.id,
  });

  if (jobListing == null) return notFound();

  return <JobListingForm jobListing={jobListing} />;
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
