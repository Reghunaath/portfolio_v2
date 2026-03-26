"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(800);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    setPage(1);
    const measure = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl h-[90vh] flex flex-col border border-[#30363d] bg-[#0d1117]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal title bar */}
            <div className="flex items-center gap-3 px-4 py-2 border-b border-[#30363d] bg-[#161b22] shrink-0">
              {/* Traffic light buttons */}
              <div className="flex items-center gap-1.5 group">
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center transition-all" aria-label="Close">
                  <span className="text-[#7a0000] opacity-0 group-hover:opacity-100 transition-opacity text-[7px] font-bold leading-none">✕</span>
                </button>
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center transition-all" aria-label="Close">
                  <span className="text-[#7a5000] opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold leading-none">−</span>
                </button>
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center transition-all" aria-label="Close">
                  <span className="text-[#005a00] opacity-0 group-hover:opacity-100 transition-opacity text-[7px] font-bold leading-none">↗</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#8b949e] text-xs">$</span>
                <span className="text-[#8b949e] text-xs">open resume.pdf</span>
                {numPages > 0 && (
                  <span className="text-[#8b949e] text-xs opacity-50">
                    — page {page}/{numPages}
                  </span>
                )}
              </div>
            </div>

            {/* PDF canvas area */}
            <div
              ref={containerRef}
              className="terminal-scroll flex-1 overflow-y-auto overflow-x-hidden flex justify-center bg-[#0d1117] py-4"
            >
              <Document
                file="/resume.pdf"
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading={
                  <p className="text-xs text-[#8b949e] mt-8">loading resume.pdf...</p>
                }
                error={
                  <p className="text-xs text-[#f85149] mt-8">error: failed to load resume.pdf</p>
                }
              >
                <Page
                  pageNumber={page}
                  width={width}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
            </div>

            {/* Page navigation */}
            {numPages > 1 && (
              <div className="flex items-center gap-3 px-4 py-2 border-t border-[#30363d] bg-[#161b22] shrink-0">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="text-xs text-[#8b949e] px-3 py-1 border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] hover:text-[#c9d1d9] transition-colors select-none disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  [prev]
                </button>
                <span className="text-xs text-[#8b949e]">
                  {page} / {numPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(numPages, p + 1))}
                  disabled={page === numPages}
                  className="text-xs text-[#8b949e] px-3 py-1 border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] hover:text-[#c9d1d9] transition-colors select-none disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  [next]
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
