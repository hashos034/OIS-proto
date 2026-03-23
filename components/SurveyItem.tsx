"use client";

import Link from "next/link";
import { CheckCircle, Circle, ChevronRight } from "lucide-react";

interface SurveyItemProps {
  name: string;
  progress: number;
  status: "completed" | "in-progress" | "not-started";
  href: string;
}

export default function SurveyItem({ name, progress, status, href }: SurveyItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl min-h-[56px] cursor-pointer transition-all duration-200 hover:bg-uu-surface active:scale-[0.98] shadow-sm"
    >
      {/* Status indicator */}
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

      {/* Name + progress */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-uu-text truncate">{name}</p>
        {status !== "not-started" && (
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1.5 bg-uu-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundColor: status === "completed" ? "var(--color-uu-success)" : "var(--color-uu-warning)",
                }}
              />
            </div>
            <span className="text-xs text-uu-text-secondary flex-shrink-0">{progress}%</span>
          </div>
        )}
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-uu-text-secondary flex-shrink-0" />
    </Link>
  );
}
