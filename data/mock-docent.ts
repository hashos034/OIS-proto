// ============================================================
// MOCK DATA — Learner Journey UU Prototype (Docent Side)
// All data is hardcoded. No backend.
// ============================================================

// --- Types ---

export interface DocentProfile {
  name: string;
  email: string;
  department: string;
  avatarInitials: string;
}

export interface DocentCourse {
  id: string;
  name: string;
  code: string;
  year: string;
  period: string;
  studentCount: number;
  status: "current" | "completed";
}

export interface DocentSurvey {
  id: string;
  courseId: string;
  name: string;
  status: "draft" | "published" | "closed";
  responseCount: number;
  totalStudents: number;
  publishedAt: string | null;
  closedAt: string | null;
  accessCode: string;
}

export interface DocentQuestion {
  id: number;
  surveyId: string;
  type: "multiple-choice" | "open" | "scale";
  text: string;
  options?: string[];
  required: boolean;
}

export interface MCResponseOption {
  option: string;
  count: number;
}

export interface MCResponseData {
  questionId: number;
  responses: MCResponseOption[];
  totalResponses: number;
}

export interface OpenResponse {
  text: string;
  date: string;
}

export interface OpenResponseData {
  questionId: number;
  responses: OpenResponse[];
  totalResponses: number;
}

export interface YearDataPoint {
  year: string;
  averageScore: number;
  responseCount: number;
}

export interface YearComparison {
  questionId: number;
  years: YearDataPoint[];
}

export interface SurveyProgressionPoint {
  surveyName: string;
  averageScore: number;
  responseRate: number;
}

export interface ProgressionData {
  courseId: string;
  dataPoints: SurveyProgressionPoint[];
}

// --- Data ---

export const docentProfile: DocentProfile = {
  name: "Paul de Jong",
  email: "p.dejong@uu.nl",
  department: "Informatica",
  avatarInitials: "PJ",
};

export const docentCourses: DocentCourse[] = [
  {
    id: "stat-2526",
    name: "Statistiek",
    code: "INFOB1STAT",
    year: "2025-2026",
    period: "Blok 3",
    studentCount: 120,
    status: "current",
  },
  {
    id: "ogp-2526",
    name: "Object Georiënteerd Programmeren",
    code: "INFOB1OGP",
    year: "2025-2026",
    period: "Blok 3",
    studentCount: 85,
    status: "current",
  },
  {
    id: "infi-2425",
    name: "Inleiding Informatica",
    code: "INFOB1INFI",
    year: "2024-2025",
    period: "Blok 1",
    studentCount: 150,
    status: "completed",
  },
];

export const docentSurveys: DocentSurvey[] = [
  // Statistiek 2025-2026
  {
    id: "stat-hc-1-4",
    courseId: "stat-2526",
    name: "Hoorcollege 1-4",
    status: "closed",
    responseCount: 89,
    totalStudents: 120,
    publishedAt: "2026-01-20",
    closedAt: "2026-02-03",
    accessCode: "482916",
  },
  {
    id: "stat-tussentoets",
    courseId: "stat-2526",
    name: "Tussentoets",
    status: "closed",
    responseCount: 102,
    totalStudents: 120,
    publishedAt: "2026-02-10",
    closedAt: "2026-02-24",
    accessCode: "731042",
  },
  {
    id: "stat-hc-5-8",
    courseId: "stat-2526",
    name: "Hoorcollege 5-8",
    status: "published",
    responseCount: 45,
    totalStudents: 120,
    publishedAt: "2026-03-10",
    closedAt: null,
    accessCode: "295874",
  },
  {
    id: "stat-practicum",
    courseId: "stat-2526",
    name: "Practicum",
    status: "draft",
    responseCount: 0,
    totalStudents: 120,
    publishedAt: null,
    closedAt: null,
    accessCode: "610358",
  },
  // Object Georiënteerd Programmeren 2025-2026
  {
    id: "ogp-opdracht-1",
    courseId: "ogp-2526",
    name: "Opdracht 1",
    status: "closed",
    responseCount: 72,
    totalStudents: 85,
    publishedAt: "2026-01-27",
    closedAt: "2026-02-10",
    accessCode: "847291",
  },
  {
    id: "ogp-tussentoets",
    courseId: "ogp-2526",
    name: "Tussentoets",
    status: "published",
    responseCount: 30,
    totalStudents: 85,
    publishedAt: "2026-03-05",
    closedAt: null,
    accessCode: "563819",
  },
  // Inleiding Informatica 2024-2025
  {
    id: "infi-eindtoets",
    courseId: "infi-2425",
    name: "Eindtoets",
    status: "closed",
    responseCount: 134,
    totalStudents: 150,
    publishedAt: "2025-01-13",
    closedAt: "2025-01-27",
    accessCode: "924637",
  },
];

