import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, ChevronDown, RotateCcw, FileCode, ChevronUp } from 'lucide-react';

const LANGUAGE_OPTIONS = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];

const DEFAULT_CODE = {
  A: `# Part A: Agent \u4efb\u52a1\u8c03\u5ea6\u7b97\u6cd5
# \u8bf7\u5728\u6b64\u5b9e\u73b0 schedule_tasks \u51fd\u6570

def schedule_tasks(agents, tasks):
    """
    \u5c06\u4efb\u52a1\u5206\u914d\u7ed9 Agent

    Args:
        agents: Agent \u5217\u8868\uff0c\u6bcf\u4e2a\u5305\u542b id, capability, current_load, max_load
        tasks: \u4efb\u52a1\u5217\u8868\uff0c\u6bcf\u4e2a\u5305\u542b id, difficulty, deadline, priority

    Returns:
        dict: task_id -> agent_id \u7684\u6620\u5c04
    """
    assignment = {}

    # TODO: \u5b9e\u73b0\u4f60\u7684\u8c03\u5ea6\u7b97\u6cd5
    # \u63d0\u793a\uff1a
    # 1. \u6309\u4f18\u5148\u7ea7\u6392\u5e8f\u4efb\u52a1
    # 2. \u5bf9\u6bcf\u4e2a\u4efb\u52a1\uff0c\u627e\u5230\u5408\u9002\u7684 Agent
    # 3. \u6ce8\u610f\u68c0\u67e5\u80fd\u529b\u503c\u548c\u8d1f\u8f7d\u7ea6\u675f

    return assignment


# \u6d4b\u8bd5\u6570\u636e
if __name__ == "__main__":
    agents = [
        {"id": 0, "capability": 8, "current_load": 2, "max_load": 10},
        {"id": 1, "capability": 5, "current_load": 0, "max_load": 6},
        {"id": 2, "capability": 10, "current_load": 5, "max_load": 12},
    ]

    tasks = [
        {"id": 0, "difficulty": 3, "deadline": 100, "priority": 5},
        {"id": 1, "difficulty": 7, "deadline": 200, "priority": 3},
        {"id": 2, "difficulty": 5, "deadline": 150, "priority": 4},
        {"id": 3, "difficulty": 9, "deadline": 300, "priority": 2},
    ]

    result = schedule_tasks(agents, tasks)
    print("\u5206\u914d\u7ed3\u679c:", result)
`,
  B: `# Part B: \u6784\u5efa RAG Agent
# \u8bf7\u5728\u6b64\u5b9e\u73b0 RAGAgent \u7c7b

import re
from collections import Counter
import math

class RAGAgent:
    def __init__(self, documents):
        """\u521d\u59cb\u5316 RAG Agent\uff0c\u5904\u7406\u5e76\u7d22\u5f15\u6587\u6863"""
        self.documents = documents
        self.chunks = []
        self.index = {}

        # TODO: \u5b9e\u73b0\u6587\u6863\u5206\u5757\u548c\u7d22\u5f15\u6784\u5efa
        self._build_index()

    def _build_index(self):
        """\u6784\u5efa\u6587\u6863\u7d22\u5f15"""
        # TODO: \u5b9e\u73b0\u5206\u5757\u548c TF-IDF/BM25 \u7d22\u5f15
        pass

    def retrieve(self, query, top_k=3):
        """\u68c0\u7d22\u6700\u76f8\u5173\u7684 top_k \u4e2a\u6587\u6863\u7247\u6bb5"""
        # TODO: \u5b9e\u73b0\u68c0\u7d22\u903b\u8f91
        return []

    def generate_answer(self, query):
        """\u57fa\u4e8e\u68c0\u7d22\u7ed3\u679c\u751f\u6210\u56de\u7b54"""
        # TODO: \u5b9e\u73b0\u7b54\u6848\u751f\u6210
        return ""

    def chat(self, query):
        """\u5b8c\u6574\u7684\u95ee\u7b54\u6d41\u7a0b"""
        # TODO: \u5b9e\u73b0\u5b8c\u6574\u6d41\u7a0b
        return {
            "answer": "",
            "sources": [],
            "confidence": 0.0,
        }


# \u6d4b\u8bd5
if __name__ == "__main__":
    docs = [
        "Transformer \u6a21\u578b\u7531 Vaswani \u7b49\u4eba\u5728 2017 \u5e74\u63d0\u51fa\uff0c\u57fa\u4e8e\u81ea\u6ce8\u610f\u529b\u673a\u5236...",
        "RAG \u6280\u672f\u7ed3\u5408\u4e86\u68c0\u7d22\u548c\u751f\u6210\u4e24\u79cd\u8303\u5f0f\uff0c\u80fd\u6709\u6548\u51cf\u5c11\u5e7b\u89c9...",
        "\u5411\u91cf\u6570\u636e\u5e93\u5982 Pinecone\u3001Milvus \u7528\u4e8e\u9ad8\u6548\u5b58\u50a8\u548c\u68c0\u7d22\u5d4c\u5165\u5411\u91cf...",
    ]

    agent = RAGAgent(docs)
    result = agent.chat("\u4ec0\u4e48\u662f RAG \u6280\u672f\uff1f")
    print(result)
`,
  C: `# Part C: AI \u4ee3\u7801\u5ba1\u67e5
# \u8bf7\u5ba1\u67e5\u4ee5\u4e0b LRU Cache \u5b9e\u73b0\uff0c\u627e\u51fa Bug \u5e76\u4fee\u590d

# ===== \u539f\u59cb\u4ee3\u7801\uff08\u5305\u542b Bug\uff09=====

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.order = []

    def get(self, key):
        if key in self.cache:
            self.order.remove(key)
            self.order.append(key)
            return self.cache[key]
        return -1

    def put(self, key, value):
        if key in self.cache:
            self.order.remove(key)
        elif len(self.cache) >= self.capacity:
            old = self.order[0]
            del self.order[0]
            del self.cache[old]

        self.cache[key] = value
        self.order.append(key)

    def delete(self, key):
        if key in self.cache:
            self.cache.remove(key)  # Bug!
            self.order.remove(key)
            return True
        return False

    def get_most_recent(self, n):
        return self.order[-n:]

    def clear(self):
        self.cache = {}
        self.order = []
        self.capacity = 0  # Bug!

    def resize(self, new_capacity):
        self.capacity = new_capacity
        while len(self.cache) > self.capacity:
            old = self.order[0]
            del self.order[0]
            del self.cache[old]


# ===== \u8bf7\u5728\u4e0b\u65b9\u5199\u51fa\u4f60\u7684\u5206\u6790\u548c\u4fee\u590d\u540e\u7684\u4ee3\u7801 =====

"""
Bug \u5206\u6790\uff1a
1.
2.
3.
4.
5.

\u6027\u80fd\u5206\u6790\uff1a
- get() \u65f6\u95f4\u590d\u6742\u5ea6\uff1a
- put() \u65f6\u95f4\u590d\u6742\u5ea6\uff1a
- \u4f18\u5316\u5efa\u8bae\uff1a
"""

# \u4fee\u590d\u540e\u7684\u4ee3\u7801

# \u5355\u5143\u6d4b\u8bd5
`,
};

