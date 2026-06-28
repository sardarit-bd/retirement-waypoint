export const BookDetailsSkeleton = () => {
    return (
      <div className="min-h-screen bg-[#F8F5EF]">
        <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200 mb-8" />
          
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="sticky top-32">
                <div className="relative mx-auto h-[500px] w-[333px] animate-pulse rounded-lg bg-gray-200" />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
              <div className="h-12 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-5 w-5 animate-pulse rounded bg-gray-200" />
                  ))}
                </div>
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
              <div className="flex items-center gap-4">
                <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  };