// Questions for "Hoorcollege 1-4" survey (stat-hc-1-4)
export const docentQuestions: DocentQuestion[] = [
  {
    id: 101,
    surveyId: "stat-hc-1-4",
    type: "multiple-choice",
    text: "Hoe beoordeel je de duidelijkheid van de hoorcolleges?",
    options: ["Zeer onduidelijk", "Onduidelijk", "Neutraal", "Duidelijk", "Zeer duidelijk"],
    required: true,
  },
  {
    id: 102,
    surveyId: "stat-hc-1-4",
    type: "multiple-choice",
    text: "Hoe nuttig vond je het lesmateriaal?",
    options: ["Niet nuttig", "Enigszins nuttig", "Neutraal", "Nuttig", "Zeer nuttig"],
    required: true,
  },
  {
    id: 103,
    surveyId: "stat-hc-1-4",
    type: "multiple-choice",
    text: "Hoe tevreden ben je over het tempo van de stof?",
    options: ["Veel te snel", "Te snel", "Goed", "Te langzaam", "Veel te langzaam"],
    required: true,
  },
  {
    id: 104,
    surveyId: "stat-hc-1-4",
    type: "multiple-choice",
    text: "Hoe beoordeel je de interactie met de docent?",
    options: ["Zeer slecht", "Slecht", "Neutraal", "Goed", "Zeer goed"],
    required: true,
  },
  {
    id: 105,
    surveyId: "stat-hc-1-4",
    type: "multiple-choice",
    text: "Zou je dit vak aanraden aan andere studenten?",
    options: ["Zeker niet", "Waarschijnlijk niet", "Misschien", "Waarschijnlijk wel", "Zeker wel"],
    required: true,
  },
  {
    id: 106,
    surveyId: "stat-hc-1-4",
    type: "scale",
    text: "Hoe moeilijk vind je de stof? (1-10)",
    required: true,
  },
  {
    id: 107,
    surveyId: "stat-hc-1-4",
    type: "open",
    text: "Wat kan er verbeterd worden aan de hoorcolleges?",
    required: false,
  },
  {
    id: 108,
    surveyId: "stat-hc-1-4",
    type: "open",
    text: "Heb je nog overige opmerkingen?",
    required: false,
  },
];

// --- MC Response Data ---
// Distributions are realistic (not uniform), skewed positive where expected