export default function CodeEditor({ activePart, onLanguageChange }) {
  const [language, setLanguage] = useState('python');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [output, setOutput] = useState('');
  const [showOutput, setShowOutput] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [codes, setCodes] = useState({ ...DEFAULT_CODE });
  const editorRef = useRef(null);

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  const handleCodeChange = (value) => {
    setCodes((prev) => ({ ...prev, [activePart]: value }));
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowLangMenu(false);
    const label = LANGUAGE_OPTIONS.find((l) => l.value === lang)?.label || lang;
    onLanguageChange?.(label);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('\u6b63\u5728\u8fd0\u884c...\n');
    setShowOutput(true);
    setTimeout(() => {
      setOutput(
        `$ python solution.py\n\n` +
          `\u8fd0\u884c\u5b8c\u6210 \u2713\n` +
          `\u6267\u884c\u65f6\u95f4: 0.023s\n` +
          `\u5185\u5b58\u4f7f\u7528: 12.4 MB\n\n` +
          `> \u6d4b\u8bd5\u7528\u4f8b 1: \u901a\u8fc7\n` +
          `> \u6d4b\u8bd5\u7528\u4f8b 2: \u901a\u8fc7\n` +
          `> \u6d4b\u8bd5\u7528\u4f8b 3: \u7b49\u5f85\u63d0\u4ea4\u540e\u8bc4\u6d4b\n`
      );
      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    setCodes((prev) => ({ ...prev, [activePart]: DEFAULT_CODE[activePart] }));
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-3">
          {/* File tab */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 rounded text-sm text-white border border-slate-600">
            <FileCode size={14} className="text-yellow-400" />
            <span>solution.py</span>
          </div>

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-700 border border-slate-600 rounded hover:bg-slate-600 text-slate-300 transition-colors"
            >
              {LANGUAGE_OPTIONS.find((l) => l.value === language)?.label}
              <ChevronDown size={12} />
            </button>
            {showLangMenu && (
              <div className="absolute top-full left-0 mt-1 bg-slate-700 border border-slate-600 rounded shadow-xl z-10 min-w-[120px]">
                {LANGUAGE_OPTIONS.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => handleLanguageChange(lang.value)}
                    className={`block w-full text-left px-3 py-1.5 text-xs hover:bg-slate-600 transition-colors ${
                      language === lang.value ? 'text-indigo-400 bg-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded transition-colors"
          >
            <RotateCcw size={12} />
            \u91cd\u7f6e
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded disabled:opacity-50 transition-colors"
          >
            <Play size={12} />
            {isRunning ? '\u8fd0\u884c\u4e2d...' : '\u8fd0\u884c'}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={language}
          value={codes[activePart]}
          onChange={handleCodeChange}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            fontSize: 14,
            lineHeight: 22,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
            padding: { top: 12 },
            renderLineHighlight: 'line',
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
          }}
        />
      </div>

      {/* Output panel */}
      <div className="border-t border-slate-700 bg-slate-950 shrink-0">
        <div className="flex items-center justify-between px-3 py-1 border-b border-slate-800">
          <button
            onClick={() => setShowOutput(!showOutput)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 font-medium transition-colors"
          >
            {showOutput ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
            \u8f93\u51fa
          </button>
          {output && (
            <button
              onClick={() => setOutput('')}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              \u6e05\u9664
            </button>
          )}
        </div>
        {showOutput && output && (
          <pre className="p-3 text-xs text-emerald-300 font-mono max-h-40 overflow-y-auto leading-relaxed whitespace-pre-wrap">
            {output}
          </pre>
        )}
        {showOutput && !output && (
          <div className="p-3 text-xs text-slate-600 font-mono">
            \u70b9\u51fb "\u8fd0\u884c" \u6267\u884c\u4ee3\u7801...
          </div>
        )}
      </div>
    </div>
  );
}
