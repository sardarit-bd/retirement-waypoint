import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-server";

export async function proxy(request) {
  const session = await getServerSession(request.headers);

  const isAuthenticated = !!session?.data;
  const role = session?.data?.user?.role || "user";
  const path = request.nextUrl.pathname;

  if (path === "/auth" && isAuthenticated) {
    const destination = role === "admin" ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  const protectedRoutes = [
    "/dashboard",
    "/admin",
    "/my-books",
    "/orders",
    "/invoices",
    "/reviews",
    "/profile",
    "/settings",
    "/assessments",
    "/refunds",
  ];

  if (
    protectedRoutes.some((route) => path.startsWith(route)) &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth",
    "/dashboard/:path*",
    "/admin/:path*",
    "/my-books/:path*",
    "/orders/:path*",
    "/invoices/:path*",
    "/reviews/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/assessments/:path*",
    "/refunds/:path*",
  ],
};