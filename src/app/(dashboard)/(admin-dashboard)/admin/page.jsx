'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, ShoppingBag, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { icon: Users, label: 'Total Users', value: '0' },
    { icon: BookOpen, label: 'Total Books', value: '0' },
    { icon: ShoppingBag, label: 'Total Orders', value: '0' },
    { icon: DollarSign, label: 'Revenue', value: '$0' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#1B2B4B]">Admin Dashboard</h1>
        <p className="mt-1 text-[#1B2B4B]/60">Overview of your store performance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-[#1B2B4B]/10 shadow-sm">
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
    </div>
  );
}