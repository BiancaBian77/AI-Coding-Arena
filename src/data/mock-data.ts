import { Candidate, TestQuestion, CandidateDetail, AIConversation } from "@/lib/types";

export const mockCandidates: Candidate[] = [
  {
    id: "c1",
    name: "张三",
    position: "AI 算法工程师",
    email: "zhangsan@example.com",
    testDate: "2026-03-15 14:00",
    status: "completed",
    scores: {
      overall: 78,
      dimensions: {
        independentCoding: {
          score: 70,
          maxScore: 100,
          weight: 0.2,
          label: "独立 Coding",
          details: ["测试用例通过率 80%", "代码规范得分 75/100", "前10分钟独立完成核心数据结构"],
        },
        aiEfficiency: {
          score: 85,
          maxScore: 100,
          weight: 0.25,
          label: "AI 提效能力",
          details: ["47 轮对话，节奏合理", "AI 建议采纳率 68%", "效率提升约 35%"],
        },
        aiCritical: {
          score: 75,
          maxScore: 100,
          weight: 0.25,
          label: "AI 批判能力",
          details: ["识别 4/5 处 bug", "盲目采纳率 12%", "3 次主动质疑 AI 建议"],
        },
        endToEnd: {
          score: 80,
          maxScore: 100,
          weight: 0.2,
          label: "端到端能力",
          details: ["3 个 endpoint 均可运行", "包含 Dockerfile", "2 个单元测试"],
        },
        crossDomain: {
          score: 75,
          maxScore: 100,
          weight: 0.1,
          label: "跨领域能力",
          details: ["架构设计清晰", "考虑了缓存策略", "设计适度，无过度工程"],
        },
      },
    },
  },
  {
    id: "c2",
    name: "李四",
    position: "后端开发工程师",
    email: "lisi@example.com",
    testDate: "2026-03-15 16:00",
    status: "completed",
    scores: {
      overall: 62,
      dimensions: {
        independentCoding: {
          score: 55,
          maxScore: 100,
          weight: 0.2,
          label: "独立 Coding",
          details: ["测试用例通过率 60%", "代码规范得分 50/100", "前10分钟几乎无代码产出"],
        },
        aiEfficiency: {
          score: 45,
          maxScore: 100,
          weight: 0.25,
          label: "AI 提效能力",
          details: ["92 轮对话，过于频繁", "AI 建议采纳率 85%（过高）", "效率提升约 15%"],
        },
        aiCritical: {
          score: 40,
          maxScore: 100,
          weight: 0.25,
          label: "AI 批判能力",
          details: ["识别 1/5 处 bug", "盲目采纳率 55%", "0 次质疑 AI 建议"],
        },
        endToEnd: {
          score: 70,
          maxScore: 100,
          weight: 0.2,
          label: "端到端能力",
          details: ["2 个 endpoint 可运行", "无部署文档", "1 个单元测试"],
        },
        crossDomain: {
          score: 60,
          maxScore: 100,
          weight: 0.1,
          label: "跨领域能力",
          details: ["架构基本合理", "未考虑性能优化", "部分过度设计"],
        },
      },
    },
  },
  {
    id: "c3",
    name: "王五",
    position: "全栈开发工程师",
    email: "wangwu@example.com",
    testDate: "2026-03-16 10:00",
    status: "in_progress",
  },
  {
    id: "c4",
    name: "赵六",
    position: "AI 应用开发",
    email: "zhaoliu@example.com",
    testDate: "2026-03-17 14:00",
    status: "pending",
  },
];

