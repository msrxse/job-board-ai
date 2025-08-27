import { organization } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { db } from "@/drizzle/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { env } from "@/data/env/client";
import {
  ac,
  admin,
  applicant_manager,
  job_listing_manager,
} from "@/drizzle/permissions";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [
    organization({
      ac,
      roles: {
        admin,
        applicant_manager,
        job_listing_manager,
      },
    }),
    nextCookies(),
  ], // make sure this is the last plugin in the array
});
