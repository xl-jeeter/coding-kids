"use client";

import { useEffect, useRef, useState } from "react";
import { RubyText } from "@/components/RubyText";

const canvasWidth = 320;
const canvasHeight = 270;
const basketWidth = 70;
const basketY = 235;
const fruitX = 160;

export function CanvasGame({ onSuccess }: { onSuccess: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const basketRef = useRef(130);
  const fruitYRef = useRef(20);
  const keysRef = useRef({ left: false, right: false });
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [basket, setBasket] = useState(130);
  const [score, setScore] = useState(0);
  const [fruitY, setFruitY] = useState(20);
  const [running, setRunning] = useState(false);

  const draw = (nextBasket = basketRef.current, nextFruitY = fruitYRef.current) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fb7185";
    ctx.beginPath();
    ctx.arc(fruitX, nextFruitY, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#34d399";
    ctx.fillRect(nextBasket, basketY, basketWidth, 16);
  };

  useEffect(() => {
    basketRef.current = basket;
    fruitYRef.current = fruitY;
    draw(basket, fruitY);
  }, [basket, fruitY]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        event.preventDefault();
        keysRef.current.left = true;
      }
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        event.preventDefault();
        keysRef.current.right = true;
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") keysRef.current.left = false;
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") keysRef.current.right = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!running) {
      lastTimeRef.current = null;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      return;
    }

    const tick = (time: number) => {
      const lastTime = lastTimeRef.current ?? time;
      const delta = Math.min(time - lastTime, 40) / 16.67;
      lastTimeRef.current = time;

      let nextBasket = basketRef.current;
      if (keysRef.current.left) nextBasket -= 5 * delta;
      if (keysRef.current.right) nextBasket += 5 * delta;
      nextBasket = Math.max(0, Math.min(canvasWidth - basketWidth, nextBasket));

      let nextFruitY = fruitYRef.current + 2.8 * delta;
      if (nextFruitY >= basketY && nextFruitY <= basketY + 18 && nextBasket <= fruitX && nextBasket + basketWidth >= fruitX) {
        setScore((value) => {
          const next = value + 1;
          if (next >= 3) onSuccess();
          return next;
        });
        nextFruitY = 20;
      } else if (nextFruitY > canvasHeight) {
        nextFruitY = 20;
      }

      basketRef.current = nextBasket;
      fruitYRef.current = nextFruitY;
      setBasket(nextBasket);
      setFruitY(nextFruitY);
      draw(nextBasket, nextFruitY);
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [running, onSuccess]);

  const moveBasket = (direction: -1 | 1) => {
    const next = Math.max(0, Math.min(canvasWidth - basketWidth, basketRef.current + direction * 30));
    basketRef.current = next;
    setBasket(next);
  };

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} tabIndex={0} className="w-full rounded-3xl border border-white/10 outline-none focus:ring-2 focus:ring-emerald-300" aria-label="接水果 Canvas 游戏，使用左右方向键移动篮子" />
      <div className="flex flex-wrap gap-3">
        <button onClick={() => moveBasket(-1)} className="rounded-2xl bg-white/10 px-5 py-3 font-bold"><RubyText>左移</RubyText></button>
        <button onClick={() => moveBasket(1)} className="rounded-2xl bg-white/10 px-5 py-3 font-bold"><RubyText>右移</RubyText></button>
        <button onClick={() => setRunning((value) => !value)} className="rounded-2xl bg-white px-5 py-3 font-bold text-slate-950"><RubyText>{running ? "暂停" : "开始游戏"}</RubyText></button>
      </div>
      <p className="text-slate-300"><RubyText>分数变量</RubyText> score = {score}<RubyText>，接到</RubyText> 3 <RubyText>个水果完成挑战。可用方向键或</RubyText> A/D <RubyText>控制篮子。</RubyText></p>
    </div>
  );
}
