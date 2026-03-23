"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";

export default function DocentWachtwoordVergetenPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-uu-surface flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Yellow header */}
          <div className="bg-uu-yellow px-8 py-6 flex items-center gap-4">
            {/* UU Shield */}
            <div className="flex-shrink-0 w-12 h-12 bg-uu-black rounded-sm flex items-center justify-center">
              <svg
                viewBox="0 0 32 40"
                className="w-7 h-9 fill-white"
                aria-hidden="true"
              >
                <path d="M16 0 L32 6 L32 22 C32 32 16 40 16 40 C16 40 0 32 0 22 L0 6 Z" />
                <path
                  d="M10 14 L10 24 C10 27.5 12.5 30 16 30 C19.5 30 22 27.5 22 24 L22 14 L19 14 L19 24 C19 25.9 17.7 27 16 27 C14.3 27 13 25.9 13 24 L13 14 Z"
                  className="fill-uu-yellow"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-uu-black/60 uppercase tracking-widest">
                Universiteit Utrecht
              </p>
              <p className="text-base font-bold text-uu-black leading-tight">
                Learner Journey
              </p>
            </div>
          </div>

          {/* Content area */}
          <div className="px-8 py-8">
            {isSubmitted ? (
              /* Success state */
              <div className="text-center">
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-uu-success/10 flex items-center justify-center">
                    <CheckCircle
                      size={36}
                      className="text-uu-success"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <h1 className="text-xl font-bold text-uu-text mb-3">
                  E-mail verstuurd
                </h1>
                <p className="text-sm text-uu-text-secondary leading-relaxed mb-2">
                  Er is een e-mail verstuurd naar
                </p>
                <p className="text-sm font-semibold text-uu-text mb-6 break-all">
                  {email}
                </p>
                <p className="text-sm text-uu-text-secondary leading-relaxed mb-8">
                  Controleer je inbox en volg de instructies om je wachtwoord te
                  herstellen.
                </p>
                <Link
                  href="/docent"
                  className="inline-flex items-center gap-2 text-sm text-uu-black hover:text-uu-black/70 font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-uu-yellow rounded"
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  Terug naar inloggen
                </Link>
              </div>
            ) : (
              /* Form state */
              <>
                <h1 className="text-2xl font-bold text-uu-text mb-1">
                  Wachtwoord herstellen
                </h1>
                <p className="text-sm text-uu-text-secondary mb-8 leading-relaxed">
                  Voer je e-mailadres in om een herstelmail te ontvangen.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Email field */}
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-uu-text mb-1.5"
                    >
                      E-mailadres
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-uu-text-secondary pointer-events-none"
                        aria-hidden="true"
                      />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-uu-border bg-uu-surface text-uu-text text-base placeholder:text-uu-text-secondary focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:border-transparent transition-all duration-150"
                        placeholder="naam@uu.nl"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isLoading || !email.trim()}
                    className="w-full min-h-[44px] bg-uu-black hover:bg-uu-black/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-base rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-2 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                          aria-hidden="true"
                        />
                        Versturen…
                      </>
                    ) : (
                      "Verstuur herstelmail"
                    )}
                  </button>
                </form>

                {/* Back to login link */}
                <div className="mt-6 text-center">
                  <Link
                    href="/docent"
                    className="inline-flex items-center gap-1.5 text-sm text-uu-black hover:text-uu-black/70 font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-uu-yellow rounded"
                  >
                    <ArrowLeft size={14} aria-hidden="true" />
                    Terug naar inloggen
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-uu-text-secondary">
          &copy; {new Date().getFullYear()} Universiteit Utrecht
        </p>
      </div>
    </div>
  );
}
