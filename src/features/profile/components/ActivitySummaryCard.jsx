'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, ShoppingBag, ClipboardCheck } from 'lucide-react';

const activityItems = [
  { icon: BookOpen, label: 'Books', value: '0', color: 'from-blue-500 to-blue-600' },
  { icon: ShoppingBag, label: 'Orders', value: '0', color: 'from-emerald-500 to-emerald-600' },
  { icon: ClipboardCheck, label: 'Assessments', value: '0', color: 'from-purple-500 to-purple-600' },
];

export function ActivitySummaryCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-semibold text-[#1B2B4B]">Activity</h3>

          <div className="grid grid-cols-3 gap-3">
            {activityItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl border border-[#1B2B4B]/5 bg-[#F8F5EF] p-3 text-center transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex justify-center">
                    <div className={`rounded-full bg-gradient-to-br ${item.color} p-1.5`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <p className="mt-2 text-lg font-bold text-[#1B2B4B]">{item.value}</p>
                  <p className="text-[10px] text-[#1B2B4B]/50">{item.label}</p>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}