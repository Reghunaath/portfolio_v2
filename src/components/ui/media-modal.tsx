"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function toGDriveEmbed(url: string): string {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return url;
}

export type MediaModalProps =
  | { type: "images"; images: { src: string; label: string }[]; title: string; startIdx: number; onClose: () => void }
  | { type: "video"; title: string; url: string; onClose: () => void }
  | { type: "pdf"; onClose: () => void };

export function MediaModal(props: MediaModalProps) {
  const [imgIdx, setImgIdx] = useState(props.type === "images" ? props.startIdx : 0);
  const [pdfPage, setPdfPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [pdfWidth, setPdfWidth] = useState(800);
  const [maximized, setMaximized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const images = props.type === "images" ? props.images : [];
  const prev = useCallback(() => setImgIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setImgIdx((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
      if (props.type === "images") {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [props, prev, next]);

  useEffect(() => {
    if (props.type !== "pdf") return;
    setPdfPage(1);
    const measure = () => {
      if (containerRef.current) setPdfWidth(containerRef.current.clientWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [props.type]);

  const label =
    props.type === "images"
      ? images[imgIdx]?.label
      : props.type === "video"
      ? `demo — ${props.title}`
      : "$ open resume.pdf";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm ${maximized ? "" : "px-4"}`}
      onClick={props.onClose}
    >
      <div
        className={`border border-[#30363d] bg-[#0d1117] overflow-hidden flex flex-col transition-all duration-200 ${
          maximized
            ? "w-full h-full max-w-none"
            : `w-full max-w-3xl ${props.type === "pdf" ? "h-[90vh]" : ""}`
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[#30363d] bg-[#161b22] shrink-0">
          <div className="flex items-center gap-1.5 group">
            <button onClick={props.onClose} className="w-3 h-3 rounded-full bg-[#f85149] flex items-center justify-center transition-all" aria-label="Close">
              <span className="text-[#7a0000] opacity-0 group-hover:opacity-100 transition-opacity text-[7px] font-bold leading-none">✕</span>
            </button>
            <span className="w-3 h-3 rounded-full bg-[#e3b341] flex items-center justify-center">
              <span className="text-[#7a5000] opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold leading-none">−</span>
            </span>
            <button onClick={() => setMaximized((m) => !m)} className="w-3 h-3 rounded-full bg-[#3fb950] flex items-center justify-center" aria-label="Maximize">
              <span className="text-[#005a00] opacity-0 group-hover:opacity-100 transition-opacity text-[7px] font-bold leading-none">{maximized ? "↙" : "↗"}</span>
            </button>
          </div>
          <span className="text-[#8b949e] text-xs truncate flex-1 ml-1">{label}</span>
          {props.type === "images" && images.length > 1 && (
            <span className="text-[#8b949e] text-xs shrink-0">{imgIdx + 1}/{images.length}</span>
          )}
          {props.type === "pdf" && numPages > 0 && (
            <span className="text-[#8b949e] text-xs shrink-0 opacity-50">page {pdfPage}/{numPages}</span>
          )}
        </div>

        {/* Content */}
        {props.type === "images" && (
          <>
            <div className="relative w-full aspect-video">
              <Image
                src={images[imgIdx].src}
                alt={`${props.title} — ${images[imgIdx].label}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
            {images.length > 1 && (
              <div className="flex justify-between px-3 py-2 border-t border-[#30363d] bg-[#161b22]">
                <button onClick={prev} className="text-[#8b949e] hover:text-[#c9d1d9] text-xs transition-colors">‹ prev</button>
                <button onClick={next} className="text-[#8b949e] hover:text-[#c9d1d9] text-xs transition-colors">next ›</button>
              </div>
            )}
          </>
        )}

        {props.type === "video" && (
          <div className="relative w-full aspect-video">
            <iframe
              src={toGDriveEmbed(props.url)}
              className="absolute inset-0 w-full h-full"
              allow="autoplay"
              allowFullScreen
            />
          </div>
        )}

        {props.type === "pdf" && (
          <>
            <div
              ref={containerRef}
              className="terminal-scroll flex-1 overflow-y-auto overflow-x-hidden flex justify-center bg-[#0d1117] py-4"
            >
              <Document
                file="/resume.pdf"
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading={<p className="text-xs text-[#8b949e] mt-8">loading resume.pdf...</p>}
                error={<p className="text-xs text-[#f85149] mt-8">error: failed to load resume.pdf</p>}
              >
                <Page
                  pageNumber={pdfPage}
                  width={pdfWidth}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
            </div>
            {numPages > 1 && (
              <div className="flex items-center gap-3 px-4 py-2 border-t border-[#30363d] bg-[#161b22] shrink-0">
                <button
                  onClick={() => setPdfPage((p) => Math.max(1, p - 1))}
                  disabled={pdfPage === 1}
                  className="text-xs text-[#8b949e] px-3 py-1 border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] hover:text-[#c9d1d9] transition-colors select-none disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  [prev]
                </button>
                <span className="text-xs text-[#8b949e]">{pdfPage} / {numPages}</span>
                <button
                  onClick={() => setPdfPage((p) => Math.min(numPages, p + 1))}
                  disabled={pdfPage === numPages}
                  className="text-xs text-[#8b949e] px-3 py-1 border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] hover:text-[#c9d1d9] transition-colors select-none disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  [next]
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
