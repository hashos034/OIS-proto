"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function WachtwoordVergetenPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSent(true);
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-full bg-white px-6 pt-6 pb-8">
      {/* Back link */}
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-uu-text-secondary cursor-pointer hover:text-uu-text transition-colors duration-200 mb-8 w-fit min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Terug naar inloggen</span>
      </Link>

      {sent ? (
        /* Success state */
        <div className="flex flex-col items-center text-center mt-12">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-uu-success" />
          </div>
          <h1 className="text-xl font-bold text-uu-text mb-2">Mail is verstuurd!</h1>
          <p className="text-sm text-uu-text-secondary leading-relaxed max-w-[280px]">
            We hebben een e-mail gestuurd naar <span className="font-medium text-uu-text">{email}</span> met instructies om je wachtwoord te herstellen.
          </p>
          <Link
            href="/"
            className="mt-8 h-12 px-8 bg-uu-black text-white font-semibold text-sm rounded-xl cursor-pointer transition-all duration-200 hover:opacity-80 active:scale-[0.98] flex items-center justify-center"
          >
            Terug naar inloggen
          </Link>
        </div>
      ) : (
        /* Form state */
        <>
          <div className="mb-6">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-uu-black" />
            </div>
            <h1 className="text-xl font-bold text-uu-text mb-2">Wachtwoord vergeten?</h1>
            <p className="text-sm text-uu-text-secondary leading-relaxed">
              Voer je e-mailadres in en we sturen je een link om je wachtwoord te herstellen.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-uu-text mb-1.5">
                E-mailadres
              </label>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="j.student@students.uu.nl"
                className="w-full h-12 px-4 rounded-xl border border-gray-300 text-base text-uu-text bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:border-transparent transition-all duration-200"
                autoComplete="email"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-2 bg-uu-black text-white font-semibold text-base rounded-xl cursor-pointer transition-all duration-200 hover:opacity-80 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Verstuur"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
