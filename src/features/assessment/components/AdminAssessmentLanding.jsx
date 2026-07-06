"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Edit, Copy, Trash2, Plus, Save, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const assessmentCards = [
  {
    id: "pre-retiree",
    title: "Pre-Retiree",
    subtitle: "Planning to retire in 3–5 years",
    description:
      "This assessment helps you understand your retirement readiness as you approach your transition from full-time work.",
    ctaText: "Start Assessment",
    slug: "pre-retiree",
    status: "Published",
    href: "/admin/assessments/pre-retiree/introduction",
  },
  {
    id: "recent-retiree",
    title: "Recent Retiree",
    subtitle: "Retired in the past 5 years",
    description:
      "This assessment helps you navigate the early years of retirement and build a fulfilling new chapter.",
    ctaText: "Start Assessment",
    slug: "recent-retiree",
    status: "Draft",
    href: "/admin/assessments/recent-retiree/introduction",
  },
  {
    id: "established-retiree",
    title: "Established Retiree",
    subtitle: "Retired 5 or more years",
    description:
      "This assessment helps you deepen your retirement experience and find continued purpose and growth.",
    ctaText: "Start Assessment",
    slug: "established-retiree",
    status: "Published",
    href: "/admin/assessments/established-retiree/introduction",
  },
];

