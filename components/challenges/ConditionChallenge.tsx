"use client";

import { useState } from "react";
import { RubyText } from "@/components/RubyText";

export function ConditionChallenge({ onSuccess }: { onSuccess: () => void }) {
  const [condition, setCondition] = useState("下雨");
  const [action, setAction] = useState("带雨伞");
  const [message, setMessage] = useState("规则正确：如果下雨，就带雨伞。");
  const ok = condition === "下雨" && action === "带雨伞";

  const check = () => {
    setMessage(ok ? "规则正确：如果下雨，就带雨伞。" : "想想天气和动作是否匹配。");
    if (ok) onSuccess();
  };

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-slate-950/60 p-6 text-center">
        <p className="text-5xl">🌧️</p>
        <p className="mt-3 text-slate-300"><RubyText>小猫要出门，天空正在下雨。应该建立哪条规则？</RubyText></p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-bold text-slate-300"><RubyText>如果</RubyText>
            <select value={condition} onChange={(e) => { setCondition(e.target.value); setMessage("选择已更新，点击检查规则。"); }} className="w-full rounded-2xl bg-white/10 p-3 text-white">
            <option className="text-slate-950" value="下雨">下雨 (xià yǔ)</option>
            <option className="text-slate-950" value="天黑">天黑 (tiān hēi)</option>
            <option className="text-slate-950" value="饿了">饿了 (è le)</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-bold text-slate-300"><RubyText>就</RubyText>
            <select value={action} onChange={(e) => { setAction(e.target.value); setMessage("选择已更新，点击检查规则。"); }} className="w-full rounded-2xl bg-white/10 p-3 text-white">
            <option className="text-slate-950" value="打开台灯">打开台灯 (dǎ kāi tái dēng)</option>
            <option className="text-slate-950" value="带雨伞">带雨伞 (dài yǔ sǎn)</option>
            <option className="text-slate-950" value="吃点心">吃点心 (chī diǎn xīn)</option>
          </select>
        </label>
      </div>
      <button onClick={check} className="rounded-2xl bg-white px-5 py-3 font-bold text-slate-950"><RubyText>检查规则</RubyText></button>
      <p className={ok ? "text-emerald-200" : "text-slate-300"}><RubyText>{message}</RubyText></p>
    </div>
  );
}
