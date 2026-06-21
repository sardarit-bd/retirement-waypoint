'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from '@/lib/auth-client';
import toast from 'react-hot-toast';

// User menu items
const userMenuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: BookOpen, label: 'My Books', href: '/dashboard/my-books' },
  { icon: ShoppingBag, label: 'Orders', href: '/dashboard/orders' },
  { icon: FileText, label: 'Invoices', href: '/dashboard/invoices' },
  { icon: Star, label: 'Reviews', href: '/dashboard/reviews' },
  { icon: ClipboardCheck, label: 'Assessments', href: '/dashboard/assessments' },
  { icon: RefreshCw, label: 'Refunds', href: '/dashboard/refunds' },
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

// Admin menu items
const adminMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: BookMarked, label: 'Books', href: '/admin/books' },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: FileText, label: 'Invoices', href: '/admin/invoices' },
  { icon: Star, label: 'Reviews', href: '/admin/reviews' },
  { icon: Ticket, label: 'Coupons', href: '/admin/coupons' },
  { icon: RefreshCw, label: 'Refunds', href: '/admin/refunds' },
  { icon: Users, label: 'Users', href: '/admin/users' },
];

export function DashboardSidebar({ user: serverUser }) {
  const pathname = usePathname();
  const { session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const user = serverUser || session?.user;
  const isAdmin = user?.role === 'admin';
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const handleSignOut = async () => {
    try {
      await signOut({
        onSuccess: () => {
          toast.success('Signed out successfully');
        },
        onError: (ctx) => {
          toast.error(ctx.error?.message || 'Failed to sign out');
        },
      });
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-white border-r border-[#1B2B4B]/10 transition-all duration-300',
          isCollapsed ? 'w-16' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Toggle Button - Desktop only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-4 hidden rounded-full border border-[#1B2B4B]/10 bg-white p-1.5 shadow-md hover:bg-[#F8F5EF] lg:block"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-[#1B2B4B]" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-[#1B2B4B]" />
          )}
        </button>

        {/* Navigation */}
        <nav className="flex h-full flex-col overflow-y-auto p-3">
          <div className="flex-1 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-[#C9A84C]/10 text-[#C9A84C]'
                      : 'text-[#1B2B4B]/70 hover:bg-[#F8F5EF] hover:text-[#1B2B4B]'
                  )}
                >
                  <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-[#C9A84C]' : '')} />
                  {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>

          {/* Sign Out */}
          <div className="border-t border-[#1B2B4B]/10 pt-3">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="ml-3">Sign Out</span>}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="mt-3 block w-full rounded-xl border border-[#1B2B4B]/10 px-3 py-2 text-sm font-medium text-[#1B2B4B] hover:bg-[#F8F5EF] lg:hidden"
          >
            Close Menu
          </button>
        </nav>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed bottom-6 right-6 z-30 rounded-full bg-[#C9A84C] p-3 shadow-lg lg:hidden"
      >
        <LayoutDashboard className="h-6 w-6 text-[#1B2B4B]" />
      </button>
    </>
  );
}
