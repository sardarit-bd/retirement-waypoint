'use client';

import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, UserPlus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const cardClass =
  'rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]';

function StatCard({ icon: Icon, label, value, color, bg }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className={`${cardClass} p-4 sm:p-6`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium text-[#1B2B4B]/60 truncate">{label}</p>
          <p className="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-bold text-[#1B2B4B]">{value}</p>
        </div>
        <div className={`rounded-full ${bg} p-2.5 sm:p-3 ${color} shrink-0`}>
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </div>
    </motion.div>
  );
}

function StatSkeleton() {
  return (
    <div className={`${cardClass} p-4 sm:p-6`}>
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-3 h-8 w-12" />
    </div>
  );
}

export function NewsletterSubscribersStats({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <StatSkeleton key={i} />
        ))}
      </div>
    );
  }

  const stats = data || {};

  const cards = [
    { icon: Users, label: 'Total Subscribers', value: stats.total ?? 0, color: 'text-[#C9A84C]', bg: 'bg-[#C9A84C]/10' },
    { icon: UserCheck, label: 'Active', value: stats.active ?? 0, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { icon: UserX, label: 'Unsubscribed', value: stats.unsubscribed ?? 0, color: 'text-gray-500', bg: 'bg-gray-500/10' },
    { icon: UserPlus, label: 'New Today', value: stats.newToday ?? 0, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}