"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  BarChart2,
  Users,
  CalendarDays,
  KeyRound,
} from "lucide-react";
import {
  getDocentSurvey,
  getDocentCourse,
  getDocentQuestionsBySurvey,
  DocentQuestion,
} from "@/data/mock-docent";
import Breadcrumb from "@/components/docent/Breadcrumb";
import SurveyQuestionRow from "@/components/docent/SurveyQuestionRow";
import PublishButton from "@/components/docent/PublishButton";

// --- Status badge helper ---
const STATUS_CONFIG = {
  draft: {
    label: "Concept",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  published: {
    label: "Gepubliceerd",
    className: "bg-uu-success/10 text-uu-success border-uu-success/30",
  },
  closed: {
    label: "Gesloten",
    className: "bg-uu-surface text-uu-text-secondary border-uu-border",
  },
};

let nextTempId = 9000;

function makeNewQuestion(surveyId: string): DocentQuestion {
  return {
    id: nextTempId++,
    surveyId,
    type: "multiple-choice",
    text: "Nieuwe vraag",
    options: ["Optie A", "Optie B", "Optie C"],
    required: false,
  };
}

export default function SurveyEditorPage() {
  const params = useParams<{ id: string; eid: string }>();
  const courseId = params.id;
  const surveyId = params.eid;

  const survey = getDocentSurvey(surveyId);
  const course = getDocentCourse(courseId);

  // --- Local state ---
  const [questions, setQuestions] = useState<DocentQuestion[]>(() =>
    getDocentQuestionsBySurvey(surveyId)
  );
  const [surveyStatus, setSurveyStatus] = useState(
    survey?.status ?? "draft"
  );
  const [note, setNote] = useState("");

  // --- Guard: unknown survey or course ---
  if (!survey || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-3">
        <p className="text-uu-text-secondary text-sm">
          Enquête of cursus niet gevonden.
        </p>
        <Link
          href={`/docent/cursus/${courseId}`}
          className="text-uu-black text-sm font-medium hover:underline cursor-pointer"
        >
          Terug naar cursus
        </Link>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[surveyStatus];
  const hasResponses = survey.responseCount > 0;
  const responsePercent =
    survey.totalStudents > 0
      ? Math.round((survey.responseCount / survey.totalStudents) * 100)
      : 0;

  // --- Question handlers ---
  function handleUpdateText(id: number, text: string) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, text } : q))
    );
  }

  function handleTypeChange(id: number, type: string) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              type: type as DocentQuestion["type"],
              // Clear options when switching away from MC
              options:
                type === "multiple-choice"
                  ? q.options ?? ["Optie A", "Optie B", "Optie C"]
                  : undefined,
            }
          : q
      )
    );
  }

  function handleDelete(id: number) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  function handleAddQuestion() {
    setQuestions((prev) => [...prev, makeNewQuestion(surveyId)]);
  }

  function handlePublish() {
    setSurveyStatus("published");
  }

  function handleUnpublish() {
    setSurveyStatus("draft");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/docent/dashboard" },
          { label: course.name, href: `/docent/cursus/${courseId}` },
          { label: survey.name },
        ]}
      />

      {/* ── Header card ─────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        {/* Title row */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div>
              <h1 className="text-2xl font-bold text-uu-text leading-tight">
                {survey.name}
              </h1>
              <p className="text-sm text-uu-text-secondary mt-0.5">
                {course.name} &middot; {course.code}
              </p>
            </div>
          </div>

          {/* Status badge */}
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-semibold select-none ${statusConfig.className}`}
          >
            {statusConfig.label}
          </span>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-uu-text-secondary border-t border-uu-border pt-4">
          {/* Response count */}
          {(surveyStatus === "published" || surveyStatus === "closed") && (
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                <span className="font-semibold text-uu-text">
                  {survey.responseCount}/{survey.totalStudents}
                </span>{" "}
                studenten hebben gereageerd ({responsePercent}%)
              </span>
            </div>
          )}

          {/* Published date */}
          {survey.publishedAt && (
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                Gepubliceerd op{" "}
                <span className="font-medium text-uu-text">
                  {new Date(survey.publishedAt).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </span>
            </div>
          )}

          {/* Closed date */}
          {survey.closedAt && (
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                Gesloten op{" "}
                <span className="font-medium text-uu-text">
                  {new Date(survey.closedAt).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </span>
            </div>
          )}

          {/* Access code */}
          <div className="flex items-center gap-1.5">
            <KeyRound className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>
              Toegangscode:{" "}
              <span className="font-mono font-semibold text-uu-text tracking-widest">
                {survey.accessCode}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Questions section ────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-uu-text">
            Vragen
            <span className="ml-2 text-sm font-normal text-uu-text-secondary">
              ({questions.length})
            </span>
          </h2>
        </div>

        {/* Question list */}
        <div
          className="space-y-3"
          role="list"
          aria-label="Lijst van enquêtevragen"
        >
          {questions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-uu-text-secondary text-sm">
                Nog geen vragen toegevoegd.
              </p>
              <p className="text-uu-text-secondary text-sm">
                Klik op &ldquo;Vraag toevoegen&rdquo; om te beginnen.
              </p>
            </div>
          )}

          {questions.map((q, index) => (
            <div key={q.id} role="listitem">
              <SurveyQuestionRow
                question={q}
                questionNumber={index + 1}
                onUpdate={handleUpdateText}
                onTypeChange={handleTypeChange}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>

        {/* Add question button */}
        <button
          onClick={handleAddQuestion}
          className="
            mt-4 w-full
            flex items-center justify-center gap-2
            min-h-[44px] px-4 py-2.5
            border-2 border-dashed border-uu-border
            text-sm font-medium text-uu-text-secondary
            rounded-xl
            hover:border-uu-black hover:text-uu-black hover:bg-uu-surface
            active:bg-uu-border
            transition-all duration-200
            cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-1
          "
          aria-label="Nieuwe vraag toevoegen"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>Vraag toevoegen</span>
        </button>
      </div>

      {/* ── Note for students ────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <label
          htmlFor="student-note"
          className="block text-lg font-semibold text-uu-text mb-1"
        >
          Bericht aan studenten
        </label>
        <p className="text-sm text-uu-text-secondary mb-3">
          Dit bericht is zichtbaar voor studenten bovenaan de enquête.
        </p>
        <textarea
          id="student-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={500}
          rows={4}
          placeholder="Schrijf een opmerking die studenten kunnen zien bij deze enquête..."
          className="
            w-full
            border border-uu-border rounded-lg
            px-3 py-2.5
            text-sm text-uu-text
            placeholder:text-uu-text-secondary
            resize-y
            transition-colors duration-150
            hover:border-uu-black/30
            focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:border-uu-black
          "
          aria-describedby="note-char-count"
        />
        <p
          id="note-char-count"
          className="mt-1.5 text-xs text-uu-text-secondary text-right"
          aria-live="polite"
          aria-atomic="true"
        >
          {note.length}/500 tekens
        </p>
      </div>

      {/* ── Bottom action bar ────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        {/* Left: statistics link */}
        <div>
          {hasResponses ? (
            <Link
              href={`/docent/cursus/${courseId}/enquete/${surveyId}/vraag/${questions[0]?.id ?? 1}`}
              className="
                inline-flex items-center gap-2
                min-h-[44px] px-4 py-2.5
                border border-uu-border
                text-sm font-medium text-uu-text
                rounded-lg
                hover:bg-uu-surface hover:border-uu-black/30
                transition-all duration-150
                cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-1
              "
            >
              <BarChart2 className="w-4 h-4" aria-hidden="true" />
              <span>Bekijk statistieken</span>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm text-uu-text-secondary select-none">
              <BarChart2 className="w-4 h-4" aria-hidden="true" />
              <span>Nog geen reacties om te tonen</span>
            </span>
          )}
        </div>

        {/* Right: publish button */}
        <PublishButton
          status={surveyStatus}
          onPublish={handlePublish}
          onUnpublish={handleUnpublish}
        />
      </div>
    </div>
  );
}
