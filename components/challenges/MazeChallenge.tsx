"use client";

import { useState } from "react";
import { RubyText } from "@/components/RubyText";

export function MazeChallenge({ onSuccess }: { onSuccess: () => void }) {
  const [path, setPath] = useState<string[]>([]);
  const [message, setMessage] = useState("提示：先向右走到边，再向下。");
  const target = ["右", "右", "下", "下"];
  const ok = path.length === target.length && path.every((step, index) => step === target[index]);

  const addStep = (step: string) => {
    setPath((current) => [...current, step]);
    setMessage("路径已更新，完成后点击检查路径。");
  };

  const check = () => {
    setMessage(ok ? "路径正确，收集到宝石！" : "还没到达宝石，提示：右、右、下、下。");
    if (ok) onSuccess();
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2 rounded-3xl bg-slate-950/60 p-4 text-center text-2xl">
        {Array.from({ length: 9 }).map((_, index) => <div key={index} className="rounded-2xl bg-white/5 p-5">{index === 0 ? "🐰" : index === 8 ? "💎" : "·"}</div>)}
      </div>
      <div className="flex flex-wrap gap-3">
        {["上", "下", "左", "右"].map((step) => <button key={step} onClick={() => addStep(step)} className="rounded-2xl bg-emerald-300 px-5 py-3 font-black text-slate-950"><RubyText>{step}</RubyText></button>)}
      </div>
      <p className="rounded-2xl bg-white/10 p-4 text-slate-200"><RubyText>路径：</RubyText><RubyText>{path.join(" → ") || "还没有指令"}</RubyText></p>
      <div className="flex gap-3">
        <button onClick={check} className="rounded-2xl bg-white px-5 py-3 font-bold text-slate-950"><RubyText>检查路径</RubyText></button>
        <button onClick={() => { setPath([]); setMessage("提示：先向右走到边，再向下。"); }} className="rounded-2xl bg-white/10 px-5 py-3 font-bold"><RubyText>重来</RubyText></button>
      </div>
      <p className={ok ? "text-emerald-200" : "text-slate-300"}><RubyText>{message}</RubyText></p>
    </div>
  );
}
