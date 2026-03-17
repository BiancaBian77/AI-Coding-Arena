import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  Plus,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Edit3,
  Trash2,
  Clock,
  Award,
  AlertCircle,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

const sidebarItems = [
  { icon: LayoutDashboard, label: '总览', path: '/interviewer' },
  { icon: Briefcase, label: '岗位管理', path: '/interviewer/positions', active: true },
  { icon: Users, label: '候选人', path: '/interviewer' },
  { icon: BarChart3, label: '分析报告', path: '/interviewer' },
  { icon: Settings, label: '设置', path: '/interviewer' },
];

const levelConfig = {
  Junior: {
    label: 'Junior',
    years: '1-3年',
    description: '基础扎实，能独立完成简单任务',
    badge: 'bg-green-100 text-green-700 border-green-200',
    selected: 'border-green-500 bg-green-50 ring-2 ring-green-200',
  },
  Middle: {
    label: 'Middle',
    years: '3-5年',
    description: '技术全面，能独立负责模块',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    selected: 'border-amber-500 bg-amber-50 ring-2 ring-amber-200',
  },
  Senior: {
    label: 'Senior',
    years: '5年+',
    description: '架构能力强，能带领团队攻克难题',
    badge: 'bg-red-100 text-red-700 border-red-200',
    selected: 'border-red-500 bg-red-50 ring-2 ring-red-200',
  },
};

const aiQuestions = {
  Senior: [
    {
      part: 'A',
      title: '分布式任务调度系统',
      duration: 30,
      maxScore: 30,
      description:
        'Design a distributed task scheduler with fault tolerance. Requirements:\n1. Support task priority and dependency management\n2. Implement leader election and failover\n3. Design sharding strategy for horizontal scaling\n4. Handle partial failures and ensure at-least-once execution',
      difficulty: '困难',
    },
    {
      part: 'B',
      title: '构建高可用 RAG Agent',
      duration: 60,
      maxScore: 50,
      description:
        'Build a production-grade RAG system with:\n1. Multi-source document ingestion pipeline\n2. Semantic caching layer for repeated queries\n3. Retry and circuit breaker patterns for LLM calls\n4. Real-time monitoring dashboard with latency/accuracy metrics\n5. A/B testing framework for prompt strategies',
      difficulty: '困难',
    },
    {
      part: 'C',
      title: '审查 AI 生成的分布式锁实现',
      duration: 10,
      maxScore: 20,
      description:
        'Review the following AI-generated distributed lock implementation based on Redis. Identify:\n1. Race conditions and timing issues\n2. Correctness of the fencing token mechanism\n3. Problems with lock renewal and expiration\n4. Edge cases in network partition scenarios',
      difficulty: '困难',
    },
  ],
  Middle: [
    {
      part: 'A',
      title: '优先级任务队列',
      duration: 30,
      maxScore: 30,
      description:
        'Implement a priority queue with dynamic priority updates:\n1. Support O(log n) insert and extract-min\n2. Allow priority updates for existing elements\n3. Handle concurrent access with proper synchronization\n4. Write unit tests for edge cases',
      difficulty: '中等',
    },
    {
      part: 'B',
      title: '构建简单 RAG Agent',
      duration: 60,
      maxScore: 50,
      description:
        'Build a basic RAG application with 3 API endpoints:\n1. POST /documents - Upload and index documents\n2. POST /query - Query with semantic search + LLM\n3. GET /history - Retrieve query history\nUse vector embeddings for retrieval and include error handling.',
      difficulty: '中等',
    },
    {
      part: 'C',
      title: '审查 AI 生成的缓存模块',
      duration: 10,
      maxScore: 20,
      description:
        'Review the AI-generated LRU cache implementation. Identify:\n1. Memory leak issues\n2. Thread safety problems\n3. Incorrect eviction logic\n4. Missing edge case handling',
      difficulty: '中等',
    },
  ],
  Junior: [
    {
      part: 'A',
      title: '链表操作与排序',
      duration: 30,
      maxScore: 30,
      description:
        'Implement basic linked list operations:\n1. Insert at head/tail\n2. Delete by value\n3. Reverse the list\n4. Sort using merge sort\nWrite test cases for each operation.',
      difficulty: '简单',
    },
    {
      part: 'B',
      title: '构建 TODO API',
      duration: 60,
      maxScore: 50,
      description:
        'Build a simple CRUD REST API for TODO items:\n1. GET /todos - List all todos\n2. POST /todos - Create a todo\n3. PUT /todos/:id - Update a todo\n4. DELETE /todos/:id - Delete a todo\nInclude input validation and proper HTTP status codes.',
      difficulty: '简单',
    },
    {
      part: 'C',
      title: '审查 AI 生成的数据处理函数',
      duration: 10,
      maxScore: 20,
      description:
        'Review the AI-generated data processing functions. Identify:\n1. Off-by-one errors\n2. Null/undefined handling issues\n3. Incorrect return types\n4. Missing input validation',
      difficulty: '简单',
    },
  ],
};

