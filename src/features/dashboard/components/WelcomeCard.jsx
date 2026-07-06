'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export function WelcomeCard({ userName }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/dashboard/welcome-bg.png')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#04103A]/10" />

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {userName}
            </h1>

            <p className="mt-1 text-white/80">
              Continue building a meaningful retirement journey.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
            <Calendar className="h-4 w-4" />
            <span>{currentDate}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}