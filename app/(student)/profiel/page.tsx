"use client";

import Link from "next/link";
import { ChevronRight, Pencil } from "lucide-react";
import Header from "@/components/Header";
import Badge from "@/components/Badge";
import BottomTabBar from "@/components/BottomTabBar";
import { userProfile, courses } from "@/data/mock";

export default function ProfielPage() {
  return (
    <div className="flex flex-col h-full min-h-full bg-uu-surface">
      <Header title="Profiel" backHref="/dashboard" />

      <div className="flex-1 overflow-y-auto pb-4">
        {/* Profile header section */}
        <div className="bg-white px-4 pt-6 pb-5 flex flex-col items-center">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-uu-black flex items-center justify-center mb-3">
            <span className="text-2xl font-bold text-white">
              {userProfile.avatarInitials}
            </span>
          </div>

          {/* Name & student number */}
          <h2 className="text-lg font-semibold text-uu-text">
            {userProfile.name}
          </h2>
          <p className="text-sm text-uu-text-secondary mt-0.5">
            {userProfile.studentNumber}
          </p>

          {/* Status badge */}
          <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-uu-yellow/20 text-xs font-medium text-uu-text">
            {userProfile.status}
          </span>
        </div>

        {/* Vakken section */}
        <div className="px-4 mt-4">
          <h3 className="text-sm font-semibold text-uu-text mb-2">Vakken</h3>
          <div className="space-y-2">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/cursus/${course.id}`}
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.98] min-h-[44px]"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-uu-text">
                    {course.name}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-uu-text-secondary">
                      {course.completed}/{course.total} evaluaties
                    </span>
                    {course.status === "completed" && (
                      <span className="text-xs text-uu-success font-medium">
                        Afgerond
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-uu-text-secondary flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Badges section */}
        <div className="px-4 mt-4">
          <h3 className="text-sm font-semibold text-uu-text mb-2">Badges</h3>
          <div className="grid grid-cols-2 gap-2">
            {userProfile.badges.map((badge) => (
              <Badge
                key={badge.id}
                name={badge.name}
                icon={badge.icon}
                earned={badge.earned}
                description={badge.description}
              />
            ))}
          </div>
        </div>

        {/* Edit profile button */}
        <div className="px-4 mt-5">
          <Link
            href="/profiel/bewerken"
            className="flex items-center justify-center gap-2 w-full py-3 bg-uu-black text-white text-sm font-semibold rounded-xl cursor-pointer transition-colors duration-200 hover:bg-uu-black/90 active:scale-[0.98] min-h-[44px]"
          >
            <Pencil className="w-4 h-4" />
            Profiel bewerken
          </Link>
        </div>
      </div>

      <BottomTabBar activeTab="more" />
    </div>
  );
}
