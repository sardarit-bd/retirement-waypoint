"use client";

import { useSession as useBetterAuthSession } from "@/lib/auth-client";

export function useSession() {
  const {
    data: session,
    error,
    isPending,
    isRefetching,
    refetch,
  } = useBetterAuthSession();

  return {
    session,
    isLoading: isPending || isRefetching,
    error,
    refetch,
    user: session?.user || null,
  };
}