export const mcResponseDataList: MCResponseData[] = [
  {
    // Q101: Duidelijkheid hoorcolleges — leaning positive
    questionId: 101,
    responses: [
      { option: "Zeer onduidelijk", count: 3 },
      { option: "Onduidelijk", count: 10 },
      { option: "Neutraal", count: 19 },
      { option: "Duidelijk", count: 37 },
      { option: "Zeer duidelijk", count: 20 },
    ],
    totalResponses: 89,
  },
  {
    // Q102: Nuttigheid lesmateriaal — leaning positive
    questionId: 102,
    responses: [
      { option: "Niet nuttig", count: 2 },
      { option: "Enigszins nuttig", count: 8 },
      { option: "Neutraal", count: 16 },
      { option: "Nuttig", count: 42 },
      { option: "Zeer nuttig", count: 21 },
    ],
    totalResponses: 89,
  },
  {
    // Q103: Tempo — somewhat too fast complaints
    questionId: 103,
    responses: [
      { option: "Veel te snel", count: 7 },
      { option: "Te snel", count: 28 },
      { option: "Goed", count: 38 },
      { option: "Te langzaam", count: 11 },
      { option: "Veel te langzaam", count: 5 },
    ],
    totalResponses: 89,
  },
  {
    // Q104: Interactie met docent — mostly positive
    questionId: 104,
    responses: [
      { option: "Zeer slecht", count: 1 },
      { option: "Slecht", count: 5 },
      { option: "Neutraal", count: 14 },
      { option: "Goed", count: 41 },
      { option: "Zeer goed", count: 28 },
    ],
    totalResponses: 89,
  },
  {
    // Q105: Aanraden — mostly positive
    questionId: 105,
    responses: [
      { option: "Zeker niet", count: 2 },
      { option: "Waarschijnlijk niet", count: 6 },
      { option: "Misschien", count: 18 },
      { option: "Waarschijnlijk wel", count: 39 },
      { option: "Zeker wel", count: 24 },
    ],
    totalResponses: 89,
  },
];

// --- Open Response Data ---

export const openResponseDataList: OpenResponseData[] = [
  {
    questionId: 107,
    responses: [
      {
        text: "De slides zijn soms moeilijk te lezen vanaf de achterste rijen. Grotere lettergrootte zou helpen.",
        date: "2026-01-28",
      },
      {
        text: "Meer praktijkvoorbeelden zouden helpen bij het begrijpen van de theorie. Nu blijft het erg abstract.",
        date: "2026-01-29",
      },
      {
        text: "Het tempo is soms wat hoog, vooral bij complexe onderwerpen zoals meervoudige regressie.",
        date: "2026-01-30",
      },
      {
        text: "Ik vind de gastcolleges erg waardevol. Meer van dat soort toepassingen graag!",
        date: "2026-01-30",
      },
      {
        text: "Het zou fijn zijn als de slides eerder beschikbaar zijn op Brightspace, zodat je ze kunt doornemen voor het college.",
        date: "2026-01-31",
      },
      {
        text: "Meer interactieve opdrachten tijdens het hoorcollege zouden het actief leren bevorderen.",
        date: "2026-02-01",
      },
      {
        text: "De opname van de colleges is erg handig voor herhaling. Graag dit voortzetten.",
        date: "2026-02-01",
      },
      {
        text: "Soms ontbreekt er een duidelijke rode draad tussen de colleges onderling. Een kort overzicht aan het begin helpt.",
        date: "2026-02-02",
      },
    ],
    totalResponses: 8,
  },
  {
    questionId: 108,
    responses: [
      {
        text: "Over het algemeen een goed vak. De docent is enthousiast en duidelijk.",
        date: "2026-01-28",
      },
      {
        text: "De combinatie van statistiek met R is erg nuttig voor mijn verdere studie.",
        date: "2026-01-29",
      },
      {
        text: "Het werkboek is goed opgebouwd, maar bevat op een paar plekken typefouten die verwarring veroorzaken.",
        date: "2026-01-30",
      },
      {
        text: "Ik had verwacht meer toepassingen te zien binnen de informatica. Nu voelt het vak wat generiek.",
        date: "2026-01-31",
      },
      {
        text: "De tentamenvragen sluiten niet altijd goed aan op de lesstof. Meer oefententamens zouden welkom zijn.",
        date: "2026-02-02",
      },
      {
        text: "Heel tevreden over de beschikbaarheid van de docent tijdens het spreekuur.",
        date: "2026-02-03",
      },
    ],
    totalResponses: 6,
  },
];

// --- Year-over-Year Comparison ---
// Covering 3 years for MC questions Q101–Q105.
// Scores are expressed as weighted averages on a 1-5 scale (1 = worst, 5 = best).
// Trend: slight improvement each year.

