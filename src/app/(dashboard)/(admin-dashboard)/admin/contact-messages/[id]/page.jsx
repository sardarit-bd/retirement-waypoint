/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Mail as MailIcon,
  Calendar,
  Globe,
  Monitor,
  MessageSquare,
  CheckCircle,
  Reply,
  Archive,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { ContactStatusBadge, useContactMessage, useDeleteContactMessage, useUpdateContactMessageStatus } from '@/features/contact-messages/contact-messages-index';
// import {
//   ContactStatusBadge,
//   useContactMessage,
//   useUpdateContactMessageStatus,
//   useDeleteContactMessage,
// } from '@/features/contact-messages';

const cardClass =
  'rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]';

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
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className={cardClass}>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function ContactMessageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { data: message, isLoading, error } = useContactMessage(id);
  const updateStatus = useUpdateContactMessageStatus();
  const deleteMessage = useDeleteContactMessage();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [hasMarkedRead, setHasMarkedRead] = useState(false);

  // Auto-mark as read the first time an unread message is opened
  useEffect(() => {
    if (message && message.status === 'unread' && !hasMarkedRead) {
      setHasMarkedRead(true);
      updateStatus.mutate({ id, status: 'read' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message?.status, id, hasMarkedRead]);

  const handleStatusChange = (status) => {
    updateStatus.mutate({ id, status });
  };

  const handleDelete = () => {
    deleteMessage.mutate(id, {
      onSuccess: () => {
        router.push('/admin/contact-messages');
      },
    });
    setConfirmDelete(false);
  };

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error || !message) {
    return (
      <div className="mx-auto max-w-4xl p-3 sm:p-4 md:p-6">
        <div className={`${cardClass} flex flex-col items-center justify-center p-12 text-center`}>
          <div className="mb-4 w-fit rounded-full bg-red-50 p-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-lg font-medium text-[#1B2B4B]">Message Not Found</h3>
          <p className="mt-1 text-sm text-[#1B2B4B]/60">
            {error?.response?.data?.message || 'This contact message does not exist.'}
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
      className="mx-auto max-w-5xl space-y-4 p-3 sm:space-y-6 sm:p-4 md:p-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/admin/contact-messages')}
          className="h-9 rounded-full border border-[#1B2B4B]/10 px-3 text-[#1B2B4B] hover:bg-[#F8F5EF] cursor-pointer"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <ContactStatusBadge status={message.status} />
        <span className="ml-auto text-sm text-[#1B2B4B]/50">
          Received {formatDateTime(message.createdAt)}
        </span>
      </div>

      <h1 className="text-xl font-bold text-[#1B2B4B] sm:text-2xl">{message.subject}</h1>

      {/* Sender + Meta info */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-[#1B2B4B]">
              <User className="h-5 w-5 text-[#C9A84C]" />
              Sender
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="Full Name" value={message.name} icon={User} />
            <InfoRow label="Email" value={message.email} icon={MailIcon} />
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-[#1B2B4B]">
              <Globe className="h-5 w-5 text-[#C9A84C]" />
              Submission Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="Created Date" value={formatDateTime(message.createdAt)} icon={Calendar} />
            <InfoRow label="IP Address" value={message.ipAddress} icon={Globe} />
            <InfoRow label="User Agent" value={message.userAgent} icon={Monitor} />
          </CardContent>
        </Card>
      </div>

      {/* Message */}
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-[#1B2B4B]">
            <MessageSquare className="h-5 w-5 text-[#C9A84C]" />
            Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap break-words rounded-2xl bg-[#F8F5EF] p-4 text-sm leading-relaxed text-[#1B2B4B]">
            {message.message}
          </p>
        </CardContent>
      </Card>

      {/* Status Actions */}
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className="text-lg text-[#1B2B4B]">Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              disabled={message.status === 'read' || updateStatus.isPending}
              onClick={() => handleStatusChange('read')}
              className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-50 cursor-pointer"
            >
              <CheckCircle className="mr-1.5 h-4 w-4" />
              Mark as Read
            </Button>
            <Button
              variant="outline"
              disabled={message.status === 'replied' || updateStatus.isPending}
              onClick={() => handleStatusChange('replied')}
              className="rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 cursor-pointer"
            >
              <Reply className="mr-1.5 h-4 w-4" />
              Mark as Replied
            </Button>
            <Button
              variant="outline"
              disabled={message.status === 'archived' || updateStatus.isPending}
              onClick={() => handleStatusChange('archived')}
              className="rounded-full border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              <Archive className="mr-1.5 h-4 w-4" />
              Archive
            </Button>
            <Button
              variant="outline"
              disabled={deleteMessage.isPending}
              onClick={() => setConfirmDelete(true)}
              className="rounded-full border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              Delete
            </Button>
            <Button
              asChild
              className="ml-auto rounded-full bg-[#C9A84C] font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] hover:text-white cursor-pointer"
            >
              <a href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}>
                <MailIcon className="mr-1.5 h-4 w-4" />
                Reply via Email
              </a>
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
              Delete Message
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-[#1B2B4B]/60">
              Are you sure you want to delete this message from <strong>{message.name}</strong>?
              <br />
              <span className="text-xs text-red-500/70">This action cannot be undone.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              onClick={() => setConfirmDelete(false)}
              className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className={cn('rounded-full bg-red-500 text-white hover:bg-red-600 cursor-pointer')}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}