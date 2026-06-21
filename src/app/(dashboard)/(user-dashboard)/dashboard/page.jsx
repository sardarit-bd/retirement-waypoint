'use client';

import { useSession } from '@/hooks/useSession';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ShoppingBag, FileText, Star, TrendingUp, Clock } from 'lucide-react';

export default function DashboardOverview() {
  const { session } = useSession();
  const user = session?.user;

  const stats = [
    { icon: BookOpen, label: 'My Books', value: '0', href: '/dashboard/my-books' },
    { icon: ShoppingBag, label: 'Orders', value: '0', href: '/dashboard/orders' },
    { icon: FileText, label: 'Invoices', value: '0', href: '/dashboard/invoices' },
    { icon: Star, label: 'Reviews', value: '0', href: '/dashboard/reviews' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-[#1B2B4B]">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}!
        </h1>
        <p className="mt-1 text-[#1B2B4B]/60">
          Here&apos;s an overview of your retirement journey progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-[#1B2B4B]/10 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#1B2B4B]/60">{stat.label}</p>
                    <p className="text-2xl font-bold text-[#1B2B4B]">{stat.value}</p>
                  </div>
                  <div className="rounded-full bg-[#C9A84C]/10 p-3">
                    <Icon className="h-5 w-5 text-[#C9A84C]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="border-[#1B2B4B]/10 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1B2B4B]">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12 text-[#1B2B4B]/40">
            <Clock className="mr-2 h-5 w-5" />
            <span>No recent activity yet</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}