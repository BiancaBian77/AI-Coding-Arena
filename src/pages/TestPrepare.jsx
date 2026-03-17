import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Bot,
  Shield,
  CheckCircle,
  ChevronRight,
  Eye,
  ArrowLeft,
} from 'lucide-react';

export default function TestPrepare() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    if (!agreed) return;
    navigate('/test');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Back link */}
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          返回登录
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">测试准备</h1>
          <p className="text-gray-500 mb-8">请仔细阅读以下信息，准备好后开始测试</p>

          {/* Test info cards */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Clock size={20} className="mx-auto mb-2 text-indigo-500" />
              <div className="text-sm font-semibold text-gray-800">100 分钟</div>
              <div className="text-xs text-gray-400">测试时长</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Bot size={20} className="mx-auto mb-2 text-indigo-500" />
              <div className="text-sm font-semibold text-gray-800">3 部分</div>
              <div className="text-xs text-gray-400">题目数量</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Shield size={20} className="mx-auto mb-2 text-indigo-500" />
              <div className="text-sm font-semibold text-gray-800">五维评分</div>
              <div className="text-xs text-gray-400">评分体系</div>
            </div>
          </div>

          {/* Test structure */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">测试内容</h3>
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
                    <div className="text-sm font-medium text-gray-800">{item.title}</div>
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
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-8">
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
                <span>所有操作被记录，评测将综合考虑代码质量、解题思路和 AI 协作能力</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={12} className="mt-0.5 shrink-0" />
                <span>禁止切换页面，可以在三个部分之间自由切换，请合理分配时间</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={12} className="mt-0.5 shrink-0" />
                <span>提交后无法修改，请确认所有代码已保存</span>
              </li>
            </ul>
          </div>

          {/* Integrity agreement */}
          <label className="flex items-start gap-2.5 cursor-pointer mb-8">
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
            disabled={!agreed}
            className="w-full btn-primary py-3.5 text-base rounded-xl"
          >
            开始测试
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
