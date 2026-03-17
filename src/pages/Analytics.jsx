import DashboardLayout from '../components/layout/DashboardLayout';
import { getInterviewerSidebar } from '../config/sidebarConfig';
import mockCandidates, { scoreLabels, getScoreColor } from '../data/mockCandidates';
import { TrendingUp, Users, Award, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const sidebarItems = getInterviewerSidebar('/interviewer/analytics');

export default function Analytics() {
  const total = mockCandidates.length;
  const passed = mockCandidates.filter(c => c.status === '已通过').length;
  const avgScore = Math.round(mockCandidates.reduce((s, c) => s + c.overallScore, 0) / total);
  const avgViolations = (mockCandidates.reduce((s, c) => s + (c.violations?.total || 0), 0) / total).toFixed(1);

  // Score distribution
  const distribution = [
    { range: '90-100', count: mockCandidates.filter(c => c.overallScore >= 90).length, color: 'bg-emerald-500' },
    { range: '80-89', count: mockCandidates.filter(c => c.overallScore >= 80 && c.overallScore < 90).length, color: 'bg-blue-500' },
    { range: '70-79', count: mockCandidates.filter(c => c.overallScore >= 70 && c.overallScore < 80).length, color: 'bg-indigo-500' },
    { range: '60-69', count: mockCandidates.filter(c => c.overallScore >= 60 && c.overallScore < 70).length, color: 'bg-amber-500' },
    { range: '<60', count: mockCandidates.filter(c => c.overallScore < 60).length, color: 'bg-red-500' },
  ];
  const maxCount = Math.max(...distribution.map(d => d.count), 1);

  // Dimension averages
  const dims = Object.keys(scoreLabels);
  const dimAvgs = dims.map(d => ({
    key: d,
    label: scoreLabels[d],
    avg: Math.round(mockCandidates.reduce((s, c) => s + c.scores[d], 0) / total),
  }));

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="px-8 py-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">分析报告</h1>
        <p className="text-sm text-gray-500 mb-6">候选人评测数据汇总与趋势分析</p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: '平均得分', value: avgScore, icon: Award, color: 'indigo', trend: '+3.2', up: true },
            { label: '通过率', value: `${Math.round(passed/total*100)}%`, icon: TrendingUp, color: 'emerald', trend: '+5%', up: true },
            { label: '总候选人', value: total, icon: Users, color: 'blue', trend: '+12', up: true },
            { label: '平均违规', value: avgViolations, icon: Clock, color: 'amber', trend: '-0.8', up: false },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <s.icon size={18} className={`text-${s.color}-500`} />
                <span className={`flex items-center gap-0.5 text-xs font-medium ${s.up ? 'text-emerald-500' : 'text-red-500'}`}>
                  {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {s.trend}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Score Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-5">得分分布</h3>
            <div className="space-y-3">
              {distribution.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-12 text-right">{d.range}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-7 overflow-hidden relative">
                    <div
                      className={`h-full ${d.color} rounded-full transition-all duration-500 flex items-center justify-end pr-3`}
                      style={{ width: `${(d.count / maxCount) * 100}%`, minWidth: d.count > 0 ? '40px' : '0' }}
                    >
                      <span className="text-xs text-white font-semibold">{d.count}人</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dimension Averages */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-5">各维度平均分</h3>
            <div className="space-y-4">
              {dimAvgs.map(d => {
                const color = getScoreColor(d.avg);
                return (
                  <div key={d.key} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-20 text-right">{d.label}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                      <div className={`h-full ${color.bg} rounded-full transition-all duration-500 flex items-center justify-end pr-2`} style={{ width: `${d.avg}%` }}>
                        <span className="text-[10px] text-white font-semibold">{d.avg}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Usage insights */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">AI 使用趋势洞察</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-700">{Math.round(mockCandidates.reduce((s,c) => s + c.aiChat.totalRounds, 0) / total)}</div>
              <div className="text-xs text-indigo-500 mt-1">平均对话轮次</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-700">{Math.round(mockCandidates.reduce((s,c) => s + c.aiChat.adoptionRate, 0) / total)}%</div>
              <div className="text-xs text-emerald-500 mt-1">平均采纳率</div>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-700">{(mockCandidates.reduce((s,c) => s + c.aiChat.errorCorrections, 0) / total).toFixed(1)}</div>
              <div className="text-xs text-amber-500 mt-1">平均纠错次数</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
