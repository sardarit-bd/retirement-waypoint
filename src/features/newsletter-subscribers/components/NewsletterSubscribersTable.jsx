'use client';

import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, AlertCircle, Mail } from 'lucide-react';
import { formatDate } from '@/lib/date-utils';
import { SubscriberStatusBadge } from './SubscriberStatusBadge';

const cardClass =
  'rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden';

const SOURCE_LABELS = {
  homepage: 'Homepage',
  footer: 'Footer',
  contact: 'Contact',
  manual: 'Manual',
};

function TableSkeleton() {
  return (
    <div className={cardClass}>
      <div className="space-y-3 p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-[#1B2B4B]/5 pb-3">
            <Skeleton className="h-5 w-32 sm:w-52" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className={`${cardClass} flex flex-col items-center justify-center p-12 text-center`}>
      <div className="mb-4 w-fit rounded-full bg-[#C9A84C]/10 p-4">
        <Mail className="h-8 w-8 text-[#C9A84C]" />
      </div>
      <h3 className="text-lg font-medium text-[#1B2B4B]">No Subscribers Found</h3>
      <p className="mt-1 max-w-sm text-sm text-[#1B2B4B]/60">
        No newsletter subscribers match your current filters.
      </p>
    </div>
  );
}

export function NewsletterSubscribersTable({ data, meta, isLoading, error }) {
  const subscribers = data || [];

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className={`${cardClass} flex flex-col items-center justify-center p-12 text-center`}>
        <div className="mb-4 w-fit rounded-full bg-red-50 p-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-[#1B2B4B]">Error Loading Subscribers</h3>
        <p className="mt-1 text-sm text-[#1B2B4B]/60">
          {error.response?.data?.message || error.message || 'Failed to load subscribers'}
        </p>
      </div>
    );
  }

  if (!subscribers || subscribers.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={cardClass}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1B2B4B]/5 hover:bg-transparent">
              <TableHead className="whitespace-nowrap text-[#1B2B4B]/60">Email</TableHead>
              <TableHead className="whitespace-nowrap text-center text-[#1B2B4B]/60">Status</TableHead>
              <TableHead className="hidden whitespace-nowrap text-[#1B2B4B]/60 sm:table-cell">Source</TableHead>
              <TableHead className="hidden whitespace-nowrap text-[#1B2B4B]/60 lg:table-cell">Subscribed Date</TableHead>
              <TableHead className="whitespace-nowrap text-right text-[#1B2B4B]/60">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((sub) => (
              <TableRow
                key={sub._id}
                className="border-b border-[#1B2B4B]/5 hover:bg-[#F8F5EF]/50"
              >
                <TableCell className="max-w-[160px] whitespace-nowrap font-medium text-[#1B2B4B] sm:max-w-none">
                  <span className="block truncate" title={sub.email}>
                    {sub.email}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap text-center">
                  <SubscriberStatusBadge status={sub.status} />
                </TableCell>
                <TableCell className="hidden whitespace-nowrap sm:table-cell">
                  <Badge variant="outline" className="border-[#1B2B4B]/10 text-[#1B2B4B]/70">
                    {SOURCE_LABELS[sub.source] || sub.source}
                  </Badge>
                </TableCell>
                <TableCell className="hidden whitespace-nowrap text-[#1B2B4B]/60 lg:table-cell">
                  {formatDate(sub.subscribedAt || sub.createdAt)}
                </TableCell>
                <TableCell className="whitespace-nowrap text-right">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-8 rounded-full px-2 hover:bg-[#F8F5EF] sm:px-3"
                  >
                    <Link href={`/admin/newsletter-subscribers/${sub._id}`}>
                      <Eye className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">View</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 border-t border-[#1B2B4B]/5 px-4 py-3 text-xs text-[#1B2B4B]/60 sm:flex-row sm:text-sm">
        <span>
          Showing {subscribers.length} of {meta?.total ?? subscribers.length} subscribers
        </span>
        <span>
          Page {meta?.page ?? 1} of {meta?.pages ?? 1}
        </span>
      </div>
    </div>
  );
}