"use client";

import { useState } from "react";

export function ConditionChallenge({ onSuccess }: { onSuccess: () => void }) {
  const [condition, setCondition] = useState("下雨");
  const [action, setAction] = useState("带雨伞");
  const ok = condition === "下雨" && action === "带雨伞";

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-slate-950/60 p-6 text-center">
        <p className="text-5xl">🌧️</p>
        <p className="mt-3 text-slate-300">小猫要出门，天空正在下雨。应该建立哪条规则？</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-bold text-slate-300">如果
          <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full rounded-2xl bg-white/10 p-3 text-white">
            <option className="text-slate-950">下雨</option>
            <option className="text-slate-950">天黑</option>
            <option className="text-slate-950">饿了</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-bold text-slate-300">就
          <select value={action} onChange={(e) => setAction(e.target.value)} className="w-full rounded-2xl bg-white/10 p-3 text-white">
            <option className="text-slate-950">打开台灯</option>
            <option className="text-slate-950">带雨伞</option>
            <option className="text-slate-950">吃点心</option>
          </select>
        </label>
      </div>
      <button onClick={() => ok && onSuccess()} className="rounded-2xl bg-white px-5 py-3 font-bold text-slate-950">检查规则</button>
      <p className={ok ? "text-emerald-200" : "text-slate-300"}>{ok ? "规则正确：如果下雨，就带雨伞。" : "想想天气和动作是否匹配。"}</p>
    </div>
  );
}
