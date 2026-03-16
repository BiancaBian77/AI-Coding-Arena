import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const SIMULATED_RESPONSES = {
  '你好': '你好！我是你的 AI 助手，在本次测试中可以为你提供编程帮助。你可以问我关于算法思路、语法问题或调试建议。请注意，所有对话都会被记录作为评测参考。',
  '提示': '我可以给你一些方向性的提示，但不会直接给出完整答案。你想了解哪个部分的提示？\n\n- Part A: 任务调度算法\n- Part B: RAG Agent 构建\n- Part C: 代码审查',
  'part a': '关于 Part A 任务调度算法，建议你考虑以下思路：\n\n1. **贪心策略**：按优先级降序排列任务，依次分配给最合适的 Agent\n2. **"最合适"的定义**：可以是剩余容量最大的、或能力值最接近任务难度的 Agent\n3. **注意边界条件**：Agent 负载不能超过 max_load\n\n你想深入了解哪个方面？',
  'part b': '关于 Part B RAG Agent 构建：\n\n1. **文档分块**：可以按固定长度或按段落分块，注意保留语义完整性\n2. **检索方案**：TF-IDF 是最简单的方案，用 `Counter` 统计词频即可\n3. **BM25 更优**：在 TF-IDF 基础上考虑了文档长度归一化\n\n需要我解释 BM25 的公式吗？',
  'part c': '关于 Part C 代码审查，给你几个方向：\n\n1. 注意 `dict` 和 `list` 的方法区别\n2. `clear()` 方法是否应该重置 capacity？\n3. `get_most_recent(n)` 当 n 大于列表长度时会怎样？\n4. 整体的时间复杂度是否可以优化？\n\n仔细看每个方法的实现细节。',
  'bm25': 'BM25 评分公式：\n\n```\nscore(q, d) = Σ IDF(qi) · (tf · (k1 + 1)) / (tf + k1 · (1 - b + b · |d|/avgdl))\n```\n\n其中：\n- `tf` 是词频\n- `k1` 通常取 1.2-2.0\n- `b` 通常取 0.75\n- `|d|` 是文档长度\n- `avgdl` 是平均文档长度\n\n在 Python 中可以用 `math.log` 计算 IDF。',
  '时间复杂度': '关于 LRU Cache 的时间复杂度分析：\n\n当前实现使用 `list` 作为 order 记录：\n- `list.remove()` 是 O(n) 操作\n- `del list[0]` 也是 O(n) 操作\n\n这导致 `get()` 和 `put()` 都是 **O(n)**。\n\n理想的 LRU Cache 应该用 **OrderedDict** 或 **双向链表 + 哈希表**，可以做到 O(1)。',
};

function getSimulatedResponse(input) {
  const lower = input.toLowerCase().trim();

  for (const [key, response] of Object.entries(SIMULATED_RESPONSES)) {
    if (lower.includes(key.toLowerCase())) {
      return response;
    }
  }

  return `好的，让我想想关于"${input}"的建议。\n\n这是一个很好的问题。在解决这类问题时，建议你：\n1. 先明确输入输出的格式要求\n2. 考虑边界情况\n3. 从最简单的解法开始，再逐步优化\n\n你可以更具体地描述你遇到的困难吗？`;
}

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        '你好！我是本次测试的 AI 助手。你可以向我提问关于编程、算法的问题。\n\n注意：所有对话记录将作为评测的一部分，我们会评估你与 AI 协作的能力。',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const response = getSimulatedResponse(text);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = ['提示', 'Part A', 'Part B', 'Part C'];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50 shrink-0">
        <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
          <Sparkles size={14} className="text-indigo-600" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-800">AI 助手</div>
          <div className="text-xs text-gray-400">对话将被记录</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-gray-200' : 'bg-indigo-100'
              }`}
            >
              {msg.role === 'user' ? (
                <User size={14} className="text-gray-600" />
              ) : (
                <Bot size={14} className="text-indigo-600" />
              )}
            </div>
            <div
              className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-sm'
                  : 'bg-gray-100 text-gray-700 rounded-tl-sm'
              }`}
            >
              <MessageContent content={msg.content} isUser={msg.role === 'user'} />
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-indigo-600" />
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-xl rounded-tl-sm">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      <div className="px-3 py-2 flex gap-2 flex-wrap shrink-0">
        {quickQuestions.map((q) => (
          <button
            key={q}
            onClick={() => {
              setInput(q);
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
            className="px-2.5 py-1 text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-full transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 pb-3 shrink-0">
        <div className="flex items-end gap-2 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100 bg-white">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的问题..."
            rows={1}
            className="flex-1 resize-none text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent leading-relaxed max-h-24"
            style={{ minHeight: '24px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-30 disabled:hover:bg-indigo-600 transition-colors shrink-0"
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

  // Simple rendering for code blocks and bold text
  const parts = content.split(/(```[\s\S]*?```|\*\*[^*]+\*\*)/g);
  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const code = part.slice(3, -3).replace(/^\w+\n/, '');
          return (
            <code key={i} className="block bg-gray-800 text-gray-200 rounded px-2.5 py-2 my-1.5 text-xs font-mono">
              {code}
            </code>
          );
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-gray-800">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
