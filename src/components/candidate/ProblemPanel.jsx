import { useState } from 'react';
import { FileText, Folder, Eye } from 'lucide-react';

const PART_META = {
  A: { difficulty: '\u4e2d\u7b49', duration: '40 min', maxScore: 40 },
  B: { difficulty: '\u56f0\u96be', duration: '40 min', maxScore: 35 },
  C: { difficulty: '\u4e2d\u7b49', duration: '20 min', maxScore: 25 },
};

const PROBLEMS = {
  A: {
    title: 'Part A: Agent \u4efb\u52a1\u8c03\u5ea6\u7b97\u6cd5',
    content: `## \u9898\u76ee\u63cf\u8ff0

\u4f60\u6b63\u5728\u4e3a\u4e00\u4e2a\u591a Agent \u7cfb\u7edf\u8bbe\u8ba1\u4efb\u52a1\u8c03\u5ea6\u5668\u3002\u7cfb\u7edf\u4e2d\u6709 \`n\` \u4e2a Agent\uff0c\u6bcf\u4e2a Agent \u6709\u4e0d\u540c\u7684\u80fd\u529b\u503c\u548c\u5f53\u524d\u8d1f\u8f7d\u3002\u73b0\u5728\u6709 \`m\` \u4e2a\u4efb\u52a1\u9700\u8981\u5206\u914d\u3002

\u6bcf\u4e2a\u4efb\u52a1\u6709\uff1a
- \`difficulty\`\uff1a\u96be\u5ea6\u503c\uff08\u6574\u6570\uff09
- \`deadline\`\uff1a\u622a\u6b62\u65f6\u95f4\uff08\u6574\u6570\uff0c\u5355\u4f4d\uff1a\u79d2\uff09
- \`priority\`\uff1a\u4f18\u5148\u7ea7\uff081-5\uff0c5\u6700\u9ad8\uff09

\u6bcf\u4e2a Agent \u6709\uff1a
- \`capability\`\uff1a\u80fd\u529b\u503c\uff08\u6574\u6570\uff09
- \`current_load\`\uff1a\u5f53\u524d\u8d1f\u8f7d\uff08\u6574\u6570\uff09
- \`max_load\`\uff1a\u6700\u5927\u8d1f\u8f7d\uff08\u6574\u6570\uff09

### \u8981\u6c42

\u5b9e\u73b0\u51fd\u6570 \`schedule_tasks(agents, tasks)\`\uff0c\u8fd4\u56de\u4e00\u4e2a\u5206\u914d\u65b9\u6848\uff08\u5b57\u5178\uff1atask_id -> agent_id\uff09\uff0c\u6ee1\u8db3\uff1a

1. \u6bcf\u4e2a\u4efb\u52a1\u53ea\u80fd\u5206\u914d\u7ed9\u4e00\u4e2a Agent
2. Agent \u7684 \`capability\` \u5fc5\u987b >= \u4efb\u52a1\u7684 \`difficulty\`
3. \u5206\u914d\u540e Agent \u7684\u8d1f\u8f7d\u4e0d\u80fd\u8d85\u8fc7 \`max_load\`
4. \u4f18\u5148\u7ea7\u9ad8\u7684\u4efb\u52a1\u4f18\u5148\u88ab\u5206\u914d
5. \u5728\u6ee1\u8db3\u7ea6\u675f\u7684\u524d\u63d0\u4e0b\uff0c\u6700\u5927\u5316\u88ab\u5206\u914d\u7684\u4efb\u52a1\u6570\u91cf

### \u8f93\u5165\u683c\u5f0f

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

### \u8f93\u51fa\u683c\u5f0f

\`\`\`python
{0: 1, 1: 0, 2: 0, 3: 2}  # task_id -> agent_id
\`\`\`

### \u8bc4\u5206\u6807\u51c6

- \u6b63\u786e\u6027\uff0860%\uff09\uff1a\u901a\u8fc7\u6d4b\u8bd5\u7528\u4f8b
- \u65f6\u95f4\u590d\u6742\u5ea6\uff0820%\uff09\uff1a\u5206\u6790\u5e76\u4f18\u5316\u7b97\u6cd5\u590d\u6742\u5ea6
- \u4ee3\u7801\u8d28\u91cf\uff0820%\uff09\uff1a\u53ef\u8bfb\u6027\u3001\u6ce8\u91ca\u3001\u8fb9\u754c\u5904\u7406`,
  },
  B: {
    title: 'Part B: \u6784\u5efa RAG Agent',
    content: `## \u9898\u76ee\u63cf\u8ff0

\u8bf7\u8bbe\u8ba1\u5e76\u5b9e\u73b0\u4e00\u4e2a\u57fa\u4e8e RAG\uff08Retrieval-Augmented Generation\uff09\u7684\u95ee\u7b54 Agent\u3002

### \u80cc\u666f

\u4f60\u9700\u8981\u6784\u5efa\u4e00\u4e2a\u80fd\u591f\u57fa\u4e8e\u7ed9\u5b9a\u77e5\u8bc6\u5e93\u56de\u7b54\u95ee\u9898\u7684 Agent\u3002\u77e5\u8bc6\u5e93\u662f\u4e00\u7ec4\u6280\u672f\u6587\u6863\u7247\u6bb5\uff08\u5df2\u63d0\u4f9b\uff09\u3002

### \u8981\u6c42

\u5b9e\u73b0\u4e00\u4e2a \`RAGAgent\` \u7c7b\uff0c\u5305\u542b\u4ee5\u4e0b\u529f\u80fd\uff1a

\`\`\`python
class RAGAgent:
    def __init__(self, documents: list[str]):
        """\u521d\u59cb\u5316 RAG Agent\uff0c\u5904\u7406\u5e76\u7d22\u5f15\u6587\u6863"""
        pass

    def retrieve(self, query: str, top_k: int = 3) -> list[str]:
        """\u68c0\u7d22\u6700\u76f8\u5173\u7684 top_k \u4e2a\u6587\u6863\u7247\u6bb5"""
        pass

    def generate_answer(self, query: str) -> str:
        """\u57fa\u4e8e\u68c0\u7d22\u7ed3\u679c\u751f\u6210\u56de\u7b54"""
        pass

    def chat(self, query: str) -> dict:
        """\u5b8c\u6574\u7684\u95ee\u7b54\u6d41\u7a0b\uff0c\u8fd4\u56de\u7b54\u6848\u548c\u5f15\u7528\u6765\u6e90"""
        pass
\`\`\`

### \u5177\u4f53\u8981\u6c42

1. **\u6587\u6863\u5904\u7406**\uff1a\u5bf9\u6587\u6863\u8fdb\u884c\u5206\u5757\uff08chunk\uff09\uff0c\u6bcf\u5757\u4e0d\u8d85\u8fc7 512 \u4e2a\u5b57\u7b26
2. **\u5411\u91cf\u68c0\u7d22**\uff1a\u4f7f\u7528 TF-IDF \u6216 BM25 \u5b9e\u73b0\u7b80\u5355\u7684\u6587\u672c\u68c0\u7d22\uff08\u4e0d\u8981\u6c42\u4f7f\u7528\u5916\u90e8\u5411\u91cf\u6570\u636e\u5e93\uff09
3. **\u7b54\u6848\u751f\u6210**\uff1a\u6a21\u62df LLM \u8c03\u7528\uff0c\u5c06\u68c0\u7d22\u5230\u7684\u5185\u5bb9\u7ec4\u5408\u6210\u7ed3\u6784\u5316\u56de\u7b54
4. **\u5f15\u7528\u8ffd\u8e2a**\uff1a\u8fd4\u56de\u7ed3\u679c\u4e2d\u9700\u8981\u6807\u6ce8\u5f15\u7528\u4e86\u54ea\u4e9b\u6587\u6863\u7247\u6bb5

### \u6d4b\u8bd5\u6587\u6863

\`\`\`python
documents = [
    "Transformer \u6a21\u578b\u7531 Vaswani \u7b49\u4eba\u5728 2017 \u5e74\u63d0\u51fa...",
    "RAG \u6280\u672f\u7ed3\u5408\u4e86\u68c0\u7d22\u548c\u751f\u6210\u4e24\u79cd\u8303\u5f0f...",
    "\u5411\u91cf\u6570\u636e\u5e93\u5982 Pinecone\u3001Milvus \u7528\u4e8e\u5b58\u50a8\u5d4c\u5165\u5411\u91cf...",
    "LangChain \u662f\u4e00\u4e2a\u7528\u4e8e\u6784\u5efa LLM \u5e94\u7528\u7684\u6846\u67b6...",
    "Prompt Engineering \u662f\u4f18\u5316 AI \u8f93\u51fa\u7684\u5173\u952e\u6280\u672f...",
]
\`\`\`

### \u8bc4\u5206\u6807\u51c6

- \u67b6\u6784\u8bbe\u8ba1\uff0830%\uff09\uff1a\u7c7b\u7ed3\u6784\u3001\u6a21\u5757\u5212\u5206
- \u68c0\u7d22\u8d28\u91cf\uff0830%\uff09\uff1a\u76f8\u5173\u6027\u6392\u5e8f\u7684\u51c6\u786e\u5ea6
- \u4ee3\u7801\u8d28\u91cf\uff0820%\uff09\uff1a\u53ef\u8bfb\u6027\u3001\u5f02\u5e38\u5904\u7406
- \u521b\u65b0\u6027\uff0820%\uff09\uff1a\u989d\u5916\u529f\u80fd\uff08\u5982\u5bf9\u8bdd\u5386\u53f2\u3001\u91cd\u6392\u5e8f\uff09`,
  },
  C: {
    title: 'Part C: AI \u4ee3\u7801\u5ba1\u67e5',
    content: `## \u9898\u76ee\u63cf\u8ff0

\u4ee5\u4e0b\u662f\u4e00\u6bb5 AI \u751f\u6210\u7684\u4ee3\u7801\uff0c\u7528\u4e8e\u5b9e\u73b0\u4e00\u4e2a\u7b80\u5355\u7684 LRU Cache\u3002\u4ee3\u7801\u4e2d\u5305\u542b\u82e5\u5e72 Bug \u548c\u8bbe\u8ba1\u95ee\u9898\uff0c\u8bf7\u627e\u51fa\u5e76\u4fee\u590d\u3002

### \u5f85\u5ba1\u67e5\u4ee3\u7801

\`\`\`python
class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.order = []

    def get(self, key):
        if key in self.cache:
            # \u79fb\u5230\u6700\u8fd1\u4f7f\u7528
            self.order.remove(key)
            self.order.append(key)
            return self.cache[key]
        return -1

    def put(self, key, value):
        if key in self.cache:
            self.order.remove(key)
        elif len(self.cache) >= self.capacity:
            # \u5220\u9664\u6700\u4e45\u672a\u4f7f\u7528
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

### \u8981\u6c42

1. **\u627e\u51fa\u6240\u6709 Bug**\uff1a\u5217\u51fa\u6bcf\u4e2a Bug \u7684\u4f4d\u7f6e\u3001\u539f\u56e0\u548c\u4fee\u590d\u65b9\u6848
2. **\u6027\u80fd\u5206\u6790**\uff1a\u5206\u6790\u5f53\u524d\u5b9e\u73b0\u7684\u65f6\u95f4\u590d\u6742\u5ea6\uff0c\u6307\u51fa\u6027\u80fd\u74f6\u9888
3. **\u91cd\u6784\u5efa\u8bae**\uff1a\u63d0\u51fa\u4f7f\u7528\u66f4\u9ad8\u6548\u6570\u636e\u7ed3\u6784\u7684\u65b9\u6848\uff08\u5982 OrderedDict \u6216\u53cc\u5411\u94fe\u8868\uff09
4. **\u7f16\u5199\u6d4b\u8bd5**\uff1a\u4e3a\u4fee\u590d\u540e\u7684\u4ee3\u7801\u7f16\u5199\u5355\u5143\u6d4b\u8bd5
5. **\u63d0\u4ea4\u4fee\u590d\u540e\u7684\u5b8c\u6574\u4ee3\u7801**

### \u8bc4\u5206\u6807\u51c6

- Bug \u53d1\u73b0\u5b8c\u6574\u5ea6\uff0830%\uff09
- \u4fee\u590d\u65b9\u6848\u8d28\u91cf\uff0825%\uff09
- \u6027\u80fd\u4f18\u5316\u5efa\u8bae\uff0825%\uff09
- \u6d4b\u8bd5\u8986\u76d6\u5ea6\uff0820%\uff09

### \u63d0\u793a

\u81f3\u5c11\u5b58\u5728 **5 \u4e2a** Bug \u6216\u8bbe\u8ba1\u95ee\u9898\u3002\u8bf7\u4ed4\u7ec6\u5ba1\u67e5\u6bcf\u4e00\u4e2a\u65b9\u6cd5\u3002`,
  },
};

