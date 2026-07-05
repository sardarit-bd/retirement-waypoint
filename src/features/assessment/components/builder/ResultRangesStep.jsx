'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, ChevronDown, ChevronRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  useAdminResultRanges,
  useCreateResultRange,
  useUpdateResultRange,
  useDeleteResultRange,
} from '@/features/assessment/hooks/useAssessment';
import { cn } from '@/lib/utils';
import { RecommendationsStep } from './RecommendationsStep';

export function ResultRangesStep({ pageId }) {
  const [expandedRange, setExpandedRange] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRange, setEditingRange] = useState(null);
  const [formData, setFormData] = useState({
    minScore: 0,
    maxScore: 100,
    title: '',
    description: '',
    color: '#C9A84C',
    image: '',
    displayOrder: 0,
    isActive: true,
  });
  const [errors, setErrors] = useState({});

  const { data, isLoading } = useAdminResultRanges({ assessmentPageId: pageId });
  const createRange = useCreateResultRange();
  const updateRange = useUpdateResultRange();
  const deleteRange = useDeleteResultRange();

  const ranges = data?.data || [];

  const toggleRange = (rangeId) => {
    setExpandedRange(expandedRange === rangeId ? null : rangeId);
  };

  const handleOpenDialog = (range = null) => {
    if (range) {
      setEditingRange(range);
      setFormData({
        minScore: range.minScore || 0,
        maxScore: range.maxScore || 100,
        title: range.title || '',
        description: range.description || '',
        color: range.color || '#C9A84C',
        image: range.image || '',
        displayOrder: range.displayOrder || 0,
        isActive: range.isActive !== undefined ? range.isActive : true,
      });
    } else {
      setEditingRange(null);
      setFormData({
        minScore: ranges.length > 0 ? ranges[ranges.length - 1].maxScore + 1 : 0,
        maxScore: 100,
        title: '',
        description: '',
        color: '#C9A84C',
        image: '',
        displayOrder: ranges.length,
        isActive: true,
      });
    }
    setErrors({});
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingRange(null);
    setFormData({
      minScore: 0,
      maxScore: 100,
      title: '',
      description: '',
      color: '#C9A84C',
      image: '',
      displayOrder: 0,
      isActive: true,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (formData.minScore < 0 || formData.minScore > 100) {
      newErrors.minScore = 'Min score must be between 0 and 100';
    }
    if (formData.maxScore < 0 || formData.maxScore > 100) {
      newErrors.maxScore = 'Max score must be between 0 and 100';
    }
    if (formData.minScore > formData.maxScore) {
      newErrors.minScore = 'Min score cannot be greater than max score';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const data = {
      ...formData,
      assessmentPageId: pageId,
      minScore: Number(formData.minScore),
      maxScore: Number(formData.maxScore),
      displayOrder: Number(formData.displayOrder) || 0,
    };

    if (editingRange) {
      updateRange.mutate(
        { rangeId: editingRange._id, data },
        {
          onSuccess: handleCloseDialog,
        }
      );
    } else {
      createRange.mutate(data, {
        onSuccess: handleCloseDialog,
      });
    }
  };

  const handleDelete = (rangeId) => {
    if (confirm('Are you sure you want to delete this result range? All recommendations in this range will also be deleted.')) {
      deleteRange.mutate(rangeId);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-[#1B2B4B]/10 bg-white/50 p-4 animate-pulse">
            <div className="h-6 w-48 bg-gray-200 rounded" />
            <div className="mt-2 h-4 w-64 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1B2B4B]">Result Ranges</h2>
          <p className="text-sm text-[#1B2B4B]/60">
            Define score ranges and their corresponding results
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-4 font-semibold text-[#04103A] shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Result Range
        </Button>
      </div>

      {ranges.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-[#1B2B4B]/10 p-12 text-center">
          <Target className="mx-auto h-12 w-12 text-[#1B2B4B]/20" />
          <p className="mt-3 text-[#1B2B4B]/60">No result ranges yet.</p>
          <p className="text-sm text-[#1B2B4B]/40">Define score ranges to categorize assessment results.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {ranges.map((range) => {
            const isExpanded = expandedRange === range._id;

            return (
              <Card key={range._id} className="border-[#1B2B4B]/10 overflow-hidden transition-shadow hover:shadow-md">
                <CardContent className="p-0">
                  {/* Range Header */}
                  <div className="flex items-center gap-3 p-4 hover:bg-[#F8F5EF]/50 transition-colors">
                    <button
                      onClick={() => toggleRange(range._id)}
                      className="flex-1 flex items-center gap-3 min-w-0"
                    >
                      <div
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: range.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#1B2B4B]">{range.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {range.minScore} - {range.maxScore}%
                          </Badge>
                          {!range.isActive && (
                            <Badge variant="outline" className="text-xs text-[#1B2B4B]/40">
                              Inactive
                            </Badge>
                          )}
                        </div>
                        {range.description && (
                          <p className="text-sm text-[#1B2B4B]/60 truncate">{range.description}</p>
                        )}
                      </div>
                    </button>

                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDialog(range)}
                        className="h-8 w-8 rounded-full p-0 hover:bg-[#F8F5EF]"
                      >
                        <Pencil className="h-4 w-4 text-[#1B2B4B]/60" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(range._id)}
                        disabled={deleteRange.isPending}
                        className="h-8 w-8 rounded-full p-0 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5 text-[#1B2B4B]/40 ml-1" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-[#1B2B4B]/40 ml-1" />
                      )}
                    </div>
                  </div>

                  {/* Range Content - Recommendations */}
                  {isExpanded && (
                    <div className="border-t border-[#1B2B4B]/5 p-4">
                      <RecommendationsStep resultRangeId={range._id} />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add/Edit Result Range Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg rounded-3xl border-white/20 bg-white/90 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#1B2B4B]">
              {editingRange ? 'Edit Result Range' : 'Add Result Range'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Score Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-[#1B2B4B]">Min Score (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.minScore}
                  onChange={(e) => setFormData({ ...formData, minScore: parseInt(e.target.value) || 0 })}
                  className={cn(
                    'mt-1.5 rounded-xl border-[#1B2B4B]/10',
                    errors.minScore && 'border-red-500'
                  )}
                />
                {errors.minScore && <p className="mt-1 text-xs text-red-500">{errors.minScore}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium text-[#1B2B4B]">Max Score (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.maxScore}
                  onChange={(e) => setFormData({ ...formData, maxScore: parseInt(e.target.value) || 100 })}
                  className={cn(
                    'mt-1.5 rounded-xl border-[#1B2B4B]/10',
                    errors.maxScore && 'border-red-500'
                  )}
                />
                {errors.maxScore && <p className="mt-1 text-xs text-red-500">{errors.maxScore}</p>}
              </div>
            </div>

            {/* Title */}
            <div>
              <Label className="text-sm font-medium text-[#1B2B4B]">Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Ready for Retirement"
                className={cn(
                  'mt-1.5 rounded-xl border-[#1B2B4B]/10',
                  errors.title && 'border-red-500'
                )}
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm font-medium text-[#1B2B4B]">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this result category"
                rows={2}
                className="mt-1.5 rounded-xl border-[#1B2B4B]/10 resize-none"
              />
            </div>

            {/* Color */}
            <div>
              <Label className="text-sm font-medium text-[#1B2B4B]">Color</Label>
              <div className="flex items-center gap-3 mt-1.5">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="h-10 w-14 rounded-lg border border-[#1B2B4B]/10 cursor-pointer"
                />
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="#C9A84C"
                  className="flex-1 rounded-xl border-[#1B2B4B]/10"
                />
              </div>
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 rounded border-[#1B2B4B]/10 text-[#C9A84C] focus:ring-[#C9A84C]"
              />
              <Label htmlFor="isActive" className="text-sm font-medium text-[#1B2B4B]">
                Active
              </Label>
            </div>

            {/* Display Order */}
            <div>
              <Label className="text-sm font-medium text-[#1B2B4B]">Display Order</Label>
              <Input
                type="number"
                min="0"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                placeholder="0"
                className="mt-1.5 rounded-xl border-[#1B2B4B]/10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCloseDialog}
              className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={createRange.isPending || updateRange.isPending}
              className="rounded-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]"
            >
              {editingRange ? 'Update Range' : 'Add Range'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}