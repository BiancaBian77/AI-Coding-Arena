import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, MinusCircle } from 'lucide-react';
import { getScoreColor, getScoreRating } from '../../data/mockCandidates';

const impactIcons = {
  positive: <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />,
  neutral: <MinusCircle size={13} className="text-amber-500 flex-shrink-0" />,
  negative: <AlertCircle size={13} className="text-red-500 flex-shrink-0" />,
}

export default function ScoreCard({ label, score, reasoning, maxScore = 100 }) {
  const [expanded, setExpanded] = useState(false);
  const percentage = Math.min((score / maxScore) * 100, 100);
  const color = getScoreColor(score);
  const rating = getScoreRating(score);

  return (
    <div className={`bg-white rounded-xl border transition-all duration-200 ${expanded ? 'border-indigo-200 shadow-md col-span-1 sm:col-span-2 lg:col-span-5' : 'border-gray-200 hover:shadow-md'}`}>
      {/* Header - always visible */}
      <div
        className="p-5 cursor-pointer"
        onClick={() => reasoning && setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${rating.color}`}>
              {rating.label}
            </span>
            {reasoning && (
              expanded
                ? <ChevronUp size={14} className="text-gray-400" />
                : <ChevronDown size={14} className="text-gray-400" />
            )}
          </div>
        </div>
        <div className="flex items-end gap-3 mb-3">
          <span className={`text-3xl font-bold ${color.text}`}>{score}</span>
          <span className="text-sm text-gray-400 mb-1">/ {maxScore}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full rounded-full ${color.bg} transition-all duration-700 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Expanded reasoning */}
      {expanded && reasoning && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
          {/* Summary */}
          <div className={`p-3 rounded-lg ${color.light}`}>
            <p className={`text-sm font-medium ${color.text}`}>
              {reasoning.summary}
            </p>
          </div>

          {/* Factor breakdown */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">评分因子</h4>
            {reasoning.factors.map((factor, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="mt-0.5">
                  {impactIcons[factor.impact]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-700 mb-0.5">{factor.label}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{factor.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 pt-2 border-t border-gray-100 text-[10px] text-gray-400">
            <span className="flex items-center gap-1">{impactIcons.positive} 正面因子</span>
            <span className="flex items-center gap-1">{impactIcons.neutral} 中性因子</span>
            <span className="flex items-center gap-1">{impactIcons.negative} 负面因子</span>
          </div>
        </div>
      )}
    </div>
  );
}
