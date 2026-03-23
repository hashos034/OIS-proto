"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getCourse, getSurvey, getQuestionsBySurvey } from "@/data/mock";
import Header from "@/components/Header";
import { ClipboardList } from "lucide-react";

export default function SurveyIntroPage() {
  const params = useParams();
  const courseId = params.id as string;
  const surveyId = params.eid as string;
  const course = getCourse(courseId);
  const survey = getSurvey(surveyId);
  const questions = getQuestionsBySurvey(surveyId);

  if (!course || !survey) {
    return (
      <div className="flex flex-col h-full">
        <Header title="Niet gevonden" backHref={`/cursus/${courseId}`} />
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-sm text-uu-text-secondary">Enquete niet gevonden.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header title={course.name} backHref={`/cursus/${courseId}`} />

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-8 pb-6 flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-uu-black/10 flex items-center justify-center mb-5">
            <ClipboardList className="w-8 h-8 text-uu-black" />
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold text-uu-text mb-1">
            {survey.name}
          </h1>
          <p className="text-sm text-uu-text-secondary mb-6">
            {course.name}
          </p>

          {/* Description */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-left w-full mb-8">
            <p className="text-sm text-uu-text leading-relaxed mb-3">
              Welkom bij deze evaluatie! Je feedback helpt ons het onderwijs te verbeteren.
            </p>
            <ul className="text-sm text-uu-text-secondary space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-uu-black mt-1.5 flex-shrink-0" />
                <span>{questions.length} vragen (meerkeuze en open)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-uu-black mt-1.5 flex-shrink-0" />
                <span>Duurt ongeveer 5 minuten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-uu-black mt-1.5 flex-shrink-0" />
                <span>Je antwoorden zijn anoniem</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <Link
            href={`/cursus/${courseId}/enquete/${surveyId}/vraag/1`}
            className="w-full flex items-center justify-center h-12 bg-uu-black text-white font-semibold rounded-xl cursor-pointer transition-all duration-200 hover:bg-uu-black/90 active:scale-[0.98] text-sm"
          >
            Starten
          </Link>

          <Link
            href={`/cursus/${courseId}`}
            className="mt-3 text-sm text-uu-text cursor-pointer transition-colors duration-200 hover:text-uu-text-secondary py-2"
          >
            Annuleren
          </Link>
        </div>
      </div>
    </div>
  );
}
