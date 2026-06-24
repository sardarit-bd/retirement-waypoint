'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUpdateProfileImage, useRemoveProfileImage } from '../hooks/useProfile';

export function ProfileImageCard({ profile }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const { mutate: updateProfileImage, isPending: isUploading } = useUpdateProfileImage();
  const { mutate: removeProfileImage, isPending: isRemoving } = useRemoveProfileImage();

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      updateProfileImage(selectedFile, {
        onSuccess: () => {
          setPreviewImage(null);
          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        },
      });
    }
  };

  const handleRemove = () => {
    removeProfileImage();
  };

  const handleCancel = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-semibold text-[#1B2B4B]">Profile Image</h3>
          
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                <AvatarImage src={previewImage || profile?.profileImage || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-[#C9A84C] to-[#D6B45A] text-2xl font-semibold text-[#04103A]">
                  {getInitials(profile?.name)}
                </AvatarFallback>
              </Avatar>

              {/* Upload Overlay */}
              <label
                htmlFor="profile-image-upload"
                className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-[#C9A84C] p-2 shadow-lg transition-all hover:scale-110 hover:bg-[#D6B45A]"
              >
                <Camera className="h-4 w-4 text-[#04103A]" />
              </label>
              <input
                id="profile-image-upload"
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isUploading || isRemoving}
              />
            </motion.div>

            {/* Preview Actions */}
            {previewImage && (
              <div className="mt-4 flex items-center gap-2">
                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  size="sm"
                  className="rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Upload'
                  )}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-[#1B2B4B]/15"
                >
                  <X className="mr-1 h-3 w-3" />
                  Cancel
                </Button>
              </div>
            )}

            {/* Remove Button */}
            {profile?.profileImage && !previewImage && (
              <Button
                onClick={handleRemove}
                disabled={isRemoving}
                variant="ghost"
                size="sm"
                className="mt-4 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                {isRemoving ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Removing...
                  </>
                ) : (
                  'Remove Image'
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}