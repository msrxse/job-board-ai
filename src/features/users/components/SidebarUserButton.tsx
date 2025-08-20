import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SidebarUserButtonClient } from "./_SidebarUserButtonClient";

export async function SidebarUserButton() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    return null;
  }

  return (
    <SidebarUserButtonClient
      user={{ ...session.user, image: session.user.image || "" }}
    />
  );
}
