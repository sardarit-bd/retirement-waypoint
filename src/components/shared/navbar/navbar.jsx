"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Assessment", href: "/assessment" },
    { name: "Resources", href: "/resources" },
    { name: "Book", href: "/book" },
    { name: "Coaching", href: "/coaching" },
    { name: "Contact", href: "/contact" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = () => {
        setIsDrawerOpen(false);
    };

    return (
        <>
            <header className="fixed left-0 right-0 top-5 z-50 px-4">
                <div
                    className={`mx-auto max-w-7xl rounded-full border border-white/20 transition-all duration-300 ${scrolled
                        ? "bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
                        : "bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
                        }`}
                >
                    <div className="flex h-16 items-center justify-between px-5 sm:px-6 lg:px-8">
                        {/* Logo */}
                        <Link href="/" className="group shrink-0 cursor-pointer">
                            <span className="text-base font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-white/80 sm:text-lg md:text-xl">
                                Retirement Waypoint
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden items-center gap-1 md:flex">
                            {navLinks.map(({ name, href }) => (
                                <Link
                                    key={name}
                                    href={href}
                                    className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-all duration-300 hover:bg-white/10 hover:text-white lg:text-base"
                                >
                                    {name}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden md:block">
                            <Button
                                className="cursor-pointer rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#04103A] shadow-lg transition-all duration-300 hover:bg-white/90 hover:shadow-xl lg:text-base"
                                asChild
                            >
                                <Link href="/assessment">Take Assessment</Link>
                            </Button>
                        </div>

                        {/* Mobile Menu */}
                        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Open menu"
                                    className="cursor-pointer rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20 hover:text-white md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent
                                side="right"
                                className="w-[290px] border-l border-white/20 bg-[#04103A]/90 p-0 text-white backdrop-blur-2xl sm:w-[360px]"
                            >
                                <div className="flex h-full flex-col">
                                    <div className="border-b border-white/10 px-6 py-6">
                                        <span className="text-xl font-semibold tracking-tight text-white">
                                            Retirement Waypoint
                                        </span>
                                    </div>

                                    <nav className="flex-1 px-4 py-6">
                                        <div className="flex flex-col gap-2">
                                            {navLinks.map(({ name, href }) => (
                                                <Link
                                                    key={name}
                                                    href={href}
                                                    onClick={handleLinkClick}
                                                    className="cursor-pointer rounded-2xl px-4 py-3 text-base font-medium text-white/85 transition-all duration-300 hover:bg-white/10 hover:text-white"
                                                >
                                                    {name}
                                                </Link>
                                            ))}
                                        </div>
                                    </nav>

                                    <div className="border-t border-white/10 px-6 py-6">
                                        <Link
                                            href="/assessment"
                                            onClick={handleLinkClick}
                                            className="flex w-full cursor-pointer items-center justify-center rounded-full
    bg-white py-3 text-base font-semibold text-[#04103A]
    shadow-lg transition-all duration-300
    hover:bg-white/90"
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