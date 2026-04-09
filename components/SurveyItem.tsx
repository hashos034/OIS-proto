"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Circle, ChevronRight, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import type { DocentComment } from "@/data/mock";

interface SurveyItemProps {
  name: string;
  progress: number;
  status: "completed" | "in-progress" | "not-started";
  href: string;
  feedback?: DocentComment[];
}

export default function SurveyItem({ name, progress, status, href, feedback }: SurveyItemProps) {
  const [expanded, setExpanded] = useState(false);

  const hasFeedback = status === "completed" && feedback && feedback.length > 0;

  const statusIcon = (
    <div className="flex-shrink-0">
      {status === "completed" && (
        <CheckCircle className="w-5 h-5 text-uu-success" />
      )}
      {status === "in-progress" && (
        <div className="w-5 h-5 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-uu-warning" />
        </div>
      )}
      {status === "not-started" && (
        <Circle className="w-5 h-5 text-uu-text-secondary" />
      )}
    </div>
  );

  const nameRow = (
    <div className="flex items-center gap-2 flex-wrap">
      <p className="text-sm font-medium text-uu-text">{name}</p>
      {hasFeedback && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-uu-success text-xs font-medium leading-none">
          <MessageSquare className="w-3 h-3" />
          Feedback beschikbaar
        </span>
      )}
    </div>
  );

  const progressRow = status !== "not-started" && (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 h-1.5 bg-uu-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            backgroundColor:
              status === "completed"
                ? "var(--color-uu-success)"
                : "var(--color-uu-warning)",
          }}
        />
      </div>
      <span className="text-xs text-uu-text-secondary flex-shrink-0">{progress}%</span>
    </div>
  );

  const feedbackSection = hasFeedback && expanded && (
    <div className="mt-3 flex flex-col gap-2">
      {feedback!.map((comment, idx) => (
        <div
          key={idx}
          className="bg-uu-surface rounded-xl p-3 border-l-2 border-uu-success"
        >
          <p className="text-xs text-uu-text-secondary mb-1">{comment.date}</p>
          <p className="text-sm text-uu-text leading-relaxed">{comment.text}</p>
        </div>
      ))}
    </div>
  );

  if (hasFeedback) {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded((prev) => !prev);
          }
        }}
        className="px-4 py-3 bg-white rounded-xl min-h-[56px] cursor-pointer transition-all duration-200 hover:bg-uu-surface active:scale-[0.98] shadow-sm focus:outline-none focus:ring-2 focus:ring-uu-yellow"
      >
        <div className="flex items-center gap-3">
          {statusIcon}
          <div className="flex-1 min-w-0">
            {nameRow}
            {progressRow}
          </div>
          <div className="flex-shrink-0 text-uu-text-secondary">
            {expanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </div>
        {feedbackSection}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl min-h-[56px] cursor-pointer transition-all duration-200 hover:bg-uu-surface active:scale-[0.98] shadow-sm focus:outline-none focus:ring-2 focus:ring-uu-yellow"
    >
      {statusIcon}
      <div className="flex-1 min-w-0">
        {nameRow}
        {progressRow}
      </div>
      <ChevronRight className="w-5 h-5 text-uu-text-secondary flex-shrink-0" />
    </Link>
  );
}
