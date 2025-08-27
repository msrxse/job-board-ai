import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements,
  // A user who can change the rating/stage of an applicant for all job listings
  job_listing_application: ["change_rating", "change_stage"],
  // A user who is allowed to publish job listings and mark job listings as featured
  job_listings: ["create", "update", "change_status", "delete"],
} as const;

const ac = createAccessControl(statement);

const admin = ac.newRole({
  job_listing_application: ["change_rating", "change_stage"],
  job_listings: ["create", "update", "change_status", "delete"],
});

// A user who can approve/deny applicants
// and update applicant details for all job listings
const applicant_manager = ac.newRole({
  job_listing_application: ["change_rating", "change_stage"],
});

// A user who can create, update, delete and update
// the status of a job listing
const job_listing_manager = ac.newRole({
  job_listings: ["create", "update", "change_status", "delete"],
});

export { ac, admin, applicant_manager, job_listing_manager, statement };
