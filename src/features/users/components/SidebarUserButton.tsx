import { SidebarUserButtonClient } from "./_SidebarUserButtonClient";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import Logout from "@/services/betterAuth/components/logout";
import { Suspense } from "react";
import { getCurrentUser } from "@/services/betterAuth/lib/getCurrentAuth";

/**
 * To avoid this problem: (only in this canary version of NextJS)
 *
 * Error: Route "/employer": A component accessed data, headers, params, searchParams, or
 * a short-lived cache without a Suspense boundary nor a "use cache" above it.
 */
export function SidebarUserButton() {
  return (
    <Suspense>
      <SidebarUserSuspense />
    </Suspense>
  );
}

export async function SidebarUserSuspense() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <SidebarMenuButton asChild>
        <Logout />
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarUserButtonClient user={{ ...user, image: user.image || "" }} />
  );
}
