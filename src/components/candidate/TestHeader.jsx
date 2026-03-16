import { useState, useEffect } from 'react';
import { Clock, Send, AlertTriangle, ChevronRight } from 'lucide-react';

export default function TestHeader({ activePart, onPartChange, totalMinutes = 100 }) {
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
  const isUrgent = secondsLeft < 600; // less than 10 min
  const isWarning = secondsLeft < 1800; // less than 30 min

  const parts = [
    { key: 'A', label: 'Part A · 算法' },
    { key: 'B', label: 'Part B · 开放题' },
    { key: 'C', label: 'Part C · 审查' },
  ];

  const handleSubmit = () => {
    setShowSubmitConfirm(false);
    // mock submit
    alert('测试已提交！感谢你的参与。');
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-200 shrink-0">
        {/* Left: Logo + Test info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">CA</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-800">Coding Arena</div>
              <div className="text-xs text-gray-400">AI 算法工程师 · 技术评测</div>
            </div>
          </div>
        </div>

        {/* Center: Part tabs */}
        <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
          {parts.map((part, idx) => (
            <button
              key={part.key}
              onClick={() => onPartChange(part.key)}
              className={`flex items-center gap-1 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activePart === part.key
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-semibold ${
                  activePart === part.key
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-300 text-white'
                }`}
              >
                {idx + 1}
              </span>
              {part.label}
            </button>
          ))}
        </div>

        {/* Right: Timer + Submit */}
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
              isUrgent
                ? 'bg-red-50 text-red-600'
                : isWarning
                ? 'bg-amber-50 text-amber-600'
                : 'bg-gray-50 text-gray-600'
            }`}
          >
            <Clock size={15} className={isUrgent ? 'animate-pulse' : ''} />
            <span className="text-sm font-mono font-semibold tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-xs opacity-60">剩余</span>
          </div>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
          >
            <Send size={14} />
            提交测试
          </button>
        </div>
      </div>

      {/* Submit confirmation modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle size={20} className="text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">确认提交</h3>
                <p className="text-sm text-gray-500">提交后将无法修改</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">剩余时间</span>
                <span className={`font-mono font-semibold ${isUrgent ? 'text-red-600' : 'text-gray-800'}`}>
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">题目状态</span>
                <span className="text-gray-800">3 / 3 已作答</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                继续作答
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                确认提交
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
