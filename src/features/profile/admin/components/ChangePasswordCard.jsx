'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUpdatePassword } from '../hooks/useAdminProfile';
import toast from 'react-hot-toast';

export function ChangePasswordCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  
  const updatePassword = useUpdatePassword();

  const validate = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
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

    await updatePassword.mutateAsync(
      {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      },
      {
        onSuccess: () => {
          setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
          setErrors({});
          setIsOpen(false);
          toast.success('Password updated successfully!');
        },
      }
    );
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrors({});
    setIsOpen(false);
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

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const strength = getPasswordStrength(formData.newPassword);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-0 bg-white rounded-3xl shadow-[0_8px_40px_rgba(27,43,75,0.08)]">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[#1B2B4B]">Change Password</h3>
                <p className="mt-1 text-sm text-[#1B2B4B]/60">
                  Update your password regularly to keep your account secure.
                </p>
              </div>
              <Button
                onClick={handleOpen}
                className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-6 py-2.5 shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Change Password Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl border-white/20 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(4,16,58,0.15)] p-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-[#1B2B4B]">Change Password</DialogTitle>
              <DialogDescription className="text-[#1B2B4B]/60">
                Enter your current password and choose a new one.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Current Password */}
              <div>
                <Label htmlFor="current-password" className="text-sm font-medium text-[#1B2B4B]/70">
                  Current Password *
                </Label>
                <div className="relative mt-1.5">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, currentPassword: e.target.value })
                    }
                    className={cn(
                      'rounded-xl border-[#1B2B4B]/10 bg-[#F8F5EF] focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 pr-10',
                      errors.currentPassword && 'border-red-500 focus:border-red-500'
                    )}
                    placeholder="Enter current password"
                    disabled={updatePassword.isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1B2B4B]/40 hover:text-[#1B2B4B] transition-colors cursor-pointer"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.currentPassword}</p>
                )}
              </div>

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
                    placeholder="Enter new password"
                    disabled={updatePassword.isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1B2B4B]/40 hover:text-[#1B2B4B] transition-colors cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password Strength */}
                {formData.newPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${strength.bg}`}
                          style={{
                            width: `${Math.min((formData.newPassword.length / 20) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${strength.color}`}>
                        {strength.label}
                      </span>
                    </div>
                    <ul className="text-xs text-[#1B2B4B]/50 space-y-0.5">
                      <li className={formData.newPassword.length >= 8 ? 'text-emerald-500' : ''}>
                        • At least 8 characters
                      </li>
                      <li className={/[A-Z]/.test(formData.newPassword) ? 'text-emerald-500' : ''}>
                        • Uppercase letter
                      </li>
                      <li className={/[a-z]/.test(formData.newPassword) ? 'text-emerald-500' : ''}>
                        • Lowercase letter
                      </li>
                      <li className={/[0-9]/.test(formData.newPassword) ? 'text-emerald-500' : ''}>
                        • Number
                      </li>
                      <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? 'text-emerald-500' : ''}>
                        • Special character
                      </li>
                    </ul>
                  </div>
                )}
                {errors.newPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirm-password" className="text-sm font-medium text-[#1B2B4B]/70">
                  Confirm Password *
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
                    placeholder="Confirm new password"
                    disabled={updatePassword.isPending}
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

              <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={updatePassword.isPending}
                  className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updatePassword.isPending}
                  className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all disabled:opacity-70 cursor-pointer"
                >
                  {updatePassword.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}