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
