export interface Candidate {
  id: string;
  name: string;
  position: string;
  email: string;
  testDate: string;
  status: "pending" | "in_progress" | "completed" | "reviewed";
  scores?: ScoreResult;
}

export interface ScoreResult {
  overall: number;
  dimensions: {
    independentCoding: DimensionScore;
    aiEfficiency: DimensionScore;
    aiCritical: DimensionScore;
    endToEnd: DimensionScore;
    crossDomain: DimensionScore;
  };
}

export interface DimensionScore {
  score: number;
  maxScore: number;
  weight: number;
  label: string;
  details: string[];
}

export interface TestQuestion {
  id: string;
  part: "A" | "B" | "C";
  title: string;
  description: string;
  duration: number; // minutes
  maxScore: number;
  starterCode?: string;
  testCases?: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface AIConversation {
  id: string;
  timestamp: string;
  role: "user" | "assistant";
  content: string;
  category?: "architecture" | "debug" | "optimization" | "general";
}

export interface CandidateDetail {
  candidate: Candidate;
  aiConversations: AIConversation[];
  codeSnapshots: CodeSnapshot[];
  aiStats: AIStats;
}

export interface CodeSnapshot {
  timestamp: string;
  code: string;
  event: string;
}

export interface AIStats {
  totalConversations: number;
  categories: Record<string, number>;
  adoptionRate: number;
  errorsIdentified: number;
  candidateCorrections: number;
}
