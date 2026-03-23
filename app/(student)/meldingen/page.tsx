"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Bell, Mail } from "lucide-react";

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
  label: string;
}

function Toggle({ enabled, onToggle, label }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onToggle}
      className={`relative w-12 h-7 rounded-full cursor-pointer transition-colors duration-200 flex-shrink-0 ${
        enabled ? "bg-uu-yellow" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function MeldingenPage() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  return (
    <div className="flex flex-col min-h-full bg-uu-surface">
      <Header title="Meldingen" backHref="/dashboard" />

      <div className="flex-1 px-4 pt-4">
        <p className="text-sm text-uu-text-secondary mb-6">
          Stel in hoe je meldingen wilt ontvangen over nieuwe evaluaties en updates.
        </p>

        <div className="flex flex-col gap-3">
          {/* Push notifications */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[44px]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-uu-black" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-uu-text">Pushmeldingen</h3>
                <p className="text-xs text-uu-text-secondary">Ontvang meldingen op je telefoon</p>
              </div>
            </div>
            <Toggle
              enabled={pushEnabled}
              onToggle={() => setPushEnabled(!pushEnabled)}
              label="Pushmeldingen"
            />
          </div>

          {/* Email notifications */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[44px]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-uu-black" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-uu-text">E-mailmeldingen</h3>
                <p className="text-xs text-uu-text-secondary">Ontvang updates per e-mail</p>
              </div>
            </div>
            <Toggle
              enabled={emailEnabled}
              onToggle={() => setEmailEnabled(!emailEnabled)}
              label="E-mailmeldingen"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
