'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Save, X, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export function AdminReflectionBlock({ domain, isPreviewMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [reflection, setReflection] = useState(domain.openQuestion || '');
  const [tempReflection, setTempReflection] = useState(reflection);

  const handleEdit = () => {
    setTempReflection(reflection);
    setIsEditing(true);
  };

  const handleSave = () => {
    setReflection(tempReflection);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempReflection(reflection);
    setIsEditing(false);
  };

  if (isPreviewMode) {
    return (
      <div className="mt-7 rounded-2xl border border-white/10 bg-white/10 p-5">
        <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/40">
          Reflection Question
        </label>
        <p className="mb-3 text-sm italic leading-7 text-white/70">{reflection}</p>
        <textarea
          className="min-h-[110px] w-full resize-y rounded-xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/35 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
          placeholder="Share your thoughts here..."
          value=""
          readOnly
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mt-7 rounded-2xl border border-white/10 bg-white/10 p-5"
    >
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">
          Reflection Question
        </label>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="h-7 rounded-full px-2 text-white/40 hover:text-white hover:bg-white/10"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="h-7 rounded-full px-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
            >
              <Save className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-7 rounded-full px-2 text-white/40 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {isEditing ? (
        <Textarea
          value={tempReflection}
          onChange={(e) => setTempReflection(e.target.value)}
          className="mb-3 min-h-[110px] w-full resize-y rounded-xl border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20"
          placeholder="Enter reflection question..."
        />
      ) : (
        <p className="mb-3 text-sm italic leading-7 text-white/70">{reflection}</p>
      )}

      <textarea
        className="min-h-[110px] w-full resize-y rounded-xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/35 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
        placeholder="Share your thoughts here..."
        value=""
        readOnly
      />
    </motion.div>
  );
}