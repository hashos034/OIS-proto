"use client";

interface MultipleChoiceProps {
  options: string[];
  selected: string | null;
  onSelect: (option: string) => void;
}

export default function MultipleChoice({ options, selected, onSelect }: MultipleChoiceProps) {
  return (
    <fieldset className="flex flex-col gap-2.5" role="radiogroup" aria-label="Keuzes">
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(option)}
            className={`
              flex items-center gap-3 w-full min-h-[44px] px-4 py-3 rounded-xl text-left
              cursor-pointer transition-all duration-200
              ${
                isSelected
                  ? "bg-uu-black/5 border-2 border-uu-black shadow-sm"
                  : "bg-white border-2 border-uu-border hover:border-uu-black/30 active:bg-uu-surface"
              }
            `}
          >
            {/* Radio indicator */}
            <div
              className={`
                flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
                transition-all duration-200
                ${isSelected ? "border-uu-black bg-uu-black" : "border-uu-border"}
              `}
            >
              {isSelected && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>

            {/* Option text */}
            <span
              className={`text-sm leading-snug ${
                isSelected ? "font-medium text-uu-text" : "text-uu-text"
              }`}
            >
              {option}
            </span>
          </button>
        );
      })}
    </fieldset>
  );
}
