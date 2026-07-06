"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, X, Plus, Minus, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export const ShoppingCartSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { 
    cartItems, 
    cartCount, 
    cartSubtotal, 
    updateQuantity, 
    removeFromCart 
  } = useCart();

  const handleCheckout = () => {
    setIsOpen(false);
    router.push("/checkout");
  };

  return (
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
        <ScrollArea className="h-[calc(100vh-280px)] pr-4">
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
                      src={item.coverImage}
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
                          updateQuantity(item.id, item.quantity - 1)
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
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="ml-auto h-7 w-7 text-destructive cursor-pointer"
                        onClick={() => removeFromCart(item.id)}
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

        {/* Order Summary */}
        <div className="border-t pt-4 px-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">$ {cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold">$ {cartSubtotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="rounded-lg bg-[#F8F5EF] p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4 text-[#1B2B4B]" />
              <span className="font-medium text-[#1B2B4B]">Payment Method</span>
            </div>
            <p className="text-xs text-muted-foreground">Credit / Debit Card</p>
            <p className="text-xs text-muted-foreground">Powered by Stripe</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>Secure Checkout</span>
            </div>
          </div>

          <Button
            className="w-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] cursor-pointer h-12 text-base font-bold"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};