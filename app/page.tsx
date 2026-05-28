import { Header } from "@/components/Header";
import { RubyText } from "@/components/RubyText";
import { StageCard } from "@/components/StageCard";
import { stages } from "@/lib/courses";

export default function HomePage() {
  return (
    <main className="min-h-screen pb-12">
      <Header />
      <section className="mx-auto max-w-6xl px-5 pt-6">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
            5 <RubyText>个阶段</RubyText> · <RubyText>互动挑战</RubyText> · <RubyText>本地保存进度</RubyText>
          </p>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl">
            <RubyText>把编程启蒙变成一场会发光的冒险</RubyText>
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            <RubyText>从不插电思维到</RubyText> Python <RubyText>初体验，孩子可以在拖拽、迷宫、小游戏和项目挑战中逐步建立计算思维。</RubyText>
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {stages.map((stage) => (
            <StageCard key={stage.id} stage={stage} />
          ))}
        </div>
      </section>
    </main>
  );
}
