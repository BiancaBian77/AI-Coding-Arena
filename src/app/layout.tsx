import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Coding Arena - 智评台",
  description: "新一代 AI Coding 评测平台，测试候选人真实编码能力与 AI 协作效率",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
