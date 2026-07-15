import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AdminOrdersTableSkeleton() {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
      {/* Desktop Skeleton */}
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1B2B4B]/5">
              {[...Array(8)].map((_, i) => (
                <TableHead key={i}>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i} className="border-b border-[#1B2B4B]/5">
                {[...Array(8)].map((_, j) => (
                  <TableCell key={j}>
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Skeleton */}
      <div className="lg:hidden divide-y divide-[#1B2B4B]/5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 space-y-3 animate-pulse">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-5 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
              <div className="h-8 w-8 bg-gray-200 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 bg-gray-200 rounded-full" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
              </div>
              <div className="h-6 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}