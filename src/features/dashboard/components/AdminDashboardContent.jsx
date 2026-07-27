'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
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
import { RevenueChart } from './charts/RevenueChart';
import { BookPerformanceChart } from './charts/BookPerformanceChart';

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
        <Skeleton className="h-8 w-48 sm:w-64" />
        <Skeleton className="mt-3 h-5 w-64 sm:w-80" />
      </div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`${cardClass} p-4 sm:p-6`}>
            <Skeleton className="h-10 w-10 sm:h-11 sm:w-11 rounded-full" />
            <Skeleton className="mt-4 sm:mt-5 h-7 sm:h-8 w-16 sm:w-20" />
            <Skeleton className="mt-2 h-3 sm:h-4 w-20 sm:w-28" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Skeleton className="h-72 sm:h-80 rounded-3xl lg:col-span-2" />
        <Skeleton className="h-72 sm:h-80 rounded-3xl" />
        <Skeleton className="h-64 sm:h-72 rounded-3xl lg:col-span-2" />
        <Skeleton className="h-64 sm:h-72 rounded-3xl" />
      </div>
    </div>
  );
}

function AdminDashboardError({ error, refetch }) {
  const message =
    error?.response?.data?.message || error?.message || 'Failed to load admin dashboard';

  return (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 sm:p-12 text-center">
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

function TrendBadge({ value }) {
  if (value === undefined || value === null) return null;
  const isUp = value >= 0;
  const Icon = isUp ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-medium ${
        isUp ? 'text-emerald-600' : 'text-red-500'
      }`}
    >
      <Icon className="h-3 w-3" />
      {Math.abs(value)}%
    </span>
  );
}

function MetricCard({ icon: Icon, label, value, hint, color = 'text-[#C9A84C]', bg = 'bg-[#C9A84C]/10', trend }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className={`${cardClass} p-4 sm:p-6`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-[#1B2B4B]/60 truncate">{label}</p>
          <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold text-[#1B2B4B] truncate">{value}</p>
          <div className="mt-0.5 sm:mt-1 flex items-center gap-1.5 flex-wrap">
            {trend !== undefined && <TrendBadge value={trend} />}
            {hint && <p className="text-[10px] sm:text-xs text-[#1B2B4B]/45 truncate">{hint}</p>}
          </div>
        </div>
        <div className={`rounded-full ${bg} p-2 sm:p-3 ${color} shrink-0`}>
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </div>
    </motion.div>
  );
}

function EnhancedRecentOrdersCard({ orders }) {
  return (
    <div className={`${cardClass} p-4 sm:p-6 lg:col-span-2`}>
      <div className="mb-4 sm:mb-5 flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-semibold text-[#1B2B4B]">Recent Orders</h2>
        <Link
          href="/admin/orders"
          className="flex items-center gap-1 text-xs sm:text-sm font-medium text-[#C9A84C] hover:underline transition-colors shrink-0"
        >
          View All <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Link>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="rounded-2xl bg-[#F8F5EF] p-6 sm:p-8 text-center text-sm text-[#1B2B4B]/50">
          New orders will appear here.
        </div>
      ) : (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[400px] sm:min-w-0 px-4 sm:px-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1B2B4B]/5 text-left text-xs font-medium text-[#1B2B4B]/50">
                  <th className="pb-3 pr-3">Order</th>
                  <th className="pb-3 px-3 hidden sm:table-cell">Date</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 pl-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="group cursor-pointer border-b border-[#1B2B4B]/5 last:border-0 transition-colors hover:bg-[#F8F5EF]/60"
                    onClick={() => window.location.href = `/admin/orders/${order._id}`}
                  >
                    <td className="py-3 pr-3">
                      <span className="font-mono text-sm font-semibold text-[#1B2B4B] group-hover:text-[#C9A84C] transition-colors">
                        #{order.orderNumber}
                      </span>
                    </td>
                    <td className="py-3 px-3 hidden sm:table-cell">
                      <span className="text-xs text-[#1B2B4B]/60">{formatDate(order.createdAt)}</span>
                    </td>
                    <td className="py-3 px-3">
                      <OrderStatusBadge status={order.orderStatus || order.paymentStatus} type={order.orderStatus ? 'order' : 'payment'} />
                    </td>
                    <td className="py-3 pl-3 text-right">
                      <span className="text-sm font-bold text-[#1B2B4B]">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function EnhancedQuickActions() {
  const actions = [
    { label: 'Manage Books', href: '/admin/books', icon: BookOpen, desc: 'Add or edit titles' },
    { label: 'Review Orders', href: '/admin/orders', icon: ShoppingBag, desc: 'Process payments' },
    { label: 'Moderate Reviews', href: '/admin/reviews', icon: Star, desc: 'Approve or reject' }
  ];

  return (
    <div className={`${cardClass} p-4 sm:p-6`}>
      <h2 className="mb-4 text-base sm:text-lg font-semibold text-[#1B2B4B]">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(({ label, href, icon: Icon, desc }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl bg-[#F8F5EF] p-3 sm:p-4 transition-all duration-300 hover:bg-[#F8F5EF]/80 hover:shadow-sm hover:scale-[1.02]"
          >
            <div className="mx-auto mb-2 w-fit rounded-full bg-white/60 p-2 sm:p-2.5 text-[#C9A84C] transition-transform group-hover:scale-110 group-hover:text-[#D6B45A]">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="block text-xs font-semibold text-[#1B2B4B]">{label}</span>
            <span className="mt-0.5 hidden sm:block text-[10px] text-[#1B2B4B]/40">{desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function computeTrend(revenueData) {
  if (!revenueData?.data?.length) return undefined;
  const rows = [...revenueData.data].reverse();
  const recent = rows.slice(0, 7);
  const previous = rows.slice(7, 14);
  if (recent.length === 0 || previous.length === 0) return undefined;
  const recentSum = recent.reduce((s, r) => s + (r.revenue || 0), 0);
  const prevSum = previous.reduce((s, r) => s + (r.revenue || 0), 0);
  if (prevSum === 0) return recentSum > 0 ? 100 : 0;
  return Math.round(((recentSum - prevSum) / prevSum) * 100);
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

  const revenueTrend = computeTrend(data?.revenue);

  const metrics = [
    { icon: DollarSign, label: 'Total Revenue', value: formatCurrency(overview.totalRevenue), hint: `${formatCurrency(overview.monthlyRevenue)} this month`, trend: revenueTrend },
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className={`${cardClass} p-4 sm:p-6`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 sm:mb-3 flex w-fit items-center gap-2 rounded-full bg-[#C9A84C]/10 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-[#C9A84C]">
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Platform Control Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1B2B4B]">Admin Dashboard</h1>
            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-[#1B2B4B]/60">
              Monitor revenue, orders, books, downloads, and review moderation.
            </p>
          </div>
          <Button asChild className="rounded-full bg-[#C9A84C] px-5 sm:px-6 text-xs sm:text-sm font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] hover:text-white self-start sm:self-auto">
            <Link href="/admin/books">Manage Books</Link>
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      {/* Charts & Analytics Section */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Revenue Chart — full width on mobile, colspan 2 on desktop */}
        <div className="lg:col-span-2">
          <div className={`${cardClass} p-4 sm:p-6`}>
            <div className="mb-2 sm:mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-[#1B2B4B]">Revenue Analytics</h2>
                <p className="text-xs sm:text-sm text-[#1B2B4B]/50">Daily revenue over selected period</p>
              </div>
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-[#C9A84C] shrink-0" />
            </div>
            <RevenueChart />
          </div>
        </div>

        {/* Book Performance */}
        <div className={`${cardClass} p-4 sm:p-6`}>
          <div className="mb-2 sm:mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#1B2B4B]">Top Selling Books</h2>
              <p className="text-xs sm:text-sm text-[#1B2B4B]/50">Purchases & revenue</p>
            </div>
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-[#C9A84C] shrink-0" />
          </div>
          <BookPerformanceChart books={data?.books} isLoading={false} />
        </div>

        {/* Recent Orders */}
        <EnhancedRecentOrdersCard orders={data?.recentOrders} />

        {/* Quick Actions */}
        <EnhancedQuickActions />
      </div>
    </motion.div>
  );
}
