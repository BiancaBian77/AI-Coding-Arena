import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getInterviewerSidebar } from '../config/sidebarConfig';
import mockCandidates, { getScoreColor, getStatusStyle } from '../data/mockCandidates';

const sidebarItems = getInterviewerSidebar('/interviewer');

export default function InterviewerDashboard() {
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const total = mockCandidates.length;
    const passed = mockCandidates.filter(c => c.status === '已通过').length;
    const pending = mockCandidates.filter(c => c.status === '待评估').length;
    const avgScore = Math.round(mockCandidates.reduce((s, c) => s + c.overallScore, 0) / total);
    return { total, passed, pending, avgScore };
  }, []);

  const recentCandidates = mockCandidates.slice(0, 5);

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="px-8 py-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">总览</h1>
        <p className="text-sm text-gray-500 mb-6">欢迎回来，这是您的评测平台概览</p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Users size={20} />} label="候选人总数" value={stats.total} suffix="人" color="indigo" />
          <StatCard icon={<CheckCircle size={20} />} label="已通过" value={stats.passed} suffix="人" color="emerald" />
          <StatCard icon={<Clock size={20} />} label="待评估" value={stats.pending} suffix="人" color="amber" />
          <StatCard icon={<TrendingUp size={20} />} label="平均得分" value={stats.avgScore} suffix="分" color="blue" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Recent candidates */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">最近候选人</h2>
              <button
                onClick={() => navigate('/interviewer/candidates')}
                className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                查看全部 <ChevronRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {recentCandidates.map(c => {
                const color = getScoreColor(c.overallScore);
                return (
                  <div
                    key={c.id}
                    onClick={() => navigate(`/interviewer/candidate/${c.id}`)}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-xs">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">{c.name}</span>
                        <span className="text-xs text-gray-400 ml-2">{c.position}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {c.violations?.total > 2 && (
                        <span className="flex items-center gap-1 text-xs text-red-500">
                          <ShieldAlert size={12} /> {c.violations.total}
                        </span>
                      )}
                      <span className={`text-sm font-bold ${color.text}`}>{c.overallScore}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusStyle(c.status)}`}>{c.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">快捷操作</h2>
              <div className="space-y-2">
                <QuickAction label="创建新岗位" desc="设置岗位并设计题目" onClick={() => navigate('/interviewer/positions')} />
                <QuickAction label="邀请候选人" desc="发送测试邀请链接" onClick={() => navigate('/interviewer/positions/1/invite')} />
                <QuickAction label="查看分析报告" desc="评测数据汇总与趋势" onClick={() => navigate('/interviewer/analytics')} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-5 text-white shadow-sm">
              <h3 className="text-sm font-semibold mb-2">AI 智能出题</h3>
              <p className="text-xs text-indigo-200 mb-4">根据岗位要求和候选人水位，AI 自动生成差异化评测题目</p>
              <button
                onClick={() => navigate('/interviewer/position/1/test-design')}
                className="flex items-center gap-1 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors"
              >
                开始出题 <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon, label, value, suffix, color }) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colors[color]}`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900">
        {value}<span className="text-sm font-normal text-gray-400 ml-1">{suffix}</span>
      </div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}

function QuickAction({ label, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group"
    >
      <div>
        <span className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">{label}</span>
        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
      </div>
      <ChevronRight size={14} className="text-gray-300 group-hover:text-indigo-400 transition-colors" />
    </button>
  );
}
