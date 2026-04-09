"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

import Breadcrumb from "@/components/docent/Breadcrumb";
import StatCard from "@/components/docent/StatCard";
import ExportButton from "@/components/docent/ExportButton";
import DocentBarChart from "@/components/docent/DocentBarChart";
import DocentPieChart from "@/components/docent/DocentPieChart";
import ChartToggle from "@/components/docent/ChartToggle";
import ComparisonChart from "@/components/docent/ComparisonChart";
import ProgressionChart from "@/components/docent/ProgressionChart";

import {
  getDocentCourse,
  getDocentSurveysByCourse,
  getDocentQuestionsBySurvey,
  getMCResponseData,
  getYearComparison,
  getProgressionData,
} from "@/data/mock-docent";

// ── Collapsible section ────────────────────────────────────────────
function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-inset rounded-xl"
        aria-expanded={open}
      >
        <h2 className="text-base font-semibold text-uu-text">{title}</h2>
        {open ? (
          <ChevronUp className="w-5 h-5 text-uu-text-secondary shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-5 h-5 text-uu-text-secondary shrink-0" aria-hidden="true" />
        )}
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────
export default function StatistiekenPage() {
  const params = useParams();
  const courseId = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";

  const course = getDocentCourse(courseId);
  const surveys = getDocentSurveysByCourse(courseId);
  const progressionData = getProgressionData(courseId);

  // Derive summary stats
  const totalResponses = surveys.reduce((sum, s) => sum + s.responseCount, 0);
  const closedSurveys = surveys.filter((s) => s.status === "closed");
  const completedCount = closedSurveys.length;

  // Average response rate across surveys that have been published
  const publishedSurveys = surveys.filter((s) => s.status !== "draft");
  const avgResponseRate =
    publishedSurveys.length > 0
      ? Math.round(
          publishedSurveys.reduce(
            (sum, s) => sum + (s.totalStudents > 0 ? s.responseCount / s.totalStudents : 0),
            0
          ) / publishedSurveys.length * 100
        )
      : 0;

  // Average satisfaction from progression data
  const avgSatisfaction =
    progressionData && progressionData.dataPoints.length > 0
      ? (
          progressionData.dataPoints.reduce((sum, d) => sum + d.averageScore, 0) /
          progressionData.dataPoints.length
        ).toFixed(1)
      : "—";

  // Year comparison: use first MC question in first closed survey
  const firstClosedSurvey = closedSurveys[0];
  const firstSurveyQuestions = firstClosedSurvey
    ? getDocentQuestionsBySurvey(firstClosedSurvey.id)
    : [];
  const firstMCQuestion = firstSurveyQuestions.find((q) => q.type === "multiple-choice");
  const yearComparison = firstMCQuestion ? getYearComparison(firstMCQuestion.id) : undefined;

  // ── Survey selector state ──────────────────────────────────────────
  const surveysWithData = surveys.filter((s) => s.status === "closed" || s.status === "published");
  const [selectedSurveyId, setSelectedSurveyId] = useState<string>(firstClosedSurvey?.id ?? "");

  // ── Chart type toggle ─────────────────────────────────────────────
  const [chartView, setChartView] = useState<"pie" | "bar">("bar");

  const selectedSurveyQuestions = selectedSurveyId
    ? getDocentQuestionsBySurvey(selectedSurveyId)
    : [];
  const mcQuestions = selectedSurveyQuestions.filter((q) => q.type === "multiple-choice");
  const selectedSurvey = surveys.find((s) => s.id === selectedSurveyId);

  if (!course) {
    return (
      <div className="p-8 text-center text-uu-text-secondary">
        Cursus niet gevonden.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Page header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/docent/dashboard" },
              { label: course.name, href: `/docent/cursus/${courseId}` },
              { label: "Statistieken" },
            ]}
          />
          <h1 className="text-2xl font-bold text-uu-text leading-tight">
            Statistieken &mdash; {course.name}
          </h1>
          <p className="text-sm text-uu-text-secondary">
            Overzicht van alle evaluatieresultaten
          </p>
        </div>
        <div className="shrink-0">
          <ExportButton label="Exporteer statistieken" />
        </div>
      </div>

      {/* ── Summary StatCards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Totaal reacties"
          value={totalResponses}
          subtitle="Alle enquêtes samen"
          icon={<Users className="w-5 h-5" aria-hidden="true" />}
          trend="up"
        />
        <StatCard
          title="Gem. responspercentage"
          value={`${avgResponseRate}%`}
          subtitle="Gepubliceerde enquêtes"
          icon={<TrendingUp className="w-5 h-5" aria-hidden="true" />}
          trend={avgResponseRate >= 60 ? "up" : "neutral"}
        />
        <StatCard
          title="Afgeronde enquêtes"
          value={completedCount}
          subtitle={`van ${surveys.length} totaal`}
          icon={<CheckCircle className="w-5 h-5" aria-hidden="true" />}
        />
        <StatCard
          title="Gem. tevredenheid"
          value={avgSatisfaction}
          subtitle="Schaal 1–5"
          icon={<Star className="w-5 h-5" aria-hidden="true" />}
          trend={
            typeof avgSatisfaction === "string" && parseFloat(avgSatisfaction) >= 3.5
              ? "up"
              : "neutral"
          }
        />
      </div>

      {/* ── Section 1: Progression over time ── */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-uu-text">
            Studentervaring over tijd
          </h2>
          <p className="text-sm text-uu-text-secondary mt-0.5">
            Tevredenheid en responspercentage per evaluatiemoment
          </p>
        </div>
        {progressionData && progressionData.dataPoints.length > 0 ? (
          <>
            <ProgressionChart data={progressionData.dataPoints} />
            <p className="text-xs text-uu-text-secondary mt-4 leading-relaxed">
              Deze grafiek toont de gemiddelde tevredenheid en responspercentage
              over de verschillende evaluatiemomenten.
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center h-48 text-uu-text-secondary text-sm">
            Nog geen data beschikbaar.
          </div>
        )}
      </div>

      {/* ── Section 2: Year comparison ── */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-uu-text">
            Vergelijking met voorgaande jaren
          </h2>
          <p className="text-sm text-uu-text-secondary mt-0.5">
            Scores en responsaantallen over meerdere academische jaren
          </p>
        </div>
        {yearComparison && yearComparison.years.length > 0 ? (
          <>
            <ComparisonChart
              data={yearComparison.years}
              title={firstMCQuestion ? firstMCQuestion.text : undefined}
            />
            <p className="text-xs text-uu-text-secondary mt-4 leading-relaxed">
              Vergelijking van gemiddelde scores en aantal reacties over de afgelopen jaren.
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center h-48 text-uu-text-secondary text-sm">
            Geen jaarlijkse vergelijkingsdata beschikbaar.
          </div>
        )}
      </div>

      {/* ── Section 3: Results per question ── */}
      <CollapsibleSection
        title="Resultaten per vraag"
        defaultOpen={true}
      >
        {/* Controls row: survey selector + chart toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          {/* Survey selector pills */}
          {surveysWithData.length > 1 && (
            <div
              className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none"
              role="group"
              aria-label="Selecteer enquête"
            >
              {surveysWithData.map((s) => {
                const isActive = s.id === selectedSurveyId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSurveyId(s.id)}
                    className={[
                      "shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150",
                      "focus:outline-none focus:ring-2 focus:ring-uu-yellow cursor-pointer",
                      "min-h-[36px]",
                      isActive
                        ? "bg-uu-black text-white"
                        : "bg-uu-surface text-uu-text hover:bg-uu-border",
                    ].join(" ")}
                    aria-pressed={isActive}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Chart type toggle */}
          <ChartToggle activeView={chartView} onToggle={setChartView} />
        </div>

        {/* Questions for selected survey */}
        {mcQuestions.length === 0 ? (
          <p className="text-sm text-uu-text-secondary">
            {selectedSurveyId
              ? "Geen meerkeuzevragen gevonden voor deze enquête."
              : "Selecteer een enquête om de resultaten te bekijken."}
          </p>
        ) : (
          <div className="space-y-12">
            {mcQuestions.map((question) => {
              const mcData = getMCResponseData(question.id);
              if (!mcData) return null;

              const chartData = mcData.responses.map((r) => ({
                name: r.option,
                value: r.count,
              }));

              return (
                <div key={question.id} className="border-t border-uu-border pt-8 first:border-t-0 first:pt-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="text-sm font-medium text-uu-text leading-snug">
                      {question.text}
                    </p>
                    {selectedSurvey && (
                      <Link
                        href={`/docent/cursus/${courseId}/enquete/${selectedSurvey.id}/vraag/${question.id}`}
                        className="shrink-0 text-xs text-uu-black font-medium hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow rounded transition-colors duration-150 flex items-center gap-1"
                      >
                        Details
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                  <div className="text-xs text-uu-text-secondary mb-4">
                    {mcData.totalResponses} reacties
                  </div>
                  <div style={{ height: 340 }}>
                    {chartView === "bar" ? (
                      <DocentBarChart data={chartData} />
                    ) : (
                      <DocentPieChart data={chartData} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CollapsibleSection>
    </div>
  );
}
