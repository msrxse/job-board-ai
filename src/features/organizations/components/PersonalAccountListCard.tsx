import { Button } from "@/components/ui/button";
import { User } from "@/drizzle/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PersonalAccountListCard({
  user,
}: {
  user: User | undefined;
}) {
  if (!user) return null;

  const { id, name, image } = user;

  const nameInitials = name
    .split(" ")
    .slice(0, 2)
    .map((str) => str[0])
    .join("");

  return (
    <Button
      variant="outline"
      asChild
      className={"py-6 hover:bg-muted cursor-pointer"}
    >
      <article className="flex gap-6 rounded-2xl">
        <Avatar className="size-10">
          <AvatarImage src={image || ""} alt={name} className="rounded-xl" />
          <AvatarFallback className="uppercase bg-primary text-primary-foreground">
            {nameInitials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1  min-width-0 leading-tight">
          <span className="truncate text-sm font-semibold">
            Personal Account
          </span>
          <span className="truncate text-xs ">{name}</span>
        </div>
      </article>
    </Button>
  );
}
