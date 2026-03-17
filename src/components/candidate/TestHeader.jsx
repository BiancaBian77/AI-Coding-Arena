import { useState, useEffect } from 'react';
import { Clock, Send, AlertTriangle } from 'lucide-react';
import { AntiCheatShield } from './AntiCheat';

export default function TestHeader({ activePart, onPartChange, totalMinutes = 100, violationCount = 0 }) {
  const [secondsLeft, setSecondsLeft] = useState(totalMinutes * 60);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isUrgent = secondsLeft < 600;
  const isWarning = secondsLeft < 1800;

  const parts = [
    { key: 'A', label: 'Part A \u00b7 \u7b97\u6cd5' },
    { key: 'B', label: 'Part B \u00b7 \u9879\u76ee' },
    { key: 'C', label: 'Part C \u00b7 \u5ba1\u67e5' },
  ];

  const handleSubmit = () => {
    setShowSubmitConfirm(false);
    alert('\u6d4b\u8bd5\u5df2\u63d0\u4ea4\uff01\u611f\u8c22\u4f60\u7684\u53c2\u4e0e\u3002');
  };

  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-white shrink-0 border-b border-slate-700">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 select-none">
          <span className="text-lg">\u26a1</span>
          <span className="text-sm font-semibold tracking-wide">AI Coding Arena</span>
        </div>

        {/* Center: Part tabs */}
        <div className="flex items-center gap-0">
          {parts.map((part) => (
            <button
              key={part.key}
              onClick={() => onPartChange(part.key)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activePart === part.key
                  ? 'border-indigo-400 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {part.label}
            </button>
          ))}
        </div>

        {/* Right: Timer + Submit */}
        <div className="flex items-center gap-3">
          <span className="mr-1">
            <AntiCheatShield violationCount={violationCount} />
          </span>
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded ${
              isUrgent
                ? 'text-red-400'
                : isWarning
                ? 'text-amber-400'
                : 'text-slate-300'
            } ${isUrgent ? 'animate-pulse' : ''}`}
          >
            <Clock size={14} />
            <span className="text-sm font-mono font-semibold tabular-nums">
              {timeDisplay}
            </span>
          </div>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors"
          >
            <Send size={12} />
            \u63d0\u4ea4
          </button>
        </div>
      </div>

      {/* Submit confirmation modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-900/40 flex items-center justify-center">
                <AlertTriangle size={20} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">\u786e\u8ba4\u63d0\u4ea4</h3>
                <p className="text-sm text-slate-400">\u63d0\u4ea4\u540e\u5c06\u65e0\u6cd5\u4fee\u6539</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-4 mb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">\u5269\u4f59\u65f6\u95f4</span>
                <span className={`font-mono font-semibold ${isUrgent ? 'text-red-400' : 'text-white'}`}>
                  {timeDisplay}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">\u9898\u76ee\u72b6\u6001</span>
                <span className="text-white">3 / 3 \u5df2\u4f5c\u7b54</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                \u7ee7\u7eed\u4f5c\u7b54
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
              >
                \u786e\u8ba4\u63d0\u4ea4
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
