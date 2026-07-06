'use client';

import { motion } from 'framer-motion';
import {
  BookOpen,
  ShoppingBag,
  ClipboardCheck,
  Star,
  Clock,
} from 'lucide-react';

const ACTIVITY_ICONS = {
  BOOK_PURCHASED: BookOpen,
  ORDER_COMPLETED: ShoppingBag,
  ASSESSMENT_SUBMITTED: ClipboardCheck,
  REVIEW_ADDED: Star,
};

const ACTIVITY_COLORS = {
  BOOK_PURCHASED: 'text-[#C9A84C] bg-[#C9A84C]/10',
  ORDER_COMPLETED: 'text-[#1B2B4B] bg-[#1B2B4B]/10',
  ASSESSMENT_SUBMITTED: 'text-emerald-500 bg-emerald-500/10',
  REVIEW_ADDED: 'text-purple-500 bg-purple-500/10',
};

const ACTIVITY_LABELS = {
  BOOK_PURCHASED: 'Book Purchased',
  ORDER_COMPLETED: 'Order Completed',
  ASSESSMENT_SUBMITTED: 'Assessment Submitted',
  REVIEW_ADDED: 'Review Added',
};

export function ActivityTimelineCard({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
      >
        <h2 className="text-lg font-semibold text-[#1B2B4B] mb-4">Activity Timeline</h2>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Clock className="h-12 w-12 text-[#1B2B4B]/20" />
          <p className="mt-3 text-[#1B2B4B]/60">No recent activity</p>
          <p className="text-sm text-[#1B2B4B]/40">Start your journey by exploring books or taking assessments</p>
        </div>
      </motion.div>
    );
  }

  const formatDate = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffMs = now - activityDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return activityDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <h2 className="text-lg font-semibold text-[#1B2B4B] mb-4">Activity Timeline</h2>

      <div className="space-y-4">
        {activities.slice(0, 5).map((activity, index) => {
          const Icon = ACTIVITY_ICONS[activity.type] || BookOpen;
          const colorClass = ACTIVITY_COLORS[activity.type] || 'text-[#1B2B4B] bg-[#1B2B4B]/10';
          const label = ACTIVITY_LABELS[activity.type] || activity.type;

          return (
            <motion.div
              key={activity._id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-4"
            >
              {/* Icon */}
              <div className={`rounded-full ${colorClass} p-2.5`}>
                <Icon className="h-4 w-4" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1B2B4B]">{label}</p>
                {activity.description && (
                  <p className="text-xs text-[#1B2B4B]/60">{activity.description}</p>
                )}
                <p className="mt-1 text-xs text-[#1B2B4B]/40">
                  {formatDate(activity.createdAt || activity.date)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}