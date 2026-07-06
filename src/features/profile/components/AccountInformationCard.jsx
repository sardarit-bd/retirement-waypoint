'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, User, Clock } from 'lucide-react';

export function AccountInformationCard({ profile }) {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const infoItems = [
    {
      icon: Shield,
      label: 'Role',
      value: profile?.role?.charAt(0).toUpperCase() + profile?.role?.slice(1) || 'User',
    },
    {
      icon: CheckCircle,
      label: 'Email Verified',
      value: profile?.emailVerified ? (
        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
          ✓ Verified
        </Badge>
      ) : (
        <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
          Pending
        </Badge>
      ),
    },
    {
      icon: User,
      label: 'Account Status',
      value: profile?.isActive !== false ? (
        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
          ● Active
        </Badge>
      ) : (
        <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
          Inactive
        </Badge>
      ),
    },
    {
      icon: Clock,
      label: 'Joined',
      value: formatDate(profile?.createdAt),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <CardContent className="p-6">
          <h3 className="mb-6 text-lg font-semibold text-[#1B2B4B]">Account Information</h3>

          <div className="space-y-4">
            {infoItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  className="flex items-center justify-between border-b border-[#1B2B4B]/5 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#C9A84C]/10 p-2">
                      <Icon className="h-4 w-4 text-[#C9A84C]" />
                    </div>
                    <span className="text-sm font-medium text-[#1B2B4B]/60">
                      {item.label}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-[#1B2B4B]">
                    {item.value}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}