const emptyQuestion = (part) => ({
  part,
  title: '',
  duration: 30,
  maxScore: part === 'A' ? 30 : part === 'B' ? 50 : 20,
  description: '',
  difficulty: '中等',
});

export default function TestDesigner() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState('Senior');
  const [questionMode, setQuestionMode] = useState('ai');
  const [questions, setQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleConfirmProfile = () => {
    setCurrentStep(2);
    setQuestions([]);
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setQuestions(aiQuestions[selectedLevel].map((q) => ({ ...q })));
      setIsGenerating(false);
    }, 1500);
  };

  const handleSwitchToManual = () => {
    setQuestionMode('manual');
    if (questions.length === 0) {
      setQuestions([emptyQuestion('A'), emptyQuestion('B'), emptyQuestion('C')]);
    }
  };

  const updateQuestion = (index, field, value) => {
    setQuestions((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const deleteQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const addQuestion = () => {
    const nextPart = String.fromCharCode(65 + questions.length);
    setQuestions((prev) => [...prev, emptyQuestion(nextPart)]);
  };

  const handlePublish = () => {
    setIsPublished(true);
  };

  const levelBadge = levelConfig[selectedLevel]?.badge || '';
  const difficultyColor = (d) =>
    d === '困难'
      ? 'bg-red-100 text-red-700'
      : d === '中等'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-green-100 text-green-700';

  const steps = [
    { num: 1, label: '候选人画像' },
    { num: 2, label: '题目设计' },
    { num: 3, label: '确认发布' },
  ];

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
          <span className="text-indigo-600 font-medium">题目设计</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-xl font-bold text-gray-900">题目设计</h1>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${levelBadge}`}>
            {selectedLevel}
          </span>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-4 mb-8">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              {i > 0 && (
                <div
                  className={`w-12 h-0.5 ${
                    currentStep >= s.num ? 'bg-indigo-400' : 'bg-gray-200'
                  }`}
                />
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep > s.num
                    ? 'bg-indigo-600 text-white'
                    : currentStep === s.num
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > s.num ? <Check size={16} /> : s.num}
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep >= s.num ? 'text-indigo-600' : 'text-gray-400'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Candidate Profile */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-3xl">
            <h2 className="text-lg font-bold text-gray-900 mb-1">目标候选人画像</h2>
            <p className="text-sm text-gray-500 mb-6">
              选择目标候选人的级别，AI 将根据画像生成匹配的题目
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {Object.entries(levelConfig).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setSelectedLevel(key)}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    selectedLevel === key
                      ? cfg.selected
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-bold text-gray-900">{cfg.label}</span>
                    <span className="text-xs text-gray-500">({cfg.years})</span>
                  </div>
                  <p className="text-sm text-gray-600">{cfg.description}</p>
                  {selectedLevel === key && (
                    <div className="mt-3 flex items-center gap-1 text-sm font-medium text-indigo-600">
                      <Check size={16} />
                      已选择
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleConfirmProfile}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              确认画像，开始出题
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Step 2: Question Design */}
        {currentStep === 2 && (
          <div className="max-w-4xl">
            {/* Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
              <button
                onClick={() => {
                  setQuestionMode('ai');
                  if (questions.length === 0) setQuestions([]);
                }}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  questionMode === 'ai'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                AI 生成
              </button>
              <button
                onClick={handleSwitchToManual}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  questionMode === 'manual'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                自己出题
              </button>
            </div>

            {/* AI Mode */}
            {questionMode === 'ai' && (
              <>
                {questions.length === 0 && !isGenerating && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                      <Sparkles size={32} className="text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">AI 智能出题</h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                      根据候选人画像，AI 将为您生成三部分测试题目
                    </p>
                    <button
                      onClick={handleGenerateAI}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                      <Sparkles size={18} />
                      一键生成题目
                    </button>
                  </div>
                )}

                {isGenerating && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-gray-600 font-medium">
                      AI 正在根据候选人画像生成题目...
                    </p>
                  </div>
                )}

                {questions.length > 0 && !isGenerating && (
                  <div className="space-y-4">
                    {questions.map((q, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
                      >
                        {editingIndex === idx ? (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                题目标题
                              </label>
                              <input
                                type="text"
                                value={q.title}
                                onChange={(e) => updateQuestion(idx, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                描述
                              </label>
                              <textarea
                                value={q.description}
                                onChange={(e) =>
                                  updateQuestion(idx, 'description', e.target.value)
                                }
                                rows={5}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                              />
                            </div>
                            <div className="flex gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  时长 (分钟)
                                </label>
                                <input
                                  type="number"
                                  value={q.duration}
                                  onChange={(e) =>
                                    updateQuestion(idx, 'duration', Number(e.target.value))
                                  }
                                  className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  满分
                                </label>
                                <input
                                  type="number"
                                  value={q.maxScore}
                                  onChange={(e) =>
                                    updateQuestion(idx, 'maxScore', Number(e.target.value))
                                  }
                                  className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                                />
                              </div>
                            </div>
                            <button
                              onClick={() => setEditingIndex(null)}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                            >
                              完成编辑
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                                  {q.part}
                                </span>
                                <div>
                                  <h4 className="text-base font-bold text-gray-900">{q.title}</h4>
                                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Clock size={12} />
                                      {q.duration}分钟
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Award size={12} />
                                      {q.maxScore}分
                                    </span>
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColor(q.difficulty)}`}
                                    >
                                      {q.difficulty}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => setEditingIndex(idx)}
                                className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                              >
                                <Edit3 size={14} />
                                编辑
                              </button>
                            </div>
                            <p className="text-sm text-gray-600 whitespace-pre-line">
                              {q.description}
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Manual Mode */}
            {questionMode === 'manual' && (
              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                          {q.part}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          Part {q.part}
                        </span>
                      </div>
                      {questions.length > 1 && (
                        <button
                          onClick={() => deleteQuestion(idx)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          题目标题
                        </label>
                        <input
                          type="text"
                          value={q.title}
                          onChange={(e) => updateQuestion(idx, 'title', e.target.value)}
                          placeholder="例如：分布式任务调度系统设计"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                        />
                      </div>

                      <div className="flex gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            时长
                          </label>
                          <select
                            value={q.duration}
                            onChange={(e) =>
                              updateQuestion(idx, 'duration', Number(e.target.value))
                            }
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                          >
                            <option value={15}>15 分钟</option>
                            <option value={30}>30 分钟</option>
                            <option value={45}>45 分钟</option>
                            <option value={60}>60 分钟</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            满分
                          </label>
                          <input
                            type="number"
                            value={q.maxScore}
                            onChange={(e) =>
                              updateQuestion(idx, 'maxScore', Number(e.target.value))
                            }
                            className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            难度
                          </label>
                          <select
                            value={q.difficulty}
                            onChange={(e) => updateQuestion(idx, 'difficulty', e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                          >
                            <option value="简单">简单</option>
                            <option value="中等">中等</option>
                            <option value="困难">困难</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          题目描述
                        </label>
                        <textarea
                          value={q.description}
                          onChange={(e) => updateQuestion(idx, 'description', e.target.value)}
                          rows={5}
                          placeholder={'请详细描述题目要求，包括：\n1. 功能需求\n2. 技术约束\n3. 评分标准\n4. 示例输入输出（如适用）'}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          添加测试用例
                        </label>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="输入"
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="期望输出"
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addQuestion}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  添加题目
                </button>
              </div>
            )}

            {/* Next Step Button */}
            {questions.length > 0 && !isGenerating && (
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ChevronLeft size={18} />
                  上一步
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  下一步：确认发布
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Confirm & Publish */}
        {currentStep === 3 && !isPublished && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">题目概览</h3>
              <div className="space-y-3">
                {questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                        {q.part}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{q.title}</p>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {q.duration}分钟
                          </span>
                          <span className="flex items-center gap-1">
                            <Award size={12} />
                            {q.maxScore}分
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColor(q.difficulty)}`}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-700">
                  发布后，已邀请的候选人将收到测试通知
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft size={18} />
                上一步
              </button>
              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  保存草稿
                </button>
                <button
                  onClick={handlePublish}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  发布测试
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Published Success */}
        {currentStep === 3 && isPublished && (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">测试发布成功！</h3>
            <p className="text-sm text-gray-500 mb-6">题目已发布，候选人将收到测试通知</p>
            <div className="flex items-center justify-center gap-3">
              <Link
                to="/interviewer/positions"
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                返回岗位管理
              </Link>
              <Link
                to="/interviewer/positions/1/invite"
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                邀请候选人
              </Link>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
