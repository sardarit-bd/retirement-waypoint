'use client';

import { motion } from 'framer-motion';
import { Ticket, CheckCircle, XCircle, Clock, Users, Calendar } from 'lucide-react';

const cardClass = 'rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]';

export function CouponStatsCard({ stats, isLoading }) {
  const statItems = [
    {
      label: 'Total Coupons',
      value: stats?.total || 0,
      icon: Ticket,
      color: 'text-[#C9A84C]',
      bg: 'bg-[#C9A84C]/10',
    },
    {
      label: 'Active',
      value: stats?.active || 0,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Inactive',
      value: stats?.inactive || 0,
      icon: XCircle,
      color: 'text-gray-500',
      bg: 'bg-gray-500/10',
    },
    {
      label: 'Expired',
      value: stats?.expired || 0,
      icon: Clock,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
    },
    {
      label: 'Total Usages',
      value: stats?.totalUsages || 0,
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Total Discount',
      value: stats?.totalDiscount ? `$${stats.totalDiscount.toFixed(2)}` : '$0.00',
      icon: Calendar,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`${cardClass} p-4 animate-pulse`}>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-3 w-16 bg-gray-200 rounded" />
                <div className="h-7 w-12 bg-gray-200 rounded" />
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
    >
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`${cardClass} p-4 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(4,16,58,0.12)]`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-[#1B2B4B]/60">{item.label}</p>
                <p className="mt-1 text-2xl font-bold text-[#1B2B4B]">{item.value}</p>
              </div>
              <div className={`rounded-full ${item.bg} p-2.5 ${item.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}