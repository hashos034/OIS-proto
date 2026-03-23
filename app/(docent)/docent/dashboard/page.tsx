import Link from "next/link";
import {
  Users,
  TrendingUp,
  ClipboardList,
  GraduationCap,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import Breadcrumb from "@/components/docent/Breadcrumb";
import StatCard from "@/components/docent/StatCard";
import ProgressBar from "@/components/ProgressBar";
import {
  docentCourses,
  docentSurveys,
  getDocentSurveysByCourse,
} from "@/data/mock-docent";

// ── Derived stats ────────────────────────────────────────────────
const totalResponses = docentSurveys.reduce((sum, s) => sum + s.responseCount, 0);
const totalStudentsAll = docentCourses.reduce((sum, c) => sum + c.studentCount, 0);
const activeSurveys = docentSurveys.filter((s) => s.status === "published").length;

// Average response rate across all surveys that have been published/closed
const ratedSurveys = docentSurveys.filter(
  (s) => s.status !== "draft" && s.totalStudents > 0
);
const avgResponseRate =
  ratedSurveys.length > 0
    ? Math.round(
        ratedSurveys.reduce(
          (sum, s) => sum + (s.responseCount / s.totalStudents) * 100,
          0
        ) / ratedSurveys.length
      )
    : 0;

// ── Status badge helper ───────────────────────────────────────────
function StatusBadge({ status }: { status: "current" | "completed" }) {
  if (status === "current") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-uu-success/20 text-uu-success">
        Actief
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-uu-surface text-uu-text-secondary">
      Afgerond
    </span>
  );
}

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Dashboard" }]} />

      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-uu-text">Dashboard</h1>
        <p className="text-sm text-uu-text-secondary mt-1">
          Overzicht van al je cursussen en evaluaties
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Reacties deze periode"
          value={totalResponses}
          subtitle="Over alle enquêtes"
          icon={<Users className="w-5 h-5" aria-hidden="true" />}
          trend="up"
        />
        <StatCard
          title="Gem. responspercentage"
          value={`${avgResponseRate}%`}
          subtitle="Van gepubliceerde enquêtes"
          icon={<TrendingUp className="w-5 h-5" aria-hidden="true" />}
          trend="up"
        />
        <StatCard
          title="Actieve enquêtes"
          value={activeSurveys}
          subtitle="Nu open voor studenten"
          icon={<ClipboardList className="w-5 h-5" aria-hidden="true" />}
        />
        <StatCard
          title="Studenten totaal"
          value={totalStudentsAll}
          subtitle="Over alle vakken"
          icon={<GraduationCap className="w-5 h-5" aria-hidden="true" />}
        />
      </div>

      {/* Course section */}
      <div>
        <h2 className="text-lg font-semibold text-uu-text mb-4">
          Mijn cursussen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {docentCourses.map((course) => {
            const surveys = getDocentSurveysByCourse(course.id);
            const completedSurveys = surveys.filter(
              (s) => s.status === "closed"
            ).length;
            const totalSurveys = surveys.length;

            // Overall response completion: total responses / (totalStudents * number of published+closed surveys)
            const eligibleSurveys = surveys.filter(
              (s) => s.status !== "draft"
            );
            const totalPossibleResponses =
              eligibleSurveys.length * course.studentCount;
            const totalActualResponses = eligibleSurveys.reduce(
              (sum, s) => sum + s.responseCount,
              0
            );

            return (
              <Link
                key={course.id}
                href={`/docent/cursus/${course.id}`}
                className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow"
              >
                {/* Course header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-uu-text text-sm leading-snug group-hover:text-uu-black transition-colors duration-150">
                      {course.name}
                    </h3>
                    <span className="text-xs text-uu-text-secondary mt-0.5 block">
                      {course.code}
                    </span>
                  </div>
                  <StatusBadge status={course.status} />
                </div>

                {/* Period info */}
                <p className="text-xs text-uu-text-secondary mb-3">
                  {course.period} · {course.year}
                </p>

                {/* Survey completion */}
                <div className="flex items-center justify-between text-xs text-uu-text-secondary mb-2">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
                    {completedSurveys}/{totalSurveys} enquêtes voltooid
                  </span>
                  <span>
                    {totalPossibleResponses > 0
                      ? Math.round(
                          (totalActualResponses / totalPossibleResponses) * 100
                        )
                      : 0}
                    %
                  </span>
                </div>

                <ProgressBar
                  current={totalActualResponses}
                  total={totalPossibleResponses || 1}
                  size="sm"
                />

                {/* CTA */}
                <div className="flex items-center justify-end mt-4">
                  <span className="text-xs font-medium text-uu-black flex items-center gap-1 group-hover:gap-2 transition-all duration-150">
                    Bekijk cursus
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
