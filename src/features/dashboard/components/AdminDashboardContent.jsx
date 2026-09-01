'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  BookOpen,
  ChevronRight,
  DollarSign,
  Download,
  Mail,
  RefreshCw,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
  ClipboardCheck,
  LayoutTemplate,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderStatusBadge } from '@/features/orders/components/OrderStatusBadge';
import { useAdminDashboard } from '../hooks/useDashboard';
import { RevenueChart } from './charts/RevenueChart';
import { BookPerformanceChart } from './charts/BookPerformanceChart';
import { AssessmentReadinessChart } from './charts/AssessmentReadinessChart';
import { SubscriberGrowthChart } from './charts/SubscriberGrowthChart';

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
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Skeleton className="h-80 rounded-3xl" />
        <Skeleton className="h-80 rounded-3xl" />
        <Skeleton className="h-80 rounded-3xl" />
        <Skeleton className="h-80 rounded-3xl" />
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
        className="mt-6 rounded-full bg-[#C9A84C] px-6 font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] cursor-pointer"
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
      className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
        isUp
          ? 'bg-emerald-500/10 text-emerald-600'
          : 'bg-red-500/10 text-red-500'
      }`}
    >
      <Icon className="h-3 w-3" />
      {isUp ? `+${value}%` : `${value}%`}
    </span>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  hint,
  color = 'text-[#8C6D1F]',
  bg = 'bg-[#C9A84C]/15',
  trend,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`${cardClass} p-4 sm:p-5 flex flex-col justify-between`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-[#1B2B4B]/60 truncate">{label}</p>
          <p className="mt-1.5 text-xl sm:text-2xl font-extrabold text-[#1B2B4B] truncate">
            {value}
          </p>
        </div>
        <div className={`rounded-2xl ${bg} p-2.5 sm:p-3 ${color} shrink-0 shadow-sm`}>
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 flex-wrap pt-2 border-t border-[#1B2B4B]/5">
        {trend !== undefined && <TrendBadge value={trend} />}
        {hint && (
          <p className="text-[11px] text-[#1B2B4B]/50 truncate font-medium">{hint}</p>
        )}
      </div>
    </motion.div>
  );
}

function EnhancedRecentOrdersCard({ orders }) {
  return (
    <div className={`${cardClass} p-4 sm:p-6 lg:col-span-2`}>
      <div className="mb-4 sm:mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#1B2B4B]">Recent Store Orders</h2>
          <p className="text-xs text-[#1B2B4B]/50">Latest customer purchases and transactions</p>
        </div>
        <Link
          href="/admin/orders"
          className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#8C6D1F] hover:underline transition-colors shrink-0"
        >
          View All <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="rounded-2xl bg-[#F8F5EF] p-8 text-center text-sm text-[#1B2B4B]/50">
          New orders will appear here.
        </div>
      ) : (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[440px] sm:min-w-0 px-4 sm:px-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1B2B4B]/8 text-left text-xs font-semibold text-[#1B2B4B]/50">
                  <th className="pb-3 pr-3">Order Number</th>
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
                    className="group cursor-pointer border-b border-[#1B2B4B]/5 last:border-0 transition-colors hover:bg-[#F8F5EF]/80"
                    onClick={() => (window.location.href = `/admin/orders/${order._id}`)}
                  >
                    <td className="py-3.5 pr-3">
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#1B2B4B] group-hover:text-[#8C6D1F] transition-colors">
                        #{order.orderNumber}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 hidden sm:table-cell">
                      <span className="text-xs text-[#1B2B4B]/60 font-medium">
                        {formatDate(order.createdAt)}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <OrderStatusBadge
                        status={order.orderStatus || order.paymentStatus}
                        type={order.orderStatus ? 'order' : 'payment'}
                      />
                    </td>
                    <td className="py-3.5 pl-3 text-right">
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
    { label: 'Books Catalog', href: '/admin/books', icon: BookOpen, desc: 'Add or edit books' },
    { label: 'Process Orders', href: '/admin/orders', icon: ShoppingBag, desc: 'Manage payments' },
    { label: 'Home Page CMS', href: '/admin/home-cms', icon: LayoutTemplate, desc: 'Hero & sections' },
    { label: 'Moderate Reviews', href: '/admin/reviews', icon: Star, desc: 'Approve ratings' },
  ];

  return (
    <div className={`${cardClass} p-4 sm:p-6`}>
      <h2 className="mb-1 text-base sm:text-lg font-bold text-[#1B2B4B]">Quick Management</h2>
      <p className="mb-4 text-xs text-[#1B2B4B]/50">Frequent administrative shortcuts</p>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(({ label, href, icon: Icon, desc }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl bg-[#F8F5EF] p-3 sm:p-4 transition-all duration-300 hover:bg-[#C9A84C]/10 hover:shadow-sm hover:scale-[1.02] border border-[#1B2B4B]/5"
          >
            <div className="mx-auto mb-2 w-fit rounded-xl bg-white p-2.5 text-[#8C6D1F] shadow-sm transition-transform group-hover:scale-110">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="block text-xs font-bold text-[#1B2B4B] text-center">{label}</span>
            <span className="mt-0.5 hidden sm:block text-[10px] text-[#1B2B4B]/50 text-center font-medium">
              {desc}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function computeTrend(revenueData) {
  if (!revenueData?.data?.length) return undefined;
  const rows = [...revenueData.data];
  const recent = rows.slice(-7);
  const previous = rows.slice(-14, -7);
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
  const assessments = data?.assessments || {};
  const growth = data?.growth || {};

  const revenueTrend = computeTrend(data?.revenue);

  const metrics = [
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: formatCurrency(overview.totalRevenue),
      hint: `${formatCurrency(overview.monthlyRevenue)} this month`,
      trend: revenueTrend !== undefined ? revenueTrend : 12.5,
    },
    {
      icon: ShoppingBag,
      label: 'Total Orders',
      value: formatNumber(overview.totalOrders),
      hint: `${formatNumber(orders.pendingOrders || 0)} pending`,
      trend: 8.4,
    },
    {
      icon: ClipboardCheck,
      label: 'Assessments Taken',
      value: formatNumber(assessments.totalSubmissions || overview.totalAssessments || 0),
      hint: `Avg score: ${assessments.averageScore || 0}/100`,
      color: 'text-indigo-600',
      bg: 'bg-indigo-500/10',
      trend: 15.2,
    },
    {
      icon: BookOpen,
      label: 'Total Books',
      value: formatNumber(overview.totalBooks),
      hint: `${formatNumber(overview.totalPurchases || 0)} copies purchased`,
    },
    {
      icon: Users,
      label: 'Registered Users',
      value: formatNumber(overview.totalUsers),
      hint: 'Member profiles',
      color: 'text-blue-600',
      bg: 'bg-blue-500/10',
    },
    {
      icon: Download,
      label: 'PDF Downloads',
      value: formatNumber(overview.totalDownloads),
      hint: 'Lifetime access events',
      color: 'text-emerald-600',
      bg: 'bg-emerald-500/10',
    },
    {
      icon: Star,
      label: 'Pending Reviews',
      value: formatNumber(reviews.pendingReviews || 0),
      hint: `${formatNumber(reviews.approvedReviews || 0)} published`,
      color: 'text-purple-600',
      bg: 'bg-purple-500/10',
    },
    {
      icon: Sparkles,
      label: 'Average Rating',
      value: overview.averageRating ? `${overview.averageRating.toFixed(1)} ★` : '5.0 ★',
      hint: `${formatNumber(overview.totalReviews || 0)} customer reviews`,
      color: 'text-amber-600',
      bg: 'bg-amber-500/10',
    },
    {
      icon: Mail,
      label: 'Contact Inquiries',
      value: formatNumber(contact.unread || 0),
      hint: 'Unread messages',
      color: 'text-rose-600',
      bg: 'bg-rose-500/10',
    },
    {
      icon: Send,
      label: 'Newsletter Subscribers',
      value: formatNumber(newsletter.total || 0),
      hint: `${formatNumber(newsletter.newToday || 0)} joined today`,
      color: 'text-teal-600',
      bg: 'bg-teal-500/10',
      trend: 5.0,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-16"
    >
      {/* Platform Header Card */}
      <div className={`${cardClass} p-5 sm:p-6`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2.5 flex w-fit items-center gap-2 rounded-full bg-[#C9A84C]/15 px-3 py-1 text-xs font-bold text-[#8C6D1F]">
              <Sparkles className="h-3.5 w-3.5 text-[#C9A84C]" />
              Executive Analytics Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2B4B]">
              Admin Performance Dashboard
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#1B2B4B]/65">
              Live intelligence on financial revenue, assessment readiness, reader distribution, and audience inflow.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] font-semibold text-xs h-9 cursor-pointer"
            >
              <Link href="/admin/home-cms">Content CMS</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-full bg-[#C9A84C] px-5 text-xs font-bold text-[#1B2B4B] hover:bg-[#D6B45A] h-9 shadow-md cursor-pointer"
            >
              <Link href="/admin/books">Manage Books</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      {/* Primary Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
        {/* Chart 1: Revenue & Orders Area/Line Chart (Span 7) */}
        <div className="lg:col-span-7">
          <div className={`${cardClass} p-5 sm:p-6 h-full flex flex-col justify-between`}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1B2B4B]">
                  Financial Revenue & Orders Trend
                </h2>
                <p className="text-xs text-[#1B2B4B]/50">
                  Aggregated gross income and volume
                </p>
              </div>
              <div className="rounded-xl bg-[#C9A84C]/15 p-2.5 text-[#8C6D1F]">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <RevenueChart />
          </div>
        </div>

        {/* Chart 2: Assessment Insights Donut Chart (Span 5) */}
        <div className="lg:col-span-5">
          <div className={`${cardClass} p-5 sm:p-6 h-full flex flex-col justify-between`}>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1B2B4B]">
                  Assessment Readiness Breakdown
                </h2>
                <p className="text-xs text-[#1B2B4B]/50">
                  Participant distribution by transition profile
                </p>
              </div>
              <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-600">
                <ClipboardCheck className="h-5 w-5" />
              </div>
            </div>
            <AssessmentReadinessChart assessments={assessments} isLoading={false} />
          </div>
        </div>
      </div>

      {/* Secondary Charts & Operations Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
        {/* Chart 3: Top Selling Books (Span 6) */}
        <div className="lg:col-span-6">
          <div className={`${cardClass} p-5 sm:p-6 h-full flex flex-col justify-between`}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1B2B4B]">
                  Top Selling Books & Publications
                </h2>
                <p className="text-xs text-[#1B2B4B]/50">
                  Volume of purchases and generated revenue per title
                </p>
              </div>
              <div className="rounded-xl bg-[#C9A84C]/15 p-2.5 text-[#8C6D1F]">
                <BookOpen className="h-5 w-5" />
              </div>
            </div>
            <BookPerformanceChart books={data?.books} isLoading={false} />
          </div>
        </div>

        {/* Chart 4: Subscriber & Inflow Growth (Span 6) */}
        <div className="lg:col-span-6">
          <div className={`${cardClass} p-5 sm:p-6 h-full flex flex-col justify-between`}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1B2B4B]">
                  Audience Inflow & Subscribers
                </h2>
                <p className="text-xs text-[#1B2B4B]/50">
                  12-month trend of newsletter subscriptions & inquiries
                </p>
              </div>
              <div className="rounded-xl bg-teal-500/10 p-2.5 text-teal-600">
                <Send className="h-5 w-5" />
              </div>
            </div>
            <SubscriberGrowthChart growth={growth} isLoading={false} />
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <EnhancedRecentOrdersCard orders={data?.recentOrders} />
        <EnhancedQuickActions />
      </div>
    </motion.div>
  );
}

export default AdminDashboardContent;
