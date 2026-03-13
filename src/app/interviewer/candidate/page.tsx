"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import ScoreBar from "@/components/ScoreBar";
import { getMockCandidateDetail } from "@/data/mock-data";

function CandidateDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "c1";
  const data = getMockCandidateDetail(id);

  if (!data) {
    return <div className="p-8 text-center text-gray-500">候选人不存在</div>;
  }

  const { candidate, aiConversations, aiStats } = data;
  const scores = candidate.scores!;
  const dims = scores.dimensions;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/interviewer" className="text-gray-500 text-sm hover:text-gray-300 mb-4 inline-block">
          &larr; 返回候选人列表
        </Link>

        {/* Header */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{candidate.name}</h1>
              <p className="text-gray-400">{candidate.position} · 测试时间：{candidate.testDate}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400">{scores.overall}</div>
              <div className="text-gray-500 text-sm">综合得分</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left column - Scores */}
          <div className="col-span-2 space-y-6">
            {/* Score overview */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">📊 五维度评分</h2>
              <ScoreBar label={`🧠 ${dims.independentCoding.label} (${dims.independentCoding.weight * 100}%)`} score={dims.independentCoding.score} maxScore={dims.independentCoding.maxScore} />
              <ScoreBar label={`⚡ ${dims.aiEfficiency.label} (${dims.aiEfficiency.weight * 100}%)`} score={dims.aiEfficiency.score} maxScore={dims.aiEfficiency.maxScore} />
              <ScoreBar label={`🔍 ${dims.aiCritical.label} (${dims.aiCritical.weight * 100}%)`} score={dims.aiCritical.score} maxScore={dims.aiCritical.maxScore} />
              <ScoreBar label={`🔗 ${dims.endToEnd.label} (${dims.endToEnd.weight * 100}%)`} score={dims.endToEnd.score} maxScore={dims.endToEnd.maxScore} />
              <ScoreBar label={`🌐 ${dims.crossDomain.label} (${dims.crossDomain.weight * 100}%)`} score={dims.crossDomain.score} maxScore={dims.crossDomain.maxScore} />
            </div>

            {/* Score details */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">📝 评分细节</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.values(dims).map((dim) => (
                  <div key={dim.label} className="border border-[var(--border)] rounded-lg p-4">
                    <h3 className="font-semibold text-sm mb-2">{dim.label}</h3>
                    <ul className="space-y-1">
                      {dim.details.map((d, i) => (
                        <li key={i} className="text-xs text-gray-400 flex items-start gap-1">
                          <span className="text-gray-600 mt-0.5">•</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Conversation playback */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">💬 AI 对话回放</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {aiConversations.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      msg.role === "user" ? "bg-blue-900/50 border border-blue-800" : "bg-gray-800 border border-gray-700"
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium">{msg.role === "user" ? "候选人" : "AI 助手"}</span>
                        {msg.category && (
                          <span className="text-xs bg-gray-700 px-1.5 py-0.5 rounded">{msg.category}</span>
                        )}
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                      </div>
                      <p className="text-gray-300">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Stats & Actions */}
          <div className="space-y-6">
            {/* AI Stats */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">🤖 AI 使用统计</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">总对话轮数</div>
                  <div className="text-2xl font-bold">{aiStats.totalConversations}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2">对话分类</div>
                  {Object.entries(aiStats.categories).map(([cat, count]) => (
                    <div key={cat} className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{cat === "architecture" ? "架构设计" : cat === "debug" ? "调试" : "优化"}</span>
                      <span className="text-gray-400">{count} 轮</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm text-gray-400">AI 建议采纳率</div>
                  <div className="text-xl font-bold text-blue-400">{(aiStats.adoptionRate * 100).toFixed(0)}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">AI 错误被候选人纠正</div>
                  <div className="text-xl font-bold text-green-400">{aiStats.candidateCorrections} 次</div>
                </div>
              </div>
            </div>

            {/* Process timeline */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">⏱️ 过程时间线</h2>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-700" />
                {data.codeSnapshots.map((snap, i) => (
                  <div key={i} className="flex gap-4 mb-4 relative">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs z-10">
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{snap.event}</div>
                      <div className="text-xs text-gray-500">{snap.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review actions */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">✅ 人工复核</h2>
              <div className="space-y-3">
                <button className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-500 text-sm font-medium transition-colors">
                  通过
                </button>
                <button className="w-full py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-sm font-medium transition-colors">
                  待定
                </button>
                <button className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm font-medium transition-colors">
                  拒绝
                </button>
                <textarea
                  placeholder="添加评审备注..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm resize-none h-20 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CandidateDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">加载中...</div>}>
      <CandidateDetailContent />
    </Suspense>
  );
}
