import { Play, Pause, SkipForward, SkipBack, Maximize2 } from 'lucide-react';
import { useState } from 'react';

export default function ProcessReplay() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  const timelineEvents = [
    { time: '00:00', label: '开始编码', position: 0 },
    { time: '05:12', label: '首次AI对话', position: 18 },
    { time: '12:30', label: '核心逻辑', position: 42 },
    { time: '20:15', label: 'AI辅助调试', position: 68 },
    { time: '28:00', label: '提交代码', position: 95 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">过程回放</h3>
        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
          总时长 28:00
        </span>
      </div>

      {/* Replay viewport placeholder */}
      <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 hover:bg-white/20 transition-colors cursor-pointer border border-white/20">
            {isPlaying ? (
              <Pause size={32} className="text-white ml-0" onClick={() => setIsPlaying(false)} />
            ) : (
              <Play size={32} className="text-white ml-1" onClick={() => setIsPlaying(true)} />
            )}
          </div>
          <p className="text-white/60 text-sm">点击播放候选人编码过程</p>
          <p className="text-white/40 text-xs mt-1">包含代码编写、AI 对话、调试全流程</p>
        </div>

        {/* Simulated code overlay */}
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm rounded-lg p-3 text-xs font-mono text-green-400 leading-relaxed max-w-xs">
          <div className="text-gray-500">// 候选人代码片段预览</div>
          <div><span className="text-purple-400">function</span> <span className="text-yellow-300">solve</span>(data) {'{'}</div>
          <div className="pl-4"><span className="text-purple-400">const</span> result = [];</div>
          <div className="pl-4 text-gray-600">// ...</div>
          <div>{'}'}</div>
        </div>

        {/* Fullscreen button */}
        <button className="absolute top-4 right-4 p-2 bg-black/30 rounded-lg text-white/60 hover:text-white hover:bg-black/50 transition-colors">
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Timeline bar */}
      <div className="px-6 py-4 bg-gray-50">
        {/* Controls */}
        <div className="flex items-center gap-3 mb-3">
          <button
            className="p-1.5 hover:bg-gray-200 rounded-md transition-colors text-gray-500"
            onClick={() => setProgress(Math.max(0, progress - 10))}
          >
            <SkipBack size={16} />
          </button>
          <button
            className="p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            className="p-1.5 hover:bg-gray-200 rounded-md transition-colors text-gray-500"
            onClick={() => setProgress(Math.min(100, progress + 10))}
          >
            <SkipForward size={16} />
          </button>
          <span className="text-xs text-gray-500 font-mono ml-2">
            09:48 / 28:00
          </span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-400">1x</span>
            <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">2x</span>
            <span className="text-xs text-gray-400">4x</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative">
          <div
            className="w-full bg-gray-200 rounded-full h-2 cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(Math.round(pct));
            }}
          >
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-indigo-500 rounded-full shadow-sm" />
            </div>
          </div>

          {/* Timeline event markers */}
          <div className="relative mt-3">
            {timelineEvents.map((event, i) => (
              <div
                key={i}
                className="absolute text-center -translate-x-1/2"
                style={{ left: `${event.position}%` }}
              >
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mx-auto mb-1" />
                <div className="text-[10px] text-gray-400 whitespace-nowrap">{event.time}</div>
                <div className="text-[10px] text-gray-500 whitespace-nowrap">{event.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
