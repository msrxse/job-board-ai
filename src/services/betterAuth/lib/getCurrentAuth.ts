import { db } from "@/drizzle/db";
import { member, organization, user } from "@/drizzle/schema";
import { getOrganizationGlobalTag } from "@/features/organizations/db/cache/organizations";
import { getUserIdTag } from "@/features/users/db/cache/users";
import { auth } from "@/lib/auth";
import { eq, inArray, sql } from "drizzle-orm";
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

// export async function getCurrentOrganization() {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!session) throw new Error("Not authenticated");
//   const userId = session.user.id;

//   return await getOrganization(userId);
// }

export async function getAllOrganizationsByUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Not authenticated");
  const userId = session.user.id;

  return await getAllOrganizations(userId);
}

/**
 * By default getFullOrganization will use the active organization.
 */
export async function getActiveOrganization() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Not authenticated");

  const data = await auth.api.getFullOrganization({
    headers: await headers(),
  });

  if (data == null) return null;

  return {
    id: data.id,
    name: data.name,
    slug: data.slug || null,
    logo: data.logo || null,
  };
}

export async function getUser(id: string) {
  "use cache";
  cacheTag(getUserIdTag(id));

  return db.query.user.findFirst({
    where: eq(user.id, id),
  });
}

// export async function getOrganization(id: string) {
//   "use cache";
//   cacheTag(getOrganizationIdTag(id));

//   const orgs = await db
//     .select({
//       id: organization.id,
//       name: organization.name,
//       logo: organization.logo,
//     })
//     .from(member)
//     .innerJoin(organization, eq(member.organizationId, organization.id))
//     .where(eq(member.userId, id));

//   const org = orgs[0] ?? null;
//   return org;
// }

export async function getAllOrganizations(id: string) {
  "use cache";
  cacheTag(getOrganizationGlobalTag());

  const userOrgs = await db
    .select({
      orgId: member.organizationId,
    })
    .from(member)
    .where(eq(member.userId, id));

  const userOrgIds = userOrgs.map((o) => o.orgId);

  const result = await db
    .select({
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      logo: organization.logo,
    })
    .from(organization)
    .where(
      userOrgs.length > 0 ? inArray(organization.id, userOrgIds) : sql`false`
    );

  return result;
}

export async function getFirstOrganization(userId: string) {
  const memberUser = await db.query.member.findFirst({
    where: eq(member.userId, userId),
  });

  if (!memberUser) {
    return null;
  }

  const activeOrganization = await db.query.organization.findFirst({
    where: eq(organization.id, memberUser.organizationId),
  });

  return activeOrganization;
}
