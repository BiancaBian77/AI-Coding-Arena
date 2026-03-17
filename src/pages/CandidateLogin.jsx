import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Shield,
  Bot,
  CheckCircle,
  ChevronRight,
  Eye,
  Code2,
  Sparkles,
  Brain,
} from 'lucide-react';

export default function CandidateLogin() {
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (!agreed || !name.trim() || !email.trim()) return;
    navigate('/test');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Left Panel ── */}
      <div className="lg:w-[45%] bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white relative overflow-hidden flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-0">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-300/40 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-indigo-300/30 rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-indigo-200/30 rounded-full" />

        <div className="relative z-10 max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold tracking-tight">
              AI Coding Arena
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
            展示你的
            <br />
            AI 编程实力
          </h1>
          <p className="text-indigo-200 text-lg mb-10 leading-relaxed">
            全新的 AI 原生编程评测，让你的技术能力被真正看见
          </p>

          {/* Bullet points */}
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                <Code2 size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">真实编码环境</h3>
                <p className="text-sm text-indigo-200 leading-relaxed">
                  在专业 IDE 中完成编码任务，支持多种编程语言
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">AI 助手加持</h3>
                <p className="text-sm text-indigo-200 leading-relaxed">
                  自由使用 AI 工具，展示你的人机协作能力
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                <Brain size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">五维能力评估</h3>
                <p className="text-sm text-indigo-200 leading-relaxed">
                  多维度评估体系，全面展现你的技术深度与广度
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="lg:w-[55%] bg-white flex items-center justify-center px-6 sm:px-12 lg:px-16 py-12 lg:py-0">
        <div className="w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            开始技术评测
          </h2>
          <p className="text-gray-500 mb-8">请填写信息并阅读评测说明</p>

          {/* Name + Email inputs */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                姓名
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入你的姓名"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入你的邮箱"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
          </div>

          {/* Test info cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Clock size={20} className="mx-auto mb-2 text-indigo-500" />
              <div className="text-sm font-semibold text-gray-800">
                100 分钟
              </div>
              <div className="text-xs text-gray-400">测试时长</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Bot size={20} className="mx-auto mb-2 text-indigo-500" />
              <div className="text-sm font-semibold text-gray-800">3 部分</div>
              <div className="text-xs text-gray-400">题目数量</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Shield size={20} className="mx-auto mb-2 text-indigo-500" />
              <div className="text-sm font-semibold text-gray-800">
                五维评分
              </div>
              <div className="text-xs text-gray-400">评分体系</div>
            </div>
          </div>

          {/* Test structure */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              测试内容
            </h3>
            <div className="space-y-2">
              {[
                {
                  part: 'A',
                  title: 'Agent 任务调度算法',
                  desc: '设计多 Agent 系统的任务调度方案',
                  tag: '算法',
                },
                {
                  part: 'B',
                  title: '构建 RAG Agent',
                  desc: '实现基于检索增强生成的问答系统',
                  tag: '开放项目',
                },
                {
                  part: 'C',
                  title: 'AI 代码审查',
                  desc: '找出并修复 AI 生成代码中的 Bug',
                  tag: 'AI 审查',
                },
              ].map((item) => (
                <div
                  key={item.part}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold shrink-0">
                    {item.part}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-400">{item.desc}</div>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-full shrink-0">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-1.5">
              <Eye size={14} />
              注意事项
            </h3>
            <ul className="space-y-1.5 text-xs text-amber-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle size={12} className="mt-0.5 shrink-0" />
                <span>AI 助手可以自由使用，与 AI 的所有交互将被记录</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={12} className="mt-0.5 shrink-0" />
                <span>
                  评测将综合考虑代码质量、解题思路和 AI 协作能力
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={12} className="mt-0.5 shrink-0" />
                <span>可以在三个部分之间自由切换，请合理分配时间</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={12} className="mt-0.5 shrink-0" />
                <span>提交后无法修改，请确认所有代码已保存</span>
              </li>
            </ul>
          </div>

          {/* Agreement */}
          <label className="flex items-start gap-2.5 cursor-pointer mb-6">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs text-gray-500 leading-relaxed">
              我已阅读并理解以上规则。我承诺独立完成测试，测试过程中的所有操作（包括代码编辑、AI
              对话）均可被记录和审查。
            </span>
          </label>

          {/* Start button */}
          <button
            onClick={handleStart}
            disabled={!agreed || !name.trim() || !email.trim()}
            className="w-full btn-primary py-3.5 text-base rounded-xl"
          >
            进入测试
            <ChevronRight size={18} />
          </button>

          <p className="text-center text-xs text-gray-400 mt-6">
            Powered by AI Coding Arena · 智能技术评测平台
          </p>
        </div>
      </div>
    </div>
  );
}
