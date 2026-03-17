import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const SIMULATED_RESPONSES = {
  '\u4f60\u597d': '\u4f60\u597d\uff01\u6211\u662f\u4f60\u7684 AI \u52a9\u624b\uff0c\u5728\u672c\u6b21\u6d4b\u8bd5\u4e2d\u53ef\u4ee5\u4e3a\u4f60\u63d0\u4f9b\u7f16\u7a0b\u5e2e\u52a9\u3002\u4f60\u53ef\u4ee5\u95ee\u6211\u5173\u4e8e\u7b97\u6cd5\u601d\u8def\u3001\u8bed\u6cd5\u95ee\u9898\u6216\u8c03\u8bd5\u5efa\u8bae\u3002\u8bf7\u6ce8\u610f\uff0c\u6240\u6709\u5bf9\u8bdd\u90fd\u4f1a\u88ab\u8bb0\u5f55\u4f5c\u4e3a\u8bc4\u6d4b\u53c2\u8003\u3002',
  '\u63d0\u793a': '\u6211\u53ef\u4ee5\u7ed9\u4f60\u4e00\u4e9b\u65b9\u5411\u6027\u7684\u63d0\u793a\uff0c\u4f46\u4e0d\u4f1a\u76f4\u63a5\u7ed9\u51fa\u5b8c\u6574\u7b54\u6848\u3002\u4f60\u60f3\u4e86\u89e3\u54ea\u4e2a\u90e8\u5206\u7684\u63d0\u793a\uff1f\n\n- Part A: \u4efb\u52a1\u8c03\u5ea6\u7b97\u6cd5\n- Part B: RAG Agent \u6784\u5efa\n- Part C: \u4ee3\u7801\u5ba1\u67e5',
  'part a': '\u5173\u4e8e Part A \u4efb\u52a1\u8c03\u5ea6\u7b97\u6cd5\uff0c\u5efa\u8bae\u4f60\u8003\u8651\u4ee5\u4e0b\u601d\u8def\uff1a\n\n1. **\u8d2a\u5fc3\u7b56\u7565**\uff1a\u6309\u4f18\u5148\u7ea7\u964d\u5e8f\u6392\u5217\u4efb\u52a1\uff0c\u4f9d\u6b21\u5206\u914d\u7ed9\u6700\u5408\u9002\u7684 Agent\n2. **"\u6700\u5408\u9002"\u7684\u5b9a\u4e49**\uff1a\u53ef\u4ee5\u662f\u5269\u4f59\u5bb9\u91cf\u6700\u5927\u7684\u3001\u6216\u80fd\u529b\u503c\u6700\u63a5\u8fd1\u4efb\u52a1\u96be\u5ea6\u7684 Agent\n3. **\u6ce8\u610f\u8fb9\u754c\u6761\u4ef6**\uff1aAgent \u8d1f\u8f7d\u4e0d\u80fd\u8d85\u8fc7 max_load\n\n\u4f60\u60f3\u6df1\u5165\u4e86\u89e3\u54ea\u4e2a\u65b9\u9762\uff1f',
  'part b': '\u5173\u4e8e Part B RAG Agent \u6784\u5efa\uff1a\n\n1. **\u6587\u6863\u5206\u5757**\uff1a\u53ef\u4ee5\u6309\u56fa\u5b9a\u957f\u5ea6\u6216\u6309\u6bb5\u843d\u5206\u5757\uff0c\u6ce8\u610f\u4fdd\u7559\u8bed\u4e49\u5b8c\u6574\u6027\n2. **\u68c0\u7d22\u65b9\u6848**\uff1aTF-IDF \u662f\u6700\u7b80\u5355\u7684\u65b9\u6848\uff0c\u7528 `Counter` \u7edf\u8ba1\u8bcd\u9891\u5373\u53ef\n3. **BM25 \u66f4\u4f18**\uff1a\u5728 TF-IDF \u57fa\u7840\u4e0a\u8003\u8651\u4e86\u6587\u6863\u957f\u5ea6\u5f52\u4e00\u5316\n\n\u9700\u8981\u6211\u89e3\u91ca BM25 \u7684\u516c\u5f0f\u5417\uff1f',
  'part c': '\u5173\u4e8e Part C \u4ee3\u7801\u5ba1\u67e5\uff0c\u7ed9\u4f60\u51e0\u4e2a\u65b9\u5411\uff1a\n\n1. \u6ce8\u610f `dict` \u548c `list` \u7684\u65b9\u6cd5\u533a\u522b\n2. `clear()` \u65b9\u6cd5\u662f\u5426\u5e94\u8be5\u91cd\u7f6e capacity\uff1f\n3. `get_most_recent(n)` \u5f53 n \u5927\u4e8e\u5217\u8868\u957f\u5ea6\u65f6\u4f1a\u600e\u6837\uff1f\n4. \u6574\u4f53\u7684\u65f6\u95f4\u590d\u6742\u5ea6\u662f\u5426\u53ef\u4ee5\u4f18\u5316\uff1f\n\n\u4ed4\u7ec6\u770b\u6bcf\u4e2a\u65b9\u6cd5\u7684\u5b9e\u73b0\u7ec6\u8282\u3002',
  'bm25': 'BM25 \u8bc4\u5206\u516c\u5f0f\uff1a\n\n```\nscore(q, d) = \u03a3 IDF(qi) \u00b7 (tf \u00b7 (k1 + 1)) / (tf + k1 \u00b7 (1 - b + b \u00b7 |d|/avgdl))\n```\n\n\u5176\u4e2d\uff1a\n- `tf` \u662f\u8bcd\u9891\n- `k1` \u901a\u5e38\u53d6 1.2-2.0\n- `b` \u901a\u5e38\u53d6 0.75\n- `|d|` \u662f\u6587\u6863\u957f\u5ea6\n- `avgdl` \u662f\u5e73\u5747\u6587\u6863\u957f\u5ea6\n\n\u5728 Python \u4e2d\u53ef\u4ee5\u7528 `math.log` \u8ba1\u7b97 IDF\u3002',
  '\u65f6\u95f4\u590d\u6742\u5ea6': '\u5173\u4e8e LRU Cache \u7684\u65f6\u95f4\u590d\u6742\u5ea6\u5206\u6790\uff1a\n\n\u5f53\u524d\u5b9e\u73b0\u4f7f\u7528 `list` \u4f5c\u4e3a order \u8bb0\u5f55\uff1a\n- `list.remove()` \u662f O(n) \u64cd\u4f5c\n- `del list[0]` \u4e5f\u662f O(n) \u64cd\u4f5c\n\n\u8fd9\u5bfc\u81f4 `get()` \u548c `put()` \u90fd\u662f **O(n)**\u3002\n\n\u7406\u60f3\u7684 LRU Cache \u5e94\u8be5\u7528 **OrderedDict** \u6216 **\u53cc\u5411\u94fe\u8868 + \u54c8\u5e0c\u8868**\uff0c\u53ef\u4ee5\u505a\u5230 O(1)\u3002',
};

