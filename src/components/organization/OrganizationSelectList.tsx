"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Organization, User } from "@/drizzle/schema";

export default function OrganizationSelectList({
  organizations,
  user,
  activeOrg,
}: {
  organizations: Pick<Organization, "id" | "name" | "slug" | "logo">[];
  user: User | undefined;
  activeOrg: Pick<Organization, "id" | "name" | "slug" | "logo"> | null;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
