import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerPrincipal } from "@/lib/auth-server";

export default async function AuthCallbackPage() {
  const principal = await getServerPrincipal(await headers());

  if (!principal) {
    redirect("/auth");
  }

  redirect(principal.role === "admin" ? "/admin" : "/dashboard");
}
