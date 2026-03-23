import Link from "next/link";
import { LogOut } from "lucide-react";
import { docentProfile } from "@/data/mock-docent";

export default function DocentTopBar() {
  return (
    <header className="sticky top-0 z-50 flex flex-col w-full">
      {/* UU Yellow accent strip */}
      <div className="h-1 w-full bg-uu-yellow" aria-hidden="true" />

      {/* Main top bar */}
      <div className="flex items-center justify-between bg-uu-card border-b border-uu-border px-6 h-16">
        {/* Left: branding */}
        <div className="flex flex-col leading-tight">
          <span className="text-base font-bold text-uu-text tracking-tight">
            Learner Journey
          </span>
          <span className="text-xs text-uu-text-secondary font-normal">
            Docent portaal
          </span>
        </div>

        {/* Right: user identity + logout */}
        <div className="flex items-center gap-3">
          {/* Avatar circle */}
          <div
            className="flex items-center justify-center w-9 h-9 rounded-full bg-uu-black text-white text-sm font-semibold select-none"
            aria-hidden="true"
          >
            {docentProfile.avatarInitials}
          </div>

          {/* Name */}
          <span className="text-sm font-medium text-uu-text hidden sm:block">
            {docentProfile.name}
          </span>

          {/* Uitloggen */}
          <Link
            href="/docent"
            className="flex items-center gap-1.5 text-sm text-uu-text-secondary hover:text-uu-black transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-1 rounded px-1 py-0.5"
            aria-label="Uitloggen"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:block">Uitloggen</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
