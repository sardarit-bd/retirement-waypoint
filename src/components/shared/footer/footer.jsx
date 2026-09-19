"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
} from "react-icons/fi";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Assessment", href: "/assessment" },
  { label: "Books", href: "/book" },
];

const supportLinks = [
  { label: "Coaching", href: "/coaching" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    icon: FiFacebook,
    href: "https://facebook.com",
  },
  {
    icon: FiInstagram,
    href: "https://instagram.com",
  },
  {
    icon: FiLinkedin,
    href: "https://linkedin.com",
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#1B2B4B] text-white">
      {/* Glow Effects */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#C9A84C]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#C9A84C]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 text-center lg:text-left items-center lg:items-start">
          {/* Brand Column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 lg:col-span-2">
            <Link href="/" className="cursor-pointer inline-block">
              <Image
                src="/logo-03.png"
                alt="Retirement Waypoint Logo"
                width={165}
                height={65}
                priority
                className="w-[155px] sm:w-[170px] h-auto object-contain mx-auto lg:mx-0"
              />
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
              Helping professionals navigate retirement with confidence,
              purpose, clarity, and emotional readiness.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
            <h4 className="text-white font-semibold text-base">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-slate-300 flex flex-col items-center lg:items-start">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="cursor-pointer transition-colors duration-200 hover:text-[#C9A84C]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
            <h4 className="text-white font-semibold text-base">Support</h4>
            <ul className="space-y-2.5 text-sm text-slate-300 flex flex-col items-center lg:items-start">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="cursor-pointer transition-colors duration-200 hover:text-[#C9A84C]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
            <h4 className="text-white font-semibold text-base">Contact</h4>
            <div className="space-y-2.5 text-sm text-slate-300">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-300">
                <FiMail className="h-4 w-4 text-[#C9A84C] shrink-0" />
                <a
                  href="mailto:dave@retirementwaypoint.com"
                  className="hover:text-[#C9A84C] transition-colors duration-200"
                >
                  dave@retirementwaypoint.com
                </a>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-300">
                <FiPhone className="h-4 w-4 text-[#C9A84C] shrink-0" />
                <a
                  href="tel:+17609600162"
                  className="hover:text-[#C9A84C] transition-colors duration-200"
                >
                  +1 (760) 960-0162
                </a>
              </div>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:border-[#C9A84C]/40 hover:bg-[#C9A84C] hover:text-[#1B2B4B]"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} Retirement Waypoint. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
