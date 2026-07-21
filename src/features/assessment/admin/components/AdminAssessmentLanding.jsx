/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, ChevronRight, X, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAdminAssessments } from '../hooks/useAssessmentQueries';
import { useLandingContentAdmin, useUpdateLandingContent } from '../../hooks/useAssessmentLanding';
import { AssessmentCard } from './AssessmentCard';
import { HeroSection } from './HeroSection';

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
    <section className="min-h-screen bg-[#1B2B4B] px-4 py-20 rounded-2xl">
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