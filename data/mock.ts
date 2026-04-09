// ============================================================
// MOCK DATA — Learner Journey UU Prototype (Student Side)
// All data is hardcoded. No backend.
// ============================================================

// --- Types ---

export interface Course {
  id: string;
  name: string;
  completed: number;
  total: number;
  status: "current" | "completed";
}

export interface Survey {
  id: string;
  courseId: string;
  name: string;
  progress: number; // 0-100
  status: "completed" | "in-progress" | "not-started";
}

export interface Question {
  id: number;
  surveyId: string;
  type: "multiple-choice" | "open";
  text: string;
  options?: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  icon: string; // lucide icon name
}

export interface UserProfile {
  name: string;
  studentNumber: string;
  email: string;
  status: string;
  avatarInitials: string;
  badges: Badge[];
}

export interface DocentComment {
  date: string;
  text: string;
}

// --- Data ---

export const courses: Course[] = [
  { id: "statistiek", name: "Statistiek", completed: 7, total: 10, status: "current" },
  { id: "chemie", name: "Chemie & Structuren", completed: 2, total: 3, status: "current" },
  { id: "wiskunde", name: "Wiskunde", completed: 8, total: 9, status: "completed" },
];

export const surveys: Survey[] = [
  // Statistiek
  { id: "toets-1", courseId: "statistiek", name: "Toets 1", progress: 100, status: "completed" },
  { id: "opdracht-4", courseId: "statistiek", name: "Opdracht 4", progress: 10, status: "in-progress" },
  { id: "practicum-1", courseId: "statistiek", name: "Practicum 1", progress: 0, status: "not-started" },
  { id: "hoorcollege-3", courseId: "statistiek", name: "Hoorcollege 3", progress: 100, status: "completed" },
  { id: "hoorcollege-5", courseId: "statistiek", name: "Hoorcollege 5", progress: 0, status: "not-started" },
  // Chemie
  { id: "chem-toets-1", courseId: "chemie", name: "Toets 1", progress: 100, status: "completed" },
  { id: "chem-practicum", courseId: "chemie", name: "Practicum 2", progress: 0, status: "not-started" },
  // Wiskunde
  { id: "wisk-toets-1", courseId: "wiskunde", name: "Eindtoets", progress: 100, status: "completed" },
];

export const questions: Question[] = [
  {
    id: 1,
    surveyId: "opdracht-4",
    type: "multiple-choice",
    text: "Hoeveel tijd had je voor je gevoel voor de opdracht?",
    options: ["Te weinig tijd", "Iets te weinig tijd", "Precies genoeg tijd", "Iets te veel tijd", "Te veel tijd"],
  },
  {
    id: 2,
    surveyId: "opdracht-4",
    type: "multiple-choice",
    text: "Hoe duidelijk was de opdrachtbeschrijving?",
    options: ["Zeer onduidelijk", "Onduidelijk", "Neutraal", "Duidelijk", "Zeer duidelijk"],
  },
  {
    id: 3,
    surveyId: "opdracht-4",
    type: "multiple-choice",
    text: "Hoe beoordeel je de kwaliteit van de hoorcolleges?",
    options: ["Zeer slecht", "Slecht", "Neutraal", "Goed", "Zeer goed"],
  },
  {
    id: 4,
    surveyId: "opdracht-4",
    type: "multiple-choice",
    text: "Was het oefenmateriaal nuttig voor de opdracht?",
    options: ["Helemaal niet nuttig", "Niet zo nuttig", "Neutraal", "Nuttig", "Zeer nuttig"],
  },
  {
    id: 5,
    surveyId: "opdracht-4",
    type: "multiple-choice",
    text: "Hoe goed sluit de opdracht aan bij de lesstof?",
    options: ["Helemaal niet", "Een beetje", "Redelijk", "Goed", "Zeer goed"],
  },
  {
    id: 6,
    surveyId: "opdracht-4",
    type: "multiple-choice",
    text: "Hoe tevreden ben je over de begeleiding van de docent?",
    options: ["Zeer ontevreden", "Ontevreden", "Neutraal", "Tevreden", "Zeer tevreden"],
  },
  {
    id: 7,
    surveyId: "opdracht-4",
    type: "open",
    text: "Wat kan er verbeterd worden aan dit vak?",
  },
  {
    id: 8,
    surveyId: "opdracht-4",
    type: "multiple-choice",
    text: "Zou je dit vak aanraden aan andere studenten?",
    options: ["Zeker niet", "Waarschijnlijk niet", "Misschien", "Waarschijnlijk wel", "Zeker wel"],
  },
  {
    id: 9,
    surveyId: "opdracht-4",
    type: "open",
    text: "Heb je nog overige opmerkingen over de cursus?",
  },
  {
    id: 10,
    surveyId: "opdracht-4",
    type: "multiple-choice",
    text: "Hoe beoordeel je de moeilijkheidsgraad van de opdracht?",
    options: ["Veel te makkelijk", "Te makkelijk", "Precies goed", "Te moeilijk", "Veel te moeilijk"],
  },
];

export const userProfile: UserProfile = {
  name: "Hassan Salman",
  studentNumber: "4521781",
  email: "h.salman@students.uu.nl",
  status: "Evaluatie beginner",
  avatarInitials: "HS",
  badges: [
    { id: "first-eval", name: "Eerste evaluatie", description: "Je eerste evaluatie ingevuld!", earned: true, icon: "award" },
    { id: "full-course", name: "100% Compleet", description: "Alle evaluaties van een vak ingevuld", earned: true, icon: "check-circle" },
    { id: "streak-3", name: "3x Op rij", description: "3 evaluaties achter elkaar ingevuld", earned: false, icon: "flame" },
    { id: "feedback-star", name: "Feedback ster", description: "Uitgebreide open feedback gegeven", earned: false, icon: "star" },
  ],
};

export const docentComments: Record<string, DocentComment[]> = {
  "toets-1": [
    { date: "10 mrt 2026", text: "Bedankt voor jullie feedback over de hoorcolleges! We gaan de slides duidelijker structureren." },
  ],
  "hoorcollege-3": [
    { date: "3 mrt 2026", text: "Op basis van de evaluaties hebben we extra oefenmateriaal toegevoegd op Brightspace." },
  ],
  "chem-toets-1": [
    { date: "15 mrt 2026", text: "Naar aanleiding van jullie feedback passen we het practicum aan met duidelijkere instructies." },
  ],
  "wisk-toets-1": [
    { date: "20 feb 2026", text: "Fijn om te horen dat de oefenopgaven nuttig waren. We voegen er nog meer toe voor volgend jaar." },
  ],
};

export interface WrappedProgress {
  completedSurveys: number;
  requiredSurveys: number;
  unlocked: boolean;
}

export const wrappedProgress: WrappedProgress = {
  completedSurveys: 3,
  requiredSurveys: 7,
  unlocked: false,
};

// Helper to get surveys for a course
export function getSurveysByCourse(courseId: string): Survey[] {
  return surveys.filter((s) => s.courseId === courseId);
}

// Helper to get questions for a survey
export function getQuestionsBySurvey(surveyId: string): Question[] {
  return questions.filter((q) => q.surveyId === surveyId);
}

// Helper to get a course by id
export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

// Helper to get a survey by id
export function getSurvey(id: string): Survey | undefined {
  return surveys.find((s) => s.id === id);
}
