'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, ChevronDown, LogOut, User, Settings, Sparkles } from 'lucide-react';
import { useSession } from '@/hooks/useSession';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

export function DashboardHeader() {
  const { session } = useSession();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const user = session?.user;

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed out successfully');
            window.location.href = '/';
          },
          onError: (ctx) => {
            toast.error(ctx.error?.message || 'Failed to sign out');
          },
        },
      });
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 z-30 w-full"
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(27, 43, 75, 0.08)',
        boxShadow: '0 10px 40px rgba(4, 16, 58, 0.08)',
      }}
    >
      <div className="flex h-[72px] items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo-02.png"
            alt="Retirement Waypoint"
            width={140}
            height={48}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Search - Desktop */}
        <div className="hidden flex-1 max-w-md lg:block px-8">
          <motion.div
            animate={{ scale: isSearchFocused ? 1.02 : 1 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B2B4B]/40 transition-colors duration-200" />
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full rounded-[18px] border-0 bg-[#F8F5EF] py-2.5 pl-11 pr-4 text-sm text-[#1B2B4B] placeholder:text-[#1B2B4B]/40 outline-none ring-1 ring-transparent transition-all duration-200 focus:ring-[#C9A84C]/50"
            />
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="rounded-full p-2 text-[#1B2B4B]/60 transition-colors hover:bg-[#F8F5EF] hover:text-[#1B2B4B] lg:hidden"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-full p-2 text-[#1B2B4B]/60 transition-colors hover:bg-[#F8F5EF] hover:text-[#1B2B4B]"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          </motion.button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-full px-2 py-1.5 transition-all duration-300 hover:bg-[#F8F5EF]"
              >
                <Avatar className="h-9 w-9 border-2 border-[#C9A84C]/20 shadow-md shadow-[#C9A84C]/10">
                  <AvatarImage src={user?.profileImage || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-[#C9A84C] to-[#D6B45A] text-xs font-semibold text-[#1B2B4B]">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-[#1B2B4B]/40 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 border-white/20 bg-white/90 backdrop-blur-3xl rounded-3xl shadow-xl p-2"
            >
              <DropdownMenuLabel className="flex flex-col gap-1 p-4">
                <span className="text-sm font-semibold text-[#1B2B4B]">{user?.name}</span>
                <span className="text-xs text-[#1B2B4B]/60">{user?.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#1B2B4B]/10" />
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/profile"
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-[#1B2B4B] transition-colors hover:bg-[#F8F5EF]"
                >
                  <User className="h-4 w-4 text-[#1B2B4B]/50" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-[#1B2B4B] transition-colors hover:bg-[#F8F5EF]"
                >
                  <Settings className="h-4 w-4 text-[#1B2B4B]/50" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#1B2B4B]/10" />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-4 pb-4 lg:hidden"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B2B4B]/40" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-[18px] border-0 bg-[#F8F5EF] py-2.5 pl-11 pr-4 text-sm text-[#1B2B4B] placeholder:text-[#1B2B4B]/40 outline-none ring-1 ring-[#1B2B4B]/10 focus:ring-[#C9A84C]/50"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}