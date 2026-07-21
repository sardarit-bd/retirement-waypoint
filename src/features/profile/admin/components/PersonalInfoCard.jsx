'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Save, X, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/query-client';
import { useUpdateProfile } from '../hooks/useAdminProfile';
import { VerifyEmailChangeModal } from '@/components/auth/VerifyEmailChangeModal';
import { formatUSPhoneNumber, isValidUSPhoneNumber } from '@/lib/phoneFormatter/phone-utils';

export function PersonalInfoCard({ profile, isLoading }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    bio: '',
    newsletter: false,
    notifications: true,
  });
  const [errors, setErrors] = useState({});
  const updateProfile = useUpdateProfile();
  const queryClient = useQueryClient();
  const [pendingEmail, setPendingEmail] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.profile?.phone || '',
        role: profile.role || 'user',
        bio: profile.profile?.bio || '',
        newsletter: profile.profile?.preferences?.newsletter || false,
        notifications: profile.profile?.preferences?.notifications ?? true,
      });
    }
  }, [profile]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.phone.trim() && !isValidUSPhoneNumber(formData.phone)) {
      newErrors.phone = 'Please enter a valid US phone number, e.g. (555) 123-4567';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || '',
      email: profile?.email || '',
      phone: profile?.profile?.phone || '',
      role: profile?.role || 'user',
      bio: profile?.profile?.bio || '',
      newsletter: profile?.profile?.preferences?.newsletter || false,
      notifications: profile?.profile?.preferences?.notifications ?? true,
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!validate()) return;

    const trimmedEmail = formData.email.trim().toLowerCase();
    const emailChanged = trimmedEmail !== (profile?.email || '').toLowerCase();

    // Only send fields the backend actually accepts via PATCH /me
    // (email changes go through the separate emailOTP verification flow below)
    const data = {
      name: formData.name,
      phone: formData.phone,
      bio: formData.bio,
      preferences: {
        newsletter: formData.newsletter,
        notifications: formData.notifications,
      },
    };

    await updateProfile.mutateAsync(data, {
      onSuccess: () => {
        setIsEditing(false);
        if (emailChanged) {
          setPendingEmail(trimmedEmail);
        }
      },
    });
  };

  const handleChange = (field, value) => {
    const nextValue = field === 'phone' ? formatUSPhoneNumber(value) : value;
    setFormData((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const infoRows = [
    {
      label: 'Full Name',
      field: 'name',
      value: formData.name,
      editable: true,
      type: 'text',
      placeholder: 'Enter your full name',
    },
    {
      label: 'Email Address',
      field: 'email',
      value: formData.email,
      editable: true,
      type: 'email',
      placeholder: 'Enter your email address',
      hint: "You'll be asked to verify your new email with a code sent to it.",
    },
    { 
      label: 'Phone Number', 
      field: 'phone', 
      value: formData.phone, 
      editable: true,
      type: 'text',
      placeholder: '+1 (555) 000-0000',
    },
    { 
      label: 'Role', 
      field: 'role', 
      value: (
        <Badge className="bg-[#C9A84C]/10 text-[#C9A84C] border-[#C9A84C]/20">
          {formData.role === 'admin' ? 'Administrator' : formData.role?.charAt(0).toUpperCase() + formData.role?.slice(1) || 'User'}
        </Badge>
      ),
      editable: false,
    },
    {
      label: 'Bio',
      field: 'bio',
      value: formData.bio,
      editable: true,
      type: 'text',
      placeholder: 'Tell us a bit about yourself',
    },
    {
      label: 'Newsletter',
      field: 'newsletter',
      value: formData.newsletter ? (
        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
          ✓ Subscribed
        </Badge>
      ) : (
        <Badge className="bg-gray-500/10 text-gray-600 border-gray-500/20">
          Not subscribed
        </Badge>
      ),
      editable: true,
      type: 'checkbox',
    },
    {
      label: 'Notifications',
      field: 'notifications',
      value: formData.notifications ? (
        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
          ✓ Enabled
        </Badge>
      ) : (
        <Badge className="bg-gray-500/10 text-gray-600 border-gray-500/20">
          Disabled
        </Badge>
      ),
      editable: true,
      type: 'checkbox',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="border-0 bg-white rounded-3xl shadow-[0_8px_40px_rgba(27,43,75,0.08)]">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1B2B4B]">Personal Information</h3>
            {!isEditing && !isLoading && (
              <Button
                onClick={handleEdit}
                variant="ghost"
                size="sm"
                className="rounded-full text-[#8B5CF6] hover:bg-[#8B5CF6]/10 hover:text-[#7C3AED]"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>

          {/* Info Rows */}
          <div className="space-y-0 divide-y divide-[#1B2B4B]/5">
            {infoRows.map((row, index) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
              >
                <span className="text-sm font-medium text-[#1B2B4B]/60">
                  {row.label}
                </span>
                <div className="text-sm text-[#1B2B4B] text-right max-w-[60%]">
                  {isEditing && row.editable ? (
                    row.type === 'checkbox' ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData[row.field]}
                          onChange={(e) => handleChange(row.field, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A84C]"></div>
                      </label>
                    ) : (
                      <div>
                        <Input
                          type={row.type || 'text'}
                          inputMode={row.field === 'phone' ? 'tel' : undefined}
                          maxLength={row.field === 'phone' ? 18 : undefined}
                          value={formData[row.field]}
                          onChange={(e) => handleChange(row.field, e.target.value)}
                          className={cn(
                            'border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-right',
                            errors[row.field] && 'border-red-500 focus:border-red-500'
                          )}
                          placeholder={row.placeholder}
                        />
                        {row.field === 'phone' && errors.phone ? (
                          <p className="mt-1 text-[10px] text-red-500">{errors.phone}</p>
                        ) : (
                          row.hint && (
                            <p className="mt-1 text-[10px] text-[#1B2B4B]/40">{row.hint}</p>
                          )
                        )}
                      </div>
                    )
                  ) : (
                    row.value
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          {isEditing && (
            <div className="flex gap-3 pt-4 mt-4 border-t border-[#1B2B4B]/5">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={updateProfile.isPending}
                className="flex-1 rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30 cursor-pointer"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                disabled={updateProfile.isPending}
                className="flex-1 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all disabled:opacity-70 cursor-pointer"
              >
                {updateProfile.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <VerifyEmailChangeModal
        open={!!pendingEmail}
        newEmail={pendingEmail}
        onClose={() => setPendingEmail(null)}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
        }}
      />
    </motion.div>
  );
}