import AppSidebar from "@/components/sidebar/AppSidebar";
import { SidebarNavMenuGroup } from "@/components/sidebar/SidebarNavMenuGroup";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarUserButton } from "@/features/users/components/SidebarUserButton";
import {
  BrainCircuitIcon,
  Clipboard,
  LayoutDashboard,
  LogInIcon,
} from "lucide-react";

/**
 * About signedIn and signedOut:
 *  - SignedIn: SHow only when signed in
 *  - signedOut: Show only when signed out
 */
export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppSidebar
      content={
        <SidebarNavMenuGroup
          className="mt-auto"
          items={[
            {
              href: "/",
              icon: <Clipboard />,
              label: "Job Board",
            },
            {
              href: "/ai-search",
              icon: <BrainCircuitIcon />,
              label: "AI Search",
            },
            {
              href: "/employer",
              icon: <LayoutDashboard />,
              label: "Employer Dashboard",
              authStatus: "signedIn",
            },
            {
              href: "/signin",
              icon: <LogInIcon />,
              label: "Sign In",
              authStatus: "signedOut",
            },
          ]}
        />
      }
      footerButton={<SidebarUserButton />}
    >
      {children}
    </AppSidebar>
  );
}
