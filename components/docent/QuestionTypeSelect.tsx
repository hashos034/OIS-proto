import { ChevronDown } from "lucide-react";

interface QuestionTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const QUESTION_TYPES = [
  { value: "multiple-choice", label: "Meerkeuze" },
  { value: "open", label: "Open vraag" },
  { value: "scale", label: "Schaal" },
];

export default function QuestionTypeSelect({
  value,
  onChange,
}: QuestionTypeSelectProps) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          appearance-none
          bg-uu-surface
          border border-uu-border
          text-uu-text text-sm font-medium
          rounded-lg
          pl-3 pr-8 py-2
          min-h-[36px]
          cursor-pointer
          transition-colors duration-150
          hover:border-uu-black hover:bg-white
          focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-1 focus:border-uu-yellow
        "
        aria-label="Vraagtype selecteren"
      >
        {QUESTION_TYPES.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      {/* Custom chevron overlay — pointer-events-none so clicks pass through to select */}
      <ChevronDown
        className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-uu-text-secondary pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
