import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Briefcase,
  MessageSquare,
  Target,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
} from 'lucide-react';
import ScoreCard from '../components/interviewer/ScoreCard';
import ProcessReplay from '../components/interviewer/ProcessReplay';
import mockCandidates, {
  scoreLabels,
  getScoreColor,
  getScoreRating,
  getStatusStyle,
} from '../data/mockCandidates';

export default function CandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const candidate = mockCandidates.find((c) => c.id === Number(id));

  const [decision, setDecision] = useState(candidate?.status || '待评估');
  const [notes, setNotes] = useState(candidate?.notes || '');

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">候选人不存在</p>
          <button
            onClick={() => navigate('/interviewer')}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            返回仪表盘
          </button>
        </div>
      </div>
    );
  }

  const overallRating = getScoreRating(candidate.overallScore);
  const overallColor = getScoreColor(candidate.overallScore);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/interviewer')}
            className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-3 text-sm"
          >
            <ArrowLeft size={16} />
            返回候选人列表
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                {candidate.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-gray-900">
                    {candidate.name}
                  </h1>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusStyle(candidate.status)}`}
                  >
                    {candidate.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Briefcase size={14} />
                    {candidate.position}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {candidate.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Overall score */}
            <div className="text-right flex items-center gap-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">综合得分</div>
                <div className="flex items-center gap-2">
                  <span className={`text-4xl font-bold ${overallColor.text}`}>
                    {candidate.overallScore}
                  </span>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full border ${overallRating.color}`}
                  >
                    {overallRating.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Score overview */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target size={20} className="text-indigo-500" />
            能力评估详情
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(candidate.scores).map(([key, value]) => (
              <ScoreCard key={key} label={scoreLabels[key]} score={value} />
            ))}
          </div>

          {/* Score comparison bar chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              各维度得分对比
            </h3>
            <div className="space-y-4">
              {Object.entries(candidate.scores).map(([key, value]) => {
                const color = getScoreColor(value);
                return (
                  <div key={key} className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 w-24 text-right flex-shrink-0">
                      {scoreLabels[key]}
                    </span>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden relative">
                      <div
                        className={`h-full rounded-full ${color.bg} transition-all duration-700 ease-out flex items-center justify-end pr-3`}
                        style={{ width: `${value}%` }}
                      >
                        <span className="text-xs text-white font-semibold">
                          {value}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full border w-14 text-center ${getScoreRating(value).color}`}
                    >
                      {getScoreRating(value).label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Chat Summary */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare size={20} className="text-indigo-500" />
            AI 对话分析
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Stats cards */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h3 className="text-sm font-medium text-gray-700">对话统计</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-500">对话轮次</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {candidate.aiChat.totalRounds}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-500">采纳率</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {candidate.aiChat.adoptionRate}%
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-500">纠错次数</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {candidate.aiChat.errorCorrections}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-500">平均响应</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {candidate.aiChat.avgResponseTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Topics */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                讨论话题
              </h3>
              <div className="space-y-2">
                {candidate.aiChat.topics.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-sm text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI usage insight */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                AI 使用洞察
              </h3>
              <div className="space-y-3">
                <InsightBar
                  label="对话频率"
                  value={Math.min(candidate.aiChat.totalRounds * 3, 100)}
                  desc={candidate.aiChat.totalRounds > 25 ? '偏高' : candidate.aiChat.totalRounds < 15 ? '偏低' : '适中'}
                />
                <InsightBar
                  label="采纳比例"
                  value={candidate.aiChat.adoptionRate}
                  desc={candidate.aiChat.adoptionRate > 80 ? '过度依赖' : candidate.aiChat.adoptionRate < 50 ? '较少采纳' : '合理使用'}
                />
                <InsightBar
                  label="批判性思维"
                  value={Math.min(candidate.aiChat.errorCorrections * 12, 100)}
                  desc={candidate.aiChat.errorCorrections >= 3 ? '主动纠错' : candidate.aiChat.errorCorrections === 0 ? '未见纠错' : '偶有纠错'}
                />
              </div>
              <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                <p className="text-xs text-indigo-700 leading-relaxed">
                  {candidate.aiChat.adoptionRate > 80
                    ? '该候选人对 AI 建议的采纳率较高，需关注其独立思考和判断能力。'
                    : candidate.aiChat.adoptionRate < 50
                      ? '该候选人较少采纳 AI 建议，展现了较强的独立判断力。'
                      : '该候选人能较好地平衡 AI 辅助与独立思考，AI 使用模式健康。'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Replay */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={20} className="text-indigo-500" />
            编码过程回放
          </h2>
          <ProcessReplay />
        </section>

        {/* Decision section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-indigo-500" />
            面试决策
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Decision buttons */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  评估结果
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDecision('已通过')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                      decision === '已通过'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-500 hover:border-emerald-200 hover:text-emerald-600'
                    }`}
                  >
                    <CheckCircle2 size={18} />
                    通过
                  </button>
                  <button
                    onClick={() => setDecision('待评估')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                      decision === '待评估'
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-gray-200 text-gray-500 hover:border-amber-200 hover:text-amber-600'
                    }`}
                  >
                    <Clock size={18} />
                    待定
                  </button>
                  <button
                    onClick={() => setDecision('已拒绝')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                      decision === '已拒绝'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-600'
                    }`}
                  >
                    <XCircle size={18} />
                    拒绝
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  评估备注
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="请输入评估备注（可选）..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 resize-none transition-all"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={() => navigate('/interviewer')}
                className="px-5 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                取消
              </button>
              <button
                className="px-8 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                onClick={() => {
                  alert(`已提交决策: ${decision}`);
                  navigate('/interviewer');
                }}
              >
                提交评估
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function InsightBar({ label, value, desc }) {
  const color = getScoreColor(value);
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-600">{label}</span>
        <span className={`text-xs font-medium ${color.text}`}>{desc}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-full rounded-full ${color.bg} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

