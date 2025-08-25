import OrganizationSelectList from "@/components/organization/OrganizationSelectList";
import {
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
  // const data = await getAllOrganizationsByUser();
  // const user = await getCurrentUser();

  const [user, orgs] = await Promise.all([
    getCurrentUser(),
    getAllOrganizationsByUser(),
  ]);

  return (
    <div className="w-full max-w-sm">
      <OrganizationSelectList organizations={orgs} user={user} />
    </div>
  );
}
