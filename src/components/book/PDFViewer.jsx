'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { 
  ChevronUp, 
  ChevronDown, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Minimize, 
  Download, 
  Loader2,
  RotateCw,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Set worker source for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

/**
 * Individual PDF Page with lazy rendering and viewport tracking
 */
const PDFPageItem = memo(function PDFPageItem({
  pdfDocument,
  pageNumber,
  scale,
  rotation,
  onVisible,
  containerRef,
}) {
  const pageContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const [isRendered, setIsRendered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 600, height: 800 });
  const [isVisible, setIsVisible] = useState(false);

  // 1. Get initial unscaled page aspect ratio to reserve smooth scroll space
  useEffect(() => {
    let isCancelled = false;
    if (!pdfDocument) return;

    pdfDocument.getPage(pageNumber).then((page) => {
      if (isCancelled) return;
      const unscaledViewport = page.getViewport({ scale: 1, rotation });
      setDimensions({
        width: unscaledViewport.width,
        height: unscaledViewport.height,
      });
    }).catch((err) => {
      console.warn(`Could not get viewport for page ${pageNumber}:`, err);
    });

    return () => {
      isCancelled = true;
    };
  }, [pdfDocument, pageNumber, rotation]);

  // 2. IntersectionObserver to detect when page is near the viewport
  useEffect(() => {
    const el = pageContainerRef.current;
    if (!el || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: containerRef.current,
        rootMargin: '800px 0px', // Preload pages 800px before scrolling into view
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  // 3. Track which page is currently in view for the sticky toolbar indicator
  useEffect(() => {
    const el = pageContainerRef.current;
    if (!el || !containerRef.current || !onVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          onVisible(pageNumber);
        }
      },
      {
        root: containerRef.current,
        threshold: [0.4],
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef, onVisible, pageNumber]);

  // 4. Render canvas when page becomes visible or scale/rotation changes
  useEffect(() => {
    if (!isVisible || !pdfDocument || !canvasRef.current) return;

    let isCancelled = false;

    const render = async () => {
      try {
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const page = await pdfDocument.getPage(pageNumber);
        if (isCancelled) return;

        const viewport = page.getViewport({ scale, rotation });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d', { alpha: false });
        const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;

        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(dpr, dpr);

        const renderContext = {
          canvasContext: context,
          viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        if (!isCancelled) {
          setIsRendered(true);
        }
      } catch (err) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error(`Page ${pageNumber} render error:`, err);
        }
      }
    };

    render();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [isVisible, pdfDocument, pageNumber, scale, rotation]);

  const displayWidth = Math.floor(dimensions.width * scale);
  const displayHeight = Math.floor(dimensions.height * scale);

  return (
    <div
      ref={pageContainerRef}
      id={`pdf-page-${pageNumber}`}
      className="relative flex flex-col items-center my-3 transition-all"
      style={{
        width: displayWidth ? `${displayWidth}px` : 'auto',
        minHeight: displayHeight ? `${displayHeight}px` : '600px',
      }}
    >
      <div
        className="relative bg-white shadow-[0_6px_30px_rgba(0,0,0,0.35)] rounded-[3px] overflow-hidden"
        style={{
          width: displayWidth ? `${displayWidth}px` : 'auto',
          height: displayHeight ? `${displayHeight}px` : 'auto',
        }}
      >
        <canvas
          ref={canvasRef}
          className={cn(
            'block transition-opacity duration-200',
            isRendered ? 'opacity-100' : 'opacity-0'
          )}
        />

        {!isRendered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-[#1B2B4B]/40 gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-[#C9A84C]" />
            <span className="text-xs font-semibold">Loading Page {pageNumber}...</span>
          </div>
        )}
      </div>

      <span className="mt-2 text-[11px] font-medium text-white/60 bg-black/40 px-3 py-0.5 rounded-full backdrop-blur-sm select-none">
        Page {pageNumber}
      </span>
    </div>
  );
});

const PDFViewer = ({ pdfUrl, bookTitle, onError }) => {
  const viewerContainerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pdfDocument, setPdfDocument] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const [scale, setScale] = useState(1.15);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Load PDF document
  useEffect(() => {
    let isCancelled = false;

    const loadPDF = async () => {
      if (!pdfUrl) return;

      try {
        setIsLoading(true);
        setIsError(false);

        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
        });

        const pdf = await loadingTask.promise;
        if (isCancelled) return;

        setPdfDocument(pdf);
        setTotalPages(pdf.numPages);
        setCurrentPage(1);
        setPageInput('1');
      } catch (error) {
        console.error('Failed to load PDF document:', error);
        if (!isCancelled) {
          setIsError(true);
          if (onError) onError();
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadPDF();

    return () => {
      isCancelled = true;
      if (pdfDocument) {
        pdfDocument.destroy();
      }
    };
  }, [pdfUrl]);

  // Synchronize page input display when visible page updates during scrolling
  const handlePageVisible = useCallback((pageNum) => {
    setCurrentPage(pageNum);
    setPageInput(String(pageNum));
  }, []);

  // Smooth scroll directly to a specific page inside the container only
  const scrollToPage = useCallback((pageNum) => {
    const target = Math.max(1, Math.min(pageNum, totalPages));
    const container = scrollContainerRef.current;
    const targetElement = document.getElementById(`pdf-page-${target}`);
    if (container && targetElement) {
      if (target === 1) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const containerRect = container.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const offsetTop = targetRect.top - containerRect.top + container.scrollTop;

        container.scrollTo({
          top: Math.max(0, offsetTop - 12),
          behavior: 'smooth',
        });
      }
    }
  }, [totalPages]);

  // Jump via page number input
  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const parsed = parseInt(pageInput, 10);
    if (!isNaN(parsed)) {
      scrollToPage(parsed);
    } else {
      setPageInput(String(currentPage));
    }
  };

  // Zoom helpers
  const zoomIn = () => setScale((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 3.0));
  const zoomOut = () => setScale((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.5));
  const resetZoom = () => setScale(1.15);

  const fitWidth = () => {
    if (!scrollContainerRef.current) return;
    const containerWidth = scrollContainerRef.current.clientWidth - 64;
    const estimatedScale = Math.min(Math.max(containerWidth / 620, 0.6), 2.5);
    setScale(Number(estimatedScale.toFixed(2)));
  };

  // Rotate
  const rotateClockwise = () => setRotation((prev) => (prev + 90) % 360);

  // Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard shortcuts (Zoom & Fullscreen)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;

      if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        zoomIn();
      } else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        zoomOut();
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-[#2A2B2E] text-white">
        <Loader2 className="h-10 w-10 text-[#C9A84C] animate-spin mb-4" />
        <p className="text-sm font-medium text-white/70">Loading digital book...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-[#2A2B2E] p-8 text-center text-white">
        <p className="text-red-400 text-lg font-bold mb-2">Unable to render PDF document</p>
        <p className="text-sm text-white/60 mb-6 max-w-md">
          The reader could not process this file stream. You can download the book directly to view offline.
        </p>
        {pdfUrl && (
          <Button
            asChild
            className="rounded-full bg-[#C9A84C] text-[#04103A] hover:bg-[#D6B45A] font-semibold"
          >
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
              <Download className="mr-2 h-4 w-4" />
              Download Offline Copy
            </a>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      ref={viewerContainerRef}
      className="flex flex-col h-full w-full bg-[#2A2B2E] overflow-hidden select-text relative"
    >
      {/* Sticky Top Toolbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-3 sm:px-6 py-2.5 bg-[#1E2024]/95 text-white/90 backdrop-blur-md border-b border-white/10 shadow-md flex-wrap gap-2">
        {/* Left: Book Title & Quick Navigation */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block font-semibold text-xs text-[#C9A84C] max-w-[200px] lg:max-w-xs truncate" title={bookTitle}>
            {bookTitle || 'Reader'}
          </span>

          {/* Page Selector Form */}
          <form onSubmit={handlePageInputSubmit} className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2 py-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={currentPage <= 1}
              onClick={() => scrollToPage(currentPage - 1)}
              className="h-6 w-6 text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 cursor-pointer"
              title="Previous Page"
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </Button>

            <span className="text-xs text-white/60">Pg</span>
            <input
              type="text"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onBlur={() => setPageInput(String(currentPage))}
              className="w-9 h-5 text-center bg-black/40 rounded text-xs text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#C9A84C]"
            />
            <span className="text-xs text-white/60">of {totalPages}</span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={currentPage >= totalPages}
              onClick={() => scrollToPage(currentPage + 1)}
              className="h-6 w-6 text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 cursor-pointer"
              title="Next Page"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>

        {/* Center: Zoom Controls */}
        <div className="flex items-center gap-1 bg-white/10 rounded-lg p-0.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomOut}
            className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>

          <button
            onClick={resetZoom}
            className="text-xs font-semibold px-2 py-1 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
            title="Reset Zoom"
          >
            {Math.round(scale * 100)}%
          </button>

          <Button
            variant="ghost"
            size="icon"
            onClick={zoomIn}
            className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={fitWidth}
            className="hidden md:flex h-7 px-2 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
            title="Fit to Width"
          >
            <Maximize2 className="h-3.5 w-3.5 mr-1" />
            Fit Width
          </Button>
        </div>

        {/* Right: Actions (Rotate, Fullscreen, Download) */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={rotateClockwise}
            className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
            title="Rotate 90° Clockwise"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize className="h-3.5 w-3.5" />
            ) : (
              <Maximize className="h-3.5 w-3.5" />
            )}
          </Button>

          {pdfUrl && (
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-[#C9A84C] hover:text-[#D6B45A] hover:bg-white/10 cursor-pointer"
              title="Download PDF"
            >
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
                <Download className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
        </div>
      </header>

      {/* Continuous Vertical Scrolling Canvas Container */}
      <main
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-8 flex flex-col items-center gap-6 scroll-smooth"
      >
        {totalPages > 0 &&
          Array.from({ length: totalPages }, (_, index) => {
            const pageNum = index + 1;
            return (
              <PDFPageItem
                key={`page-${pageNum}`}
                pdfDocument={pdfDocument}
                pageNumber={pageNum}
                scale={scale}
                rotation={rotation}
                onVisible={handlePageVisible}
                containerRef={scrollContainerRef}
              />
            );
          })}
      </main>
    </div>
  );
};

export default PDFViewer;