'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Users, Mail } from 'lucide-react';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload;
  return (
    <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#04103A] p-3 text-white shadow-2xl backdrop-blur-xl min-w-[170px]">
      <p className="text-xs font-semibold text-white/70 mb-2">{label}</p>
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between gap-3 text-white/80">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#10B981]" />
            <span>Subscribers</span>
          </div>
          <span className="font-bold text-white">{data?.subscribers || 0}</span>
        </div>
        <div className="flex items-center justify-between gap-3 text-white/80">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#C9A84C]" />
            <span>Contact Inquiries</span>
          </div>
          <span className="font-bold text-white">{data?.contacts || 0}</span>
        </div>
      </div>
    </div>
  );
}

function EmptyChartState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-56 rounded-2xl border border-dashed border-[#1B2B4B]/15 bg-[#F8F5EF] p-6 text-center">
      <div className="rounded-full bg-[#10B981]/15 p-3 text-emerald-600 mb-2">
        <Users className="h-6 w-6" />
      </div>
      <p className="text-sm font-bold text-[#1B2B4B]">No Growth Data</p>
      <p className="mt-1 text-xs text-[#1B2B4B]/60 max-w-xs">
        Subscriber and contact inflow will graph across the last 12 months.
      </p>
    </div>
  );
}

export function SubscriberGrowthChart({ growth, isLoading }) {
  const chartData = useMemo(() => {
    if (!growth?.growth?.length) return [];
    return growth.growth.map((g) => ({
      month: g.label || g.month,
      subscribers: g.subscribers || 0,
      contacts: g.contacts || 0,
    }));
  }, [growth]);

  if (isLoading) {
    return (
      <div className="min-h-56 animate-pulse rounded-2xl bg-[#F8F5EF] p-4 flex flex-col justify-end">
        <div className="h-36 w-full rounded-2xl bg-[#1B2B4B]/5" />
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
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1B2B4B"
            strokeOpacity={0.06}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: '#1B2B4B', opacity: 0.6 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#1B2B4B', opacity: 0.6 }}
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
            wrapperStyle={{ fontSize: '11px' }}
          />
          <Bar
            name="New Subscribers"
            dataKey="subscribers"
            fill="#10B981"
            radius={[4, 4, 0, 0]}
            maxBarSize={18}
          />
          <Bar
            name="Contact Messages"
            dataKey="contacts"
            fill="#C9A84C"
            radius={[4, 4, 0, 0]}
            maxBarSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SubscriberGrowthChart;
