// features/assessment/admin/components/AdminPreviewToggle.jsx
'use client';

import { motion } from 'framer-motion';
import { Eye, Edit3 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function AdminPreviewToggle({ isPreview, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        <Eye className={cn(
          'h-4 w-4 transition-colors',
          isPreview ? 'text-[#C9A84C]' : 'text-white/30'
        )} />
        <Label
          htmlFor="preview-toggle"
          className={cn(
            'text-sm font-medium cursor-pointer transition-colors',
            isPreview ? 'text-white' : 'text-white/40'
          )}
        >
          Preview
        </Label>
      </div>

      <Switch
        id="preview-toggle"
        checked={!isPreview}
        onCheckedChange={(checked) => onToggle(!checked)}
        className="data-[state=checked]:bg-[#C9A84C]"
      />

      <div className="flex items-center gap-2">
        <Edit3 className={cn(
          'h-4 w-4 transition-colors',
          !isPreview ? 'text-[#C9A84C]' : 'text-white/30'
        )} />
        <Label
          htmlFor="preview-toggle"
          className={cn(
            'text-sm font-medium cursor-pointer transition-colors',
            !isPreview ? 'text-white' : 'text-white/40'
          )}
        >
          Edit
        </Label>
      </div>
    </motion.div>
  );
}