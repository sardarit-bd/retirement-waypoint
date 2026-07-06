'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Copy, Trash2, ChevronUp, ChevronDown, GripVertical, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const scaleOptions = [
  { label: 'Strongly agree', value: 5 },
  { label: 'Agree', value: 4 },
  { label: 'Neutral', value: 3 },
  { label: 'Disagree', value: 2 },
  { label: 'Strongly disagree', value: 1 },
];

export function AdminQuestionBlock({
  question,
  index,
  isPreviewMode,
  onMoveUp,
  onMoveDown,
  onDelete,
  onDuplicate,
  isFirst,
  isLast,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(question.text);
  const [options, setOptions] = useState(question.options || []);

  const handleAddOption = () => {
    setOptions([
      ...options,
      { id: `opt${Date.now()}`, label: 'New option', value: options.length + 1 },
    ]);
  };

  const handleOptionChange = (index, field, value) => {
    const updated = [...options];
    updated[index] = { ...updated[index], [field]: value };
    setOptions(updated);
  };

  const handleDeleteOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  if (isPreviewMode) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border-b border-white/10 pb-7"
      >
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/40">
          Item {index + 1}
        </p>

        <p className="mb-4 text-base leading-7 text-white/85">{question.text}</p>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
          {scaleOptions.map((option) => (
            <button
              key={option.value}
              className="cursor-pointer rounded-xl border border-white/12 bg-white/8 px-3 py-3 text-xs font-semibold leading-snug text-white/65 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15"
            >
              {option.label}
            </button>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative border-b border-white/10 pb-7"
    >
      {/* Question Controls */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold uppercase tracking-[0.12em] text-white/40">
            Item {index + 1}
          </span>
          <Badge variant="outline" className="text-[10px] text-white/40 border-white/10">
            {question.type === 'single_choice' ? 'Single Choice' : 'Multiple Choice'}
          </Badge>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 rounded-full p-0 text-white/40 hover:text-white hover:bg-white/10"
          >
            <GripVertical className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="h-7 w-7 rounded-full p-0 text-white/40 hover:text-white hover:bg-white/10"
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDuplicate}
            className="h-7 w-7 rounded-full p-0 text-white/40 hover:text-white hover:bg-white/10"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveUp}
            disabled={isFirst}
            className="h-7 w-7 rounded-full p-0 text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-20"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveDown}
            disabled={isLast}
            className="h-7 w-7 rounded-full p-0 text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-20"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-7 w-7 rounded-full p-0 text-red-400/40 hover:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Question Text */}
      {isEditing ? (
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mb-4 border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl"
        />
      ) : (
        <p className="mb-4 text-base leading-7 text-white/85">{question.text}</p>
      )}

      {/* Options */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
        {options.map((option, optIndex) => (
          <div key={option.id} className="relative group/option">
            <button
              className="w-full cursor-pointer rounded-xl border border-white/12 bg-white/8 px-3 py-3 text-xs font-semibold leading-snug text-white/65 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15"
            >
              {isEditing ? (
                <Input
                  value={option.label}
                  onChange={(e) => handleOptionChange(optIndex, 'label', e.target.value)}
                  className="border-0 bg-transparent text-white text-xs p-0 h-auto focus:ring-0"
                />
              ) : (
                option.label
              )}
            </button>
            {isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteOption(optIndex)}
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 opacity-0 group-hover/option:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Add Option Button (Edit Mode) */}
      {isEditing && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddOption}
          className="mt-3 rounded-full border-white/15 text-white/60 hover:bg-white/10 hover:text-white"
        >
          <Plus className="mr-1 h-3.5 w-3.5" />
          Add Option
        </Button>
      )}
    </motion.div>
  );
}