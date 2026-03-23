interface QuestionCardProps {
  question: string;
  questionNumber: number;
  total: number;
}

export default function QuestionCard({ question, questionNumber, total }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-uu-border">
      <span className="text-xs font-medium text-uu-text-secondary uppercase tracking-wide">
        Vraag {questionNumber} van {total}
      </span>
      <h2 className="text-lg font-semibold text-uu-text mt-2 leading-snug">
        {question}
      </h2>
    </div>
  );
}
