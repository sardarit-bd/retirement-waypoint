"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter email:", email);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden py-10 sm:py-20 md:py-24 lg:py-10">
      {/* Background Image */}
      <Image
        src="/images/newsletter-bg.jpg"
        alt="Newsletter background"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-[#04103A]/80" />

      {/* Golden Blur */}
      <div className="absolute left-1/2 top-0 z-[2] h-32 w-32 -translate-x-1/2 rounded-full bg-[#C9A84C]/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A84C]/20">
          <Mail className="h-6 w-6 text-[#C9A84C]" />
        </div>

        <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base md:mb-8 md:text-lg">
          Our retirement transition insights are designed to guide you through
          every step of the process.
        </p>

        <h2 className="mb-8 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
          Stay Up to Date With Newsletter
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl bg-white/95 p-3 shadow-2xl backdrop-blur sm:flex-row sm:items-center"
        >
          <Input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 flex-1 border-0 bg-transparent px-4 text-sm text-[#1B2B4B] shadow-none outline-none placeholder:text-[#1B2B4B]/45 focus-visible:ring-0 sm:h-14 sm:px-5 sm:text-base"
          />

          <Button
            type="submit"
            className="group h-12 w-full cursor-pointer rounded-xl bg-[#1B2B4B] px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#C9A84C] hover:text-[#1B2B4B] sm:h-14 sm:w-auto sm:px-8 sm:text-base"
          >
            Subscribe
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;