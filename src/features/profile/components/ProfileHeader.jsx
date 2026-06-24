"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, Mail, Camera, X, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  useUpdateProfileImage,
  useRemoveProfileImage,
} from "../hooks/useProfile";
import toast from "react-hot-toast";

export function ProfileHeader({ profile }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const fileInputRef = useRef(null);

  const { mutate: updateProfileImage } = useUpdateProfileImage();
  const { mutate: removeProfileImage } = useRemoveProfileImage();

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
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
      setIsUploading(true);
      updateProfileImage(selectedFile, {
        onSuccess: () => {
          setPreviewImage(null);
          setSelectedFile(null);
          setIsUploading(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          // toast.success("Profile image updated successfully");
        },
        onError: (error) => {
          setIsUploading(false);
          toast.error(
            error?.response?.data?.message || "Failed to update profile image",
          );
        },
      });
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    removeProfileImage(undefined, {
      onSuccess: () => {
        setIsRemoving(false);
        toast.success("Profile image removed successfully");
      },
      onError: (error) => {
        setIsRemoving(false);
        toast.error(
          error?.response?.data?.message || "Failed to remove profile image",
        );
      },
    });
  };

  const handleCancel = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const roleColors = {
    admin: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    coach: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    user: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };

  console.log("PROFILE =", profile);

  const displayImage = previewImage || profile?.profile?.profileImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            {/* Avatar with Camera Overlay */}
            <div className="flex flex-col items-center">
              {/* Avatar Section */}
              <div className="relative">
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <Avatar className="h-28 w-28 border-4 border-white shadow-xl">
                    <AvatarImage src={displayImage || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-[#C9A84C] to-[#D6B45A] text-2xl font-semibold text-[#04103A]">
                      {getInitials(profile?.name)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Camera Button */}
                  <label
                    htmlFor="profile-image-upload"
                    className="absolute -bottom-1 -right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#C9A84C] shadow-lg transition-all hover:scale-110 hover:bg-[#D6B45A]"
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
              </div>

              {/* Upload / Cancel Buttons */}
              {previewImage && (
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="flex h-10 items-center rounded-full bg-emerald-500 px-5 text-sm font-medium text-white transition-all hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Upload"
                    )}
                  </button>

                  <button
                    onClick={handleCancel}
                    disabled={isUploading}
                    className="flex h-10 items-center rounded-full border border-[#1B2B4B]/15 bg-white px-5 text-sm font-medium text-[#1B2B4B] transition-all hover:bg-[#F8F5EF]"
                  >
                    <X className="mr-1 h-4 w-4" />
                    Cancel
                  </button>
                </div>
              )}

              {/* User Name */}
              <h2 className="mt-5 text-2xl font-bold text-[#1B2B4B]">
                {profile?.name || "User"}
              </h2>
            </div>

            {/* Email */}
            <div className="flex items-center gap-1.5 mt-1 text-sm text-[#1B2B4B]/60">
              <Mail className="h-3.5 w-3.5" />
              <span>{profile?.email}</span>
            </div>

            {/* Badges */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <Badge
                className={cn(
                  "border px-3 py-1 text-xs font-medium",
                  roleColors[profile?.role] || roleColors.user,
                )}
              >
                {profile?.role?.charAt(0).toUpperCase() +
                  profile?.role?.slice(1) || "User"}
              </Badge>
              {profile?.emailVerified && (
                <Badge
                  variant="outline"
                  className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600 text-[10px]"
                >
                  ✓ Verified
                </Badge>
              )}
              {profile?.isActive !== false && (
                <Badge
                  variant="outline"
                  className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600 text-[10px]"
                >
                  ● Active
                </Badge>
              )}
              {profile?.profileImage && !previewImage && (
                <button
                  onClick={handleRemove}
                  disabled={isRemoving}
                  className="text-xs text-red-500 hover:text-red-600 disabled:opacity-50"
                >
                  {isRemoving ? (
                    <span className="flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Removing...
                    </span>
                  ) : (
                    "Remove photo"
                  )}
                </button>
              )}
            </div>

            {/* Member Since */}
            <div className="flex items-center gap-1.5 mt-3 text-xs text-[#1B2B4B]/40">
              <Calendar className="h-3.5 w-3.5" />
              <span>Member since {formatDate(profile?.createdAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
