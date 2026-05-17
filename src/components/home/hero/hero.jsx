"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    TrendingUp,
    Users,
    Target,
    CheckCircle2,
} from "lucide-react";

const HeroSection = () => {
    const trustPoints = [
        {
            icon: TrendingUp,
            text: "Psychology-based guidance",
        },
        {
            icon: Users,
            text: "Personalized readiness insights",
        },
        {
            icon: Target,
            text: "Progress tracking for your next chapter",
        },
    ];

    const readinessMetrics = [
        { label: "Purpose & Identity", value: 78 },
        { label: "Lifestyle Structure", value: 65 },
        { label: "Social Connection", value: 72 },
    ];

    return (
        <section className="relative flex min-h-screen items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
                />
            </div>

            {/* Left Dark Gradient Overlay */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#04103A]/95 via-[#06154F]/85 via-45% to-transparent" />

            {/* Soft Bottom Overlay */}
            <div className="absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-[#04103A]/40 to-transparent" />

            {/* Premium Blur Glow */}
            <div className="absolute left-10 top-32 z-[2] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute bottom-20 left-1/3 z-[2] h-60 w-60 rounded-full bg-white/10 blur-3xl" />

            {/* Content */}
            <div className="relative z-10 w-full">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
                    <div className="grid items-center gap-12">
                        {/* Left Content */}
                        <div className="max-w-2xl text-center lg:text-left">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-xl">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Retirement readiness made clearer
                            </div>

                            <h1 className="outline-text mb-8 text-5xl sm:text-5xl lg:text-5xl font-bold leading-tight tracking-tight">
                                Navigate Retirement With Confidence, Purpose, and Clarity
                            </h1>

                            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl lg:mx-0">
                                Retirement Waypoint helps professionals understand their
                                readiness, rediscover purpose, and build a meaningful next
                                chapter through guided assessments and expert insights.
                            </p>

                            <div className="mb-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                                <Button
                                    variant="ghost"
                                    className="group cursor-pointer rounded-full bg-white px-8 py-6 text-base font-semibold text-[#04103A]
                                        shadow-xl transition-all duration-300 hover:!bg-[#04103A] hover:!text-white hover:shadow-2xl md:text-lg"
                                    asChild
                                    >
                                    <Link href="/assessment" className="flex items-center">
                                        <span>Take Assessment</span>

                                        <ArrowRight
                                        className="ml-2 h-5 w-5 stroke-current transition-all duration-300
                                        group-hover:translate-x-2"
                                        />
                                    </Link>
                                    </Button>

                                <Button
                                    variant="outline"
                                    className="cursor-pointer rounded-full border border-white/40 bg-white/10 px-8 py-6 text-base font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20 hover:text-white md:text-lg"
                                    asChild
                                >
                                    <Link href="/resources">Explore Resources</Link>
                                </Button>
                            </div>

                            <div className="flex flex-col justify-center gap-5 sm:flex-row lg:justify-start">
                                {trustPoints.map(({ icon: Icon, text }) => (
                                    <div key={text} className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
                                            <Icon className="h-4 w-4 text-white" />
                                        </div>

                                        <span className="text-sm font-medium text-white/85">
                                            {text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Glass Assessment Card */}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;