"use client";

import { Button } from "@/components/ui/button";
import { Organization } from "@/drizzle/schema/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function OrganizationListCard({
  organization,
  activeOrgId,
}: {
  organization: Pick<Organization, "id" | "name" | "slug" | "logo">;
  activeOrgId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { id, name, slug, logo } = organization;
  const nameInitials = name
    .split(" ")
    .slice(0, 2)
    .map((str) => str[0])
    .join("");

  async function setActiveOrganization(
    organization: Pick<Organization, "id" | "name" | "slug" | "logo">
  ) {
    // set org as active
    try {
      setIsLoading(true);

      await authClient.organization.setActive({
        organizationId: organization.id,
        organizationSlug: organization.slug || "",
      });

      toast.success("Organization select successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to select organization");
    } finally {
      setIsLoading(false);

      redirect("/employer");
    }
  }

  return (
    <Button
      variant={activeOrgId === id ? "default" : "outline"}
      disabled={activeOrgId === id}
      className="py-6 cursor-pointer hover:bg-muted disabled:cursor-not-allowed disabled:hover:bg-inherit"
      onClick={() => setActiveOrganization(organization)}
    >
      <article className="flex gap-6 rounded-2xl w-full">
        <Avatar className="size-10">
          <AvatarImage src={logo || ""} alt={name} className="rounded-xl" />
          <AvatarFallback className="uppercase bg-primary text-primary-foreground">
            {nameInitials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 items-center">
          <div className="flex flex-col leading-tight">
            <span className="truncate text-sm font-semibold">{name}</span>
            <span className="truncate text-xs">{slug}</span>
          </div>
          <div className="ml-auto">
            {isLoading && <Loader2 className="size-4 animate-spin" />}
          </div>
        </div>
      </article>
    </Button>
  );
}
