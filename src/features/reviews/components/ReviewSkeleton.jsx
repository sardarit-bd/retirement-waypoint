"use client";

export const ReviewSkeleton = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-pulse">
      {/* Summary Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        <div className="space-y-2 sm:space-y-3">
          <div className="h-8 sm:h-12 w-20 sm:w-32 bg-gray-200 rounded-lg" />
          <div className="h-5 sm:h-6 w-28 sm:w-40 bg-gray-200 rounded-lg" />
          <div className="h-3 sm:h-4 w-32 sm:w-48 bg-gray-200 rounded-lg" />
          <div className="h-3 sm:h-4 w-40 sm:w-56 bg-gray-200 rounded-lg" />
        </div>
        <div className="space-y-1.5 sm:space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <div className="h-3 sm:h-4 w-12 sm:w-16 bg-gray-200 rounded" />
              <div className="flex-1 h-1.5 sm:h-2 bg-gray-200 rounded" />
              <div className="h-3 sm:h-4 w-6 sm:w-8 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 my-4 sm:my-6" />

      {/* Review Items Skeleton */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200" />
              <div className="space-y-1 sm:space-y-2">
                <div className="h-4 sm:h-5 w-28 sm:w-40 bg-gray-200 rounded" />
                <div className="h-3 sm:h-4 w-24 sm:w-32 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="flex-1 space-y-1 sm:space-y-2 mt-2 sm:mt-0">
              <div className="h-3 sm:h-4 w-full max-w-lg bg-gray-200 rounded" />
              <div className="h-3 sm:h-4 w-3/4 max-w-md bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};