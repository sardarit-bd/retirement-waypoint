'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function MyBookSkeleton() {
  return (
    <Card className="w-full max-w-[300px] flex flex-col overflow-hidden rounded-[24px] border border-white/40 bg-white/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(4,16,58,0.06)]">
      <div className="aspect-[3/4] w-full bg-[#F8F5EF]">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3.5 w-1/2" />
          <div className="space-y-1 pt-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
        <div className="space-y-2.5 pt-1">
          <div className="flex justify-between border-t border-[#1B2B4B]/8 pt-2.5">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-10" />
          </div>
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-9 w-full rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}