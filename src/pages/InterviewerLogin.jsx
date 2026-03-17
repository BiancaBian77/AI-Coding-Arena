import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react';

export default function InterviewerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) return;
    navigate('/interviewer');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left branded panel */}
      <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-violet-500 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-16">
            <Zap size={24} className="text-indigo-400" />
            <span className="text-xl font-bold text-white">AI Coding Arena</span>
          </Link>

          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            智能化技术招聘<br />从这里开始
          </h2>
          <p className="text-indigo-300 leading-relaxed max-w-sm">
            创建岗位、设计评测题目、邀请候选人、查看五维评分报告——一站式完成技术面试全流程。
          </p>

          <div className="mt-10 space-y-4">
            {[
              'AI 智能出题，根据岗位和级别自动生成',
              '五维评分体系，全方位能力画像',
              '反作弊监控，确保评测公平性',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </div>
                <span className="text-sm text-indigo-200">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-indigo-400/50 relative z-10">© 2026 AI Coding Arena</p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Zap size={20} className="text-indigo-600" />
            <span className="text-lg font-bold text-gray-900">AI Coding Arena</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">面试官登录</h1>
          <p className="text-sm text-gray-500 mb-8">使用企业邮箱登录管理后台</p>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">企业邮箱</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">密码</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="输入密码"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                />
              </div>
            </div>

            {/* Login button */}
            <button
              onClick={handleLogin}
              disabled={!email.trim() || !password.trim()}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 transition-colors shadow-sm mt-2"
            >
              登录
              <ArrowRight size={16} />
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            还没有账号？<span className="text-indigo-600 cursor-pointer hover:text-indigo-800">联系管理员开通</span>
          </p>
        </div>
      </div>
    </div>
  );
}
