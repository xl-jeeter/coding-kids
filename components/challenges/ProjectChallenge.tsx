"use client";

import { useState } from "react";
import { RubyText } from "@/components/RubyText";

const tasks = ["写下项目目标", "添加一个变量", "添加一个条件", "设计胜利或完成反馈"];

export function ProjectChallenge({ onSuccess }: { onSuccess: () => void }) {
  const [checked, setChecked] = useState<string[]>([]);
  const [message, setMessage] = useState("继续完成项目步骤。");
  const done = checked.length === tasks.length;

  const toggleTask = (task: string, isChecked: boolean) => {
    setChecked((current) => isChecked ? [...current, task] : current.filter((item) => item !== task));
    setMessage("清单已更新，全部勾选后提交项目。");
  };

  const submit = () => {
    setMessage(done ? "项目准备完成，可以展示啦！" : "还有项目步骤没有完成。");
    if (done) onSuccess();
  };

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-violet-400/10 p-6">
        <p className="text-4xl">🚀</p>
        <p className="mt-3 text-slate-300"><RubyText>像真正的创作者一样完成项目清单。全部勾选后，你就完成了本课挑战。</RubyText></p>
      </div>
      {tasks.map((task) => (
        <label key={task} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 font-bold">
          <input type="checkbox" checked={checked.includes(task)} onChange={(e) => toggleTask(task, e.target.checked)} className="h-5 w-5" />
          <RubyText>{task}</RubyText>
        </label>
      ))}
      <button onClick={submit} className="rounded-2xl bg-white px-5 py-3 font-bold text-slate-950"><RubyText>提交项目</RubyText></button>
      <p className={done ? "text-emerald-200" : "text-slate-300"}><RubyText>{message}</RubyText></p>
    </div>
  );
}
