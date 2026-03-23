import { Award, CheckCircle, Flame, Star, Trophy, Zap } from "lucide-react";

interface BadgeProps {
  name: string;
  icon: string;
  earned: boolean;
  description: string;
}

const iconMap: Record<string, React.ElementType> = {
  award: Award,
  "check-circle": CheckCircle,
  flame: Flame,
  star: Star,
  trophy: Trophy,
  zap: Zap,
};

export default function Badge({ name, icon, earned, description }: BadgeProps) {
  const IconComponent = iconMap[icon] || Award;

  return (
    <div
      className={`flex flex-col items-center text-center p-3 rounded-xl transition-all duration-200 ${
        earned
          ? "bg-uu-card border border-uu-border"
          : "bg-uu-surface opacity-50"
      }`}
      title={description}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
          earned ? "bg-uu-black" : "bg-uu-surface"
        }`}
      >
        <IconComponent
          className={`w-5 h-5 ${earned ? "text-white" : "text-uu-text-secondary"}`}
        />
      </div>
      <span
        className={`text-xs font-medium leading-tight ${
          earned ? "text-uu-text" : "text-uu-text-secondary"
        }`}
      >
        {name}
      </span>
    </div>
  );
}
