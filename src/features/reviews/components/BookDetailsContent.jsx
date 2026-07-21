"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Shield,
  Lock,
  FileText,
  BookOpen,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

import { useFeaturedBooks } from "@/features/books/hooks/useFeaturedBooks";
import { ReviewSection } from "@/features/reviews/components/ReviewSection";
import { orderApi } from "@/features/orders/api/order.api";
import { paymentApi } from "@/features/payments/api/payment.api";
import { bookApi } from "@/features/books/api/book.api";
import { useCheckPurchase } from "@/features/purchases/hooks/usePurchase";
import { useSession } from "@/hooks/useSession";
import { BookCTA } from "@/components/book/Book-Cta";
import { BookPreviewModal } from "@/components/book/BookPreviewModal";

export const BookDetailsContent = ({ book }) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { books: featuredBooks, loading: featuredLoading } =
    useFeaturedBooks(4);
  const { session, isLoading: sessionLoading } = useSession();
  const isAuthenticated = !!session?.user;

  // Check if user has purchased this book - ONLY when authenticated
  const {
    data: purchaseData,
    isLoading: purchaseLoading,
    refetch: refetchPurchase,
  } = useCheckPurchase(book._id, isAuthenticated);

  const hasPurchased = purchaseData?.hasPurchased || false;

  const bookImage = imageError
    ? "https://placehold.co/400x600/1B2B4B/FFFFFF?text=Book+Cover"
    : book.coverImage;

  const isPublished = book.status === "PUBLISHED";

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
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

    if (!isAuthenticated) {
      toast.error("Please login to purchase this book");
      router.push("/auth");
      return;
    }

    setIsPurchasing(true);

    try {
      // Step 1: Create order
      const orderPayload = {
        items: [
          {
            bookId: book._id,
            quantity: 1,
            price: book.price,
          },
        ],
      };

      const orderResponse = await orderApi.createOrder(orderPayload);

      // Extract order data (handle different response structures)
      const orderData = orderResponse.data || orderResponse;
      const orderId = orderData._id;

      if (!orderId) {
        throw new Error("Failed to create order: No order ID returned");
      }

      // Step 2: Create Stripe Checkout Session
      const paymentResponse = await paymentApi.createCheckoutSession(orderId);

      // Extract checkout URL
      const checkoutUrl = paymentResponse.checkoutUrl;

      if (!checkoutUrl) {
        throw new Error(
          "Failed to create payment session: No checkout URL returned",
        );
      }

      // Step 3: Redirect to Stripe Checkout
      toast.success("Redirecting to payment...");
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Purchase error:", error);

      // Handle specific error cases
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Failed to process purchase. Please try again.");
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleReadNow = () => {
    router.push(`/dashboard/my-books/${book._id}`);
  };

  // Refetch purchase status when component mounts or session changes
  useEffect(() => {
    if (isAuthenticated && book._id) {
      refetchPurchase();
    }
  }, [isAuthenticated, book._id, refetchPurchase]);

  // Show loading state while checking authentication
  if (sessionLoading) {
    return (
      <main className="min-h-screen bg-[#F8F5EF]">
        <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A84C]"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="book-details" className="min-h-screen bg-[#F8F5EF]">
      <div className="bg-[#F8F5EF]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:py-24 md:py-28 lg:py-32 sm:px-6 lg:px-8">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-[#1B2B4B]/60 hover:text-[#1B2B4B] transition-colors mb-6 sm:mb-8 text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>

          <div className="grid gap-8 md:gap-10 lg:gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Book Cover */}
            <div className="relative">
              <div className="sticky top-32">
                <div className="relative mx-auto h-[400px] w-[267px] sm:h-[450px] sm:w-[300px] md:h-[500px] md:w-[333px] overflow-hidden rounded-lg bg-[#F8F5EF] shadow-2xl">
                  <Image
                    src={bookImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                    sizes="(max-width: 640px) 267px, (max-width: 768px) 300px, 333px"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1B2B4B]">
                {book.title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-[#1B2B4B]/60">
                by {book.authorName}
              </p>

              <div className="prose prose-sm sm:prose-base max-w-none text-[#1B2B4B]/80">
                <p>{book.description}</p>
              </div>

              {(book.pageCount || publishedDate) && (
                <div className="space-y-1 sm:space-y-2 text-sm text-[#1B2B4B]/60">
                  {book.pageCount && <p>{book.pageCount} pages</p>}
                  {publishedDate && <p>Published: {publishedDate}</p>}
                </div>
              )}

              <div className="flex items-center gap-4">
                <span className="text-2xl sm:text-3xl font-black text-[#1B2B4B]">
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
                {/* Conditional Button: Read Now if purchased, Buy Now if not */}
                {hasPurchased ? (
                  <Button
                    onClick={handleReadNow}
                    className="w-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] h-12 sm:h-14 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Read Now
                  </Button>
                ) : (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      onClick={handleBuyNow}
                      disabled={!isPublished || isPurchasing}
                      className="flex-1 bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] h-12 sm:h-14 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isPurchasing ? (
                        <>
                          <div className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-[#1B2B4B] border-t-transparent mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          Buy Now - $ {book.price}
                        </>
                      )}
                    </Button>

                    {isPublished && book.previewEnabled !== false && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsPreviewOpen(true)}
                        className="h-12 sm:h-14 border-[#1B2B4B]/15 text-[#1B2B4B] text-base sm:text-lg font-bold hover:bg-[#F8F5EF] hover:border-[#C9A84C]/40 transition-all duration-300 cursor-pointer sm:w-auto sm:px-6"
                      >
                        <Eye className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Preview Book
                      </Button>
                    )}
                  </div>
                )}

                <div className="rounded-lg bg-white/80 backdrop-blur-sm p-3 sm:p-4 space-y-2 border border-[#1B2B4B]/5">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#1B2B4B]/70">
                    <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-[#C9A84C]" />
                    <span>Secure payment powered by Stripe</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#1B2B4B]/70">
                    <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-[#C9A84C]" />
                    <span>Instant access after payment - Digital PDF</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#1B2B4B]/70">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-[#C9A84C]" />
                    <span>No subscription required - One-time purchase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section - Show review form only if user has purchased */}
          <div className="mt-12 sm:mt-14 md:mt-16">
            <ReviewSection bookId={book._id} showReviewForm={hasPurchased} />
          </div>
        </div>
      </div>

      <BookPreviewModal
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        previewUrl={book.slug ? bookApi.getPreviewUrl(book.slug) : null}
        bookTitle={book.title}
        isPurchasing={isPurchasing}
        onBuyNow={() => {
          setIsPreviewOpen(false);
          handleBuyNow();
        }}
      />

      <BookCTA />
    </main>
  );
};