"use client";

import { CheckCircle2 } from "lucide-react";
import { useProgressStore } from "@/store/progress-store";
import type { Course, Stage } from "@/lib/courses";
import { BlocksChallenge } from "./BlocksChallenge";
import { CanvasGame } from "./CanvasGame";
import { ConditionChallenge } from "./ConditionChallenge";
import { MazeChallenge } from "./MazeChallenge";
import { ProjectChallenge } from "./ProjectChallenge";
import { PythonEditor } from "./PythonEditor";
import { SequenceChallenge } from "./SequenceChallenge";

export function ChallengeHost({ stage, course }: { stage: Stage; course: Course }) {
  const completeCourse = useProgressStore((state) => state.completeCourse);
  const isCompleted = useProgressStore((state) => state.isCompleted(stage.id, course.id));
  const onSuccess = () => completeCourse(stage.id, course.id);

  const challenge = {
    sequence: <SequenceChallenge onSuccess={onSuccess} />,
    condition: <ConditionChallenge onSuccess={onSuccess} />,
    blocks: <BlocksChallenge onSuccess={onSuccess} />,
    maze: <MazeChallenge onSuccess={onSuccess} />,
    canvas: <CanvasGame onSuccess={onSuccess} />,
    python: <PythonEditor onSuccess={onSuccess} />,
    project: <ProjectChallenge onSuccess={onSuccess} />,
  }[course.challenge];

  return (
    <div className="glass rounded-[2rem] p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">Interactive Challenge</p>
          <h2 className="mt-2 text-2xl font-black">互动挑战</h2>
        </div>
        {isCompleted && <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-bold text-emerald-200"><CheckCircle2 size={17} /> 已完成</span>}
      </div>
      {challenge}
    </div>
  );
}
