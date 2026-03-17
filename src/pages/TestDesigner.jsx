import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ChevronRight, ChevronLeft, Check, Edit3, Trash2,
  Clock, Award, AlertCircle, Plus, Briefcase, Copy, BookOpen,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getInterviewerSidebar } from '../config/sidebarConfig';

const sidebarItems = getInterviewerSidebar('/interviewer/test-design');

const levelConfig = {
  Junior: { label: 'Junior', years: '1-3年', description: '基础扎实，能独立完成简单任务', badge: 'bg-green-100 text-green-700 border-green-200', selected: 'border-green-500 bg-green-50 ring-2 ring-green-200' },
  Middle: { label: 'Middle', years: '3-5年', description: '技术全面，能独立负责模块', badge: 'bg-amber-100 text-amber-700 border-amber-200', selected: 'border-amber-500 bg-amber-50 ring-2 ring-amber-200' },
  Senior: { label: 'Senior', years: '5年+', description: '架构能力强，能带领团队攻克难题', badge: 'bg-red-100 text-red-700 border-red-200', selected: 'border-red-500 bg-red-50 ring-2 ring-red-200' },
};

const mockPositions = [
  { id: 1, name: '高级后端工程师', level: 'Senior', status: '已发布' },
  { id: 2, name: '前端工程师', level: 'Middle', status: '已发布' },
  { id: 3, name: 'AI算法工程师', level: 'Senior', status: '草稿' },
];

// Previously saved question templates
const savedTemplates = [
  {
    id: 't1',
    name: 'Senior 后端通用题库',
    level: 'Senior',
    positionType: '后端工程师',
    createdAt: '2026-03-10',
    questions: [
      { part: 'A', title: '分布式任务调度系统', duration: 30, maxScore: 30, description: 'Design a distributed task scheduler with fault tolerance.\n1. Support task priority and dependency management\n2. Implement leader election and failover\n3. Design sharding strategy for horizontal scaling', difficulty: '困难' },
      { part: 'B', title: '构建高可用 RAG Agent', duration: 60, maxScore: 50, description: 'Build a production-grade RAG system with:\n1. Multi-source document ingestion\n2. Semantic caching layer\n3. Retry and circuit breaker patterns\n4. Monitoring dashboard', difficulty: '困难' },
      { part: 'C', title: '审查 AI 生成的分布式锁实现', duration: 10, maxScore: 20, description: 'Review AI-generated distributed lock code.\n1. Find race conditions\n2. Check fencing token mechanism\n3. Identify lock renewal issues', difficulty: '困难' },
    ],
  },
  {
    id: 't2',
    name: 'Middle 前端通用题库',
    level: 'Middle',
    positionType: '前端工程师',
    createdAt: '2026-03-08',
    questions: [
      { part: 'A', title: '虚拟列表渲染优化', duration: 30, maxScore: 30, description: 'Implement a virtual scroll list component.\n1. Only render visible items\n2. Support dynamic item heights\n3. Smooth scrolling performance', difficulty: '中等' },
      { part: 'B', title: '构建实时协作编辑器', duration: 60, maxScore: 50, description: 'Build a simple collaborative text editor:\n1. Real-time sync\n2. Conflict resolution\n3. Cursor position sharing', difficulty: '中等' },
      { part: 'C', title: '审查 AI 生成的状态管理代码', duration: 10, maxScore: 20, description: 'Review AI-generated state management code.\n1. Find memory leaks\n2. Check re-render issues\n3. Identify race conditions', difficulty: '中等' },
    ],
  },
];

