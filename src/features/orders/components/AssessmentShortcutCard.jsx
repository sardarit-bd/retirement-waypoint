'use client';

import { motion } from 'framer-motion';
import { ClipboardCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AssessmentShortcutCard({ order }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-[#C9A84C]/10 p-3">
          <ClipboardCheck className="h-6 w-6 text-[#C9A84C]" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[#1B2B4B]">
            Continue Assessment
          </h3>
          <p className="text-sm text-[#1B2B4B]/60 mt-1">
            Complete your assessment to continue your retirement planning journey
          </p>
          <Button
            asChild
            className="mt-3 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-6 text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
          >
            <Link href="/dashboard/assessments">
              Take Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}