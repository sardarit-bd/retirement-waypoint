'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Library,
  ShoppingBag,
  ClipboardCheck,
  User,
} from 'lucide-react';

const QUICK_ACTIONS = [
  { label: 'Browse Books', icon: BookOpen, href: '/book', color: 'text-[#C9A84C]' },
  { label: 'My Library', icon: Library, href: '/dashboard/my-books', color: 'text-emerald-500' },
  { label: 'Orders', icon: ShoppingBag, href: '/dashboard/orders', color: 'text-[#1B2B4B]' },
  {
    label: 'Assessments',
    icon: ClipboardCheck,
    href: '/dashboard/assessments',
    color: 'text-purple-500',
  },
  { label: 'Profile', icon: User, href: '/dashboard/profile', color: 'text-blue-500' },
];

export function QuickActionsCard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
      className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <h2 className="text-lg font-semibold text-[#1B2B4B] mb-4">Quick Actions</h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-3"
      >
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;

          return (
            <motion.div key={action.label} variants={itemVariants}>
              <Link
                href={action.href}
                className="flex flex-col items-center rounded-2xl bg-[#F8F5EF] p-4 transition-all duration-300 hover:bg-[#F8F5EF]/80 hover:scale-[1.02]"
              >
                <div className={`rounded-full bg-white/50 p-2.5 ${action.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="mt-2 text-xs font-medium text-[#1B2B4B]">
                  {action.label}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}