import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeSpark Kids | 儿童编程启蒙",
  description: "面向儿童的五阶段互动编程启蒙学习网站",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