function getSimulatedResponse(input) {
  const lower = input.toLowerCase().trim();

  for (const [key, response] of Object.entries(SIMULATED_RESPONSES)) {
    if (lower.includes(key.toLowerCase())) {
      return response;
    }
  }

  return `\u597d\u7684\uff0c\u8ba9\u6211\u60f3\u60f3\u5173\u4e8e\u201c${input}\u201d\u7684\u5efa\u8bae\u3002\n\n\u8fd9\u662f\u4e00\u4e2a\u5f88\u597d\u7684\u95ee\u9898\u3002\u5728\u89e3\u51b3\u8fd9\u7c7b\u95ee\u9898\u65f6\uff0c\u5efa\u8bae\u4f60\uff1a\n1. \u5148\u660e\u786e\u8f93\u5165\u8f93\u51fa\u7684\u683c\u5f0f\u8981\u6c42\n2. \u8003\u8651\u8fb9\u754c\u60c5\u51b5\n3. \u4ece\u6700\u7b80\u5355\u7684\u89e3\u6cd5\u5f00\u59cb\uff0c\u518d\u9010\u6b65\u4f18\u5316\n\n\u4f60\u53ef\u4ee5\u66f4\u5177\u4f53\u5730\u63cf\u8ff0\u4f60\u9047\u5230\u7684\u56f0\u96be\u5417\uff1f`;
}

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        '\u4f60\u597d\uff01\u6211\u662f\u672c\u6b21\u6d4b\u8bd5\u7684 AI \u52a9\u624b\u3002\u4f60\u53ef\u4ee5\u5411\u6211\u63d0\u95ee\u5173\u4e8e\u7f16\u7a0b\u3001\u7b97\u6cd5\u7684\u95ee\u9898\u3002\n\n\u6ce8\u610f\uff1a\u6240\u6709\u5bf9\u8bdd\u8bb0\u5f55\u5c06\u4f5c\u4e3a\u8bc4\u6d4b\u7684\u4e00\u90e8\u5206\uff0c\u6211\u4eec\u4f1a\u8bc4\u4f30\u4f60\u4e0e AI \u534f\u4f5c\u7684\u80fd\u529b\u3002',
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

  const quickQuestions = ['\u63d0\u793a', 'Part A', 'Part B', 'Part C'];

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700 shrink-0">
        <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
          <Sparkles size={12} className="text-white" />
        </div>
        <span className="text-sm font-medium text-slate-200">AI \u52a9\u624b</span>
        <span className="flex items-center gap-1 ml-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-400">online</span>
        </span>
      </div>

      {/* Quick question chips */}
      <div className="px-3 py-2 flex gap-1.5 flex-wrap shrink-0 bg-slate-800/50 border-b border-slate-700/50">
        {quickQuestions.map((q) => (
          <button
            key={q}
            onClick={() => {
              setInput(q);
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
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
            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 text-[10px] font-bold text-white">
              AI
            </div>
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
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="\u8f93\u5165\u4f60\u7684\u95ee\u9898..."
            rows={1}
            className="flex-1 resize-none text-sm text-gray-700 placeholder-gray-400 outline-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 leading-relaxed max-h-24"
            style={{ minHeight: '36px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 disabled:hover:bg-indigo-600 transition-colors shrink-0"
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
          return (
            <code key={i} className="block bg-slate-900 text-emerald-300 rounded px-3 py-2.5 my-1.5 text-xs font-mono leading-relaxed">
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
