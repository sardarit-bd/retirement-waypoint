'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

export function SignInForm({ onToggle }) {
  const [showPassword, setShowPassword] = useState(false);
  const { login, googleLogin, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validate = () => {
    const newErrors = {
      email: '',
      password: '',
    };

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await login(formData.email, formData.password, formData.rememberMe);
      toast.success('👋 Welcome back! You have been signed in successfully.', {
        duration: 4000,
        position: 'top-right',
      });
    } catch (err) {
      toast.error(err.message || 'Failed to sign in. Please try again.', {
        duration: 5000,
        position: 'top-right',
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
    } catch (err) {
      toast.error(err.message || 'Google sign in failed. Please try again.', {
        duration: 5000,
        position: 'top-right',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-white">Welcome Back</h2>

      <p className="mt-1.5 text-sm text-slate-400">
        Sign in to continue your journey.
      </p>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Email */}
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-800/60 py-3.5 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 disabled:opacity-50"
              disabled={isLoading}
            />
          </div>

          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-800/60 py-3.5 pl-11 pr-12 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 disabled:opacity-50"
              disabled={isLoading}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 disabled:opacity-50"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-xs text-red-400">{errors.password}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rememberMe: e.target.checked,
                })
              }
              className="h-4 w-4 accent-indigo-500 disabled:opacity-50"
              disabled={isLoading}
            />
            Remember Me
          </label>

          <button
            type="button"
            className="text-sm text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
            disabled={isLoading}
            onClick={() => {
              // Forgot password - prepare for future implementation
              console.log('Forgot password clicked');
            }}
          >
            Forgot Password?
          </button>
        </div>

        {/* Sign In Button */}
        <motion.button
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:shadow-indigo-600/30 disabled:opacity-70 disabled:hover:scale-100"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Signing In...
            </span>
          ) : (
            'Sign In'
          )}
        </motion.button>
      </form>

      {/* Divider */}
      <div className="mt-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-700/50" />

          <span className="text-xs uppercase tracking-wider text-slate-500">
            Or continue with
          </span>

          <div className="h-px flex-1 bg-slate-700/50" />
        </div>

        {/* Google Button */}
        <motion.button
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-700/60 bg-slate-800/60 py-3.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700/60 disabled:opacity-50"
        >
          <FcGoogle className="h-5 w-5" />
          Sign in with Google
        </motion.button>

        <p className="mt-5 text-center text-sm text-slate-400">
          Don&apos;t have an account?{' '}
          <button
            onClick={onToggle}
            className="font-medium text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
            disabled={isLoading}
          >
            Sign Up
          </button>
        </p>
      </div>
    </motion.div>
  );
}