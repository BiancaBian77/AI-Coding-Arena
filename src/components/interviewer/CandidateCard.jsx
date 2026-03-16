import { useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, Briefcase } from 'lucide-react';
import { getStatusStyle, getScoreColor } from '../../data/mockCandidates';

export default function CandidateCard({ candidate }) {
  const navigate = useNavigate();
  const statusClass = getStatusStyle(candidate.status);
  const scoreColor = getScoreColor(candidate.overallScore);

  return (
    <div
      onClick={() => navigate(`/interviewer/candidate/${candidate.id}`)}
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-indigo-200 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg flex-shrink-0">
            {candidate.name.charAt(0)}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 text-base group-hover:text-indigo-600 transition-colors">
              {candidate.name}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Briefcase size={14} />
                {candidate.position}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-400">
                <Calendar size={14} />
                {candidate.date}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Score */}
          <div className="text-right">
            <div className={`text-2xl font-bold ${scoreColor.text}`}>
              {candidate.overallScore}
            </div>
            <div className="text-xs text-gray-400">综合得分</div>
          </div>

          {/* Status badge */}
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full border ${statusClass}`}
          >
            {candidate.status}
          </span>

          <ChevronRight
            size={20}
            className="text-gray-300 group-hover:text-indigo-400 transition-colors"
          />
        </div>
      </div>

      {/* Score mini bars */}
      <div className="mt-4 flex gap-2">
        {Object.entries(candidate.scores).map(([key, value]) => {
          const c = getScoreColor(value);
          return (
            <div key={key} className="flex-1">
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className={`h-full rounded-full ${c.bg}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
