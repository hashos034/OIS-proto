"use client";

interface OpenQuestionProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function OpenQuestion({
  value,
  onChange,
  placeholder = "Typ je antwoord hier...",
}: OpenQuestionProps) {
  const maxChars = 500;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="open-question" className="sr-only">
        Je antwoord
      </label>
      <textarea
        id="open-question"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxChars}
        rows={5}
        className="w-full px-4 py-3 rounded-xl border-2 border-uu-border bg-white text-sm text-uu-text placeholder:text-uu-text-secondary/60 resize-none transition-colors duration-200 focus:border-uu-yellow focus:outline-none focus:ring-2 focus:ring-uu-yellow/30 min-h-[120px]"
      />
      <p className="text-xs text-uu-text-secondary text-right">
        {value.length}/{maxChars} tekens
      </p>
    </div>
  );
}
