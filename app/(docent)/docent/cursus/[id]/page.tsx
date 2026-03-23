"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  ClipboardList,
  FileText,
  Eye,
  QrCode,
  MessageSquare,
  Send,
  BarChart3,
} from "lucide-react";
import Breadcrumb from "@/components/docent/Breadcrumb";
import StatCard from "@/components/docent/StatCard";
import ProgressBar from "@/components/ProgressBar";
import QRCodeModal from "@/components/docent/QRCodeModal";
import ExportButton from "@/components/docent/ExportButton";
import {
  getDocentCourse,
  getDocentSurveysByCourse,
  DocentSurvey,
} from "@/data/mock-docent";

// ── Status badge ──────────────────────────────────────────────────
function SurveyStatusBadge({ status }: { status: DocentSurvey["status"] }) {
  const map: Record<
    DocentSurvey["status"],
    { label: string; classes: string }
  > = {
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
      classes: "bg-uu-yellow/20 text-uu-warning",
    },
  };

  const { label, classes } = map[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}
    >
      {label}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function CourseDetailPage() {
  const params = useParams<{ id: string }>();
  const course = getDocentCourse(params.id);
  if (!course) notFound();

  const surveys = getDocentSurveysByCourse(course.id);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSurvey, setActiveSurvey] = useState<DocentSurvey | null>(null);

  // Remarks state
  const [remarks, setRemarks] = useState("");
  const [remarksSaved, setRemarksSaved] = useState(false);

  function openModal(survey: DocentSurvey) {
    setActiveSurvey(survey);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setActiveSurvey(null);
  }

  function handleSaveRemarks() {
    setRemarksSaved(true);
    setTimeout(() => setRemarksSaved(false), 2500);
  }

  // Derived stats
  const eligibleSurveys = surveys.filter((s) => s.status !== "draft");
  const totalResponses = eligibleSurveys.reduce(
    (sum, s) => sum + s.responseCount,
    0
  );
  const totalPossible = eligibleSurveys.length * course.studentCount;
  const responseRate =
    totalPossible > 0
      ? Math.round((totalResponses / totalPossible) * 100)
      : 0;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/docent/dashboard" },
            { label: course.name },
          ]}
        />

        {/* Course header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-uu-text">{course.name}</h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-uu-surface border border-uu-border text-xs font-mono text-uu-text-secondary">
                {course.code}
              </span>
            </div>
            <p className="text-sm text-uu-text-secondary mt-1">
              {course.period} · {course.year} · {course.studentCount} studenten
            </p>
          </div>
          <ExportButton label="Exporteer data" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Totaal reacties"
            value={totalResponses}
            subtitle="Gepubliceerde enquêtes"
            icon={<Users className="w-5 h-5" aria-hidden="true" />}
          />
          <StatCard
            title="Responspercentage"
            value={`${responseRate}%`}
            subtitle="Gemiddeld over enquêtes"
            icon={<TrendingUp className="w-5 h-5" aria-hidden="true" />}
            trend={responseRate >= 70 ? "up" : "neutral"}
          />
          <StatCard
            title="Enquêtes"
            value={surveys.length}
            subtitle={`${eligibleSurveys.length} gepubliceerd / gesloten`}
            icon={<ClipboardList className="w-5 h-5" aria-hidden="true" />}
          />
        </div>

        {/* Surveys section */}
        <div>
          <h2 className="text-lg font-semibold text-uu-text mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-uu-black" aria-hidden="true" />
            Enquêtes
          </h2>

          <div className="space-y-3">
            {surveys.length === 0 && (
              <div className="bg-white rounded-xl p-6 text-center text-uu-text-secondary text-sm">
                Nog geen enquêtes aangemaakt voor dit vak.
              </div>
            )}

            {surveys.map((survey) => (
              <div
                key={survey.id}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Left: name + date */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-uu-text text-sm">
                        {survey.name}
                      </h3>
                      <SurveyStatusBadge status={survey.status} />
                    </div>
                    <p className="text-xs text-uu-text-secondary mt-0.5">
                      {survey.status === "draft"
                        ? "Concept — nog niet gepubliceerd"
                        : survey.publishedAt
                        ? `Gepubliceerd op ${new Date(
                            survey.publishedAt
                          ).toLocaleDateString("nl-NL", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}`
                        : ""}
                      {survey.closedAt
                        ? ` · Gesloten op ${new Date(
                            survey.closedAt
                          ).toLocaleDateString("nl-NL", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}`
                        : ""}
                    </p>
                  </div>

                  {/* Center: response progress */}
                  <div className="sm:w-52 shrink-0">
                    <div className="flex items-center justify-between text-xs text-uu-text-secondary mb-1.5">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" aria-hidden="true" />
                        {survey.responseCount}/{survey.totalStudents} studenten
                      </span>
                      <span>
                        {survey.totalStudents > 0
                          ? Math.round(
                              (survey.responseCount / survey.totalStudents) *
                                100
                            )
                          : 0}
                        %
                      </span>
                    </div>
                    <ProgressBar
                      current={survey.responseCount}
                      total={survey.totalStudents}
                      size="sm"
                    />
                  </div>

                  {/* Right: action buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Bekijk */}
                    <Link
                      href={`/docent/cursus/${course.id}/enquete/${survey.id}`}
                      className="inline-flex items-center gap-1.5 px-3 h-9 rounded-lg text-xs font-medium bg-uu-surface border border-uu-border text-uu-text hover:bg-uu-surface transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow"
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      Bekijk
                    </Link>

                    {/* Code / QR */}
                    {survey.status !== "draft" && (
                      <button
                        onClick={() => openModal(survey)}
                        className="inline-flex items-center gap-1.5 px-3 h-9 rounded-lg text-xs font-medium bg-uu-surface border border-uu-border text-uu-text hover:bg-uu-surface transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow"
                        aria-label={`Toegangscode voor ${survey.name}`}
                      >
                        <QrCode className="w-3.5 h-3.5" aria-hidden="true" />
                        Code
                      </button>
                    )}

                    {/* Statistieken */}
                    <Link
                      href={`/docent/cursus/${course.id}/statistieken`}
                      className="inline-flex items-center gap-1.5 px-3 h-9 rounded-lg text-xs font-medium bg-uu-black text-white hover:bg-uu-black/90 transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-1"
                    >
                      <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
                      Statistieken
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Opmerkingen section */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-uu-text mb-1 flex items-center gap-2">
            <MessageSquare
              className="w-5 h-5 text-uu-black"
              aria-hidden="true"
            />
            Opmerkingen voor studenten
          </h2>
          <p className="text-sm text-uu-text-secondary mb-4">
            Schrijf een opmerking die zichtbaar is voor studenten van dit vak.
          </p>

          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={4}
            placeholder="Typ hier een opmerking voor je studenten…"
            className="w-full rounded-lg border border-uu-border bg-uu-surface px-4 py-3 text-sm text-uu-text placeholder:text-uu-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:border-transparent transition-colors duration-150"
            aria-label="Opmerking voor studenten"
          />

          <div className="flex items-center justify-between mt-3">
            <span
              className={`text-xs transition-opacity duration-300 ${
                remarksSaved
                  ? "text-uu-success opacity-100"
                  : "opacity-0"
              }`}
              aria-live="polite"
            >
              Opmerking opgeslagen!
            </span>
            <button
              onClick={handleSaveRemarks}
              disabled={!remarks.trim()}
              className="inline-flex items-center gap-2 px-4 h-10 rounded-lg text-sm font-medium bg-uu-black text-white hover:bg-uu-black/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-2"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              Opmerking opslaan
            </button>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {activeSurvey && (
        <QRCodeModal
          isOpen={modalOpen}
          onClose={closeModal}
          surveyName={activeSurvey.name}
          accessCode={activeSurvey.accessCode}
        />
      )}
    </>
  );
}
