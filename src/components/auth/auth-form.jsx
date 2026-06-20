'use client';

import { SignUpForm } from './sign-up-form';
import { SignInForm } from './sign-in-form';

export function AuthForm({ mode, onToggle }) {
  return (
    <div className="flex h-full w-full items-center justify-center lg:h-screen">
      <div className="w-full max-w-[450px] px-5 sm:px-6 lg:px-8">
        <div className="">
          {mode === 'signup' ? (
            <SignUpForm onToggle={onToggle} />
          ) : (
            <SignInForm onToggle={onToggle} />
          )}
        </div>
      </div>
    </div>
  );
}