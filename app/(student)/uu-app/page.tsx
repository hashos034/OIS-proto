"use client";

import Link from "next/link";
import {
  GraduationCap,
  Bell,
  Settings,
  LogOut,
  LinkIcon,
  Newspaper,
  BarChart3,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import BottomTabBar from "@/components/BottomTabBar";

const menuItems = [
  { icon: LinkIcon, label: "Snelkoppelingen", href: "#", badge: null },
  { icon: Bell, label: "Berichten", href: "#", badge: "45" },
  { icon: Newspaper, label: "Nieuws", href: "#", badge: null },
  { icon: BarChart3, label: "Studievoortgang", href: "#", badge: null },
  { icon: Briefcase, label: "Vacatures", href: "#", badge: null },
  {
    icon: GraduationCap,
    label: "Learner Journey",
    href: "/dashboard",
    badge: null,
    highlight: true,
  },
];

export default function UUAppPage() {
  return (
    <div className="flex flex-col min-h-full bg-uu-surface">
      {/* Yellow header area */}
      <div className="bg-uu-yellow px-4 pt-3 pb-6">
        <div className="flex items-center justify-between mb-3">
          <button
            className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-black/10 transition-colors duration-200"
            aria-label="Instellingen"
          >
            <Settings className="w-5 h-5 text-uu-black" />
          </button>
          <Link
            href="/"
            className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-black/10 transition-colors duration-200"
            aria-label="Uitloggen"
          >
            <LogOut className="w-5 h-5 text-uu-black" />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-uu-black rounded-2xl flex items-center justify-center mb-2">
            <span className="text-white text-xl font-bold">UU</span>
          </div>
          <h1 className="text-base font-bold text-uu-black">
            Universiteit Utrecht
          </h1>
        </div>
      </div>

      {/* Menu list card */}
      <div className="flex-1 px-4 -mt-3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === menuItems.length - 1;
            const content = (
              <div
                className={`flex items-center justify-between px-4 py-3.5 min-h-[52px] cursor-pointer transition-colors duration-150 hover:bg-gray-50 active:bg-gray-100 ${
                  !isLast ? "border-b border-gray-100" : ""
                } ${item.highlight ? "bg-yellow-50/50" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 ${
                      item.highlight ? "text-uu-black" : "text-uu-text-secondary"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      item.highlight
                        ? "font-semibold text-uu-black"
                        : "font-medium text-uu-text"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="bg-uu-red text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            );

            if (item.href === "#") {
              return <div key={item.label}>{content}</div>;
            }

            return (
              <Link key={item.label} href={item.href} className="block">
                {content}
              </Link>
            );
          })}
        </div>

        {/* Powered by */}
        <p className="text-center text-xs text-uu-text-secondary mt-6 mb-4">
          Powered by StuComm
        </p>
      </div>

      <BottomTabBar activeTab="more" />
    </div>
  );
}