// Hero Section Component with Edit Controls
function HeroSection({ isEditing, tempHero, setTempHero, onEdit, onSave, onCancel }) {
  return (
    <div className="relative mb-12">
      {isEditing ? (
        // Edit Mode
        <div className="rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white/60">Hero Section</h3>
              <div className="flex items-center gap-2">
                <Button
                  onClick={onCancel}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-white/15 text-white hover:bg-white/10"
                >
                  <X className="mr-1 h-3.5 w-3.5" />
                  Cancel
                </Button>
                <Button
                  onClick={onSave}
                  size="sm"
                  className="rounded-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]"
                >
                  <Save className="mr-1 h-3.5 w-3.5" />
                  Save
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-xs text-white/50">Title</Label>
              <Input
                value={tempHero.title}
                onChange={(e) => setTempHero({ ...tempHero, title: e.target.value })}
                className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] rounded-xl"
                placeholder="Choose Your Assessment"
              />
            </div>

            <div>
              <Label className="text-xs text-white/50">Subtitle</Label>
              <Input
                value={tempHero.subtitle}
                onChange={(e) => setTempHero({ ...tempHero, subtitle: e.target.value })}
                className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] rounded-xl"
                placeholder="Select the assessment that best matches..."
              />
            </div>

            <div>
              <Label className="text-xs text-white/50">Description</Label>
              <Textarea
                value={tempHero.description}
                onChange={(e) => setTempHero({ ...tempHero, description: e.target.value })}
                className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] rounded-xl resize-none"
                rows={3}
                placeholder="Each assessment draws on psychological research..."
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={tempHero.showBadge}
                  onCheckedChange={(checked) => setTempHero({ ...tempHero, showBadge: checked })}
                  className="data-[state=checked]:bg-[#C9A84C]"
                />
                <Label className="text-xs text-white/50">Show Badge</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={tempHero.showCreateButton}
                  onCheckedChange={(checked) => setTempHero({ ...tempHero, showCreateButton: checked })}
                  className="data-[state=checked]:bg-[#C9A84C]"
                />
                <Label className="text-xs text-white/50">Show Create Button</Label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // View Mode - Original Hero
        <div className="group relative">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C9A84C]">
              Retirement Waypoint
            </p>
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              {tempHero.title}
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-white/70">
              {tempHero.subtitle}
            </p>
            <p className="mx-auto mb-12 max-w-4xl text-base leading-relaxed text-white/70">
              {tempHero.description}
            </p>
          </div>

          {/* Edit Button - Floating on hover */}
          <div className="absolute -top-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={onEdit}
              variant="outline"
              size="sm"
              className="rounded-full border-white/15 text-white hover:bg-white/10"
            >
              <Edit className="mr-1 h-3.5 w-3.5" />
              Edit Hero
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Assessment Card Component
function AssessmentCard({ assessment, onEdit, onNext, onDuplicate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({
    title: assessment.title,
    subtitle: assessment.subtitle,
    description: assessment.description,
    ctaText: assessment.ctaText,
    slug: assessment.slug,
    status: assessment.status,
  });

  const handleSave = () => {
    onEdit(assessment.id, tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({
      title: assessment.title,
      subtitle: assessment.subtitle,
      description: assessment.description,
      ctaText: assessment.ctaText,
      slug: assessment.slug,
      status: assessment.status,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white/60">Edit Assessment</h3>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
                className="rounded-full border-white/15 text-white hover:bg-white/10"
              >
                <X className="mr-1 h-3.5 w-3.5" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                size="sm"
                className="rounded-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]"
              >
                <Save className="mr-1 h-3.5 w-3.5" />
                Save
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-xs text-white/50">Assessment Name</Label>
            <Input
              value={tempData.title}
              onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
              className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] rounded-xl"
            />
          </div>

          <div>
            <Label className="text-xs text-white/50">Subtitle</Label>
            <Input
              value={tempData.subtitle}
              onChange={(e) => setTempData({ ...tempData, subtitle: e.target.value })}
              className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] rounded-xl"
            />
          </div>

          <div>
            <Label className="text-xs text-white/50">Description</Label>
            <Textarea
              value={tempData.description}
              onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
              className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] rounded-xl resize-none"
              rows={2}
            />
          </div>

          <div>
            <Label className="text-xs text-white/50">CTA Text</Label>
            <Input
              value={tempData.ctaText}
              onChange={(e) => setTempData({ ...tempData, ctaText: e.target.value })}
              className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] rounded-xl"
            />
          </div>

          <div>
            <Label className="text-xs text-white/50">Slug</Label>
            <Input
              value={tempData.slug}
              onChange={(e) => setTempData({ ...tempData, slug: e.target.value })}
              className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] rounded-xl"
            />
          </div>

          <div>
            <Label className="text-xs text-white/50">Status</Label>
            <Select
              value={tempData.status}
              onValueChange={(value) => setTempData({ ...tempData, status: value })}
            >
              <SelectTrigger className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] rounded-xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group rounded-3xl border border-white/10 bg-white/10 p-7 text-left shadow-xl backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:bg-white/15"
    >
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            "inline-block rounded-full px-3 py-1 text-xs font-semibold",
            assessment.status === "Published"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-yellow-500/20 text-yellow-400"
          )}
        >
          {assessment.status}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-full bg-white/10 p-1.5 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDuplicate(assessment.id)}
            className="rounded-full bg-white/10 p-1.5 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(assessment.id)}
            className="rounded-full bg-white/10 p-1.5 text-white/60 hover:text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <h2 className="mb-2 text-2xl font-bold text-white">{assessment.title}</h2>
      <p className="mb-4 text-white/65">{assessment.subtitle}</p>

      {/* Next Button - Only navigation */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
        <span className="text-sm text-white/40">{assessment.slug}</span>7
        <Button
          onClick={() => onNext(assessment.href)}
          className="rounded-full bg-[#C9A84C] px-5 py-2 text-sm font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] shadow-lg shadow-[#C9A84C]/20 transition-all duration-300 hover:-translate-y-0.5"
        >
          <span>Open Builder</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

export function AdminAssessmentLanding() {
  const router = useRouter();
  const [assessments, setAssessments] = useState(assessmentCards);

  // Hero State
  const [isHeroEditing, setIsHeroEditing] = useState(false);
  const [heroData, setHeroData] = useState({
    title: "Choose Your Assessment",
    subtitle: "Select the assessment that best matches your current retirement stage.",
    description:
      "Each assessment draws on psychological research and includes reflection questions that will be analyzed alongside the assessment items to provide a complete and transparent measure of your current retirement readiness and overall status.",
    showBadge: true,
    showCreateButton: true,
  });
  const [tempHero, setTempHero] = useState(heroData);

  const handleHeroEdit = () => {
    setTempHero(heroData);
    setIsHeroEditing(true);
  };

  const handleHeroSave = () => {
    setHeroData(tempHero);
    setIsHeroEditing(false);
  };

  const handleHeroCancel = () => {
    setTempHero(heroData);
    setIsHeroEditing(false);
  };

  const handleCardEdit = (id, data) => {
    setAssessments(
      assessments.map((a) =>
        a.id === id
          ? {
              ...a,
              title: data.title,
              subtitle: data.subtitle,
              description: data.description,
              ctaText: data.ctaText,
              slug: data.slug,
              status: data.status,
            }
          : a
      )
    );
  };

  const handleDuplicate = (id) => {
    const original = assessments.find((a) => a.id === id);
    if (!original) return;
    const newId = `${original.id}-copy`;
    setAssessments([
      ...assessments,
      {
        ...original,
        id: newId,
        title: `${original.title} (Copy)`,
        slug: `${original.slug}-copy`,
        href: `/admin/assessments/${newId}/introduction`,
      },
    ]);
  };

  const handleDelete = (id) => {
    setAssessments(assessments.filter((a) => a.id !== id));
  };

  const handleNext = (href) => {
    router.push(href);
  };

  const handleCreate = () => {
    router.push("/admin/assessments/create");
  };

  return (
    <section className="min-h-screen bg-[#1B2B4B] px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Hero Section with Edit Controls */}
        <HeroSection
          isEditing={isHeroEditing}
          tempHero={tempHero}
          setTempHero={setTempHero}
          onEdit={handleHeroEdit}
          onSave={handleHeroSave}
          onCancel={handleHeroCancel}
        />

        {/* Create Button */}
        {heroData.showCreateButton && (
          <div className="flex justify-end mb-6">
            <Button
              onClick={handleCreate}
              className="rounded-full bg-[#C9A84C] px-6 py-3 font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] shadow-lg shadow-[#C9A84C]/20"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Assessment
            </Button>
          </div>
        )}

        {/* Assessment Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assessments.map((item) => (
            <AssessmentCard
              key={item.id}
              assessment={item}
              onEdit={handleCardEdit}
              onNext={handleNext}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
}