import Link from "next/link";
import { Sparkles } from "lucide-react";
import { RubyText } from "@/components/RubyText";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6">
      <Link href="/" className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/20 text-cyan-200 ring-1 ring-cyan-300/30">
          <Sparkles size={23} />
        </span>
        <span>
          <span className="block text-lg font-black tracking-tight">CodeSpark Kids</span>
          <span className="block text-xs text-slate-400"><RubyText>儿童编程启蒙实验室</RubyText></span>
        </span>
      </Link>
      <Link
        href="/"
        className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/10"
      >
        <RubyText>学习地图</RubyText>
      </Link>
    </header>
  );
}
