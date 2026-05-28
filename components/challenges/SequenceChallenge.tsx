"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, RotateCcw } from "lucide-react";

const initial = ["向右", "向下", "向右"];
const target = ["向右", "向右", "向下"];

export function SequenceChallenge({ onSuccess }: { onSuccess: () => void }) {
  const [steps, setSteps] = useState(initial);
  const [message, setMessage] = useState("拖拽卡片调整顺序，让机器人走到星星。");

  const swap = (from: number, to: number) => {
    const next = [...steps];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setSteps(next);
  };

  const run = () => {
    const ok = steps.every((step, index) => step === target[index]);
    setMessage(ok ? "成功！机器人到达星星。" : "还差一点：先横向走两步，再向下。");
    if (ok) onSuccess();
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2 rounded-3xl bg-slate-950/60 p-4 text-center text-2xl">
        <div>🤖</div><div>·</div><div>·</div>
        <div>·</div><div>·</div><div>⭐</div>
      </div>
      <div className="flex flex-wrap gap-3">
        {steps.map((step, index) => (
          <button
            key={`${step}-${index}`}
            draggable
            onDragStart={(event) => event.dataTransfer.setData("text/plain", String(index))}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => swap(Number(event.dataTransfer.getData("text/plain")), index)}
            className="flex items-center gap-2 rounded-2xl bg-cyan-300 px-4 py-3 font-black text-slate-950 shadow-lg"
          >
            {step === "向右" ? <ArrowRight size={18} /> : <ArrowDown size={18} />} {step}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <button onClick={run} className="rounded-2xl bg-white px-5 py-3 font-bold text-slate-950">运行程序</button>
        <button onClick={() => setSteps(initial)} className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-bold text-white"><RotateCcw size={17} />重置</button>
      </div>
      <p className="text-slate-300">{message}</p>
    </div>
  );
}
