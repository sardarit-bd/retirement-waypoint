'use client';

import { cn } from '@/lib/utils';
import {
  FileText,
  Users,
  Heart,
  Handshake,
  Sparkles,
  BookOpen,
  Target,
  Award,
} from 'lucide-react';

const defaultItems = [
  { id: 'introduction', label: 'Introduction', icon: FileText },
  { id: 'results', label: 'Results', icon: Award },
  { id: 'recommendations', label: 'Recommendations', icon: Target },
];

const domainIcons = {
  'identity': Users,
  'engagement': Heart,
  'connection': Handshake,
  'growth': Sparkles,
  'meaning': BookOpen,
};

export function AdminBuilderSidebar({ domains, selectedItem, onItemClick }) {
  // Build sidebar items from domains
  const domainItems = domains.map((domain) => ({
    id: domain.id,
    label: domain.label,
    icon: domainIcons[domain.id] || FileText,
    isDomain: true,
  }));

  const allItems = [...defaultItems, ...domainItems];

  return (
    <div className="w-56 shrink-0">
      <div className="sticky top-24 space-y-1">
        {allItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedItem === item.id;
          const isDomain = item.isDomain;

          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                'w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 text-left',
                isActive
                  ? 'bg-[#C9A84C]/10 text-[#C9A84C] shadow-sm'
                  : isDomain
                  ? 'text-white/60 hover:bg-white/5 hover:text-white/80'
                  : 'text-white/60 hover:bg-white/5 hover:text-white/80'
              )}
            >
              <div
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  isActive
                    ? 'bg-[#C9A84C] text-[#1B2B4B]'
                    : 'bg-white/5 text-white/40'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span className="flex-1 truncate">{item.label}</span>
              {isActive && (
                <div className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}