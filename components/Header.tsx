"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  backHref?: string;
  rightAction?: React.ReactNode;
}

export default function Header({ title, backHref, rightAction }: HeaderProps) {
  return (
    <header className="flex-shrink-0 h-14 flex items-center justify-between px-4 bg-uu-yellow">
      <div className="w-10 flex items-center justify-start">
        {backHref ? (
          <Link
            href={backHref}
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full cursor-pointer transition-colors duration-200 hover:bg-black/10 active:bg-black/20"
            aria-label="Terug"
          >
            <ChevronLeft className="w-6 h-6 text-uu-black" />
          </Link>
        ) : (
          <div className="w-10" />
        )}
      </div>
      <h1 className="text-base font-semibold text-uu-black truncate max-w-[60%] text-center">
        {title}
      </h1>
      <div className="w-10 flex items-center justify-end">
        {rightAction || <div className="w-10" />}
      </div>
    </header>
  );
}
