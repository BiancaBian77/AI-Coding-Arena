// 评分依据生成逻辑
export function generateScoreReasoning(candidate) {
  const { scores, aiChat } = candidate
  const r = {}

  // 独立Coding
  r.independentCoding = {
    factors: [
      {
        label: 'Part A 测试用例通过率',
        value: scores.independentCoding >= 85 ? '100%（全部通过）' : scores.independentCoding >= 70 ? '80%（通过 8/10）' : scores.independentCoding >= 60 ? '60%（通过 6/10）' : '40%（通过 4/10）',
        impact: scores.independentCoding >= 85 ? 'positive' : scores.independentCoding >= 60 ? 'neutral' : 'negative',
      },
      {
        label: '代码规范（pylint 评分）',
        value: scores.independentCoding >= 85 ? '9.2/10' : scores.independentCoding >= 70 ? '7.8/10' : scores.independentCoding >= 60 ? '6.5/10' : '5.0/10',
        impact: scores.independentCoding >= 70 ? 'positive' : 'neutral',
      },
      {
        label: '前10分钟无AI辅助表现',
        value: scores.independentCoding >= 85 ? '独立完成核心算法逻辑，代码清晰' : scores.independentCoding >= 70 ? '独立完成基础结构，部分细节需AI辅助' : scores.independentCoding >= 60 ? '仅完成框架代码，核心逻辑依赖AI' : '几乎没有有效代码输出',
        impact: scores.independentCoding >= 70 ? 'positive' : scores.independentCoding >= 60 ? 'neutral' : 'negative',
      },
      {
        label: '算法复杂度',
        value: scores.independentCoding >= 85 ? '达到 O(n log n) 要求' : scores.independentCoding >= 70 ? '接近目标，部分操作为 O(n²)' : '未达到复杂度要求',
        impact: scores.independentCoding >= 80 ? 'positive' : 'neutral',
      },
    ],
    summary: scores.independentCoding >= 85
      ? '候选人展现了扎实的独立编码能力，无AI辅助下也能高效完成核心逻辑。'
      : scores.independentCoding >= 70
        ? '独立编码能力良好，基础扎实，复杂场景可能需要辅助。'
        : scores.independentCoding >= 60
          ? '基本的编码能力具备，但独立解决复杂问题的能力有待提升。'
          : '独立编码能力不足，严重依赖外部辅助才能完成基础任务。',
  }

  // AI提效
  const roundsDesc = aiChat.totalRounds <= 15 ? '偏少，可能未充分利用AI'
    : aiChat.totalRounds <= 30 ? '适中，使用节奏合理'
    : '偏多，可能过度依赖AI对话'
  r.aiEfficiency = {
    factors: [
      {
        label: 'AI对话轮次',
        value: `${aiChat.totalRounds} 轮（${roundsDesc}）`,
        impact: aiChat.totalRounds >= 15 && aiChat.totalRounds <= 30 ? 'positive' : 'neutral',
      },
      {
        label: 'AI建议采纳率',
        value: `${aiChat.adoptionRate}%${aiChat.adoptionRate > 80 ? '（偏高，可能缺乏独立判断）' : aiChat.adoptionRate < 50 ? '（偏低，可能未充分利用AI）' : '（合理范围）'}`,
        impact: aiChat.adoptionRate >= 50 && aiChat.adoptionRate <= 80 ? 'positive' : 'negative',
      },
      {
        label: '效率提升估算',
        value: scores.aiEfficiency >= 85 ? '预估节省 40%+ 时间，AI使用精准高效' : scores.aiEfficiency >= 70 ? '预估节省 20-30% 时间，AI使用基本有效' : '效率提升不明显，AI使用方式需优化',
        impact: scores.aiEfficiency >= 70 ? 'positive' : 'neutral',
      },
      {
        label: 'AI对话质量',
        value: scores.aiEfficiency >= 85 ? '提问精准，能给AI提供足够上下文，获得高质量回答' : scores.aiEfficiency >= 70 ? '提问较清晰，大部分AI回答可用' : '提问模糊，AI回答质量参差不齐',
        impact: scores.aiEfficiency >= 70 ? 'positive' : 'negative',
      },
    ],
    summary: scores.aiEfficiency >= 85
      ? '候选人熟练运用AI提效，对话精准、采纳有度，展现了优秀的人机协作能力。'
      : scores.aiEfficiency >= 70
        ? 'AI使用能力良好，能借助AI提升效率，但对话策略仍有优化空间。'
        : scores.aiEfficiency >= 60
          ? 'AI使用尚在探索阶段，未能有效发挥AI的辅助价值。'
          : 'AI使用效果差，不会有效地利用AI辅助工作。',
  }

  // AI批判
  r.aiCritical = {
    factors: [
      {
        label: 'Part C Bug识别数量',
        value: scores.aiCritical >= 85 ? '识别 5/5 处 bug（全部找到）' : scores.aiCritical >= 70 ? '识别 3-4 处 bug' : scores.aiCritical >= 60 ? '识别 1-2 处 bug' : '未能有效识别 bug',
        impact: scores.aiCritical >= 70 ? 'positive' : scores.aiCritical >= 60 ? 'neutral' : 'negative',
      },
      {
        label: 'Bug解释准确性',
        value: scores.aiCritical >= 85 ? '每处bug都准确说明了影响和风险' : scores.aiCritical >= 70 ? '大部分解释准确，个别不够深入' : '解释较浅，未触及根本原因',
        impact: scores.aiCritical >= 70 ? 'positive' : 'neutral',
      },
      {
        label: '盲目采纳率',
        value: aiChat.adoptionRate > 85 ? `${100 - Math.floor(aiChat.adoptionRate * 0.3)}%（高风险：大量未经验证就采纳AI建议）` : aiChat.adoptionRate > 70 ? '低于15%（偶有未验证采纳）' : '低于5%（几乎每次都验证后采纳）',
        impact: aiChat.adoptionRate <= 75 ? 'positive' : 'negative',
      },
      {
        label: '主动纠正AI错误',
        value: `${aiChat.errorCorrections} 次${aiChat.errorCorrections >= 3 ? '（展现了较强的批判性思维）' : aiChat.errorCorrections >= 1 ? '（有一定批判意识）' : '（未见主动纠错行为）'}`,
        impact: aiChat.errorCorrections >= 3 ? 'positive' : aiChat.errorCorrections >= 1 ? 'neutral' : 'negative',
      },
    ],
    summary: scores.aiCritical >= 85
      ? '候选人具有很强的AI批判能力，能准确识别AI错误，不盲从AI建议。'
      : scores.aiCritical >= 70
        ? 'AI批判能力良好，能识别大部分AI错误，偶尔会盲目采纳。'
        : scores.aiCritical >= 60
          ? 'AI批判能力一般，容易受AI建议影响，独立判断力需加强。'
          : '缺乏AI批判能力，大量盲目采纳AI建议，存在严重风险。',
  }

  // 端到端
  r.endToEnd = {
    factors: [
      {
        label: 'Part B功能完整性',
        value: scores.endToEnd >= 85 ? '3个API endpoint全部可运行，功能完整' : scores.endToEnd >= 70 ? '2-3个endpoint可运行，基本功能完整' : scores.endToEnd >= 60 ? '1-2个endpoint可运行' : '未能完成可运行的endpoint',
        impact: scores.endToEnd >= 70 ? 'positive' : scores.endToEnd >= 60 ? 'neutral' : 'negative',
      },
      {
        label: '部署意识',
        value: scores.endToEnd >= 80 ? '提供了Dockerfile和部署文档' : scores.endToEnd >= 65 ? '提供了README但缺少部署细节' : '未考虑部署相关内容',
        impact: scores.endToEnd >= 80 ? 'positive' : 'neutral',
      },
      {
        label: '测试意识',
        value: scores.endToEnd >= 85 ? '编写了完整的单元测试（覆盖率>80%）' : scores.endToEnd >= 70 ? '编写了基础测试用例' : '未编写测试',
        impact: scores.endToEnd >= 70 ? 'positive' : 'negative',
      },
      {
        label: '错误处理',
        value: scores.endToEnd >= 80 ? '异常处理完善，有统一错误格式' : scores.endToEnd >= 65 ? '基础异常处理，部分场景未覆盖' : '缺少错误处理',
        impact: scores.endToEnd >= 70 ? 'positive' : 'negative',
      },
    ],
    summary: scores.endToEnd >= 85
      ? '端到端能力优秀，能独立完成从设计到部署的完整流程。'
      : scores.endToEnd >= 70
        ? '端到端能力良好，主要环节都有覆盖，部分细节可以提升。'
        : scores.endToEnd >= 60
          ? '端到端能力基本具备，但在部署和测试环节有明显短板。'
          : '端到端能力不足，无法独立完成完整的项目交付。',
  }

  // 跨领域
  r.crossDomain = {
    factors: [
      {
        label: '架构设计合理性',
        value: scores.crossDomain >= 85 ? '架构清晰，模块化好，扩展性强' : scores.crossDomain >= 70 ? '架构基本合理，模块划分清晰' : scores.crossDomain >= 60 ? '架构可用，但缺乏扩展考虑' : '架构混乱，耦合严重',
        impact: scores.crossDomain >= 70 ? 'positive' : scores.crossDomain >= 60 ? 'neutral' : 'negative',
      },
      {
        label: '性能优化意识',
        value: scores.crossDomain >= 80 ? '主动考虑缓存、异步、并发等优化策略' : scores.crossDomain >= 65 ? '有基本的性能意识' : '未考虑性能优化',
        impact: scores.crossDomain >= 70 ? 'positive' : 'neutral',
      },
      {
        label: '跨领域知识运用',
        value: scores.crossDomain >= 85 ? '在代码中体现了算法+工程的融合思维' : scores.crossDomain >= 70 ? '有一定的跨领域意识，但融合度一般' : '主要停留在单一领域',
        impact: scores.crossDomain >= 70 ? 'positive' : 'neutral',
      },
    ],
    summary: scores.crossDomain >= 85
      ? '跨领域能力优秀，能将不同领域的知识融会贯通。'
      : scores.crossDomain >= 70
        ? '跨领域能力良好，有跨界思维，融合度可以进一步提升。'
        : scores.crossDomain >= 60
          ? '跨领域能力一般，主要在本领域内，缺乏交叉视野。'
          : '跨领域能力薄弱，知识面窄，缺乏系统性思维。',
  }

  return r
}

