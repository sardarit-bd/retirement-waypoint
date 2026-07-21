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
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, AlertCircle, Mail } from 'lucide-react';
import { formatDate } from '@/lib/date-utils';
import { ContactStatusBadge } from './ContactStatusBadge';

const cardClass =
  'rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden';

function TableSkeleton() {
  return (
    <div className={cardClass}>
      <div className="space-y-3 p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-[#1B2B4B]/5 pb-3">
            <Skeleton className="h-5 w-24 sm:w-32" />
            <Skeleton className="h-5 w-32 sm:w-44" />
            <Skeleton className="h-5 w-24 sm:w-40" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
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
      <h3 className="text-lg font-medium text-[#1B2B4B]">No Messages Found</h3>
      <p className="mt-1 max-w-sm text-sm text-[#1B2B4B]/60">
        No contact messages match your current filters.
      </p>
    </div>
  );
}

export function ContactMessagesTable({ data, meta, isLoading, error }) {
  const messages = data || [];

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className={`${cardClass} flex flex-col items-center justify-center p-12 text-center`}>
        <div className="mb-4 w-fit rounded-full bg-red-50 p-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-[#1B2B4B]">Error Loading Messages</h3>
        <p className="mt-1 text-sm text-[#1B2B4B]/60">
          {error.response?.data?.message || error.message || 'Failed to load messages'}
        </p>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={cardClass}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1B2B4B]/5 hover:bg-transparent">
              <TableHead className="whitespace-nowrap text-[#1B2B4B]/60">Name</TableHead>
              <TableHead className="hidden whitespace-nowrap text-[#1B2B4B]/60 sm:table-cell">Email</TableHead>
              <TableHead className="hidden whitespace-nowrap text-[#1B2B4B]/60 md:table-cell">Subject</TableHead>
              <TableHead className="whitespace-nowrap text-center text-[#1B2B4B]/60">Status</TableHead>
              <TableHead className="hidden whitespace-nowrap text-[#1B2B4B]/60 lg:table-cell">Received</TableHead>
              <TableHead className="whitespace-nowrap text-right text-[#1B2B4B]/60">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((msg) => (
              <TableRow
                key={msg._id}
                className="border-b border-[#1B2B4B]/5 hover:bg-[#F8F5EF]/50"
              >
                <TableCell className="max-w-[120px] whitespace-nowrap font-medium text-[#1B2B4B] sm:max-w-none">
                  <span className="block truncate" title={msg.name}>
                    {msg.name}
                  </span>
                  {msg.status === 'unread' && (
                    <span className="mt-0.5 block h-1.5 w-1.5 rounded-full bg-red-500 sm:hidden" />
                  )}
                </TableCell>
                <TableCell className="hidden max-w-[180px] whitespace-nowrap sm:table-cell">
                  <a
                    href={`mailto:${msg.email}`}
                    className="block truncate text-[#C9A84C] hover:underline"
                    title={msg.email}
                  >
                    {msg.email}
                  </a>
                </TableCell>
                <TableCell className="hidden max-w-[220px] whitespace-nowrap md:table-cell">
                  <span className="block truncate text-[#1B2B4B]/80" title={msg.subject}>
                    {msg.subject}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap text-center">
                  <ContactStatusBadge status={msg.status} />
                </TableCell>
                <TableCell className="hidden whitespace-nowrap text-[#1B2B4B]/60 lg:table-cell">
                  {formatDate(msg.createdAt)}
                </TableCell>
                <TableCell className="whitespace-nowrap text-right">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-8 rounded-full px-2 hover:bg-[#F8F5EF] sm:px-3"
                  >
                    <Link href={`/admin/contact-messages/${msg._id}`}>
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
          Showing {messages.length} of {meta?.total ?? messages.length} messages
        </span>
        <span>
          Page {meta?.page ?? 1} of {meta?.pages ?? 1}
        </span>
      </div>
    </div>
  );
}