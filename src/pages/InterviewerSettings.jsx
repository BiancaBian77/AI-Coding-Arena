import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getInterviewerSidebar } from '../config/sidebarConfig';
import { Bell, Shield, Globe, Key, Save } from 'lucide-react';

const sidebarItems = getInterviewerSidebar('/interviewer/settings');

export default function InterviewerSettings() {
  const [settings, setSettings] = useState({
    emailNotify: true,
    autoRemind: true,
    antiCheatStrict: false,
    language: 'zh',
    maxSwitches: 5,
    testDuration: 120,
  });

  const update = (key, val) => setSettings(prev => ({ ...prev, [key]: val }));

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="px-8 py-6 max-w-3xl">
        <h1 className="text-xl font-bold text-gray-900 mb-1">设置</h1>
        <p className="text-sm text-gray-500 mb-8">配置评测平台的通知、安全和通用选项</p>

        {/* Notifications */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={18} className="text-indigo-500" />
            <h2 className="text-sm font-semibold text-gray-900">通知设置</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            <SettingRow
              title="邮件通知"
              desc="候选人完成测试后发送邮件通知"
              checked={settings.emailNotify}
              onChange={v => update('emailNotify', v)}
            />
            <SettingRow
              title="自动提醒"
              desc="候选人超过 48 小时未开始测试时发送提醒"
              checked={settings.autoRemind}
              onChange={v => update('autoRemind', v)}
            />
          </div>
        </section>

        {/* Anti-cheat */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-indigo-500" />
            <h2 className="text-sm font-semibold text-gray-900">反作弊设置</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            <SettingRow
              title="严格模式"
              desc="切屏超过限制次数自动终止测试"
              checked={settings.antiCheatStrict}
              onChange={v => update('antiCheatStrict', v)}
            />
            <div className="px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">最大切屏次数</p>
                  <p className="text-xs text-gray-500 mt-0.5">超过此次数将标记为高风险</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={settings.maxSwitches}
                    onChange={e => update('maxSwitches', parseInt(e.target.value) || 0)}
                    className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                  />
                  <span className="text-sm text-gray-400">次</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* General */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={18} className="text-indigo-500" />
            <h2 className="text-sm font-semibold text-gray-900">通用设置</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            <div className="px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">默认测试时长</p>
                  <p className="text-xs text-gray-500 mt-0.5">新建测试的默认时间</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={settings.testDuration}
                    onChange={e => update('testDuration', parseInt(e.target.value) || 60)}
                    className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                  />
                  <span className="text-sm text-gray-400">分钟</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">界面语言</p>
                  <p className="text-xs text-gray-500 mt-0.5">面试官端和候选人端的显示语言</p>
                </div>
                <select
                  value={settings.language}
                  onChange={e => update('language', e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                >
                  <option value="zh">中文</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* API */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Key size={18} className="text-indigo-500" />
            <h2 className="text-sm font-semibold text-gray-900">API 集成</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-3">用于与 ATS 系统或内部工具集成的 API Key</p>
            <div className="flex gap-2">
              <input
                type="text"
                value="sk-arena-xxxx-xxxx-xxxx"
                readOnly
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono text-gray-500"
              />
              <button className="px-4 py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                复制
              </button>
            </div>
          </div>
        </section>

        {/* Save */}
        <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          <Save size={16} />
          保存设置
        </button>
      </div>
    </DashboardLayout>
  );
}

function SettingRow({ title, desc, checked, onChange }) {
  return (
    <div className="px-6 py-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
        </div>
        <button
          onClick={() => onChange(!checked)}
          className={`w-10 h-6 rounded-full transition-colors relative ${checked ? 'bg-indigo-600' : 'bg-gray-200'}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
        </button>
      </div>
    </div>
  );
}
