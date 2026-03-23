interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export default function ProgressBar({
  current,
  total,
  showLabel = false,
  size = "md",
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const heightClass = size === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-uu-text-secondary">Voortgang</span>
          <span className="text-xs font-medium text-uu-text">{percentage}%</span>
        </div>
      )}
      <div className={`w-full ${heightClass} bg-uu-border rounded-full overflow-hidden`}>
        <div
          className="h-full bg-uu-black rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${current} van ${total} voltooid`}
        />
      </div>
    </div>
  );
}
