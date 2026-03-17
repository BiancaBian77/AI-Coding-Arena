import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  TrendingUp,
  CheckCircle,
  Clock,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import mockCandidates, {
  scoreLabels,
  getScoreColor,
  getStatusStyle,
} from '../data/mockCandidates';

const sidebarItems = [
  { icon: LayoutDashboard, label: '总览', path: '/interviewer', active: true },
  { icon: Users, label: '候选人', path: '/interviewer', active: false },
  { icon: BarChart3, label: '分析报告', path: '/interviewer', active: false },
  { icon: Settings, label: '设置', path: '/interviewer', active: false },
];

const filterTabs = [
  { key: 'all', label: '全部' },
  { key: '待评估', label: '待评估' },
  { key: '已通过', label: '已通过' },
  { key: '已拒绝', label: '已拒绝' },
];

export default function InterviewerDashboard() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const stats = useMemo(() => {
    const total = mockCandidates.length;
    const completed = mockCandidates.filter(
      (c) => c.status !== '待评估'
    ).length;
    const avgScore = Math.round(
      mockCandidates.reduce((sum, c) => sum + c.overallScore, 0) / total
    );
    return { total, completed, avgScore, timeSaved: '12.5' };
  }, []);

  const tabCounts = useMemo(() => {
    const counts = { all: mockCandidates.length };
    mockCandidates.forEach((c) => {
      counts[c.status] = (counts[c.status] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">候选人管理</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              管理和评估所有候选人的测试结果
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm">
            <Download size={16} />
            导出数据
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<Users size={20} />}
            label="候选人总数"
            value={stats.total}
            suffix="人"
            color="indigo"
          />
          <StatCard
            icon={<CheckCircle size={20} />}
            label="已完成评估"
            value={stats.completed}
            suffix="人"
            color="emerald"
          />
          <StatCard
            icon={<TrendingUp size={20} />}
            label="平均得分"
            value={stats.avgScore}
            suffix="分"
            color="blue"
          />
          <StatCard
            icon={<Clock size={20} />}
            label="节省评估时间"
            value={stats.timeSaved}
            suffix="小时"
            color="amber"
          />
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between flex-wrap gap-4 border-b border-gray-100">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveFilter(tab.key);
                    setCurrentPage(1);
                  }}
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
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="搜索候选人或职位..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 w-60 transition-all"
              />
            </div>
          </div>

          {/* Table */}
          {filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3">候选人</th>
                    <th className="px-6 py-3">职位</th>
                    <th className="px-6 py-3">测试日期</th>
                    <th className="px-6 py-3">综合得分</th>
                    <th className="px-6 py-3">各维度</th>
                    <th className="px-6 py-3">状态</th>
                    <th className="px-6 py-3">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paged.map((candidate) => {
                    const scoreColor = getScoreColor(candidate.overallScore);
                    const statusClass = getStatusStyle(candidate.status);
                    return (
                      <tr
                        key={candidate.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* Name + Avatar */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm flex-shrink-0">
                              {candidate.name.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {candidate.name}
                            </span>
                          </div>
                        </td>

                        {/* Position */}
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">
                            {candidate.position}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">
                            {candidate.date}
                          </span>
                        </td>

                        {/* Score */}
                        <td className="px-6 py-4">
                          <span
                            className={`text-lg font-bold ${scoreColor.text}`}
                          >
                            {candidate.overallScore}
                          </span>
                        </td>

                        {/* Mini bars */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 w-32">
                            {Object.entries(candidate.scores).map(
                              ([key, value]) => {
                                const c = getScoreColor(value);
                                return (
                                  <div
                                    key={key}
                                    className="flex-1"
                                    title={`${scoreLabels[key]}: ${value}`}
                                  >
                                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                                      <div
                                        className={`h-full rounded-full ${c.bg}`}
                                        style={{ width: `${value}%` }}
                                      />
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full border ${statusClass}`}
                          >
                            {candidate.status}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              navigate(
                                `/interviewer/candidate/${candidate.id}`
                              )
                            }
                            className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                          >
                            <Eye size={14} />
                            查看详情
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-gray-300 mb-3">
                <Users size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500">暂无匹配的候选人</p>
              <p className="text-gray-400 text-sm mt-1">
                请尝试调整筛选条件或搜索关键词
              </p>
            </div>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                共 {filtered.length} 条记录，第 {currentPage}/{totalPages} 页
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                  disabled={currentPage <= 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage >= totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
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
