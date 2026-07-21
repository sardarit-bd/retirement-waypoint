'use client';

import { Badge } from '@/components/ui/badge';

const STATUS_STYLES = {
  active: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  unsubscribed: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
};

const STATUS_LABELS = {
  active: 'Active',
  unsubscribed: 'Unsubscribed',
};

export function SubscriberStatusBadge({ status }) {
  return (
    <Badge
      variant="outline"
      className={`whitespace-nowrap ${STATUS_STYLES[status] || STATUS_STYLES.active}`}
    >
      {STATUS_LABELS[status] || status}
    </Badge>
  );
}