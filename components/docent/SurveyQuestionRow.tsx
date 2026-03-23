"use client";

import { useState, useRef } from "react";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { DocentQuestion } from "@/data/mock-docent";
import QuestionTypeSelect from "./QuestionTypeSelect";

const TYPE_LABELS: Record<string, string> = {
  "multiple-choice": "Meerkeuze",
  open: "Open vraag",
  scale: "Schaal",
};

const TYPE_COLORS: Record<string, string> = {
  "multiple-choice": "bg-uu-yellow/10 text-uu-black border-uu-yellow/30",
  open: "bg-uu-success/10 text-uu-success border-uu-success/30",
  scale: "bg-uu-black/5 text-uu-black border-uu-black/20",
};

interface SurveyQuestionRowProps {
  question: DocentQuestion;
  questionNumber: number;
  onUpdate: (id: number, text: string) => void;
  onTypeChange: (id: number, type: string) => void;
  onDelete: (id: number) => void;
}

export default function SurveyQuestionRow({
  question,
  questionNumber,
  onUpdate,
  onTypeChange,
  onDelete,
}: SurveyQuestionRowProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(question.text);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleEditClick() {
    setDraft(question.text);
    setEditing(true);
    // Focus the input after it mounts
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function handleBlur() {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== question.text) {
      onUpdate(question.id, trimmed);
    } else {
      setDraft(question.text);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
    if (e.key === "Escape") {
      setDraft(question.text);
      setEditing(false);
    }
  }

  const typeColor =
    TYPE_COLORS[question.type] ?? "bg-uu-surface text-uu-text-secondary border-uu-border";

  return (
    <div className="group flex items-start gap-3 bg-white border border-uu-border rounded-xl p-4 hover:border-uu-black/30 hover:shadow-sm transition-all duration-200">
      {/* Drag handle — visual only */}
      <div
        className="flex items-center justify-center shrink-0 mt-0.5 text-uu-text-secondary opacity-40 group-hover:opacity-70 transition-opacity duration-150"
        aria-hidden="true"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Question number badge */}
      <div
        className="flex items-center justify-center shrink-0 w-7 h-7 rounded-full bg-uu-surface text-sm font-semibold text-uu-text mt-0.5 select-none"
        aria-label={`Vraag ${questionNumber}`}
      >
        {questionNumber}
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Question text row */}
        <div className="flex items-start gap-2">
          {editing ? (
            <input
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="
                flex-1 min-w-0
                text-sm font-medium text-uu-text
                bg-uu-surface border border-uu-black
                rounded-lg px-3 py-1.5
                focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-1
                transition-colors duration-150
              "
              aria-label="Vraagtekst bewerken"
            />
          ) : (
            <p className="flex-1 text-sm font-medium text-uu-text leading-snug">
              {question.text}
              {question.required && (
                <span
                  className="ml-1 text-uu-red font-bold"
                  aria-label="Verplicht"
                >
                  *
                </span>
              )}
            </p>
          )}

          {/* Pencil edit button — shown when not editing */}
          {!editing && (
            <button
              onClick={handleEditClick}
              className="
                shrink-0
                flex items-center justify-center
                w-7 h-7 rounded
                text-uu-text-secondary
                hover:text-uu-text hover:bg-uu-surface
                opacity-0 group-hover:opacity-100
                transition-all duration-150
                cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:opacity-100
              "
              aria-label="Vraagtekst bewerken"
            >
              <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* MC options chips */}
        {question.type === "multiple-choice" && question.options && question.options.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5" aria-label="Antwoordopties">
            {question.options.map((opt, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 bg-uu-surface border border-uu-border rounded-full text-xs text-uu-text-secondary font-medium"
              >
                {opt}
              </span>
            ))}
          </div>
        )}

        {/* Scale hint */}
        {question.type === "scale" && (
          <p className="mt-1.5 text-xs text-uu-text-secondary">
            Schaalvraag (1 – 10)
          </p>
        )}
      </div>

      {/* Right-side controls */}
      <div className="flex items-center gap-2 shrink-0 mt-0.5">
        {/* Type badge */}
        <span
          className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium select-none ${typeColor}`}
        >
          {TYPE_LABELS[question.type] ?? question.type}
        </span>

        {/* Type select */}
        <QuestionTypeSelect
          value={question.type}
          onChange={(val) => onTypeChange(question.id, val)}
        />

        {/* Delete button */}
        <button
          onClick={() => onDelete(question.id)}
          className="
            flex items-center justify-center
            min-w-[36px] min-h-[36px] rounded-lg
            text-uu-text-secondary
            hover:text-uu-red hover:bg-uu-red/10
            transition-colors duration-150
            cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-1
          "
          aria-label={`Vraag ${questionNumber} verwijderen`}
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
