"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AuthForm } from "./auth-form";
import { AuthIllustration } from "./auth-illustration";
import Image from "next/image";
import Link from "next/link";

export function AuthPage() {
  const [mode, setMode] = useState("signin");

  const toggleMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      {/* Fixed Logo */}
      <div className="absolute top-5 left-5 sm:top-6 sm:left-6 lg:top-8 lg:left-8 xl:left-12 z-30">
        <Link href="/" className="inline-block">
          <Image
            src="/logo-01.png"
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            priority
            className="h-auto w-36 sm:w-44 md:w-52 lg:w-44 xl:w-52 object-contain cursor-pointer"
          />
        </Link>
      </div>

      {/* Centered toggle switch */}
      <div className="absolute top-40 sm:top-8 lg:top-30 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center rounded-full bg-slate-800/60 p-1 backdrop-blur-sm border border-slate-700/50 shadow-lg w-fit">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleMode("signin")}
            className={`relative rounded-full px-5 sm:px-6 lg:px-8 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
              mode === "signin"
                ? "text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {mode === "signin" && (
              <motion.div
                layoutId="activeToggle"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <span className="relative z-10">Sign In</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleMode("signup")}
            className={`relative rounded-full px-5 sm:px-6 lg:px-8 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
              mode === "signup"
                ? "text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {mode === "signup" && (
              <motion.div
                layoutId="activeToggle"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <span className="relative z-10">Sign Up</span>
          </motion.button>
        </div>
      </div>

      {/* Main content */}
      <div className="relative flex min-h-screen w-full items-center justify-center p-4 pt-24 md:p-6 md:pt-28 lg:p-0 lg:pt-0">
        <div className="w-full">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen"
            >
              {/* Form panel - position changes based on mode */}
              <motion.div
                key={`form-${mode}`}
                initial={{ x: mode === "signin" ? -30 : 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: mode === "signin" ? 30 : -30, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`order-2 lg:order-${mode === "signup" ? "1" : "2"}`}
              >
                <AuthForm
                  mode={mode}
                  onToggle={() =>
                    toggleMode(mode === "signup" ? "signin" : "signup")
                  }
                />
              </motion.div>

              {/* Illustration panel - position changes based on mode */}
              <motion.div
                key={`illustration-${mode}`}
                initial={{ x: mode === "signin" ? 30 : -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: mode === "signin" ? -30 : 30, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`order-1 lg:order-${mode === "signup" ? "2" : "1"}`}
              >
                <AuthIllustration mode={mode} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
