/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { X, Upload, Loader2, FileText, Image as ImageIcon, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const STATUS_OPTIONS = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'ARCHIVED', label: 'Archived' },
];

export function AdminBookForm({
  initialData = null,
  isEdit = false,
  onSubmit,
  isSubmitting = false,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    authorName: '',
    price: '',
    pageCount: '',
    featured: false,
    status: 'DRAFT',
    previewEnabled: true,
    previewEndPage: '5',
  });
  const [coverFile, setCoverFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [pdfName, setPdfName] = useState(null);
  const [errors, setErrors] = useState({});

  // Load initial data for edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        authorName: initialData.authorName || '',
        price: initialData.price?.toString() || '',
        pageCount: initialData.pageCount?.toString() || '',
        featured: initialData.featured || false,
        status: initialData.status || 'DRAFT',
        previewEnabled: initialData.previewEnabled !== false,
        previewEndPage: initialData.previewEndPage?.toString() || '5',
      });
      if (initialData.coverImage) {
        setCoverPreview(initialData.coverImage);
      }
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'cover') {
      // Validate image
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, cover: 'Please upload an image file' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, cover: 'Image must be less than 5MB' }));
        return;
      }
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setCoverPreview(reader.result);
      reader.readAsDataURL(file);
      setErrors((prev) => ({ ...prev, cover: '' }));
    } else if (type === 'pdf') {
      if (file.type !== 'application/pdf') {
        setErrors((prev) => ({ ...prev, pdf: 'Please upload a PDF file' }));
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, pdf: 'PDF must be less than 50MB' }));
        return;
      }
      setPdfFile(file);
      setPdfName(file.name);
      setErrors((prev) => ({ ...prev, pdf: '' }));
    }
  };

  const removeCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
  };

  const removePdf = () => {
    setPdfFile(null);
    setPdfName(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.authorName.trim()) newErrors.authorName = 'Author name is required';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) < 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.pageCount || isNaN(formData.pageCount) || Number(formData.pageCount) < 1) {
      newErrors.pageCount = 'Valid page count is required';
    }
    if (!isEdit && !coverFile) newErrors.cover = 'Cover image is required';
    if (!isEdit && !pdfFile) newErrors.pdf = 'PDF file is required';
    if (formData.previewEnabled) {
      if (!formData.previewEndPage || isNaN(formData.previewEndPage) || Number(formData.previewEndPage) < 1) {
        newErrors.previewEndPage = 'Preview end page must be at least 1';
      } else if (
        formData.pageCount &&
        Number(formData.previewEndPage) > Number(formData.pageCount)
      ) {
        newErrors.previewEndPage = 'Preview end page cannot exceed total page count';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        submitData.append(key, value);
      }
    });
    if (coverFile) submitData.append('coverImage', coverFile);
    if (pdfFile) submitData.append('pdfFile', pdfFile);

    onSubmit(submitData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-[#1B2B4B]">
                Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter book title"
                className={cn(
                  'mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20',
                  errors.title && 'border-red-500 focus:border-red-500'
                )}
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-[#1B2B4B]">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Enter book description"
                rows={4}
                className={cn(
                  'mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20',
                  errors.description && 'border-red-500 focus:border-red-500'
                )}
              />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
            </div>

            {/* Author */}
            <div>
              <Label htmlFor="authorName" className="text-sm font-medium text-[#1B2B4B]">
                Author *
              </Label>
              <Input
                id="authorName"
                value={formData.authorName}
                onChange={(e) => handleChange('authorName', e.target.value)}
                placeholder="Enter author name"
                className={cn(
                  'mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20',
                  errors.authorName && 'border-red-500 focus:border-red-500'
                )}
              />
              {errors.authorName && <p className="mt-1 text-xs text-red-500">{errors.authorName}</p>}
            </div>

            {/* Price and Page Count */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="price" className="text-sm font-medium text-[#1B2B4B]">
                  Price ($) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="0.00"
                  className={cn(
                    'mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20',
                    errors.price && 'border-red-500 focus:border-red-500'
                  )}
                />
                {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
              </div>
              <div>
                <Label htmlFor="pageCount" className="text-sm font-medium text-[#1B2B4B]">
                  Page Count *
                </Label>
                <Input
                  id="pageCount"
                  type="number"
                  min="1"
                  value={formData.pageCount}
                  onChange={(e) => handleChange('pageCount', e.target.value)}
                  placeholder="Enter page count"
                  className={cn(
                    'mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20',
                    errors.pageCount && 'border-red-500 focus:border-red-500'
                  )}
                />
                {errors.pageCount && <p className="mt-1 text-xs text-red-500">{errors.pageCount}</p>}
              </div>
            </div>

            {/* Featured and Status */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-3">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleChange('featured', checked)}
                  className="data-[state=checked]:bg-[#C9A84C]"
                />
                <Label htmlFor="featured" className="text-sm font-medium text-[#1B2B4B]">
                  Featured Book
                </Label>
              </div>
              <div>
                <Label htmlFor="status" className="text-sm font-medium text-[#1B2B4B]">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger className="mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Book Preview Settings */}
            <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF] p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-[#C9A84C]" />
                <h3 className="text-sm font-semibold text-[#1B2B4B]">
                  Book Preview Settings
                </h3>
              </div>
              <p className="mt-1 text-xs text-[#1B2B4B]/50">
                Control how much of this book guests can read before buying.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center space-x-3">
                  <Switch
                    id="previewEnabled"
                    checked={formData.previewEnabled}
                    onCheckedChange={(checked) => handleChange('previewEnabled', checked)}
                    className="data-[state=checked]:bg-[#C9A84C]"
                  />
                  <Label htmlFor="previewEnabled" className="text-sm font-medium text-[#1B2B4B]">
                    Preview Enabled
                  </Label>
                </div>
                <div>
                  <Label htmlFor="previewEndPage" className="text-sm font-medium text-[#1B2B4B]">
                    Preview End Page
                  </Label>
                  <Input
                    id="previewEndPage"
                    type="number"
                    min="1"
                    max={formData.pageCount || undefined}
                    disabled={!formData.previewEnabled}
                    value={formData.previewEndPage}
                    onChange={(e) => handleChange('previewEndPage', e.target.value)}
                    placeholder="e.g. 4"
                    className={cn(
                      'mt-1.5 rounded-xl border-[#1B2B4B]/10 bg-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 disabled:opacity-50',
                      errors.previewEndPage && 'border-red-500 focus:border-red-500'
                    )}
                  />
                  {errors.previewEndPage && (
                    <p className="mt-1 text-xs text-red-500">{errors.previewEndPage}</p>
                  )}
                  {!errors.previewEndPage && (
                    <p className="mt-1 text-xs text-[#1B2B4B]/40">
                      Readers can view pages 1 through this page before purchasing.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Cover Image Upload */}
            <div>
              <Label className="text-sm font-medium text-[#1B2B4B]">
                Cover Image {!isEdit && '*'}
              </Label>
              <div className="mt-1.5">
                {coverPreview ? (
                  <div className="relative inline-block">
                    <div className="relative h-48 w-32 overflow-hidden rounded-xl shadow-md">
                      <Image
                        src={coverPreview}
                        alt="Cover preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeCover}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#1B2B4B]/20 p-8 transition hover:border-[#C9A84C]/50 hover:bg-[#F8F5EF]">
                    <ImageIcon className="h-8 w-8 text-[#1B2B4B]/40" />
                    <p className="mt-2 text-sm text-[#1B2B4B]/60">
                      Click to upload cover image
                    </p>
                    <p className="text-xs text-[#1B2B4B]/40">JPG, PNG, WEBP (max 5MB)</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'cover')}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              {errors.cover && <p className="mt-1 text-xs text-red-500">{errors.cover}</p>}
            </div>

            {/* PDF Upload */}
            <div>
              <Label className="text-sm font-medium text-[#1B2B4B]">
                PDF File {!isEdit && '*'}
              </Label>
              <div className="mt-1.5">
                {pdfName ? (
                  <div className="flex items-center gap-3 rounded-xl border border-[#1B2B4B]/10 bg-[#F8F5EF] p-3">
                    <FileText className="h-5 w-5 text-[#C9A84C]" />
                    <span className="flex-1 truncate text-sm text-[#1B2B4B]">{pdfName}</span>
                    <button
                      type="button"
                      onClick={removePdf}
                      className="rounded-full p-1 text-red-500 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#1B2B4B]/20 p-6 transition hover:border-[#C9A84C]/50 hover:bg-[#F8F5EF]">
                    <Upload className="h-8 w-8 text-[#1B2B4B]/40" />
                    <p className="mt-2 text-sm text-[#1B2B4B]/60">
                      Click to upload PDF
                    </p>
                    <p className="text-xs text-[#1B2B4B]/40">PDF (max 50MB)</p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, 'pdf')}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              {errors.pdf && <p className="mt-1 text-xs text-red-500">{errors.pdf}</p>}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/books')}
                className="rounded-full border-[#1B2B4B]/15 px-6 text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-6 py-3 font-semibold text-[#04103A] shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEdit ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>{isEdit ? 'Update Book' : 'Create Book'}</>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}