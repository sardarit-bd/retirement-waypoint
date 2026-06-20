'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signUp, signOut } from '@/lib/auth-client';
import { useSession } from './useSession';

export function useAuth() {
  const router = useRouter();
  const { session, refetch: refetchSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password, rememberMe = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn.email(
        { email, password, rememberMe },
        {
          onSuccess: async () => {
            await refetchSession();
            router.push('/dashboard');
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message);
          },
        }
      );

      return result;
    } catch (err) {
      setError(err.message || 'Something went wrong during sign in');
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

      const result = await signUp.email(
        { name, email, password },
        {
          onSuccess: async () => {
            // Auto-login after signup or redirect to verification page
            router.push('/dashboard');
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message);
          },
        }
      );

      return result;
    } catch (err) {
      setError(err.message || 'Something went wrong during sign up');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signOut({
        onSuccess: async () => {
          await refetchSession();
          router.push('/auth');
          router.refresh();
        },
        onError: (ctx) => {
          setError(ctx.error.message);
        },
      });
    } catch (err) {
      setError(err.message || 'Something went wrong during sign out');
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
      setError(err.message || 'Something went wrong with Google sign in');
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
    isLoading,
    error,
    isAuthenticated: !!session?.user,
    user: session?.user || null,
  };
}