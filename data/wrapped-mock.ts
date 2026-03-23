export interface WrappedStudent {
  name: string;
  semester: string;
  academicYear: string;
}

export interface WrappedEngagement {
  totalEvaluations: number;
  totalAvailable: number;
  responseRate: number;
  peerPercentile: number;
  averageResponseRate: number;
}

export interface WrappedStreak {
  longestStreak: number;
  totalWeeksActive: number;
  currentStreak: number;
  favoriteDay: string;
}

export interface WrappedPersonality {
  type: string;
  description: string;
  topCategory: string;
  traits: string[];
}

export interface WrappedPeriod {
  label: string;
  evaluationsCompleted: number;
  evaluationsTotal: number;
  averageRating: number;
}

export interface WrappedPeriodComparison {
  period1: WrappedPeriod;
  period2: WrappedPeriod;
}

export interface WrappedImpact {
  courseName: string;
  feedbackTopic: string;
  changeDescription: string;
  docentName: string;
}

export interface WrappedShareStats {
  evaluationsCompleted: number;
  personalityType: string;
  topCourse: string;
  streak: number;
}

export interface WrappedCourseHighlight {
  name: string;
  grade: number;
  evaluations: number;
  totalEvaluations: number;
}

export interface WrappedCourseHighlights {
  courses: WrappedCourseHighlight[];
}

export interface WrappedWeekActivity {
  week: number;
  count: number;
}

export interface WrappedWeeklyActivity {
  weeks: WrappedWeekActivity[];
  peakWeek: number;
  pattern: string;
}

export interface WrappedFeedbackQuality {
  tier: "Brons" | "Zilver" | "Goud";
  avgWordCount: number;
  longestResponse: number;
  openQuestionRate: number;
}

export interface WrappedData {
  student: WrappedStudent;
  engagement: WrappedEngagement;
  streak: WrappedStreak;
  personality: WrappedPersonality;
  courseHighlights: WrappedCourseHighlights;
  weeklyActivity: WrappedWeeklyActivity;
  feedbackQuality: WrappedFeedbackQuality;
  periodComparison: WrappedPeriodComparison;
  impact: WrappedImpact;
  shareStats: WrappedShareStats;
}

export const wrappedData: WrappedData = {
  student: {
    name: "Hassan",
    semester: "Semester 1",
    academicYear: "2025-2026",
  },
  engagement: {
    totalEvaluations: 12,
    totalAvailable: 15,
    responseRate: 80,
    peerPercentile: 78,
    averageResponseRate: 45,
  },
  streak: {
    longestStreak: 5,
    totalWeeksActive: 11,
    currentStreak: 3,
    favoriteDay: "Maandag",
  },
  personality: {
    type: "Analytische Denker",
    description:
      "Je geeft het meeste en meest gedetailleerde feedback bij exacte vakken. Je antwoorden zijn grondig en data-gedreven.",
    topCategory: "Exacte vakken",
    traits: ["Grondig", "Data-gedreven", "Gedetailleerd"],
  },
  courseHighlights: {
    courses: [
      { name: "Statistiek", grade: 7.2, evaluations: 5, totalEvaluations: 5 },
      { name: "Wiskunde", grade: 6.8, evaluations: 4, totalEvaluations: 5 },
      { name: "Chemie", grade: 7.5, evaluations: 3, totalEvaluations: 5 },
    ],
  },
  weeklyActivity: {
    weeks: [
      { week: 1, count: 1 },
      { week: 2, count: 2 },
      { week: 3, count: 0 },
      { week: 4, count: 3 },
      { week: 5, count: 1 },
      { week: 6, count: 0 },
      { week: 7, count: 2 },
      { week: 8, count: 4 },
      { week: 9, count: 1 },
      { week: 10, count: 2 },
    ],
    peakWeek: 8,
    pattern: "Deadline Sprinter",
  },
  feedbackQuality: {
    tier: "Goud",
    avgWordCount: 47,
    longestResponse: 128,
    openQuestionRate: 92,
  },
  periodComparison: {
    period1: {
      label: "Periode 1",
      evaluationsCompleted: 5,
      evaluationsTotal: 7,
      averageRating: 3.8,
    },
    period2: {
      label: "Periode 2",
      evaluationsCompleted: 7,
      evaluationsTotal: 8,
      averageRating: 4.2,
    },
  },
  impact: {
    courseName: "Statistiek",
    feedbackTopic: "de practicumopzet",
    changeDescription: "een nieuw practicumformat met meer begeleiding",
    docentName: "Dr. de Vries",
  },
  shareStats: {
    evaluationsCompleted: 12,
    personalityType: "Analytische Denker",
    topCourse: "Statistiek",
    streak: 5,
  },
};
