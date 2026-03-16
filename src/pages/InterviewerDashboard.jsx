import { useState, useMemo } from 'react';
import { Users, TrendingUp, CheckCircle, Clock, Search, SlidersHorizontal } from 'lucide-react';
import CandidateCard from '../components/interviewer/CandidateCard';
import mockCandidates from '../data/mockCandidates';

const filterTabs = [
  { key: 'all', label: '全部' },
  { key: '待评估', label: '待评估' },
  { key: '已通过', label: '已通过' },
  { key: '已拒绝', label: '已拒绝' },
];

export default function InterviewerDashboard() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let list = mockCandidates;
    if (activeFilter !== 'all') {
      list = list.filter((c) => c.status === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.position.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = mockCandidates.length;
    const avgScore = Math.round(
      mockCandidates.reduce((sum, c) => sum + c.overallScore, 0) / total
    );
    const passed = mockCandidates.filter((c) => c.status === '已通过').length;
    const passRate = Math.round((passed / total) * 100);
    return { total, avgScore, passRate, timeSaved: '12.5' };
  }, []);

  const tabCounts = useMemo(() => {
    const counts = { all: mockCandidates.length };
    mockCandidates.forEach((c) => {
      counts[c.status] = (counts[c.status] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CA</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Coding Arena
                <span className="text-indigo-600 ml-1.5 font-semibold">
                  &middot; 面试官端
                </span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">欢迎回来，面试官</span>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
              M
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Users size={20} />}
            label="候选人总数"
            value={stats.total}
            suffix="人"
            color="indigo"
          />
          <StatCard
            icon={<TrendingUp size={20} />}
            label="平均得分"
            value={stats.avgScore}
            suffix="分"
            color="blue"
          />
          <StatCard
            icon={<CheckCircle size={20} />}
            label="通过率"
            value={stats.passRate}
            suffix="%"
            color="emerald"
          />
          <StatCard
            icon={<Clock size={20} />}
            label="节省评估时间"
            value={stats.timeSaved}
            suffix="小时"
            color="amber"
          />
        </div>

        {/* Filter & search bar */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="px-6 py-4 flex items-center justify-between flex-wrap gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeFilter === tab.key
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-1.5 text-xs ${
                      activeFilter === tab.key
                        ? 'text-indigo-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {tabCounts[tab.key] || 0}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="搜索候选人..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 w-56 transition-all"
                />
              </div>
              <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">
                <SlidersHorizontal size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Candidate list */}
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="text-gray-300 mb-3">
                <Users size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500">暂无匹配的候选人</p>
              <p className="text-gray-400 text-sm mt-1">
                请尝试调整筛选条件或搜索关键词
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-gray-400">
          共 {filtered.length} 位候选人 &middot; 数据更新于 2026-03-16 14:30
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, suffix, color }) {
  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-600',
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}
        >
          {icon}
        </div>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="text-sm text-gray-400">{suffix}</span>
      </div>
    </div>
  );
}
