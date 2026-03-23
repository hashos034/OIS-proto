"use client";

import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import Header from "@/components/Header";
import { userProfile } from "@/data/mock";

export default function ProfielBewerkenPage() {
  const router = useRouter();

  const handleSave = () => {
    router.push("/profiel");
  };

  return (
    <div className="flex flex-col h-full min-h-full bg-uu-surface">
      <Header title="Profiel bewerken" backHref="/profiel" />

      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Avatar with edit action */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-uu-black flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {userProfile.avatarInitials}
              </span>
            </div>
          </div>
          <button
            onClick={() => router.push("/profiel/foto")}
            className="mt-3 flex items-center gap-1.5 text-sm font-medium text-uu-text cursor-pointer transition-colors duration-200 hover:text-uu-text-secondary min-h-[44px]"
          >
            <Camera className="w-4 h-4" />
            Wijzig profielfoto
          </button>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="naam"
              className="block text-sm font-medium text-uu-text mb-1.5"
            >
              Naam
            </label>
            <input
              id="naam"
              type="text"
              readOnly
              value={userProfile.name}
              className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm text-uu-text-secondary min-h-[44px] cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="studentnummer"
              className="block text-sm font-medium text-uu-text mb-1.5"
            >
              Studentnummer
            </label>
            <input
              id="studentnummer"
              type="text"
              readOnly
              value={userProfile.studentNumber}
              className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm text-uu-text-secondary min-h-[44px] cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-uu-text mb-1.5"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              readOnly
              value={userProfile.email}
              className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm text-uu-text-secondary min-h-[44px] cursor-not-allowed"
            />
          </div>
        </div>

        {/* Info text */}
        <p className="text-xs text-uu-text-secondary mt-4 leading-relaxed">
          Je naam, studentnummer en e-mailadres worden beheerd door de
          universiteit en kunnen niet handmatig worden gewijzigd.
        </p>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full mt-6 py-3 bg-uu-black text-white text-sm font-semibold rounded-xl cursor-pointer transition-colors duration-200 hover:bg-uu-black/90 active:scale-[0.98] min-h-[44px]"
        >
          Opslaan
        </button>
      </div>
    </div>
  );
}
