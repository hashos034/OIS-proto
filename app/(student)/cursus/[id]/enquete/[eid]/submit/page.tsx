"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getCourse, getSurvey } from "@/data/mock";
import Header from "@/components/Header";
import { CheckCircle, Send } from "lucide-react";

export default function SubmitPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const surveyId = params.eid as string;
  const course = getCourse(courseId);
  const survey = getSurvey(surveyId);
  const [submitted, setSubmitted] = useState(false);

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

  const basePath = `/cursus/${courseId}/enquete/${surveyId}`;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          {/* Animated checkmark */}
          <div className="w-20 h-20 rounded-full bg-uu-success/10 flex items-center justify-center mb-6 animate-[scaleIn_0.4s_ease-out]">
            <CheckCircle className="w-10 h-10 text-uu-success animate-[fadeIn_0.3s_ease-out_0.2s_both]" />
          </div>

          <h1 className="text-xl font-bold text-uu-text mb-2 animate-[fadeIn_0.3s_ease-out_0.3s_both]">
            Bedankt!
          </h1>
          <p className="text-sm text-uu-text-secondary leading-relaxed animate-[fadeIn_0.3s_ease-out_0.4s_both]">
            Je evaluatie voor {survey.name} is succesvol ingeleverd. Je feedback helpt ons het onderwijs te verbeteren.
          </p>

          <p className="text-xs text-uu-text-secondary mt-6 animate-[fadeIn_0.3s_ease-out_0.5s_both]">
            Je wordt automatisch doorgestuurd...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header title="Inleveren" backHref={`${basePath}/overzicht`} />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-uu-black/10 flex items-center justify-center mb-5">
          <Send className="w-8 h-8 text-uu-black" />
        </div>

        <h1 className="text-xl font-bold text-uu-text mb-2">
          Weet je het zeker?
        </h1>
        <p className="text-sm text-uu-text-secondary leading-relaxed mb-8">
          Je staat op het punt je evaluatie voor <span className="font-medium text-uu-text">{survey.name}</span> in te leveren. Na het inleveren kun je je antwoorden niet meer aanpassen.
        </p>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 h-12 bg-uu-black text-white font-semibold rounded-xl cursor-pointer transition-all duration-200 hover:bg-uu-black/90 active:scale-[0.98] text-sm"
        >
          <Send className="w-4 h-4" />
          Inleveren
        </button>

        <Link
          href={`${basePath}/overzicht`}
          className="mt-3 text-sm text-uu-text cursor-pointer transition-colors duration-200 hover:text-uu-text-secondary py-2"
        >
          Terug naar vragen
        </Link>
      </div>
    </div>
  );
}
