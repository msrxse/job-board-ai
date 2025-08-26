import OrganizationListCard from "@/features/organizations/components/OrganizationListCard";
import PersonalAccountListCard from "@/features/organizations/components/PersonalAccountListCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Organization, User } from "@/drizzle/schema";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

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
        <CardTitle>Organizations</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <PersonalAccountListCard user={user} />
        <h2 className="text-lg font-bold">Your organizations</h2>
        {organizations.map((org) => (
          <OrganizationListCard
            key={org.id}
            organization={org}
            activeOrgId={activeOrg ? activeOrg.id : ""}
          />
        ))}
      </CardContent>
      <CardFooter>
        <Link href="/organizations/create">
          <div className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-muted">
            <PlusCircleIcon size={17} />
            <p>Create Organization</p>
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
}
