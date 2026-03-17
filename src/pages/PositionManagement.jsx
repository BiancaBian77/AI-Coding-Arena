import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  Plus,
  Edit3,
  Send,
  X,
  ChevronRight,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getInterviewerSidebar } from '../config/sidebarConfig';

const sidebarItems = getInterviewerSidebar('/interviewer/positions');

const mockPositions = [
  { id: 1, name: '高级后端工程师', level: 'Senior', questions: 3, candidates: 5, status: '已发布' },
  { id: 2, name: '前端工程师', level: 'Middle', questions: 3, candidates: 2, status: '已发布' },
  { id: 3, name: 'AI算法工程师', level: 'Senior', questions: 0, candidates: 0, status: '草稿' },
];

const LEVELS = ['Junior', 'Middle', 'Senior'];

function getLevelColor(level) {
  switch (level) {
    case 'Junior':
      return 'bg-green-50 text-green-700';
    case 'Middle':
      return 'bg-blue-50 text-blue-700';
    case 'Senior':
      return 'bg-purple-50 text-purple-700';
    default:
      return 'bg-gray-50 text-gray-700';
  }
}

function getStatusColor(status) {
  return status === '已发布'
    ? 'bg-emerald-50 text-emerald-700'
    : 'bg-gray-100 text-gray-500';
}

export default function PositionManagement() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newPosition, setNewPosition] = useState({ name: '', level: 'Middle', description: '' });

  const handleCreate = () => {
    // In a real app, save and get ID from backend
    const newId = mockPositions.length + 1;
    navigate(`/interviewer/position/${newId}/test-design`);
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">岗位管理</h1>
            <p className="text-sm text-gray-500 mt-1">管理招聘岗位和测试配置</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary"
          >
            <Plus size={18} />
            创建岗位
          </button>
        </div>

        {/* Position cards */}
        <div className="grid gap-4">
          {mockPositions.map((pos) => (
            <div
              key={pos.id}
              className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{pos.name}</h3>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getLevelColor(pos.level)}`}>
                      {pos.level}
                    </span>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(pos.status)}`}>
                      {pos.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span>{pos.questions} 道题目</span>
                    <span>{pos.candidates} 位候选人</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1.5">
                    <Edit3 size={14} />
                    编辑
                  </button>
                  <button className="px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1.5">
                    <Send size={14} />
                    邀请候选人
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create position modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">创建岗位</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              {/* Position name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  岗位名称
                </label>
                <input
                  type="text"
                  value={newPosition.name}
                  onChange={(e) => setNewPosition({ ...newPosition, name: e.target.value })}
                  placeholder="例如：高级后端工程师"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>

              {/* Level selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  级别
                </label>
                <div className="flex gap-2">
                  {LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() => setNewPosition({ ...newPosition, level })}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${
                        newPosition.level === level
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  岗位描述
                </label>
                <textarea
                  value={newPosition.description}
                  onChange={(e) => setNewPosition({ ...newPosition, description: e.target.value })}
                  placeholder="描述岗位职责和要求..."
                  rows={4}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleCreate}
              disabled={!newPosition.name.trim()}
              className="w-full btn-primary py-3 mt-6 rounded-xl"
            >
              下一步：设计题目
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
