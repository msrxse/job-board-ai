import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import {
  ac,
  admin,
  applicant_manager,
  job_listing_manager,
} from "@/drizzle/permissions";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    organizationClient({
      ac,
      roles: {
        admin,
        applicant_manager,
        job_listing_manager,
      },
    }),
  ],
});