const aiQuestions = {
  Senior: [
    { part: 'A', title: '分布式任务调度系统', duration: 30, maxScore: 30, description: 'Design a distributed task scheduler with fault tolerance.\n1. Support task priority and dependency management\n2. Implement leader election and failover\n3. Design sharding strategy for horizontal scaling\n4. Handle partial failures and ensure at-least-once execution', difficulty: '困难' },
    { part: 'B', title: '构建高可用 RAG Agent', duration: 60, maxScore: 50, description: 'Build a production-grade RAG system with:\n1. Multi-source document ingestion pipeline\n2. Semantic caching layer for repeated queries\n3. Retry and circuit breaker patterns for LLM calls\n4. Real-time monitoring dashboard\n5. A/B testing framework for prompt strategies', difficulty: '困难' },
    { part: 'C', title: '审查 AI 生成的分布式锁实现', duration: 10, maxScore: 20, description: 'Review the AI-generated distributed lock implementation.\n1. Race conditions and timing issues\n2. Correctness of fencing token mechanism\n3. Lock renewal and expiration problems\n4. Edge cases in network partition scenarios', difficulty: '困难' },
  ],
  Middle: [
    { part: 'A', title: '优先级任务队列', duration: 30, maxScore: 30, description: 'Implement a priority queue with dynamic updates:\n1. O(log n) insert and extract-min\n2. Priority updates for existing elements\n3. Concurrent access synchronization\n4. Unit tests for edge cases', difficulty: '中等' },
    { part: 'B', title: '构建简单 RAG Agent', duration: 60, maxScore: 50, description: 'Build a basic RAG application:\n1. POST /documents - Upload and index\n2. POST /query - Semantic search + LLM\n3. GET /history - Query history\nInclude error handling and tests.', difficulty: '中等' },
    { part: 'C', title: '审查 AI 生成的缓存模块', duration: 10, maxScore: 20, description: 'Review AI-generated LRU cache:\n1. Memory leak issues\n2. Thread safety problems\n3. Incorrect eviction logic\n4. Missing edge cases', difficulty: '中等' },
  ],
  Junior: [
    { part: 'A', title: '链表操作与排序', duration: 30, maxScore: 30, description: 'Implement linked list operations:\n1. Insert at head/tail\n2. Delete by value\n3. Reverse the list\n4. Sort using merge sort', difficulty: '简单' },
    { part: 'B', title: '构建 TODO API', duration: 60, maxScore: 50, description: 'Build a CRUD REST API:\n1. GET /todos - List all\n2. POST /todos - Create\n3. PUT /todos/:id - Update\n4. DELETE /todos/:id - Delete\nInclude validation and proper status codes.', difficulty: '简单' },
    { part: 'C', title: '审查 AI 生成的数据处理函数', duration: 10, maxScore: 20, description: 'Review AI-generated data processing:\n1. Off-by-one errors\n2. Null/undefined handling\n3. Incorrect return types\n4. Missing input validation', difficulty: '简单' },
  ],
};

const emptyQuestion = (part) => ({ part, title: '', duration: 30, maxScore: part === 'A' ? 30 : part === 'B' ? 50 : 20, description: '', difficulty: '中等' });

const difficultyColor = (d) => d === '困难' ? 'bg-red-100 text-red-700' : d === '中等' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700';

