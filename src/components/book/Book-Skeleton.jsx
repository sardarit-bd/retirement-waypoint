export const BookSkeleton = ({ count = 8 }) => {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-[28px] bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
          >
            <div className="mx-auto h-72 w-48 rounded-md bg-gray-200" />
            <div className="mt-6 space-y-3">
              <div className="mx-auto h-4 w-24 rounded-full bg-gray-200" />
              <div className="mx-auto h-6 w-40 rounded bg-gray-200" />
              <div className="mx-auto h-4 w-32 rounded bg-gray-200" />
              <div className="mx-auto h-4 w-36 rounded bg-gray-200" />
              <div className="mx-auto h-8 w-24 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  };