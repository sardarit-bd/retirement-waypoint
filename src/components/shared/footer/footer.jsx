"use client";

import Link from "next/link";

import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Assessment", href: "/assessment" },
  { label: "Resources", href: "/resources" },
  { label: "Book", href: "/book" },
];

const supportLinks = [
  { label: "Coaching", href: "/coaching" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
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
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#C9A84C]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block cursor-pointer text-2xl font-bold tracking-tight"
            >
              Retirement Waypoint
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              Helping professionals navigate retirement with confidence,
              purpose, clarity, and emotional readiness.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  target="_blank"
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:border-[#C9A84C]/40 hover:bg-[#C9A84C] hover:text-[#1B2B4B]"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="cursor-pointer text-sm text-white/70 transition-colors duration-300 hover:text-[#C9A84C]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Support
            </h3>

            <ul className="mt-5 space-y-3">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="cursor-pointer text-sm text-white/70 transition-colors duration-300 hover:text-[#C9A84C]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <FiMail className="mt-0.5 h-5 w-5 text-[#C9A84C]" />

                <p className="text-sm text-white/70">
                  dave@retirementwaypoint.com
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone className="mt-0.5 h-5 w-5 text-[#C9A84C]" />

                <p className="text-sm text-white/70">
                  +1 (000) 000-0000
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="mt-0.5 h-5 w-5 text-[#C9A84C]" />

                <p className="text-sm text-white/70">
                  Rosarito Beach, México
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Retirement Waypoint. All rights
              reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/privacy-policy"
                className="cursor-pointer text-sm text-white/60 transition-colors duration-300 hover:text-[#C9A84C]"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="cursor-pointer text-sm text-white/60 transition-colors duration-300 hover:text-[#C9A84C]"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;