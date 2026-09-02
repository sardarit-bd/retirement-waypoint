/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { getMenuSections } from './config/menuConfig';
import { useSidebar } from '@/context/SidebarContext';

export function DashboardSidebar() {
  const pathname = usePathname();
  const { session } = useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isCollapsed, setIsCollapsed } = useSidebar();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const user = session?.user;
  const isAdmin = user?.role === 'admin';
  const menuSections = getMenuSections(isAdmin);

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

  // Active link logic with exact match for root paths
  const isActiveLink = (href) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed z-50 select-none transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[width]',
          'lg:top-[88px] lg:left-5 lg:bottom-5 lg:rounded-[32px]',
          'top-0 left-0 bottom-0 rounded-none lg:rounded-[32px]',
          isCollapsed ? 'lg:w-[88px]' : 'lg:w-[280px]',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        style={{
          background: 'rgba(4, 16, 58, 0.92)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 80px rgba(4, 16, 58, 0.35)',
        }}
      >
        {/* Sidebar Inner Layout */}
        <div className="flex h-full w-full flex-col overflow-hidden">
          {/* Brand Area */}
          <div
            className={cn(
              'flex items-center px-5 py-5 border-b border-white/5 min-h-[73px] shrink-0 overflow-hidden',
              isCollapsed ? 'justify-center px-0' : 'gap-3'
            )}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#D6B45A] shadow-lg shadow-[#C9A84C]/20">
              <Sparkles className="h-5 w-5 text-[#04103A]" />
            </div>
            <span
              className={cn(
                'text-sm font-semibold tracking-tight text-white/90 whitespace-nowrap overflow-hidden select-none transition-opacity duration-200',
                isCollapsed ? 'opacity-0 w-0 pointer-events-none hidden' : 'opacity-100 w-auto'
              )}
            >
              Dashboard
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 no-scrollbar overflow-x-hidden overflow-y-auto">
            <div className="space-y-6">
              {menuSections.map((section) => (
                <div key={section.title} className="space-y-1.5">
                  {/* Section Title */}
                  {!isCollapsed && (
                    <p className="px-3 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white/35 whitespace-nowrap overflow-hidden select-none transition-opacity duration-200">
                      {section.title}
                    </p>
                  )}

                  {/* Section Items */}
                  {section.items.map((item) => {
                    const isActive = isActiveLink(item.href);
                    const Icon = item.icon;

                    return (
                      <div key={item.href} className="relative group">
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={cn(
                            'relative flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-150 select-none cursor-pointer overflow-hidden',
                            isActive
                              ? 'bg-[#C9A84C]/16 text-[#C9A84C] border border-[#C9A84C]/25'
                              : 'text-white/75 hover:bg-white/8 hover:text-white border border-transparent',
                            isCollapsed ? 'justify-center px-0' : 'gap-3 justify-start'
                          )}
                        >
                          <Icon
                            className={cn(
                              'h-5 w-5 shrink-0 transition-colors duration-150',
                              isActive
                                ? 'text-[#C9A84C]'
                                : 'text-white/60 group-hover:text-white/90'
                            )}
                          />

                          <span
                            className={cn(
                              'whitespace-nowrap overflow-hidden select-none truncate transition-opacity duration-200',
                              isActive
                                ? 'text-[#C9A84C]'
                                : 'text-white/85 group-hover:text-white',
                              isCollapsed
                                ? 'opacity-0 w-0 pointer-events-none hidden'
                                : 'opacity-100 w-auto'
                            )}
                          >
                            {item.label}
                          </span>

                          {/* Active Dot on Collapsed */}
                          {isActive && isCollapsed && (
                            <div className="absolute right-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#C9A84C]" />
                          )}
                        </Link>

                        {/* Tooltip on Collapsed Icon Button */}
                        {isCollapsed && (
                          <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3.5 z-50 hidden lg:flex items-center rounded-lg bg-[#04103A] px-3 py-1.5 text-xs font-semibold text-white shadow-2xl border border-white/10 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 whitespace-nowrap select-none">
                            {item.label}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </nav>

          {/* Sign Out */}
          <div className="border-t border-white/5 px-3 py-3 shrink-0">
            <div className="relative group">
              <button
                type="button"
                onClick={handleSignOut}
                className={cn(
                  'relative flex w-full items-center rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-150 cursor-pointer select-none overflow-hidden',
                  isCollapsed ? 'justify-center px-0' : 'gap-3 justify-start',
                  'bg-red-500/8 text-red-400/90 hover:bg-red-500/16 hover:text-red-300',
                  'border border-red-500/20 hover:border-red-500/30'
                )}
              >
                <LogOut className="h-5 w-5 shrink-0" />
                <span
                  className={cn(
                    'whitespace-nowrap overflow-hidden select-none transition-opacity duration-200',
                    isCollapsed
                      ? 'opacity-0 w-0 pointer-events-none hidden'
                      : 'opacity-100 w-auto'
                  )}
                >
                  Sign Out
                </span>
              </button>

              {/* Tooltip on Collapsed Sign Out */}
              {isCollapsed && (
                <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3.5 z-50 hidden lg:flex items-center rounded-lg bg-[#04103A] px-3 py-1.5 text-xs font-semibold text-red-300 shadow-2xl border border-red-500/20 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 whitespace-nowrap select-none">
                  Sign Out
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Collapse Button */}
        <button
          type="button"
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'absolute -right-3.5 top-1/2 z-50 hidden -translate-y-1/2 rounded-full p-1.5 cursor-pointer lg:block',
            'bg-[#04103A] backdrop-blur-2xl border border-white/15',
            'shadow-[0_8px_25px_rgba(0,0,0,0.35)]',
            'hover:bg-[#061852] hover:border-[#C9A84C]/50 hover:scale-110',
            'active:scale-95 transition-transform duration-150 will-change-transform'
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5 text-white/80" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5 text-white/80" />
          )}
        </button>
      </aside>

      {/* Mobile Toggle */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-[#C9A84C] px-4 py-3 shadow-xl shadow-[#C9A84C]/20 lg:hidden cursor-pointer active:scale-95 transition-transform duration-150"
      >
        <LayoutDashboard className="h-5 w-5 text-[#04103A]" />
        <span className="text-sm font-semibold text-[#04103A]">Menu</span>
      </button>
    </>
  );
}