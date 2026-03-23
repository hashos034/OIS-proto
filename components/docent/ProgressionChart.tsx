"use client";

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SurveyProgressionPoint {
  surveyName: string;
  averageScore: number;
  responseRate: number;
}

interface ProgressionChartProps {
  data: SurveyProgressionPoint[];
  title?: string;
}

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white border border-uu-border rounded-lg shadow-md p-3 text-sm">
      <p className="font-semibold text-uu-text mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-uu-text-secondary">
          <span
            className="inline-block w-2.5 h-2.5 rounded-sm shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.name}:</span>
          <span className="font-medium text-uu-text">
            {entry.name === "Gem. tevredenheid"
              ? `${entry.value.toFixed(1)} / 5`
              : `${entry.value}%`}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ProgressionChart({ data, title }: ProgressionChartProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-base font-semibold text-uu-text mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="responseRateGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFCD00" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#FFCD00" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis
            dataKey="surveyName"
            tick={{ fontSize: 12, fill: "#6B7280" }}
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB" }}
          />
          {/* Left Y axis: averageScore (1-5) */}
          <YAxis
            yAxisId="left"
            orientation="left"
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            tickLine={false}
            axisLine={false}
            label={{
              value: "Score (1-5)",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: { fontSize: 11, fill: "#6B7280" },
            }}
          />
          {/* Right Y axis: responseRate (0-100%) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            tickLine={false}
            axisLine={false}
            label={{
              value: "Respons",
              angle: 90,
              position: "insideRight",
              offset: 10,
              style: { fontSize: 11, fill: "#6B7280" },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 16, color: "#6B7280" }}
            iconType="square"
          />
          {/* Area fill for responseRate */}
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="responseRate"
            name="Responspercentage"
            stroke="#FFCD00"
            strokeWidth={2}
            strokeDasharray="5 4"
            fill="url(#responseRateGradient)"
            dot={{ fill: "#FFCD00", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#FFCD00" }}
          />
          {/* Line for averageScore */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="averageScore"
            name="Gem. tevredenheid"
            stroke="#1B1B1B"
            strokeWidth={2.5}
            dot={{ fill: "#1B1B1B", r: 5, strokeWidth: 0 }}
            activeDot={{ r: 7, fill: "#1B1B1B" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