export const mockQuestions: TestQuestion[] = [
  {
    id: "q1",
    part: "A",
    title: "Agent 任务调度优化",
    duration: 30,
    maxScore: 30,
    description: `## Part A：算法题 — Agent 任务调度优化

### 背景
你正在设计一个多 Agent 协作系统的任务调度器。

### 需求
1. 实现一个任务优先级队列，支持动态优先级调整
2. 当多个 Agent 竞争同一资源时，实现 deadlock 检测
3. 优化目标：最小化平均任务完成时间

### 输入
- \`tasks: List[Task]\`，每个 Task 包含 \`{id, priority, estimated_time, required_resources}\`
- \`agents: List[Agent]\`，每个 Agent 包含 \`{id, available_resources}\`

### 输出
- \`schedule: List[Assignment]\`，每个 Assignment 包含 \`{task_id, agent_id, start_time}\`

### 约束
- 时间复杂度要求：O(n log n)
- 空间复杂度要求：O(n)

### 评分标准
- 功能正确性（50%）：通过所有测试用例
- 代码质量（30%）：可读性、模块化、注释
- 优化效果（20%）：相比 baseline 的性能提升`,
    starterCode: `from typing import List, Dict, Any
from dataclasses import dataclass
import heapq

@dataclass
class Task:
    id: str
    priority: int
    estimated_time: float
    required_resources: List[str]

@dataclass
class Agent:
    id: str
    available_resources: List[str]

@dataclass
class Assignment:
    task_id: str
    agent_id: str
    start_time: float


class TaskScheduler:
    """多 Agent 协作系统的任务调度器"""

    def __init__(self, agents: List[Agent]):
        self.agents = agents
        # TODO: 初始化数据结构

    def schedule(self, tasks: List[Task]) -> List[Assignment]:
        """
        调度任务到各个 Agent
        要求：最小化平均任务完成时间
        """
        # TODO: 实现调度逻辑
        pass

    def detect_deadlock(self, assignments: List[Assignment]) -> bool:
        """
        检测当前调度是否存在死锁
        返回 True 如果存在死锁
        """
        # TODO: 实现死锁检测
        pass

    def adjust_priority(self, task_id: str, new_priority: int) -> None:
        """动态调整任务优先级"""
        # TODO: 实现优先级调整
        pass


# 测试用例
if __name__ == "__main__":
    agents = [
        Agent(id="agent_1", available_resources=["gpu", "memory"]),
        Agent(id="agent_2", available_resources=["cpu", "memory"]),
        Agent(id="agent_3", available_resources=["gpu", "cpu"]),
    ]

    tasks = [
        Task(id="task_1", priority=3, estimated_time=5.0, required_resources=["gpu"]),
        Task(id="task_2", priority=1, estimated_time=3.0, required_resources=["cpu"]),
        Task(id="task_3", priority=2, estimated_time=4.0, required_resources=["memory"]),
        Task(id="task_4", priority=5, estimated_time=2.0, required_resources=["gpu", "cpu"]),
    ]

    scheduler = TaskScheduler(agents)
    result = scheduler.schedule(tasks)

    print("调度结果：")
    for assignment in result:
        print(f"  Task {assignment.task_id} -> Agent {assignment.agent_id} @ t={assignment.start_time}")

    has_deadlock = scheduler.detect_deadlock(result)
    print(f"\\n死锁检测：{'存在死锁' if has_deadlock else '无死锁'}")
`,
    testCases: [
      {
        input: '{"tasks": [{"id": "t1", "priority": 1, "estimated_time": 3, "required_resources": ["gpu"]}], "agents": [{"id": "a1", "available_resources": ["gpu"]}]}',
        expectedOutput: '[{"task_id": "t1", "agent_id": "a1", "start_time": 0}]',
        isHidden: false,
      },
    ],
  },
  {
    id: "q2",
    part: "B",
    title: "构建一个简单的 RAG Agent",
    duration: 60,
    maxScore: 50,
    description: `## Part B：开放项目 — 构建一个简单的 RAG Agent

### 背景
公司需要一个内部知识库问答 Agent，基于 RAG 架构。

### 需求
1. 实现文档加载和向量化（可用 mock 数据）
2. 实现相似度检索（top-k）
3. 实现问答生成（调用 LLM API，可用 mock）
4. 实现简单的对话历史管理

### 技术栈
- 语言：Python 3.9+
- 框架：FastAPI（提供 REST API）
- 向量存储：FAISS 或 Chroma（可选其一）
- LLM：调用 OpenAI API 或 mock

### 交付物
1. 可运行的 API 服务（至少 3 个 endpoint）
   - \`POST /documents/upload\`
   - \`GET /search?query=xxx\`
   - \`POST /chat\`
2. 简单的单元测试（至少 2 个测试用例）
3. README 文档（包含部署说明）

### 评分标准
- 功能完整性（40%）：3 个 endpoint 均可正常工作
- 架构设计（25%）：模块化、可扩展性
- 代码质量（20%）：规范、注释、错误处理
- 文档质量（15%）：README 清晰度`,
    starterCode: `"""
RAG Agent - 内部知识库问答系统
请在此基础上实现完整功能
"""
from fastapi import FastAPI

app = FastAPI(title="RAG Agent API")


@app.post("/documents/upload")
async def upload_document():
    # TODO: 实现文档上传和向量化
    pass


@app.get("/search")
async def search(query: str, top_k: int = 5):
    # TODO: 实现相似度检索
    pass


@app.post("/chat")
async def chat():
    # TODO: 实现问答生成
    pass


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
`,
  },
  {
    id: "q3",
    part: "C",
    title: "AI 代码审查 — 找出并修正错误",
    duration: 10,
    maxScore: 20,
    description: `## Part C：AI 审查题 — 找出并修正 AI 生成的代码中的错误

### 背景
以下代码是由 AI 生成的 RAG 检索模块，但存在多个问题。

### 任务
1. 找出代码中的所有 bug（至少 5 处）
2. 解释每个 bug 可能导致的问题
3. 提供修正后的代码

### 评分标准
- 找出 bug 数量（60%）：每找出 1 处得 12 分
- 解释准确性（25%）：正确说明 bug 影响
- 修正质量（15%）：修正代码可运行

### ⚠️ 提示
允许使用 AI 助手，但 AI 可能给出错误建议，需要你自己判断。`,
    starterCode: `"""
AI 生成的 RAG 检索模块 - 请找出所有 bug 并修正
"""

class RAGRetriever:
    def __init__(self, vector_store, llm):
        self.vector_store = vector_store
        self.llm = llm
        self.cache = {}  # Bug 1: 没有缓存失效机制

    def search(self, query, top_k=5):
        # Bug 2: 没有对 query 做预处理
        results = self.vector_store.search(query, top_k)
        return results

    def generate_answer(self, query, context):
        # Bug 3: 没有处理 context 为空的情况
        prompt = f"基于以下信息回答问题：{context}\\n问题：{query}"
        return self.llm.generate(prompt)

    def chat(self, query, history=[]):  # Bug 4: 可变默认参数
        # Bug 5: history 没有被使用
        context = self.search(query)
        return self.generate_answer(query, context)


# =========================================
# 请在下方写出你的分析和修正后的代码
# =========================================

"""
Bug 分析：
1.
2.
3.
4.
5.

修正后的代码：
"""
`,
  },
];

