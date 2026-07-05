'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Eye,
  Pencil,
  Copy,
  Archive,
  RefreshCw,
  Trash2,
  Calendar,
  FileText,
  Layers,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteAssessmentPage, useUpdateAssessmentPage } from '../hooks/useAssessment';

export function AdminAssessmentsTable({ assessments, isLoading }) {
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    pageId: null,
    pageTitle: '',
  });

  const deletePage = useDeleteAssessmentPage();
  const updatePage = useUpdateAssessmentPage();

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    return name.charAt(0).toUpperCase();
  };

  const handleDeleteClick = (page) => {
    setDeleteDialog({
      isOpen: true,
      pageId: page._id,
      pageTitle: page.title,
    });
  };

  const handleDeleteConfirm = () => {
    deletePage.mutate(deleteDialog.pageId, {
      onSuccess: () => {
        setDeleteDialog({ isOpen: false, pageId: null, pageTitle: '' });
      },
    });
  };

  const handleTogglePublish = (page) => {
    updatePage.mutate({
      pageId: page._id,
      data: { isPublished: !page.isPublished },
    });
  };

  if (isLoading) {
    return <AdminAssessmentsSkeleton />;
  }

  if (!assessments || assessments.length === 0) {
    return <AdminAssessmentsEmptyState />;
  }

  return (
    <>
      <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#1B2B4B]/5 hover:bg-transparent">
                <TableHead className="text-[#1B2B4B]/60 font-semibold">Assessment</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold">Type</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-center">Sections</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-center">Status</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold">Created</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((page, index) => {
                const typeName = page.assessmentTypeId?.name || 'Uncategorized';
                const typeInitial = getInitials(typeName);

                return (
                  <TableRow
                    key={page._id}
                    className="border-b border-[#1B2B4B]/5 hover:bg-[#F8F5EF]/50 transition-colors"
                  >
                    {/* Assessment */}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#1B2B4B]">{page.title}</span>
                        <span className="text-xs text-[#1B2B4B]/40 font-mono">
                          /{page.slug}
                        </span>
                        {page.subtitle && (
                          <span className="text-xs text-[#1B2B4B]/60 mt-0.5">{page.subtitle}</span>
                        )}
                      </div>
                    </TableCell>

                    {/* Type */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-[#C9A84C]/20 text-[#1B2B4B] text-[10px]">
                            {typeInitial}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-[#1B2B4B]/70">{typeName}</span>
                      </div>
                    </TableCell>

                    {/* Sections Count */}
                    <TableCell className="text-center">
                      <Badge variant="outline" className="border-[#1B2B4B]/10 text-[#1B2B4B]/60">
                        <Layers className="mr-1 h-3 w-3" />
                        {page.sections?.length || 0}
                      </Badge>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="text-center">
                      {page.isPublished ? (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Published
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                          <FileText className="mr-1 h-3 w-3" />
                          Draft
                        </Badge>
                      )}
                    </TableCell>

                    {/* Created */}
                    <TableCell>
                      <span className="text-sm text-[#1B2B4B]/60">
                        {formatDate(page.createdAt)}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* View */}
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 rounded-full p-0 hover:bg-[#F8F5EF]"
                        >
                          <Link href={`/admin/assessments/${page._id}`}>
                            <Eye className="h-4 w-4 text-[#1B2B4B]/60" />
                          </Link>
                        </Button>

                        {/* Edit */}
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 rounded-full p-0 hover:bg-[#F8F5EF]"
                        >
                          <Link href={`/admin/assessments/${page._id}/edit`}>
                            <Pencil className="h-4 w-4 text-[#1B2B4B]/60" />
                          </Link>
                        </Button>

                        {/* Toggle Publish */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTogglePublish(page)}
                          disabled={updatePage.isPending}
                          className={cn(
                            'h-8 w-8 rounded-full p-0',
                            page.isPublished
                              ? 'text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600'
                              : 'text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600'
                          )}
                        >
                          {page.isPublished ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>

                        {/* Delete */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(page)}
                          disabled={deletePage.isPending}
                          className="h-8 w-8 rounded-full p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteDialog({ isOpen: false, pageId: null, pageTitle: '' });
          }
        }}
      >
        <DialogContent className="max-w-md rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                <Trash2 className="h-7 w-7 text-red-500" />
              </div>
              <DialogTitle className="text-center text-xl font-bold text-[#1B2B4B]">
                Delete Assessment
              </DialogTitle>
              <DialogDescription className="text-center text-[#1B2B4B]/60">
                Are you sure you want to delete{' '}
                <strong className="text-[#1B2B4B]">{deleteDialog.pageTitle}</strong>?
                <br />
                <span className="text-sm text-red-500/70">This action cannot be undone.</span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button
                variant="outline"
                onClick={() => setDeleteDialog({ isOpen: false, pageId: null, pageTitle: '' })}
                className="rounded-full border-[#1B2B4B]/15 px-6 text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                disabled={deletePage.isPending}
                className="rounded-full bg-red-500 px-6 text-white hover:bg-red-600 disabled:opacity-70"
              >
                {deletePage.isPending ? 'Deleting...' : 'Delete Assessment'}
              </Button>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Skeleton Component
function AdminAssessmentsSkeleton() {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1B2B4B]/5">
              {[...Array(6)].map((_, i) => (
                <TableHead key={i}>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i} className="border-b border-[#1B2B4B]/5">
                {[...Array(6)].map((_, j) => (
                  <TableCell key={j}>
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Empty State Component
function AdminAssessmentsEmptyState() {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] p-12 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[#C9A84C]">
        <FileText className="h-7 w-7" />
      </div>
      <h2 className="text-xl font-semibold text-[#1B2B4B]">No assessments found</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#1B2B4B]/60">
        Try adjusting your search or filters to find the right assessments.
      </p>
    </div>
  );
}