import { db } from "@/drizzle/db";
import { member, organization, user } from "@/drizzle/schema";
import { getOrganizationIdTag } from "@/features/organizations/db/cache/organizations";
import { getUserIdTag } from "@/features/users/db/cache/users";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { headers } from "next/headers";

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Not authenticated");
  const userId = session.user.id;

  return await getUser(userId);
}

export async function getCurrentOrganization() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Not authenticated");
  const userId = session.user.id;

  return await getOrganization(userId);
}

export async function getUser(id: string) {
  "use cache";
  cacheTag(getUserIdTag(id));

  return db.query.user.findFirst({
    where: eq(user.id, id),
  });
}

export async function getOrganization(id: string) {
  "use cache";
  cacheTag(getOrganizationIdTag(id));

  const orgs = await db
    .select({
      id: organization.id,
      name: organization.name,
      logo: organization.logo,
    })
    .from(member)
    .innerJoin(organization, eq(member.organizationId, organization.id))
    .where(eq(member.userId, id));

  const org = orgs[0] ?? null;
  return org;
}
