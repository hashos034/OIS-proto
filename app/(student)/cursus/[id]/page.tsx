"use client";

import { useParams } from "next/navigation";
import { getCourse, getSurveysByCourse, docentComments } from "@/data/mock";
import Header from "@/components/Header";
import SurveyItem from "@/components/SurveyItem";
import { MessageSquare } from "lucide-react";

export default function CourseSurveysPage() {
  const params = useParams();
  const courseId = params.id as string;
  const course = getCourse(courseId);
  const surveys = getSurveysByCourse(courseId);
  const comments = docentComments[courseId] || [];

  if (!course) {
    return (
      <div className="flex flex-col h-full">
        <Header title="Cursus niet gevonden" backHref="/dashboard" />
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-sm text-uu-text-secondary">Deze cursus bestaat niet.</p>
        </div>
      </div>
    );
  }

  const completedCount = surveys.filter((s) => s.status === "completed").length;

  return (
    <div className="flex flex-col h-full">
      <Header title={course.name} backHref="/dashboard" />

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4 pb-6 space-y-5">
          {/* Completion summary */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-uu-text">Enquetes</h2>
            <span className="text-xs font-medium text-uu-text-secondary bg-uu-surface px-2.5 py-1 rounded-full">
              {completedCount}/{surveys.length} compleet
            </span>
          </div>

          {/* Survey list */}
          <div className="flex flex-col gap-2.5">
            {surveys.map((survey) => (
              <SurveyItem
                key={survey.id}
                name={survey.name}
                progress={survey.progress}
                status={survey.status}
                href={
                  survey.status === "completed"
                    ? `/cursus/${courseId}`
                    : `/cursus/${courseId}/enquete/${survey.id}/intro`
                }
              />
            ))}
          </div>

          {/* Docent comments */}
          {comments.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-uu-black" />
                <h2 className="text-sm font-semibold text-uu-text">
                  Opmerkingen docent
                </h2>
              </div>
              <div className="flex flex-col gap-2.5">
                {comments.map((comment, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 shadow-sm border border-uu-border"
                  >
                    <p className="text-xs text-uu-text-secondary mb-1.5">
                      {comment.date}
                    </p>
                    <p className="text-sm text-uu-text leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
