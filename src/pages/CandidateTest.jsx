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

  return (
    <div className="h-screen flex flex-col bg-slate-900 overflow-hidden">
      {/* Top bar */}
      <TestHeader activePart={activePart} onPartChange={setActivePart} violationCount={violationCount} />

      {/* Anti-cheat banner */}
      <AntiCheatBanner violationCount={violationCount} />

      {/* Anti-cheat overlay */}
      <AntiCheatOverlay visible={showOverlay} />

      {/* Main IDE layout */}
      <div className="flex-1 min-h-0">
        <Allotment>
          {/* Left: Problem description (30%) */}
          <Allotment.Pane preferredSize="30%" minSize={280}>
            <ProblemPanel activePart={activePart} onPartChange={setActivePart} />
          </Allotment.Pane>

          {/* Center: Code editor (45%) */}
          <Allotment.Pane preferredSize="45%" minSize={400}>
            <CodeEditor activePart={activePart} onLanguageChange={setLanguage} />
          </Allotment.Pane>

          {/* Right: AI Chat (25%) */}
          <Allotment.Pane preferredSize="25%" minSize={260}>
            <AIChat />
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
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            AI \u52a9\u624b\u5df2\u542f\u7528
          </span>
        </div>
      </div>
    </div>
  );
}
