"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  ChevronDown,
  User,
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  FileText,
  Star,
  Settings,
  LogOut,
  Users,
  BarChart3,
  BookMarked,
  ShoppingCart,
  Ticket,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { themeChangeSections } from "@/lib/themeChangeSections";
import { navLinks } from "@/lib/navLinks";
import { signOut } from "@/lib/auth-client";
import { useSession } from "@/hooks/useSession";
import toast from "react-hot-toast";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { session, isLoading } = useSession();
  const user = session?.user || null;
  const isAuthenticated = !!user;

  const [scrolled, setScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [darkNavbar, setDarkNavbar] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleNavbarColor = () => {
      const navbarPosition = window.scrollY + 90;

      const activeSection = themeChangeSections.some((id) => {
        const section = document.getElementById(id);

        if (!section) return false;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        return navbarPosition >= top && navbarPosition <= bottom;
      });

      setDarkNavbar(activeSection);
    };

    handleNavbarColor();

    window.addEventListener("scroll", handleNavbarColor);
    window.addEventListener("resize", handleNavbarColor);

    return () => {
      window.removeEventListener("scroll", handleNavbarColor);
      window.removeEventListener("resize", handleNavbarColor);
    };
  }, []);

  const handleLinkClick = () => {
    setIsDrawerOpen(false);
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("👋 You have been signed out successfully.");

            setIsDrawerOpen(false);

            window.location.href = "/";
          },

          onError: (ctx) => {
            toast.error(ctx.error?.message || "Failed to sign out.");
          },
        },
      });
    } catch (error) {
      toast.error("Something went wrong during sign out.", {
        duration: 5000,
        position: "top-right",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const desktopNavTextClass = darkNavbar
    ? "text-[#1B2B4B]/85 hover:bg-[#1B2B4B]/10 hover:text-[#1B2B4B]"
    : "text-white/85 hover:bg-white/10 hover:text-white";

  const buttonClass = darkNavbar
    ? "border-[#1B2B4B]/20 bg-white/70 text-[#1B2B4B] hover:bg-white hover:text-[#1B2B4B]"
    : "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white";

  // Profile dropdown items
  const profileItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "My Books", href: "/my-books" },
    { icon: ShoppingBag, label: "Orders", href: "/orders" },
    { icon: FileText, label: "Invoices", href: "/invoices" },
    { icon: Star, label: "Reviews", href: "/reviews" },
    { icon: Settings, label: "Profile Settings", href: "/profile" },
  ];

  const adminItems = [
    { icon: LayoutDashboard, label: "Admin Dashboard", href: "/admin" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: BookMarked, label: "Books Management", href: "/admin/books" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: Ticket, label: "Coupons", href: "/admin/coupons" },
    { icon: RefreshCw, label: "Refunds", href: "/admin/refunds" },
    { icon: Users, label: "Users", href: "/admin/users" },
  ];

  const isAdmin = user?.role === "admin";

  return (
    <>
      <header className="fixed left-0 right-0 top-5 z-50 px-4">
        <div
          className={`mx-auto max-w-7xl rounded-full transition-all duration-300 ${darkNavbar
              ? "border border-[#1B2B4B]/10 bg-white/85 shadow-[0_8px_32px_rgba(27,43,75,0.14)] backdrop-blur-2xl"
              : scrolled
                ? "border border-white/20 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
                : "border border-white/20 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
            }`}
        >
          <div className="flex h-18 items-center justify-between px-5 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link href="/" className="group shrink-0 cursor-pointer">
              <Image
                src={darkNavbar ? "/logo-02.png" : "/logo-01.png"}
                alt="Retirement Waypoint Logo"
                width={180}
                height={50}
                className="h-19 w-auto transition-opacity duration-300 group-hover:opacity-80"
                priority
              />
            </Link>

            {/* Desktop Version */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 lg:text-base ${isActiveLink(href)
                      ? darkNavbar
                        ? "bg-[#1B2B4B]/10 text-[#1B2B4B]"
                        : "bg-white/15 text-white"
                      : desktopNavTextClass
                    }`}
                >
                  {name}
                </Link>
              ))}

              {/* Profile Section - Desktop */}
              <div className="ml-2">
                {isLoading ? (
                  // Loading skeleton
                  <div className="h-10 w-10 rounded-full bg-white/10 animate-pulse" />
                ) : isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`flex items-center gap-2 rounded-full border px-2 py-1.5 transition-all duration-300 hover:bg-white/10 ${darkNavbar
                            ? "border-[#1B2B4B]/20 bg-white/70 text-[#1B2B4B] hover:bg-[#1B2B4B]/10"
                            : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                          }`}
                      >
                        <Avatar className="h-8 w-8 border-2 border-white/20">
                          <AvatarImage src={user?.profileImage || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-semibold text-white">
                            {getInitials(user?.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden text-sm font-medium lg:inline">
                          {user?.name?.split(" ")[0]}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-60" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 border-white/10 bg-slate-900/20 backdrop-blur-3xl text-white shadow-2xl"
                    >
                      <DropdownMenuLabel className="flex items-center gap-2 p-3">
                        <Avatar className="h-8 w-8 border-2 border-white/20">
                          <AvatarImage src={user?.profileImage || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-semibold text-white">
                            {getInitials(user?.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate text-sm font-medium text-white">
                            {user?.name}
                          </span>

                          <span
                            className="truncate text-xs text-slate-400"
                            title={user?.email}
                          >
                            {user?.email}
                          </span>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white/10" />

                      {/* Regular User Items */}
                      {profileItems.map((item) => (
                        <DropdownMenuItem key={item.label} asChild>
                          <Link
                            href={item.href}
                            className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}

                      {/* Admin Items */}
                      {isAdmin && (
                        <>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuLabel className="px-3 py-1.5 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Admin
                          </DropdownMenuLabel>
                          {adminItems.map((item) => (
                            <DropdownMenuItem key={item.label} asChild>
                              <Link
                                href={item.href}
                                className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                              >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </>
                      )}

                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        {isSigningOut ? "Signing out..." : "Sign Out"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href="/auth"
                    className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${darkNavbar
                        ? "bg-[#1B2B4B] text-white hover:bg-[#1B2B4B]/90"
                        : "bg-white text-slate-950 hover:bg-white/90"
                      }`}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </nav>

            {/* Mobile Version */}
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className={`cursor-pointer rounded-full border backdrop-blur-xl transition-all duration-300 md:hidden ${darkNavbar
                      ? "border-[#1B2B4B]/20 bg-white/70 text-[#1B2B4B] hover:bg-white hover:text-[#1B2B4B]"
                      : "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    }`}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[290px] border-l border-white/20 bg-[#04103A]/95 p-0 text-white backdrop-blur-2xl sm:w-[360px]"
              >
                <div className="flex h-full flex-col">
                  {/* Mobile Logo */}
                  <div className="border-b border-white/10 px-6 py-5">
                    <Link
                      href="/"
                      onClick={handleLinkClick}
                      className="group inline-block cursor-pointer"
                    >
                      <Image
                        src="/logo-01.png"
                        alt="Retirement Waypoint Logo"
                        width={180}
                        height={50}
                        className="h-19 w-auto transition-opacity duration-300 group-hover:opacity-80"
                        priority
                      />
                    </Link>
                  </div>

                  {/* Mobile Profile Section */}
                  {!isLoading && isAuthenticated && (
                    <div className="border-b border-white/10 px-4 py-4">
                      <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
                        <Avatar className="h-12 w-12 border-2 border-white/20">
                          <AvatarImage src={user?.profileImage || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-base font-semibold text-white">
                            {getInitials(user?.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white">
                            {user?.name}
                          </span>
                          <span className="text-xs text-slate-400">
                            {user?.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Menu Links */}
                  <nav className="flex-1 overflow-y-auto px-4 py-4">
                    <div className="flex flex-col gap-1">
                      {navLinks.map(({ name, href }) => (
                        <Link
                          key={name}
                          href={href}
                          onClick={handleLinkClick}
                          className={`cursor-pointer rounded-xl px-4 py-3 text-base font-medium transition-all duration-300 ${isActiveLink(href)
                              ? "bg-white text-[#04103A] shadow-md"
                              : "text-white/85 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                          {name}
                        </Link>
                      ))}

                      {/* Mobile Auth Links */}
                      {!isLoading && (
                        <>
                          <div className="mt-2 border-t border-white/10 pt-2">
                            {isAuthenticated ? (
                              <>
                                {/* Mobile Profile Menu Items */}
                                {profileItems.map((item) => (
                                  <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-white/85 transition-all duration-300 hover:bg-white/10 hover:text-white"
                                  >
                                    <item.icon className="h-5 w-5" />
                                    {item.label}
                                  </Link>
                                ))}

                                {isAdmin && (
                                  <>
                                    <div className="mt-1 px-4 py-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
                                      Admin
                                    </div>
                                    {adminItems.map((item) => (
                                      <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={handleLinkClick}
                                        className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-white/85 transition-all duration-300 hover:bg-white/10 hover:text-white"
                                      >
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                      </Link>
                                    ))}
                                  </>
                                )}

                                <button
                                  onClick={handleSignOut}
                                  disabled={isSigningOut}
                                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-red-400 transition-all duration-300 hover:bg-red-500/10 hover:text-red-300"
                                >
                                  <LogOut className="h-5 w-5" />
                                  {isSigningOut ? "Signing out..." : "Sign Out"}
                                </button>
                              </>
                            ) : (
                              <Link
                                href="/auth"
                                onClick={handleLinkClick}
                                className="flex w-full cursor-pointer items-center justify-center rounded-full bg-white py-3 text-base font-semibold text-[#04103A] shadow-lg transition-all duration-300 hover:bg-white/90"
                              >
                                Sign In
                              </Link>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </nav>

                  {/* Mobile Bottom Button - Only show for unauthenticated */}
                  {!isLoading && !isAuthenticated && (
                    <div className="border-t border-white/10 px-6 py-6">
                      <Link
                        href="/assessment"
                        onClick={handleLinkClick}
                        className="flex w-full cursor-pointer items-center justify-center rounded-full bg-white py-3 text-base font-semibold text-[#04103A] shadow-lg transition-all duration-300 hover:bg-white/90"
                      >
                        Take Assessment
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="h-0" />
    </>
  );
};

export default Navbar;
