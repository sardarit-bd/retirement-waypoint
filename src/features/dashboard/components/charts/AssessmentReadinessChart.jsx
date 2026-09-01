'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ClipboardCheck } from 'lucide-react';

const COLORS = [
  '#C9A84C', // Gold
  '#1B2B4B', // Navy
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#8B5CF6', // Purple
  '#F59E0B', // Amber
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#04103A] p-3 text-white shadow-2xl backdrop-blur-xl min-w-[170px]">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: data.payload?.fill || '#C9A84C' }}
        />
        <span className="text-xs font-bold text-white truncate">
          {data.name}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-white/80">
        <span>Participants:</span>
        <span className="font-bold text-[#C9A84C]">{data.value}</span>
      </div>
      <div className="flex items-center justify-between text-[11px] text-white/50">
        <span>Distribution:</span>
        <span>{data.payload?.percentage || 0}%</span>
      </div>
    </div>
  );
}

export function AssessmentReadinessChart({ assessments, isLoading }) {
  const distribution = assessments?.readinessDistribution || [];
  const totalSubmissions = assessments?.totalSubmissions || 0;

  const chartData = useMemo(() => {
    if (!distribution.length) return [];
    return distribution.map((item, idx) => ({
      name: item.name,
      value: item.value || (totalSubmissions === 0 ? 1 : 0),
      percentage: item.percentage || 0,
      color: COLORS[idx % COLORS.length],
    }));
  }, [distribution, totalSubmissions]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center animate-pulse">
        <div className="h-44 w-44 rounded-full bg-[#1B2B4B]/5" />
      </div>
    );
  }

  if (totalSubmissions === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 rounded-2xl border border-dashed border-[#1B2B4B]/15 bg-[#F8F5EF] p-6 text-center">
        <div className="rounded-full bg-[#C9A84C]/15 p-3 text-[#8C6D1F] mb-2">
          <ClipboardCheck className="h-6 w-6" />
        </div>
        <p className="text-sm font-bold text-[#1B2B4B]">No Assessment Submissions</p>
        <p className="mt-1 text-xs text-[#1B2B4B]/60 max-w-xs">
          Participant readiness distribution will graph here as visitors complete assessments.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Donut Chart Container */}
      <div className="relative h-[220px] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={88}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Counter */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-[#1B2B4B]">
            {totalSubmissions}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B2B4B]/50">
            Submissions
          </span>
        </div>
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#1B2B4B]/5">
        {chartData.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-2 rounded-xl bg-[#F8F5EF] p-2 px-3 text-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate font-medium text-[#1B2B4B]">
                {item.name}
              </span>
            </div>
            <div className="shrink-0 text-right">
              <span className="font-bold text-[#1B2B4B]">{item.value}</span>
              <span className="ml-1 text-[10px] text-[#1B2B4B]/50">
                ({item.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssessmentReadinessChart;
