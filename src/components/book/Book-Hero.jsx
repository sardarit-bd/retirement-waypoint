"use client";

import { useState } from "react";
import { Search, ShoppingCart, X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";

export const BookHero = ({
  searchQuery,
  setSearchQuery,
  cartCount,
  cartSubtotal,
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-[#1B2B4B] px-4 pb-16 pt-32 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header with Cart */}
        <div className="mb-8 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-xl">
            <span className="text-[#C9A84C]">✦</span>
            Retirement Waypoint Store
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="relative text-white hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <ShoppingCart className="h-6! w-6!" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C9A84C] text-[10px] font-bold text-[#1B2B4B]">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Shopping Cart ({cartCount} items)</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                {cartItems.length === 0 ? (
                  <div className="mt-8 text-center text-muted-foreground">
                    Your cart is empty.
                  </div>
                ) : (
                  <div className="mt-4 space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 rounded-lg border p-3"
                      >
                        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <h4 className="line-clamp-1 text-sm font-semibold">
                            {item.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            $ {item.price}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7 cursor-pointer"
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7 cursor-pointer"
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="ml-auto h-7 w-7 text-destructive cursor-pointer"
                              onClick={() => onRemoveFromCart(item.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              <div className="mt-4 border-t pt-4 px-4">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>$ {cartSubtotal.toLocaleString()}</span>
                </div>
                <Button
                  className="mt-4 w-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] cursor-pointer"
                  onClick={onCheckout}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Shipping and discounts calculated at checkout.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Retirement Waypoint
              <span className="block text-[#C9A84C]">Book Store</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Books, workbooks, and guides designed to help you navigate
              retirement with confidence, clarity, and purpose.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-2xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                <Input
                  type="text"
                  placeholder="Search by title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 border-white/20 bg-white/10 pl-9 text-white placeholder:text-white/40 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20"
                />
              </div>
              <Button className="bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};