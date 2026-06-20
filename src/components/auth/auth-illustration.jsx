'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function AuthIllustration({ mode }) {
  const signUpImage = '/images/auth-img/signup-bg.png';
  const signInImage = '/images/auth-img/signin-bg.png';

  const imageUrl = mode === 'signup' ? signUpImage : signInImage;

  const title =
    mode === 'signup'
      ? 'Start Planning Your Future Today'
      : 'Welcome Back';

  const description =
    mode === 'signup'
      ? 'Take control of your retirement journey with confidence and clarity.'
      : 'Access your portfolio and continue your financial journey.';

  return (
    <motion.div
      key={mode}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative hidden lg:block w-full overflow-hidden lg:h-screen"
    >
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

      {/* Text */}
      <div className="absolute bottom-6 left-6 z-10 max-w-sm sm:bottom-8 sm:left-8 md:bottom-10 md:left-10 md:max-w-md lg:bottom-12 lg:left-10">
        <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-4xl lg:text-5xl">
          {title}
        </h2>

        <p className="mt-2 text-sm text-slate-200/90 sm:mt-3 sm:text-base md:mt-3 md:text-base lg:mt-4 lg:text-lg">
          {description}
        </p>
      </div>
    </motion.div>
  );
}