"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Upload, ImageIcon, Loader2 } from "lucide-react";
import { EASE } from "@/shared/constants/Motion";
import { PANEL, STAGE } from "../constants/Classify";

interface UploadZoneProps {
  preview: string | null;
  loading: boolean;
  onFileSelect: (file: File) => void;
  onSubmit: () => void;
}

const swap = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.35, ease: EASE },
};

export function UploadZone({
  preview,
  loading,
  onFileSelect,
  onSubmit,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const disabled = !preview || loading;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className={PANEL}>
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        animate={{ scale: isDragging ? 1.02 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className={`${STAGE} flex cursor-pointer flex-col items-center justify-center overflow-hidden border-2 border-dashed p-4 text-center transition-colors ${
          isDragging
            ? "border-[#0871E7] bg-[#0871E7]/5"
            : "border-black/15 bg-[#F3F4ED]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileSelect(file);
          }}
        />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              {...swap}
              className="relative h-full w-full overflow-hidden rounded-xl"
            >
              <Image
                src={preview}
                alt="Preview"
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-contain"
              />
              {loading && (
                <motion.div
                  initial={{ top: "0%" }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-x-0 h-0.5 bg-[#0871E7] shadow-[0_0_24px_6px_rgba(8,113,231,0.55)]"
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              {...swap}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#0871E7]/10"
              >
                <ImageIcon className="h-7 w-7 text-[#0871E7]" />
              </motion.div>
              <p className="mb-1 font-sans text-[15px] font-medium text-[#1a1a1a]">
                Klik atau seret foto ikan ke sini
              </p>
              <p className="font-sans text-[13px] text-[#1a1a1a]/50">
                Format JPG, PNG — satu ikan, latar sederhana
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.button
        onClick={onSubmit}
        disabled={disabled}
        whileHover={disabled ? undefined : { scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        className="group relative mt-4 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#0871E7] px-7 py-3.5 font-sans text-[14px] text-white shadow-[inset_0_-4px_4px_rgba(255,255,255,0.39)] outline outline-1 outline-[#0871E7] -outline-offset-1 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="absolute left-[10%] top-[1px] h-4 w-[80%] rounded-[12px] bg-gradient-to-b from-[#DEF0FC] to-transparent transition-transform duration-300 group-hover:scale-x-105" />
        {loading ? (
          <>
            <Loader2 className="relative h-4 w-4 animate-spin" />
            <span className="relative">Menganalisis...</span>
          </>
        ) : (
          <>
            <Upload className="relative h-4 w-4" />
            <span className="relative">Klasifikasi Sekarang</span>
          </>
        )}
      </motion.button>
    </div>
  );
}