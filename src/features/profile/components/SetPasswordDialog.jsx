'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2, Key } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSetPassword } from '../hooks/useProfile';
import toast from 'react-hot-toast';

export function SetPasswordDialog({ open, onOpenChange }) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const setPasswordMutation = useSetPassword();

  const validate = () => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await setPasswordMutation.mutateAsync(
      {
        newPassword: formData.newPassword,
      },
      {
        onSuccess: () => {
          setFormData({
            newPassword: '',
            confirmPassword: '',
          });
          setErrors({});
          onOpenChange(false);
          toast.success('Password set successfully! You can now log in with email and password.');
        },
      }
    );
  };

  const handleCancel = () => {
    setFormData({
      newPassword: '',
      confirmPassword: '',
    });
    setErrors({});
    onOpenChange(false);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { label: 'None', color: 'text-gray-400', bg: 'bg-gray-200' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    const levels = [
      { label: 'Very Weak', color: 'text-red-500', bg: 'bg-red-500' },
      { label: 'Weak', color: 'text-orange-500', bg: 'bg-orange-500' },
      { label: 'Fair', color: 'text-yellow-500', bg: 'bg-yellow-500' },
      { label: 'Good', color: 'text-blue-500', bg: 'bg-blue-500' },
      { label: 'Strong', color: 'text-emerald-500', bg: 'bg-emerald-500' },
    ];
    return levels[score - 1] || levels[0];
  };

  const strength = getPasswordStrength(formData.newPassword);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl border-white/20 bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(4,16,58,0.15)] p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="p-6"
        >
          <DialogHeader className="space-y-2">
            <div className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-semibold">
              <Key className="h-3.5 w-3.5" />
              Credentials Setup
            </div>
            <DialogTitle className="text-2xl font-bold text-[#1B2B4B]">
              Set Account Password
            </DialogTitle>
            <DialogDescription className="text-[#1B2B4B]/60">
              Add a password so you can sign in using either Google or your email address.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* New Password */}
            <div>
              <Label htmlFor="new-password" className="text-sm font-medium text-[#1B2B4B]/70">
                New Password *
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  className={cn(
                    'rounded-xl border-[#1B2B4B]/10 bg-[#F8F5EF] focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 pr-10',
                    errors.newPassword && 'border-red-500 focus:border-red-500'
                  )}
                  placeholder="Create a strong password"
                  disabled={setPasswordMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1B2B4B]/40 hover:text-[#1B2B4B] transition-colors cursor-pointer"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>
              )}

              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#1B2B4B]/60">Password strength:</span>
                    <span className={cn('font-medium', strength.color)}>{strength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={cn('h-full transition-all duration-300', strength.bg)}
                      style={{
                        width:
                          strength.label === 'Very Weak'
                            ? '20%'
                            : strength.label === 'Weak'
                            ? '40%'
                            : strength.label === 'Fair'
                            ? '60%'
                            : strength.label === 'Good'
                            ? '80%'
                            : '100%',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirm-password" className="text-sm font-medium text-[#1B2B4B]/70">
                Confirm New Password *
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className={cn(
                    'rounded-xl border-[#1B2B4B]/10 bg-[#F8F5EF] focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 pr-10',
                    errors.confirmPassword && 'border-red-500 focus:border-red-500'
                  )}
                  placeholder="Confirm your password"
                  disabled={setPasswordMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1B2B4B]/40 hover:text-[#1B2B4B] transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Password Requirements Helper */}
            <div className="rounded-xl bg-[#F8F5EF] p-3 text-xs text-[#1B2B4B]/60 space-y-1">
              <p className="font-medium text-[#1B2B4B]/80">Password must contain:</p>
              <ul className="list-disc list-inside space-y-0.5 pl-1">
                <li className={formData.newPassword.length >= 8 ? 'text-emerald-600 font-medium' : ''}>
                  At least 8 characters
                </li>
                <li className={/[A-Z]/.test(formData.newPassword) ? 'text-emerald-600 font-medium' : ''}>
                  At least one uppercase letter
                </li>
                <li className={/[a-z]/.test(formData.newPassword) ? 'text-emerald-600 font-medium' : ''}>
                  At least one lowercase letter
                </li>
                <li className={/[0-9]/.test(formData.newPassword) ? 'text-emerald-600 font-medium' : ''}>
                  At least one number
                </li>
                <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? 'text-emerald-600 font-medium' : ''}>
                  At least one special character
                </li>
              </ul>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={setPasswordMutation.isPending}
                className="w-full sm:w-auto rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={setPasswordMutation.isPending}
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] font-semibold text-[#04103A] hover:opacity-95 shadow-md shadow-[#C9A84C]/20 cursor-pointer"
              >
                {setPasswordMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting Password...
                  </>
                ) : (
                  'Set Password'
                )}
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
