"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { useProgressStore } from "@/store/progress-store";
import { ProgressBar } from "@/components/ProgressBar";
import type { Stage } from "@/lib/courses";
import { getStageIcon } from "@/lib/stage-icons";

export function StageCard({ stage }: { stage: Stage }) {
  const progress = useProgressStore((state) => state.getStageProgress(stage.id, stage.courses.length));
  const Icon = getStageIcon(stage.icon);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: stage.order * 0.06 }}
      className="glass group relative overflow-hidden rounded-[2rem] p-6"
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stage.color}`} />
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-20 blur-2xl" style={{ background: stage.accent }} />
      <div className="relative flex items-start justify-between gap-4">
        <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-3xl bg-gradient-to-br ${stage.color} text-slate-950 shadow-xl`}>
          <Icon size={28} />
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">阶段 {stage.order}</span>
      </div>
      <div className="relative mt-6">
        <p className="text-3xl">{stage.emoji}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight">{stage.title}</h2>
        <p className="mt-1 text-sm font-semibold" style={{ color: stage.accent }}>
          {stage.subtitle}
        </p>
        <p className="mt-4 min-h-12 text-sm leading-6 text-slate-300">{stage.description}</p>
      </div>
      <div className="relative mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span className="flex items-center gap-2">
            <BookOpen size={16} /> {stage.courses.length} 门课程
          </span>
          <span>{progress}%</span>
        </div>
        <ProgressBar value={progress} colorClass={stage.color} />
      </div>
      <Link
        href={`/courses/${stage.id}`}
        className="relative mt-6 flex items-center justify-between rounded-2xl bg-white px-5 py-3 font-bold text-slate-950 transition group-hover:translate-y-[-2px]"
      >
        开始学习
        <ArrowRight size={18} />
      </Link>
    </motion.article>
  );
}
