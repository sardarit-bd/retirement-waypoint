'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signUp, signOut } from '@/lib/auth-client';
import { useSession } from './useSession';
import toast from 'react-hot-toast';

export function useAuth() {
  const router = useRouter();
  const { session, refetch: refetchSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [needsVerification, setNeedsVerification] = useState(false);

  const login = useCallback(async (email, password, rememberMe = false) => {
    setIsLoading(true);
    setError(null);
    setNeedsVerification(false);

    try {
      const result = await new Promise((resolve, reject) => {
        signIn.email(
          { email, password, rememberMe },
          {
            onSuccess: async (ctx) => {
              const user = ctx?.data?.user;
              if (user && !user.emailVerified) {
                setNeedsVerification(true);
                const errorMsg = 'Please verify your email before signing in.';
                setError(errorMsg);
                toast.error(errorMsg, {
                  duration: 5000,
                  position: 'top-right',
                });
                resolve(null);
                return;
              }

              await refetchSession();
              toast.success('👋 Welcome back!', {
                duration: 3000,
                position: 'top-right',
              });
              router.push('/dashboard');
              router.refresh();
              resolve(ctx);
            },
            onError: (ctx) => {
              const errorMessage = ctx.error?.message || 'Invalid credentials. Please try again.';
              
              if (errorMessage.toLowerCase().includes('verify') || 
                  errorMessage.toLowerCase().includes('verified') ||
                  errorMessage.toLowerCase().includes('email not verified')) {
                setNeedsVerification(true);
              }
              
              setError(errorMessage);
              toast.error(errorMessage, {
                duration: 5000,
                position: 'top-right',
              });
              reject(new Error(errorMessage));
            },
          }
        );
      });

      return result;
    } catch (err) {
      const errorMessage = err.message || 'Something went wrong during sign in';
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-right',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router, refetchSession]);

  const register = useCallback(async (name, email, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // First check if email already exists via our API
      const checkResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-email?email=${encodeURIComponent(email)}`
      );
      const checkData = await checkResponse.json();

      if (checkData.success && checkData.data?.exists) {
        const msg = 'An account with this email already exists. Please sign in.';
        setError(msg);
        toast.error(msg, {
          duration: 5000,
          position: 'top-right',
        });
        setIsLoading(false);
        return;
      }

      // If email doesn't exist, proceed with signup
      const result = await new Promise((resolve, reject) => {
        signUp.email(
          { name, email, password },
          {
            onSuccess: async (ctx) => {
              toast.success('🎉 Account created successfully. Please verify your email.', {
                duration: 5000,
                position: 'top-right',
              });
              resolve(ctx);
            },
            onError: (ctx) => {
              const errorMessage = ctx.error?.message || 'Failed to create account';
              
              // Check for duplicate email error from Better Auth
              if (errorMessage.toLowerCase().includes('email already exists') ||
                  errorMessage.toLowerCase().includes('duplicate') ||
                  errorMessage.toLowerCase().includes('already registered') ||
                  errorMessage.toLowerCase().includes('email is already')) {
                const msg = 'An account with this email already exists. Please sign in.';
                setError(msg);
                toast.error(msg, {
                  duration: 5000,
                  position: 'top-right',
                });
              } else {
                setError(errorMessage);
                toast.error(errorMessage, {
                  duration: 5000,
                  position: 'top-right',
                });
              }
              reject(new Error(errorMessage));
            },
          }
        );
      });

      return result;
    } catch (err) {
      // Don't show duplicate error again if already handled
      if (!err.message?.toLowerCase().includes('email already exists')) {
        const errorMessage = err.message || 'Something went wrong during sign up';
        setError(errorMessage);
        toast.error(errorMessage, {
          duration: 5000,
          position: 'top-right',
        });
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signOut({
        onSuccess: async () => {
          await refetchSession();
          router.push('/auth');
          router.refresh();
          toast.success('👋 You have been signed out successfully.', {
            duration: 3000,
            position: 'top-right',
          });
        },
        onError: (ctx) => {
          const errorMessage = ctx.error?.message || 'Failed to sign out';
          setError(errorMessage);
          toast.error(errorMessage, {
            duration: 5000,
            position: 'top-right',
          });
        },
      });
    } catch (err) {
      const errorMessage = err.message || 'Something went wrong during sign out';
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-right',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router, refetchSession]);

  const googleLogin = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signIn.social({
        provider: 'google',
        callbackURL: `${window.location.origin}/dashboard`,
      });
    } catch (err) {
      const errorMessage = err.message || 'Something went wrong with Google sign in';
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-right',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resendVerification = useCallback(async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend verification email');
      }

      toast.success('📧 Verification email sent successfully.', {
        duration: 4000,
        position: 'top-right',
      });
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Failed to resend verification email';
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-right',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    login,
    register,
    logout,
    googleLogin,
    resendVerification,
    isLoading,
    error,
    needsVerification,
    setNeedsVerification,
    isAuthenticated: !!session?.user,
    user: session?.user || null,
  };
}