import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, ChevronDown, RotateCcw } from 'lucide-react';

const LANGUAGE_OPTIONS = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];

const DEFAULT_CODE = {
  A: `# Part A: Agent 任务调度算法
# 请在此实现 schedule_tasks 函数

def schedule_tasks(agents, tasks):
    """
    将任务分配给 Agent

    Args:
        agents: Agent 列表，每个包含 id, capability, current_load, max_load
        tasks: 任务列表，每个包含 id, difficulty, deadline, priority

    Returns:
        dict: task_id -> agent_id 的映射
    """
    assignment = {}

    # TODO: 实现你的调度算法
    # 提示：
    # 1. 按优先级排序任务
    # 2. 对每个任务，找到合适的 Agent
    # 3. 注意检查能力值和负载约束

    return assignment


# 测试数据
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
    print("分配结果:", result)
`,
  B: `# Part B: 构建 RAG Agent
# 请在此实现 RAGAgent 类

import re
from collections import Counter
import math

class RAGAgent:
    def __init__(self, documents):
        """初始化 RAG Agent，处理并索引文档"""
        self.documents = documents
        self.chunks = []
        self.index = {}

        # TODO: 实现文档分块和索引构建
        self._build_index()

    def _build_index(self):
        """构建文档索引"""
        # TODO: 实现分块和 TF-IDF/BM25 索引
        pass

    def retrieve(self, query, top_k=3):
        """检索最相关的 top_k 个文档片段"""
        # TODO: 实现检索逻辑
        return []

    def generate_answer(self, query):
        """基于检索结果生成回答"""
        # TODO: 实现答案生成
        return ""

    def chat(self, query):
        """完整的问答流程"""
        # TODO: 实现完整流程
        return {
            "answer": "",
            "sources": [],
            "confidence": 0.0,
        }


# 测试
if __name__ == "__main__":
    docs = [
        "Transformer 模型由 Vaswani 等人在 2017 年提出，基于自注意力机制...",
        "RAG 技术结合了检索和生成两种范式，能有效减少幻觉...",
        "向量数据库如 Pinecone、Milvus 用于高效存储和检索嵌入向量...",
    ]

    agent = RAGAgent(docs)
    result = agent.chat("什么是 RAG 技术？")
    print(result)
`,
  C: `# Part C: AI 代码审查
# 请审查以下 LRU Cache 实现，找出 Bug 并修复

# ===== 原始代码（包含 Bug）=====

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


# ===== 请在下方写出你的分析和修复后的代码 =====

"""
Bug 分析：
1.
2.
3.
4.
5.

性能分析：
- get() 时间复杂度：
- put() 时间复杂度：
- 优化建议：
"""

# 修复后的代码

# 单元测试
`,
};

export default function CodeEditor({ activePart }) {
  const [language, setLanguage] = useState('python');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [codes, setCodes] = useState({ ...DEFAULT_CODE });
  const editorRef = useRef(null);

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  const handleCodeChange = (value) => {
    setCodes((prev) => ({ ...prev, [activePart]: value }));
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('正在运行...\n');
    setTimeout(() => {
      setOutput(
        `$ python solution.py\n\n` +
          `运行完成 ✓\n` +
          `执行时间: 0.023s\n` +
          `内存使用: 12.4 MB\n\n` +
          `> 测试用例 1: 通过\n` +
          `> 测试用例 2: 通过\n` +
          `> 测试用例 3: 等待提交后评测\n`
      );
      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    setCodes((prev) => ({ ...prev, [activePart]: DEFAULT_CODE[activePart] }));
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50 shrink-0">
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
            >
              {LANGUAGE_OPTIONS.find((l) => l.value === language)?.label}
              <ChevronDown size={14} />
            </button>
            {showLangMenu && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {LANGUAGE_OPTIONS.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => {
                      setLanguage(lang.value);
                      setShowLangMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      language === lang.value ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="text-xs text-gray-400">solution.py</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          >
            <RotateCcw size={13} />
            重置
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md disabled:opacity-50 transition-colors"
          >
            <Play size={14} />
            {isRunning ? '运行中...' : '运行'}
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
          theme="vs-light"
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
      {output && (
        <div className="border-t border-gray-200 bg-gray-900 shrink-0">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-700">
            <span className="text-xs text-gray-400 font-medium">输出</span>
            <button
              onClick={() => setOutput('')}
              className="text-xs text-gray-500 hover:text-gray-300"
            >
              清除
            </button>
          </div>
          <pre className="p-3 text-xs text-gray-200 font-mono max-h-40 overflow-y-auto leading-relaxed whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
