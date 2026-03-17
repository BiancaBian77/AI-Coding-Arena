import { Link } from 'react-router-dom';
import {
  Code2, Bot, Brain, Layers, Globe, CheckCircle, ArrowRight,
  Lock, Sparkles, AlertTriangle, BarChart3, Target,
} from 'lucide-react';

const dimensions = [
  {
    icon: Code2, label: '独立 Coding', weight: '20%', score: 85, color: 'indigo',
    desc: '无 AI 辅助时的基础编码能力',
    detail: '在 Part A（独立编码）中测试。AI 助手完全禁用，候选人需要独立完成算法题目。',
    factors: ['测试用例通过率', '代码规范（pylint 评分）', '前10分钟无AI辅助表现', '算法复杂度达标情况'],
    rating: ['85-100 优秀：测试全通过，代码规范', '70-84 良好：80% 通过，基本规范', '60-69 合格：60% 通过', '<60 不合格：未能完成基础任务'],
  },
  {
    icon: Bot, label: 'AI 提效', weight: '25%', score: 92, color: 'blue',
    desc: '利用 AI 工具提升开发效率的能力',
    detail: '在 Part B（AI 协作开发）中测试。候选人可自选 AI 模型（GPT-4o、Claude、DeepSeek、Kimi、Qwen），评估人机协作效率。',
    factors: ['AI 对话轮次合理性（20-50轮为佳）', 'AI 建议采纳率（50-80% 为健康）', '效率提升估算（节省时间比例）', 'AI 对话质量（提问精准度）'],
    rating: ['85-100 优秀：对话精准，采纳有度', '70-84 良好：基本有效利用AI', '60-69 合格：AI使用尚在探索', '<60 不合格：无法有效利用AI'],
  },
  {
    icon: Brain, label: 'AI 批判', weight: '25%', score: 78, color: 'violet',
    desc: '对 AI 输出的审查与纠错能力',
    detail: '在 Part C（AI 代码审查）中测试。提供一段 AI 生成的有 Bug 代码，同时 AI 助手的建议也可能包含错误。',
    factors: ['Bug 识别数量（满分 5 处）', 'Bug 解释准确性', '盲目采纳 AI 建议的比率（越低越好）', '主动纠正 AI 错误的次数'],
    rating: ['85-100 优秀：全部识别，不盲从AI', '70-84 良好：识别大部分，偶尔盲从', '60-69 合格：识别部分，需加强判断', '<60 不合格：大量盲目采纳'],
  },
  {
    icon: Layers, label: '端到端交付', weight: '20%', score: 88, color: 'emerald',
    desc: '从需求到部署的全链路交付能力',
    detail: '在 Part B 的开放项目中综合评估。考察候选人能否完整交付一个可运行的项目。',
    factors: ['功能完整性（API endpoint 数量）', '部署意识（Dockerfile/部署文档）', '测试意识（单元测试覆盖率）', '错误处理完善程度'],
    rating: ['85-100 优秀：完整交付+部署+测试', '70-84 良好：基本功能+部分文档', '60-69 合格：核心功能可运行', '<60 不合格：无法完成可运行项目'],
  },
  {
    icon: Globe, label: '跨领域能力', weight: '10%', score: 72, color: 'amber',
    desc: '架构设计、性能优化等综合技术视野',
    detail: '贯穿整个测试过程，评估候选人的架构思维、性能意识和跨领域知识运用。',
    factors: ['架构设计合理性（模块化、扩展性）', '性能优化意识（缓存、异步、并发）', '跨领域知识运用（算法+工程融合）'],
    rating: ['85-100 优秀：架构清晰，知识融会贯通', '70-84 良好：有跨界思维', '60-69 合格：主要在本领域', '<60 不合格：知识面窄'],
  },
];

const colorMap = {
  indigo: { bg: 'bg-indigo-500', light: 'bg-indigo-50', text: 'text-indigo-600' },
  blue: { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600' },
  violet: { bg: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-600' },
  emerald: { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600' },
  amber: { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600' },
};

export default function AssessmentSystem() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-lg font-bold text-gray-900">AI Coding Arena</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/product" className="text-sm font-medium text-gray-600 hover:text-gray-900">产品介绍</Link>
            <span className="text-sm font-medium text-indigo-600">评测体系</span>
          </div>
          <Link to="/login" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm">
            企业登录
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            五维<span className="text-indigo-600">能力评估</span>体系
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            我们定义了 AI 时代优秀工程师的五个核心能力维度，通过三阶段测试进行全方位评估。
            综合得分公式：<code className="text-sm bg-indigo-50 text-indigo-700 px-2 py-1 rounded">独立Coding×20% + AI提效×25% + AI批判×25% + 端到端×20% + 跨领域×10%</code>
          </p>
        </div>
      </section>

      {/* Test structure */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">三阶段测试结构</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: 'Part A · 独立编码', time: '40 分钟 · 40 分', color: 'bg-red-50 text-red-600', desc: 'AI 助手完全禁用。候选人独立完成算法题，考察基础编码功底、算法思维和代码质量。', badge: 'AI 禁用', badgeColor: 'bg-red-100 text-red-700' },
              { icon: Sparkles, title: 'Part B · AI 协作开发', time: '40 分钟 · 35 分', color: 'bg-indigo-50 text-indigo-600', desc: '候选人自选 AI 模型（GPT-4o/Claude/DeepSeek/Kimi/Qwen），完成开放项目。评估人机协作效率和工程交付能力。', badge: '可选模型', badgeColor: 'bg-indigo-100 text-indigo-700' },
              { icon: AlertTriangle, title: 'Part C · AI 代码审查', time: '20 分钟 · 25 分', color: 'bg-amber-50 text-amber-600', desc: 'AI 助手可用但可能给出错误建议。候选人需识别 AI 生成代码中的 Bug，并判断 AI 建议的可靠性。', badge: 'AI 可能出错', badgeColor: 'bg-amber-100 text-amber-700' },
            ].map(p => (
              <div key={p.title} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className={`w-10 h-10 rounded-lg ${p.color} flex items-center justify-center mb-4`}>
                  <p.icon size={20} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{p.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-gray-400">{p.time}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${p.badgeColor}`}>{p.badge}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Dimensions detail */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">五个评估维度详解</h2>
          <p className="text-gray-500 text-center mb-12">每个维度都有明确的评分因子和等级标准</p>

          <div className="space-y-8">
            {dimensions.map(d => {
              const c = colorMap[d.color];
              const Icon = d.icon;
              return (
                <div key={d.label} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${c.light} ${c.text} flex items-center justify-center`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-900">{d.label}</h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.light} ${c.text}`}>权重 {d.weight}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{d.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-3xl font-bold ${c.text}`}>{d.score}</span>
                      <span className="text-gray-400 text-sm">/100</span>
                    </div>
                  </div>

                  {/* Score bar */}
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-5">
                    <div className={`h-full ${c.bg} rounded-full`} style={{ width: `${d.score}%` }} />
                  </div>

                  {/* Detail */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{d.detail}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Factors */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">评分因子</h4>
                      <ul className="space-y-2">
                        {d.factors.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <Target size={13} className={`${c.text} mt-0.5 flex-shrink-0`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Rating */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">等级标准</h4>
                      <ul className="space-y-2">
                        {d.rating.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                              i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-amber-500' : 'bg-red-500'
                            }`} />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">体验五维评测</h2>
          <p className="text-indigo-200 mb-8">注册后即可创建评测，体验完整的五维能力评估流程</p>
          <Link to="/login" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 shadow-lg">
            开始使用 <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
