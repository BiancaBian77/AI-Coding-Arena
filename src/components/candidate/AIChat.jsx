import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Lock, ChevronDown, AlertTriangle } from 'lucide-react';

const AI_MODELS = [
  { id: 'gpt4o', name: 'GPT-4o', provider: 'OpenAI', badge: 'bg-emerald-100 text-emerald-700' },
  { id: 'claude-sonnet', name: 'Claude Sonnet', provider: 'Anthropic', badge: 'bg-indigo-100 text-indigo-700' },
  { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'DeepSeek', badge: 'bg-blue-100 text-blue-700' },
  { id: 'kimi-k2', name: 'Kimi K2.5', provider: 'Moonshot', badge: 'bg-purple-100 text-purple-700' },
  { id: 'qwen-max', name: 'Qwen Max', provider: 'Alibaba', badge: 'bg-orange-100 text-orange-700' },
];

const SIMULATED_RESPONSES = {
  '你好': '你好！我是你选择的 AI 助手。在本部分测试中，你可以向我提问关于编程、架构设计的问题。\n\n注意：所有对话记录将作为评测参考，我们会评估你与 AI 协作的能力。',
  '提示': '我可以给你一些方向性的提示，但不会直接给出完整答案。你想了解哪个方面？',
  'rag': '关于 RAG Agent 构建，建议你考虑以下架构：\n\n1. **文档分块**：按段落分块，保留语义完整性\n2. **检索方案**：TF-IDF 是最简单的方案，BM25 更优\n3. **生成阶段**：将检索到的上下文拼接到 prompt 中\n4. **对话管理**：维护一个简单的 history 列表\n\n需要我深入某个部分吗？',
  'bug': '关于 AI 代码审查，我的建议是：\n\n⚠️ **提醒：我的建议可能包含错误，请独立判断**\n\n1. 先通读整体代码结构\n2. 关注常见的 Python 陷阱（可变默认参数、浅拷贝等）\n3. 检查错误处理是否完善\n4. 验证缓存逻辑是否有失效机制\n\n你觉得哪个部分最可疑？',
  'bm25': 'BM25 评分公式：\n\n```\nscore(q, d) = Σ IDF(qi) · (tf · (k1 + 1)) / (tf + k1 · (1 - b + b · |d|/avgdl))\n```\n\n其中：\n- `tf` 是词频\n- `k1` 通常取 1.2-2.0\n- `b` 通常取 0.75\n- `|d|` 是文档长度\n- `avgdl` 是平均文档长度\n\n在 Python 中可以用 `math.log` 计算 IDF。',
  '时间复杂度': '关于时间复杂度分析：\n\n当前实现使用 `list` 作为 order 记录：\n- `list.remove()` 是 O(n) 操作\n- `del list[0]` 也是 O(n) 操作\n\n这导致 `get()` 和 `put()` 都是 **O(n)**。\n\n理想的 LRU Cache 应该用 **OrderedDict** 或 **双向链表 + 哈希表**，可以做到 O(1)。',
};

function getSimulatedResponse(input) {
  const lower = input.toLowerCase().trim();
  for (const [key, response] of Object.entries(SIMULATED_RESPONSES)) {
    if (lower.includes(key.toLowerCase())) return response;
  }
  return `好的，让我想想关于"${input}"的建议。\n\n这是一个很好的问题。在解决这类问题时，建议你：\n1. 先明确输入输出的格式要求\n2. 考虑边界情况\n3. 从最简单的解法开始，再逐步优化\n\n你可以更具体地描述你遇到的困难吗？`;
}

