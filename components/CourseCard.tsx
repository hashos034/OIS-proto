"use client";

import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";

interface CourseCardProps {
  name: string;
  completed: number;
  total: number;
  href: string;
  status: "current" | "completed";
}

export default function CourseCard({ name, completed, total, href, status }: CourseCardProps) {
  const isCompleted = status === "completed";

  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-4 bg-uu-card rounded-2xl border border-uu-border cursor-pointer transition-all duration-200 hover:border-gray-300 active:scale-[0.98] min-h-[44px]"
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
          isCompleted ? "bg-green-50" : "bg-gray-100"
        }`}
      >
        <BookOpen
          className={`w-5 h-5 ${isCompleted ? "text-uu-success" : "text-uu-black"}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-uu-text truncate">{name}</h3>
          <span className="text-xs text-uu-text-secondary ml-2 flex-shrink-0">
            {completed}/{total}
          </span>
        </div>
        <ProgressBar current={completed} total={total} size="sm" />
      </div>
      <ChevronRight className="w-4 h-4 text-uu-text-secondary flex-shrink-0" />
    </Link>
  );
}
