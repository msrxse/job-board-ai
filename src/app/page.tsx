import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebarClient } from "@/app/_AppSidebarClient";
import Link from "next/link";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SidebarUserButton } from "@/features/users/components/SidebarUserButton";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarClient>
        <Sidebar collapsible="icon" className="overflow-hidden">
          <SidebarHeader className="flex-row">
            <SidebarTrigger />
            <span className="text-xl text-nowrap">Job board</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {session ? (
                  <p>{session.user.name}</p>
                ) : (
                  // <SidebarMenuItem>
                  //   <SidebarMenuButton asChild>
                  //     <Link href={"logout"}>
                  //       <LogOutIcon />
                  //       <span>Log Out</span>
                  //     </Link>
                  //   </SidebarMenuButton>
                  // </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={"login"}>
                        <LogInIcon />
                        <span>Log In</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarUserButton />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1">Main content</main>
      </AppSidebarClient>
    </SidebarProvider>
  );
}
