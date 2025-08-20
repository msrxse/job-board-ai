"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut().then(() => router.push("/login"));
  };

  return (
    <Button variant="outline" onClick={handleLogout} className="gap-2">
      Logout <LogOut className="size-4" />
    </Button>
  );
}
