"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronDown, ChevronUp, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import { docentCourses, DocentCourse } from "@/data/mock-docent";

interface DocentSidebarProps {
  activeCourseId?: string;
}

interface CourseSectionProps {
  title: string;
  courses: DocentCourse[];
  activeCourseId?: string;
  defaultExpanded?: boolean;
}

function CourseSection({
  title,
  courses,
  activeCourseId,
  defaultExpanded = true,
}: CourseSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (courses.length === 0) return null;

  return (
    <div className="mb-1">
      {/* Section header */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center justify-between w-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-uu-text-secondary hover:text-uu-text transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-uu-yellow rounded"
        aria-expanded={expanded}
      >
        <span>{title}</span>
        {expanded ? (
          <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
        )}
      </button>

      {/* Course list */}
      {expanded && (
        <ul role="list" className="mt-0.5">
          {courses.map((course) => {
            const isActive = course.id === activeCourseId;
            return (
              <li key={course.id}>
                <Link
                  href={`/docent/cursus/${course.id}`}
                  className={[
                    "flex items-start gap-3 px-4 py-3 min-h-[44px] transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-uu-yellow rounded",
                    isActive
                      ? "bg-uu-surface border-l-[3px] border-uu-black text-uu-text"
                      : "border-l-[3px] border-transparent text-uu-text hover:bg-uu-surface hover:text-uu-text",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  <BookOpen
                    className={[
                      "w-4 h-4 mt-0.5 shrink-0",
                      isActive ? "text-uu-black" : "text-uu-text-secondary",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug truncate">
                      {course.name}
                    </p>
                    <p className="text-xs text-uu-text-secondary mt-0.5">
                      {course.code}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function DocentSidebar({ activeCourseId }: DocentSidebarProps) {
  const pathname = usePathname();
  const isDashboard = pathname === "/docent/dashboard";
  const currentCourses = docentCourses.filter((c) => c.status === "current");
  const completedCourses = docentCourses.filter((c) => c.status === "completed");

  return (
    <nav
      className="w-64 shrink-0 flex flex-col bg-uu-card border-r border-uu-border min-h-full"
      aria-label="Vakken navigatie"
    >
      {/* Dashboard link */}
      <div className="px-3 pt-5 pb-1">
        <Link
          href="/docent/dashboard"
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer min-h-[44px] ${
            isDashboard
              ? "bg-uu-surface text-uu-black border-l-[3px] border-uu-black"
              : "text-uu-text hover:bg-uu-surface"
          }`}
          aria-current={isDashboard ? "page" : undefined}
        >
          <LayoutDashboard className={`w-4.5 h-4.5 ${isDashboard ? "text-uu-black" : "text-uu-text-secondary"}`} aria-hidden="true" />
          Dashboard
        </Link>
      </div>

      {/* Sidebar heading */}
      <div className="px-4 pt-4 pb-3">
        <h2 className="text-lg font-semibold text-uu-text">Mijn vakken</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        <CourseSection
          title="Huidige vakken"
          courses={currentCourses}
          activeCourseId={activeCourseId}
          defaultExpanded={true}
        />
        <CourseSection
          title="Afgeronde vakken"
          courses={completedCourses}
          activeCourseId={activeCourseId}
          defaultExpanded={true}
        />
      </div>
    </nav>
  );
}
