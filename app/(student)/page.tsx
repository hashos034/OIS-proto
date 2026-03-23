"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/uu-app");
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-full bg-white px-6 pt-12 pb-8">
      {/* UU Branding */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 bg-uu-yellow rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <span className="text-uu-black text-2xl font-bold">UU</span>
        </div>
        <h1 className="text-xl font-bold text-uu-text">Universiteit Utrecht</h1>
        <p className="text-sm text-uu-text-secondary mt-1">Learner Journey</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-uu-text mb-1.5">
            E-mailadres
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="j.student@students.uu.nl"
            className="w-full h-12 px-4 rounded-xl border border-gray-300 text-base text-uu-text bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:border-transparent transition-all duration-200"
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-uu-text mb-1.5">
            Wachtwoord
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Voer wachtwoord in"
              className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-300 text-base text-uu-text bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:border-transparent transition-all duration-200"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center cursor-pointer text-uu-text-secondary hover:text-uu-text transition-colors duration-200"
              aria-label={showPassword ? "Wachtwoord verbergen" : "Wachtwoord tonen"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 mt-2 bg-uu-black text-white font-semibold text-base rounded-xl cursor-pointer transition-all duration-200 hover:opacity-80 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Inloggen"
          )}
        </button>
      </form>

      {/* Forgot password */}
      <div className="mt-4 text-center">
        <Link
          href="/wachtwoord-vergeten"
          className="text-sm text-uu-black font-medium cursor-pointer hover:opacity-70 transition-colors duration-200"
        >
          Wachtwoord vergeten?
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 text-center">
        <p className="text-xs text-uu-text-secondary">
          Universiteit Utrecht &copy; 2026
        </p>
      </div>
    </div>
  );
}
