import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function BookSkeletonItem() {
  return (
    <Card className="w-[240px] shrink-0 grow-0 overflow-hidden rounded-[28px] border border-[#1B2B4B]/10 bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:w-[260px] md:w-[270px] lg:w-[320px]">
      <div className="relative mx-auto h-80 w-56 overflow-hidden rounded-md">
        <Skeleton className="h-full w-full animate-shimmer rounded-md" />
      </div>

      <CardContent className="mt-6 p-0 text-center">
        <Skeleton className="mx-auto h-[22px] w-44 animate-shimmer rounded" />

        <Skeleton className="mx-auto mt-2 h-[14px] w-28 animate-shimmer rounded" />

        <Skeleton className="mx-auto mt-3 h-[28px] w-16 animate-shimmer rounded" />

        <Skeleton className="mx-auto mt-6 h-11 w-full animate-shimmer rounded-2xl" />
      </CardContent>
    </Card>
  );
}

export function BookSkeleton({ count = 2 }) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <BookSkeletonItem key={index} />
      ))}
    </div>
  );
}
