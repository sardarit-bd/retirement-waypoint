'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('No verification token provided.');
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email?token=${token}`
        );
        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setMessage('Your email has been verified successfully!');
          toast.success('🎉 Email verified successfully!', {
            duration: 4000,
            position: 'top-right',
          });

          // Redirect to sign in after 3 seconds
          setTimeout(() => {
            router.push('/auth');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Invalid or expired verification link.');
          toast.error('Invalid or expired verification link.', {
            duration: 5000,
            position: 'top-right',
          });
        }
      } catch (error) {
        setStatus('error');
        setMessage('Failed to verify email. Please try again.');
        toast.error('Failed to verify email. Please try again.', {
          duration: 5000,
          position: 'top-right',
        });
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="max-w-md w-full bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
        <div className="text-center">
          {status === 'verifying' && (
            <>
              <Loader2 className="h-16 w-16 animate-spin text-indigo-500 mx-auto" />
              <h2 className="mt-6 text-2xl font-bold text-white">Verifying Your Email</h2>
              <p className="mt-2 text-slate-400">Please wait while we verify your email address...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto" />
              <h2 className="mt-6 text-2xl font-bold text-white">Email Verified!</h2>
              <p className="mt-2 text-slate-400">{message}</p>
              <p className="mt-4 text-sm text-slate-500">Redirecting to sign in...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto" />
              <h2 className="mt-6 text-2xl font-bold text-white">Verification Failed</h2>
              <p className="mt-2 text-slate-400">{message}</p>
              <button
                onClick={() => router.push('/auth')}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-indigo-600/30 transition-all"
              >
                Go to Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}