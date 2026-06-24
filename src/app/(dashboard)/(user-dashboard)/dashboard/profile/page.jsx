'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { ProfileHeader } from '@/features/profile/components/ProfileHeader';
import { PersonalInformationCard } from '@/features/profile/components/PersonalInformationCard';
import { LoginMethodsCard } from '@/features/profile/components/LoginMethodsCard';
import { AccountInformationCard } from '@/features/profile/components/AccountInformationCard';
import { ActivitySummaryCard } from '@/features/profile/components/ActivitySummaryCard';
import { ProfileSkeleton } from '@/features/profile/components/ProfileSkeleton';
import { ProfileErrorState } from '@/features/profile/components/ProfileErrorState';
import { useSession } from '@/hooks/useSession';

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

export default function ProfilePage() {
  const router = useRouter();
  const { session, isLoading: isSessionLoading } = useSession();
  const { data: profile, isLoading, error, refetch } = useProfile();

  useEffect(() => {
    if (!isSessionLoading && !session) {
      router.push('/auth');
    }
  }, [session, isSessionLoading, router]);

  if (isSessionLoading || isLoading) {
    return (
      <div className="py-6">
        <ProfileSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6">
        <ProfileErrorState error={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-6"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        {/* Left Column */}
        <div className="space-y-6">
          <ProfileHeader profile={profile} />
          <LoginMethodsCard profile={profile} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <PersonalInformationCard profile={profile} />
          <AccountInformationCard profile={profile} />
          <ActivitySummaryCard />
        </div>
      </div>
    </motion.div>
  );
}