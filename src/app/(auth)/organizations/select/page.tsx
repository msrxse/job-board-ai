import OrganizationSelectList from "@/components/organization/OrganizationSelectList";
import {
  getActiveOrganization,
  getAllOrganizationsByUser,
  getCurrentUser,
} from "@/services/betterAuth/lib/getCurrentAuth";
import { Suspense } from "react";

export default function OrganizationSelectPage() {
  return (
    <Suspense>
      <SuspendedPage />
    </Suspense>
  );
}

async function SuspendedPage() {
  const [user, orgs, activeOrg] = await Promise.all([
    getCurrentUser(),
    getAllOrganizationsByUser(),
    getActiveOrganization(),
  ]);

  return (
    <div className="w-full max-w-sm">
      <OrganizationSelectList
        organizations={orgs}
        user={user}
        activeOrg={activeOrg}
      />
    </div>
  );
}
