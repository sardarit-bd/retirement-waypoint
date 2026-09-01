/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import {
  Save,
  Loader2,
  LayoutTemplate,
  Phone,
  Send,
  RotateCcw,
  ExternalLink,
  Columns2,
  PanelLeft,
  Eye,
  Mail,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContactCmsAdmin, useUpdateContactCms } from '../hooks/useContactCms';
import { ContactCmsLivePreview } from './ContactCmsLivePreview';

export function AdminContactCms() {
  const { data: response, isLoading, refetch } = useContactCmsAdmin();
  const updateMutation = useUpdateContactCms();

  const cmsData = response?.data;
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState('header');
  const [layoutMode, setLayoutMode] = useState('split'); // 'split' | 'edit' | 'preview'

  // Initialize local form state when backend data loads
  useEffect(() => {
    if (cmsData) {
      setFormData(JSON.parse(JSON.stringify(cmsData)));
    }
  }, [cmsData]);

  if (isLoading || !formData) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#C9A84C]" />
        <p className="text-sm font-medium text-[#1B2B4B]/70">Loading Contact Page CMS content...</p>
      </div>
    );
  }

  // Handle nested field changes with deep immutability
  const handleNestedFieldChange = (sectionKey, fieldKey, value) => {
    setFormData((prev) => ({
      ...prev,
      [sectionKey]: {
        ...(prev?.[sectionKey] || {}),
        [fieldKey]: value,
      },
    }));
  };

  // Save all changes
  const handleSave = () => {
    if (!formData) return;

    const { _id, __v, createdAt, updatedAt, ...cleanData } = formData;

    updateMutation.mutate(
      {
        id: _id,
        data: cleanData,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  // Reset to server data
  const handleReset = () => {
    if (cmsData) {
      setFormData(JSON.parse(JSON.stringify(cmsData)));
      toast.success('Form reset to saved content');
    }
  };

  const tabsConfig = [
    { id: 'header', label: 'Header & Banner', icon: LayoutTemplate },
    { id: 'contactInfo', label: 'Contact Info & Promo Card', icon: Phone },
    { id: 'formInfo', label: 'Form Settings', icon: Send },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-[#1B2B4B]/10">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#1B2B4B] sm:text-3xl">
              Contact Page CMS
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#C9A84C]/15 px-3 py-1 text-xs font-bold text-[#8C6D1F]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              Live Editor
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#1B2B4B]/60">
            Manage contact page headlines, email address, phone number, assessment card, and form text.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Layout Mode Toggles */}
          <div className="hidden md:flex items-center rounded-xl bg-[#F8F5EF] p-1 border border-[#1B2B4B]/10">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setLayoutMode('split')}
              className={`h-8 px-2.5 text-xs font-semibold rounded-lg cursor-pointer ${
                layoutMode === 'split'
                  ? 'bg-white text-[#1B2B4B] shadow-sm'
                  : 'text-[#1B2B4B]/60 hover:text-[#1B2B4B]'
              }`}
              title="Split View"
            >
              <Columns2 className="mr-1.5 h-3.5 w-3.5 text-[#C9A84C]" />
              Split View
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setLayoutMode('edit')}
              className={`h-8 px-2.5 text-xs font-semibold rounded-lg cursor-pointer ${
                layoutMode === 'edit'
                  ? 'bg-white text-[#1B2B4B] shadow-sm'
                  : 'text-[#1B2B4B]/60 hover:text-[#1B2B4B]'
              }`}
              title="Editor Only"
            >
              <PanelLeft className="mr-1.5 h-3.5 w-3.5 text-[#1B2B4B]" />
              Editor Only
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setLayoutMode('preview')}
              className={`h-8 px-2.5 text-xs font-semibold rounded-lg cursor-pointer ${
                layoutMode === 'preview'
                  ? 'bg-white text-[#1B2B4B] shadow-sm'
                  : 'text-[#1B2B4B]/60 hover:text-[#1B2B4B]'
              }`}
              title="Preview Only"
            >
              <Eye className="mr-1.5 h-3.5 w-3.5 text-[#1B2B4B]" />
              Preview Only
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={updateMutation.isPending}
            className="border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] cursor-pointer h-9 px-3 text-xs sm:text-sm font-semibold"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reset
          </Button>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] h-9 px-3 text-xs sm:text-sm font-semibold"
          >
            <Link href="/contact" target="_blank" rel="noreferrer">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              Live Site
            </Link>
          </Button>

          <Button
            size="sm"
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] font-bold shadow-md cursor-pointer disabled:cursor-not-allowed h-9 px-4 text-xs sm:text-sm"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-1.5 h-3.5 w-3.5" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="w-full bg-white p-2 rounded-2xl shadow-sm border border-[#1B2B4B]/10 overflow-x-auto">
          <TabsList className="flex h-auto w-max sm:w-full flex-wrap gap-1.5 bg-transparent p-0">
            {tabsConfig.map(({ id, label, icon: Icon }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="flex-1 min-w-[150px] px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer data-[state=active]:bg-[#1B2B4B] data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-[#F8F5EF]"
              >
                <Icon className="mr-2 h-4 w-4 text-[#C9A84C]" />
                <span className="truncate">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Editor */}
          {(layoutMode === 'split' || layoutMode === 'edit') && (
            <div
              className={`space-y-6 transition-all duration-300 ${
                layoutMode === 'split' ? 'lg:col-span-6 xl:col-span-5' : 'lg:col-span-12'
              }`}
            >
              {/* 1. HEADER & BANNER TAB */}
              <TabsContent value="header" className="m-0 space-y-6">
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Hero Header Banner</CardTitle>
                    <CardDescription>
                      Top pill badge, main page headline, and introductory paragraph.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Badge Text</Label>
                        <Input
                          value={formData.header?.badge || ''}
                          onChange={(e) => handleNestedFieldChange('header', 'badge', e.target.value)}
                          placeholder="Contact Retirement Waypoint"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Main Headline</Label>
                        <Input
                          value={formData.header?.title || ''}
                          onChange={(e) => handleNestedFieldChange('header', 'title', e.target.value)}
                          placeholder="Let’s Start The Conversation"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Subtitle Description</Label>
                      <Textarea
                        rows={3}
                        value={formData.header?.subtitle || ''}
                        onChange={(e) => handleNestedFieldChange('header', 'subtitle', e.target.value)}
                        placeholder="Have questions about assessments, books, or retirement..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 2. CONTACT INFO & PROMO CARD TAB */}
              <TabsContent value="contactInfo" className="m-0 space-y-6">
                {/* Contact Information Details */}
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Contact Information Details</CardTitle>
                    <CardDescription>
                      Direct email address and phone number displayed on the left panel.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Panel Title</Label>
                        <Input
                          value={formData.contactInfo?.sectionTitle || ''}
                          onChange={(e) =>
                            handleNestedFieldChange('contactInfo', 'sectionTitle', e.target.value)
                          }
                          placeholder="Contact Information"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Panel Subtitle</Label>
                        <Input
                          value={formData.contactInfo?.sectionSubtitle || ''}
                          onChange={(e) =>
                            handleNestedFieldChange('contactInfo', 'sectionSubtitle', e.target.value)
                          }
                          placeholder="Reach out for questions, support..."
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-[#C9A84C]" />
                          <Label className="text-xs font-bold text-[#1B2B4B]">Email Address</Label>
                        </div>
                        <Input
                          value={formData.contactInfo?.email || ''}
                          onChange={(e) =>
                            handleNestedFieldChange('contactInfo', 'email', e.target.value)
                          }
                          placeholder="dave@retirementwaypoint.com"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-[#C9A84C]" />
                          <Label className="text-xs font-bold text-[#1B2B4B]">Phone Number</Label>
                        </div>
                        <Input
                          value={formData.contactInfo?.phone || ''}
                          onChange={(e) =>
                            handleNestedFieldChange('contactInfo', 'phone', e.target.value)
                          }
                          placeholder="+1 (760) 960-0162"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Assessment Promo Card */}
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Assessment Promo Card</CardTitle>
                    <CardDescription>
                      The dark promo box at the bottom of the left column.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Card Title</Label>
                      <Input
                        value={formData.promoCard?.title || ''}
                        onChange={(e) =>
                          handleNestedFieldChange('promoCard', 'title', e.target.value)
                        }
                        placeholder="Not Sure Where To Start?"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Description</Label>
                      <Textarea
                        rows={2}
                        value={formData.promoCard?.description || ''}
                        onChange={(e) =>
                          handleNestedFieldChange('promoCard', 'description', e.target.value)
                        }
                        placeholder="Take the retirement readiness assessment..."
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Button Text</Label>
                        <Input
                          value={formData.promoCard?.buttonText || ''}
                          onChange={(e) =>
                            handleNestedFieldChange('promoCard', 'buttonText', e.target.value)
                          }
                          placeholder="Take Assessment"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Button Link</Label>
                        <Input
                          value={formData.promoCard?.buttonLink || ''}
                          onChange={(e) =>
                            handleNestedFieldChange('promoCard', 'buttonLink', e.target.value)
                          }
                          placeholder="/assessment"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 3. FORM SETTINGS TAB */}
              <TabsContent value="formInfo" className="m-0 space-y-6">
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Message Form Labels</CardTitle>
                    <CardDescription>
                      Headings and submit button text on the message contact form.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Form Heading</Label>
                      <Input
                        value={formData.formInfo?.formTitle || ''}
                        onChange={(e) =>
                          handleNestedFieldChange('formInfo', 'formTitle', e.target.value)
                        }
                        placeholder="Send A Message"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Form Subtitle</Label>
                      <Textarea
                        rows={2}
                        value={formData.formInfo?.formSubtitle || ''}
                        onChange={(e) =>
                          handleNestedFieldChange('formInfo', 'formSubtitle', e.target.value)
                        }
                        placeholder="Fill out the form below and we’ll respond as soon as possible."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Submit Button Text</Label>
                      <Input
                        value={formData.formInfo?.submitButtonText || ''}
                        onChange={(e) =>
                          handleNestedFieldChange('formInfo', 'submitButtonText', e.target.value)
                        }
                        placeholder="Send Message"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          )}

          {/* Right Column: Live Mockup Preview */}
          {(layoutMode === 'split' || layoutMode === 'preview') && (
            <div
              className={`sticky top-24 transition-all duration-300 ${
                layoutMode === 'split' ? 'lg:col-span-6 xl:col-span-7' : 'lg:col-span-12'
              }`}
            >
              <ContactCmsLivePreview formData={formData} activeTab={activeTab} />
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}

export default AdminContactCms;
