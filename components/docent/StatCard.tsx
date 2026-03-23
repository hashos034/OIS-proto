import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm flex items-start gap-4">
      {/* Icon circle */}
      <div
        className="w-11 h-11 rounded-full bg-uu-yellow/10 flex items-center justify-center shrink-0 text-uu-black"
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-uu-text leading-none">
            {value}
          </span>
          {trend === "up" && (
            <TrendingUp
              className="w-4 h-4 text-uu-success shrink-0"
              aria-label="Stijgende trend"
            />
          )}
          {trend === "down" && (
            <TrendingDown
              className="w-4 h-4 text-uu-red shrink-0"
              aria-label="Dalende trend"
            />
          )}
        </div>
        <p className="text-sm text-uu-text-secondary mt-0.5 truncate">{title}</p>
        {subtitle && (
          <p className="text-xs text-uu-text-secondary mt-0.5 truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
