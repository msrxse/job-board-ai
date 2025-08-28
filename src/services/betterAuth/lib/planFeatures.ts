type PlanFeature =
  | "post_1_job_listing"
  | "post_3_job_listings"
  | "post_15_job_listings"
  | "unlimited_featured_job_listings"
  | "1_featured_job_listing";

export async function hasPlanFeature(feature: PlanFeature) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (
    feature === "1_featured_job_listing" ||
    feature === "unlimited_featured_job_listings"
  ) {
    return false;
  }

  return true;
}
