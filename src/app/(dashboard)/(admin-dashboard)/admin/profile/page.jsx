'use client';

import { motion } from 'framer-motion';
import { useAdminProfile } from '@/features/profile/admin/hooks/useAdminProfile';
import { ProfileCard } from '@/features/profile/admin/components/ProfileCard';
import { PersonalInfoCard } from '@/features/profile/admin/components/PersonalInfoCard';
import { ChangePasswordCard } from '@/features/profile/admin/components/ChangePasswordCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function AdminProfilePage() {
  const { data: profile, isLoading, error } = useAdminProfile();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-6"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1B2B4B]">Profile</h1>
        <p className="mt-1 text-[#1B2B4B]/60">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Left Column */}
        <div className="space-y-6">
          <ProfileCard profile={profile} isLoading={isLoading} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <PersonalInfoCard profile={profile} isLoading={isLoading} />
          <ChangePasswordCard />
        </div>
      </div>
    </motion.div>
  );
}