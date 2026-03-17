import { useState } from 'react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import TestHeader from '../components/candidate/TestHeader';
import ProblemPanel from '../components/candidate/ProblemPanel';
import CodeEditor from '../components/candidate/CodeEditor';
import AIChat from '../components/candidate/AIChat';
import { useAntiCheat, AntiCheatBanner, AntiCheatOverlay } from '../components/candidate/AntiCheat';

export default function CandidateTest() {
  const [activePart, setActivePart] = useState('A');
  const [language, setLanguage] = useState('Python');
  const { violations, violationCount, violationLog, showOverlay } = useAntiCheat();

  const aiStatus = activePart === 'A' ? 'disabled' : activePart === 'C' ? 'warning' : 'enabled';
  const aiStatusText = {
    disabled: '独立编码 · AI 已禁用',
    enabled: 'AI 协作 · 助手已启用',
    warning: 'AI 审查 · 注意AI可能出错',
  };
  const aiStatusColor = {
    disabled: 'text-red-400',
    enabled: 'text-emerald-400',
    warning: 'text-amber-400',
  };
  const aiDotColor = {
    disabled: 'bg-red-400',
    enabled: 'bg-emerald-400',
    warning: 'bg-amber-400',
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 overflow-hidden">
      <TestHeader activePart={activePart} onPartChange={setActivePart} violationCount={violationCount} />
      <AntiCheatBanner violationCount={violationCount} />
      <AntiCheatOverlay visible={showOverlay} />

      <div className="flex-1 min-h-0">
        <Allotment>
          <Allotment.Pane preferredSize="30%" minSize={280}>
            <ProblemPanel activePart={activePart} onPartChange={setActivePart} />
          </Allotment.Pane>
          <Allotment.Pane preferredSize="45%" minSize={400}>
            <CodeEditor activePart={activePart} onLanguageChange={setLanguage} />
          </Allotment.Pane>
          <Allotment.Pane preferredSize="25%" minSize={260}>
            <AIChat activePart={activePart} />
          </Allotment.Pane>
        </Allotment>
      </div>

      {/* Bottom status bar */}
      <div className="flex items-center justify-between bg-slate-800 text-slate-400 text-xs py-1 px-4 shrink-0 border-t border-slate-700">
        <div className="flex items-center gap-4">
          <span>{language}</span>
          <span>Ln 1, Col 1</span>
        </div>
        <div className="flex items-center gap-4">
          <span className={`flex items-center gap-1.5 ${aiStatusColor[aiStatus]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${aiDotColor[aiStatus]} inline-block ${aiStatus === 'enabled' ? 'animate-pulse' : ''}`} />
            {aiStatusText[aiStatus]}
          </span>
        </div>
      </div>
    </div>
  );
}
