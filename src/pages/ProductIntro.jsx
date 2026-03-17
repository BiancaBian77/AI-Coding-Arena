import { Link } from 'react-router-dom';
import {
  Zap, Bot, BarChart3, Code2, Brain, Layers, Globe, Shield,
  ArrowRight, CheckCircle, Monitor, MessageSquare, Lock,
  Sparkles, Users, Clock, FileText,
} from 'lucide-react';

export default function ProductIntro() {
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
            <span className="text-sm font-medium text-indigo-600">产品介绍</span>
            <Link to="/assessment" className="text-sm font-medium text-gray-600 hover:text-gray-900">评测体系</Link>
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
            重新定义<span className="text-indigo-600">技术面试</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            AI Coding Arena 是一个面向 AI 时代的技术评测平台。我们不禁止 AI，而是评估候选人如何与 AI 协作，
            真正衡量工程师在实际工作中的生产力。
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">传统技术面试的三大痛点</h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">在 AI 工具普及的今天，传统的编码面试已经跟不上时代</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: '刷题 ≠ 实际能力', desc: '候选人通过背诵 LeetCode 答案获得高分，但入职后无法解决真实业务问题。传统题库评估的是记忆力，不是工程能力。', color: 'text-red-500 bg-red-50' },
              { icon: Clock, title: '面试流程耗时', desc: '每个候选人需要 3-5 轮技术面试，每轮 1-2 小时。对于招聘量大的团队，面试官的时间被严重挤占，影响正常工作。', color: 'text-amber-500 bg-amber-50' },
              { icon: Shield, title: 'AI 作弊难防', desc: '候选人可以在面试中偷偷使用 AI 工具，传统监控手段很难检测。禁止 AI 又与实际工作场景脱节。', color: 'text-purple-500 bg-purple-50' },
            ].map(p => (
              <div key={p.title} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className={`w-10 h-10 rounded-lg ${p.color} flex items-center justify-center mb-4`}>
                  <p.icon size={20} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">我们的解决方案</h2>
          <p className="text-gray-500 text-center mb-12">不禁止 AI，而是拥抱 AI——评估"人 + AI"的系统能力</p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Monitor, title: '三阶段评测设计', items: ['Part A · 独立编码：禁用 AI，考察基础功底', 'Part B · AI 协作开发：候选人自选 AI 模型，评估人机协作效率', 'Part C · AI 代码审查：AI 可能给错答案，考察批判性思维'] },
              { icon: BarChart3, title: '五维能力画像', items: ['独立 Coding 能力（20%）', 'AI 提效能力（25%）', 'AI 批判能力（25%）', '端到端交付能力（20%）', '跨领域能力（10%）'] },
              { icon: Sparkles, title: 'AI 智能出题', items: ['根据岗位和级别（Junior/Middle/Senior）自动生成题目', '面试官可编辑调整后发布', '已保存题库可复用，避免重复劳动'] },
              { icon: Shield, title: '智能反作弊', items: ['实时检测页面切换/离开次数', '禁止外部复制粘贴', '全程记录操作行为和 AI 对话', '面试官可查看完整行为报告'] },
            ].map(s => (
              <div key={s.title} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <s.icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{s.title}</h3>
                </div>
                <ul className="space-y-2">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform overview */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">三端协同，完整闭环</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: '候选人端', desc: '专业 IDE 环境，三阶段测试，AI 助手可选模型，倒计时管理', link: '/login', linkText: '体验候选人端' },
              { icon: BarChart3, title: '面试官端', desc: '岗位管理、智能出题、候选人邀请、五维评分、AI 对话分析、行为回放', link: '/interviewer', linkText: '体验面试官端' },
              { icon: Globe, title: '管理端', desc: '数据看板、题目管理、评分权重配置、系统设置', link: '/admin', linkText: '体验管理端' },
            ].map(p => (
              <div key={p.title} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                  <p.icon size={24} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{p.desc}</p>
                <Link to={p.link} className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800">
                  {p.linkText} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">开始使用 AI Coding Arena</h2>
          <p className="text-indigo-200 mb-8">免费创建账户，体验 AI 时代的技术评测</p>
          <Link to="/login" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 shadow-lg">
            免费开始 <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
