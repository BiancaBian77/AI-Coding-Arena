"use client";

import Link from "next/link";
import { mockCandidates } from "@/data/mock-data";

function getStatusBadge(status: string) {
  const map: Record<string, { label: string; color: string }> = {
    pending: { label: "待测试", color: "bg-gray-600" },
    in_progress: { label: "测试中", color: "bg-yellow-600" },
    completed: { label: "已完成", color: "bg-green-600" },
    reviewed: { label: "已评审", color: "bg-blue-600" },
  };
  const info = map[status] || map.pending;
  return <span className={`text-xs px-2 py-0.5 rounded ${info.color}`}>{info.label}</span>;
}

function getScoreColor(score: number) {
  if (score >= 85) return "text-green-400";
  if (score >= 70) return "text-blue-400";
  if (score >= 60) return "text-yellow-400";
  return "text-red-400";
}

export default function InterviewerPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="text-gray-500 text-sm hover:text-gray-300 mb-2 inline-block">&larr; 返回首页</Link>
            <h1 className="text-2xl font-bold">面试官工作台</h1>
            <p className="text-gray-500 text-sm mt-1">查看候选人评测结果与过程回放</p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-2 text-center">
              <div className="text-2xl font-bold text-blue-400">{mockCandidates.length}</div>
              <div className="text-gray-500">总候选人</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-2 text-center">
              <div className="text-2xl font-bold text-green-400">{mockCandidates.filter(c => c.status === "completed").length}</div>
              <div className="text-gray-500">已完成</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-2 text-center">
              <div className="text-2xl font-bold text-yellow-400">{mockCandidates.filter(c => c.status === "in_progress").length}</div>
              <div className="text-gray-500">进行中</div>
            </div>
          </div>
        </div>

        {/* Candidate list */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] text-gray-400 text-sm">
                <th className="text-left p-4">候选人</th>
                <th className="text-left p-4">岗位</th>
                <th className="text-left p-4">测试时间</th>
                <th className="text-left p-4">状态</th>
                <th className="text-left p-4">综合得分</th>
                <th className="text-left p-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {mockCandidates.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-[var(--border)] hover:bg-[var(--card-hover)] transition-colors"
                >
                  <td className="p-4">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.email}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{c.position}</td>
                  <td className="p-4 text-sm text-gray-400">{c.testDate}</td>
                  <td className="p-4">{getStatusBadge(c.status)}</td>
                  <td className="p-4">
                    {c.scores ? (
                      <span className={`text-lg font-bold ${getScoreColor(c.scores.overall)}`}>
                        {c.scores.overall}
                      </span>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>
                  <td className="p-4">
                    {c.scores ? (
                      <Link
                        href={`/interviewer/candidate?id=${c.id}`}
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        查看详情 &rarr;
                      </Link>
                    ) : (
                      <span className="text-gray-600 text-sm">等待完成</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
