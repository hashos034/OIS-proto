"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DocentBarChartProps {
  data: { name: string; value: number }[];
  title?: string;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white border border-uu-border rounded-lg shadow-md px-3 py-2 text-sm">
      <p className="font-semibold text-uu-text">{label}</p>
      <p className="text-uu-text-secondary">Aantal: {payload[0].value}</p>
    </div>
  );
}

export default function DocentBarChart({
  data,
  title,
  color = "#1B1B1B",
}: DocentBarChartProps) {
  // Determine if labels are long (need angle)
  const hasLongLabels = data.some((d) => d.name.length > 8);

  return (
    <div className="w-full">
      {title && (
        <p className="text-sm font-medium text-uu-text-secondary mb-3">
          {title}
        </p>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 8,
            right: 16,
            left: 0,
            bottom: hasLongLabels ? 56 : 8,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E7EB"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{
              fontSize: 12,
              fill: "#6B7280",
              angle: hasLongLabels ? -45 : 0,
              textAnchor: hasLongLabels ? "end" : "middle",
            }}
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB" }}
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6B7280" }}
            tickLine={false}
            axisLine={false}
            width={32}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F5F5F5" }} />
          <Bar
            dataKey="value"
            fill={color}
            radius={[4, 4, 0, 0]}
            maxBarSize={56}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
