'use client';

import { Badge } from '@/components/ui/badge';

const STATUS_STYLES = {
  unread: 'bg-red-500/10 text-red-600 border-red-500/20',
  read: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  replied: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  archived: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
};

const STATUS_LABELS = {
  unread: 'Unread',
  read: 'Read',
  replied: 'Replied',
  archived: 'Archived',
};

export function ContactStatusBadge({ status }) {
  return (
    <Badge
      variant="outline"
      className={`whitespace-nowrap ${STATUS_STYLES[status] || STATUS_STYLES.unread}`}
    >
      {STATUS_LABELS[status] || status}
    </Badge>
  );
}