'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';
import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

const periodTabs = [
  { key: '7d', label: '7 Days', backendPeriod: 'daily', limit: 7 },
  { key: '30d', label: '30 Days', backendPeriod: 'daily', limit: 30 },
  { key: '90d', label: '90 Days', backendPeriod: 'daily', limit: 90 },
  { key: '12m', label: '12 Months', backendPeriod: 'monthly', limit: 12 },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload;
  return (
    <div className="rounded-xl border border-white/20 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-lg">
      <p className="text-xs font-medium text-[#1B2B4B]/60">{label}</p>
      <p className="mt-1 text-lg font-bold text-[#1B2B4B]">{formatCurrency(data?.revenue || 0)}</p>
      <p className="text-xs text-[#1B2B4B]/50">{data?.ordersCount || 0} orders</p>
      {data?.avgOrderValue ? (
        <p className="text-xs text-[#1B2B4B]/50">Avg: {formatCurrency(data.avgOrderValue)}</p>
      ) : null}
    </div>
  );
}

function EmptyChartState({ message }) {
  return (
    <div className="flex min-h-52 items-center justify-center rounded-2xl bg-[#F8F5EF] text-sm text-[#1B2B4B]/50">
      {message}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="min-h-52 animate-pulse rounded-2xl bg-[#F8F5EF]">
      <div className="flex h-full items-center justify-center">
        <div className="h-32 w-full rounded-2xl bg-[#1B2B4B]/5" />
      </div>
    </div>
  );
}

export function RevenueChart() {
  const [activePeriod, setActivePeriod] = useState('7d');
  const tab = periodTabs.find((t) => t.key === activePeriod);

  const { data: revenueData, isLoading } = useQuery({
    queryKey: ['revenue-analytics', tab?.backendPeriod],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.ANALYTICS.REVENUE, {
        params: { period: tab?.backendPeriod || 'daily' },
      });
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const chartData = useMemo(() => {
    if (!revenueData?.data?.length) return [];
    const rows = [...revenueData.data].reverse();
    return rows.slice(0, tab?.limit || 7).map((item) => ({
      period: item.period,
      revenue: item.revenue || 0,
      ordersCount: item.ordersCount || 0,
      avgOrderValue:
        item.ordersCount > 0 ? Math.round((item.revenue / item.ordersCount) * 100) / 100 : 0,
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
  const avgOrderValue = totalOrders > 0
    ? Math.round((totalRevenue / totalOrders) * 100) / 100
    : 0;

  return (
    <div>
      {/* Period Tabs */}
      <div className="mb-4 flex gap-1.5">
        {periodTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActivePeriod(tab.key)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer',
              activePeriod === tab.key
                ? 'bg-[#C9A84C] text-[#04103A] shadow-sm'
                : 'bg-[#F8F5EF] text-[#1B2B4B]/60 hover:bg-[#F8F5EF]/80'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Summary */}
      {isLoading ? null : chartData.length > 0 && (
        <div className="mb-4 flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <div>
            <span className="text-2xl font-bold text-[#1B2B4B]">{formatCurrency(totalRevenue)}</span>
            <span className="ml-2 text-xs text-[#1B2B4B]/50">total revenue</span>
          </div>
          <div>
            <span className="text-lg font-semibold text-[#1B2B4B]">{totalOrders}</span>
            <span className="ml-1 text-xs text-[#1B2B4B]/50">orders</span>
          </div>
          <div>
            <span className="text-lg font-semibold text-[#1B2B4B]">{formatCurrency(avgOrderValue)}</span>
            <span className="ml-1 text-xs text-[#1B2B4B]/50">avg order</span>
          </div>
        </div>
      )}

      {/* Chart */}
      {isLoading ? (
        <ChartSkeleton />
      ) : chartData.length === 0 ? (
        <EmptyChartState message="Revenue data will appear after paid orders." />
      ) : (
        <div className="w-full" style={{ height: 'clamp(200px, 40vh, 320px)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#C9A84C" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1B2B4B" strokeOpacity={0.06} />
            <XAxis
              dataKey="period"
              tick={{ fontSize: 11, fill: '#1B2B4B', opacity: 0.5 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => {
                if (activePeriod === '12m') return val.slice(5);
                return val.slice(5);
              }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#1B2B4B', opacity: 0.5 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${Math.round(val / 1000)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#C9A84C"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              animationDuration={800}
              dot={false}
              activeDot={{ r: 5, fill: '#C9A84C', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
