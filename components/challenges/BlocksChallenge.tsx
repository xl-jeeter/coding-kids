"use client";

import { useState, type DragEvent } from "react";

const blocks = ["当绿旗被点击", "移动 10 步", "转向右边", "说 你好"];

export function BlocksChallenge({ onSuccess }: { onSuccess: () => void }) {
  const [program, setProgram] = useState<string[]>([]);
  const [message, setMessage] = useState("把积木拖到程序区，也可以点击添加。");

  const addBlock = (block: string) => {
    setProgram((current) => [...current, block]);
    setMessage("积木已添加，继续排列或运行程序。");
  };

  const moveBlock = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0) return;
    setProgram((current) => {
      if (from >= current.length || to >= current.length) return current;
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const insertBlock = (block: string, to: number) => {
    setProgram((current) => {
      const next = [...current];
      next.splice(to, 0, block);
      return next;
    });
    setMessage("积木已插入，可以继续拖拽排列。");
  };

  const handleProgramDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const block = event.dataTransfer.getData("application/x-block");
    if (block) addBlock(block);
  };

  const run = () => {
    const ok = program.includes("当绿旗被点击") && program.includes("移动 10 步");
    setMessage(ok ? "运行成功！角色收到绿旗后会移动。" : "至少需要“当绿旗被点击”和“移动 10 步”。");
    if (ok) onSuccess();
  };

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_1.1fr]">
      <div className="space-y-3">
        <p className="font-bold text-slate-200">积木库</p>
        {blocks.map((block) => (
          <button
            key={block}
            draggable
            onClick={() => addBlock(block)}
            onDragStart={(event) => {
              event.dataTransfer.effectAllowed = "copy";
              event.dataTransfer.setData("application/x-block", block);
            }}
            className="block w-full cursor-grab rounded-2xl bg-fuchsia-300 px-4 py-3 text-left font-black text-slate-950 active:cursor-grabbing"
          >
            {block}
          </button>
        ))}
      </div>
      <div className="rounded-3xl bg-slate-950/60 p-5" onDragOver={(event) => event.preventDefault()} onDrop={handleProgramDrop}>
        <p className="font-bold text-slate-200">程序区</p>
        <div className="mt-4 min-h-40 space-y-2">
          {program.map((block, index) => (
            <div
              key={`${block}-${index}`}
              draggable
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData("application/x-program-index", String(index));
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.stopPropagation();
                const draggedBlock = event.dataTransfer.getData("application/x-block");
                if (draggedBlock) {
                  insertBlock(draggedBlock, index);
                  return;
                }
                const from = Number(event.dataTransfer.getData("application/x-program-index"));
                if (!Number.isNaN(from)) moveBlock(from, index);
              }}
              className="cursor-grab rounded-2xl bg-white/10 px-4 py-3 active:cursor-grabbing"
            >
              {index + 1}. {block}
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={run} className="rounded-2xl bg-white px-5 py-3 font-bold text-slate-950">运行</button>
          <button onClick={() => { setProgram([]); setMessage("把积木拖到程序区，也可以点击添加。"); }} className="rounded-2xl bg-white/10 px-5 py-3 font-bold">清空</button>
        </div>
        <p className="mt-4 text-slate-300">{message}</p>
      </div>
    </div>
  );
}
