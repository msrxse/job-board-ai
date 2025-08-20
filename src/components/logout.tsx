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
    <button
      onClick={handleLogout}
      className="flex py-1 ml-1 items-center gap-2"
    >
      <LogOut className="size-4" /> Log Out
    </button>
  );
}
