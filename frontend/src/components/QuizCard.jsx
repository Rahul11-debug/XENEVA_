export default function QuizCard({ question, qIndex, total, selected, onSelect, submitted, correctAnswer }) {
  const getOptionStyle = (optIndex) => {
    if (!submitted) {
      return selected === optIndex
        ? 'border-xenova-blue bg-xenova-blue/20 text-xenova-blue'
        : 'border-xenova-blue/20 text-gray-300 hover:border-xenova-blue/50 hover:bg-xenova-blue/5';
    }
    if (optIndex === correctAnswer) return 'border-green-400 bg-green-400/20 text-green-300';
    if (optIndex === selected && selected !== correctAnswer) return 'border-red-400 bg-red-400/20 text-red-300';
    return 'border-xenova-blue/10 text-gray-600';
  };

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="font-orbitron text-xs text-xenova-blue/60 tracking-widest">
          QUESTION {qIndex + 1} / {total}
        </span>
        <span className={`text-xs font-orbitron px-2 py-0.5 rounded border ${
          question.difficulty === 'Hard'
            ? 'text-red-400 border-red-400/40 bg-red-400/10'
            : question.difficulty === 'Medium'
            ? 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10'
            : 'text-green-400 border-green-400/40 bg-green-400/10'
        }`}>
          {question.difficulty}
        </span>
      </div>

      <p className="text-white text-base leading-relaxed mb-6">{question.question}</p>

      <div className="space-y-2.5">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => !submitted && onSelect(i)}
            disabled={submitted}
            className={`w-full flex items-center gap-3 p-3 rounded border transition-all duration-200 text-left ${getOptionStyle(i)}`}
          >
            <span className="font-orbitron text-xs w-5 flex-shrink-0">{letters[i]}</span>
            <span className="text-sm">{opt}</span>
            {submitted && i === correctAnswer && <span className="ml-auto text-green-400">✓</span>}
            {submitted && i === selected && i !== correctAnswer && <span className="ml-auto text-red-400">✗</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
