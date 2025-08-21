"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import {
  ArrowLeftRight,
  Building2,
  ChevronsUpDownIcon,
  CreditCard,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";
import Logout from "@/components/logout";
import { useRouter } from "next/navigation";

interface Organization {
  id: string;
  name: string;
  image: string;
  email: string;
}

export function SidebarOrganizationButtonClient({
  organization,
}: {
  organization: Organization;
}) {
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <OrganizationInfo organization={organization} />
          <ChevronsUpDownIcon className="ml-auto group-data-[state=collapsed]:hidden" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={4}
        side={isMobile ? "bottom" : "right"}
        className="min-w-64 max-w-80"
      >
        <DropdownMenuLabel className="font-normal">
          <OrganizationInfo organization={organization} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            setOpenMobile(false);
            router.push("/profile");
          }}
        >
          <Building2 className="mr-1" />
          Manage Organization
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/employer/user-settings">
            <UserRoundCog className="mr-1" />
            User Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/employer/pricing">
            <CreditCard className="mr-1" />
            Change Plan
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/organizations/select">
            <ArrowLeftRight className="mr-1" />
            Switch Organizations
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {organization.id && (
          <DropdownMenuItem>
            <Logout />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function OrganizationInfo({ organization }: { organization: Organization }) {
  const nameInitials = organization.name
    .split(" ")
    .slice(0, 2)
    .map((str) => str[0])
    .join("");

  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <Avatar className="rounded-lg size-8">
        <AvatarImage
          src={organization.image ?? undefined}
          alt={organization.name}
        />
        <AvatarFallback className="uppercase bg-primary text-primary-foreground">
          {nameInitials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-1 min-w-0 leading-tight group-data-[state=collapsed]">
        <span className="truncate text-sm font-semibold">
          {organization.name}
        </span>
        <span className="truncate text-xs">{organization.email}</span>
      </div>
    </div>
  );
}
