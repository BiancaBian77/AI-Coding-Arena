import { getScoreColor, getScoreRating } from '../../data/mockCandidates';

export default function ScoreCard({ label, score, maxScore = 100 }) {
  const percentage = Math.min((score / maxScore) * 100, 100);
  const color = getScoreColor(score);
  const rating = getScoreRating(score);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${rating.color}`}
        >
          {rating.label}
        </span>
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
  );
}
