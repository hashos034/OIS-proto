"use client";

import Link from "next/link";
import { GraduationCap, CalendarDays, CircleCheckBig, CreditCard, MoreHorizontal } from "lucide-react";

interface BottomTabBarProps {
  activeTab?: string;
}

const tabs = [
  { id: "dashboard", icon: GraduationCap, label: "Learner Journey", href: "/dashboard" },
  { id: "timetable", icon: CalendarDays, label: "Timetable", href: "/dashboard" },
  { id: "results", icon: CircleCheckBig, label: "Results", href: "/dashboard" },
  { id: "cards", icon: CreditCard, label: "Cards", href: "/dashboard" },
  { id: "more", icon: MoreHorizontal, label: "More", href: "/uu-app", hasNotification: true },
];

export default function BottomTabBar({ activeTab = "dashboard" }: BottomTabBarProps) {
  return (
    <nav className="flex-shrink-0 bg-white border-t border-uu-border px-2 pb-1">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] py-1.5 cursor-pointer transition-colors duration-200"
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? "text-uu-black" : "text-uu-text-secondary"
                  }`}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                {tab.hasNotification && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 bg-uu-red rounded-full" />
                )}
              </div>
              <span
                className={`text-[10px] mt-0.5 transition-colors duration-200 ${
                  isActive ? "text-uu-black font-medium" : "text-uu-text-secondary"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
