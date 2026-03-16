import { useNavigate } from 'react-router-dom';
import { UserCheck, Monitor, Settings, Zap } from 'lucide-react';

const dimensions = [
  { label: '独立Coding', pct: 20, desc: '无 AI 辅助的基础编码能力' },
  { label: 'AI提效', pct: 25, desc: '利用 AI 工具提升开发效率' },
  { label: 'AI批判', pct: 25, desc: '对 AI 输出的审查与纠错能力' },
  { label: '端到端', pct: 20, desc: '从需求到部署的全链路交付' },
  { label: '跨领域', pct: 10, desc: '前后端、DevOps 等知识广度' },
];

const links = [
  {
    to: '/login',
    icon: UserCheck,
    title: '候选人端',
    desc: '参加编程评测，完成三部分题目',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    hover: 'hover:border-blue-300',
  },
  {
    to: '/interviewer',
    icon: Monitor,
    title: '面试官端',
    desc: '查看候选人成绩与过程回放',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    hover: 'hover:border-emerald-300',
  },
  {
    to: '/admin',
    icon: Settings,
    title: '管理端',
    desc: '数据看板、题目管理、评分配置',
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    hover: 'hover:border-purple-300',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-10">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={28} className="text-[#4c6ef5]" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            AI Coding Arena
          </h1>
        </div>
        <p className="text-lg text-gray-500 mb-12">
          智评台 · AI时代技术评测平台
        </p>

        {/* entry cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full mb-16">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <button
                key={l.to}
                onClick={() => navigate(l.to)}
                className={`rounded-xl border-2 p-6 text-left transition-all shadow-sm hover:shadow-md ${l.color} ${l.hover}`}
              >
                <Icon size={28} className="mb-3" />
                <h2 className="text-base font-bold text-gray-800 mb-1">
                  {l.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {l.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* dimensions */}
        <div className="max-w-2xl w-full">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-center mb-5">
            五维评测体系
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {dimensions.map((d) => (
              <div
                key={d.label}
                className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm"
              >
                <p className="text-lg font-bold text-[#4c6ef5]">{d.pct}%</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">
                  {d.label}
                </p>
                <p className="text-xs text-gray-400 mt-1 leading-snug">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 AI Coding Arena — 智评台
      </footer>
    </div>
  );
}
