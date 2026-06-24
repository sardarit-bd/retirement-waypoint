'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit2, Save, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUpdateProfile } from '../hooks/useProfile';
import toast from 'react-hot-toast';

export function PersonalInformationCard({ profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
  });
  const [originalData, setOriginalData] = useState({
    name: '',
    phone: '',
    bio: '',
  });

  const { mutate: updateProfile } = useUpdateProfile();

  useEffect(() => {
    if (profile) {
      const data = {
        name: profile.name || "",
        phone: profile.profile?.phone || "",
        bio: profile.profile?.bio || "",
      };
  
      setFormData(data);
      setOriginalData(data);
    }
  }, [profile]);

  const handleEdit = () => {
    setOriginalData(formData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    updateProfile(
      { phone: formData.phone, bio: formData.bio },
      {
        onSuccess: () => {
          setIsSaving(false);
          setIsEditing(false);
          setOriginalData(formData);
          // toast.success('Profile updated successfully');
        },
        onError: (error) => {
          setIsSaving(false);
          toast.error(error?.response?.data?.message || 'Failed to update profile');
        },
      }
    );
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1B2B4B]">Personal Information</h3>
            {!isEditing && (
              <Button
                onClick={handleEdit}
                size="sm"
                className="rounded-full bg-[#1B2B4B] text-white hover:bg-[#1B2B4B]/90"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {/* Full Name - Read-only */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1B2B4B]/70">Full Name</label>
              <Input
                value={formData.name}
                disabled
                className="rounded-xl border-[#1B2B4B]/10 bg-[#F8F5EF] text-[#1B2B4B] cursor-not-allowed"
              />
            </div>

            {/* Email - Always Read-only */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1B2B4B]/70">Email</label>
              <Input
                value={profile?.email || ''}
                disabled
                className="rounded-xl border-[#1B2B4B]/10 bg-[#F8F5EF] text-[#1B2B4B]/60 cursor-not-allowed"
              />
            </div>

            {/* Phone - Editable */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1B2B4B]/70">Phone Number</label>
              <Input
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                disabled={!isEditing || isSaving}
                className={cn(
                  'rounded-xl border-[#1B2B4B]/10 bg-[#F8F5EF] focus:border-[#C9A84C] focus:ring-[#C9A84C]/20',
                  !isEditing && 'cursor-not-allowed opacity-75'
                )}
              />
            </div>

            {/* Bio - Editable */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1B2B4B]/70">Bio</label>
              <Textarea
                value={formData.bio || ''}
                onChange={(e) => handleChange('bio', e.target.value)}
                placeholder="Tell us a little about yourself..."
                disabled={!isEditing || isSaving}
                rows={3}
                className={cn(
                  'rounded-xl border-[#1B2B4B]/10 bg-[#F8F5EF] resize-none focus:border-[#C9A84C] focus:ring-[#C9A84C]/20',
                  !isEditing && 'cursor-not-allowed opacity-75'
                )}
              />
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF]"
                  disabled={isSaving}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  size="sm"
                  className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
                >
                  {isSaving ? (
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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}