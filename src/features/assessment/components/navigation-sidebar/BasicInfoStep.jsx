/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BasicInfoStep({ page, onUpdate, onNext }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    heroTitle: '',
    heroDescription: '',
    buttonText: 'Start Assessment',
    accentColor: '#C9A84C',
    isPublished: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (page) {
      setFormData({
        title: page.title || '',
        subtitle: page.subtitle || '',
        description: page.description || '',
        heroTitle: page.heroTitle || '',
        heroDescription: page.heroDescription || '',
        buttonText: page.buttonText || 'Start Assessment',
        accentColor: page.accentColor || '#C9A84C',
        isPublished: page.isPublished || false,
      });
    }
  }, [page]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description cannot exceed 1000 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onUpdate(formData);
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-[#1B2B4B]">Basic Information</h2>
        <p className="text-sm text-[#1B2B4B]/60">
          Configure the assessment title, description, and appearance
        </p>
      </div>

      <div className="space-y-4">
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

        {/* Subtitle */}
        <div>
          <Label htmlFor="subtitle" className="text-sm font-medium text-[#1B2B4B]">
            Subtitle
          </Label>
          <Input
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            placeholder="A brief subtitle"
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
          <p className="mt-1 text-xs text-[#1B2B4B]/40">Max 1000 characters</p>
        </div>

        {/* Hero Section */}
        <div className="space-y-4 pt-4 border-t border-[#1B2B4B]/5">
          <h3 className="text-sm font-semibold text-[#1B2B4B]">Hero Section</h3>

          <div>
            <Label htmlFor="heroTitle" className="text-sm font-medium text-[#1B2B4B]">
              Hero Title
            </Label>
            <Input
              id="heroTitle"
              value={formData.heroTitle}
              onChange={(e) => handleChange('heroTitle', e.target.value)}
              placeholder="Large hero title for landing page"
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
              placeholder="Hero description for landing page"
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
        </div>

        {/* Publish Status */}
        <div className="flex items-center space-x-3 pt-4 border-t border-[#1B2B4B]/5">
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
      </div>

      <div className="flex justify-end pt-6 border-t border-[#1B2B4B]/5">
        <Button
          onClick={handleSubmit}
          className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-8 font-semibold text-[#04103A] shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
        >
          Save & Continue
        </Button>
      </div>
    </motion.div>
  );
}