import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function BookSkeletonItem() {
  return (
    <Card className="w-full h-full overflow-hidden rounded-2xl sm:rounded-[28px] border border-[#1B2B4B]/10 bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-[#F8F5EF] border border-[#1B2B4B]/10">
        <Skeleton className="h-full w-full animate-shimmer rounded-xl" />
      </div>

      <CardContent className="mt-4 p-0 text-center">
        <Skeleton className="mx-auto h-[3.5rem] w-full animate-shimmer rounded" />

        <Skeleton className="mx-auto mt-2 h-4 w-28 animate-shimmer rounded" />

        <Skeleton className="mx-auto mt-2 h-6 w-16 animate-shimmer rounded" />

        <Skeleton className="mx-auto mt-4 h-10 w-full animate-shimmer rounded-lg" />
      </CardContent>
    </Card>
  );
}

export function BookSkeleton({ count = 3 }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 lg:gap-8 max-w-6xl mx-auto px-4 sm:px-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[320px] max-w-[340px] flex"
        >
          <BookSkeletonItem />
        </div>
      ))}
    </div>
  );
}
