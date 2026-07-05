// features/assessment/components/builder/RecommendationsStep.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, GripVertical, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  useRecommendations,
  useCreateRecommendation,
  useUpdateRecommendation,
  useDeleteRecommendation,
} from '@/features/assessment/hooks/useAssessment';
import { cn } from '@/lib/utils';

const PRIORITY_OPTIONS = [
  { value: 1, label: '⭐ Priority 1 (Highest)' },
  { value: 2, label: '⭐ Priority 2' },
  { value: 3, label: '⭐ Priority 3' },
  { value: 4, label: '⭐ Priority 4' },
  { value: 5, label: '⭐ Priority 5 (Lowest)' },
];

export function RecommendationsStep({ resultRangeId }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecommendation, setEditingRecommendation] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 1,
    bookIds: [],
    resourceLinks: [],
    ctaText: 'Learn More',
    ctaLink: '',
    displayOrder: 0,
    isActive: true,
  });
  const [bookInput, setBookInput] = useState('');
  const [resourceInput, setResourceInput] = useState('');
  const [errors, setErrors] = useState({});

  const { data, isLoading } = useRecommendations(resultRangeId);
  const createRecommendation = useCreateRecommendation();
  const updateRecommendation = useUpdateRecommendation();
  const deleteRecommendation = useDeleteRecommendation();

  const recommendations = data?.data || [];

  const handleOpenDialog = (recommendation = null) => {
    if (recommendation) {
      setEditingRecommendation(recommendation);
      setFormData({
        title: recommendation.title || '',
        description: recommendation.description || '',
        priority: recommendation.priority || 1,
        bookIds: recommendation.bookIds || [],
        resourceLinks: recommendation.resourceLinks || [],
        ctaText: recommendation.ctaText || 'Learn More',
        ctaLink: recommendation.ctaLink || '',
        displayOrder: recommendation.displayOrder || 0,
        isActive: recommendation.isActive !== undefined ? recommendation.isActive : true,
      });
    } else {
      setEditingRecommendation(null);
      setFormData({
        title: '',
        description: '',
        priority: 1,
        bookIds: [],
        resourceLinks: [],
        ctaText: 'Learn More',
        ctaLink: '',
        displayOrder: recommendations.length,
        isActive: true,
      });
    }
    setBookInput('');
    setResourceInput('');
    setErrors({});
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingRecommendation(null);
    setFormData({
      title: '',
      description: '',
      priority: 1,
      bookIds: [],
      resourceLinks: [],
      ctaText: 'Learn More',
      ctaLink: '',
      displayOrder: 0,
      isActive: true,
    });
    setBookInput('');
    setResourceInput('');
    setErrors({});
  };

  const handleAddBook = () => {
    if (bookInput.trim() && !formData.bookIds.includes(bookInput.trim())) {
      setFormData({
        ...formData,
        bookIds: [...formData.bookIds, bookInput.trim()],
      });
      setBookInput('');
    }
  };

  const handleRemoveBook = (bookId) => {
    setFormData({
      ...formData,
      bookIds: formData.bookIds.filter((id) => id !== bookId),
    });
  };

  const handleAddResource = () => {
    if (resourceInput.trim() && !formData.resourceLinks.includes(resourceInput.trim())) {
      try {
        new URL(resourceInput.trim());
        setFormData({
          ...formData,
          resourceLinks: [...formData.resourceLinks, resourceInput.trim()],
        });
        setResourceInput('');
      } catch {
        setErrors({ ...errors, resourceLink: 'Please enter a valid URL' });
      }
    }
  };

  const handleRemoveResource = (resource) => {
    setFormData({
      ...formData,
      resourceLinks: formData.resourceLinks.filter((link) => link !== resource),
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.ctaLink && !formData.ctaLink.startsWith('http')) {
      newErrors.ctaLink = 'Please enter a valid URL starting with http:// or https://';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const data = {
      ...formData,
      resultRangeId: resultRangeId,
      displayOrder: Number(formData.displayOrder) || 0,
      priority: Number(formData.priority) || 1,
    };

    if (editingRecommendation) {
      updateRecommendation.mutate(
        { recommendationId: editingRecommendation._id, data },
        {
          onSuccess: handleCloseDialog,
        }
      );
    } else {
      createRecommendation.mutate(data, {
        onSuccess: handleCloseDialog,
      });
    }
  };

  const handleDelete = (recommendationId) => {
    if (confirm('Are you sure you want to delete this recommendation?')) {
      deleteRecommendation.mutate(recommendationId);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-xl border border-[#1B2B4B]/10 bg-white/50 p-3 animate-pulse">
            <div className="h-5 w-32 bg-gray-200 rounded" />
            <div className="mt-2 h-4 w-48 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#1B2B4B]">Recommendations</span>
          <Badge variant="outline" className="text-xs">
            {recommendations.length}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleOpenDialog()}
          className="h-8 rounded-full px-3 text-[#C9A84C] hover:bg-[#C9A84C]/10"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Recommendation
        </Button>
      </div>

      {/* Recommendations List */}
      {recommendations.length === 0 ? (
        <p className="text-sm text-[#1B2B4B]/40 text-center py-2">
          No recommendations for this result range yet.
        </p>
      ) : (
        <div className="space-y-2">
          {recommendations.map((rec) => (
            <div
              key={rec._id}
              className="flex items-start gap-3 rounded-xl bg-[#F8F5EF] p-3 hover:bg-[#F8F5EF]/80 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#1B2B4B]">{rec.title}</span>
                  <Badge variant="outline" className="text-[10px]">
                    Priority {rec.priority}
                  </Badge>
                  {!rec.isActive && (
                    <Badge variant="outline" className="text-[10px] text-[#1B2B4B]/40">
                      Inactive
                    </Badge>
                  )}
                </div>
                {rec.description && (
                  <p className="text-sm text-[#1B2B4B]/60 truncate">{rec.description}</p>
                )}
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {rec.bookIds?.length > 0 && (
                    <span className="text-xs text-[#1B2B4B]/40">
                      📚 {rec.bookIds.length} book{rec.bookIds.length !== 1 ? 's' : ''}
                    </span>
                  )}
                  {rec.resourceLinks?.length > 0 && (
                    <span className="text-xs text-[#1B2B4B]/40">
                      🔗 {rec.resourceLinks.length} resource{rec.resourceLinks.length !== 1 ? 's' : ''}
                    </span>
                  )}
                  {rec.ctaText && (
                    <span className="text-xs text-[#C9A84C]">{rec.ctaText}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenDialog(rec)}
                  className="h-7 w-7 rounded-full p-0 hover:bg-[#F8F5EF]"
                >
                  <Pencil className="h-3.5 w-3.5 text-[#1B2B4B]/60" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(rec._id)}
                  disabled={deleteRecommendation.isPending}
                  className="h-7 w-7 rounded-full p-0 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Recommendation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl rounded-3xl border-white/20 bg-white/90 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#1B2B4B]">
              {editingRecommendation ? 'Edit Recommendation' : 'Add Recommendation'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Title */}
            <div>
              <Label className="text-sm font-medium text-[#1B2B4B]">Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Recommended Next Steps"
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
                placeholder="Detailed recommendation description"
                rows={3}
                className="mt-1.5 rounded-xl border-[#1B2B4B]/10 resize-none"
              />
            </div>

            {/* Priority */}
            <div>
              <Label className="text-sm font-medium text-[#1B2B4B]">Priority</Label>
              <Select
                value={String(formData.priority)}
                onValueChange={(value) => setFormData({ ...formData, priority: parseInt(value) })}
              >
                <SelectTrigger className="mt-1.5 rounded-xl border-[#1B2B4B]/10">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Recommended Books */}
            <div>
              <Label className="text-sm font-medium text-[#1B2B4B]">Recommended Books</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={bookInput}
                  onChange={(e) => setBookInput(e.target.value)}
                  placeholder="Enter book ID"
                  className="flex-1 rounded-xl border-[#1B2B4B]/10"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddBook}
                  className="rounded-xl border-[#1B2B4B]/10"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.bookIds.map((bookId) => (
                  <Badge
                    key={bookId}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {bookId}
                    <button
                      onClick={() => handleRemoveBook(bookId)}
                      className="text-[#1B2B4B]/40 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <p className="mt-1 text-xs text-[#1B2B4B]/40">
                Enter book IDs (from the Books module) to recommend
              </p>
            </div>

            {/* Resource Links */}
            <div>
              <Label className="text-sm font-medium text-[#1B2B4B]">Resource Links</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={resourceInput}
                  onChange={(e) => setResourceInput(e.target.value)}
                  placeholder="https://..."
                  className={cn(
                    'flex-1 rounded-xl border-[#1B2B4B]/10',
                    errors.resourceLink && 'border-red-500'
                  )}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddResource}
                  className="rounded-xl border-[#1B2B4B]/10"
                >
                  Add
                </Button>
              </div>
              {errors.resourceLink && <p className="mt-1 text-xs text-red-500">{errors.resourceLink}</p>}
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.resourceLinks.map((link) => (
                  <Badge
                    key={link}
                    variant="secondary"
                    className="flex items-center gap-1 max-w-[200px]"
                  >
                    <span className="truncate">{link}</span>
                    <button
                      onClick={() => handleRemoveResource(link)}
                      className="text-[#1B2B4B]/40 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-[#1B2B4B]">CTA Text</Label>
                <Input
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  placeholder="Learn More"
                  className="mt-1.5 rounded-xl border-[#1B2B4B]/10"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-[#1B2B4B]">CTA Link</Label>
                <Input
                  value={formData.ctaLink}
                  onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  placeholder="https://..."
                  className={cn(
                    'mt-1.5 rounded-xl border-[#1B2B4B]/10',
                    errors.ctaLink && 'border-red-500'
                  )}
                />
                {errors.ctaLink && <p className="mt-1 text-xs text-red-500">{errors.ctaLink}</p>}
              </div>
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isActive-rec"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 rounded border-[#1B2B4B]/10 text-[#C9A84C] focus:ring-[#C9A84C]"
              />
              <Label htmlFor="isActive-rec" className="text-sm font-medium text-[#1B2B4B]">
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
              disabled={createRecommendation.isPending || updateRecommendation.isPending}
              className="rounded-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]"
            >
              {editingRecommendation ? 'Update Recommendation' : 'Add Recommendation'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}