"use client";

export const ReviewSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Summary Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="h-12 w-32 bg-gray-200 rounded-lg" />
          <div className="h-6 w-40 bg-gray-200 rounded-lg" />
          <div className="h-4 w-48 bg-gray-200 rounded-lg" />
          <div className="h-4 w-56 bg-gray-200 rounded-lg" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="flex-1 h-2 bg-gray-200 rounded" />
              <div className="h-4 w-8 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 my-6" />

      {/* Review Items Skeleton */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="py-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-full max-w-lg bg-gray-200 rounded" />
              <div className="h-4 w-48 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};