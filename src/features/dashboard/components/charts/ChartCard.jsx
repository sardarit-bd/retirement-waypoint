'use client';

import { motion } from 'framer-motion';

const cardClass =
  'rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]';

export function ChartCard({ title, subtitle, icon: Icon, children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`${cardClass} p-6 ${className}`}
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#1B2B4B]">{title}</h2>
          {subtitle && <p className="text-sm text-[#1B2B4B]/50">{subtitle}</p>}
        </div>
        {Icon && <Icon className="h-5 w-5 text-[#C9A84C]" />}
      </div>
      {children}
    </motion.div>
  );
}
