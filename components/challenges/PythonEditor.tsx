"use client";

import { useState } from "react";
import { RubyText } from "@/components/RubyText";

export function PythonEditor({ onSuccess }: { onSuccess: () => void }) {
  const [code, setCode] = useState('name = "小星"\nscore = 10\nprint("你好", name)\nprint("分数", score)');
  const [output, setOutput] = useState("等待运行...");

  const run = () => {
    const lines = code.split("\n");
    const env: Record<string, string> = {};
    const result: string[] = [];
    const errors: string[] = [];
    lines.forEach((rawLine, index) => {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) return;
      const assign = line.match(/^(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^#\n]+))$/);
      const print = line.match(/^print\((.*)\)$/);
      if (assign) {
        env[assign[1]] = (assign[2] ?? assign[3] ?? assign[4]).trim();
        return;
      }
      if (print) {
        const parts = print[1].split(",").map((part) => part.trim().replace(/^(["'])(.*)\1$/, "$2"));
        result.push(parts.map((part) => env[part] ?? part).join(" "));
        return;
      }
      errors.push(`第 ${index + 1} 行暂不支持：${line}`);
    });
    setOutput(errors.length > 0 ? errors.join("\n") : result.join("\n") || "没有可输出的内容，请试试 print(...)");
    if (errors.length === 0 && result.length > 0) onSuccess();
  };

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <textarea value={code} onChange={(e) => setCode(e.target.value)} className="min-h-64 rounded-3xl bg-slate-950 p-5 font-mono text-sm text-emerald-100 outline-none ring-1 ring-white/10 focus:ring-amber-300" />
      <div className="rounded-3xl bg-slate-950 p-5">
        <p className="mb-3 font-bold text-slate-300"><RubyText>运行结果</RubyText></p>
        <pre className="whitespace-pre-wrap text-emerald-200"><RubyText>{output}</RubyText></pre>
      </div>
      <button onClick={run} className="rounded-2xl bg-white px-5 py-3 font-bold text-slate-950 md:w-fit"><RubyText>运行代码</RubyText></button>
    </div>
  );
}
