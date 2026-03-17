import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Code2,
  Sparkles,
  Brain,
  ChevronDown,
} from 'lucide-react';

const ROLES = [
  { value: 'candidate', label: '候选人' },
  { value: 'interviewer', label: '面试官' },
  { value: 'admin', label: '管理员' },
];

export default function CandidateLogin() {
  const [role, setRole] = useState('candidate');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name.trim() || !email.trim()) return;
    if (role === 'candidate' && !inviteCode.trim()) return;
    if (role !== 'candidate' && !password.trim()) return;

    if (role === 'candidate') navigate('/test/prepare');
    else if (role === 'interviewer') navigate('/interviewer');
    else if (role === 'admin') navigate('/admin');
  };

  const canSubmit =
    name.trim() &&
    email.trim() &&
    (role === 'candidate' ? inviteCode.trim() : password.trim());

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel */}
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

      {/* Right Panel */}
      <div className="lg:w-[55%] bg-white flex items-center justify-center px-6 sm:px-12 lg:px-16 py-12 lg:py-0">
        <div className="w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            登录 AI Coding Arena
          </h2>
          <p className="text-gray-500 mb-8">请选择身份并填写信息</p>

          <div className="space-y-4 mb-8">
            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                选择身份
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all appearance-none bg-white"
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Name */}
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

            {/* Email */}
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

            {/* Invite code (candidate) or Password (interviewer/admin) */}
            {role === 'candidate' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  邀请码
                </label>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="请输入邀请码"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  密码
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            )}
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            disabled={!canSubmit}
            className="w-full btn-primary py-3.5 text-base rounded-xl"
          >
            登录
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
