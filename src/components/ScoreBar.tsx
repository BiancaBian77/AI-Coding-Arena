"use client";

interface ScoreBarProps {
  label: string;
  score: number;
  maxScore: number;
  color?: string;
}

function getScoreColor(score: number): string {
  if (score >= 85) return "bg-green-500";
  if (score >= 70) return "bg-blue-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-red-500";
}

function getRatingLabel(score: number): string {
  if (score >= 85) return "优秀";
  if (score >= 70) return "良好";
  if (score >= 60) return "合格";
  return "不合格";
}

function getRatingDot(score: number): string {
  if (score >= 85) return "text-green-500";
  if (score >= 70) return "text-blue-500";
  if (score >= 60) return "text-yellow-500";
  return "text-red-500";
}

export default function ScoreBar({ label, score, maxScore }: ScoreBarProps) {
  const pct = (score / maxScore) * 100;

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-300">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono">{score}/{maxScore}</span>
          <span className={`text-xs ${getRatingDot(score)}`}>● {getRatingLabel(score)}</span>
        </div>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full score-bar ${getScoreColor(score)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
