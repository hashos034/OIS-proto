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
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

import Breadcrumb from "@/components/docent/Breadcrumb";
import StatCard from "@/components/docent/StatCard";
import ExportButton from "@/components/docent/ExportButton";
import DocentBarChart from "@/components/docent/DocentBarChart";
import ComparisonChart from "@/components/docent/ComparisonChart";
import ProgressionChart from "@/components/docent/ProgressionChart";

import {
  getDocentCourse,
  getDocentSurveysByCourse,
  getDocentQuestionsBySurvey,
  getMCResponseData,
  getYearComparison,
  getProgressionData,
  DocentSurvey,
} from "@/data/mock-docent";

// ── Status badge ──────────────────────────────────────────────────
function SurveyStatusBadge({ status }: { status: DocentSurvey["status"] }) {
  const map: Record<DocentSurvey["status"], { label: string; classes: string }> = {
    closed: {
      label: "Gesloten",
      classes: "bg-uu-surface text-uu-text-secondary",
    },
    published: {
      label: "Gepubliceerd",
      classes: "bg-uu-success/20 text-uu-success",
    },
    draft: {
      label: "Concept",
      classes: "bg-uu-yellow/10 text-uu-warning",
    },
  };
  const { label, classes } = map[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${classes}`}>
      {label}
    </span>
  );
}

// ── Small inline response bar for survey cards ─────────────────────
function ResponseBar({ count, total }: { count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-uu-text-secondary mb-1">
        <span>{count} van {total} studenten</span>
        <span className="font-medium text-uu-text">{pct}%</span>
      </div>
      <div className="h-1.5 bg-uu-surface rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-uu-black transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

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

  // MC questions for "Resultaten per vraag" section — from first closed survey
  const mcQuestions = firstSurveyQuestions.filter((q) => q.type === "multiple-choice");

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

      {/* ── Section 3: Results per survey ── */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-uu-text">
            Resultaten per enquête
          </h2>
          <p className="text-sm text-uu-text-secondary mt-0.5">
            {surveys.length} enquête{surveys.length !== 1 ? "s" : ""} voor deze cursus
          </p>
        </div>
        {surveys.length === 0 ? (
          <p className="text-sm text-uu-text-secondary">
            Er zijn nog geen enquêtes aangemaakt voor deze cursus.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {surveys.map((survey) => {
              const hasSurveyData = survey.status === "closed" || survey.status === "published";
              return (
                <Link
                  key={survey.id}
                  href={`/docent/cursus/${courseId}/enquete/${survey.id}`}
                  className="group block border border-uu-border rounded-lg p-4 hover:border-uu-black hover:shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <BarChart3
                        className="w-4 h-4 text-uu-black shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-semibold text-uu-text truncate group-hover:text-uu-black transition-colors duration-150">
                        {survey.name}
                      </span>
                    </div>
                    <SurveyStatusBadge status={survey.status} />
                  </div>

                  {hasSurveyData ? (
                    <ResponseBar count={survey.responseCount} total={survey.totalStudents} />
                  ) : (
                    <p className="text-xs text-uu-text-secondary mt-2 italic">
                      Nog niet gepubliceerd
                    </p>
                  )}

                  <div className="flex items-center justify-end mt-3 text-xs text-uu-black font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <span>Bekijk resultaten</span>
                    <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Section 4: Results per question ── */}
      <CollapsibleSection
        title="Resultaten per vraag"
        defaultOpen={true}
      >
        {mcQuestions.length === 0 ? (
          <p className="text-sm text-uu-text-secondary">
            Geen meerkeuzevragen gevonden voor de eerste gesloten enquête.
          </p>
        ) : (
          <div className="space-y-8">
            {mcQuestions.map((question) => {
              const mcData = getMCResponseData(question.id);
              if (!mcData) return null;

              const chartData = mcData.responses.map((r) => ({
                name: r.option,
                value: r.count,
              }));

              return (
                <div key={question.id} className="border-t border-uu-border pt-6 first:border-t-0 first:pt-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="text-sm font-medium text-uu-text leading-snug">
                      {question.text}
                    </p>
                    {firstClosedSurvey && (
                      <Link
                        href={`/docent/cursus/${courseId}/enquete/${firstClosedSurvey.id}/vraag/${question.id}`}
                        className="shrink-0 text-xs text-uu-black font-medium hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow rounded transition-colors duration-150 flex items-center gap-1"
                      >
                        Details
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                  <div className="text-xs text-uu-text-secondary mb-3">
                    {mcData.totalResponses} reacties
                  </div>
                  <div style={{ height: 200 }}>
                    <DocentBarChart data={chartData} />
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
