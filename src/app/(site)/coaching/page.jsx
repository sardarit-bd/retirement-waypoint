"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, PlayCircle, Video, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const videos = [
  {
    id: 1,
    title: "Understanding Retirement Transition",
    desc: "Learn why retirement is an emotional, psychological, and lifestyle transition.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Finding Purpose After Work",
    desc: "Explore how to rebuild meaning and direction beyond your career identity.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Building Daily Structure",
    desc: "Create routines that support confidence, energy, and emotional wellbeing.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Identity Beyond Career",
    desc: "Understand how work identity changes after retirement and what comes next.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Staying Connected In Retirement",
    desc: "Build meaningful relationships and community after leaving the workplace.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "Retirement Mindset",
    desc: "Learn how to mentally prepare for life after full-time work.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 7,
    title: "Healthy Retirement Habits",
    desc: "Simple daily habits that improve wellbeing and confidence.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 8,
    title: "Creating A New Lifestyle",
    desc: "Build a fulfilling and balanced retirement lifestyle.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const rightForYou = [
  "You're within 2–3 years of retiring and want to go in prepared",
  "You've already retired and feel like something's missing",
  "You're restless, disconnected, or struggling to find your footing",
];

const CoachingPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <main className="min-h-screen bg-[#F8F5EF]">
      {/* Hero Section */}
      <section className="bg-[#1B2B4B] px-4 pb-20 pt-40 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-xl">
            <Video className="h-4 w-4 text-[#C9A84C]" />
            Retirement Coaching
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Retirement Coaching with David Allen, Ph.D.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
            Personalized guidance to help you navigate retirement with purpose,
            structure, confidence, and emotional readiness.
          </p>
        </div>
      </section>

      {/* Coaching Introduction Section */}
      <section id="coaching-introduction" className="-mt-10 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[32px] bg-white p-6 shadow-2xl sm:p-10 lg:p-12">
            <span className="inline-flex rounded-full bg-[#C9A84C]/15 px-4 py-2 text-sm font-semibold text-[#C9A84C]">
              Coaching Services
            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight text-[#1B2B4B] sm:text-4xl">
              Most people prepare financially for retirement — but not for
              everything else.
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-[#1B2B4B]/70 sm:text-lg">
              <p>
                The loss of structure. The shift in identity. The question of
                what comes next. These aren&apos;t small adjustments. They&apos;re among
                the most significant psychological transitions you&apos;ll ever
                navigate in your lifetime.
              </p>

              <p>
                I&apos;m a behavioral and industrial psychologist with 40 years of
                experience helping people understand what drives them — and what
                holds them back. I&apos;ve spent the last chapter of my own career
                doing what I wish more people had helped me do earlier: applying
                behavioral science to the question of how to actually thrive in
                retirement, not just survive it.
              </p>

              <p>
                My coaching draws on frameworks around autonomy, purpose,
                mastery, and social connection — the four domains that research
                consistently links to wellbeing and fulfillment in later life.
                We don&apos;t just talk. We build a clear picture of where you are,
                where you want to go, and what&apos;s standing in the way.
              </p>

              <p>
                Your assessment results will be used as a starting point to
                develop a customized coaching plan for you. This data will be
                stored and tracked to measure progress during the coaching
                engagement. Comments will be combined with survey results to
                identify the key factors that can have the biggest impact on
                your ability to thrive in retirement.
              </p>
            </div>

            <div className="mt-10 rounded-[28px] border border-[#C9A84C]/25 bg-[#F8F5EF] p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#1B2B4B]">
                This is right for you if:
              </h3>

              <div className="mt-5 grid gap-4">
                {rightForYou.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#C9A84C]" />
                    <p className="leading-7 text-[#1B2B4B]/75">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button
              asChild
              className="group mt-10 cursor-pointer rounded-full bg-[#C9A84C] px-8 py-6 text-base font-semibold text-[#1B2B4B]  transition-all duration-300 hover:bg-[#04103A]! hover:text-white!"
            >
              <Link href="/contact">
                Work With Me
                <ArrowRight className="ml-2 h-5 w-5 stroke-current transition-all duration-300 group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video-section" className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-[#C9A84C]/15 px-4 py-2 text-sm font-semibold text-[#C9A84C]">
            Coaching Library
          </span>

          <h2 className="mt-5 text-3xl font-bold text-[#1B2B4B] sm:text-4xl">
            Retirement Coaching Videos
          </h2>

          <p className="mt-4 leading-8 text-[#1B2B4B]/65">
            Explore practical guidance for retirement transition, identity,
            structure, purpose, and connection.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Video Player */}
          <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl">
            <div className="aspect-video bg-black">
              <iframe
                key={selectedVideo.id}
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-[#1B2B4B]">
                {selectedVideo.title}
              </h2>

              <p className="mt-3 leading-7 text-[#1B2B4B]/65">
                {selectedVideo.desc}
              </p>
            </div>
          </div>

          {/* Playlist */}
          <aside className="overflow-hidden rounded-[32px] bg-white shadow-2xl">
            <div className="border-b border-[#1B2B4B]/10 p-5">
              <h3 className="text-xl font-bold text-[#1B2B4B]">
                Video Playlist
              </h3>

              <p className="mt-1 text-sm text-[#1B2B4B]/55">
                Select a video to watch.
              </p>
            </div>

            {/* Scrollable Playlist */}
            <div className="custom-scrollbar max-h-[500px] overflow-y-auto p-4 lg:max-h-[600px]">
              <div className="space-y-3">
                {videos.map((video, index) => {
                  const isActive = selectedVideo.id === video.id;

                  return (
                    <button
                      key={video.id}
                      onClick={() => setSelectedVideo(video)}
                      className={`flex w-full cursor-pointer gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${
                        isActive
                          ? "border-[#C9A84C] bg-[#C9A84C]/15"
                          : "border-[#1B2B4B]/10 bg-[#F8F5EF] hover:border-[#C9A84C]/60"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                          isActive
                            ? "bg-[#C9A84C] text-[#1B2B4B]"
                            : "bg-[#1B2B4B] text-white"
                        }`}
                      >
                        <PlayCircle className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#C9A84C]">
                          Video {index + 1}
                        </p>

                        <h4 className="mt-1 font-bold text-[#1B2B4B]">
                          {video.title}
                        </h4>

                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#1B2B4B]/60">
                          {video.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta-section"
        className="bg-white px-4 py-16 text-center sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#1B2B4B]">
            Ready To Explore Coaching?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#1B2B4B]/65">
            Connect with David to discuss your retirement transition goals and
            learn how personalized coaching can support your next chapter.
          </p>

          <Button
            asChild
            className="group mt-8 cursor-pointer rounded-full bg-[#C9A84C] px-8 py-6 text-base font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] transition-all duration-300 hover:text-white!"
          >
            <Link href="/contact">
              Contact David
              <ArrowRight className="ml-2 h-5 w-5 stroke-current transition-all duration-300 group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CoachingPage;