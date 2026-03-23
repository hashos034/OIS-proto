// Simple module-level store for survey answers.
// Persists across client-side navigations within a session.
// Shared by question page and overview page.

const answersStore: Record<string, Record<number, string>> = {};

export function getAnswers(surveyId: string): Record<number, string> {
  if (!answersStore[surveyId]) {
    answersStore[surveyId] = {};
  }
  return answersStore[surveyId];
}

export function setAnswer(surveyId: string, questionId: number, value: string): void {
  if (!answersStore[surveyId]) {
    answersStore[surveyId] = {};
  }
  answersStore[surveyId][questionId] = value;
}

export function getAnsweredCount(surveyId: string, questionIds: number[]): number {
  const answers = answersStore[surveyId] || {};
  return questionIds.filter((id) => answers[id] && answers[id].trim() !== "").length;
}
