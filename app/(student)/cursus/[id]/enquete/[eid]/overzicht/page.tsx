"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getCourse, getSurvey, getQuestionsBySurvey } from "@/data/mock";
import Header from "@/components/Header";
import { getAnswers } from "@/data/answers-store";
import { CheckCircle, Circle } from "lucide-react";

export default function OverviewPage() {
  const params = useParams();
  const courseId = params.id as string;
  const surveyId = params.eid as string;
  const course = getCourse(courseId);
  const survey = getSurvey(surveyId);
  const questions = getQuestionsBySurvey(surveyId);
  const answers = getAnswers(surveyId);

  if (!course || !survey) {
    return (
      <div className="flex flex-col h-full">
        <Header title="Niet gevonden" backHref={`/cursus/${courseId}`} />
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-sm text-uu-text-secondary">Enquete niet gevonden.</p>
        </div>
      </div>
    );
  }

  const basePath = `/cursus/${courseId}/enquete/${surveyId}`;
  const answeredCount = questions.filter((q) => answers[q.id] && answers[q.id].trim() !== "").length;

  return (
    <div className="flex flex-col h-full">
      <Header title="Overzicht" backHref={`${basePath}/vraag/${questions.length}`} />

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4 pb-6 space-y-4">
          {/* Summary */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-uu-border">
            <h2 className="text-base font-semibold text-uu-text mb-1">
              {survey.name}
            </h2>
            <p className="text-sm text-uu-text-secondary">
              {course.name}
            </p>
            <p className="text-xs text-uu-text-secondary mt-2">
              {answeredCount} van {questions.length} vragen beantwoord
            </p>
          </div>

          {/* Question list */}
          <div className="flex flex-col gap-2">
            {questions.map((question, idx) => {
              const isAnswered = answers[question.id] && answers[question.id].trim() !== "";
              return (
                <Link
                  key={question.id}
                  href={`${basePath}/vraag/${idx + 1}`}
                  className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl cursor-pointer transition-all duration-200 hover:bg-uu-surface active:scale-[0.98] shadow-sm min-h-[44px]"
                >
                  <div className="flex-shrink-0">
                    {isAnswered ? (
                      <CheckCircle className="w-5 h-5 text-uu-success" />
                    ) : (
                      <Circle className="w-5 h-5 text-uu-text-secondary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-uu-text-secondary mb-0.5">
                      Vraag {idx + 1}
                    </p>
                    <p className="text-sm text-uu-text truncate">
                      {question.text}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom action */}
      <div className="flex-shrink-0 bg-white border-t border-uu-border px-4 py-3">
        <Link
          href={`${basePath}/submit`}
          className="flex items-center justify-center w-full h-12 bg-uu-black text-white font-semibold rounded-xl cursor-pointer transition-all duration-200 hover:bg-uu-black/90 active:scale-[0.98] text-sm"
        >
          Inleveren
        </Link>
      </div>
    </div>
  );
}
