"use client";

import { SigninResponseDto } from "@/types/auth";
import { endpoints } from "@/lib/endpoints";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

export function useUser() {
  const router = useRouter();

  let user: SigninResponseDto | null = null;
  if (typeof window !== "undefined") {
    const userJson = localStorage.getItem(endpoints.auth.signin);
    if (userJson) {
      try {
        user = JSON.parse(userJson);
      } catch (e) {
        // Malformed JSON, treat as no user
      }
    }
  }

  useEffect(() => {
    if (!user) {
      toast.error("User not logged in, redirecting to login page...");
      router.push("/sign-in");
    }
  }, [user, router]);

  return {
    token: user?.token ?? null,
    refresh_token: user?.refresh_token ?? null,
  };
}
