import { Link } from 'react-router-dom';
import {
  Zap,
  Bot,
  BarChart3,
  Code2,
  Brain,
  Layers,
  Globe,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI 原生评测',
    desc: '允许使用 AI，评估真实的人机协作能力，告别传统 LeetCode 式面试',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: BarChart3,
    title: '多维度能力画像',
    desc: '五维评分体系，360° 能力画像，全面了解候选人技术水平',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Zap,
    title: '智能面试提效',
    desc: 'AI 自动分析评分，减少 80% 面试时间，让技术招聘更高效',
    color: 'bg-amber-50 text-amber-600',
  },
];

const steps = [
  { num: '1', title: '创建评测', desc: '选择题目模板或自定义评测方案' },
  { num: '2', title: '候选人作答', desc: '在 AI 辅助的 IDE 中完成编码任务' },
  { num: '3', title: '智能分析', desc: 'AI 自动生成多维评分报告' },
];

const dimensions = [
  { icon: Code2, label: '独立 Coding', desc: '无 AI 辅助的基础编码能力', score: 85, color: 'bg-indigo-500' },
  { icon: Bot, label: 'AI 提效', desc: '利用 AI 工具提升开发效率', score: 92, color: 'bg-blue-500' },
  { icon: Brain, label: 'AI 批判', desc: '对 AI 输出的审查与纠错能力', score: 78, color: 'bg-violet-500' },
  { icon: Layers, label: '端到端交付', desc: '从需求到部署的全链路交付', score: 88, color: 'bg-emerald-500' },
  { icon: Globe, label: '跨领域能力', desc: '前后端、DevOps 等知识广度', score: 72, color: 'bg-amber-500' },
];


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Sticky Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">⚡</span>
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              AI Coding Arena
            </span>
          </Link>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/product" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              产品介绍
            </Link>
            <Link to="/assessment" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              评测体系
            </Link>
          </div>

          {/* Right button */}
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-sm"
          >
            企业登录
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
            <Zap size={14} />
            新一代技术评测平台
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            AI 时代的
            <span className="text-indigo-600">技术评测平台</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            五维 AI 原生评测体系，真实衡量候选人的编码能力与 AI 协作水平。
            <br className="hidden sm:block" />
            告别传统刷题面试，拥抱智能化技术招聘。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/login"
              className="btn-primary text-base px-8 py-3.5"
            >
              候选人入口
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/interviewer/login"
              className="btn-primary text-base px-8 py-3.5"
            >
              面试官入口
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* IDE Mockup */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-2xl p-1.5 shadow-2xl shadow-gray-400/20">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center text-xs text-gray-500 font-mono">
                  AI Coding Arena — 技术评测
                </div>
              </div>
              {/* 3 panes */}
              <div className="flex gap-1 px-1 pb-1">
                <div className="flex-[2] bg-gray-800 rounded-lg h-48 p-4">
                  <div className="text-xs text-gray-500 font-mono mb-3">题目描述</div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-700 rounded w-3/4" />
                    <div className="h-2 bg-gray-700 rounded w-full" />
                    <div className="h-2 bg-gray-700 rounded w-5/6" />
                    <div className="h-2 bg-gray-700 rounded w-2/3" />
                  </div>
                </div>
                <div className="flex-[3] bg-gray-800 rounded-lg h-48 p-4">
                  <div className="text-xs text-gray-500 font-mono mb-3">代码编辑器</div>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="h-2 bg-purple-500/30 rounded w-12" />
                      <div className="h-2 bg-blue-500/30 rounded w-20" />
                    </div>
                    <div className="flex gap-2 pl-4">
                      <div className="h-2 bg-green-500/30 rounded w-16" />
                      <div className="h-2 bg-gray-700 rounded w-24" />
                    </div>
                    <div className="flex gap-2 pl-4">
                      <div className="h-2 bg-yellow-500/30 rounded w-10" />
                      <div className="h-2 bg-gray-700 rounded w-32" />
                    </div>
                    <div className="flex gap-2 pl-4">
                      <div className="h-2 bg-gray-700 rounded w-20" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-2 bg-purple-500/30 rounded w-8" />
                    </div>
                  </div>
                </div>
                <div className="flex-[2] bg-gray-800 rounded-lg h-48 p-4">
                  <div className="text-xs text-gray-500 font-mono mb-3">AI 助手</div>
                  <div className="space-y-2">
                    <div className="h-6 bg-indigo-500/20 rounded-lg w-full" />
                    <div className="h-2 bg-gray-700 rounded w-5/6 mt-3" />
                    <div className="h-2 bg-gray-700 rounded w-full" />
                    <div className="h-2 bg-gray-700 rounded w-4/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-sm text-gray-500">企业信赖</div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-gray-200" />
          <div>
            <div className="text-2xl font-bold text-gray-900">10,000+</div>
            <div className="text-sm text-gray-500">候选人评测</div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-gray-200" />
          <div>
            <div className="text-2xl font-bold text-gray-900">80%</div>
            <div className="text-sm text-gray-500">节省评估时间</div>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              为什么选择 AI Coding Arena
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              我们重新定义了技术评测，让 AI 时代的人才选拔更科学、更高效
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="card p-8 hover:translate-y-[-2px] transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-5`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              三步开启智能评测
            </h2>
            <p className="text-lg text-gray-500">简单流程，快速上手</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-200" />
            {steps.map((s) => (
              <div key={s.num} className="text-center relative">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-indigo-200 flex items-center justify-center mx-auto mb-6 shadow-card relative z-10">
                  <span className="text-3xl font-bold text-indigo-600">
                    {s.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5-Dimension Showcase ── */}
      <section id="dimensions" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              五维能力评估体系
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              全方位评估候选人在 AI 时代的核心技术能力
            </p>
          </div>
          <div className="space-y-6">
            {dimensions.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.label} className="card p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">
                          {d.label}
                        </h4>
                        <span className="text-sm font-bold text-gray-900">
                          {d.score}
                          <span className="text-gray-400 font-normal">
                            /100
                          </span>
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{d.desc}</p>
                    </div>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${d.color} rounded-full transition-all duration-700`}
                      style={{ width: `${d.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Simple Footer ── */}
      <footer className="border-t border-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <span className="text-sm font-semibold text-gray-900">AI Coding Arena</span>
          </div>
          <p className="text-xs text-gray-400">© 2026 AI Coding Arena</p>
        </div>
      </footer>
    </div>
  );
}
