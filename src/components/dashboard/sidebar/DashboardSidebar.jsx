/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  FileText,
  Star,
  ClipboardCheck,
  RefreshCw,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Users,
  BarChart3,
  BookMarked,
  ShoppingCart,
  Ticket,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from '@/lib/auth-client';
import toast from 'react-hot-toast';

// User menu items with sections
const userMenuSections = [
  {
    title: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
      { icon: BookOpen, label: 'My Books', href: '/dashboard/my-books' },
      { icon: ShoppingBag, label: 'Orders', href: '/dashboard/orders' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Profile', href: '/dashboard/profile' },
    ],
  },
];

// Admin menu items with sections
const adminMenuSections = [
  {
    title: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
      // { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
      { icon: BookMarked, label: 'Books', href: '/admin/books' },
      { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
      { icon: Star, label: 'Reviews', href: '/admin/reviews' },
    ],
  },
  {
    title: 'Management',
    items: [
      { icon: Ticket, label: 'Coupons', href: '/admin/coupons' },
      { icon: FileText, label: 'Assessments', href: '/admin/assessments' },
    ],
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const { session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const user = session?.user;
  const isAdmin = user?.role === 'admin';
  const menuSections = isAdmin ? adminMenuSections : userMenuSections;

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

  // FIXED: Active link logic with exact match for root paths
  const isActiveLink = (href) => {
    // Dashboard should match only exactly
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }

    // Admin dashboard should match only exactly
    if (href === '/admin') {
      return pathname === '/admin';
    }

    // For all other nested routes, match exact or starts with href/
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={cn(
          'fixed z-50 transition-all duration-300 ease-in-out',
          'lg:top-[88px] lg:left-5 lg:bottom-5 lg:rounded-[32px]',
          'top-0 left-0 bottom-0 rounded-none lg:rounded-[32px]',
          isCollapsed ? 'lg:w-[88px]' : 'lg:w-[280px]',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        style={{
          background: 'rgba(4, 16, 58, 0.88)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 80px rgba(4, 16, 58, 0.35)',
        }}
      >
        {/* Sidebar Content */}
        <div className="flex h-full top-0 flex-col overflow-hidden">
          {/* Brand Area */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 px-5 py-5 border-b border-white/5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#D6B45A] shadow-lg shadow-[#C9A84C]/20">
                <Sparkles className="h-5 w-5 text-[#04103A]" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-white/90">
                Dashboard
              </span>
            </motion.div>
          )}

          {/* Collapsed Logo */}
          {isCollapsed && (
            <div className="flex justify-center py-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#D6B45A] shadow-lg shadow-[#C9A84C]/20">
                <Sparkles className="h-5 w-5 text-[#04103A]" />
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 custom-scrollbar">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {menuSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  variants={sectionVariants}
                  className="space-y-2"
                >
                  {/* Section Title */}
                  {!isCollapsed && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: sectionIndex * 0.05 }}
                      className="px-3 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white/35"
                    >
                      {section.title}
                    </motion.p>
                  )}

                  {/* Section Items */}
                  {section.items.map((item) => {
                    const isActive = isActiveLink(item.href);
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.href}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setHoveredItem(item.href)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={cn(
                            'group relative flex items-center rounded-xl px-3 py-3.5 text-sm font-medium transition-all duration-300',
                            isActive
                              ? 'bg-[#C9A84C]/16 text-[#C9A84C] border border-[#C9A84C]/25'
                              : 'text-white/75 hover:bg-white/8 hover:text-white',
                            isCollapsed ? 'justify-center' : 'gap-3'
                          )}
                        >
                          {/* Active Indicator */}
                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute inset-0 rounded-xl bg-[#C9A84C]/5"
                              transition={{ type: 'spring', duration: 0.5 }}
                            />
                          )}

                          <Icon
                            className={cn(
                              'h-5 w-5 shrink-0 transition-colors duration-300',
                              isActive
                                ? 'text-[#C9A84C]'
                                : 'text-white/60 group-hover:text-white/90'
                            )}
                          />

                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 }}
                              className={cn(
                                'truncate transition-colors duration-300',
                                isActive
                                  ? 'text-[#C9A84C]'
                                  : 'text-white/85 group-hover:text-white'
                              )}
                            >
                              {item.label}
                            </motion.span>
                          )}

                          {/* Active Dot */}
                          {isActive && isCollapsed && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute right-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#C9A84C]"
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ))}
            </motion.div>
          </nav>

          {/* Sign Out */}
          <div className="border-t border-white/5 px-3 py-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignOut}
              className={cn(
                'flex w-full items-center rounded-xl px-3 py-3.5 text-sm font-medium transition-all duration-300 cursor-pointer',
                isCollapsed ? 'justify-center' : 'gap-3',
                'bg-red-500/8 text-red-400/90 hover:bg-red-500/16 hover:text-red-300',
                'border border-red-500/20 hover:border-red-500/30'
              )}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Sign Out
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Collapse Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'absolute -right-3.5 top-1/2 hidden -translate-y-1/2 rounded-full p-1.5 transition-all duration-300 hover:scale-110 lg:block',
            'bg-white/10 backdrop-blur-2xl border border-white/10',
            'shadow-[0_8px_25px_rgba(0,0,0,0.25)]',
            'hover:bg-white/15 hover:border-white/20'
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5 text-white/70" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5 text-white/70" />
          )}
        </motion.button>
      </motion.aside>

      {/* Mobile Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-[#C9A84C] px-4 py-3 shadow-xl shadow-[#C9A84C]/20 lg:hidden"
      >
        <LayoutDashboard className="h-5 w-5 text-[#04103A]" />
        <span className="text-sm font-semibold text-[#04103A]">Menu</span>
      </motion.button>
    </>
  );
}