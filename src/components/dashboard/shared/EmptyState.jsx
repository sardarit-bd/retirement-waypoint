'use client';

import { cn } from '@/lib/utils';

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {Icon && (
        <div className="rounded-full bg-[#C9A84C]/10 p-4">
          <Icon className="h-8 w-8 text-[#C9A84C]" />
        </div>
      )}
      <h3 className="mt-4 text-lg font-semibold text-[#1B2B4B]">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-[#1B2B4B]/60">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}