"use client";

import { PieChart, BarChart3 } from "lucide-react";

interface ChartToggleProps {
  activeView: "pie" | "bar";
  onToggle: (view: "pie" | "bar") => void;
}

export default function ChartToggle({ activeView, onToggle }: ChartToggleProps) {
  return (
    <div
      className="inline-flex rounded-lg border border-uu-border overflow-hidden"
      role="group"
      aria-label="Grafiektype kiezen"
    >
      <button
        onClick={() => onToggle("pie")}
        className={[
          "flex items-center gap-1.5 px-3 h-9 text-sm font-medium transition-colors duration-150 cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-uu-yellow",
          activeView === "pie"
            ? "bg-uu-black text-white"
            : "bg-white text-uu-text hover:bg-uu-surface",
        ].join(" ")}
        aria-pressed={activeView === "pie"}
        aria-label="Cirkeldiagram"
      >
        <PieChart className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Cirkel</span>
      </button>

      <button
        onClick={() => onToggle("bar")}
        className={[
          "flex items-center gap-1.5 px-3 h-9 text-sm font-medium transition-colors duration-150 cursor-pointer",
          "border-l border-uu-border",
          "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-uu-yellow",
          activeView === "bar"
            ? "bg-uu-black text-white"
            : "bg-white text-uu-text hover:bg-uu-surface",
        ].join(" ")}
        aria-pressed={activeView === "bar"}
        aria-label="Staafdiagram"
      >
        <BarChart3 className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Staaf</span>
      </button>
    </div>
  );
}
