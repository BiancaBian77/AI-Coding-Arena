import { useState } from 'react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import TestHeader from '../components/candidate/TestHeader';
import ProblemPanel from '../components/candidate/ProblemPanel';
import CodeEditor from '../components/candidate/CodeEditor';
import AIChat from '../components/candidate/AIChat';

export default function CandidateTest() {
  const [activePart, setActivePart] = useState('A');

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Top bar */}
      <TestHeader activePart={activePart} onPartChange={setActivePart} />

      {/* Main IDE layout */}
      <div className="flex-1 min-h-0">
        <Allotment>
          {/* Left: Problem description (30%) */}
          <Allotment.Pane preferredSize="30%" minSize={280}>
            <ProblemPanel activePart={activePart} onPartChange={setActivePart} />
          </Allotment.Pane>

          {/* Center: Code editor (45%) */}
          <Allotment.Pane preferredSize="45%" minSize={400}>
            <CodeEditor activePart={activePart} />
          </Allotment.Pane>

          {/* Right: AI Chat (25%) */}
          <Allotment.Pane preferredSize="25%" minSize={260}>
            <AIChat />
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
}
