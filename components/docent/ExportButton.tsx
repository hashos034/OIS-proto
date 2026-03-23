"use client";

import { useState } from "react";
import { Download, Check } from "lucide-react";

interface ExportButtonProps {
  label?: string;
}

export default function ExportButton({
  label = "Exporteer data",
}: ExportButtonProps) {
  const [exported, setExported] = useState(false);

  function handleExport() {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={handleExport}
        className={[
          "flex items-center gap-2 px-4 h-10 rounded-lg text-sm font-medium border transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-1",
          exported
            ? "border-uu-success/30 bg-uu-success/10 text-uu-success"
            : "border-uu-border bg-white text-uu-text hover:bg-uu-surface",
        ].join(" ")}
        aria-label={label}
      >
        {exported ? (
          <>
            <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Geëxporteerd!</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{label}</span>
          </>
        )}
      </button>
    </div>
  );
}
