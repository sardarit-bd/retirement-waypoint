'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, ClipboardCheck, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DEFAULT_RECOMMENDATIONS = [
  {
    id: 'browse-books',
    label: 'Explore New Books',
    description: 'Discover books to support your retirement journey',
    icon: BookOpen,
    href: '/book',
    color: 'text-[#C9A84C] bg-[#C9A84C]/10',
  },
  {
    id: 'continue-assessment',
    label: 'Continue Assessment',
    description: 'Track your retirement readiness progress',
    icon: ClipboardCheck,
    href: '/dashboard/assessments',
    color: 'text-emerald-500 bg-emerald-500/10',
  },
  {
    id: 'retirement-tips',
    label: 'Retirement Tips',
    description: 'Expert advice for your golden years',
    icon: Lightbulb,
    href: '/resources',
    color: 'text-purple-500 bg-purple-500/10',
  },
];

export function RecommendationsCard({ recommendations = DEFAULT_RECOMMENDATIONS }) {
  // ✅ Safety check: ensure recommendations is an array
  const recs = Array.isArray(recommendations) ? recommendations : DEFAULT_RECOMMENDATIONS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-full bg-[#C9A84C]/10 p-2">
          <Sparkles className="h-5 w-5 text-[#C9A84C]" />
        </div>
        <h2 className="text-lg font-semibold text-[#1B2B4B]">Recommendations</h2>
      </div>

      <div className="space-y-3">
        {recs.slice(0, 3).map((rec, index) => {
          const Icon = rec.icon;

          return (
            <motion.div
              key={rec.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Link
                href={rec.href || '#'}
                className="block rounded-2xl bg-[#F8F5EF] p-4 transition-all duration-300 hover:bg-[#F8F5EF]/80 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-full ${rec.color || 'text-[#1B2B4B] bg-[#1B2B4B]/10'} p-2`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1B2B4B]">{rec.label || 'Recommendation'}</p>
                    <p className="text-xs text-[#1B2B4B]/60">{rec.description || ''}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#1B2B4B]/30" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}