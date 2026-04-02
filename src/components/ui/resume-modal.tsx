"use client";
import { AnimatePresence } from "framer-motion";
import { MediaModal } from "@/components/ui/media-modal";

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && <MediaModal type="pdf" onClose={onClose} />}
    </AnimatePresence>
  );
}
