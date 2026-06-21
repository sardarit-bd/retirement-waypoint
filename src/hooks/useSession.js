"use client";

import { useEffect, useState, useCallback } from "react";
import { getSession, authClient } from "@/lib/auth-client";

export function useSession() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSession = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getSession();
      setSession(result.data || null);
      setError(null);
      return result.data || null;
    } catch (err) {
      setError(err.message || "Failed to fetch session");
      setSession(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial load
    fetchSession();

    // ✅ Listen for auth state changes (sign in / sign out) - with null check
    let unsubscribe = null;
    try {
      if (authClient?.$store && typeof authClient.$store.listen === "function") {
        unsubscribe = authClient.$store.listen((state) => {
          // When session store changes, update state
          const newSession = state?.data?.session || null;
          setSession(newSession);
          setIsLoading(false);
        });
      } else {
        // Fallback: use polling or custom events
        console.warn("authClient.$store.listen not available, using fallback");
      }
    } catch (err) {
      console.warn("Failed to subscribe to auth store:", err);
    }

    // ✅ Also listen for storage events (for cross-tab sync)
    const handleStorageChange = (event) => {
      if (event.key === "better-auth.session" || event.key === "better-auth") {
        fetchSession();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // ✅ Listen for custom events (for sign out / sign in)
    const handleAuthEvent = () => {
      fetchSession();
    };
    window.addEventListener("auth:state-change", handleAuthEvent);

    // ✅ Listen for visibility change (tab focus)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchSession();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe();
      }
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth:state-change", handleAuthEvent);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchSession]);

  return {
    session,
    isLoading,
    error,
    refetch: fetchSession,
    user: session?.user || null,
  };
}