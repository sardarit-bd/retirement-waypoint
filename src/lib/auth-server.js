import { getSession } from "@/lib/auth-client";

export async function getServerSession(requestHeaders) {
  const cookie = requestHeaders.get("cookie");

  try {
    return await getSession({
      fetchOptions: {
        headers: cookie ? { cookie } : {},
        cache: "no-store",
      },
    });
  } catch (error) {
    console.error("Unable to validate the Better Auth session:", error);
    return { data: null, error };
  }
}

export async function getServerPrincipal(requestHeaders) {
  const session = await getServerSession(requestHeaders);
  return session?.data?.user || null;
}
