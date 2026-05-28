"use client";

import { useState } from "react";

const blocks = ["当绿旗被点击", "移动 10 步", "转向右边", "说 你好"];

export function BlocksChallenge({ onSuccess }: { onSuccess: () => void }) {
  const [program, setProgram] = useState<string[]>([]);

  const run = () => {
    if (program.includes("当绿旗被点击") && program.includes("移动 10 步")) onSuccess();
  };

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_1.1fr]">
      <div className="space-y-3">
        <p className="font-bold text-slate-200">积木库</p>
        {blocks.map((block) => (
          <button key={block} onClick={() => setProgram([...program, block])} className="block w-full rounded-2xl bg-fuchsia-300 px-4 py-3 text-left font-black text-slate-950">
            {block}
          </button>
        ))}
      </div>
      <div className="rounded-3xl bg-slate-950/60 p-5">
        <p className="font-bold text-slate-200">程序区</p>
        <div className="mt-4 min-h-40 space-y-2">
          {program.map((block, index) => <div key={`${block}-${index}`} className="rounded-2xl bg-white/10 px-4 py-3">{index + 1}. {block}</div>)}
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={run} className="rounded-2xl bg-white px-5 py-3 font-bold text-slate-950">运行</button>
          <button onClick={() => setProgram([])} className="rounded-2xl bg-white/10 px-5 py-3 font-bold">清空</button>
        </div>
      </div>
    </div>
  );
}
