/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
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
  useCreateQuestion,
  useUpdateQuestion,
  useDeleteQuestion,
  useCreateOption,
  useUpdateOption,
  useDeleteOption,
  useQuestionOptions,
} from '@/features/assessment/hooks/useAssessment';
import { cn } from '@/lib/utils';

const QUESTION_TYPES = [
  { value: 'single_choice', label: 'Single Choice' },
  { value: 'multiple_choice', label: 'Multiple Choice' },
  { value: 'yes_no', label: 'Yes / No' },
  { value: 'scale_1_to_5', label: 'Scale 1-5' },
  { value: 'text', label: 'Text (Short)' },
  { value: 'textarea', label: 'Text (Long)' },
];

const SCALE_OPTIONS = [
  { value: 1, label: '1 - Strongly Disagree' },
  { value: 2, label: '2 - Disagree' },
  { value: 3, label: '3 - Neutral' },
  { value: 4, label: '4 - Agree' },
  { value: 5, label: '5 - Strongly Agree' },
];

const YES_NO_OPTIONS = [
  { value: 'yes', label: 'Yes', score: 5 },
  { value: 'no', label: 'No', score: 1 },
];

export function QuestionsStep({ pageId, sectionId, section }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    type: 'single_choice',
    isRequired: true,
    displayOrder: 0,
  });
  const [options, setOptions] = useState([]);
  const [errors, setErrors] = useState({});

  const createQuestion = useCreateQuestion();
  const updateQuestion = useUpdateQuestion();
  const deleteQuestion = useDeleteQuestion();
  const createOption = useCreateOption();
  const updateOption = useUpdateOption();
  const deleteOption = useDeleteOption();

  // Fetch options when editing a question
  const { data: optionsData, refetch: refetchOptions } = useQuestionOptions(
    editingQuestion?._id,
    { enabled: !!editingQuestion?._id }
  );

  // Load options when editing
  useEffect(() => {
    if (editingQuestion && optionsData?.data) {
      setOptions(optionsData.data.map(opt => ({ ...opt, isNew: false })));
    }
  }, [editingQuestion, optionsData]);

  const getQuestions = () => {
    return section?.questions || [];
  };

  const questions = getQuestions();

  const handleOpenDialog = (question = null) => {
    if (question) {
      setEditingQuestion(question);
      setFormData({
        text: question.text || '',
        type: question.type || 'single_choice',
        isRequired: question.isRequired !== undefined ? question.isRequired : true,
        displayOrder: question.displayOrder || 0,
      });
      // Options will be loaded via useEffect
    } else {
      setEditingQuestion(null);
      setFormData({
        text: '',
        type: 'single_choice',
        isRequired: true,
        displayOrder: questions?.length || 0,
      });
      setOptions([]);
    }
    setErrors({});
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingQuestion(null);
    setFormData({
      text: '',
      type: 'single_choice',
      isRequired: true,
      displayOrder: 0,
    });
    setOptions([]);
    setErrors({});
  };

  const handleAddOption = () => {
    setOptions([...options, { label: '', value: options.length + 1, score: 0, isNew: true }]);
  };

  const handleRemoveOption = async (index) => {
    const option = options[index];
    if (option._id && !option.isNew) {
      await deleteOption.mutateAsync(option._id);
    }
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, field, value) => {
    const updated = [...options];
    updated[index] = { ...updated[index], [field]: value };
    setOptions(updated);
  };

  // Auto-set options for predefined types
  const handleTypeChange = (type) => {
    setFormData({ ...formData, type });
    
    if (type === 'yes_no') {
      setOptions(YES_NO_OPTIONS.map(opt => ({ ...opt, isNew: true })));
    } else if (type === 'scale_1_to_5') {
      setOptions(SCALE_OPTIONS.map(opt => ({ ...opt, isNew: true })));
    } else {
      setOptions([]);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.text.trim()) newErrors.text = 'Question text is required';
    
    if (formData.type === 'single_choice' || formData.type === 'multiple_choice') {
      if (options.length === 0) {
        newErrors.options = 'At least one option is required';
      }
      const invalidOptions = options.filter(opt => !opt.label.trim());
      if (invalidOptions.length > 0) {
        newErrors.options = 'All options must have a label';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const data = {
      ...formData,
      sectionId: sectionId,
      displayOrder: Number(formData.displayOrder) || 0,
    };

    try {
      let questionId;
      
      if (editingQuestion) {
        // Update question
        await updateQuestion.mutateAsync({ questionId: editingQuestion._id, data });
        questionId = editingQuestion._id;
      } else {
        // Create question
        const result = await createQuestion.mutateAsync(data);
        questionId = result.data?._id || result._id;
      }

      // Save options for choice questions
      if (questionId && (formData.type === 'single_choice' || formData.type === 'multiple_choice')) {
        for (const option of options) {
          if (option.isNew) {
            // Create new option
            await createOption.mutateAsync({
              questionId: questionId,
              label: option.label,
              value: option.value,
              score: option.score || 0,
              displayOrder: option.displayOrder || 0,
            });
          } else if (option._id) {
            // Update existing option
            await updateOption.mutateAsync({
              optionId: option._id,
              data: {
                label: option.label,
                value: option.value,
                score: option.score || 0,
                displayOrder: option.displayOrder || 0,
              },
            });
          }
        }
      }

      handleCloseDialog();
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  const handleDelete = (questionId) => {
    if (confirm('Are you sure you want to delete this question?')) {
      deleteQuestion.mutate(questionId);
    }
  };

  const getTypeLabel = (type) => {
    return QUESTION_TYPES.find(t => t.value === type)?.label || type;
  };

  const getOptionDisplay = (question) => {
    if (question.type === 'yes_no') return 'Yes/No';
    if (question.type === 'scale_1_to_5') return '1-5 Scale';
    return '';
  };

  if (!section) return null;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#1B2B4B]">Questions</span>
          <Badge variant="outline" className="text-xs">
            {questions.length}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleOpenDialog()}
          className="h-8 rounded-full px-3 text-[#C9A84C] hover:bg-[#C9A84C]/10"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Question
        </Button>
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
        <p className="text-sm text-[#1B2B4B]/40 text-center py-4">
          No questions in this section yet.
        </p>
      ) : (
        <div className="space-y-2">
          {questions.map((question, index) => (
            <div
              key={question._id}
              className="flex items-start gap-3 rounded-xl bg-[#F8F5EF] p-3 hover:bg-[#F8F5EF]/80 transition-colors"
            >
              <span className="text-xs font-medium text-[#1B2B4B]/40 min-w-[24px] mt-0.5">
                {index + 1}.
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1B2B4B]">{question.text}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-[10px]">
                    {getTypeLabel(question.type)}
                  </Badge>
                  {question.isRequired && (
                    <span className="text-[10px] text-[#1B2B4B]/40">Required</span>
                  )}
                  {question.type === 'yes_no' && (
                    <span className="text-[10px] text-[#1B2B4B]/40">Yes/No</span>
                  )}
                  {question.type === 'scale_1_to_5' && (
                    <span className="text-[10px] text-[#1B2B4B]/40">1-5 Scale</span>
                  )}
                  {question.type === 'single_choice' && (
                    <span className="text-[10px] text-[#1B2B4B]/40">Single Choice</span>
                  )}
                  {question.type === 'multiple_choice' && (
                    <span className="text-[10px] text-[#1B2B4B]/40">Multiple Choice</span>
                  )}
                  {question.type === 'text' && (
                    <span className="text-[10px] text-[#1B2B4B]/40">Short Text</span>
                  )}
                  {question.type === 'textarea' && (
                    <span className="text-[10px] text-[#1B2B4B]/40">Long Text</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenDialog(question)}
                  className="h-7 w-7 rounded-full p-0 hover:bg-[#F8F5EF]"
                >
                  <Pencil className="h-3.5 w-3.5 text-[#1B2B4B]/60" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(question._id)}
                  disabled={deleteQuestion.isPending}
                  className="h-7 w-7 rounded-full p-0 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Question Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl rounded-3xl border-white/20 bg-white/90 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#1B2B4B]">
              {editingQuestion ? 'Edit Question' : 'Add Question'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Question Text */}
            <div>
              <Label className="text-sm font-medium text-[#1B2B4B]">Question Text *</Label>
              <Textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="Enter the question text"
                rows={2}
                className={cn(
                  'mt-1.5 rounded-xl border-[#1B2B4B]/10 resize-none',
                  errors.text && 'border-red-500'
                )}
              />
              {errors.text && <p className="mt-1 text-xs text-red-500">{errors.text}</p>}
            </div>

            {/* Question Type */}
            <div>
              <Label className="text-sm font-medium text-[#1B2B4B]">Question Type</Label>
              <Select
                value={formData.type}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger className="mt-1.5 rounded-xl border-[#1B2B4B]/10">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {QUESTION_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Options for choice questions */}
            {(formData.type === 'single_choice' || formData.type === 'multiple_choice') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-[#1B2B4B]">Options *</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAddOption}
                    className="text-[#C9A84C] hover:bg-[#C9A84C]/10"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Option
                  </Button>
                </div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={option.label}
                        onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                        placeholder="Option label"
                        className="flex-1 rounded-xl border-[#1B2B4B]/10"
                      />
                      {formData.type === 'single_choice' && (
                        <Input
                          type="number"
                          value={option.score || 0}
                          onChange={(e) => handleOptionChange(index, 'score', parseInt(e.target.value) || 0)}
                          placeholder="Score"
                          className="w-20 rounded-xl border-[#1B2B4B]/10"
                        />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveOption(index)}
                        className="h-8 w-8 rounded-full p-0 text-red-500 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                {errors.options && <p className="text-xs text-red-500">{errors.options}</p>}
                {options.length === 0 && (
                  <p className="text-sm text-[#1B2B4B]/40 text-center py-2">
                    Add options for users to choose from.
                  </p>
                )}
              </div>
            )}

            {/* Required toggle */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={`isRequired-${editingQuestion?._id || 'new'}`}
                checked={formData.isRequired}
                onChange={(e) => setFormData({ ...formData, isRequired: e.target.checked })}
                className="h-4 w-4 rounded border-[#1B2B4B]/10 text-[#C9A84C] focus:ring-[#C9A84C]"
              />
              <Label htmlFor={`isRequired-${editingQuestion?._id || 'new'}`} className="text-sm font-medium text-[#1B2B4B]">
                Required question
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
              <p className="mt-1 text-xs text-[#1B2B4B]/40">Lower numbers appear first within the section</p>
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
              disabled={createQuestion.isPending || updateQuestion.isPending}
              className="rounded-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]"
            >
              {editingQuestion ? 'Update Question' : 'Add Question'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}