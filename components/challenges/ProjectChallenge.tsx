"use client";

import { useState } from "react";

const tasks = ["写下项目目标", "添加一个变量", "添加一个条件", "设计胜利或完成反馈"];

export function ProjectChallenge({ onSuccess }: { onSuccess: () => void }) {
  const [checked, setChecked] = useState<string[]>([]);
  const done = checked.length === tasks.length;

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-violet-400/10 p-6">
        <p className="text-4xl">🚀</p>
        <p className="mt-3 text-slate-300">像真正的创作者一样完成项目清单。全部勾选后，你就完成了本课挑战。</p>
      </div>
      {tasks.map((task) => (
        <label key={task} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 font-bold">
          <input type="checkbox" checked={checked.includes(task)} onChange={(e) => setChecked(e.target.checked ? [...checked, task] : checked.filter((item) => item !== task))} className="h-5 w-5" />
          {task}
        </label>
      ))}
      <button onClick={() => done && onSuccess()} className="rounded-2xl bg-white px-5 py-3 font-bold text-slate-950">提交项目</button>
      <p className={done ? "text-emerald-200" : "text-slate-300"}>{done ? "项目准备完成，可以展示啦！" : "继续完成项目步骤。"}</p>
    </div>
  );
}
