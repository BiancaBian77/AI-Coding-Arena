import { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  FileText,
  Sliders,
  Users,
  Settings,
  CheckCircle,
  TrendingUp,
  HelpCircle,
  Plus,
  Save,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

/* ─── mock data ─── */
const mockCandidates = [
  { id: 1, name: '张三', score: 82, completed: true },
  { id: 2, name: '李四', score: 91, completed: true },
  { id: 3, name: '王五', score: 67, completed: true },
  { id: 4, name: '赵六', score: 74, completed: true },
  { id: 5, name: '孙七', score: 55, completed: true },
  { id: 6, name: '周八', score: 88, completed: true },
  { id: 7, name: '吴九', score: 93, completed: true },
  { id: 8, name: '郑十', score: 60, completed: false },
  { id: 9, name: '刘一', score: 78, completed: false },
  { id: 10, name: '陈二', score: 85, completed: true },
];

const mockQuestions = [
  {
    id: 1,
    part: 'A',
    title: '独立编码：React Todo App',
    duration: 30,
    maxPoints: 30,
    description:
      '不借助 AI 工具，独立完成一个 React Todo 应用，包括增删改查、筛选、本地存储等功能。考察候选人的基础编码能力和 React 框架熟练度。',
  },
  {
    id: 2,
    part: 'B',
    title: 'AI 协作：实时数据仪表盘',
    duration: 40,
    maxPoints: 40,
    description:
      '借助 AI 工具完成一个实时数据仪表盘，包括图表渲染、WebSocket 数据流、响应式布局。考察候选人与 AI 协作的效率和对 AI 输出的批判性审查。',
  },
  {
    id: 3,
    part: 'C',
    title: '端到端交付：全栈微服务',
    duration: 50,
    maxPoints: 30,
    description:
      '完成一个包含前后端的全栈微服务，涵盖 API 设计、数据库交互、部署配置。考察候选人端到端交付能力和跨领域知识广度。',
  },
];

const dimensionLabels = [
  '独立Coding',
  'AI提效',
  'AI批判',
  '端到端',
  '跨领域',
];

const defaultWeights = [20, 25, 25, 20, 10];
const dimensionMockAvg = [72, 81, 68, 75, 65];

/* ─── helpers ─── */
function scoreDistribution(candidates) {
  const bins = [0, 0, 0, 0, 0];
  candidates.forEach(({ score }) => {
    if (score < 60) bins[0]++;
    else if (score < 70) bins[1]++;
    else if (score < 80) bins[2]++;
    else if (score < 90) bins[3]++;
    else bins[4]++;
  });
  return bins;
}

const barColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];
const barLabels = ['0-59', '60-69', '70-79', '80-89', '90-100'];

const partColors = {
  A: 'bg-blue-100 text-blue-700',
  B: 'bg-emerald-100 text-emerald-700',
  C: 'bg-purple-100 text-purple-700',
};

/* ─── sidebar tab keys ─── */
const tabKeys = ['dashboard', 'questions', 'scoring', 'candidates', 'settings'];

