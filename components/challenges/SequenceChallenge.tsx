"use client";

import { useState, type DragEvent } from "react";
import { ArrowDown, ArrowRight, RotateCcw } from "lucide-react";

const initial = ["向右", "向下", "向右"];
const target = ["向右", "向右", "向下"];

export function SequenceChallenge({ onSuccess }: { onSuccess: () => void }) {
  const [steps, setSteps] = useState(initial);
  const [message, setMessage] = useState("拖拽卡片调整顺序，让机器人走到星星。");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [robotPosition, setRobotPosition] = useState(0);

  const swap = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0) return;
    setSteps((current) => {
      if (from >= current.length || to >= current.length) return current;
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    setMessage("顺序已调整，点击运行看看结果。");
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>, to: number) => {
    event.preventDefault();
    const from = Number(event.dataTransfer.getData("text/plain"));
    swap(Number.isNaN(from) ? dragIndex ?? -1 : from, to);
    setDragIndex(null);
  };

  const moveWithKeyboard = (index: number, direction: -1 | 1) => {
    const to = index + direction;
    if (to >= 0 && to < steps.length) swap(index, to);
  };

  const run = () => {
    const ok = steps.every((step, index) => step === target[index]);
    setMessage(ok ? "成功！机器人到达星星。" : "还差一点：先横向走两步，再向下。");
    let row = 0;
    let column = 0;
    steps.forEach((step, index) => {
      window.setTimeout(() => {
        if (step === "向右") column = Math.min(2, column + 1);
        if (step === "向下") row = Math.min(1, row + 1);
        setRobotPosition(row * 3 + column);
      }, (index + 1) * 260);
    });
    if (ok) onSuccess();
  };

  return (
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-2 rounded-3xl bg-slate-950/60 p-4 text-center text-2xl">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-2xl bg-white/5 p-4 transition-colors duration-200">
            {robotPosition === index ? "🤖" : index === 5 ? "⭐" : "·"}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {steps.map((step, index) => (
          <button
            key={`${step}-${index}`}
            draggable
            onDragStart={(event) => {
              setDragIndex(index);
              event.dataTransfer.effectAllowed = "move";
              event.dataTransfer.setData("text/plain", String(index));
            }}
            onDragEnd={() => setDragIndex(null)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") moveWithKeyboard(index, -1);
              if (event.key === "ArrowRight" || event.key === "ArrowDown") moveWithKeyboard(index, 1);
            }}
            className="flex cursor-grab items-center gap-2 rounded-2xl bg-cyan-300 px-4 py-3 font-black text-slate-950 shadow-lg active:cursor-grabbing"
            aria-label={`${step}，拖拽或使用方向键调整顺序`}
          >
            {step === "向右" ? <ArrowRight size={18} /> : <ArrowDown size={18} />} {step}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <button onClick={run} className="rounded-2xl bg-white px-5 py-3 font-bold text-slate-950">运行程序</button>
        <button onClick={() => { setSteps(initial); setRobotPosition(0); setMessage("拖拽卡片调整顺序，让机器人走到星星。"); }} className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-bold text-white"><RotateCcw size={17} />重置</button>
      </div>
      <p className="text-slate-300">{message}</p>
    </div>
  );
}
