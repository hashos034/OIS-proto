"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import {
  getDocentSurvey,
  getDocentCourse,
  getDocentQuestionsBySurvey,
  getMCResponseData,
  getOpenResponseData,
  getYearComparison,
} from "@/data/mock-docent";
import Breadcrumb from "@/components/docent/Breadcrumb";
import ExportButton from "@/components/docent/ExportButton";
import ChartToggle from "@/components/docent/ChartToggle";
import DocentPieChart from "@/components/docent/DocentPieChart";
import DocentBarChart from "@/components/docent/DocentBarChart";
import ResponseTable from "@/components/docent/ResponseTable";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Inline scale mock data (1-10 distribution) ---
const SCALE_MOCK_DATA = [
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 4 },
  { name: "4", value: 5 },
  { name: "5", value: 9 },
  { name: "6", value: 14 },
  { name: "7", value: 22 },
  { name: "8", value: 18 },
  { name: "9", value: 10 },
  { name: "10", value: 4 },
];

const YEAR_COLORS = ["#1B1B1B", "#FFCD00", "#6B7280"];

// --- Custom tooltip for year comparison chart ---
interface YearTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function YearComparisonTooltip({ active, payload, label }: YearTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white border border-uu-border rounded-lg shadow-md px-3 py-2 text-sm">
      <p className="font-semibold text-uu-text mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="text-xs">
          {entry.name}: {entry.value.toFixed(1)}
        </p>
      ))}
    </div>
  );
}