export default function AIChat({ activePart = 'B' }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt4o');
  const [showModelPicker, setShowModelPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const isLocked = activePart === 'A';
  const isWarningMode = activePart === 'C';
  const currentModel = AI_MODELS.find(m => m.id === selectedModel);

  // Reset welcome message when part changes
  useEffect(() => {
    if (activePart === 'A') {
      setMessages([]);
    } else if (activePart === 'B') {
      setMessages([{
        role: 'assistant',
        content: `你好！我是 ${currentModel?.name || 'AI'} 助手。在 AI 协作开发部分，你可以向我提问任何编程相关问题。\n\n你的提问方式、采纳判断和协作效率都将作为评分依据。\n\n你也可以随时切换其他 AI 模型。`,
      }]);
    } else if (activePart === 'C') {
      setMessages([{
        role: 'assistant',
        content: `⚠️ 注意：在 AI 代码审查部分，我的回答**可能包含错误**。\n\n你需要独立判断我的建议是否正确。盲目采纳错误建议会扣分，而正确识别我的错误会加分。\n\n准备好了就开始提问吧。`,
      }]);
    }
  }, [activePart]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isTyping || isLocked) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: getSimulatedResponse(text) }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  // Locked state for Part A
  if (isLocked) {
    return (
      <div className="flex flex-col h-full bg-slate-900">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700 shrink-0">
          <Lock size={14} className="text-slate-500" />
          <span className="text-sm font-medium text-slate-400">AI 助手</span>
          <span className="ml-auto text-xs text-red-400 font-medium">已禁用</span>
        </div>
        <div className="flex-1 flex items-center justify-center bg-slate-900/50 p-8">
          <div className="text-center max-w-xs">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-slate-600" />
            </div>
            <h3 className="text-base font-semibold text-slate-400 mb-2">独立编码模式</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Part A 考察独立编码能力，AI 助手在此部分不可用。请独立完成编码任务。
            </p>
            <div className="mt-4 px-4 py-2 bg-slate-800 rounded-lg">
              <p className="text-xs text-slate-500">
                切换到 Part B 后可使用 AI 助手
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Header with model selector */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700 shrink-0">
        <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
          <Sparkles size={12} className="text-white" />
        </div>
        <span className="text-sm font-medium text-slate-200">AI 助手</span>

        {/* Model selector */}
        <div className="relative ml-auto">
          <button
            onClick={() => setShowModelPicker(!showModelPicker)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${currentModel?.badge}`}>
              {currentModel?.name}
            </span>
            <ChevronDown size={12} className="text-slate-400" />
          </button>

          {showModelPicker && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowModelPicker(false)} />
              <div className="absolute right-0 top-full mt-1 w-56 bg-slate-800 rounded-lg border border-slate-700 shadow-xl z-20 py-1">
                <div className="px-3 py-2 border-b border-slate-700">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">选择 AI 模型</span>
                </div>
                {AI_MODELS.map(model => (
                  <button
                    key={model.id}
                    onClick={() => { setSelectedModel(model.id); setShowModelPicker(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2 hover:bg-slate-700 transition-colors ${
                      selectedModel === model.id ? 'bg-slate-700/50' : ''
                    }`}
                  >
                    <div>
                      <span className="text-sm text-slate-200 font-medium">{model.name}</span>
                      <span className="text-xs text-slate-500 ml-2">{model.provider}</span>
                    </div>
                    {selectedModel === model.id && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Warning banner for Part C */}
      {isWarningMode && (
        <div className="px-3 py-2 bg-amber-900/30 border-b border-amber-800/30 flex items-center gap-2 shrink-0">
          <AlertTriangle size={13} className="text-amber-400 flex-shrink-0" />
          <span className="text-xs text-amber-300">AI 回答可能包含错误，请独立判断后采纳</span>
        </div>
      )}

      {/* Quick question chips */}
      <div className="px-3 py-2 flex gap-1.5 flex-wrap shrink-0 bg-slate-800/50 border-b border-slate-700/50">
        {(activePart === 'B'
          ? ['架构建议', 'RAG 原理', 'API 设计', '调试帮助']
          : ['分析代码', '可能的 Bug', '性能问题', '最佳实践']
        ).map(q => (
          <button
            key={q}
            onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 0); }}
            className="px-2.5 py-1 text-xs text-indigo-300 bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 rounded-full transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 text-[10px] font-bold text-white">
                AI
              </div>
            )}
            <div
              className={`max-w-[85%] px-3 py-2.5 rounded-lg text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-sm'
                  : 'bg-white text-gray-700 rounded-tl-sm border border-gray-200 shadow-sm'
              }`}
            >
              <MessageContent content={msg.content} isUser={msg.role === 'user'} />
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 text-[10px] font-bold text-white">AI</div>
            <div className="bg-white px-4 py-3 rounded-lg rounded-tl-sm border border-gray-200 shadow-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-2.5 bg-white border-t border-gray-200 shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的问题..."
            rows={1}
            className="flex-1 resize-none text-sm text-gray-700 placeholder-gray-400 outline-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 leading-relaxed max-h-24"
            style={{ minHeight: '36px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 transition-colors shrink-0"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageContent({ content, isUser }) {
  if (isUser) return <span className="whitespace-pre-wrap">{content}</span>;
  const parts = content.split(/(```[\s\S]*?```|\*\*[^*]+\*\*)/g);
  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const code = part.slice(3, -3).replace(/^\w+\n/, '');
          return <code key={i} className="block bg-slate-900 text-emerald-300 rounded px-3 py-2.5 my-1.5 text-xs font-mono leading-relaxed">{code}</code>;
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-gray-800">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