export default function ProblemPanel({ activePart, onPartChange }) {
  const parts = ['A', 'B', 'C'];
  const icons = { A: FileText, B: Folder, C: Eye };
  const meta = PART_META[activePart];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Dark header bar */}
      <div className="bg-slate-800 text-sm text-slate-300 px-4 py-2 shrink-0 flex items-center justify-between">
        <span className="font-medium tracking-wide text-xs uppercase">Problem</span>
        <div className="flex items-center gap-2">
          {parts.map((part) => {
            const Icon = icons[part];
            return (
              <button
                key={part}
                onClick={() => onPartChange(part)}
                className={`flex items-center gap-1 px-2 py-0.5 text-xs rounded transition-colors ${
                  activePart === part
                    ? 'bg-slate-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                <Icon size={12} />
                {part}
              </button>
            );
          })}
        </div>
      </div>

      {/* Part info badges */}
      <div className="px-5 pt-4 pb-2 border-b border-gray-100 shrink-0">
        <h2 className="text-base font-semibold text-gray-900 mb-2">
          {PROBLEMS[activePart].title}
        </h2>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 text-xs rounded font-medium ${
            meta.difficulty === '\u56f0\u96be'
              ? 'bg-red-50 text-red-600'
              : 'bg-amber-50 text-amber-600'
          }`}>
            {meta.difficulty}
          </span>
          <span className="px-2 py-0.5 text-xs rounded bg-blue-50 text-blue-600 font-medium">
            {meta.duration}
          </span>
          <span className="px-2 py-0.5 text-xs rounded bg-emerald-50 text-emerald-600 font-medium">
            {meta.maxScore} \u5206
          </span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="prose prose-sm max-w-none">
          <ProblemMarkdown content={PROBLEMS[activePart].content} />
        </div>
      </div>
    </div>
  );
}

/* Simple markdown-like renderer */
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
            className="bg-slate-900 text-slate-100 rounded-lg p-4 text-xs leading-relaxed overflow-x-auto my-3 border border-slate-700"
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
            className="bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-200"
          >
            {part.slice(1, -1)}
          </code>
        ) : part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold text-gray-800">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
