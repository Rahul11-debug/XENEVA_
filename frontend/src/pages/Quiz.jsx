import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import  api from "../services/api";

api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("xenova_token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

const getRank = (pct) =>
  pct >= 90
    ? "Xenova Scholar"
    : pct >= 70
      ? "Archive Explorer"
      : pct >= 50
        ? "Curious Visitor"
        : "Novice Researcher";

const RANK_COLORS = {
  "Xenova Scholar": "text-yellow-300",
  "Archive Explorer": "text-cyan-300",
  "Curious Visitor": "text-blue-300",
  "Novice Researcher": "text-gray-400",
};

const RANK_ICONS = {
  "Xenova Scholar": "★",
  "Archive Explorer": "◈",
  "Curious Visitor": "◉",
  "Novice Researcher": "◇",
};

export default function Quiz() {
  const { isLoggedIn } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [current, setCurrent] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(false);

  useEffect(() => {
    api
      .get("/quiz")
      .then(({ data }) => setQuestions(data))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (questionId, optIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optIndex }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length)
      return alert("Please answer all questions before submitting.");

    setSubmitting(true);
    try {
      const payload = Object.entries(answers).map(
        ([questionId, selectedAnswer]) => ({
          questionId,
          selectedAnswer,
        }),
      );
      const { data } = await api.post("/quiz/submit", { answers: payload });
      const rank = getRank(data.percentage);
      setResult({ ...data, rank });

      if (isLoggedIn) {
        try {
          await api.post("/auth/quiz-score", {
            score: data.score,
            total: data.total,
            percentage: data.percentage,
            rank,
          });
          setScoreSaved(true);
        } catch (err) {
          console.error(
            "Score save failed:",
            err.response?.data || err.message,
          );
        }
      }
    } catch (err) {
      console.error("Submit failed:", err.response?.data || err.message);
      alert("Submission failed. Is the server running?");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setResult(null);
    setCurrent(0);
    setScoreSaved(false);
  };

  const answered = Object.keys(answers).length;
  const progress = questions.length ? (answered / questions.length) * 100 : 0;

  if (loading)
    return (
      <div className="min-h-screen star-bg flex items-center justify-center">
        <p className="font-orbitron text-xenova-blue animate-pulse tracking-widest">
          LOADING QUIZ...
        </p>
      </div>
    );

  if (result) {
    const rank = result.rank;
    return (
      <div className="min-h-screen star-bg pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-card p-10 border-xenova-blue/40 shadow-neon">
            <div className="text-5xl mb-4">{RANK_ICONS[rank]}</div>
            <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-2">
              QUIZ COMPLETE
            </p>
            <h2
              className={`font-orbitron text-3xl font-bold mb-4 ${RANK_COLORS[rank]}`}
            >
              {rank}
            </h2>

            {scoreSaved && (
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-green-400/30 bg-green-400/10">
                <span className="text-green-400 text-xs font-orbitron tracking-wider">
                  ✓ SCORE SAVED TO YOUR PROFILE
                </span>
              </div>
            )}
            {!isLoggedIn && (
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-xenova-blue/20 bg-xenova-blue/5">
                <span className="text-gray-500 text-xs font-orbitron">
                  <Link
                    to="/login"
                    className="text-xenova-blue hover:underline"
                  >
                    Login
                  </Link>{" "}
                  to save your score
                </span>
              </div>
            )}

            <div className="relative w-36 h-36 mx-auto my-8">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="rgba(0,243,255,0.1)"
                  strokeWidth="2.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke={result.percentage >= 70 ? "#00f3ff" : "#dc2626"}
                  strokeWidth="2.5"
                  strokeDasharray={`${result.percentage} ${100 - result.percentage}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-orbitron text-3xl font-bold neon-text">
                  {result.percentage}%
                </span>
                <span className="text-xs text-gray-500">
                  {result.score}/{result.total}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-8 text-left">
              {result.results.map((r, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded border text-sm ${
                    r.isCorrect
                      ? "border-green-400/20 bg-green-400/5"
                      : "border-red-400/20 bg-red-400/5"
                  }`}
                >
                  <span
                    className={`font-orbitron text-xs mt-0.5 flex-shrink-0 ${r.isCorrect ? "text-green-400" : "text-red-400"}`}
                  >
                    {r.isCorrect ? "✓" : "✗"} Q{i + 1}
                  </span>
                  <p
                    className={`text-xs ${r.isCorrect ? "text-gray-300" : "text-gray-500"}`}
                  >
                    {r.question}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={handleRetry} className="btn-neon">
                Try Again
              </button>
              {isLoggedIn && (
                <Link to="/profile" className="btn-purple">
                  View My Scores
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen star-bg pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-3">
            KNOWLEDGE ASSESSMENT
          </p>
          <h1 className="section-title text-4xl mb-4">Xenova Quiz</h1>
          <p className="text-gray-400 text-sm">
            {isLoggedIn ? (
              "✓ Logged in — your score will be saved automatically"
            ) : (
              <>
                <Link to="/login" className="text-xenova-blue hover:underline">
                  Login
                </Link>{" "}
                to save your score
              </>
            )}
          </p>
        </div>

        <div className="glass-card p-4 mb-6">
          <div className="flex justify-between text-xs font-orbitron text-gray-500 mb-2">
            <span>PROGRESS</span>
            <span>
              {answered} / {questions.length} ANSWERED
            </span>
          </div>
          <div className="h-1.5 bg-xenova-blue/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-xenova-blue rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {questions.map((q, i) => (
              <button
                key={q._id}
                onClick={() => setCurrent(i)}
                className={`w-6 h-6 rounded text-xs font-orbitron transition-all ${
                  i === current
                    ? "bg-xenova-blue text-black scale-110"
                    : answers[q._id] !== undefined
                      ? "bg-xenova-blue/30 text-xenova-blue"
                      : "bg-xenova-blue/10 text-gray-600 hover:bg-xenova-blue/20"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {questions[current] && (
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-orbitron text-xs text-xenova-blue/60 tracking-widest">
                QUESTION {current + 1} / {questions.length}
              </span>
              <span
                className={`text-xs font-orbitron px-2 py-0.5 rounded border ${
                  questions[current].difficulty === "Hard"
                    ? "text-red-400 border-red-400/30 bg-red-400/10"
                    : questions[current].difficulty === "Medium"
                      ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
                      : "text-green-400 border-green-400/30 bg-green-400/10"
                }`}
              >
                {questions[current].difficulty}
              </span>
            </div>
            <p className="text-white text-base leading-relaxed mb-6">
              {questions[current].question}
            </p>
            <div className="space-y-2.5">
              {questions[current].options.map((opt, i) => {
                const selected = answers[questions[current]._id] === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(questions[current]._id, i)}
                    className={`w-full flex items-center gap-3 p-3 rounded border transition-all text-left ${
                      selected
                        ? "border-xenova-blue bg-xenova-blue/20 text-xenova-blue"
                        : "border-xenova-blue/20 text-gray-300 hover:border-xenova-blue/50 hover:bg-xenova-blue/5"
                    }`}
                  >
                    <span className="font-orbitron text-xs w-5 flex-shrink-0">
                      {["A", "B", "C", "D"][i]}
                    </span>
                    <span className="text-sm">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="btn-neon disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>
          {current < questions.length - 1 ? (
            <button
              onClick={() => setCurrent((c) => c + 1)}
              className="btn-neon"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting || answered < questions.length}
              className="btn-purple disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "SUBMITTING..."
                : `SUBMIT (${answered}/${questions.length})`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
