import { SidebarOrganizationButtonClient } from "./_SidebarOrganizationButtonClient";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import Logout from "@/components/logout";
import { Suspense } from "react";
import { getCurrentOrganization } from "@/services/betterAuth/lib/getCurrentAuth";

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
  const { organization } = await getCurrentOrganization({ allData: true });

  if (!organization) {
    return (
      <SidebarMenuButton asChild>
        <Logout />
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarOrganizationButtonClient
      organization={{ ...organization, image: organization.image || "" }}
    />
  );
}