export default function QuestionStatisticsPage() {
  const params = useParams<{ id: string; eid: string; vid: string }>();
  const courseId = params.id;
  const surveyId = params.eid;
  const vidParam = params.vid;

  const [chartView, setChartView] = useState<"pie" | "bar">("bar");

  // --- Resolve data ---
  const survey = getDocentSurvey(surveyId);
  const course = getDocentCourse(courseId);
  const questions = getDocentQuestionsBySurvey(surveyId);

  const currentIndex = questions.findIndex(
    (q) => String(q.id) === vidParam || String(questions.indexOf(q) + 1) === vidParam
  );

  // Support both numeric question id and 1-based position index
  const resolvedIndex =
    currentIndex !== -1
      ? currentIndex
      : parseInt(vidParam, 10) - 1;

  const question = questions[resolvedIndex] ?? null;
  const prevQuestion = resolvedIndex > 0 ? questions[resolvedIndex - 1] : null;
  const nextQuestion =
    resolvedIndex < questions.length - 1
      ? questions[resolvedIndex + 1]
      : null;

  // --- Guard ---
  if (!survey || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-3">
        <p className="text-uu-text-secondary text-sm">
          Enquête of cursus niet gevonden.
        </p>
        <Link
          href={`/docent/cursus/${courseId}`}
          className="text-uu-black text-sm font-medium hover:underline cursor-pointer"
        >
          Terug naar cursus
        </Link>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-3">
        <p className="text-uu-text-secondary text-sm">Vraag niet gevonden.</p>
        <Link
          href={`/docent/cursus/${courseId}/enquete/${surveyId}`}
          className="text-uu-black text-sm font-medium hover:underline cursor-pointer"
        >
          Terug naar enquête
        </Link>
      </div>
    );
  }

  // --- Derived helpers ---
  const questionNumber = resolvedIndex + 1;
  const mcData = getMCResponseData(question.id);
  const openData = getOpenResponseData(question.id);
  const yearData = getYearComparison(question.id);

  // Navigation href builder
  function questionHref(q: typeof questions[0]) {
    return `/docent/cursus/${courseId}/enquete/${surveyId}/vraag/${q.id}`;
  }

  // Pie/bar chart data for MC
  const mcChartData = mcData
    ? mcData.responses.map((r) => ({ name: r.option, value: r.count }))
    : [];

  // Year comparison chart data — one row per "option position" with a bar per year
  // Recharts grouped bar: data rows are X-axis ticks, each year is a <Bar>
  const yearChartData = yearData
    ? yearData.years.map((y) => ({
        year: y.year,
        "Gem. score": y.averageScore,
      }))
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/docent/dashboard" },
          { label: course.name, href: `/docent/cursus/${courseId}` },
          {
            label: survey.name,
            href: `/docent/cursus/${courseId}/enquete/${surveyId}`,
          },
          { label: `Vraag ${questionNumber}` },
        ]}
      />

      {/* ── Top bar: navigation + export ─────────────────────────── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Prev / Next question navigation */}
        <div className="flex items-center gap-2">
          {prevQuestion ? (
            <Link
              href={questionHref(prevQuestion)}
              className="
                inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2
                border border-uu-border rounded-lg
                text-sm font-medium text-uu-text
                bg-white hover:bg-uu-surface
                transition-colors duration-150
                cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-1
              "
              aria-label="Vorige vraag"
            >
              <ChevronLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Vorige vraag</span>
            </Link>
          ) : (
            <span
              className="
                inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2
                border border-uu-border rounded-lg
                text-sm font-medium text-uu-text-secondary
                bg-uu-surface opacity-50
                select-none
              "
              aria-disabled="true"
            >
              <ChevronLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Vorige vraag</span>
            </span>
          )}

          <span className="text-sm text-uu-text-secondary select-none">
            {questionNumber} / {questions.length}
          </span>

          {nextQuestion ? (
            <Link
              href={questionHref(nextQuestion)}
              className="
                inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2
                border border-uu-border rounded-lg
                text-sm font-medium text-uu-text
                bg-white hover:bg-uu-surface
                transition-colors duration-150
                cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-1
              "
              aria-label="Volgende vraag"
            >
              <span>Volgende vraag</span>
              <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Link>
          ) : (
            <span
              className="
                inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2
                border border-uu-border rounded-lg
                text-sm font-medium text-uu-text-secondary
                bg-uu-surface opacity-50
                select-none
              "
              aria-disabled="true"
            >
              <span>Volgende vraag</span>
              <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </span>
          )}
        </div>

        {/* Export */}
        <ExportButton label="Exporteer vraag" />
      </div>

      {/* ── Question card ─────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-start gap-3">
          <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-uu-black text-white text-sm font-bold select-none">
            {questionNumber}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-medium text-uu-text leading-snug">
              {question.text}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-uu-surface border border-uu-border text-xs font-medium text-uu-text-secondary capitalize">
                {question.type === "multiple-choice"
                  ? "Meerkeuze"
                  : question.type === "open"
                  ? "Open vraag"
                  : "Schaalvraag"}
              </span>
              {!question.required && (
                <span className="text-xs text-uu-text-secondary">Optioneel</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          MULTIPLE CHOICE
      ════════════════════════════════════════════════════════════ */}
      {question.type === "multiple-choice" && mcData && (
        <>
          {/* Response summary + chart toggle */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-base font-semibold text-uu-text">
                  Antwoordverdeling
                </h2>
                <p className="text-sm text-uu-text-secondary mt-0.5">
                  <span className="font-medium text-uu-text">
                    {mcData.totalResponses}
                  </span>{" "}
                  van{" "}
                  <span className="font-medium text-uu-text">
                    {survey.totalStudents}
                  </span>{" "}
                  studenten hebben gereageerd
                </p>
              </div>
              <ChartToggle activeView={chartView} onToggle={setChartView} />
            </div>

            {/* Chart */}
            {chartView === "pie" ? (
              <DocentPieChart data={mcChartData} />
            ) : (
              <DocentBarChart data={mcChartData} />
            )}

            {/* Distribution table */}
            <div>
              <h3 className="text-sm font-semibold text-uu-text mb-3">
                Detailoverzicht
              </h3>
              <div className="rounded-lg border border-uu-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-uu-surface border-b border-uu-border">
                      <th className="text-left px-4 py-2.5 font-semibold text-uu-text">
                        Antwoord
                      </th>
                      <th className="text-right px-4 py-2.5 font-semibold text-uu-text">
                        Aantal
                      </th>
                      <th className="text-right px-4 py-2.5 font-semibold text-uu-text">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-uu-border">
                    {mcData.responses.map((row, i) => {
                      const pct =
                        mcData.totalResponses > 0
                          ? ((row.count / mcData.totalResponses) * 100).toFixed(
                              1
                            )
                          : "0.0";
                      return (
                        <tr
                          key={i}
                          className={
                            i % 2 === 0 ? "bg-white" : "bg-uu-surface"
                          }
                        >
                          <td className="px-4 py-2.5 text-uu-text">
                            {row.option}
                          </td>
                          <td className="px-4 py-2.5 text-right font-medium text-uu-text">
                            {row.count}
                          </td>
                          <td className="px-4 py-2.5 text-right text-uu-text-secondary">
                            {pct}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-uu-surface border-t border-uu-border">
                      <td className="px-4 py-2.5 font-semibold text-uu-text">
                        Totaal
                      </td>
                      <td className="px-4 py-2.5 text-right font-semibold text-uu-text">
                        {mcData.totalResponses}
                      </td>
                      <td className="px-4 py-2.5 text-right font-semibold text-uu-text">
                        100%
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Year comparison */}
          {yearData && yearData.years.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <div>
                <h2 className="text-base font-semibold text-uu-text">
                  Vergelijking met voorgaande jaren
                </h2>
                <p className="text-sm text-uu-text-secondary mt-0.5">
                  Gemiddelde score over de jaren (schaal 1–5)
                </p>
              </div>

              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={yearChartData}
                  margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={{ stroke: "#E5E7EB" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 5]}
                    width={32}
                  />
                  <Tooltip content={<YearComparisonTooltip />} cursor={{ fill: "#F5F5F5" }} />
                  <Bar
                    dataKey="Gem. score"
                    fill={YEAR_COLORS[0]}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={64}
                  />
                </BarChart>
              </ResponsiveContainer>

              {/* Year stats table */}
              <div className="rounded-lg border border-uu-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-uu-surface border-b border-uu-border">
                      <th className="text-left px-4 py-2.5 font-semibold text-uu-text">
                        Jaar
                      </th>
                      <th className="text-right px-4 py-2.5 font-semibold text-uu-text">
                        Gem. score
                      </th>
                      <th className="text-right px-4 py-2.5 font-semibold text-uu-text">
                        Reacties
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-uu-border">
                    {yearData.years.map((y, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-white" : "bg-uu-surface"}
                      >
                        <td className="px-4 py-2.5 text-uu-text">{y.year}</td>
                        <td className="px-4 py-2.5 text-right font-medium text-uu-text">
                          {y.averageScore.toFixed(1)}
                        </td>
                        <td className="px-4 py-2.5 text-right text-uu-text-secondary">
                          {y.responseCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════════════════
          OPEN QUESTION
      ════════════════════════════════════════════════════════════ */}
      {question.type === "open" && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-base font-semibold text-uu-text">
              Tekstuele antwoorden
            </h2>
            {openData && (
              <p className="text-sm text-uu-text-secondary mt-0.5">
                <span className="font-medium text-uu-text">
                  {openData.totalResponses}
                </span>{" "}
                van{" "}
                <span className="font-medium text-uu-text">
                  {survey.totalStudents}
                </span>{" "}
                studenten hebben gereageerd
              </p>
            )}
          </div>
          <ResponseTable responses={openData?.responses ?? []} />
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          SCALE QUESTION
      ════════════════════════════════════════════════════════════ */}
      {question.type === "scale" && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-base font-semibold text-uu-text">
              Schaalverdeling
            </h2>
            <p className="text-sm text-uu-text-secondary mt-0.5">
              Antwoorden op een schaal van 1 tot 10
            </p>
          </div>

          <DocentBarChart
            data={SCALE_MOCK_DATA}
            color="#1B1B1B"
          />

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-uu-border">
            {[
              { label: "Gemiddelde", value: "6.7" },
              { label: "Mediaan", value: "7" },
              { label: "Reacties", value: "89" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-uu-text">{stat.value}</p>
                <p className="text-xs text-uu-text-secondary mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Bottom: back link ─────────────────────────────────────── */}
      <div className="pb-8">
        <Link
          href={`/docent/cursus/${courseId}/enquete/${surveyId}`}
          className="
            inline-flex items-center gap-2
            text-sm font-medium text-uu-text-secondary
            hover:text-uu-text
            transition-colors duration-150
            cursor-pointer
            focus:outline-none focus:underline
          "
        >
          <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Terug naar enquête</span>
        </Link>
      </div>
    </div>
  );
}
