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
  ChevronsUpDownIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import Logout from "@/components/logout";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  image: string;
  email: string;
}

export function SidebarUserButtonClient({ user }: { user: User }) {
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <UserInfo {...user} />
          <ChevronsUpDownIcon className="ml-auto group-data-[state=collapsed]:hidden" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={4}
        side={isMobile ? "bottom" : "right"}
        className="min-w-64 max-w-80"
      >
        <DropdownMenuLabel className="font-normal">
          <UserInfo {...user} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            setOpenMobile(false);
            router.push("/profile");
          }}
        >
          <UserIcon className="mr-1" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/user-settings/notifications">
            <SettingsIcon className="mr-1" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {user.id && (
          <DropdownMenuItem>
            <Logout />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserInfo({ name, image, email }: User) {
  const nameInitials = name
    .split(" ")
    .slice(0, 2)
    .map((str) => str[0])
    .join("");

  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <Avatar className="rounded-lg size-8">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback className="uppercase bg-primary text-primary-foreground">
          {nameInitials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-1 min-w-0 leading-tight group-data-[state=collapsed]">
        <span className="truncate text-sm font-semibold">{name}</span>
        <span className="truncate text-xs">{email}</span>
      </div>
    </div>
  );
}
