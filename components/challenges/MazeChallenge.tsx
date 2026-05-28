"use client";

import { useState } from "react";

export function MazeChallenge({ onSuccess }: { onSuccess: () => void }) {
  const [path, setPath] = useState<string[]>([]);
  const target = ["右", "右", "下", "下"];
  const ok = path.length === target.length && path.every((step, index) => step === target[index]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2 rounded-3xl bg-slate-950/60 p-4 text-center text-2xl">
        {Array.from({ length: 9 }).map((_, index) => <div key={index} className="rounded-2xl bg-white/5 p-5">{index === 0 ? "🐰" : index === 8 ? "💎" : "·"}</div>)}
      </div>
      <div className="flex flex-wrap gap-3">
        {["上", "下", "左", "右"].map((step) => <button key={step} onClick={() => setPath([...path, step])} className="rounded-2xl bg-emerald-300 px-5 py-3 font-black text-slate-950">{step}</button>)}
      </div>
      <p className="rounded-2xl bg-white/10 p-4 text-slate-200">路径：{path.join(" → ") || "还没有指令"}</p>
      <div className="flex gap-3">
        <button onClick={() => ok && onSuccess()} className="rounded-2xl bg-white px-5 py-3 font-bold text-slate-950">检查路径</button>
        <button onClick={() => setPath([])} className="rounded-2xl bg-white/10 px-5 py-3 font-bold">重来</button>
      </div>
      <p className={ok ? "text-emerald-200" : "text-slate-300"}>{ok ? "路径正确，收集到宝石！" : "提示：先向右走到边，再向下。"}</p>
    </div>
  );
}
