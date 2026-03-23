"use client";

import { ChevronDown, Globe } from "lucide-react";

interface LanguageSelectorProps {
  selected: string;
  onSelect: (lang: string) => void;
}

const languages = [
  { value: "nl", label: "Nederlands" },
  { value: "en", label: "English" },
];

export default function LanguageSelector({
  selected,
  onSelect,
}: LanguageSelectorProps) {
  const selectedLang = languages.find((l) => l.value === selected) || languages[0];

  return (
    <div className="relative">
      <label
        htmlFor="language-select"
        className="block text-sm font-medium text-uu-text mb-1.5"
      >
        Taal
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Globe className="w-4 h-4 text-uu-text-secondary" />
        </div>
        <select
          id="language-select"
          value={selected}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-9 pr-10 py-3 text-sm font-medium text-uu-text min-h-[44px] cursor-pointer transition-colors duration-200 hover:border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-uu-yellow focus-visible:border-uu-yellow"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-uu-text-secondary" />
        </div>
      </div>
    </div>
  );
}
