"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  {
    id: 1,
    name: "Patricia M.",
    rating: 5,
    date: "March 15, 2025",
    comment:
      "This book transformed how I think about retirement. Finally, a guide that addresses purpose, not just finances.",
    avatar: "PM",
  },
  {
    id: 2,
    name: "Robert K.",
    rating: 5,
    date: "March 10, 2025",
    comment:
      "The workbook exercises were incredibly helpful. I feel much more prepared for this next chapter.",
    avatar: "RK",
  },
  {
    id: 3,
    name: "Susan L.",
    rating: 4,
    date: "March 5, 2025",
    comment:
      "Beautifully written and full of practical advice. Highly recommend for anyone approaching retirement.",
    avatar: "SL",
  },
];

export const BookReviews = () => {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-[#1B2B4B]">
            What Readers Are Saying
          </h2>
          <p className="mt-2 text-[#1B2B4B]/60">
            Join thousands of readers who have transformed their retirement
            journey
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.id} className="border-[#1B2B4B]/10 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10 bg-[#C9A84C]/20">
                    <AvatarFallback className="text-[#1B2B4B]">
                      {review.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-[#1B2B4B]">
                      {review.name}
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating
                              ? "fill-[#F59E0B] text-[#F59E0B]"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#1B2B4B]/80">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall Rating Summary */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#F8F5EF] p-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-[#1B2B4B]">4.8</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]"
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on 12,847+ verified reviews
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            ⭐⭐⭐⭐⭐ 92% of readers recommend these books
          </div>
        </div>
      </div>
    </section>
  );
};