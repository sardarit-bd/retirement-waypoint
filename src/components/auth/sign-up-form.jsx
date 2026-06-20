'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  CheckCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

export function SignUpForm({ onToggle }) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validate = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.name) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    return (
      !newErrors.name &&
      !newErrors.email &&
      !newErrors.password &&
      !newErrors.confirmPassword
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log('Sign up:', formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-white">
        Create Account
      </h2>

      <p className="mt-1.5 text-sm text-slate-400">
        Join and start planning your future.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Full Name */}
        <div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-800/60 py-3.5 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />
          </div>

          {errors.name && (
            <p className="mt-1 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

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
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-800/60 py-3.5 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />
          </div>

          {errors.email && (
            <p className="mt-1 text-xs text-red-400">
              {errors.email}
            </p>
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
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-800/60 py-3.5 pl-11 pr-12 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-xs text-red-400">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="relative">
            <CheckCircle className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-800/60 py-3.5 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-400">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full rounded-2xl cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20"
        >
          Create Account
        </motion.button>
      </form>

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
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 flex w-full items-center justify-center gap-3 cursor-pointer rounded-2xl border border-slate-700/60 bg-slate-800/60 py-3.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700/60"
        >
          <FcGoogle className="h-5 w-5" />
          Sign up with Google
        </motion.button>

        <p className="mt-4 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <button
            onClick={onToggle}
            className="font-medium text-indigo-400 cursor-pointer hover:text-indigo-300"
          >
            Sign In
          </button>
        </p>
      </div>
    </motion.div>
  );
}