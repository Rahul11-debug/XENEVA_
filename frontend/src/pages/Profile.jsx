import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// Direct axios call — no dependency on authAPI
const api = axios.create({ baseURL: '/api' });
api.interceptors.request.use(cfg => {
  const t = localStorage.getItem('xenova_token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

const RANK_CONFIG = {
  'Xenova Scholar':    { color: 'text-yellow-300', border: 'border-yellow-300/30', bg: 'bg-yellow-300/10', icon: '★' },
  'Archive Explorer':  { color: 'text-cyan-300',   border: 'border-cyan-300/30',   bg: 'bg-cyan-300/10',   icon: '◈' },
  'Curious Visitor':   { color: 'text-blue-300',   border: 'border-blue-300/30',   bg: 'bg-blue-300/10',   icon: '◉' },
  'Novice Researcher': { color: 'text-gray-400',   border: 'border-gray-400/30',   bg: 'bg-gray-400/10',   icon: '◇' },
};

const getRank = (pct) =>
  pct >= 90 ? 'Xenova Scholar'   :
  pct >= 70 ? 'Archive Explorer' :
  pct >= 50 ? 'Curious Visitor'  : 'Novice Researcher';

export default function Profile() {
  const { user, isLoggedIn, logout } = useAuth();

  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Always runs
  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    api.get('/auth/scores')
      .then(({ data }) => setScores(data.quizScores || []))
      .catch(() => setScores([]))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  // ✅ DO NOT early return immediately
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

 

  const best     = scores.length ? Math.max(...scores.map(s => s.percentage)) : null;
  const avg      = scores.length ? Math.round(scores.reduce((a, s) => a + s.percentage, 0) / scores.length) : null;
  const bestRank = best !== null ? getRank(best) : null;

  return (
    <div className="min-h-screen star-bg pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-3">VISITOR PROFILE</p>
          <h1 className="section-title text-4xl mb-2">My Archive</h1>
        </div>

        {/* Profile card */}
        <div className="glass-card p-8 mb-8 border-xenova-blue/30 shadow-neon">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-full border-2 border-xenova-blue/50 flex items-center justify-center bg-xenova-blue/10 flex-shrink-0 shadow-neon">
              <span className="font-orbitron text-2xl font-bold text-xenova-blue">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h2 className="font-orbitron text-xl font-bold text-white">{user?.username}</h2>
                <span className={`text-xs font-orbitron px-2 py-0.5 rounded border ${
                  user?.role === 'admin'
                    ? 'text-purple-300 border-purple-300/30 bg-purple-300/10'
                    : 'text-xenova-blue border-xenova-blue/30 bg-xenova-blue/10'
                }`}>
                  {user?.role === 'admin' ? '◈ ADMIN' : '◉ VISITOR'}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
            <button onClick={logout} className="btn-neon text-xs py-2 opacity-60 hover:opacity-100">
              Logout
            </button>
          </div>
        </div>

        {/* Best rank */}
        {bestRank && (
          <div className={`glass-card p-5 mb-8 text-center ${RANK_CONFIG[bestRank].border} shadow-neon`}>
            <p className="font-orbitron text-xs tracking-widest text-gray-500 mb-2">HIGHEST RANK</p>
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg ${RANK_CONFIG[bestRank].bg} ${RANK_CONFIG[bestRank].border} border`}>
              <span className={`text-2xl ${RANK_CONFIG[bestRank].color}`}>{RANK_CONFIG[bestRank].icon}</span>
              <span className={`font-orbitron text-xl font-bold ${RANK_CONFIG[bestRank].color}`}>{bestRank}</span>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Attempts',   value: scores.length },
            { label: 'Best Score', value: best !== null ? `${best}%` : '—' },
            { label: 'Average',    value: avg  !== null ? `${avg}%`  : '—' },
          ].map(({ label, value }) => (
            <div key={label} className="glass-card p-4 text-center">
              <p className="font-orbitron text-2xl font-bold neon-text">{value}</p>
              <p className="font-orbitron text-xs text-gray-500 tracking-wider mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Quiz history */}
        <div className="glass-card overflow-hidden">
          <div className="px-6 py-4 border-b border-xenova-blue/10 flex items-center justify-between">
            <h2 className="font-orbitron text-sm text-gray-300 tracking-widest">QUIZ HISTORY</h2>
            <Link to="/quiz" className="btn-neon text-xs py-1.5">Take Quiz →</Link>
          </div>

          {loading ? (
            <div className="p-10 text-center font-orbitron text-xenova-blue/40 animate-pulse tracking-widest">
              LOADING...
            </div>
          ) : scores.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-4xl text-xenova-blue/10 font-orbitron mb-3">◇</p>
              <p className="font-orbitron text-gray-600 tracking-widest text-sm mb-4">NO QUIZ ATTEMPTS YET</p>
              <Link to="/quiz" className="btn-neon text-sm">Take Your First Quiz</Link>
            </div>
          ) : (
            <div className="divide-y divide-xenova-blue/5">
              {[...scores].reverse().map((s, i) => {
                const rank = getRank(s.percentage);
                const cfg  = RANK_CONFIG[rank];
                return (
                  <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-xenova-blue/5 transition-colors">
                    <div className="w-8 h-8 rounded border border-xenova-blue/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-orbitron text-xs text-gray-500">#{scores.length - i}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-orbitron text-xs ${cfg.color}`}>{cfg.icon} {rank}</span>
                        <span className="font-orbitron text-sm font-bold text-white">{s.score}/{s.total}</span>
                      </div>
                      <div className="h-1.5 bg-xenova-blue/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${s.percentage}%`, background: s.percentage >= 70 ? '#00f3ff' : s.percentage >= 50 ? '#3b82f6' : '#dc2626' }} />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-orbitron text-lg font-bold neon-text">{s.percentage}%</p>
                      <p className="text-xs text-gray-600">{new Date(s.takenAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
