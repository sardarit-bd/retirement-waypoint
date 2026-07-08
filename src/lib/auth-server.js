function getRequestOrigin(requestHeaders) {
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
  const proto = requestHeaders.get("x-forwarded-proto") || "http";

  return host ? `${proto}://${host}` : null;
}

export async function getServerSession(requestHeaders) {
  const cookie = requestHeaders.get("cookie");
  const requestOrigin = getRequestOrigin(requestHeaders);
  const authBaseURL = requestOrigin ? `${requestOrigin}/api/auth` : null;

  if (!authBaseURL) {
    return { data: null, error: new Error("Unable to resolve auth origin") };
  }

  try {
    const response = await fetch(`${authBaseURL}/get-session`, {
      headers: cookie ? { cookie } : {},
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        data: null,
        error: new Error(`Unable to validate session: ${response.status}`),
      };
    }

    return { data: await response.json(), error: null };
  } catch (error) {
    console.error("Unable to validate the Better Auth session:", error);
    return { data: null, error };
  }
}

export async function getServerPrincipal(requestHeaders) {
  const session = await getServerSession(requestHeaders);
  return session?.data?.user || null;
}
