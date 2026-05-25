"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { themeChangeSections } from "@/lib/themeChangeSections";
import { navLinks } from "@/lib/navLinks";


const Navbar = () => {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [darkNavbar, setDarkNavbar] = useState(false);

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

  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const desktopNavTextClass = darkNavbar
    ? "text-[#1B2B4B]/85 hover:bg-[#1B2B4B]/10 hover:text-[#1B2B4B]"
    : "text-white/85 hover:bg-white/10 hover:text-white";

  return (
    <>
      <header className="fixed left-0 right-0 top-5 z-50 px-4">
        <div
          className={`mx-auto max-w-7xl rounded-full transition-all duration-300 ${
            darkNavbar
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
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 lg:text-base ${
                    isActiveLink(href)
                      ? darkNavbar
                        ? "bg-[#1B2B4B]/10 text-[#1B2B4B]"
                        : "bg-white/15 text-white"
                      : desktopNavTextClass
                  }`}
                >
                  {name}
                </Link>
              ))}
            </nav>

            {/* Mobile Version */}
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className={`cursor-pointer rounded-full border backdrop-blur-xl transition-all duration-300 md:hidden ${
                    darkNavbar
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

                  {/* Mobile Menu Links */}
                  <nav className="flex-1 px-4 py-6">
                    <div className="flex flex-col gap-2">
                      {navLinks.map(({ name, href }) => (
                        <Link
                          key={name}
                          href={href}
                          onClick={handleLinkClick}
                          className={`cursor-pointer rounded-2xl px-4 py-3 text-base font-medium transition-all duration-300 ${
                            isActiveLink(href)
                              ? "bg-white text-[#04103A] shadow-md"
                              : "text-white/85 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {name}
                        </Link>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Bottom Button */}
                  <div className="border-t border-white/10 px-6 py-6">
                    <Link
                      href="/assessment"
                      onClick={handleLinkClick}
                      className="flex w-full cursor-pointer items-center justify-center rounded-full bg-white py-3 text-base font-semibold text-[#04103A] shadow-lg transition-all duration-300 hover:bg-white/90"
                    >
                      Take Assessment
                    </Link>
                  </div>
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