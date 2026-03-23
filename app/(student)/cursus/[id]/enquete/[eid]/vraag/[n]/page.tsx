"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import Link from "next/link";
import { getCourse, getSurvey, getQuestionsBySurvey } from "@/data/mock";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import MultipleChoice from "@/components/MultipleChoice";
import OpenQuestion from "@/components/OpenQuestion";
import { getAnswers, setAnswer } from "@/data/answers-store";
import { ChevronLeft, ChevronRight, List } from "lucide-react";

export default function QuestionPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const surveyId = params.eid as string;
  const questionNum = parseInt(params.n as string, 10);

  const course = getCourse(courseId);
  const survey = getSurvey(surveyId);
  const questions = getQuestionsBySurvey(surveyId);
  const total = questions.length;
  const question = questions[questionNum - 1];

  const answers = getAnswers(surveyId);
  const [currentAnswer, setCurrentAnswer] = useState<string>(
    answers[questionNum] || ""
  );

  const saveAnswer = useCallback(
    (value: string) => {
      setCurrentAnswer(value);
      setAnswer(surveyId, questionNum, value);
    },
    [surveyId, questionNum]
  );

  if (!course || !survey || !question) {
    return (
      <div className="flex flex-col h-full">
        <Header title="Niet gevonden" backHref={`/cursus/${courseId}`} />
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-sm text-uu-text-secondary">Vraag niet gevonden.</p>
        </div>
      </div>
    );
  }

  const isFirst = questionNum === 1;
  const isLast = questionNum === total;
  const basePath = `/cursus/${courseId}/enquete/${surveyId}`;

  const handlePrev = () => {
    if (!isFirst) {
      router.push(`${basePath}/vraag/${questionNum - 1}`);
    }
  };

  const handleNext = () => {
    if (isLast) {
      router.push(`${basePath}/overzicht`);
    } else {
      router.push(`${basePath}/vraag/${questionNum + 1}`);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header title={survey.name} backHref={`${basePath}/intro`} />

      {/* Breadcrumb */}
      <div className="px-4 py-2 bg-white border-b border-uu-border">
        <p className="text-xs text-uu-text-secondary truncate">
          {course.name} &rsaquo; {survey.name}
        </p>
      </div>

      {/* Scrollable question area */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-5 pb-4 space-y-5">
          <QuestionCard
            question={question.text}
            questionNumber={questionNum}
            total={total}
          />

          {/* Answer input */}
          <div className="mt-2">
            {question.type === "multiple-choice" && question.options ? (
              <MultipleChoice
                options={question.options}
                selected={currentAnswer || null}
                onSelect={saveAnswer}
              />
            ) : (
              <OpenQuestion
                value={currentAnswer}
                onChange={saveAnswer}
                placeholder="Typ je antwoord hier..."
              />
            )}
          </div>

          {/* Link to overview */}
          <div className="flex justify-center pt-2">
            <Link
              href={`${basePath}/overzicht`}
              className="flex items-center gap-1.5 text-xs text-uu-text cursor-pointer transition-colors duration-200 hover:text-uu-text-secondary py-2"
            >
              <List className="w-3.5 h-3.5" />
              Bekijk alle vragen
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div className="flex-shrink-0 bg-white border-t border-uu-border px-4 py-3 space-y-3">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <ProgressBar current={questionNum} total={total} />
          </div>
          <span className="text-xs font-medium text-uu-text-secondary flex-shrink-0">
            Vraag {questionNum}/{total}
          </span>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isFirst}
            className={`
              flex-1 flex items-center justify-center gap-1.5 h-11 rounded-xl text-sm font-medium
              transition-all duration-200 cursor-pointer
              ${
                isFirst
                  ? "bg-uu-surface text-uu-text-secondary cursor-not-allowed"
                  : "bg-white border border-uu-black text-uu-text hover:bg-uu-surface active:scale-[0.98]"
              }
            `}
          >
            <ChevronLeft className="w-4 h-4" />
            Vorige
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-xl text-sm font-semibold bg-uu-black text-white cursor-pointer transition-all duration-200 hover:bg-uu-black/90 active:scale-[0.98]"
          >
            {isLast ? "Overzicht" : "Volgende"}
            {!isLast && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
