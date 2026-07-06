'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProfileSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center">
              <Skeleton className="h-24 w-24 rounded-full mb-3" />
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-48 mb-2" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-3 w-24 mt-3" />
            </div>
          </CardContent>
        </Card>

        {/* Activity Summary */}
        <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <Skeleton className="h-5 w-32 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-8 w-16 mx-auto mb-1" />
                  <Skeleton className="h-3 w-20 mx-auto" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Personal Information */}
        <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <Skeleton className="h-5 w-40 mb-6" />
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <Skeleton className="h-5 w-40 mb-6" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}