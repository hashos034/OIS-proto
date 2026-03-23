interface OpenResponse {
  text: string;
  date: string;
}

interface ResponseTableProps {
  responses: OpenResponse[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ResponseTable({ responses }: ResponseTableProps) {
  return (
    <div>
      {/* Count header */}
      <p className="text-sm font-medium text-uu-text-secondary mb-3">
        {responses.length === 0
          ? "Geen reacties"
          : `${responses.length} ${responses.length === 1 ? "reactie" : "reacties"}`}
      </p>

      {responses.length === 0 ? (
        <div className="flex items-center justify-center py-10 rounded-lg border border-dashed border-uu-border">
          <p className="text-sm text-uu-text-secondary">Nog geen reacties</p>
        </div>
      ) : (
        <div
          className="max-h-[400px] overflow-y-auto rounded-lg border border-uu-border divide-y divide-uu-border"
          role="list"
          aria-label="Open antwoorden"
        >
          {responses.map((response, index) => (
            <div
              key={index}
              role="listitem"
              className={[
                "flex items-start justify-between gap-4 px-4 py-3",
                index % 2 === 0 ? "bg-white" : "bg-uu-surface",
              ].join(" ")}
            >
              <p className="text-sm text-uu-text leading-relaxed flex-1">
                {response.text}
              </p>
              <time
                dateTime={response.date}
                className="text-xs text-uu-text-secondary whitespace-nowrap mt-0.5 shrink-0"
              >
                {formatDate(response.date)}
              </time>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
