"use client";

import { useRouter } from "next/navigation";
import { ImagePlus, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import { userProfile } from "@/data/mock";

export default function ProfielFotoPage() {
  const router = useRouter();

  const handleSave = () => {
    router.push("/profiel");
  };

  return (
    <div className="flex flex-col h-full min-h-full bg-uu-surface">
      <Header title="Profielfoto" backHref="/profiel/bewerken" />

      <div className="flex-1 overflow-y-auto px-4 py-8">
        {/* Large avatar */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-uu-black flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold text-white">
              {userProfile.avatarInitials}
            </span>
          </div>

          <p className="text-sm text-uu-text-secondary mt-4 text-center">
            Kies een nieuwe profielfoto of verwijder je huidige foto.
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-8 space-y-3">
          {/* Choose photo button (outlined) */}
          <button
            onClick={() => {
              /* Prototype only — no actual upload */
            }}
            className="flex items-center justify-center gap-2 w-full py-3 bg-white border-2 border-uu-black text-uu-text text-sm font-semibold rounded-xl cursor-pointer transition-colors duration-200 hover:bg-uu-surface active:scale-[0.98] min-h-[44px]"
          >
            <ImagePlus className="w-4 h-4" />
            Kies foto
          </button>

          {/* Remove photo button (text, red) */}
          <button
            onClick={() => {
              /* Prototype only — no actual remove */
            }}
            className="flex items-center justify-center gap-2 w-full py-3 bg-transparent text-uu-red text-sm font-medium cursor-pointer transition-colors duration-200 hover:text-uu-red-dark hover:bg-uu-red/10 rounded-xl min-h-[44px]"
          >
            <Trash2 className="w-4 h-4" />
            Verwijder foto
          </button>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full mt-8 py-3 bg-uu-black text-white text-sm font-semibold rounded-xl cursor-pointer transition-colors duration-200 hover:bg-uu-black/90 active:scale-[0.98] min-h-[44px]"
        >
          Opslaan
        </button>
      </div>
    </div>
  );
}
