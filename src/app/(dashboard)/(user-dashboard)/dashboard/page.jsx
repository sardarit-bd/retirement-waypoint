'use client';

import { motion } from 'framer-motion';
import { useSession } from '@/hooks/useSession';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ShoppingBag, FileText, Star, TrendingUp, Clock, Sparkles } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function DashboardOverview() {
  const { session } = useSession();
  const user = session?.user;

  const stats = [
    { icon: BookOpen, label: 'My Books', value: '0', href: '/dashboard/my-books' },
    { icon: ShoppingBag, label: 'Orders', value: '0', href: '/dashboard/orders' },
    { icon: FileText, label: 'Invoices', value: '0', href: '/dashboard/invoices' },
    { icon: Star, label: 'Reviews', value: '0', href: '/dashboard/reviews' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[#C9A84C]/10 p-2">
            <Sparkles className="h-5 w-5 text-[#C9A84C]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#1B2B4B]">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}!
            </h1>
            <p className="mt-1 text-[#1B2B4B]/60">
              Here&apos;s an overview of your retirement journey progress.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] hover:shadow-[0_20px_60px_rgba(4,16,58,0.12)] transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#1B2B4B]/60">{stat.label}</p>
                      <p className="text-3xl font-bold text-[#1B2B4B]">{stat.value}</p>
                    </div>
                    <div className="rounded-full bg-gradient-to-br from-[#C9A84C]/15 to-[#D6B45A]/10 p-3 shadow-inner">
                      <Icon className="h-5 w-5 text-[#C9A84C]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Activity Card */}
      <motion.div variants={itemVariants}>
        <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-full bg-[#C9A84C]/10 p-2">
              <Clock className="h-5 w-5 text-[#C9A84C]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1B2B4B]">Recent Activity</h3>
          </div>
          
          <div className="flex flex-col items-center justify-center py-16 text-[#1B2B4B]/40">
            <div className="rounded-full bg-[#F8F5EF] p-4 mb-4">
              <Clock className="h-8 w-8" />
            </div>
            <span className="text-sm font-medium">No recent activity yet</span>
            <p className="text-xs mt-1">Your activity will appear here as you use the platform</p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}