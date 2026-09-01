'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { cn } from '@/lib/utils';
import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';

const periodTabs = [
  { key: '7d', label: '7 Days', backendPeriod: 'daily', limit: 7 },
  { key: '30d', label: '30 Days', backendPeriod: 'daily', limit: 30 },
  { key: '12m', label: '12 Months', backendPeriod: 'monthly', limit: 12 },
];

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value = 0) =>
  new Intl.NumberFormat('en-US').format(value);

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload;
  return (
    <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#04103A] p-4 text-white shadow-2xl backdrop-blur-xl min-w-[200px]">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
        <span className="text-xs font-semibold text-white/70">{label}</span>
        <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wider">Metrics</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#C9A84C]" />
            <span>Revenue</span>
          </div>
          <span className="text-sm font-bold text-white">{formatCurrency(data?.revenue || 0)}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
            <span>Orders</span>
          </div>
          <span className="text-sm font-bold text-white">{formatNumber(data?.ordersCount || 0)}</span>
        </div>
        {data?.avgOrderValue > 0 && (
          <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-1.5 text-[11px] text-white/50">
            <span>Avg / Order</span>
            <span>{formatCurrency(data.avgOrderValue)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyChartState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 rounded-2xl border border-dashed border-[#1B2B4B]/15 bg-[#F8F5EF] p-8 text-center">
      <div className="rounded-full bg-[#C9A84C]/15 p-3 text-[#8C6D1F] mb-2">
        <TrendingUp className="h-6 w-6" />
      </div>
      <p className="text-sm font-bold text-[#1B2B4B]">No Transaction Data Yet</p>
      <p className="mt-1 text-xs text-[#1B2B4B]/60 max-w-xs">{message}</p>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="min-h-64 animate-pulse rounded-2xl bg-[#F8F5EF] p-4 flex flex-col justify-end">
      <div className="h-44 w-full rounded-2xl bg-[#1B2B4B]/5" />
    </div>
  );
}

export function RevenueChart() {
  const [activePeriod, setActivePeriod] = useState('30d');
  const tab = periodTabs.find((t) => t.key === activePeriod) || periodTabs[1];

  const { data: revenueData, isLoading } = useQuery({
    queryKey: ['revenue-analytics', tab.backendPeriod],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.ANALYTICS.REVENUE, {
        params: { period: tab.backendPeriod },
      });
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const chartData = useMemo(() => {
    if (!revenueData?.data?.length) return [];
    const rows = [...revenueData.data];
    return rows.slice(-tab.limit).map((item) => ({
      period: item.period,
      revenue: item.revenue || 0,
      ordersCount: item.ordersCount || 0,
      avgOrderValue:
        item.ordersCount > 0
          ? Math.round((item.revenue / item.ordersCount) * 100) / 100
          : 0,
    }));
  }, [revenueData, tab]);

  const totalRevenue = useMemo(
    () => chartData.reduce((sum, d) => sum + d.revenue, 0),
    [chartData]
  );
  const totalOrders = useMemo(
    () => chartData.reduce((sum, d) => sum + d.ordersCount, 0),
    [chartData]
  );
  const avgOrderValue =
    totalOrders > 0 ? Math.round((totalRevenue / totalOrders) * 100) / 100 : 0;

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Quick summary badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 rounded-xl bg-[#C9A84C]/10 px-3 py-1.5">
            <DollarSign className="h-4 w-4 text-[#8C6D1F]" />
            <div>
              <span className="text-xs font-bold text-[#1B2B4B]">{formatCurrency(totalRevenue)}</span>
              <span className="ml-1 text-[10px] text-[#1B2B4B]/50 font-medium">period revenue</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl bg-blue-500/10 px-3 py-1.5">
            <ShoppingBag className="h-4 w-4 text-blue-600" />
            <div>
              <span className="text-xs font-bold text-[#1B2B4B]">{formatNumber(totalOrders)}</span>
              <span className="ml-1 text-[10px] text-[#1B2B4B]/50 font-medium">orders</span>
            </div>
          </div>
        </div>

        {/* Time Period Filter Tabs */}
        <div className="flex items-center rounded-xl bg-[#F8F5EF] p-1 border border-[#1B2B4B]/10 self-start sm:self-auto">
          {periodTabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActivePeriod(t.key)}
              className={cn(
                'rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer',
                activePeriod === t.key
                  ? 'bg-white text-[#1B2B4B] shadow-sm'
                  : 'text-[#1B2B4B]/60 hover:text-[#1B2B4B]'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      {isLoading ? (
        <ChartSkeleton />
      ) : chartData.length === 0 ? (
        <EmptyChartState message="Daily transactions and revenue trends will graph here automatically." />
      ) : (
        <div className="w-full h-[280px] sm:h-[320px] pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1B2B4B"
                strokeOpacity={0.07}
                vertical={false}
              />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 11, fill: '#1B2B4B', opacity: 0.6 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => {
                  if (activePeriod === '12m') return val;
                  return val.length > 5 ? val.slice(5) : val;
                }}
              />
              <YAxis
                yAxisId="revenue"
                tick={{ fontSize: 11, fill: '#1B2B4B', opacity: 0.6 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `$${val}`}
              />
              <YAxis
                yAxisId="orders"
                orientation="right"
                tick={{ fontSize: 11, fill: '#3B82F6', opacity: 0.6 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                height={28}
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingTop: '-10px' }}
              />
              <Area
                yAxisId="revenue"
                type="monotone"
                name="Revenue ($)"
                dataKey="revenue"
                stroke="#C9A84C"
                strokeWidth={3}
                fill="url(#revenueGradient)"
                activeDot={{ r: 6, fill: '#C9A84C', stroke: '#fff', strokeWidth: 2 }}
              />
              <Line
                yAxisId="orders"
                type="monotone"
                name="Orders"
                dataKey="ordersCount"
                stroke="#3B82F6"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#3B82F6' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default RevenueChart;
