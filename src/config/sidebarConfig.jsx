import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react';

export const interviewerSidebar = [
  { icon: LayoutDashboard, label: '总览', path: '/interviewer' },
  { icon: Briefcase, label: '岗位管理', path: '/interviewer/positions' },
  { icon: FileText, label: '题目设计', path: '/interviewer/test-design' },
  { icon: Users, label: '候选人', path: '/interviewer/candidates' },
  { icon: BarChart3, label: '分析报告', path: '/interviewer/analytics' },
  { icon: Settings, label: '设置', path: '/interviewer/settings' },
];

export function getInterviewerSidebar(activePath) {
  return interviewerSidebar.map(item => ({
    ...item,
    active: item.path === activePath,
  }));
}
