'use client';

import { motion } from 'framer-motion';
import { BookOpen, ShoppingBag, ClipboardCheck, Star } from 'lucide-react';
import Link from 'next/link';

const STATS_CONFIG = [
  {
    key: 'books',
    label: 'My Books',
    icon: BookOpen,
    href: '/dashboard/my-books',
    color: 'text-[#C9A84C]',
    bg: 'bg-[#C9A84C]/10',
  },
  {
    key: 'orders',
    label: 'Orders',
    icon: ShoppingBag,
    href: '/dashboard/orders',
    color: 'text-[#1B2B4B]',
    bg: 'bg-[#1B2B4B]/10',
  },
  {
    key: 'assessments',
    label: 'Assessments',
    icon: ClipboardCheck,
    href: '/dashboard/assessments',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    key: 'reviews',
    label: 'Reviews',
    icon: Star,
    href: '/dashboard/reviews',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
];

export function StatsGrid({ stats }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-4 sm:grid-cols-4"
    >
      {STATS_CONFIG.map((config) => {
        const count = stats?.[config.key] || 0;
        const Icon = config.icon;

        return (
          <motion.div
            key={config.key}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={config.href}
              className="block rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(4,16,58,0.12)]"
            >
              <div className="flex items-center gap-4">
                <div className={`rounded-full ${config.bg} p-3`}>
                  <Icon className={`h-6 w-6 ${config.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1B2B4B]">{count}</p>
                  <p className="text-sm text-[#1B2B4B]/60">{config.label}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}