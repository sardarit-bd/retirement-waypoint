'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrderStatusBadge } from './OrderStatusBadge';
import Link from 'next/link';

export function OrderHeader({ order, hasInvoice }) {
    const router = useRouter();
    
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
        >
            {/* Back Button */}
            <div className="mb-4">
                <Button
                    onClick={() => router.back()}
                    variant="ghost"
                    size="sm"
                    className="group -ml-2 rounded-full px-3 py-2 text-[#1B2B4B] hover:bg-[#F8F5EF] hover:text-[#1B2B4B]"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                    <span className="text-sm font-medium">Back to Orders</span>
                </Button>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                {/* Left Section */}
                <div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-2xl font-bold text-[#1B2B4B]">
                            #{order.orderNumber}
                        </h1>
                        <div className="flex gap-2 flex-wrap">
                            <OrderStatusBadge status={order.orderStatus} type="order" />
                            <OrderStatusBadge status={order.paymentStatus} type="payment" />
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-[#1B2B4B]/60">
                        <Calendar className="h-4 w-4" />
                        <span>Placed on {formatDate(order.createdAt)}</span>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex gap-2">
                    {hasInvoice && (
                        <Button
                            asChild
                            className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-6 text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
                        >
                            <Link href={`/dashboard/invoices/${order.invoiceId}`}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Invoice
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}