export default function TestDesigner() {
  // Step 0: select position, Step 1: candidate profile, Step 2: question design, Step 3: confirm
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('Senior');
  const [questionMode, setQuestionMode] = useState('ai'); // 'ai' | 'manual' | 'template'
  const [questions, setQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [saveName, setSaveName] = useState('');

  const handleSelectPosition = (pos) => {
    setSelectedPosition(pos);
    setSelectedLevel(pos.level);
    setCurrentStep(1);
  };

  const handleConfirmProfile = () => {
    setCurrentStep(2);
    setQuestions([]);
    setQuestionMode('ai');
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setQuestions(aiQuestions[selectedLevel].map(q => ({ ...q })));
      setIsGenerating(false);
    }, 1500);
  };

  const handleUseTemplate = (template) => {
    setQuestions(template.questions.map(q => ({ ...q })));
    setQuestionMode('template');
  };

  const updateQuestion = (index, field, value) => {
    setQuestions(prev => { const next = [...prev]; next[index] = { ...next[index], [field]: value }; return next; });
  };

  const deleteQuestion = (index) => setQuestions(prev => prev.filter((_, i) => i !== index));
  const addQuestion = () => setQuestions(prev => [...prev, emptyQuestion(String.fromCharCode(65 + prev.length))]);

  const handleSaveTemplate = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handlePublish = () => setIsPublished(true);

  const levelBadge = levelConfig[selectedLevel]?.badge || '';

  const steps = [
    { num: 0, label: '选择岗位' },
    { num: 1, label: '候选人画像' },
    { num: 2, label: '题目设计' },
    { num: 3, label: '确认发布' },
  ];

  // Filter templates relevant to selected position/level
  const relevantTemplates = savedTemplates.filter(t => t.level === selectedLevel);

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/interviewer/positions" className="hover:text-indigo-600 transition-colors">岗位管理</Link>
          <ChevronRight size={14} />
          {selectedPosition ? (
            <>
              <span className="text-gray-700 font-medium">{selectedPosition.name}</span>
              <ChevronRight size={14} />
            </>
          ) : null}
          <span className="text-indigo-600 font-medium">题目设计</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-xl font-bold text-gray-900">题目设计</h1>
          {selectedPosition && (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${levelBadge}`}>
              {selectedLevel}
            </span>
          )}
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              {i > 0 && <div className={`w-10 h-0.5 ${currentStep >= s.num ? 'bg-indigo-400' : 'bg-gray-200'}`} />}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                currentStep > s.num ? 'bg-indigo-600 text-white' : currentStep === s.num ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > s.num ? <Check size={14} /> : s.num}
              </div>
              <span className={`text-xs font-medium ${currentStep >= s.num ? 'text-indigo-600' : 'text-gray-400'}`}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Step 0: Select Position */}
        {currentStep === 0 && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">选择目标岗位</h2>
              <p className="text-sm text-gray-500 mb-5">为哪个岗位设计评测题目？</p>
              <div className="space-y-3">
                {mockPositions.map(pos => (
                  <button
                    key={pos.id}
                    onClick={() => handleSelectPosition(pos)}
                    className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <Briefcase size={18} />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-900">{pos.name}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${levelConfig[pos.level].badge}`}>{pos.level}</span>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${pos.status === '已发布' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{pos.status}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Saved templates quick access */}
            {savedTemplates.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={18} className="text-indigo-500" />
                  <h3 className="text-sm font-semibold text-gray-900">已保存的题库模板</h3>
                </div>
                <p className="text-xs text-gray-500 mb-4">复用之前设计的题目，避免重复劳动</p>
                <div className="space-y-2">
                  {savedTemplates.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div>
                        <span className="text-sm font-medium text-gray-800">{t.name}</span>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
                          <span>{t.positionType}</span>
                          <span>·</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${levelConfig[t.level].badge}`}>{t.level}</span>
                          <span>·</span>
                          <span>{t.questions.length} 题</span>
                          <span>·</span>
                          <span>{t.createdAt}</span>
                        </div>
                      </div>
                      <button className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                        <Copy size={12} /> 使用此模板
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 1: Candidate Profile */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-3xl">
            <h2 className="text-lg font-bold text-gray-900 mb-1">目标候选人画像</h2>
            <p className="text-sm text-gray-500 mb-6">
              岗位：<strong>{selectedPosition?.name}</strong> — 选择目标候选人级别，AI 将生成匹配难度的题目
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {Object.entries(levelConfig).map(([key, cfg]) => (
                <button key={key} onClick={() => setSelectedLevel(key)}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${selectedLevel === key ? cfg.selected : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-bold text-gray-900">{cfg.label}</span>
                    <span className="text-xs text-gray-500">({cfg.years})</span>
                  </div>
                  <p className="text-sm text-gray-600">{cfg.description}</p>
                  {selectedLevel === key && <div className="mt-3 flex items-center gap-1 text-sm font-medium text-indigo-600"><Check size={16} /> 已选择</div>}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrentStep(0)} className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
                <ChevronLeft size={18} /> 重新选择岗位
              </button>
              <button onClick={handleConfirmProfile} className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                确认画像，开始出题 <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Question Design */}
        {currentStep === 2 && (
          <div className="max-w-4xl">
            {/* Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
              {[
                { key: 'ai', label: 'AI 生成' },
                { key: 'manual', label: '自己出题' },
                { key: 'template', label: '从题库导入' },
              ].map(m => (
                <button key={m.key}
                  onClick={() => {
                    setQuestionMode(m.key);
                    if (m.key === 'manual' && questions.length === 0) setQuestions([emptyQuestion('A'), emptyQuestion('B'), emptyQuestion('C')]);
                  }}
                  className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${questionMode === m.key ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {m.label}
                </button>
              ))}
            </div>

            {/* Template Mode */}
            {questionMode === 'template' && (
              <div className="space-y-4">
                {relevantTemplates.length > 0 ? (
                  <>
                    <p className="text-sm text-gray-500">以下是与当前级别（{selectedLevel}）匹配的已保存题库：</p>
                    {relevantTemplates.map(t => (
                      <div key={t.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-sm font-bold text-gray-900">{t.name}</h4>
                            <span className="text-xs text-gray-400">{t.positionType} · {t.createdAt}</span>
                          </div>
                          <button onClick={() => handleUseTemplate(t)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                            <Copy size={14} /> 使用此题库
                          </button>
                        </div>
                        <div className="space-y-2">
                          {t.questions.map((q, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <span className="w-6 h-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">{q.part}</span>
                              <span className="text-sm text-gray-700">{q.title}</span>
                              <span className="text-xs text-gray-400">{q.duration}min · {q.maxScore}分</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${difficultyColor(q.difficulty)}`}>{q.difficulty}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
                    <BookOpen size={32} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">暂无匹配 {selectedLevel} 级别的已保存题库</p>
                    <p className="text-xs text-gray-400 mt-1">尝试使用 AI 生成或手动出题</p>
                  </div>
                )}
              </div>
            )}

            {/* AI Mode */}
            {questionMode === 'ai' && (
              <>
                {questions.length === 0 && !isGenerating && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                      <Sparkles size={32} className="text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">AI 智能出题</h3>
                    <p className="text-sm text-gray-500 mb-2">根据 <strong>{selectedPosition?.name}</strong> ({selectedLevel}) 的候选人画像生成题目</p>
                    <p className="text-xs text-amber-600 bg-amber-50 inline-block px-3 py-1 rounded-full mb-6">
                      AI 将根据 {selectedLevel} 级别自动调整题目难度
                    </p>
                    <br />
                    <button onClick={handleGenerateAI} className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                      <Sparkles size={18} /> 一键生成题目
                    </button>
                  </div>
                )}
                {isGenerating && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-gray-600 font-medium">AI 正在为 {selectedLevel} 级别生成题目...</p>
                  </div>
                )}
              </>
            )}

            {/* Manual Mode */}
            {questionMode === 'manual' && questions.length > 0 && (
              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">{q.part}</span>
                        <span className="text-sm font-semibold text-gray-900">Part {q.part}</span>
                      </div>
                      {questions.length > 1 && <button onClick={() => deleteQuestion(idx)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>}
                    </div>
                    <div className="space-y-4">
                      <input type="text" value={q.title} onChange={e => updateQuestion(idx, 'title', e.target.value)} placeholder="题目标题" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300" />
                      <div className="flex gap-4">
                        <select value={q.duration} onChange={e => updateQuestion(idx, 'duration', Number(e.target.value))} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                          <option value={15}>15 分钟</option><option value={30}>30 分钟</option><option value={45}>45 分钟</option><option value={60}>60 分钟</option>
                        </select>
                        <input type="number" value={q.maxScore} onChange={e => updateQuestion(idx, 'maxScore', Number(e.target.value))} className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        <select value={q.difficulty} onChange={e => updateQuestion(idx, 'difficulty', e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                          <option value="简单">简单</option><option value="中等">中等</option><option value="困难">困难</option>
                        </select>
                      </div>
                      <textarea value={q.description} onChange={e => updateQuestion(idx, 'description', e.target.value)} rows={5} placeholder="题目描述..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </div>
                  </div>
                ))}
                <button onClick={addQuestion} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
                  <Plus size={18} /> 添加题目
                </button>
              </div>
            )}

            {/* Generated/imported questions display (for AI and template modes) */}
            {(questionMode === 'ai' || questionMode === 'template') && questions.length > 0 && !isGenerating && (
              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    {editingIndex === idx ? (
                      <div className="space-y-4">
                        <input type="text" value={q.title} onChange={e => updateQuestion(idx, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        <textarea value={q.description} onChange={e => updateQuestion(idx, 'description', e.target.value)} rows={5} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        <div className="flex gap-4">
                          <input type="number" value={q.duration} onChange={e => updateQuestion(idx, 'duration', Number(e.target.value))} className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                          <input type="number" value={q.maxScore} onChange={e => updateQuestion(idx, 'maxScore', Number(e.target.value))} className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                        </div>
                        <button onClick={() => setEditingIndex(null)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">完成编辑</button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">{q.part}</span>
                            <div>
                              <h4 className="text-base font-bold text-gray-900">{q.title}</h4>
                              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><Clock size={12} />{q.duration}分钟</span>
                                <span className="flex items-center gap-1"><Award size={12} />{q.maxScore}分</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColor(q.difficulty)}`}>{q.difficulty}</span>
                              </div>
                            </div>
                          </div>
                          <button onClick={() => setEditingIndex(idx)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600">
                            <Edit3 size={14} /> 编辑
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{q.description}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Next / Save buttons */}
            {questions.length > 0 && !isGenerating && (
              <div className="flex items-center justify-between mt-6">
                <button onClick={() => setCurrentStep(1)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900">
                  <ChevronLeft size={18} /> 上一步
                </button>
                <div className="flex items-center gap-3">
                  {/* Save as template */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={saveName}
                      onChange={e => setSaveName(e.target.value)}
                      placeholder="模板名称..."
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button
                      onClick={handleSaveTemplate}
                      disabled={!saveName.trim()}
                      className={`flex items-center gap-1 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
                        isSaved ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40'
                      }`}
                    >
                      {isSaved ? <><Check size={14} /> 已保存</> : <><BookOpen size={14} /> 保存到题库</>}
                    </button>
                  </div>
                  <button onClick={() => setCurrentStep(3)} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    下一步：确认发布 <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Confirm & Publish */}
        {currentStep === 3 && !isPublished && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-bold text-gray-900">题目概览</h3>
                <span className="text-xs text-gray-500">岗位：{selectedPosition?.name}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${levelBadge}`}>{selectedLevel}</span>
              </div>
              <div className="space-y-3">
                {questions.map((q, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">{q.part}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{q.title}</p>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Clock size={12} />{q.duration}分钟</span>
                          <span className="flex items-center gap-1"><Award size={12} />{q.maxScore}分</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColor(q.difficulty)}`}>{q.difficulty}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-700">发布后，已邀请的候选人将收到测试通知</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => setCurrentStep(2)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900">
                <ChevronLeft size={18} /> 上一步
              </button>
              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">保存草稿</button>
                <button onClick={handlePublish} className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">发布测试</button>
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
            <p className="text-sm text-gray-500 mb-6">{selectedPosition?.name} 的评测题目已发布</p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/interviewer/positions" className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">返回岗位管理</Link>
              <Link to="/interviewer/positions/1/invite" className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">邀请候选人</Link>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