export const yearComparisonList: YearComparison[] = [
  {
    // Q101: Duidelijkheid — improving
    questionId: 101,
    years: [
      { year: "2023-2024", averageScore: 3.4, responseCount: 95 },
      { year: "2024-2025", averageScore: 3.7, responseCount: 108 },
      { year: "2025-2026", averageScore: 3.9, responseCount: 89 },
    ],
  },
  {
    // Q102: Nuttigheid lesmateriaal — steadily positive
    questionId: 102,
    years: [
      { year: "2023-2024", averageScore: 3.6, responseCount: 95 },
      { year: "2024-2025", averageScore: 3.8, responseCount: 108 },
      { year: "2025-2026", averageScore: 4.0, responseCount: 89 },
    ],
  },
  {
    // Q103: Tempo — consistently a pain point, slight improvement
    questionId: 103,
    years: [
      { year: "2023-2024", averageScore: 2.8, responseCount: 95 },
      { year: "2024-2025", averageScore: 3.0, responseCount: 108 },
      { year: "2025-2026", averageScore: 3.1, responseCount: 89 },
    ],
  },
  {
    // Q104: Interactie met docent — strong and improving
    questionId: 104,
    years: [
      { year: "2023-2024", averageScore: 3.8, responseCount: 95 },
      { year: "2024-2025", averageScore: 4.1, responseCount: 108 },
      { year: "2025-2026", averageScore: 4.2, responseCount: 89 },
    ],
  },
  {
    // Q105: Aanraden — positive trend
    questionId: 105,
    years: [
      { year: "2023-2024", averageScore: 3.5, responseCount: 95 },
      { year: "2024-2025", averageScore: 3.7, responseCount: 108 },
      { year: "2025-2026", averageScore: 3.9, responseCount: 89 },
    ],
  },
];

// --- Progression Data ---
// Student satisfaction trend across surveys within a course.
// averageScore: weighted average on 1-5 scale. responseRate: 0-100 percent.

export const progressionDataList: ProgressionData[] = [
  {
    courseId: "stat-2526",
    dataPoints: [
      {
        surveyName: "Hoorcollege 1-4",
        averageScore: 3.9,
        responseRate: 74, // 89/120
      },
      {
        surveyName: "Tussentoets",
        averageScore: 4.1,
        responseRate: 85, // 102/120
      },
      {
        surveyName: "Hoorcollege 5-8",
        averageScore: 4.0,
        responseRate: 38, // 45/120 — survey still open
      },
    ],
  },
  {
    courseId: "ogp-2526",
    dataPoints: [
      {
        surveyName: "Opdracht 1",
        averageScore: 3.6,
        responseRate: 85, // 72/85
      },
      {
        surveyName: "Tussentoets",
        averageScore: 3.8,
        responseRate: 35, // 30/85 — survey still open
      },
    ],
  },
  {
    courseId: "infi-2425",
    dataPoints: [
      {
        surveyName: "Eindtoets",
        averageScore: 4.2,
        responseRate: 89, // 134/150
      },
    ],
  },
];

// --- Helper Functions ---

export function getDocentSurveysByCourse(courseId: string): DocentSurvey[] {
  return docentSurveys.filter((s) => s.courseId === courseId);
}

export function getDocentQuestionsBySurvey(surveyId: string): DocentQuestion[] {
  return docentQuestions.filter((q) => q.surveyId === surveyId);
}

export function getMCResponseData(questionId: number): MCResponseData | undefined {
  return mcResponseDataList.find((r) => r.questionId === questionId);
}

export function getOpenResponseData(questionId: number): OpenResponseData | undefined {
  return openResponseDataList.find((r) => r.questionId === questionId);
}

export function getYearComparison(questionId: number): YearComparison | undefined {
  return yearComparisonList.find((y) => y.questionId === questionId);
}

export function getProgressionData(courseId: string): ProgressionData | undefined {
  return progressionDataList.find((p) => p.courseId === courseId);
}

export function getDocentCourse(id: string): DocentCourse | undefined {
  return docentCourses.find((c) => c.id === id);
}

export function getDocentSurvey(id: string): DocentSurvey | undefined {
  return docentSurveys.find((s) => s.id === id);
}
