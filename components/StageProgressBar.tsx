"use client";

import { ProgressBar } from "@/components/ProgressBar";
import { useProgressStore } from "@/store/progress-store";

export function StageProgressBar({ stageId, total, color }: { stageId: string; total: number; color: string }) {
  const progress = useProgressStore((state) => state.getStageProgress(stageId, total));
  return <ProgressBar value={progress} colorClass={color} />;
}
