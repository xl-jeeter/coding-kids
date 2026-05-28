import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock, Target } from "lucide-react";
import { Header } from "@/components/Header";
import { ChallengeHost } from "@/components/challenges/ChallengeHost";
import { getCourse, getStage, stages } from "@/lib/courses";

export function generateStaticParams() {
  return stages.flatMap((stage) => stage.courses.map((course) => ({ stageId: stage.id, courseId: course.id })));
}

export default function CoursePage({ params }: { params: { stageId: string; courseId: string } }) {
  const stage = getStage(params.stageId);
  const course = getCourse(params.stageId, params.courseId);
  if (!stage || !course) notFound();

  return (
    <main className="min-h-screen pb-12">
      <Header />
      <section className="mx-auto max-w-6xl px-5 pt-4">
        <Link href={`/courses/${stage.id}`} className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
          <ArrowLeft size={16} /> 返回课程列表
        </Link>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="glass rounded-[2rem] p-7">
            <div className={`mb-7 h-1.5 rounded-full bg-gradient-to-r ${stage.color}`} />
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">
              {stage.title} · {stage.emoji}
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">{course.title}</h1>
            <p className="mt-4 leading-7 text-slate-300">{course.description}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><Clock size={16} />{course.duration}</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><BookOpen size={16} />教学 + 互动挑战</span>
            </div>
            <div className="mt-8 rounded-3xl bg-white/5 p-5">
              <h2 className="flex items-center gap-2 text-xl font-black"><Target size={20} /> 学习目标</h2>
              <ul className="mt-4 space-y-3 text-slate-300">
                {course.goals.map((goal) => <li key={goal} className="rounded-2xl bg-slate-950/40 px-4 py-3">{goal}</li>)}
              </ul>
            </div>
            <div className="mt-6 rounded-3xl bg-white/5 p-5">
              <h2 className="text-xl font-black">教学内容</h2>
              <p className="mt-3 leading-7 text-slate-300">
                先观察目标，再把任务拆成小步骤。每一步都应该足够清楚，让电脑或角色可以直接执行。遇到结果不对时，回到步骤里找出需要调整的地方，这就是调试。
              </p>
            </div>
          </article>
          <ChallengeHost stage={stage} course={course} />
        </div>
      </section>
    </main>
  );
}
