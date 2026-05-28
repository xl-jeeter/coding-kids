import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, PlayCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { getStage, stages } from "@/lib/courses";
import { CourseProgressBadge } from "@/components/CourseProgressBadge";
import { StageProgressBar } from "@/components/StageProgressBar";
import { getStageIcon } from "@/lib/stage-icons";

export function generateStaticParams() {
  return stages.map((stage) => ({ stageId: stage.id }));
}

export default function StagePage({ params }: { params: { stageId: string } }) {
  const stage = getStage(params.stageId);
  if (!stage) notFound();
  const Icon = getStageIcon(stage.icon);

  return (
    <main className="min-h-screen pb-12">
      <Header />
      <section className="mx-auto max-w-6xl px-5 pt-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
          <ArrowLeft size={16} /> 返回学习地图
        </Link>
        <div className="glass mt-6 overflow-hidden rounded-[2rem] p-7">
          <div className={`h-1.5 rounded-full bg-gradient-to-r ${stage.color}`} />
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className={`mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br ${stage.color} text-slate-950`}>
                <Icon size={32} />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-slate-400">Stage {stage.order}</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                {stage.emoji} {stage.title}
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300">{stage.description}</p>
            </div>
            <div className="w-full rounded-3xl bg-white/5 p-5 md:max-w-xs">
              <p className="mb-3 flex items-center justify-between text-sm text-slate-300">
                <span>阶段进度</span>
                <CourseProgressBadge stage={stage} mode="percent" />
              </p>
              <StageProgressBar stageId={stage.id} total={stage.courses.length} color={stage.color} />
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {stage.courses.map((course, index) => (
            <Link
              href={`/courses/${stage.id}/${course.id}`}
              key={course.id}
              className="glass group rounded-[1.75rem] p-6 transition hover:-translate-y-1 hover:border-white/25"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-bold text-white">第 {index + 1} 课</span>
                <CourseProgressBadge stage={stage} courseId={course.id} />
              </div>
              <h2 className="mt-6 text-2xl font-black">{course.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{course.description}</p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
                  <Clock size={15} /> {course.duration}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
                  <CheckCircle2 size={15} /> {course.goals.length} 个目标
                </span>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 font-bold" style={{ color: stage.accent }}>
                <PlayCircle size={18} /> 进入课程
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
