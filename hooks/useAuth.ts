"use client";

import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    session,
    user: session?.user,
    isAuthenticated: !!session,
    isLoading: status === "loading",
    accessToken: session?.accessToken,
    isEmailVerified: session?.user?.emailVerified,
  };
}
