'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Mail as MailIcon,
  Calendar,
  Tag,
  UserCheck,
  UserX,
  Trash2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { formatDateTime } from '@/lib/date-utils';
import { SubscriberStatusBadge, useDeleteSubscriber, useNewsletterSubscriber, useUpdateSubscriberStatus } from '@/features/newsletter-subscribers/components';
// import {
//   SubscriberStatusBadge,
//   useNewsletterSubscriber,
//   useUpdateSubscriberStatus,
//   useDeleteSubscriber,
// } from '@/features/newsletter-subscribers';

const cardClass =
  'rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]';

const SOURCE_LABELS = {
  homepage: 'Homepage',
  footer: 'Footer',
  contact: 'Contact',
  manual: 'Manual',
};

function InfoRow({ label, value, icon: Icon }) {
  return (
    <div className="flex items-start gap-3 border-b border-[#1B2B4B]/5 py-2.5 last:border-0">
      {Icon && (
        <div className="mt-0.5 shrink-0 rounded-md bg-[#C9A84C]/10 p-1.5">
          <Icon className="h-4 w-4 text-[#C9A84C]" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-xs text-[#1B2B4B]/50">{label}</p>
        <p className="break-words text-sm font-medium text-[#1B2B4B]">{value || '—'}</p>
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-4 p-3 sm:space-y-6 sm:p-4 md:p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-8 w-48" />
      </div>
      <Card className={cardClass}>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function NewsletterSubscriberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { data: subscriber, isLoading, error } = useNewsletterSubscriber(id);
  const updateStatus = useUpdateSubscriberStatus();
  const deleteSubscriber = useDeleteSubscriber();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleStatusChange = (status) => {
    updateStatus.mutate({ id, status });
  };

  const handleDelete = () => {
    deleteSubscriber.mutate(id, {
      onSuccess: () => {
        router.push('/admin/newsletter-subscribers');
      },
    });
    setConfirmDelete(false);
  };

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error || !subscriber) {
    return (
      <div className="mx-auto max-w-4xl p-3 sm:p-4 md:p-6">
        <div className={`${cardClass} flex flex-col items-center justify-center p-12 text-center`}>
          <div className="mb-4 w-fit rounded-full bg-red-50 p-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-lg font-medium text-[#1B2B4B]">Subscriber Not Found</h3>
          <p className="mt-1 text-sm text-[#1B2B4B]/60">
            {error?.response?.data?.message || 'This subscriber does not exist.'}
          </p>
          <Button
            className="mt-4 rounded-full bg-[#C9A84C] font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] cursor-pointer"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-3xl space-y-4 p-3 sm:space-y-6 sm:p-4 md:p-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/admin/newsletter-subscribers')}
          className="h-9 rounded-full border border-[#1B2B4B]/10 px-3 text-[#1B2B4B] hover:bg-[#F8F5EF] cursor-pointer"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <SubscriberStatusBadge status={subscriber.status} />
      </div>

      <h1 className="break-words text-xl font-bold text-[#1B2B4B] sm:text-2xl">
        {subscriber.email}
      </h1>

      {/* Details */}
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-[#1B2B4B]">
            <MailIcon className="h-5 w-5 text-[#C9A84C]" />
            Subscriber Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="Email" value={subscriber.email} icon={MailIcon} />
          <InfoRow
            label="Source"
            value={
              <Badge variant="outline" className="border-[#1B2B4B]/10 text-[#1B2B4B]/70">
                {SOURCE_LABELS[subscriber.source] || subscriber.source}
              </Badge>
            }
            icon={Tag}
          />
          <InfoRow label="Subscribed Date" value={formatDateTime(subscriber.subscribedAt)} icon={Calendar} />
          <InfoRow
            label="Unsubscribed Date"
            value={subscriber.unsubscribedAt ? formatDateTime(subscriber.unsubscribedAt) : 'N/A'}
            icon={UserX}
          />
          <InfoRow label="Created Date" value={formatDateTime(subscriber.createdAt)} icon={Clock} />
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className="text-lg text-[#1B2B4B]">Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              disabled={subscriber.status === 'active' || updateStatus.isPending}
              onClick={() => handleStatusChange('active')}
              className="rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 cursor-pointer"
            >
              <UserCheck className="mr-1.5 h-4 w-4" />
              Activate Subscriber
            </Button>
            <Button
              variant="outline"
              disabled={subscriber.status === 'unsubscribed' || updateStatus.isPending}
              onClick={() => handleStatusChange('unsubscribed')}
              className="rounded-full border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              <UserX className="mr-1.5 h-4 w-4" />
              Unsubscribe
            </Button>
            <Button
              variant="outline"
              disabled={deleteSubscriber.isPending}
              onClick={() => setConfirmDelete(true)}
              className="rounded-full border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent className="max-w-[95vw] rounded-2xl border-white/20 bg-white/80 p-6 backdrop-blur-xl sm:max-w-md sm:rounded-3xl">
          <DialogHeader>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <Trash2 className="h-6 w-6 text-red-500" />
            </div>
            <DialogTitle className="text-center text-lg font-bold text-[#1B2B4B]">
              Delete Subscriber
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-[#1B2B4B]/60">
              Are you sure you want to delete <strong>{subscriber.email}</strong>?
              <br />
              <span className="text-xs text-red-500/70">This action cannot be undone.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              onClick={() => setConfirmDelete(false)}
              className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className={cn('rounded-full bg-red-500 text-white hover:bg-red-600')}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}