export const mockAIConversations: AIConversation[] = [
  { id: "1", timestamp: "14:05:23", role: "user", content: "帮我设计一个任务优先级队列，需要支持动态优先级调整", category: "architecture" },
  { id: "2", timestamp: "14:05:45", role: "assistant", content: "建议使用最小堆实现优先级队列。可以用 Python 的 heapq 模块，对于动态优先级调整，可以使用\"标记删除\"策略...", category: "architecture" },
  { id: "3", timestamp: "14:08:12", role: "user", content: "heapq 不支持直接修改优先级，有更好的方案吗？", category: "architecture" },
  { id: "4", timestamp: "14:08:35", role: "assistant", content: "你说得对。可以使用 indexed priority queue，或者用 dict + heap 组合实现 decrease-key 操作...", category: "architecture" },
  { id: "5", timestamp: "14:15:30", role: "user", content: "我的死锁检测逻辑有问题，detected 一直返回 False", category: "debug" },
  { id: "6", timestamp: "14:15:52", role: "assistant", content: "看起来你的图构建有误。资源依赖图应该是有向图，建议用 DFS 检测环...", category: "debug" },
  { id: "7", timestamp: "14:20:15", role: "user", content: "AI 你说的用 BFS 也能检测环对吧？我觉得不太对，BFS 检测的是无向图的环", category: "debug" },
  { id: "8", timestamp: "14:20:38", role: "assistant", content: "你说得对，我之前的建议有误。对于有向图中的环检测，确实应该使用 DFS 配合三色标记法...", category: "debug" },
  { id: "9", timestamp: "14:35:00", role: "user", content: "FastAPI 的 POST endpoint 怎么接收 JSON body？", category: "general" },
  { id: "10", timestamp: "14:35:20", role: "assistant", content: "使用 Pydantic BaseModel 定义请求体模型，FastAPI 会自动解析 JSON...", category: "general" },
  { id: "11", timestamp: "14:50:00", role: "user", content: "FAISS 的索引类型选哪个比较好？数据量不大，几百条", category: "architecture" },
  { id: "12", timestamp: "14:50:25", role: "assistant", content: "数据量小的话用 IndexFlatL2 就够了，不需要 IVF 或 HNSW 这类近似索引...", category: "architecture" },
  { id: "13", timestamp: "15:10:00", role: "user", content: "我的 search endpoint 返回 500 错误", category: "debug" },
  { id: "14", timestamp: "15:10:30", role: "assistant", content: "检查一下你的 embedding 维度是否与索引创建时的维度匹配...", category: "debug" },
  { id: "15", timestamp: "15:25:00", role: "user", content: "有什么办法优化检索速度吗？", category: "optimization" },
  { id: "16", timestamp: "15:25:30", role: "assistant", content: "可以添加查询缓存、使用异步处理、或者对文档进行预过滤减少检索范围...", category: "optimization" },
];

export function getMockCandidateDetail(id: string): CandidateDetail | null {
  const candidate = mockCandidates.find((c) => c.id === id);
  if (!candidate) return null;

  return {
    candidate,
    aiConversations: mockAIConversations,
    codeSnapshots: [
      { timestamp: "14:05:00", code: "# 开始编写...\nclass TaskScheduler:\n    pass", event: "开始编写" },
      { timestamp: "14:15:00", code: "# 完成优先级队列\nclass TaskScheduler:\n    def __init__(self):\n        self.heap = []\n    def schedule(self, tasks):\n        ...", event: "完成优先级队列" },
      { timestamp: "14:30:00", code: "# 完成死锁检测\n...", event: "添加死锁检测" },
      { timestamp: "15:00:00", code: "# 开始 Part B\nfrom fastapi import FastAPI\n...", event: "开始 Part B" },
      { timestamp: "15:45:00", code: "# RAG 系统基本完成\n...", event: "RAG 系统完成" },
    ],
    aiStats: {
      totalConversations: 47,
      categories: { architecture: 15, debug: 18, optimization: 14 },
      adoptionRate: 0.68,
      errorsIdentified: 3,
      candidateCorrections: 3,
    },
  };
}
