'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Edit, ChevronRight, X, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAdminAssessments } from '../hooks/useAssessmentQueries';
import { useLandingContentAdmin, useUpdateLandingContent } from '../../hooks/useAssessmentLanding';
// import { useLandingContentAdmin, useUpdateLandingContent } from '../hooks/useAssessmentLanding';

// =========================================================
// HERO SECTION - Now 100% Backend Driven
// =========================================================
function HeroSection({ 
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
              className="rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-50"
            >
              <X className="mr-1 h-3.5 w-3.5" />
              Cancel
            </Button>
            <Button
              onClick={onSaveHero}
              disabled={isSaving}
              className="rounded-full bg-[#C9A84C] px-4 py-2 text-sm font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] shadow-lg shadow-[#C9A84C]/20 disabled:opacity-50"
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
            className="rounded-full bg-[#C9A84C] px-4 py-2 text-sm font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] shadow-lg shadow-[#C9A84C]/20"
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

// =========================================================
// ASSESSMENT CARD
// =========================================================
function AssessmentCard({ card, isEditing, onEdit, onOpenBuilder, onCardChange, onCancelEdit, onSaveEdit }) {
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
              className="rounded-full border border-white/15 bg-transparent px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
            >
              <X className="mr-1 h-3 w-3" />
              Cancel
            </Button>
            <Button
              onClick={onSaveEdit}
              className="rounded-full bg-[#C9A84C] px-3 py-1 text-xs font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] shadow-lg shadow-[#C9A84C]/20"
            >
              <Save className="mr-1 h-3 w-3" />
              Save
            </Button>
          </>
        ) : (
          <Button
            onClick={() => onEdit(card.id)}
            className="rounded-full bg-[#C9A84C] px-3 py-1 text-xs font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] shadow-lg shadow-[#C9A84C]/20"
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
            flex-1 rounded-full px-5 py-2 text-sm font-semibold shadow-lg transition-all duration-300
            ${isEditing
              ? 'bg-white/10 text-white/40 cursor-not-allowed'
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

// =========================================================
// MAIN COMPONENT
// =========================================================
export function AdminAssessmentLanding() {
  const router = useRouter();

  // =========================================================
  // STATE
  // =========================================================

  const [isEditingHero, setIsEditingHero] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);
  const [heroTempData, setHeroTempData] = useState(null);
  const [cardTempData, setCardTempData] = useState(null);

  // =========================================================
  // LOAD LANDING CONTENT FROM BACKEND
  // =========================================================
  const { 
    data: landingResponse, 
    isLoading: isLandingLoading, 
    error: landingError,
    refetch: refetchLanding,
  } = useLandingContentAdmin();

  const landing = landingResponse?.data || {};

  // =========================================================
  // UPDATE LANDING MUTATION
  // =========================================================
  const updateLandingMutation = useUpdateLandingContent();

  // =========================================================
  // LOAD ASSESSMENTS FROM BACKEND
  // =========================================================
  const { data: assessmentsResponse, isLoading: isAssessmentsLoading, error: assessmentsError } = useAdminAssessments();

  const assessments = assessmentsResponse?.data || [];
  const [cards, setCards] = useState([]);

  // Update cards when assessments change
  useEffect(() => {
    if (assessments.length > 0) {
      setCards(
        assessments.map((assessment) => ({
          id: assessment.slug,
          title: assessment.introduction?.badge || assessment.hero?.title || 'Untitled',
          subtitle: assessment.hero?.subtitle || assessment.introduction?.subtitle || '',
          slug: assessment.slug,
          status: assessment.status,
        }))
      );
    } else {
      setCards([]);
    }
  }, [assessments]);

  // =========================================================
  // HERO HANDLERS
  // =========================================================

  const handleEditHero = () => {
    setHeroTempData({ ...landing });
    setIsEditingHero(true);
  };

  const handleHeroChange = (field, value) => {
    setHeroTempData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancelHero = () => {
    setHeroTempData(null);
    setIsEditingHero(false);
  };

  const handleSaveHero = () => {
    if (!heroTempData || !landing._id) return;

    updateLandingMutation.mutate(
      {
        id: landing._id,
        data: heroTempData,
      },
      {
        onSuccess: () => {
          setIsEditingHero(false);
          setHeroTempData(null);
          refetchLanding();
        },
      }
    );
  };

  // =========================================================
  // CARD HANDLERS
  // =========================================================

  const handleEditCard = (cardId) => {
    const card = cards.find((c) => c.id === cardId);
    if (card) {
      setCardTempData({ ...card });
    }
    setEditingCardId(cardId);
  };

  const handleCardChange = (cardId, field, value) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, [field]: value } : card
      )
    );
  };

  const handleCancelEdit = () => {
    if (cardTempData) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === cardTempData.id ? { ...cardTempData } : card
        )
      );
    }
    setEditingCardId(null);
    setCardTempData(null);
  };

  const handleSaveEdit = () => {
    setEditingCardId(null);
    setCardTempData(null);
    const editedCard = cards.find((c) => c.id === cardTempData?.id);
    console.log('📦 Card saved:', editedCard);
  };

  const handleOpenBuilder = (slug) => {
    router.push(`/admin/assessments/${slug}/introduction`);
  };

  // =========================================================
  // RENDER
  // =========================================================

  const isLoading = isLandingLoading || isAssessmentsLoading;

  // Loading State
  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#1B2B4B] px-4 py-60 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-[#C9A84C] animate-spin" />
          <p className="text-white/70 text-lg">Loading...</p>
        </div>
      </section>
    );
  }

  // Error State
  if (landingError || assessmentsError) {
    return (
      <section className="min-h-screen bg-[#1B2B4B] px-4 py-60 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-2">Failed to load data</p>
          <p className="text-white/50 text-sm">
            {landingError?.message || assessmentsError?.message || 'Please try again later.'}
          </p>
        </div>
      </section>
    );
  }

  const isSaving = updateLandingMutation.isPending;

  return (
    <section className="min-h-screen bg-[#1B2B4B] px-4 py-60">
      <div className="mx-auto max-w-6xl">
        {/* Hero Section - 100% Backend Driven */}
        <HeroSection
          heroData={isEditingHero ? heroTempData : landing}
          isEditingHero={isEditingHero}
          isSaving={isSaving}
          onEditHero={handleEditHero}
          onHeroChange={handleHeroChange}
          onCancelHero={handleCancelHero}
          onSaveHero={handleSaveHero}
        />

        {/* Assessment Cards */}
        {cards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No assessments found.</p>
            <p className="text-white/40 text-sm mt-2">Create your first assessment to get started.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {cards.map((card) => (
              <AssessmentCard
                key={card.id}
                card={card}
                isEditing={editingCardId === card.id}
                onEdit={handleEditCard}
                onOpenBuilder={handleOpenBuilder}
                onCardChange={handleCardChange}
                onCancelEdit={handleCancelEdit}
                onSaveEdit={handleSaveEdit}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}