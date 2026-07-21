/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, X } from 'lucide-react';
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

const COUPON_TYPES = [
  { value: 'PERCENTAGE', label: 'Percentage (%)' },
  { value: 'FIXED_AMOUNT', label: 'Fixed Amount ($)' },
];

export function CouponForm({
  initialData = null,
  isEdit = false,
  onSubmit,
  isSubmitting = false,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    type: 'PERCENTAGE',
    value: '',
    minimumOrderAmount: '0',
    maximumDiscountAmount: '',
    usageLimit: '',
    perUserLimit: '1',
    validFrom: '',
    expiresAt: '',
    isActive: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || '',
        name: initialData.name || '',
        description: initialData.description || '',
        type: initialData.type || 'PERCENTAGE',
        value: initialData.value?.toString() || '',
        minimumOrderAmount: initialData.minimumOrderAmount?.toString() || '0',
        maximumDiscountAmount: initialData.maximumDiscountAmount?.toString() || '',
        usageLimit: initialData.usageLimit?.toString() || '',
        perUserLimit: initialData.perUserLimit?.toString() || '1',
        validFrom: initialData.validFrom ? new Date(initialData.validFrom).toISOString().slice(0, 16) : '',
        expiresAt: initialData.expiresAt ? new Date(initialData.expiresAt).toISOString().slice(0, 16) : '',
        isActive: initialData.isActive !== undefined ? initialData.isActive : true,
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = 'Coupon code is required';
    } else if (formData.code.length < 3) {
      newErrors.code = 'Code must be at least 3 characters';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Coupon name is required';
    }

    if (!formData.type) {
      newErrors.type = 'Coupon type is required';
    }

    if (!formData.value || isNaN(formData.value) || Number(formData.value) <= 0) {
      newErrors.value = 'Valid discount value is required';
    }

    if (formData.type === 'PERCENTAGE' && Number(formData.value) > 100) {
      newErrors.value = 'Percentage cannot exceed 100%';
    }

    if (!formData.expiresAt) {
      newErrors.expiresAt = 'Expiration date is required';
    }

    if (formData.expiresAt && new Date(formData.expiresAt) <= new Date()) {
      newErrors.expiresAt = 'Expiration date must be in the future';
    }

    if (formData.usageLimit && (isNaN(formData.usageLimit) || Number(formData.usageLimit) < 1)) {
      newErrors.usageLimit = 'Usage limit must be at least 1';
    }

    if (formData.perUserLimit && (isNaN(formData.perUserLimit) || Number(formData.perUserLimit) < 1)) {
      newErrors.perUserLimit = 'Per-user limit must be at least 1';
    }

    if (formData.minimumOrderAmount && (isNaN(formData.minimumOrderAmount) || Number(formData.minimumOrderAmount) < 0)) {
      newErrors.minimumOrderAmount = 'Minimum order amount cannot be negative';
    }

    if (formData.maximumDiscountAmount && (isNaN(formData.maximumDiscountAmount) || Number(formData.maximumDiscountAmount) < 0)) {
      newErrors.maximumDiscountAmount = 'Maximum discount amount cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = {
      ...formData,
      value: Number(formData.value),
      minimumOrderAmount: Number(formData.minimumOrderAmount) || 0,
      maximumDiscountAmount: formData.maximumDiscountAmount ? Number(formData.maximumDiscountAmount) : null,
      usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
      perUserLimit: Number(formData.perUserLimit) || 1,
      validFrom: formData.validFrom || undefined,
      expiresAt: formData.expiresAt,
      isActive: formData.isActive,
    };

    onSubmit(submitData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Code */}
            <div>
              <Label htmlFor="code" className="text-xs sm:text-sm font-medium text-[#1B2B4B]">
                Coupon Code *
              </Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
                placeholder="e.g., SUMMER20"
                className={cn(
                  'mt-1 sm:mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 uppercase text-sm sm:text-base',
                  errors.code && 'border-red-500 focus:border-red-500'
                )}
              />
              {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code}</p>}
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-xs sm:text-sm font-medium text-[#1B2B4B]">
                Coupon Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Summer Sale 2024"
                className={cn(
                  'mt-1 sm:mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 text-sm sm:text-base',
                  errors.name && 'border-red-500 focus:border-red-500'
                )}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-xs sm:text-sm font-medium text-[#1B2B4B]">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Brief description of this coupon"
                rows={2}
                className="mt-1 sm:mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 text-sm sm:text-base"
              />
            </div>

            {/* Type and Value */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <Label htmlFor="type" className="text-xs sm:text-sm font-medium text-[#1B2B4B]">
                  Discount Type *
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleChange('type', value)}
                >
                  <SelectTrigger className="mt-1 sm:mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUPON_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type}</p>}
              </div>
              <div>
                <Label htmlFor="value" className="text-xs sm:text-sm font-medium text-[#1B2B4B]">
                  {formData.type === 'PERCENTAGE' ? 'Discount (%)' : 'Discount Amount ($)'} *
                </Label>
                <Input
                  id="value"
                  type="number"
                  step={formData.type === 'PERCENTAGE' ? '1' : '0.01'}
                  min="0"
                  value={formData.value}
                  onChange={(e) => handleChange('value', e.target.value)}
                  placeholder={formData.type === 'PERCENTAGE' ? 'e.g., 20' : 'e.g., 10.00'}
                  className={cn(
                    'mt-1 sm:mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 text-sm sm:text-base',
                    errors.value && 'border-red-500 focus:border-red-500'
                  )}
                />
                {errors.value && <p className="mt-1 text-xs text-red-500">{errors.value}</p>}
              </div>
            </div>

            {/* Minimum and Maximum */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <Label htmlFor="minimumOrderAmount" className="text-xs sm:text-sm font-medium text-[#1B2B4B]">
                  Minimum Order Amount ($)
                </Label>
                <Input
                  id="minimumOrderAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.minimumOrderAmount}
                  onChange={(e) => handleChange('minimumOrderAmount', e.target.value)}
                  placeholder="e.g., 25.00"
                  className={cn(
                    'mt-1 sm:mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 text-sm sm:text-base',
                    errors.minimumOrderAmount && 'border-red-500 focus:border-red-500'
                  )}
                />
                {errors.minimumOrderAmount && <p className="mt-1 text-xs text-red-500">{errors.minimumOrderAmount}</p>}
              </div>
              <div>
                <Label htmlFor="maximumDiscountAmount" className="text-xs sm:text-sm font-medium text-[#1B2B4B]">
                  Maximum Discount ($)
                </Label>
                <Input
                  id="maximumDiscountAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.maximumDiscountAmount}
                  onChange={(e) => handleChange('maximumDiscountAmount', e.target.value)}
                  placeholder="e.g., 50.00"
                  className={cn(
                    'mt-1 sm:mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 text-sm sm:text-base',
                    errors.maximumDiscountAmount && 'border-red-500 focus:border-red-500'
                  )}
                />
                {errors.maximumDiscountAmount && <p className="mt-1 text-xs text-red-500">{errors.maximumDiscountAmount}</p>}
              </div>
            </div>

            {/* Usage Limits */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <Label htmlFor="usageLimit" className="text-xs sm:text-sm font-medium text-[#1B2B4B]">
                  Total Usage Limit
                </Label>
                <Input
                  id="usageLimit"
                  type="number"
                  min="1"
                  value={formData.usageLimit}
                  onChange={(e) => handleChange('usageLimit', e.target.value)}
                  placeholder="Leave empty for unlimited"
                  className={cn(
                    'mt-1 sm:mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 text-sm sm:text-base',
                    errors.usageLimit && 'border-red-500 focus:border-red-500'
                  )}
                />
                {errors.usageLimit && <p className="mt-1 text-xs text-red-500">{errors.usageLimit}</p>}
              </div>
              <div>
                <Label htmlFor="perUserLimit" className="text-xs sm:text-sm font-medium text-[#1B2B4B]">
                  Per-User Limit *
                </Label>
                <Input
                  id="perUserLimit"
                  type="number"
                  min="1"
                  value={formData.perUserLimit}
                  onChange={(e) => handleChange('perUserLimit', e.target.value)}
                  className={cn(
                    'mt-1 sm:mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 text-sm sm:text-base',
                    errors.perUserLimit && 'border-red-500 focus:border-red-500'
                  )}
                />
                {errors.perUserLimit && <p className="mt-1 text-xs text-red-500">{errors.perUserLimit}</p>}
              </div>
            </div>

            {/* Dates */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <Label htmlFor="validFrom" className="text-xs sm:text-sm font-medium text-[#1B2B4B]">
                  Valid From
                </Label>
                <Input
                  id="validFrom"
                  type="datetime-local"
                  value={formData.validFrom}
                  onChange={(e) => handleChange('validFrom', e.target.value)}
                  className="mt-1 sm:mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 text-sm sm:text-base"
                />
              </div>
              <div>
                <Label htmlFor="expiresAt" className="text-xs sm:text-sm font-medium text-[#1B2B4B]">
                  Expires At *
                </Label>
                <Input
                  id="expiresAt"
                  type="datetime-local"
                  value={formData.expiresAt}
                  onChange={(e) => handleChange('expiresAt', e.target.value)}
                  className={cn(
                    'mt-1 sm:mt-1.5 rounded-xl border-[#1B2B4B]/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 text-sm sm:text-base',
                    errors.expiresAt && 'border-red-500 focus:border-red-500'
                  )}
                />
                {errors.expiresAt && <p className="mt-1 text-xs text-red-500">{errors.expiresAt}</p>}
              </div>
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-2 sm:space-x-3 pt-1 sm:pt-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => handleChange('isActive', checked)}
                className="data-[state=checked]:bg-[#C9A84C]"
              />
              <Label htmlFor="isActive" className="text-xs sm:text-sm font-medium text-[#1B2B4B]">
                Active
              </Label>
            </div>

            {/* Actions */}
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-[#1B2B4B]/5">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/coupons')}
                className="rounded-full border-[#1B2B4B]/15 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30 w-full xs:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-[#04103A] shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                    {isEdit ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>{isEdit ? 'Update Coupon' : 'Create Coupon'}</>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}