import { LoginForm } from "@/components/login-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full max-w-sm">
      <LoginForm />
    </div>
  );
}
