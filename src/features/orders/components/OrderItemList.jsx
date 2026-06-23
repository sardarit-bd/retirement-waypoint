'use client';

import Image from 'next/image';
import { useState } from 'react';

export function OrderItemList({ items }) {
    const [imageErrors, setImageErrors] = useState({});

    if (!items || items.length === 0) {
        return (
            <p className="text-sm text-[#1B2B4B]/40">No items in this order</p>
        );
    }

    return (
        <div className="space-y-3">
            {items.map((item, index) => {
                const hasError = imageErrors[item.bookId];
                const coverImage = hasError ? null : item.bookCoverImage;

                return (
                    <div
                        key={`${item.bookId}-${index}`}
                        className="flex items-center gap-3 rounded-xl bg-[#F8F5EF] p-3 transition-all duration-200 hover:bg-[#F8F5EF]/80"
                    >
                        {/* Book Cover */}
                        <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md shadow-md">
                            {coverImage ? (
                                <Image
                                    src={coverImage}
                                    alt={item.bookTitle}
                                    fill
                                    className="object-cover"
                                    onError={() => {
                                        setImageErrors(prev => ({
                                            ...prev,
                                            [item.bookId]: true,
                                        }));
                                    }}
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-[#1B2B4B]/10 text-[#1B2B4B]/40">
                                    <span className="text-xs font-medium">
                                        {item.bookTitle?.charAt(0) || '?'}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Book Info */}
                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-[#1B2B4B]">
                                {item.bookTitle}
                            </p>
                            <p className="text-xs text-[#1B2B4B]/50">Qty: 1</p>
                        </div>

                        {/* Price */}
                        <div className="shrink-0 text-sm font-semibold text-[#1B2B4B]">
                            ${item.bookPrice.toFixed(2)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}