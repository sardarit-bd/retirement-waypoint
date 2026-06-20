"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/lib/auth-client";

export function useSession() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSession = async () => {
    try {
      setIsLoading(true);
      const result = await getSession();
      setSession(result.data || null);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch session");
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function loadSession() {
      try {
        setIsLoading(true);

        const result = await getSession();

        setSession(result.data || null);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch session");
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadSession();
  }, []);

  return {
    session,
    isLoading,
    error,
    refetch: fetchSession,
    user: session?.user || null,
  };
}
