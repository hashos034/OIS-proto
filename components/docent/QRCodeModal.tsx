"use client";

import { useState } from "react";
import { X, QrCode, Copy, Check } from "lucide-react";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  surveyName: string;
  accessCode: string;
}

export default function QRCodeModal({
  isOpen,
  onClose,
  surveyName,
  accessCode,
}: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  function handleCopy() {
    navigator.clipboard.writeText(accessCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-uu-border">
          <div className="min-w-0 pr-3">
            <h2
              id="qr-modal-title"
              className="text-base font-semibold text-uu-text leading-snug"
            >
              Toegangscode
            </h2>
            <p className="text-sm text-uu-text-secondary mt-0.5 truncate">
              {surveyName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-uu-text-secondary hover:text-uu-text hover:bg-uu-surface transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow shrink-0"
            aria-label="Sluiten"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 flex flex-col items-center gap-5">
          {/* QR code placeholder */}
          <div
            className="w-[200px] h-[200px] rounded-lg border-2 border-uu-border flex flex-col items-center justify-center gap-2 bg-uu-surface"
            aria-label="QR code placeholder"
          >
            <QrCode className="w-12 h-12 text-uu-text-secondary" aria-hidden="true" />
            <span className="text-xs text-uu-text-secondary font-medium">QR Code</span>
          </div>

          {/* Access code */}
          <div className="w-full text-center">
            <p className="text-sm text-uu-text-secondary mb-2">
              Of voer de code in:
            </p>
            <div className="bg-uu-surface rounded-lg px-4 py-3 inline-block">
              <span className="font-mono text-3xl font-bold tracking-[0.25em] text-uu-text select-all">
                {accessCode}
              </span>
            </div>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={[
              "flex items-center gap-2 px-4 h-11 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow w-full justify-center",
              copied
                ? "bg-uu-success/10 text-uu-success border border-uu-success/30"
                : "bg-uu-surface text-uu-text border border-uu-border hover:bg-uu-surface",
            ].join(" ")}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                Code gekopieerd
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" aria-hidden="true" />
                Kopieer code
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full h-11 rounded-lg bg-uu-black text-white text-sm font-medium hover:bg-uu-black/90 transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-2"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
}
