import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerPrincipal } from "@/lib/auth-server";

export default async function AuthCallbackPage({ searchParams }) {
  const principal = await getServerPrincipal(await headers());
  const resolvedSearchParams = await searchParams;
  const redirectUrl = resolvedSearchParams?.redirect;

  if (!principal) {
    redirect(
      redirectUrl
        ? `/auth?redirect=${encodeURIComponent(redirectUrl)}`
        : "/auth",
    );
  }

  redirect(
    redirectUrl || (principal.role === "admin" ? "/admin" : "/dashboard"),
  );
}
