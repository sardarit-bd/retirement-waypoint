// app/(dashboard)/(admin-dashboard)/admin/layout.jsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DashboardSidebar } from '@/components/dashboard/sidebar/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/header/DashboardHeader';
import { useSession } from '@/hooks/useSession';

export default function AdminLayout({ children }) {
  const { session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!session) {
        router.push('/auth');
      } else if (session.user?.role !== 'admin') {
        router.push('/dashboard');
      }
    }
  }, [session, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F5EF] flex items-center justify-center">
        <div className="animate-pulse text-[#1B2B4B]">Loading...</div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#C9A84C]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#1B2B4B]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[#C9A84C]/3 blur-3xl" />
      </div>

      <DashboardHeader />
      
      <div className="flex pt-[72px]">
        <DashboardSidebar />
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex-1 p-4 md:p-6 lg:p-8 lg:pl-[320px]"
        >
          <div className="relative z-10 mx-auto max-w-7xl">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}