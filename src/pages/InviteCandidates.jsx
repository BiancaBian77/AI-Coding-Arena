import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  ChevronRight,
  Send,
  Copy,
  Check,
  Mail,
  LinkIcon,
  UserPlus,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

const sidebarItems = [
  { icon: LayoutDashboard, label: '总览', path: '/interviewer' },
  { icon: Briefcase, label: '岗位管理', path: '/interviewer/positions', active: true },
  { icon: Users, label: '候选人', path: '/interviewer' },
  { icon: BarChart3, label: '分析报告', path: '/interviewer' },
  { icon: Settings, label: '设置', path: '/interviewer' },
];

const generateCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const statusStyle = (status) => {
  switch (status) {
    case '已完成':
      return 'bg-green-50 text-green-700 border-green-200';
    case '进行中':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case '待接受':
    default:
      return 'bg-gray-50 text-gray-600 border-gray-200';
  }
};

const initialCandidates = [
  {
    email: 'zhang.wei@example.com',
    code: 'Xk9mT2Lp',
    status: '已完成',
    sentDate: '2026-03-14',
  },
  {
    email: 'li.na@example.com',
    code: 'Qr4nW8Hv',
    status: '进行中',
    sentDate: '2026-03-16',
  },
  {
    email: 'wang.lei@example.com',
    code: 'Js7bY3Fd',
    status: '待接受',
    sentDate: '2026-03-17',
  },
];

export default function InviteCandidates() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [emailInput, setEmailInput] = useState('');
  const [batchEmails, setBatchEmails] = useState('');
  const [copiedCode, setCopiedCode] = useState(null);

  const inviteLink = (code) => `https://arena.example.com/test/invite/${code}`;

  const handleSendInvite = () => {
    const email = emailInput.trim();
    if (!email) return;
    const code = generateCode();
    setCandidates((prev) => [
      {
        email,
        code,
        status: '待接受',
        sentDate: '2026-03-17',
      },
      ...prev,
    ]);
    setEmailInput('');
  };

  const handleBatchInvite = () => {
    const emails = batchEmails
      .split('\n')
      .map((e) => e.trim())
      .filter((e) => e.length > 0);
    if (emails.length === 0) return;
    const newCandidates = emails.map((email) => ({
      email,
      code: generateCode(),
      status: '待接受',
      sentDate: '2026-03-17',
    }));
    setCandidates((prev) => [...newCandidates, ...prev]);
    setBatchEmails('');
  };

  const handleCopyLink = (code) => {
    navigator.clipboard.writeText(inviteLink(code)).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/interviewer/positions" className="hover:text-indigo-600 transition-colors">
            岗位管理
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-medium">高级后端工程师</span>
          <ChevronRight size={14} />
          <span className="text-indigo-600 font-medium">邀请候选人</span>
        </div>

        {/* Position Info Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">高级后端工程师</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                    Senior
                  </span>
                </span>
                <span>3 道题目</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                  已发布
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Invite section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Single invite */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <UserPlus size={20} className="text-indigo-600" />
                <h2 className="text-base font-bold text-gray-900">邀请候选人</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    候选人邮箱
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendInvite()}
                    placeholder="candidate@example.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                  />
                </div>
                <button
                  onClick={handleSendInvite}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Send size={16} />
                  发送邀请
                </button>
              </div>
            </div>

            {/* Batch invite */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Mail size={20} className="text-indigo-600" />
                <h2 className="text-base font-bold text-gray-900">批量邀请</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    邮箱列表（每行一个）
                  </label>
                  <textarea
                    value={batchEmails}
                    onChange={(e) => setBatchEmails(e.target.value)}
                    rows={5}
                    placeholder={'user1@example.com\nuser2@example.com\nuser3@example.com'}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                  />
                </div>
                <button
                  onClick={handleBatchInvite}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Send size={16} />
                  发送全部
                </button>
              </div>
            </div>
          </div>

          {/* Right column: Invited list */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">
                  已邀请候选人
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    ({candidates.length})
                  </span>
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">邮箱</th>
                      <th className="px-6 py-3">邀请码</th>
                      <th className="px-6 py-3">邀请链接</th>
                      <th className="px-6 py-3">状态</th>
                      <th className="px-6 py-3">发送日期</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {candidates.map((c, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900">{c.email}</span>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-700">
                            {c.code}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 truncate max-w-[180px] flex items-center gap-1">
                              <LinkIcon size={12} className="flex-shrink-0" />
                              {inviteLink(c.code)}
                            </span>
                            <button
                              onClick={() => handleCopyLink(c.code)}
                              className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors flex-shrink-0"
                            >
                              {copiedCode === c.code ? (
                                <>
                                  <Check size={12} />
                                  已复制
                                </>
                              ) : (
                                <>
                                  <Copy size={12} />
                                  复制链接
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full border ${statusStyle(c.status)}`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{c.sentDate}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {candidates.length === 0 && (
                <div className="p-12 text-center">
                  <div className="text-gray-300 mb-3">
                    <Users size={48} className="mx-auto" />
                  </div>
                  <p className="text-gray-500">暂无已邀请的候选人</p>
                  <p className="text-gray-400 text-sm mt-1">
                    通过左侧表单邀请候选人参加测试
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
