import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  Shield,
  ShieldAlert,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getInterviewerSidebar } from '../config/sidebarConfig';
import mockCandidates, {
  scoreLabels,
  getScoreColor,
  getStatusStyle,
} from '../data/mockCandidates';

const sidebarItems = getInterviewerSidebar('/interviewer/candidates');

const filterTabs = [
  { key: 'all', label: '全部' },
  { key: '待评估', label: '待评估' },
  { key: '已通过', label: '已通过' },
  { key: '已拒绝', label: '已拒绝' },
];

export default function CandidateList() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    let list = mockCandidates;
    if (activeFilter !== 'all') list = list.filter(c => c.status === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.position.toLowerCase().includes(q));
    }
    return list;
  }, [activeFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const tabCounts = useMemo(() => {
    const counts = { all: mockCandidates.length };
    mockCandidates.forEach(c => { counts[c.status] = (counts[c.status] || 0) + 1; });
    return counts;
  }, []);

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">候选人管理</h1>
            <p className="text-sm text-gray-500 mt-0.5">管理和评估所有候选人的测试结果</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Download size={16} /> 导出数据
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {filterTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveFilter(tab.key); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeFilter === tab.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                <span className="ml-1.5 text-xs text-gray-400">({tabCounts[tab.key] || 0})</span>
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="搜索候选人..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">候选人</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">职位</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">日期</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">综合得分</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">各维度</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">反作弊</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paged.map(c => {
                const color = getScoreColor(c.overallScore);
                const v = c.violations;
                return (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => navigate(`/interviewer/candidate/${c.id}`)}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-xs flex-shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{c.position}</td>
                    <td className="px-5 py-4 text-sm text-gray-500">{c.date}</td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-bold ${color.text}`}>{c.overallScore}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        {Object.values(c.scores).map((s, i) => {
                          const sc = getScoreColor(s);
                          return <div key={i} className={`w-6 h-1.5 rounded-full ${sc.bg}`} title={`${Object.values(scoreLabels)[i]}: ${s}`} />;
                        })}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {v && v.total > 0 ? (
                        <span className={`flex items-center gap-1 text-xs font-medium ${v.total >= 5 ? 'text-red-500' : v.total >= 2 ? 'text-amber-500' : 'text-gray-400'}`}>
                          <ShieldAlert size={13} />
                          {v.total}次
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-emerald-500">
                          <Shield size={13} />
                          正常
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusStyle(c.status)}`}>{c.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                        <Eye size={13} /> 详情
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>共 {filtered.length} 位候选人</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30">
              <ChevronLeft size={16} />
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
