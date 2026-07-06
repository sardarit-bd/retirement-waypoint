'use client';

import { motion } from 'framer-motion';
import { Star, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

const cardClass = 'rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]';

export function AdminReviewStats({ stats, isLoading }) {
  const statItems = [
    {
      label: 'Total Reviews',
      value: stats?.totalReviews || 0,
      icon: Star,
      color: 'text-[#C9A84C]',
      bg: 'bg-[#C9A84C]/10',
    },
    {
      label: 'Pending',
      value: stats?.pendingReviews || 0,
      icon: Clock,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
    {
      label: 'Approved',
      value: stats?.approvedReviews || 0,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Average Rating',
      value: stats?.averageRating?.toFixed(1) || '0.0',
      icon: TrendingUp,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`${cardClass} p-6 animate-pulse`}>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-8 w-16 bg-gray-200 rounded" />
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-200" />
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
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`${cardClass} p-6 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(4,16,58,0.12)]`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#1B2B4B]/60">{item.label}</p>
                <p className="mt-2 text-3xl font-bold text-[#1B2B4B]">{item.value}</p>
              </div>
              <div className={`rounded-full ${item.bg} p-3 ${item.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}