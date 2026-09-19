/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import {
  Lock,
  Loader2,
  ShoppingCart,
  AlertCircle,
  Settings,
  ZoomIn,
  ZoomOut,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Set worker source for pdf.js (same approach as the full PDFViewer)
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

/**
 * PreviewPageItem
 *
 * Renders an individual sample page canvas with high-DPI crispness,
 * anti-theft controls, and a diagonal "SAMPLE PREVIEW" watermark overlay.
 */
function PreviewPageItem({
  pageNumber,
  pdfDoc,
  registerPageRef,
  onPageRendered,
}) {
  const canvasRef = useRef(null);
  const [isRendered, setIsRendered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!pdfDoc) return;
    let cancelled = false;

    const render = async () => {
      try {
        const page = await pdfDoc.getPage(pageNumber);
        if (cancelled) return;

        // Render at a high-DPI base scale (1.5) for sharpness across all zoom levels
        const RENDER_BASE_SCALE = 1.5;
        const viewport = page.getViewport({ scale: RENDER_BASE_SCALE });
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const normalWidth = viewport.width / RENDER_BASE_SCALE;
        const normalHeight = viewport.height / RENDER_BASE_SCALE;

        setDimensions({
          width: normalWidth,
          height: normalHeight,
        });

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        if (!cancelled) {
          setIsRendered(true);
          if (onPageRendered) {
            onPageRendered(pageNumber, normalWidth, normalHeight);
          }
        }
      } catch (err) {
        console.error(`Error rendering preview page ${pageNumber}:`, err);
      }
    };

    render();
    return () => {
      cancelled = true;
    };
  }, [pdfDoc, pageNumber, onPageRendered]);

  return (
    <div
      ref={(el) => registerPageRef(pageNumber, el)}
      data-page-number={pageNumber}
      className="relative shadow-md rounded-lg overflow-hidden bg-white border border-[#1B2B4B]/10 mx-auto select-none"
      style={{
        width: dimensions.width ? `${dimensions.width}px` : "auto",
        maxWidth: "100%",
      }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <canvas
        ref={canvasRef}
        className="block rounded-lg pointer-events-none"
        style={{
          width: dimensions.width ? `${dimensions.width}px` : "100%",
          height: dimensions.height ? `${dimensions.height}px` : "auto",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      />

      {/* Anti-Theft Diagonal Watermark Overlay */}
      {/* <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center select-none opacity-10 rotate-[-30deg]">
        <span className="text-3xl sm:text-5xl md:text-6xl font-black tracking-widest text-slate-900">
          SAMPLE PREVIEW
        </span>
      </div> */}

      {/* Loading Skeleton/Spinner before canvas renders */}
      {!isRendered && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-slate-100/70 min-h-[400px]">
          <Loader2 className="h-6 w-6 animate-spin text-[#C9A84C]" />
          <span className="text-xs text-[#1B2B4B]/50 font-medium">
            Loading Page {pageNumber}...
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * BookPreviewModal
 *
 * Renders a continuous vertical scrolling, zoomable preview of a book's sample PDF.
 * Features:
 * - Continuous scroll across all preview pages (space-y-6)
 * - Dynamic "Viewing Page X of Y" counter updated via scroll/intersection tracking
 * - Synchronized zoom scaling across the entire stacked pages wrapper
 * - Anti-theft protections (no direct download URLs, right-click & drag disabled, watermark)
 * - Friendly end-of-preview Call to Action divider card & modal footer checkout button
 */
export function BookPreviewModal({
  open,
  onOpenChange,
  previewUrl,
  bookTitle,
  bookId,
  isAdmin = false,
  onBuyNow,
  isPurchasing = false,
}) {
  const router = useRouter();
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [numPages, setNumPages] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [maxPageWidth, setMaxPageWidth] = useState(600);
  const [approxTotalHeight, setApproxTotalHeight] = useState(0);

  // Zoom state management
  const [scale, setScale] = useState(1);
  const handleZoomIn = () =>
    setScale((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 2));
  const handleZoomOut = () =>
    setScale((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.6));
  const handleResetZoom = () => setScale(1);

  const [pdfDoc, setPdfDoc] = useState(null);
  const containerRef = useRef(null);
  const stackedWrapperRef = useRef(null);
  const pageElementsRef = useRef(new Map());

  const registerPageRef = useCallback((pageNumber, element) => {
    if (element) {
      pageElementsRef.current.set(pageNumber, element);
    } else {
      pageElementsRef.current.delete(pageNumber);
    }
  }, []);

  const handlePageRendered = useCallback((pageNum, width, height) => {
    setMaxPageWidth((prev) => Math.max(prev, width));
    setApproxTotalHeight((prev) => prev + height + 24); // include gap
  }, []);

  // Load the (already page-limited) preview PDF whenever the modal opens
  useEffect(() => {
    if (!open || !previewUrl) {
      if (!open) {
        setScale(1);
        setActivePage(1);
        setPdfDoc(null);
      }
      return;
    }

    let cancelled = false;
    let loadedPdf = null;
    setStatus("loading");
    setNumPages(0);
    setActivePage(1);
    setScale(1);
    setApproxTotalHeight(0);
    setPdfDoc(null);
    pageElementsRef.current.clear();

    const load = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url: previewUrl });
        const pdf = await loadingTask.promise;
        if (cancelled) {
          if (pdf?.cleanup) pdf.cleanup();
          if (pdf?.destroy) pdf.destroy();
          return;
        }

        loadedPdf = pdf;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setStatus("ready");
      } catch (error) {
        console.error("Failed to load book preview:", error);
        if (!cancelled) setStatus("error");
      }
    };

    load();

    return () => {
      cancelled = true;
      if (loadedPdf) {
        if (typeof loadedPdf.cleanup === "function") {
          loadedPdf.cleanup();
        }
        if (typeof loadedPdf.destroy === "function") {
          loadedPdf.destroy();
        }
      }
      setPdfDoc(null);
    };
  }, [open, previewUrl]);

  // Scroll detection to update the active page counter dynamically
  const handleScroll = useCallback(() => {
    if (!containerRef.current || pageElementsRef.current.size === 0) return;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    // Use an offset target line 30% from the top of the scroll container
    const targetY = containerRect.top + containerRect.height * 0.3;

    let currentVisible = 1;
    let minDistance = Infinity;

    pageElementsRef.current.forEach((el, pageNum) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // If the target line passes through this page
      if (rect.top <= targetY && rect.bottom >= targetY) {
        currentVisible = pageNum;
        minDistance = 0;
      } else if (minDistance !== 0) {
        const dist = Math.min(
          Math.abs(rect.top - targetY),
          Math.abs(rect.bottom - targetY),
        );
        if (dist < minDistance) {
          minDistance = dist;
          currentVisible = pageNum;
        }
      }
    });

    setActivePage(currentVisible);
  }, []);

  // IntersectionObserver for additional precision when scrolling
  useEffect(() => {
    if (status !== "ready" || numPages === 0 || !containerRef.current) return;
    const container = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Sort by distance to the top of the container
          visible.sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - container.getBoundingClientRect().top) -
              Math.abs(b.boundingClientRect.top - container.getBoundingClientRect().top),
          );
          const pageNum = Number(
            visible[0].target.getAttribute("data-page-number"),
          );
          if (pageNum) {
            setActivePage(pageNum);
          }
        }
      },
      {
        root: container,
        threshold: [0.15, 0.4, 0.7],
        rootMargin: "-5% 0px -40% 0px",
      },
    );

    pageElementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [status, numPages]);

  // Keyboard shortcuts for zoom
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target?.tagName)) return;

      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        handleResetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleCheckoutClick = () => {
    if (onBuyNow) {
      onBuyNow();
    } else {
      onOpenChange(false);
      router.push("/checkout");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="flex h-[88vh] w-[calc(100%-2rem)] max-w-4xl! flex-col gap-0 overflow-hidden rounded-2xl bg-[#F8F5EF] p-0 sm:max-w-4xl! shadow-2xl border border-[#1B2B4B]/10"
      >
        {/* Modal Header & Styled Read-Only Counter + Zoom Toolbar */}
        <DialogHeader className="border-b border-[#1B2B4B]/10 bg-white/95 px-5 py-3.5 backdrop-blur-md sm:px-6">
          <div className="flex items-center justify-between gap-2 pr-8">
            <div>
              <DialogTitle className="text-base font-bold text-[#1B2B4B] sm:text-lg flex items-center gap-2">
                <span>Book Preview</span>
                {bookTitle && (
                  <span className="hidden sm:inline font-normal text-xs text-[#1B2B4B]/60 truncate max-w-[280px]">
                    — {bookTitle}
                  </span>
                )}
              </DialogTitle>
              <DialogDescription className="text-xs text-[#1B2B4B]/60 line-clamp-1">
                Scroll vertically to preview sample pages.
              </DialogDescription>
            </div>
          </div>

          {/* Styled Dynamic Page Counter & Zoom Toolbar */}
          {status === "ready" && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1B2B4B]/10 mt-1">
              {/* Dynamic Page Counter on Scroll */}
              <div className="flex items-center gap-1.5 bg-slate-100/90 rounded-lg px-3 py-1 border border-slate-200/80 shadow-2xs">
                <span className="text-xs font-semibold text-[#1B2B4B] select-none tracking-tight">
                  Viewing Page {activePage} of {numPages || 1}
                </span>
              </div>

              {/* Styled Zoom Toolbar */}
              <div className="flex items-center gap-1 bg-slate-100/90 rounded-lg p-1 border border-slate-200/80 shadow-2xs">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={scale <= 0.6}
                  className="h-7 w-7 p-0 rounded-md text-[#1B2B4B] hover:bg-white hover:text-[#1B2B4B] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer font-bold text-sm"
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                  <span className="sr-only">Zoom Out</span>
                </Button>

                <button
                  type="button"
                  onClick={handleResetZoom}
                  title="Click to reset zoom to 100%"
                  className="px-2 py-0.5 text-xs font-semibold text-[#1B2B4B] bg-white rounded-md border border-slate-200/80 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer min-w-[48px] text-center"
                >
                  {Math.round(scale * 100)}%
                </button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={scale >= 2}
                  className="h-7 w-7 p-0 rounded-md text-[#1B2B4B] hover:bg-white hover:text-[#1B2B4B] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer font-bold text-sm"
                  title="Zoom In (+)"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                  <span className="sr-only">Zoom In</span>
                </Button>
              </div>
            </div>
          )}
        </DialogHeader>

        {/* Scroll Container with continuous vertical scrolling */}
        <div className="flex-1 overflow-hidden p-2 sm:p-4 flex flex-col justify-center">
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center gap-3 py-24">
              <Loader2 className="h-8 w-8 animate-spin text-[#C9A84C]" />
              <p className="text-sm font-medium text-[#1B2B4B]/60">
                Loading sample preview pages...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <p className="font-semibold text-red-600">Preview unavailable</p>
              <p className="max-w-xs text-sm text-[#1B2B4B]/60">
                We couldn&apos;t load the book preview at this time. Please try
                again shortly.
              </p>
            </div>
          )}

          {status === "ready" && (
            <div
              ref={containerRef}
              onScroll={handleScroll}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              style={{ userSelect: "none", WebkitUserSelect: "none" }}
              className="overflow-y-auto overflow-x-auto max-h-[72vh] custom-scrollbar p-3 sm:p-5 bg-slate-100/80 rounded-xl select-none relative"
            >
              {/* Outer sizing envelope to guarantee smooth, unclipped vertical and horizontal scrolling across all zoom levels */}
              <div
                style={{
                  width: scale > 1 ? `${maxPageWidth * scale}px` : "100%",
                  minHeight:
                    approxTotalHeight && scale > 1
                      ? `${approxTotalHeight * scale}px`
                      : "auto",
                  transition: "width 0.15s ease-out, min-height 0.15s ease-out",
                  margin: "0 auto",
                }}
                className="flex flex-col items-center"
              >
                {/* Synchronized Zoom Scaled Stack Wrapper */}
                <div
                  ref={stackedWrapperRef}
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "top center",
                    transition: "transform 0.15s ease-out",
                  }}
                  className="w-full flex flex-col items-center space-y-6"
                >
                  {/* Stacked Preview Pages */}
                  {Array.from({ length: numPages }).map((_, index) => (
                    <PreviewPageItem
                      key={index + 1}
                      pageNumber={index + 1}
                      pdfDoc={pdfDoc}
                      registerPageRef={registerPageRef}
                      onPageRendered={handlePageRendered}
                    />
                  ))}

                  {/* End-of-Preview Call to Action Divider Card */}
                  <div className="w-full max-w-xl mx-auto my-6 rounded-2xl border border-[#C9A84C]/40 bg-gradient-to-b from-white to-[#FDFBF7] p-6 sm:p-8 text-center shadow-md">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A84C]/15 text-[#C9A84C]">
                      <Lock className="h-6 w-6 text-[#C9A84C]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1B2B4B]">
                      You&apos;ve reached the end of the sample preview.
                    </h3>
                    <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-[#1B2B4B]/70 leading-relaxed">
                      {isAdmin
                        ? "As an administrator, you can manage and edit this book in your Admin Dashboard."
                        : `Continue reading all chapters and access exclusive resources in the full edition of ${bookTitle ? `"${bookTitle}"` : "this book"
                        }.`}
                    </p>
                    <div className="mt-5 flex justify-center">
                      {isAdmin ? (
                        <Button
                          type="button"
                          asChild
                          className="cursor-pointer rounded-xl bg-[#1B2B4B] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#253961]"
                          onClick={() => onOpenChange(false)}
                        >
                          <Link
                            href={
                              bookId
                                ? `/admin/books/${bookId}/edit`
                                : "/admin/books"
                            }
                          >
                            <Settings className="mr-2 h-4 w-4 text-[#C9A84C]" />
                            Manage Book in Admin Dashboard
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={handleCheckoutClick}
                          disabled={isPurchasing}
                          className="cursor-pointer rounded-xl bg-[#C9A84C] px-7 py-2.5 text-sm sm:text-base font-bold text-[#1B2B4B] shadow-md transition-all duration-300 hover:bg-[#D6B45A] hover:shadow-lg disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          {isPurchasing
                            ? "Processing..."
                            : "Unlock Full Book Now"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Direct Checkout CTA */}
        <DialogFooter className="m-0 border-t border-[#1B2B4B]/10 bg-white/95 px-5 py-3 sm:px-6 sm:py-3.5 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 rounded-b-2xl">
          <div className="flex items-center gap-2 text-xs text-[#1B2B4B]/70 text-center sm:text-left">
            <Lock className="h-3.5 w-3.5 text-[#C9A84C] shrink-0" />
            <span>
              Previewing {numPages || 0} sample pages • Continuous reading mode
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {isAdmin ? (
              <Button
                type="button"
                asChild
                className="w-full sm:w-auto cursor-pointer rounded-xl bg-[#1B2B4B] px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#253961]"
                onClick={() => onOpenChange(false)}
              >
                <Link
                  href={
                    bookId ? `/admin/books/${bookId}/edit` : "/admin/books"
                  }
                >
                  <Settings className="mr-1.5 h-4 w-4 text-[#C9A84C]" />
                  Manage Book in Admin Dashboard
                </Link>
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleCheckoutClick}
                disabled={isPurchasing}
                className="w-full sm:w-auto cursor-pointer rounded-xl bg-[#C9A84C] px-5 py-2 text-xs sm:text-sm font-bold text-[#1B2B4B] shadow-sm transition-all duration-300 hover:bg-[#D6B45A] hover:shadow-md disabled:cursor-not-allowed"
              >
                <ShoppingCart className="mr-1.5 h-4 w-4" />
                {isPurchasing ? "Processing..." : "Unlock Full Book Now"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookPreviewModal;
