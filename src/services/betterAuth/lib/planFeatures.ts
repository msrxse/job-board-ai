type PlanFeature =
  | "post_1_job_listing"
  | "post_3_job_listings"
  | "post_15_job_listings"
  | "unlimited_featured_jobs_listings"
  | "1_featured_job_listing";

export async function hasPlanFeature(feature: PlanFeature) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return true;
}
