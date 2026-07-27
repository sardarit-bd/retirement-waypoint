'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

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
      <p className="text-sm font-semibold text-[#1B2B4B]">{label}</p>
      <p className="mt-1 text-xs text-[#1B2B4B]/60">
        Revenue: <span className="font-semibold text-[#C9A84C]">{formatCurrency(data?.revenue || 0)}</span>
      </p>
      <p className="text-xs text-[#1B2B4B]/60">
        Purchases: <span className="font-semibold">{data?.purchases || 0}</span>
      </p>
    </div>
  );
}

function EmptyChartState() {
  return (
    <div className="flex min-h-52 items-center justify-center rounded-2xl bg-[#F8F5EF] text-sm text-[#1B2B4B]/50">
      Sales data will appear here.
    </div>
  );
}

export function BookPerformanceChart({ books, isLoading }) {
  const chartData = useMemo(() => {
    if (!books?.topSelling?.length) return [];
    return books.topSelling.slice(0, 5).map((b) => ({
      title: b.title,
      revenue: b.sales || 0,
      purchases: b.purchaseCount || 0,
    }));
  }, [books]);

  if (isLoading) {
    return (
      <div className="min-h-52 animate-pulse rounded-2xl bg-[#F8F5EF]" />
    );
  }

  if (chartData.length === 0) {
    return <EmptyChartState />;
  }

  return (
    <div className="w-full" style={{ height: 'clamp(240px, 45vh, 360px)' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
          barSize={24}
          barGap={12}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="title"
            tick={{ fontSize: 11, fill: '#1B2B4B', opacity: 0.7 }}
            tickLine={false}
            axisLine={false}
            width={130}
            tickFormatter={(val) => val.length > 18 ? val.slice(0, 18) + '…' : val}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: '#1B2B4B', opacity: 0.03 }}
          />
          <Bar
            dataKey="revenue"
            fill="#C9A84C"
            radius={[0, 8, 8, 0]}
            animationDuration={800}
            label={{
              position: 'right',
              formatter: (v) => formatCurrency(v),
              fontSize: 10,
              fill: '#1B2B4B',
              opacity: 0.7,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
