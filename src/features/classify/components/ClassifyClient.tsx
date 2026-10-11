"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { classifyFish, type PredictResponse } from "@/shared/lib/api";
import { EASE } from "@/shared/constants/Motion";
import { SPLIT_GRID } from "../constants/Classify";
import { ResultCard } from "./ResultCard";
import { ResultSummary } from "./ResultSummary";
import { UploadZone } from "./UploadZone";
import { ClassifyIntro } from "./ClassifyIntro";

const swap = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.4, ease: EASE },
};

export function ClassifyClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selected: File) => {
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const data = await classifyFish(file);
      setResult(data);
    } catch {
      setError("Gagal menghubungi server. Pastikan backend sudah berjalan.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <AnimatePresence mode="wait">
      {result && preview ? (
        <motion.div key="result" {...swap} className={SPLIT_GRID}>
          <ResultSummary result={result} onReset={handleReset} />
          <ResultCard result={result} preview={preview} />
        </motion.div>
      ) : (
        <motion.div key="upload" {...swap} className={SPLIT_GRID}>
          <ClassifyIntro />
          <div>
            <UploadZone
              preview={preview}
              loading={loading}
              onFileSelect={handleFileSelect}
              onSubmit={handleSubmit}
            />
            {error && (
              <p className="mt-4 text-center font-sans text-[14px] text-red-500">
                {error}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}