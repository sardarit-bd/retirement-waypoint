'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Search, 
  Maximize, 
  Minimize, 
  Download, 
  Printer,
  Loader2,
  X,
  RotateCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Set worker source for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const PDFViewer = ({ pdfUrl, bookTitle, onError }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const searchInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pdfDocument, setPdfDocument] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Load PDF
  useEffect(() => {
    const loadPDF = async () => {
      if (!pdfUrl) return;

      try {
        setIsLoading(true);
        setIsError(false);

        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          withCredentials: true,
        });

        const pdf = await loadingTask.promise;
        setPdfDocument(pdf);
        setTotalPages(pdf.numPages);
        setCurrentPage(1);
      } catch (error) {
        console.error('Failed to load PDF:', error);
        setIsError(true);
        if (onError) onError();
      } finally {
        setIsLoading(false);
      }
    };

    loadPDF();

    return () => {
      if (pdfDocument) {
        pdfDocument.destroy();
      }
    };
  }, [pdfUrl]);

  // Render current page
  const renderPage = useCallback(async () => {
    if (!pdfDocument || !canvasRef.current) return;

    try {
      const page = await pdfDocument.getPage(currentPage);
      const viewport = page.getViewport({ scale: scale });

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Rotate if needed
      if (rotation !== 0) {
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate((rotation * Math.PI) / 180);
        context.translate(-canvas.width / 2, -canvas.height / 2);
      }

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
    } catch (error) {
      console.error('Failed to render page:', error);
    }
  }, [pdfDocument, currentPage, scale, rotation]);

  // Render page when dependencies change
  useEffect(() => {
    renderPage();
  }, [renderPage]);

  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Navigation
  const goToPage = (page) => {
    const target = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(target);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  // Zoom
  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const resetZoom = () => setScale(1);

  // Rotate
  const rotate = () => setRotation(prev => (prev + 90) % 360);

  // Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Search
  const handleSearch = async (term) => {
    if (!term.trim() || !pdfDocument) {
      setSearchResults([]);
      setCurrentSearchIndex(-1);
      return;
    }

    try {
      const results = [];
      for (let i = 1; i <= totalPages; i++) {
        const page = await pdfDocument.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map(item => item.str).join(' ');
        
        if (text.toLowerCase().includes(term.toLowerCase())) {
          results.push(i);
        }
      }
      
      setSearchResults(results);
      setCurrentSearchIndex(results.length > 0 ? 0 : -1);
      
      if (results.length > 0) {
        goToPage(results[0]);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const goToNextSearchResult = () => {
    if (searchResults.length === 0) return;
    const nextIndex = (currentSearchIndex + 1) % searchResults.length;
    setCurrentSearchIndex(nextIndex);
    goToPage(searchResults[nextIndex]);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;

      switch (e.key) {
        case 'ArrowLeft':
          prevPage();
          break;
        case 'ArrowRight':
          nextPage();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'Escape':
          if (isFullscreen) toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, isFullscreen]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F8F5EF]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-[#C9A84C] animate-spin" />
          <p className="text-[#1B2B4B]/60">Loading PDF...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#F8F5EF] gap-4">
        <p className="text-red-500 text-lg">Failed to load PDF</p>
        <p className="text-[#1B2B4B]/60 text-sm">The PDF could not be loaded. Please try again.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-col h-full bg-[#F8F5EF]">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-[#1B2B4B]/10 bg-white/80 backdrop-blur-sm flex-wrap">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevPage}
            disabled={currentPage <= 1}
            className="h-8 w-8 text-[#1B2B4B]/60 hover:text-[#1B2B4B] disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-[#1B2B4B] min-w-[80px] text-center">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextPage}
            disabled={currentPage >= totalPages}
            className="h-8 w-8 text-[#1B2B4B]/60 hover:text-[#1B2B4B] disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomOut}
            className="h-8 w-8 text-[#1B2B4B]/60 hover:text-[#1B2B4B]"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs text-[#1B2B4B]/60 min-w-[48px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomIn}
            className="h-8 w-8 text-[#1B2B4B]/60 hover:text-[#1B2B4B]"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={rotate}
            className="h-8 w-8 text-[#1B2B4B]/60 hover:text-[#1B2B4B]"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={cn(
              "h-8 w-8 text-[#1B2B4B]/60 hover:text-[#1B2B4B]",
              isSearchOpen && "bg-[#C9A84C]/10 text-[#C9A84C]"
            )}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="h-8 w-8 text-[#1B2B4B]/60 hover:text-[#1B2B4B]"
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1B2B4B]/10 bg-white/50">
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search in document..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                goToNextSearchResult();
              }
            }}
            className="h-8 text-sm border-[#1B2B4B]/10 focus:border-[#C9A84C]"
          />
          {searchResults.length > 0 && (
            <span className="text-xs text-[#1B2B4B]/60 whitespace-nowrap">
              {currentSearchIndex + 1} of {searchResults.length}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchTerm('');
              setSearchResults([]);
              setCurrentSearchIndex(-1);
            }}
            className="h-8 w-8 text-[#1B2B4B]/60 hover:text-[#1B2B4B]"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Canvas Container */}
      <div className="flex-1 overflow-auto p-4 bg-[#F8F5EF]">
        <div className="flex items-center justify-center min-h-full">
          <canvas
            ref={canvasRef}
            className="shadow-lg rounded-lg bg-white max-w-full"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>

      {/* Page indicator - bottom */}
      <div className="flex items-center justify-center gap-2 px-4 py-2 border-t border-[#1B2B4B]/10 bg-white/80 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevPage}
          disabled={currentPage <= 1}
          className="h-7 w-7 text-[#1B2B4B]/60 hover:text-[#1B2B4B] disabled:opacity-30"
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
        <span className="text-xs text-[#1B2B4B]/60">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextPage}
          disabled={currentPage >= totalPages}
          className="h-7 w-7 text-[#1B2B4B]/60 hover:text-[#1B2B4B] disabled:opacity-30"
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
        <span className="text-xs text-[#1B2B4B]/40 ml-2">
          {bookTitle || 'Document'}
        </span>
      </div>
    </div>
  );
};

export default PDFViewer;