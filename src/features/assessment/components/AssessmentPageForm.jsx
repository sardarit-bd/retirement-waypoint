/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
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

export function AssessmentPageForm({
  initialData = null,
  isEdit = false,
  assessmentTypes = [],
  isLoadingTypes = false,
  onSubmit,
  isSubmitting = false,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    assessmentTypeId: '',
    slug: '',
    title: '',
    subtitle: '',
    description: '',
    heroTitle: '',
    heroDescription: '',
    buttonText: 'Start Assessment',
    accentColor: '#C9A84C',
    displayOrder: 0,
    isPublished: false,
    seoTitle: '',
    seoDescription: '',
  });
  const [errors, setErrors] = useState({});
  const [slugGenerated, setSlugGenerated] = useState(false);

  // Load initial data for edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        assessmentTypeId: initialData.assessmentTypeId?._id || initialData.assessmentTypeId || '',
        slug: initialData.slug || '',
        title: initialData.title || '',
        subtitle: initialData.subtitle || '',
        description: initialData.description || '',
        heroTitle: initialData.heroTitle || '',
        heroDescription: initialData.heroDescription || '',
        buttonText: initialData.buttonText || 'Start Assessment',
        accentColor: initialData.accentColor || '#C9A84C',
        displayOrder: initialData.displayOrder || 0,
        isPublished: initialData.isPublished || false,
        seoTitle: initialData.seoTitle || '',
        seoDescription: initialData.seoDescription || '',
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }

    // Auto-generate slug from title
    if (field === 'title' && !slugGenerated && !isEdit) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  };

  const handleSlugChange = (value) => {
    const formattedSlug = value
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setFormData((prev) => ({ ...prev, slug: formattedSlug }));
    setSlugGenerated(true);
    if (errors.slug) {
      setErrors((prev) => ({ ...prev, slug: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.assessmentTypeId) {
      newErrors.assessmentTypeId = 'Assessment type is required';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = {
      ...formData,
      assessmentTypeId: formData.assessmentTypeId,
      displayOrder: Number(formData.displayOrder) || 0,
    };

    onSubmit(submitData);
  };

  // Check if assessment types are loading
  if (isLoadingTypes) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-[#C9A84C]" />
              <span className="text-[#1B2B4B]/60">Loading assessment types...</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Assessment Type */}
            <div>
              <Label htmlFor="assessmentTypeId" className="text-sm font-medium text-[#1B2B4B]">
                Assessment Type *
              </Label>
              <Select
                value={formData.assessmentTypeId || ""}
                onValueChange={(value) => handleChange('assessmentTypeId', value)}
              >
                <SelectTrigger
                  className={cn(
                    'mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20',
                    errors.assessmentTypeId && 'border-red-500 focus:border-red-500'
                  )}
                >
                  <SelectValue placeholder="Select assessment type" />
                </SelectTrigger>
                <SelectContent>
                  {assessmentTypes && assessmentTypes.length > 0 ? (
                    assessmentTypes.map((type) => (
                      <SelectItem key={type._id} value={type._id}>
                        {type.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-2 py-4 text-sm text-[#1B2B4B]/60 text-center">
                      No assessment types available
                    </div>
                  )}
                </SelectContent>
              </Select>
              {errors.assessmentTypeId && (
                <p className="mt-1 text-xs text-red-500">{errors.assessmentTypeId}</p>
              )}
              {assessmentTypes && assessmentTypes.length === 0 && !isLoadingTypes && (
                <p className="mt-1 text-xs text-[#1B2B4B]/40">
                  No assessment types found. Please create one first.
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-[#1B2B4B]">
                Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Retirement Readiness Assessment"
                className={cn(
                  'mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20',
                  errors.title && 'border-red-500 focus:border-red-500'
                )}
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            {/* Slug */}
            <div>
              <Label htmlFor="slug" className="text-sm font-medium text-[#1B2B4B]">
                Slug *
              </Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#1B2B4B]/40">
                  /assessment/
                </span>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="retirement-readiness"
                  className={cn(
                    'pl-28 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20',
                    errors.slug && 'border-red-500 focus:border-red-500'
                  )}
                />
              </div>
              {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug}</p>}
              <p className="mt-1 text-xs text-[#1B2B4B]/40">
                URL-friendly identifier. Use lowercase letters, numbers, and hyphens only.
              </p>
            </div>

            {/* Subtitle */}
            <div>
              <Label htmlFor="subtitle" className="text-sm font-medium text-[#1B2B4B]">
                Subtitle
              </Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                placeholder="A brief subtitle for the assessment"
                className="mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-[#1B2B4B]">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Detailed description of the assessment"
                rows={4}
                className={cn(
                  'mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 resize-none',
                  errors.description && 'border-red-500 focus:border-red-500'
                )}
              />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
              <p className="mt-1 text-xs text-[#1B2B4B]/40">
                Max 1000 characters
              </p>
            </div>

            {/* Hero Section */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="heroTitle" className="text-sm font-medium text-[#1B2B4B]">
                  Hero Title
                </Label>
                <Input
                  id="heroTitle"
                  value={formData.heroTitle}
                  onChange={(e) => handleChange('heroTitle', e.target.value)}
                  placeholder="Large hero title for the assessment landing page"
                  className="mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20"
                />
              </div>

              <div>
                <Label htmlFor="heroDescription" className="text-sm font-medium text-[#1B2B4B]">
                  Hero Description
                </Label>
                <Textarea
                  id="heroDescription"
                  value={formData.heroDescription}
                  onChange={(e) => handleChange('heroDescription', e.target.value)}
                  placeholder="Hero description for the assessment landing page"
                  rows={3}
                  className="mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 resize-none"
                />
              </div>

              <div>
                <Label htmlFor="buttonText" className="text-sm font-medium text-[#1B2B4B]">
                  Button Text
                </Label>
                <Input
                  id="buttonText"
                  value={formData.buttonText}
                  onChange={(e) => handleChange('buttonText', e.target.value)}
                  placeholder="Start Assessment"
                  className="mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20"
                />
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <Label htmlFor="accentColor" className="text-sm font-medium text-[#1B2B4B]">
                Accent Color
              </Label>
              <div className="flex items-center gap-3 mt-1.5">
                <input
                  type="color"
                  id="accentColor"
                  value={formData.accentColor}
                  onChange={(e) => handleChange('accentColor', e.target.value)}
                  className="h-10 w-14 rounded-lg border border-[#1B2B4B]/10 cursor-pointer"
                />
                <Input
                  value={formData.accentColor}
                  onChange={(e) => handleChange('accentColor', e.target.value)}
                  placeholder="#C9A84C"
                  className="flex-1 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20"
                />
              </div>
            </div>

            {/* Publish Status */}
            <div className="flex items-center space-x-3 pt-2">
              <Switch
                id="isPublished"
                checked={formData.isPublished}
                onCheckedChange={(checked) => handleChange('isPublished', checked)}
                className="data-[state=checked]:bg-[#C9A84C]"
              />
              <Label htmlFor="isPublished" className="text-sm font-medium text-[#1B2B4B]">
                Publish Assessment
              </Label>
            </div>

            {/* SEO Section */}
            <div className="space-y-4 pt-4 border-t border-[#1B2B4B]/5">
              <h3 className="text-sm font-semibold text-[#1B2B4B]">SEO Settings</h3>

              <div>
                <Label htmlFor="seoTitle" className="text-sm font-medium text-[#1B2B4B]">
                  SEO Title
                </Label>
                <Input
                  id="seoTitle"
                  value={formData.seoTitle}
                  onChange={(e) => handleChange('seoTitle', e.target.value)}
                  placeholder="SEO title for search engines"
                  className="mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20"
                />
              </div>

              <div>
                <Label htmlFor="seoDescription" className="text-sm font-medium text-[#1B2B4B]">
                  SEO Description
                </Label>
                <Textarea
                  id="seoDescription"
                  value={formData.seoDescription}
                  onChange={(e) => handleChange('seoDescription', e.target.value)}
                  placeholder="SEO description for search engines"
                  rows={2}
                  className="mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 resize-none"
                />
              </div>
            </div>

            {/* Display Order */}
            <div>
              <Label htmlFor="displayOrder" className="text-sm font-medium text-[#1B2B4B]">
                Display Order
              </Label>
              <Input
                id="displayOrder"
                type="number"
                min="0"
                value={formData.displayOrder}
                onChange={(e) => handleChange('displayOrder', e.target.value)}
                placeholder="0"
                className="mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20"
              />
              <p className="mt-1 text-xs text-[#1B2B4B]/40">
                Lower numbers appear first in lists
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-[#1B2B4B]/5">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/assessments')}
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
                  <>{isEdit ? 'Update Assessment' : 'Create Assessment'}</>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}