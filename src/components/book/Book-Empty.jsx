import { Search } from "lucide-react";

export const BookEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <Search className="h-8 w-8 text-[#1B2B4B]/40" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-[#1B2B4B]">No books found</h3>
      <p className="mt-2 text-sm text-[#1B2B4B]/60">
        Try adjusting your search or category filter.
      </p>
    </div>
  );
};