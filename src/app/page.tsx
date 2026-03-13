"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AI Coding Arena
        </h1>
        <p className="text-xl text-gray-400 mb-2">智评台</p>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
          新一代 AI Coding 评测平台 — 同时测试候选人的真实编码能力与高效使用 AI 的能力
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/candidate/test"
            className="group p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)] hover:border-blue-500/50 transition-all"
          >
            <div className="text-4xl mb-4">👨‍💻</div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
              候选人端
            </h2>
            <p className="text-gray-500 text-sm">
              进入测试环境，完成编码挑战
            </p>
          </Link>

          <Link
            href="/interviewer"
            className="group p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)] hover:border-green-500/50 transition-all"
          >
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">
              面试官端
            </h2>
            <p className="text-gray-500 text-sm">
              查看评分结果，回放测试过程
            </p>
          </Link>

          <Link
            href="/admin"
            className="group p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)] hover:border-purple-500/50 transition-all"
          >
            <div className="text-4xl mb-4">⚙️</div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
              管理端
            </h2>
            <p className="text-gray-500 text-sm">
              管理题目、配置评分标准
            </p>
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-4 max-w-3xl mx-auto">
          {[
            { label: "独立 Coding", icon: "🧠", color: "text-blue-400" },
            { label: "AI 提效", icon: "⚡", color: "text-yellow-400" },
            { label: "AI 批判", icon: "🔍", color: "text-red-400" },
            { label: "端到端", icon: "🔗", color: "text-green-400" },
            { label: "跨领域", icon: "🌐", color: "text-purple-400" },
          ].map((dim) => (
            <div key={dim.label} className="text-center">
              <div className="text-2xl mb-1">{dim.icon}</div>
              <div className={`text-xs ${dim.color}`}>{dim.label}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-xs mt-4">5 维度量化评估体系</p>
      </div>
    </div>
  );
}
