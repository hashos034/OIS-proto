"use client";

interface SettingsToggleProps {
  label: string;
  description?: string;
  enabled: boolean;
  onToggle: () => void;
}

export default function SettingsToggle({
  label,
  description,
  enabled,
  onToggle,
}: SettingsToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-uu-text">{label}</span>
        {description && (
          <p className="text-xs text-uu-text-secondary mt-0.5 leading-snug">
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        onClick={onToggle}
        className={`relative inline-flex h-7 w-12 min-w-[48px] min-h-[44px] items-center rounded-full cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-uu-yellow focus-visible:ring-offset-2 ${
          enabled ? "bg-uu-black" : "bg-uu-border"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
