import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Loader2, Save, X } from "lucide-react";

export function HeroSection({ 
    heroData, 
    isEditingHero, 
    onEditHero, 
    onHeroChange, 
    onCancelHero, 
    onSaveHero,
    isSaving 
  }) {
    return (
      <div className="relative">
        <div className="flex justify-end mb-4 gap-2">
          {isEditingHero ? (
            <>
              <Button
                onClick={onCancelHero}
                disabled={isSaving}
                className="rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-50 cursor-pointer"
              >
                <X className="mr-1 h-3.5 w-3.5" />
                Cancel
              </Button>
              <Button
                onClick={onSaveHero}
                disabled={isSaving}
                className="rounded-full bg-[#C9A84C] px-4 py-2 text-sm font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] shadow-lg shadow-[#C9A84C]/20 disabled:opacity-50 cursor-pointer"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-1 h-3.5 w-3.5" />
                    Save Changes
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button
              onClick={onEditHero}
              className="rounded-full bg-[#C9A84C] px-4 py-2 text-sm font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] shadow-lg shadow-[#C9A84C]/20 cursor-pointer"
            >
              <Edit className="mr-1 h-3.5 w-3.5" />
              Edit Hero
            </Button>
          )}
        </div>
  
        <div className="text-center border-b border-white/10 pb-12 mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C9A84C]">
            {heroData.badge || 'Retirement Waypoint'}
          </p>
  
          {isEditingHero ? (
            <>
              <div className="mb-4 max-w-2xl mx-auto">
                <Input
                  value={heroData.title || ''}
                  onChange={(e) => onHeroChange('title', e.target.value)}
                  className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-center text-4xl font-bold"
                  placeholder="Enter hero title"
                />
              </div>
              <div className="mb-4 max-w-2xl mx-auto">
                <Input
                  value={heroData.subtitle || ''}
                  onChange={(e) => onHeroChange('subtitle', e.target.value)}
                  className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-center text-white/70"
                  placeholder="Enter hero subtitle"
                />
              </div>
              <div className="mx-auto max-w-4xl">
                <Textarea
                  value={heroData.description || ''}
                  onChange={(e) => onHeroChange('description', e.target.value)}
                  className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl resize-none text-center text-base leading-relaxed"
                  rows={3}
                  placeholder="Enter hero description"
                />
              </div>
            </>
          ) : (
            <>
              <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                {heroData.title || 'Choose Your Assessment'}
              </h1>
              <p className="mx-auto mb-4 max-w-2xl text-white/70">
                {heroData.subtitle || ''}
              </p>
              <p className="mx-auto mb-12 max-w-4xl text-base leading-relaxed text-white/70">
                {heroData.description || ''}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }