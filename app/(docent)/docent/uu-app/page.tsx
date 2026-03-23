"use client";

import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  GraduationCap,
  Calendar,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";
import { docentProfile } from "@/data/mock-docent";

interface AppTile {
  label: string;
  icon: React.ElementType;
  href: string;
  highlight?: boolean;
  description?: string;
}

const appTiles: AppTile[] = [
  {
    label: "Learner Journey",
    icon: BarChart3,
    href: "/docent/dashboard",
    highlight: true,
    description: "Cursusevaluaties",
  },
  {
    label: "Brightspace",
    icon: BookOpen,
    href: "#",
    description: "Leerplatform",
  },
  {
    label: "Osiris",
    icon: GraduationCap,
    href: "#",
    description: "Studenten & cijfers",
  },
  {
    label: "Rooster",
    icon: Calendar,
    href: "#",
    description: "Planning & agenda",
  },
  {
    label: "E-mail",
    icon: Mail,
    href: "#",
    description: "UU webmail",
  },
  {
    label: "Instellingen",
    icon: Settings,
    href: "#",
    description: "Accountbeheer",
  },
];

export default function DocentUUAppPage() {
  return (
    <div className="min-h-screen bg-uu-surface">
      {/* Top bar */}
      <header className="bg-white border-b border-uu-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-uu-black rounded-sm flex items-center justify-center flex-shrink-0">
              <svg
                viewBox="0 0 32 40"
                className="w-4 h-5 fill-white"
                aria-hidden="true"
              >
                <path d="M16 0 L32 6 L32 22 C32 32 16 40 16 40 C16 40 0 32 0 22 L0 6 Z" />
                <path
                  d="M10 14 L10 24 C10 27.5 12.5 30 16 30 C19.5 30 22 27.5 22 24 L22 14 L19 14 L19 24 C19 25.9 17.7 27 16 27 C14.3 27 13 25.9 13 24 L13 14 Z"
                  className="fill-uu-yellow"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-uu-text">
              Universiteit Utrecht
            </span>
          </div>
          <Link
            href="/docent"
            className="inline-flex items-center gap-1.5 text-sm text-uu-text-secondary hover:text-uu-text transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow rounded px-2 py-1"
          >
            <LogOut size={15} aria-hidden="true" />
            Uitloggen
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-6 py-10">
        {/* Welcome card */}
        <div className="bg-uu-yellow rounded-2xl px-7 py-6 mb-8 flex items-center gap-5">
          {/* Avatar */}
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-uu-black flex items-center justify-center">
            <span className="text-xl font-bold text-white select-none">{docentProfile.avatarInitials}</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-uu-black/60 uppercase tracking-widest mb-0.5">
              Universiteit Utrecht
            </p>
            <h1 className="text-2xl font-bold text-uu-black leading-tight">
              Welkom, {docentProfile.name.split(" ")[0]}
            </h1>
            <p className="text-sm text-uu-black/70 mt-0.5">
              {docentProfile.email}
            </p>
          </div>
        </div>

        {/* App tiles grid */}
        <section aria-label="Applicaties">
          <h2 className="text-xs font-semibold text-uu-text-secondary uppercase tracking-widest mb-4">
            Applicaties
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {appTiles.map((tile) => {
              const Icon = tile.icon;
              const isExternal = tile.href === "#";

              const tileContent = (
                <div
                  className={[
                    "bg-white rounded-xl p-6 flex flex-col gap-3 cursor-pointer",
                    "shadow-sm hover:shadow-md transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-2",
                    tile.highlight
                      ? "border-l-4 border-uu-black"
                      : "border border-uu-border",
                  ].join(" ")}
                  tabIndex={isExternal ? 0 : undefined}
                  role={isExternal ? "button" : undefined}
                  aria-label={isExternal ? tile.label : undefined}
                >
                  <Icon
                    size={32}
                    className={
                      tile.highlight ? "text-uu-black" : "text-uu-text-secondary"
                    }
                    aria-hidden="true"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p
                      className={[
                        "text-sm font-semibold leading-tight",
                        tile.highlight ? "text-uu-black" : "text-uu-text",
                      ].join(" ")}
                    >
                      {tile.label}
                    </p>
                    {tile.description && (
                      <p className="text-xs text-uu-text-secondary mt-0.5">
                        {tile.description}
                      </p>
                    )}
                  </div>
                </div>
              );

              if (isExternal) {
                return (
                  <div key={tile.label} onClick={() => {}}>
                    {tileContent}
                  </div>
                );
              }

              return (
                <Link key={tile.label} href={tile.href} className="block group">
                  {tileContent}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Logout button — bottom */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/docent"
            className="inline-flex items-center gap-2 min-h-[44px] px-6 border border-uu-border bg-white hover:bg-uu-surface text-uu-text text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-2"
          >
            <LogOut size={16} aria-hidden="true" />
            Uitloggen
          </Link>
        </div>
      </main>
    </div>
  );
}
