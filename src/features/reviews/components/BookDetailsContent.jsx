// src/components/book/details/BookDetailsContent.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, CreditCard, Shield, Lock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

import { useFeaturedBooks } from "@/features/books/hooks/useFeaturedBooks";
import { ReviewSection } from "@/features/reviews/components/ReviewSection";
import { orderApi } from "@/features/orders/api/order.api";
import { useSession } from "@/hooks/useSession";
import { useMyReview } from "@/features/reviews/hooks/useReviews";
import { BookCTA } from "@/components/book/Book-Cta";

export const BookDetailsContent = ({ book }) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { books: featuredBooks, loading: featuredLoading } = useFeaturedBooks(4);
  const { session } = useSession();
  
  // Check if user has purchased this book
  const { data: myReviewData } = useMyReview(book._id);
  const hasPurchased = !!myReviewData || false;

  const bookImage = imageError
    ? "https://placehold.co/400x600/1B2B4B/FFFFFF?text=Book+Cover"
    : book.coverImage;

  const isPublished = book.status === "PUBLISHED";

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return null;
    }
  };

  const publishedDate = formatDate(book.publishedAt);

  const handleBuyNow = async () => {
    if (!isPublished) {
      toast.error("This book is not available for purchase");
      return;
    }

    setIsPurchasing(true);

    try {
      const orderPayload = {
        items: [
          {
            bookId: book._id,
            quantity: 1,
            price: book.price,
          }
        ],
      };

      const response = await orderApi.createOrder(orderPayload);

      if (response.checkoutUrl) {
        toast.success("Redirecting to payment...");
        window.location.href = response.checkoutUrl;
        return;
      }

      if (response.status === "PENDING") {
        toast.success("Order created, redirecting to payment...");
        router.push(`/payment/pending?orderId=${response._id}`);
      } else {
        toast.error("Unable to process payment. Please try again.");
      }

    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(error.response?.data?.message || "Failed to process purchase. Please try again.");
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <main id="book-details" className="min-h-screen bg-[#F8F5EF]">
      <div className="bg-[#F8F5EF]">
        <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-[#1B2B4B]/60 hover:text-[#1B2B4B] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Book Cover */}
            <div className="relative">
              <div className="sticky top-32">
                <div className="relative mx-auto h-[500px] w-[333px] overflow-hidden rounded-lg bg-[#F8F5EF] shadow-2xl">
                  <Image
                    src={bookImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                    sizes="(max-width: 768px) 100vw, 333px"
                    priority
                  />
                </div>
                {/* {book.featured && (
                  <Badge className="absolute left-0 top-4 z-20 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-[#C9A84C] p-0 text-[11px] font-black leading-3 text-[#1B2B4B] shadow-xl ring-4 ring-white">
                    ★<span>FEATURED</span>
                  </Badge>
                )} */}
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-[#1B2B4B] lg:text-5xl">
                {book.title}
              </h1>

              <p className="text-xl text-[#1B2B4B]/60">by {book.authorName}</p>

              <div className="prose max-w-none text-[#1B2B4B]/80">
                <p>{book.description}</p>
              </div>

              {(book.pageCount || publishedDate) && (
                <div className="space-y-2 text-sm text-[#1B2B4B]/60">
                  {book.pageCount && <p>{book.pageCount} pages</p>}
                  {publishedDate && <p>Published: {publishedDate}</p>}
                </div>
              )}

              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-[#1B2B4B]">
                  $ {book.price}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isPublished ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">
                      Available for Purchase
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-red-500">
                    Unavailable
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleBuyNow}
                  disabled={!isPublished || isPurchasing}
                  className="w-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isPurchasing ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#1B2B4B] border-t-transparent mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Buy Now - $ {book.price}
                    </>
                  )}
                </Button>

                <div className="rounded-lg bg-white/80 backdrop-blur-sm p-4 space-y-2 border border-[#1B2B4B]/5">
                  <div className="flex items-center gap-2 text-sm text-[#1B2B4B]/70">
                    <Lock className="h-4 w-4 text-[#C9A84C]" />
                    <span>Secure payment powered by Stripe</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#1B2B4B]/70">
                    <FileText className="h-4 w-4 text-[#C9A84C]" />
                    <span>Instant access after payment - Digital PDF</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#1B2B4B]/70">
                    <Shield className="h-4 w-4 text-[#C9A84C]" />
                    <span>No subscription required - One-time purchase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section - Only show if there are reviews OR user has purchased */}
          <div className="mt-16">
            <ReviewSection 
              bookId={book._id} 
              showReviewForm={hasPurchased}
            />
          </div>
        </div>
      </div>
      <BookCTA />
    </main>
  );
};