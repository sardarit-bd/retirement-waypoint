import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Edit, Save, X } from "lucide-react";
import { motion } from 'framer-motion';

export function AssessmentCard({ card, isEditing, onEdit, onOpenBuilder, onCardChange, onCancelEdit, onSaveEdit }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl border border-white/10 bg-white/10 p-7 text-left shadow-xl backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:bg-white/15"
      >
        <div className="flex justify-end mb-2 gap-2">
          {isEditing ? (
            <>
              <Button
                onClick={onCancelEdit}
                className="rounded-full border border-white/15 bg-transparent px-3 py-1 text-xs font-semibold text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="mr-1 h-3 w-3" />
                Cancel
              </Button>
              <Button
                onClick={onSaveEdit}
                className="rounded-full bg-[#C9A84C] px-3 py-1 text-xs font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] shadow-lg shadow-[#C9A84C]/20 cursor-pointer"
              >
                <Save className="mr-1 h-3 w-3" />
                Save
              </Button>
            </>
          ) : (
            <Button
              onClick={() => onEdit(card.id)}
              className="rounded-full bg-[#C9A84C] px-3 py-1 text-xs font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] shadow-lg shadow-[#C9A84C]/20 cursor-pointer"
            >
              <Edit className="mr-1 h-3 w-3" />
              Edit
            </Button>
          )}
        </div>
  
        {isEditing ? (
          <>
            <div className="mb-2">
              <Input
                value={card.title}
                onChange={(e) => onCardChange(card.id, 'title', e.target.value)}
                className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-2xl font-bold"
                placeholder="Assessment title"
              />
            </div>
            <div className="mb-6">
              <Input
                value={card.subtitle}
                onChange={(e) => onCardChange(card.id, 'subtitle', e.target.value)}
                className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-white/65"
                placeholder="Assessment subtitle"
              />
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-3 text-2xl font-bold text-white">{card.title}</h2>
            <p className="mb-6 text-white/65">{card.subtitle}</p>
          </>
        )}
  
        <div className="flex items-center gap-3">
          <Button
            onClick={() => onOpenBuilder(card.slug)}
            disabled={isEditing}
            className={`
              flex-1 rounded-full px-5 py-2 text-sm font-semibold shadow-lg transition-all duration-300 cursor-pointer
              ${isEditing
                ? 'bg-white/10 text-white/40 cursor-not-allowed '
                : 'bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] hover:-translate-y-0.5'
              }
            `}
          >
            <span>Open Builder</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    );
  }