/* ─── component ─── */
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [weights, setWeights] = useState([...defaultWeights]);

  const sidebarItems = [
    { icon: LayoutDashboard, label: '数据看板', path: '#', active: activeTab === 'dashboard' },
    { icon: FileText, label: '题目管理', path: '#', active: activeTab === 'questions' },
    { icon: Sliders, label: '评分配置', path: '#', active: activeTab === 'scoring' },
    { icon: Users, label: '候选人', path: '#', active: activeTab === 'candidates' },
    { icon: Settings, label: '系统设置', path: '#', active: activeTab === 'settings' },
  ];

  // Override link behavior to use tab switching
  const sidebarItemsWithClick = sidebarItems.map((item, i) => ({
    ...item,
    path: `/admin`,
    onClick: () => setActiveTab(tabKeys[i]),
  }));

  /* derived stats */
  const totalCandidates = mockCandidates.length;
  const completedCount = mockCandidates.filter((c) => c.completed).length;
  const avgScore = Math.round(
    mockCandidates.reduce((s, c) => s + c.score, 0) / totalCandidates
  );
  const questionCount = mockQuestions.length;
  const dist = useMemo(() => scoreDistribution(mockCandidates), []);
  const maxBin = Math.max(...dist, 1);
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  /* weight handler */
  const updateWeight = (idx, val) => {
    setWeights((prev) => {
      const next = [...prev];
      next[idx] = Number(val);
      return next;
    });
  };

  return (
    <DashboardLayout sidebarItems={sidebarItemsWithClick}>
      <div className="px-8 py-6">
        {/* ────────── Dashboard ────────── */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">数据看板</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                系统概览和关键指标
              </p>
            </div>

            {/* stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={<Users size={20} />}
                label="候选人总数"
                value={totalCandidates}
                color="blue"
              />
              <StatCard
                icon={<CheckCircle size={20} />}
                label="已完成"
                value={completedCount}
                color="green"
              />
              <StatCard
                icon={<TrendingUp size={20} />}
                label="平均分"
                value={avgScore}
                color="yellow"
              />
              <StatCard
                icon={<HelpCircle size={20} />}
                label="题目数量"
                value={questionCount}
                color="purple"
              />
            </div>

            {/* charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* score distribution */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-5">
                  成绩分布
                </h3>
                <div className="flex items-end gap-3 h-48">
                  {dist.map((count, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center justify-end h-full"
                    >
                      <span className="text-xs font-semibold text-gray-600 mb-1">
                        {count}
                      </span>
                      <div
                        className="w-full rounded-t-md transition-all"
                        style={{
                          height: `${(count / maxBin) * 100}%`,
                          minHeight: count > 0 ? 12 : 0,
                          backgroundColor: barColors[i],
                        }}
                      />
                      <span className="text-xs text-gray-500 mt-2">
                        {barLabels[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* dimension averages */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-5">
                  维度平均分对比
                </h3>
                <div className="space-y-4">
                  {dimensionLabels.map((dim, i) => (
                    <div key={dim} className="flex items-center gap-3">
                      <span className="w-20 text-sm text-gray-600 shrink-0">
                        {dim}
                      </span>
                      <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${dimensionMockAvg[i]}%`,
                            backgroundColor: '#4f46e5',
                          }}
                        />
                      </div>
                      <span className="w-10 text-sm font-semibold text-gray-700 text-right">
                        {dimensionMockAvg[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ────────── Questions ────────── */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">题目管理</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                管理面试题目和评分标准
              </p>
            </div>

            <div className="space-y-4">
              {mockQuestions.map((q) => (
                <div
                  key={q.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${partColors[q.part]}`}
                        >
                          Part {q.part}
                        </span>
                        <h3 className="text-base font-semibold text-gray-800">
                          {q.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {q.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 shrink-0">
                      <span className="flex items-center gap-1">
                        ⏱ {q.duration} 分钟
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-indigo-600">
                        {q.maxPoints} 分
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors text-sm font-medium">
                <Plus size={18} />
                添加题目
              </button>
            </div>
          </div>
        )}

        {/* ────────── Scoring Config ────────── */}
        {activeTab === 'scoring' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">评分配置</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                配置各评分维度的权重
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-2xl">
              <h3 className="text-sm font-semibold text-gray-800 mb-6">
                评分维度权重配置
              </h3>

              <div className="space-y-6">
                {dimensionLabels.map((dim, i) => (
                  <div key={dim}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {dim}
                      </span>
                      <span className="text-sm font-bold text-indigo-600">
                        {weights[i]}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={weights[i]}
                      onChange={(e) => updateWeight(i, e.target.value)}
                      className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-indigo-600 cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              {/* total indicator */}
              <div className="mt-8 flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
                <span className="text-sm text-gray-600">权重总计</span>
                <span
                  className={`text-lg font-bold ${
                    totalWeight === 100 ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {totalWeight}%
                  {totalWeight === 100 ? (
                    <span className="ml-2 text-xs font-normal text-green-500">
                      ✓ 配置有效
                    </span>
                  ) : (
                    <span className="ml-2 text-xs font-normal text-red-400">
                      需等于 100%
                    </span>
                  )}
                </span>
              </div>

              <button
                disabled={totalWeight !== 100}
                className={`mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-semibold transition-colors ${
                  totalWeight === 100
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Save size={16} />
                保存配置
              </button>
            </div>
          </div>
        )}

        {/* ────────── Candidates placeholder ────────── */}
        {activeTab === 'candidates' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">候选人</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                查看所有候选人信息
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    <th className="px-6 py-3">姓名</th>
                    <th className="px-6 py-3">分数</th>
                    <th className="px-6 py-3">状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockCandidates.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {c.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-semibold">
                        {c.score}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full border ${
                            c.completed
                              ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                              : 'bg-gray-100 text-gray-600 border-gray-200'
                          }`}
                        >
                          {c.completed ? '已完成' : '进行中'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ────────── Settings placeholder ────────── */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">系统设置</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                管理系统配置和偏好
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
              <Settings size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">系统设置功能即将上线</p>
              <p className="text-gray-400 text-sm mt-1">敬请期待</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ─── StatCard sub-component ─── */
const colorMap = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-500', border: 'border-blue-100' },
  green: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-500',
    border: 'border-emerald-100',
  },
  yellow: {
    bg: 'bg-amber-50',
    icon: 'text-amber-500',
    border: 'border-amber-100',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-500',
    border: 'border-purple-100',
  },
};

function StatCard({ icon, label, value, color }) {
  const c = colorMap[color] || colorMap.blue;
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition-shadow`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.bg} ${c.icon}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
