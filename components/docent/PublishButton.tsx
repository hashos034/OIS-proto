"use client";

import { useState } from "react";
import { Send, XCircle, Lock, Check, X } from "lucide-react";

interface PublishButtonProps {
  status: "draft" | "published" | "closed";
  onPublish: () => void;
  onUnpublish: () => void;
}

export default function PublishButton({
  status,
  onPublish,
  onUnpublish,
}: PublishButtonProps) {
  const [confirming, setConfirming] = useState<"publish" | "unpublish" | null>(
    null
  );

  function handlePublishClick() {
    setConfirming("publish");
  }

  function handleUnpublishClick() {
    setConfirming("unpublish");
  }

  function handleConfirm() {
    if (confirming === "publish") {
      onPublish();
    } else if (confirming === "unpublish") {
      onUnpublish();
    }
    setConfirming(null);
  }

  function handleCancel() {
    setConfirming(null);
  }

  // --- Confirmation inline prompt ---
  if (confirming !== null) {
    return (
      <div className="flex items-center gap-2 bg-uu-surface border border-uu-border rounded-lg px-3 py-2">
        <span className="text-sm font-medium text-uu-text">
          Weet je het zeker?
        </span>
        <button
          onClick={handleConfirm}
          className="
            inline-flex items-center gap-1.5
            min-h-[36px] px-3 py-1.5
            bg-uu-black hover:bg-uu-black/90 active:bg-uu-black/90
            text-white text-sm font-medium
            rounded-lg
            transition-colors duration-150
            cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-1
          "
          aria-label="Bevestigen"
        >
          <Check className="w-4 h-4" aria-hidden="true" />
          <span>Ja</span>
        </button>
        <button
          onClick={handleCancel}
          className="
            inline-flex items-center gap-1.5
            min-h-[36px] px-3 py-1.5
            bg-white hover:bg-uu-surface active:bg-uu-surface
            text-uu-text text-sm font-medium
            border border-uu-border
            rounded-lg
            transition-colors duration-150
            cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-1
          "
          aria-label="Annuleren"
        >
          <X className="w-4 h-4" aria-hidden="true" />
          <span>Annuleren</span>
        </button>
      </div>
    );
  }

  // --- Draft: publish action ---
  if (status === "draft") {
    return (
      <button
        onClick={handlePublishClick}
        className="
          inline-flex items-center gap-2
          min-h-[44px] px-5 py-2.5
          bg-uu-black hover:bg-uu-black/90 active:bg-uu-black/90
          text-white text-sm font-semibold
          rounded-lg
          shadow-sm hover:shadow
          transition-all duration-150
          cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-2
        "
      >
        <Send className="w-4 h-4" aria-hidden="true" />
        <span>Publiceer enquête</span>
      </button>
    );
  }

  // --- Published: unpublish action ---
  if (status === "published") {
    return (
      <button
        onClick={handleUnpublishClick}
        className="
          inline-flex items-center gap-2
          min-h-[44px] px-5 py-2.5
          bg-white hover:bg-uu-red/10 active:bg-uu-red/20
          text-uu-red text-sm font-semibold
          border border-uu-red
          rounded-lg
          transition-all duration-150
          cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:ring-offset-2
        "
      >
        <XCircle className="w-4 h-4" aria-hidden="true" />
        <span>Enquête depubliceren</span>
      </button>
    );
  }

  // --- Closed: disabled state ---
  return (
    <button
      disabled
      aria-disabled="true"
      className="
        inline-flex items-center gap-2
        min-h-[44px] px-5 py-2.5
        bg-uu-surface
        text-uu-text-secondary text-sm font-semibold
        border border-uu-border
        rounded-lg
        cursor-not-allowed
        select-none
      "
    >
      <Lock className="w-4 h-4" aria-hidden="true" />
      <span>Enquête gesloten</span>
    </button>
  );
}
