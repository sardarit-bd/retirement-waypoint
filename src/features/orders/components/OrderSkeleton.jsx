'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function OrderSkeleton() {
  return (
    <Card className="overflow-hidden rounded-2xl sm:rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
      <CardContent className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-2 xs:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <Skeleton className="h-4 sm:h-5 w-24 sm:w-32" />
            <Skeleton className="h-2.5 sm:h-3 w-16 sm:w-24" />
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <Skeleton className="h-5 sm:h-6 w-14 sm:w-20 rounded-full" />
            <Skeleton className="h-5 sm:h-6 w-12 sm:w-16 rounded-full" />
          </div>
        </div>

        {/* Items */}
        <div className="space-y-2 sm:space-y-3">
          <Skeleton className="h-14 sm:h-16 w-full rounded-xl" />
          <Skeleton className="h-14 sm:h-16 w-full rounded-xl" />
        </div>

        {/* Summary */}
        <div className="space-y-1.5 sm:space-y-2">
          <Skeleton className="h-3 sm:h-4 w-full" />
          <Skeleton className="h-3 sm:h-4 w-3/4" />
          <Skeleton className="h-6 sm:h-8 w-1/3" />
        </div>

        {/* Actions */}
        <div className="flex flex-col xs:flex-row gap-2 pt-1 sm:pt-2">
          <Skeleton className="h-8 sm:h-9 flex-1 rounded-full" />
          <Skeleton className="h-8 sm:h-9 w-full xs:w-20 sm:w-24 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}