'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useUpdateProfileImage, useRemoveProfileImage } from '../hooks/useAdminProfile';
import toast from 'react-hot-toast';

export function ProfileCard({ profile, isLoading }) {
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const updateProfileImage = useUpdateProfileImage();
    const removeProfileImage = useRemoveProfileImage();

    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.split(' ').filter(Boolean);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return format(new Date(date), 'MMMM d, yyyy');
    };

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be less than 5MB');
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setIsUploading(true);
        await updateProfileImage.mutateAsync(selectedFile, {
            onSuccess: () => {
                setPreviewImage(null);
                setSelectedFile(null);
                setIsUploading(false);
            },
            onError: () => {
                setIsUploading(false);
            },
        });
    };

    const handleRemove = async () => {
        await removeProfileImage.mutateAsync();
    };

    const displayImage = previewImage || profile?.profile?.profileImage;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="border-0 bg-white rounded-3xl shadow-[0_8px_40px_rgba(27,43,75,0.08)] overflow-hidden">
                <CardContent className="text-center">
                    {/* Avatar */}
                    <div className="relative mx-auto h-[340px] overflow-hidden rounded-3xl bg-[#F4F4F4]">
                        {displayImage ? (
                            <img
                                src={displayImage}
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-[#04103A]">
                                {getInitials(profile?.name)}
                            </div>
                        )}
                    </div>

                    {/* Upload Preview Actions */}
                    {previewImage && (
                        <div className="mt-3 flex items-center justify-center gap-3">
                            <Button
                                onClick={handleUpload}
                                disabled={isUploading}
                                size="sm"
                                className="rounded-full bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 cursor-pointer"
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    'Upload'
                                )}
                            </Button>
                            <Button
                                onClick={() => {
                                    setPreviewImage(null);
                                    setSelectedFile(null);
                                }}
                                variant="outline"
                                size="sm"
                                className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] cursor-pointer"
                            >
                                Cancel
                            </Button>
                        </div>
                    )}

                    {/* Name */}
                    <h2 className="mt-4 text-2xl font-bold text-[#1B2B4B]">
                        {profile?.name || 'User'}
                    </h2>

                    {/* Role Badge */}
                    <div className="mt-1.5">
                        <Badge className="bg-[#C9A84C]/10 text-[#C9A84C] border-[#C9A84C]/20 px-3 py-1 text-xs font-medium">
                            {profile?.role === 'admin' ? 'Administrator' : profile?.role?.charAt(0).toUpperCase() + profile?.role?.slice(1) || 'User'}
                        </Badge>
                    </div>

                    {/* Email */}
                    <p className="mt-3 text-sm text-[#1B2B4B]/60">
                        {profile?.email || 'No email'}
                    </p>

                    {/* Joined Date */}
                    <p className="mt-1 text-xs text-[#1B2B4B]/40">
                        Joined {formatDate(profile?.createdAt)}
                    </p>

                    {/* Change Photo Button */}
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="mt-5 w-full rounded-full border-2 border-[#1B2B4B]/15 text-[#1B2B4B] font-medium hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30 transition-all cursor-pointer"
                    >
                        Change Photo
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    {/* Remove Photo (if exists) */}
                    {profile?.profile?.profileImage && !previewImage && (
                        <button
                            onClick={handleRemove}
                            disabled={removeProfileImage.isPending}
                            className="mt-2 text-xs text-red-500 hover:text-red-600 hover:underline transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {removeProfileImage.isPending ? 'Removing...' : 'Remove photo'}
                        </button>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}