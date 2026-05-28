"use client";

import { useEffect, useRef, useState } from "react";

export function CanvasGame({ onSuccess }: { onSuccess: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [basket, setBasket] = useState(130);
  const [score, setScore] = useState(0);
  const [fruitY, setFruitY] = useState(20);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fb7185";
    ctx.beginPath();
    ctx.arc(160, fruitY, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#34d399";
    ctx.fillRect(basket, 235, 70, 16);
  }, [basket, fruitY]);

  const drop = () => {
    const nextY = fruitY + 55;
    if (nextY >= 235 && basket <= 160 && basket + 70 >= 160) {
      setScore((value) => {
        const next = value + 1;
        if (next >= 3) onSuccess();
        return next;
      });
      setFruitY(20);
    } else if (nextY > 260) {
      setFruitY(20);
    } else {
      setFruitY(nextY);
    }
  };

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} width={320} height={270} className="w-full rounded-3xl border border-white/10" />
      <div className="flex flex-wrap gap-3">
        <button onClick={() => setBasket(Math.max(0, basket - 30))} className="rounded-2xl bg-white/10 px-5 py-3 font-bold">左移</button>
        <button onClick={() => setBasket(Math.min(250, basket + 30))} className="rounded-2xl bg-white/10 px-5 py-3 font-bold">右移</button>
        <button onClick={drop} className="rounded-2xl bg-white px-5 py-3 font-bold text-slate-950">下一帧</button>
      </div>
      <p className="text-slate-300">分数变量 score = {score}，接到 3 个水果完成挑战。</p>
    </div>
  );
}
