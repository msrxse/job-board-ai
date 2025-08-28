import { SidebarOrganizationButtonClient } from "./_SidebarOrganizationButtonClient";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import Logout from "@/services/betterAuth/components/logout";
import { Suspense } from "react";
import {
  getActiveOrganization,
  getCurrentUser,
} from "@/services/betterAuth/lib/getCurrentAuth";

/**
 * To avoid this problem: (only in this canary version of NextJS)
 *
 * Error: Route "/employer": A component accessed data, headers, params, searchParams, or
 * a short-lived cache without a Suspense boundary nor a "use cache" above it.
 */
export function SidebarOrganizationButton() {
  return (
    <Suspense>
      <SidebarOrganizationSuspense />
    </Suspense>
  );
}

export async function SidebarOrganizationSuspense() {
  const [user, organization] = await Promise.all([
    getCurrentUser(),
    getActiveOrganization(),
  ]);

  if (!organization || !user) {
    return (
      <SidebarMenuButton asChild>
        <Logout />
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarOrganizationButtonClient
      user={{ ...user, image: user.image || "" }}
      organization={{ ...organization, logo: organization.logo || "" }}
    />
  );
}
