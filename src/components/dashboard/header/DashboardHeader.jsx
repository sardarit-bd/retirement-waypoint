'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Bell, Search, ChevronDown, LogOut, User, Settings } from 'lucide-react';
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

  // const user = serverUser || session?.user;
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
            toast.success("Signed out successfully");

            // force reload
            window.location.href = "/";
          },

          onError: (ctx) => {
            toast.error(ctx.error?.message || "Failed to sign out");
          },
        },
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <header className="fixed top-0 z-30 w-full bg-white/95 backdrop-blur-xl border-b border-[#1B2B4B]/10">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo - Mobile */}
        <Link href="/" className="">
          <Image
            src="/logo-02.png"
            alt="Retirement Waypoint"
            width={120}
            height={80}
            className="h-14 w-auto"
          />
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B2B4B]/40" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-xl border border-[#1B2B4B]/10 bg-[#F8F5EF] py-2 pl-10 pr-4 text-sm text-[#1B2B4B] placeholder:text-[#1B2B4B]/40 focus:border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative rounded-full p-2 text-[#1B2B4B]/60 hover:bg-[#F8F5EF] hover:text-[#1B2B4B]">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full px-2 py-1.5 hover:bg-[#F8F5EF]">
                <Avatar className="h-8 w-8 border-2 border-[#C9A84C]/20">
                  <AvatarImage src={user?.profileImage || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-[#C9A84C] to-[#D6B45A] text-xs font-semibold text-[#1B2B4B]">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-[#1B2B4B]/40" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-[#1B2B4B]/10 bg-white shadow-lg">
              <DropdownMenuLabel className="flex flex-col">
                <span className="text-sm font-semibold text-[#1B2B4B]">{user?.name}</span>
                <span className="text-xs text-[#1B2B4B]/60">{user?.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#1B2B4B]/10" />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#1B2B4B]/10" />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer text-red-500 focus:text-red-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