const mockCandidates = [
  {
    id: 1,
    name: '张伟',
    position: '高级前端工程师',
    date: '2026-03-14',
    status: '已通过',
    overallScore: 82,
    scores: {
      independentCoding: 85,
      aiEfficiency: 90,
      aiCritical: 78,
      endToEnd: 80,
      crossDomain: 76,
    },
    aiChat: {
      totalRounds: 24,
      topics: ['React 性能优化', '状态管理设计', 'TypeScript 类型体操'],
      adoptionRate: 72,
      errorCorrections: 3,
      avgResponseTime: '2.1s',
    },
    violations: { tabSwitches: 1, windowBlurs: 0, copyAttempts: 0, total: 1 },
    notes: '',
  },
  {
    id: 2,
    name: '李娜',
    position: '全栈工程师',
    date: '2026-03-13',
    status: '已通过',
    overallScore: 88,
    scores: {
      independentCoding: 92,
      aiEfficiency: 85,
      aiCritical: 88,
      endToEnd: 90,
      crossDomain: 82,
    },
    aiChat: {
      totalRounds: 18,
      topics: ['Node.js 架构', '数据库设计', 'API 安全'],
      adoptionRate: 65,
      errorCorrections: 1,
      avgResponseTime: '1.8s',
    },
    violations: { tabSwitches: 0, windowBlurs: 0, copyAttempts: 0, total: 0 },
    notes: '技术能力突出，沟通表达清晰。',
  },
  {
    id: 3,
    name: '王磊',
    position: '后端工程师',
    date: '2026-03-12',
    status: '待评估',
    overallScore: 71,
    scores: {
      independentCoding: 70,
      aiEfficiency: 75,
      aiCritical: 68,
      endToEnd: 72,
      crossDomain: 65,
    },
    aiChat: {
      totalRounds: 30,
      topics: ['微服务拆分', 'Redis 缓存策略', '消息队列'],
      adoptionRate: 80,
      errorCorrections: 5,
      avgResponseTime: '3.2s',
    },
    violations: { tabSwitches: 3, windowBlurs: 2, copyAttempts: 1, total: 6 },
    notes: '',
  },
  {
    id: 4,
    name: '赵雪',
    position: '前端工程师',
    date: '2026-03-11',
    status: '已拒绝',
    overallScore: 54,
    scores: {
      independentCoding: 50,
      aiEfficiency: 60,
      aiCritical: 45,
      endToEnd: 58,
      crossDomain: 52,
    },
    aiChat: {
      totalRounds: 35,
      topics: ['CSS 布局', '组件封装', '异步处理'],
      adoptionRate: 92,
      errorCorrections: 8,
      avgResponseTime: '4.5s',
    },
    violations: { tabSwitches: 5, windowBlurs: 3, copyAttempts: 2, total: 10 },
    notes: '过度依赖 AI，独立编码能力不足。',
  },
  {
    id: 5,
    name: '陈浩',
    position: '高级后端工程师',
    date: '2026-03-10',
    status: '已通过',
    overallScore: 91,
    scores: {
      independentCoding: 95,
      aiEfficiency: 88,
      aiCritical: 92,
      endToEnd: 90,
      crossDomain: 85,
    },
    aiChat: {
      totalRounds: 15,
      topics: ['系统设计', '分布式事务', '性能调优'],
      adoptionRate: 55,
      errorCorrections: 0,
      avgResponseTime: '1.5s',
    },
    violations: { tabSwitches: 0, windowBlurs: 0, copyAttempts: 0, total: 0 },
    notes: '非常优秀，推荐进入终面。',
  },
  {
    id: 6,
    name: '刘芳',
    position: '全栈工程师',
    date: '2026-03-09',
    status: '待评估',
    overallScore: 76,
    scores: {
      independentCoding: 72,
      aiEfficiency: 82,
      aiCritical: 75,
      endToEnd: 78,
      crossDomain: 70,
    },
    aiChat: {
      totalRounds: 22,
      topics: ['GraphQL 设计', '前后端联调', '测试策略'],
      adoptionRate: 70,
      errorCorrections: 2,
      avgResponseTime: '2.4s',
    },
    violations: { tabSwitches: 2, windowBlurs: 1, copyAttempts: 0, total: 3 },
    notes: '',
  },
  {
    id: 7,
    name: '孙鹏',
    position: '前端工程师',
    date: '2026-03-08',
    status: '待评估',
    overallScore: 63,
    scores: {
      independentCoding: 60,
      aiEfficiency: 70,
      aiCritical: 58,
      endToEnd: 65,
      crossDomain: 55,
    },
    aiChat: {
      totalRounds: 28,
      topics: ['Vue 组件', '构建工具', '网络请求'],
      adoptionRate: 85,
      errorCorrections: 6,
      avgResponseTime: '3.8s',
    },
    violations: { tabSwitches: 4, windowBlurs: 2, copyAttempts: 1, total: 7 },
    notes: '',
  },
  {
    id: 8,
    name: '周婷',
    position: '高级全栈工程师',
    date: '2026-03-07',
    status: '已拒绝',
    overallScore: 48,
    scores: {
      independentCoding: 42,
      aiEfficiency: 55,
      aiCritical: 40,
      endToEnd: 50,
      crossDomain: 48,
    },
    aiChat: {
      totalRounds: 40,
      topics: ['基础算法', '数据结构', 'HTTP 协议'],
      adoptionRate: 95,
      errorCorrections: 12,
      avgResponseTime: '5.1s',
    },
    violations: { tabSwitches: 8, windowBlurs: 5, copyAttempts: 3, total: 16 },
    notes: '基础薄弱，完全依赖 AI 完成任务。',
  },
];

export const scoreLabels = {
  independentCoding: '独立Coding',
  aiEfficiency: 'AI提效',
  aiCritical: 'AI批判',
  endToEnd: '端到端',
  crossDomain: '跨领域',
};

export function getScoreColor(score) {
  if (score >= 85) return { bg: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-100' };
  if (score >= 70) return { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-100' };
  if (score >= 60) return { bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-100' };
  return { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-100' };
}

export function getScoreRating(score) {
  if (score >= 85) return { label: '优秀', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
  if (score >= 70) return { label: '良好', color: 'bg-blue-100 text-blue-700 border-blue-200' };
  if (score >= 60) return { label: '合格', color: 'bg-amber-100 text-amber-700 border-amber-200' };
  return { label: '不合格', color: 'bg-red-100 text-red-700 border-red-200' };
}

export function getStatusStyle(status) {
  switch (status) {
    case '已通过':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case '已拒绝':
      return 'bg-red-100 text-red-700 border-red-200';
    case '待评估':
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
}

export default mockCandidates;
