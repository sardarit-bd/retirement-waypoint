'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  ChevronRight,
  Clock,
  DollarSign,
  Download,
  Mail,
  RefreshCw,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderStatusBadge } from '@/features/orders/components/OrderStatusBadge';
import { useAdminDashboard } from '../hooks/useDashboard';

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value = 0) =>
  new Intl.NumberFormat('en-US').format(value);

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'N/A';

const cardClass =
  'rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]';

function AdminDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`${cardClass} p-6`}>
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-3 h-5 w-80" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(10)].map((_, index) => (
          <div key={index} className={`${cardClass} p-6`}>
            <Skeleton className="h-11 w-11 rounded-full" />
            <Skeleton className="mt-5 h-8 w-20" />
            <Skeleton className="mt-2 h-4 w-28" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-80 rounded-3xl lg:col-span-2" />
        <Skeleton className="h-80 rounded-3xl" />
      </div>
    </div>
  );
}

function AdminDashboardError({ error, refetch }) {
  const message =
    error?.response?.data?.message || error?.message || 'Failed to load admin dashboard';

  return (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-12 text-center">
      <div className="mx-auto mb-4 w-fit rounded-full bg-red-500/10 p-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>
      <h2 className="text-xl font-semibold text-red-500">Unable to Load Admin Dashboard</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#1B2B4B]/60">{message}</p>
      <Button
        onClick={() => refetch()}
        className="mt-6 rounded-full bg-[#C9A84C] px-6 font-semibold text-[#1B2B4B] hover:bg-[#D6B45A]"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, hint, color = 'text-[#C9A84C]', bg = 'bg-[#C9A84C]/10' }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className={`${cardClass} p-6`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#1B2B4B]/60">{label}</p>
          <p className="mt-2 text-3xl font-bold text-[#1B2B4B]">{value}</p>
          {hint && <p className="mt-1 text-xs text-[#1B2B4B]/45">{hint}</p>}
        </div>
        <div className={`rounded-full ${bg} p-3 ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}

function RevenueTrend({ revenue }) {
  const rows = revenue?.data?.slice(-7) || [];
  const maxRevenue = Math.max(...rows.map((item) => item.revenue || 0), 1);

  return (
    <div className={`${cardClass} p-6 lg:col-span-2`}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#1B2B4B]">Revenue Trend</h2>
          <p className="text-sm text-[#1B2B4B]/50">Recent paid order revenue</p>
        </div>
        <BarChart3 className="h-5 w-5 text-[#C9A84C]" />
      </div>

      {rows.length === 0 ? (
        <div className="flex min-h-52 items-center justify-center rounded-2xl bg-[#F8F5EF] text-sm text-[#1B2B4B]/50">
          Revenue data will appear after paid orders.
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((item) => {
            const width = `${Math.max(((item.revenue || 0) / maxRevenue) * 100, 4)}%`;
            return (
              <div key={item.period}>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-medium text-[#1B2B4B]/60">{item.period}</span>
                  <span className="font-semibold text-[#1B2B4B]">
                    {formatCurrency(item.revenue)}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[#F8F5EF]">
                  <div className="h-full rounded-full bg-[#C9A84C]" style={{ width }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TopBooksCard({ books }) {
  const topBooks = books?.topSelling || [];

  return (
    <div className={`${cardClass} p-6`}>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1B2B4B]">Top Books</h2>
        <BookOpen className="h-5 w-5 text-[#C9A84C]" />
      </div>

      {topBooks.length === 0 ? (
        <div className="rounded-2xl bg-[#F8F5EF] p-6 text-center text-sm text-[#1B2B4B]/50">
          Sales data will appear here.
        </div>
      ) : (
        <div className="space-y-3">
          {topBooks.map((book) => (
            <div key={book.bookId} className="rounded-2xl bg-[#F8F5EF] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#1B2B4B]">{book.title}</p>
                  <p className="mt-1 text-xs text-[#1B2B4B]/50">
                    {formatNumber(book.purchaseCount)} purchases
                  </p>
                </div>
                <p className="shrink-0 text-sm font-bold text-[#C9A84C]">
                  {formatCurrency(book.sales)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RecentOrdersCard({ orders }) {
  return (
    <div className={`${cardClass} p-6 lg:col-span-2`}>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1B2B4B]">Recent Orders</h2>
        <Link href="/admin/orders" className="flex items-center gap-1 text-sm text-[#C9A84C] hover:underline">
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="rounded-2xl bg-[#F8F5EF] p-8 text-center text-sm text-[#1B2B4B]/50">
          New orders will appear here.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order._id} className="rounded-2xl bg-[#F8F5EF] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-sm font-semibold text-[#1B2B4B]">
                    #{order.orderNumber}
                  </p>
                  <p className="mt-1 text-xs text-[#1B2B4B]/50">{formatDate(order.createdAt)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <OrderStatusBadge status={order.paymentStatus} type="payment" />
                  <span className="text-sm font-bold text-[#1B2B4B]">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function QuickActions() {
  const actions = [
    { label: 'Manage Books', href: '/admin/books', icon: BookOpen },
    { label: 'Review Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Moderate Reviews', href: '/admin/reviews', icon: Star },
    { label: 'View Analytics', href: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <div className={`${cardClass} p-6`}>
      <h2 className="mb-4 text-lg font-semibold text-[#1B2B4B]">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl bg-[#F8F5EF] p-4 text-center transition hover:bg-[#F8F5EF]/80"
          >
            <div className="mx-auto mb-2 w-fit rounded-full bg-white/60 p-2.5 text-[#C9A84C]">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-[#1B2B4B]">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function AdminDashboardContent() {
  const { data, isLoading, error, refetch } = useAdminDashboard();

  if (isLoading) return <AdminDashboardSkeleton />;
  if (error) return <AdminDashboardError error={error} refetch={refetch} />;

  const overview = data?.overview || {};
  const orders = data?.orders || {};
  const reviews = data?.reviews || {};
  const contact = data?.contact || {};
  const newsletter = data?.newsletter || {};
  const metrics = [
    { icon: DollarSign, label: 'Total Revenue', value: formatCurrency(overview.totalRevenue), hint: `${formatCurrency(overview.monthlyRevenue)} this month` },
    { icon: ShoppingBag, label: 'Total Orders', value: formatNumber(overview.totalOrders), hint: `${formatNumber(orders.pendingOrders)} pending` },
    { icon: BookOpen, label: 'Total Books', value: formatNumber(overview.totalBooks), hint: `${formatNumber(overview.totalPurchases)} purchases` },
    { icon: Users, label: 'Total Users', value: formatNumber(overview.totalUsers), hint: 'Registered accounts', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: Download, label: 'Downloads', value: formatNumber(overview.totalDownloads), hint: 'Lifetime download events', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { icon: Star, label: 'Pending Reviews', value: formatNumber(reviews.pendingReviews), hint: `${formatNumber(reviews.approvedReviews)} approved`, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { icon: Clock, label: 'Conversion Rate', value: `${orders.conversionRate || 0}%`, hint: `${formatNumber(orders.paidOrders)} paid orders`, color: 'text-[#1B2B4B]', bg: 'bg-[#1B2B4B]/10' },
    { icon: Sparkles, label: 'Average Rating', value: overview.averageRating?.toFixed?.(1) || '0.0', hint: `${formatNumber(overview.totalReviews)} total reviews`, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { icon: Mail, label: 'Unread Messages', value: formatNumber(contact.unread), hint: 'New contact inquiries', color: 'text-red-500', bg: 'bg-red-500/10' },
    { icon: Send, label: 'Newsletter Subscribers', value: formatNumber(newsletter.total), hint: `${formatNumber(newsletter.newToday)} new today`, color: 'text-teal-500', bg: 'bg-teal-500/10' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className={`${cardClass} p-6`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex w-fit items-center gap-2 rounded-full bg-[#C9A84C]/10 px-3 py-1.5 text-xs font-semibold text-[#C9A84C]">
              <Sparkles className="h-3.5 w-3.5" />
              Platform Control Center
            </div>
            <h1 className="text-3xl font-bold text-[#1B2B4B]">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-[#1B2B4B]/60">
              Monitor revenue, orders, books, downloads, and review moderation.
            </p>
          </div>
          <Button asChild className="rounded-full bg-[#C9A84C] px-6 font-semibold text-[#1B2B4B] hover:bg-[#D6B45A]">
            <Link href="/admin/books">Manage Books</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <RevenueTrend revenue={data?.revenue} />
        <TopBooksCard books={data?.books} />
        <RecentOrdersCard orders={data?.recentOrders} />
        <QuickActions />
      </div>
    </motion.div>
  );
}