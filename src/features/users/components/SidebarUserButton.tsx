import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SidebarUserButtonClient } from "./_SidebarUserButtonClient";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Logout from "@/components/logout";

export async function SidebarUserButton() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    return (
      <SidebarMenuButton>
        <Logout />
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarUserButtonClient
      user={{ ...session.user, image: session.user.image || "" }}
    />
  );
}
