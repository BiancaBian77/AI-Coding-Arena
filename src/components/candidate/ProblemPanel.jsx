import { useState } from 'react';
import { FileText, Folder, Eye } from 'lucide-react';

const PROBLEMS = {
  A: {
    title: 'Part A: Agent 任务调度算法',
    content: `## 题目描述

你正在为一个多 Agent 系统设计任务调度器。系统中有 \`n\` 个 Agent，每个 Agent 有不同的能力值和当前负载。现在有 \`m\` 个任务需要分配。

每个任务有：
- \`difficulty\`：难度值（整数）
- \`deadline\`：截止时间（整数，单位：秒）
- \`priority\`：优先级（1-5，5最高）

每个 Agent 有：
- \`capability\`：能力值（整数）
- \`current_load\`：当前负载（整数）
- \`max_load\`：最大负载（整数）

### 要求

实现函数 \`schedule_tasks(agents, tasks)\`，返回一个分配方案（字典：task_id -> agent_id），满足：

1. 每个任务只能分配给一个 Agent
2. Agent 的 \`capability\` 必须 >= 任务的 \`difficulty\`
3. 分配后 Agent 的负载不能超过 \`max_load\`
4. 优先级高的任务优先被分配
5. 在满足约束的前提下，最大化被分配的任务数量

### 输入格式

\`\`\`python
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
\`\`\`

### 输出格式

\`\`\`python
{0: 1, 1: 0, 2: 0, 3: 2}  # task_id -> agent_id
\`\`\`

### 评分标准

- 正确性（60%）：通过测试用例
- 时间复杂度（20%）：分析并优化算法复杂度
- 代码质量（20%）：可读性、注释、边界处理`,
  },
  B: {
    title: 'Part B: 构建 RAG Agent',
    content: `## 题目描述

请设计并实现一个基于 RAG（Retrieval-Augmented Generation）的问答 Agent。

### 背景

你需要构建一个能够基于给定知识库回答问题的 Agent。知识库是一组技术文档片段（已提供）。

### 要求

实现一个 \`RAGAgent\` 类，包含以下功能：

\`\`\`python
class RAGAgent:
    def __init__(self, documents: list[str]):
        """初始化 RAG Agent，处理并索引文档"""
        pass

    def retrieve(self, query: str, top_k: int = 3) -> list[str]:
        """检索最相关的 top_k 个文档片段"""
        pass

    def generate_answer(self, query: str) -> str:
        """基于检索结果生成回答"""
        pass

    def chat(self, query: str) -> dict:
        """完整的问答流程，返回答案和引用来源"""
        pass
\`\`\`

### 具体要求

1. **文档处理**：对文档进行分块（chunk），每块不超过 512 个字符
2. **向量检索**：使用 TF-IDF 或 BM25 实现简单的文本检索（不要求使用外部向量数据库）
3. **答案生成**：模拟 LLM 调用，将检索到的内容组合成结构化回答
4. **引用追踪**：返回结果中需要标注引用了哪些文档片段

### 测试文档

\`\`\`python
documents = [
    "Transformer 模型由 Vaswani 等人在 2017 年提出...",
    "RAG 技术结合了检索和生成两种范式...",
    "向量数据库如 Pinecone、Milvus 用于存储嵌入向量...",
    "LangChain 是一个用于构建 LLM 应用的框架...",
    "Prompt Engineering 是优化 AI 输出的关键技术...",
]
\`\`\`

### 评分标准

- 架构设计（30%）：类结构、模块划分
- 检索质量（30%）：相关性排序的准确度
- 代码质量（20%）：可读性、异常处理
- 创新性（20%）：额外功能（如对话历史、重排序）`,
  },
  C: {
    title: 'Part C: AI 代码审查',
    content: `## 题目描述

以下是一段 AI 生成的代码，用于实现一个简单的 LRU Cache。代码中包含若干 Bug 和设计问题，请找出并修复。

### 待审查代码

\`\`\`python
class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.order = []

    def get(self, key):
        if key in self.cache:
            # 移到最近使用
            self.order.remove(key)
            self.order.append(key)
            return self.cache[key]
        return -1

    def put(self, key, value):
        if key in self.cache:
            self.order.remove(key)
        elif len(self.cache) >= self.capacity:
            # 删除最久未使用
            old = self.order[0]
            del self.order[0]
            del self.cache[old]

        self.cache[key] = value
        self.order.append(key)

    def delete(self, key):
        if key in self.cache:
            self.cache.remove(key)
            self.order.remove(key)
            return True
        return False

    def get_most_recent(self, n):
        return self.order[-n:]

    def clear(self):
        self.cache = {}
        self.order = []
        self.capacity = 0

    def resize(self, new_capacity):
        self.capacity = new_capacity
        while len(self.cache) > self.capacity:
            old = self.order[0]
            del self.order[0]
            del self.cache[old]
\`\`\`

### 要求

1. **找出所有 Bug**：列出每个 Bug 的位置、原因和修复方案
2. **性能分析**：分析当前实现的时间复杂度，指出性能瓶颈
3. **重构建议**：提出使用更高效数据结构的方案（如 OrderedDict 或双向链表）
4. **编写测试**：为修复后的代码编写单元测试
5. **提交修复后的完整代码**

### 评分标准

- Bug 发现完整度（30%）
- 修复方案质量（25%）
- 性能优化建议（25%）
- 测试覆盖度（20%）

### 提示

至少存在 **5 个** Bug 或设计问题。请仔细审查每一个方法。`,
  },
};

export default function ProblemPanel({ activePart, onPartChange }) {
  const parts = ['A', 'B', 'C'];
  const icons = { A: FileText, B: Folder, C: Eye };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50 shrink-0">
        {parts.map((part) => {
          const Icon = icons[part];
          return (
            <button
              key={part}
              onClick={() => onPartChange(part)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                activePart === part
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={15} />
              Part {part}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {PROBLEMS[activePart].title}
        </h2>
        <div className="prose prose-sm prose-gray max-w-none">
          <ProblemMarkdown content={PROBLEMS[activePart].content} />
        </div>
      </div>
    </div>
  );
}

/* Simple markdown-like renderer (no external dep) */
function ProblemMarkdown({ content }) {
  const lines = content.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeLines = [];
  let codeLang = '';
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={key++}
            className="bg-gray-900 text-gray-100 rounded-lg p-4 text-xs leading-relaxed overflow-x-auto my-3"
          >
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLang = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={key++} className="text-base font-semibold text-gray-800 mt-5 mb-2">
          {line.slice(3)}
        </h3>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h4 key={key++} className="text-sm font-semibold text-gray-700 mt-4 mb-1.5">
          {line.slice(4)}
        </h4>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-sm text-gray-600 ml-4 mb-1 list-disc">
          <InlineCode text={line.slice(2)} />
        </li>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, '');
      elements.push(
        <li key={key++} className="text-sm text-gray-600 ml-4 mb-1 list-decimal">
          <InlineCode text={text} />
        </li>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-sm text-gray-600 mb-1.5 leading-relaxed">
          <InlineCode text={line} />
        </p>
      );
    }
  }

  return <div>{elements}</div>;
}

function InlineCode({ text }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('`') && part.endsWith('`') ? (
          <code
            key={i}
            className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-xs font-mono"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
