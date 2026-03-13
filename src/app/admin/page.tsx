"use client";

import { useState } from "react";
import Link from "next/link";
import { mockQuestions, mockCandidates } from "@/data/mock-data";

interface ScoringConfig {
  independentCoding: number;
  aiEfficiency: number;
  aiCritical: number;
  endToEnd: number;
  crossDomain: number;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"questions" | "scoring" | "dashboard">("dashboard");
  const [scoringConfig, setScoringConfig] = useState<ScoringConfig>({
    independentCoding: 20,
    aiEfficiency: 25,
    aiCritical: 25,
    endToEnd: 20,
    crossDomain: 10,
  });

  const totalWeight = Object.values(scoringConfig).reduce((a, b) => a + b, 0);

  const completedCandidates = mockCandidates.filter((c) => c.scores);
  const avgScore = completedCandidates.length > 0
    ? Math.round(completedCandidates.reduce((sum, c) => sum + (c.scores?.overall || 0), 0) / completedCandidates.length)
    : 0;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-gray-500 text-sm hover:text-gray-300 mb-4 inline-block">&larr; 返回首页</Link>
        <h1 className="text-2xl font-bold mb-2">管理后台</h1>
        <p className="text-gray-500 text-sm mb-6">题目管理、评分配置与数据看板</p>

        {/* Tabs */}
        <div className="flex gap-1 mb-6">
          {(["dashboard", "questions", "scoring"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {tab === "dashboard" ? "📊 数据看板" : tab === "questions" ? "📝 题目管理" : "⚙️ 评分配置"}
            </button>
          ))}
        </div>

        {/* Dashboard tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-blue-400">{mockCandidates.length}</div>
                <div className="text-sm text-gray-500 mt-1">总候选人数</div>
              </div>
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-green-400">{completedCandidates.length}</div>
                <div className="text-sm text-gray-500 mt-1">已完成测试</div>
              </div>
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-yellow-400">{avgScore}</div>
                <div className="text-sm text-gray-500 mt-1">平均得分</div>
              </div>
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-purple-400">{mockQuestions.length}</div>
                <div className="text-sm text-gray-500 mt-1">题目数量</div>
              </div>
            </div>

            {/* Score distribution */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">分数分布</h2>
              <div className="flex items-end gap-2 h-40">
                {[
                  { range: "0-59", count: 0, color: "bg-red-500" },
                  { range: "60-69", count: 1, color: "bg-yellow-500" },
                  { range: "70-79", count: 1, color: "bg-blue-500" },
                  { range: "80-89", count: 0, color: "bg-green-500" },
                  { range: "90-100", count: 0, color: "bg-emerald-400" },
                ].map((bucket) => (
                  <div key={bucket.range} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-full ${bucket.color} rounded-t transition-all`}
                      style={{ height: `${bucket.count ? Math.max(bucket.count * 60, 20) : 4}px` }}
                    />
                    <div className="text-xs text-gray-500 mt-2">{bucket.range}</div>
                    <div className="text-xs text-gray-400">{bucket.count} 人</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dimension comparison */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">各维度平均分对比</h2>
              {completedCandidates.length > 0 ? (
                <div className="space-y-3">
                  {(["independentCoding", "aiEfficiency", "aiCritical", "endToEnd", "crossDomain"] as const).map((dim) => {
                    const avg = Math.round(
                      completedCandidates.reduce((sum, c) => sum + (c.scores?.dimensions[dim].score || 0), 0) / completedCandidates.length
                    );
                    const label = completedCandidates[0].scores!.dimensions[dim].label;
                    return (
                      <div key={dim} className="flex items-center gap-4">
                        <span className="text-sm text-gray-400 w-28">{label}</span>
                        <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${avg}%` }} />
                        </div>
                        <span className="text-sm font-mono w-8 text-right">{avg}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">暂无数据</p>
              )}
            </div>
          </div>
        )}

        {/* Questions tab */}
        {activeTab === "questions" && (
          <div className="space-y-4">
            {mockQuestions.map((q) => (
              <div key={q.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                      Part {q.part}
                    </span>
                    <h3 className="font-semibold">{q.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{q.duration} 分钟</span>
                    <span>{q.maxScore} 分</span>
                    <button className="text-blue-400 hover:text-blue-300">编辑</button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {q.description.split("\n").filter(l => l && !l.startsWith("#") && !l.startsWith("```")).slice(0, 2).join(" ")}
                </p>
              </div>
            ))}
            <button className="w-full py-3 border-2 border-dashed border-gray-700 rounded-xl text-gray-500 hover:text-gray-300 hover:border-gray-500 transition-colors">
              + 添加新题目
            </button>
          </div>
        )}

        {/* Scoring config tab */}
        {activeTab === "scoring" && (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">评分权重配置</h2>
            <p className="text-sm text-gray-500 mb-6">
              综合得分 = 各维度得分 × 权重。总权重须为 100%。
              当前总权重：<span className={totalWeight === 100 ? "text-green-400" : "text-red-400"}>{totalWeight}%</span>
            </p>
            <div className="space-y-6">
              {([
                { key: "independentCoding" as const, label: "🧠 独立 Coding 能力", desc: "基础算法、代码规范、无 AI 辅助时的表现" },
                { key: "aiEfficiency" as const, label: "⚡ AI 提效能力", desc: "AI 使用频率、建议采纳率、效率提升比" },
                { key: "aiCritical" as const, label: "🔍 AI 批判能力", desc: "AI 错误识别、盲目采纳率、独立思考证据" },
                { key: "endToEnd" as const, label: "🔗 端到端能力", desc: "功能完整性、部署意识、测试意识" },
                { key: "crossDomain" as const, label: "🌐 跨领域能力", desc: "架构设计、性能优化、工程平衡" },
              ]).map(({ key, label, desc }) => (
                <div key={key} className="flex items-center gap-6">
                  <div className="w-64">
                    <div className="font-medium text-sm">{label}</div>
                    <div className="text-xs text-gray-500">{desc}</div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={scoringConfig[key]}
                    onChange={(e) =>
                      setScoringConfig((prev) => ({ ...prev, [key]: parseInt(e.target.value) }))
                    }
                    className="flex-1"
                  />
                  <div className="w-16 text-right">
                    <input
                      type="number"
                      value={scoringConfig[key]}
                      onChange={(e) =>
                        setScoringConfig((prev) => ({ ...prev, [key]: parseInt(e.target.value) || 0 }))
                      }
                      className="w-16 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-right focus:outline-none focus:border-blue-500"
                    />
                    <span className="text-gray-500 text-xs ml-1">%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors">
                保存配置
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
