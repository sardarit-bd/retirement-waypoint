/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { Lock, Loader2, ShoppingCart, AlertCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Set worker source for pdf.js (same approach as the full PDFViewer)
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

/**
 * BookPreviewModal
 *
 * Renders a scrollable, zoomable preview of a book's PDF inside a modal.
 * The PDF served at `previewUrl` is generated server-side to contain ONLY
 * the pages the admin configured (previewEndPage) - this component never
 * has access to any page beyond that, so there is nothing here that could
 * leak the rest of the book even if inspected.
 */
export function BookPreviewModal({
  open,
  onOpenChange,
  previewUrl,
  bookTitle,
  onBuyNow,
  isPurchasing = false,
}) {
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1);

  const pdfDocRef = useRef(null);
  const canvasRefs = useRef([]);

  // Load the (already page-limited) preview PDF whenever the modal opens
  useEffect(() => {
    if (!open || !previewUrl) return;

    let cancelled = false;
    setStatus("loading");
    setNumPages(0);
    canvasRefs.current = [];

    const load = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url: previewUrl });
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        pdfDocRef.current = pdf;
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
      if (pdfDocRef.current) {
        if (typeof pdfDocRef.current.cleanup === "function") {
          pdfDocRef.current.cleanup();
        }

        if (typeof pdfDocRef.current.destroy === "function") {
          pdfDocRef.current.destroy();
        }
        pdfDocRef.current = null;
      }
    };
  }, [open, previewUrl]);

  // Render every available page once the document is ready. There are only
  // ever as many pages as the server allowed, so this never over-fetches.
  useEffect(() => {
    if (status !== "ready" || !pdfDocRef.current) return;

    let cancelled = false;

    const renderPages = async () => {
      for (let pageNumber = 1; pageNumber <= numPages; pageNumber += 1) {
        if (cancelled) return;

        const canvas = canvasRefs.current[pageNumber - 1];
        if (!canvas) continue;

        try {
          const page = await pdfDocRef.current.getPage(pageNumber);
          const viewport = page.getViewport({ scale });
          const context = canvas.getContext("2d");

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
        } catch (error) {
          console.error(`Failed to render preview page ${pageNumber}:`, error);
        }
      }
    };

    renderPages();

    return () => {
      cancelled = true;
    };
  }, [status, numPages, scale]);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="flex h-[85vh] w-[calc(100%-2rem)] max-w-4xl! flex-col gap-0 overflow-hidden rounded-2xl bg-[#F8F5EF] p-0 sm:max-w-4xl!"
      >
        <DialogHeader className="border-b border-[#1B2B4B]/10 bg-white/80 px-5 py-4 backdrop-blur-sm sm:px-6">
          <DialogTitle className="text-lg font-bold text-[#1B2B4B] sm:text-xl">
            Book Preview
          </DialogTitle>
          <DialogDescription className="text-sm text-[#1B2B4B]/60">
            Preview the beginning of this book before purchasing.
          </DialogDescription>

          {status === "ready" && (
            <div className="flex items-center gap-2 pt-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={zoomOut}
                className="h-7 rounded-full px-2 text-xs text-[#1B2B4B]/60 hover:text-[#1B2B4B]"
              >
                -
              </Button>
              <span className="text-xs text-[#1B2B4B]/60">
                {Math.round(scale * 100)}%
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={zoomIn}
                className="h-7 rounded-full px-2 text-xs text-[#1B2B4B]/60 hover:text-[#1B2B4B]"
              >
                +
              </Button>
            </div>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center gap-3 py-24">
              <Loader2 className="h-8 w-8 animate-spin text-[#C9A84C]" />
              <p className="text-sm text-[#1B2B4B]/60">Loading preview...</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <p className="font-medium text-red-500">Preview unavailable</p>
              <p className="max-w-xs text-sm text-[#1B2B4B]/60">
                We couldn&apos;t load the preview right now. Please try again
                shortly.
              </p>
            </div>
          )}

          {status === "ready" && (
            <div className="mx-auto flex max-w-xl flex-col items-center gap-6">
              {Array.from({ length: numPages }).map((_, index) => (
                <canvas
                  key={index}
                  ref={(el) => {
                    canvasRefs.current[index] = el;
                  }}
                  className="w-full rounded-lg border border-[#1B2B4B]/10 bg-white shadow-md"
                />
              ))}

              {/* End of preview lock section */}
              <div className="w-full rounded-2xl border border-[#C9A84C]/30 bg-white/90 p-6 text-center shadow-sm sm:p-8">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A84C]/10">
                  <Lock className="h-5 w-5 text-[#C9A84C]" />
                </div>
                <h3 className="text-base font-bold text-[#1B2B4B] sm:text-lg">
                  End of Free Preview
                </h3>
                <p className="mx-auto mt-1.5 max-w-sm text-sm text-[#1B2B4B]/60">
                  The remaining chapters are available after purchasing{" "}
                  {bookTitle ? `"${bookTitle}"` : "this book"}. Purchase the
                  full book to continue reading.
                </p>
                <Button
                  type="button"
                  onClick={onBuyNow}
                  disabled={isPurchasing}
                  className="mt-5 cursor-pointer rounded-2xl bg-[#C9A84C] px-8 py-5 font-bold text-[#1B2B4B] shadow-lg transition-all duration-300 hover:bg-[#D6B45A] hover:shadow-xl disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {isPurchasing ? "Processing..." : "Buy Now"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BookPreviewModal;
