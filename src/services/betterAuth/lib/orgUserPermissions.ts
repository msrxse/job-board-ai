import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type JobListingApplication = "change_rating" | "change_stage";
type JobListings = "create" | "update" | "change_status" | "delete";
type BasePermission = {
  job_listing_application?: JobListingApplication[];
  job_listings?: JobListings[];
};

type UserPermission =
  | (BasePermission & { job_listing_application: JobListingApplication[] })
  | (BasePermission & { job_listings: JobListings[] });

export async function hasOrgUserPermission(permission: UserPermission) {
  await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: { ...permission },
    },
  });
}
