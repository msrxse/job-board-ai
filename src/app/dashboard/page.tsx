import Logout from "@/components/logout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center max-w-2xl mx-auto">
      <h1 className="font-bold text-2xl">Welcome {session?.user.name}</h1>
      <p>This is your dashboard</p>
      <Logout />
    </div>
  );
}
