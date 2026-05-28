"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useProgressStore } from "@/store/progress-store";
import type { Stage } from "@/lib/courses";

type Props = {
  stage: Stage;
  courseId?: string;
  mode?: "badge" | "percent";
};

export function CourseProgressBadge({ stage, courseId, mode = "badge" }: Props) {
  const progress = useProgressStore((state) => state.getStageProgress(stage.id, stage.courses.length));
  const isDone = useProgressStore((state) => (courseId ? state.isCompleted(stage.id, courseId) : false));

  if (mode === "percent") return <span>{progress}%</span>;

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ${isDone ? "bg-emerald-400/15 text-emerald-200" : "bg-white/10 text-slate-300"}`}>
      {isDone ? <CheckCircle2 size={15} /> : <Circle size={15} />}
      {isDone ? "已完成" : "未完成"}
    </span>
  );
}
