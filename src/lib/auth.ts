import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { env } from "@/data/env/server";

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
  plugins: [nextCookies()], // make sure this is the last plugin in the array
});
