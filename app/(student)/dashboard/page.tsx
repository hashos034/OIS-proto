"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import BottomTabBar from "@/components/BottomTabBar";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/mock";

export default function DashboardPage() {
  const currentCourses = courses.filter((c) => c.status === "current");
  const completedCourses = courses.filter((c) => c.status === "completed");

  return (
    <div className="flex flex-col min-h-full bg-uu-surface">
      {/* Yellow header */}
      <header className="flex-shrink-0 h-14 flex items-center justify-between px-4 bg-uu-yellow">
        <div className="w-10" />
        <h1 className="text-base font-semibold text-uu-black truncate max-w-[60%] text-center">
          Dashboard
        </h1>
        <div className="w-10 flex items-center justify-end">
          <Link
            href="/meldingen"
            className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors duration-200 hover:bg-black/10 active:bg-black/20"
            aria-label="Instellingen"
          >
            <Settings className="w-5 h-5 text-uu-black" />
          </Link>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        {/* Current courses */}
        <section className="mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h2 className="text-sm font-semibold text-uu-text-secondary uppercase tracking-wide mb-3">
              Huidige vakken
            </h2>
            <div className="flex flex-col gap-3">
              {currentCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  name={course.name}
                  completed={course.completed}
                  total={course.total}
                  href={`/cursus/${course.id}`}
                  status={course.status}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Completed courses */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h2 className="text-sm font-semibold text-uu-text-secondary uppercase tracking-wide mb-3">
              Afgeronde vakken
            </h2>
            <div className="flex flex-col gap-3">
              {completedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  name={course.name}
                  completed={course.completed}
                  total={course.total}
                  href={`/cursus/${course.id}`}
                  status={course.status}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <BottomTabBar activeTab="dashboard" />
    </div>
  );
}
