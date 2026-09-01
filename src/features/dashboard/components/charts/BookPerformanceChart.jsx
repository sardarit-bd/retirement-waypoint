'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import { BookOpen } from 'lucide-react';

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value = 0) =>
  new Intl.NumberFormat('en-US').format(value);

const BAR_COLORS = ['#C9A84C', '#D6B45A', '#B5953C', '#9E802F', '#876D24'];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload;
  return (
    <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#04103A] p-3 text-white shadow-2xl backdrop-blur-xl min-w-[200px]">
      <p className="text-xs font-bold text-white mb-2 line-clamp-2">
        {data?.title}
      </p>
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between text-white/80">
          <span>Revenue Generated:</span>
          <span className="font-bold text-[#C9A84C]">
            {formatCurrency(data?.revenue || 0)}
          </span>
        </div>
        <div className="flex items-center justify-between text-white/80">
          <span>Units Purchased:</span>
          <span className="font-bold text-white">
            {formatNumber(data?.purchases || 0)}
          </span>
        </div>
        {data?.price > 0 && (
          <div className="flex items-center justify-between text-[11px] text-white/50 border-t border-white/10 pt-1">
            <span>List Price:</span>
            <span>{formatCurrency(data.price)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyChartState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-56 rounded-2xl border border-dashed border-[#1B2B4B]/15 bg-[#F8F5EF] p-6 text-center">
      <div className="rounded-full bg-[#C9A84C]/15 p-3 text-[#8C6D1F] mb-2">
        <BookOpen className="h-6 w-6" />
      </div>
      <p className="text-sm font-bold text-[#1B2B4B]">No Book Sales Yet</p>
      <p className="mt-1 text-xs text-[#1B2B4B]/60 max-w-xs">
        Book sales and individual title revenues will rank here as customers make purchases.
      </p>
    </div>
  );
}

export function BookPerformanceChart({ books, isLoading }) {
  const chartData = useMemo(() => {
    if (!books?.topSelling?.length) return [];
    return books.topSelling.slice(0, 5).map((b) => ({
      title: b.title || 'Untitled Book',
      revenue: b.sales || 0,
      purchases: b.purchaseCount || 0,
      price: b.price || (b.purchaseCount > 0 ? b.sales / b.purchaseCount : 0),
    }));
  }, [books]);

  if (isLoading) {
    return (
      <div className="min-h-56 animate-pulse rounded-2xl bg-[#F8F5EF] p-4 flex flex-col justify-center space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-6 rounded-lg bg-[#1B2B4B]/5" />
        ))}
      </div>
    );
  }

  if (chartData.length === 0) {
    return <EmptyChartState />;
  }

  return (
    <div className="w-full h-[240px] sm:h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 25, left: -5, bottom: 5 }}
          barSize={20}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1B2B4B"
            strokeOpacity={0.05}
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fontSize: 10, fill: '#1B2B4B', opacity: 0.5 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `$${val}`}
          />
          <YAxis
            type="category"
            dataKey="title"
            tick={{ fontSize: 11, fill: '#1B2B4B', opacity: 0.75 }}
            tickLine={false}
            axisLine={false}
            width={120}
            tickFormatter={(val) => (val.length > 16 ? val.slice(0, 16) + '…' : val)}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: '#1B2B4B', opacity: 0.04 }}
          />
          <Bar
            dataKey="revenue"
            radius={[0, 8, 8, 0]}
            animationDuration={800}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={BAR_COLORS[index % BAR_COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BookPerformanceChart;
