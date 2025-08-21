import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema";
import { getOrganizationIdTag } from "@/features/organizations/db/cache/organizations";
import { getUserIdTag } from "@/features/users/db/cache/users";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { headers } from "next/headers";

export async function getCurrentUser({ allData = false } = {}) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers
  });
  if (!session) throw new Error("Not authenticated");
  const userId = session.user.id;

  return {
    userId,
    user: allData ? await getUser(userId) : undefined,
  };
}

export async function getCurrentOrganization({ allData = false } = {}) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers
  });
  if (!session) throw new Error("Not authenticated");
  const userId = session.user.id;

  return {
    userId,
    organization: allData ? await getOrganization(userId) : undefined,
  };
}

/**
 * Get user  - must be of type=user
 */
export async function getUser(id: string) {
  "use cache";
  cacheTag(getUserIdTag(id));

  return db.query.user.findFirst({
    where: and(eq(user.id, id), eq(user.type, "user")),
  });
}
/**
 * Get organization === user of type 'organization'
 */
export async function getOrganization(id: string) {
  "use cache";
  cacheTag(getOrganizationIdTag(id));

  return db.query.user.findFirst({
    where: and(eq(user.id, id), eq(user.type, "organization")),
  });
}
