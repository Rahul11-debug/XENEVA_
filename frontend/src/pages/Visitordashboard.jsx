import { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });
api.interceptors.request.use(cfg => {
  const t = localStorage.getItem('xenova_token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

const RANK_CONFIG = {
  'Xenova Scholar':    { color: '#fde047', icon: '★', label: '90-100%' },
  'Archive Explorer':  { color: '#67e8f9', icon: '◈', label: '70-89%'  },
  'Curious Visitor':   { color: '#93c5fd', icon: '◉', label: '50-69%'  },
  'Novice Researcher': { color: '#9ca3af', icon: '◇', label: '0-49%'   },
};

const getRank = (pct) =>
  pct >= 90 ? 'Xenova Scholar'   :
  pct >= 70 ? 'Archive Explorer' :
  pct >= 50 ? 'Curious Visitor'  : 'Novice Researcher';

const SECTIONS = [
  { icon: '🖼', title: 'Artifact Gallery', path: '/artifacts', desc: 'Browse alien artifacts' },
  { icon: '📅', title: 'Timeline',         path: '/timeline',  desc: 'Civilization history'  },
  { icon: '🗺', title: 'Galactic Map',     path: '/map',       desc: 'Explore planets'       },
  { icon: '🔤', title: 'Decoder',          path: '/decoder',   desc: 'Alien language'        },
  { icon: '📝', title: 'Take Quiz',        path: '/quiz',      desc: 'Test your knowledge'   },
  { icon: 'ℹ',  title: 'About',            path: '/about',     desc: 'About the archive'     },
];

export default function VisitorDashboard() {
  const { user, isLoggedIn, isVisitor, logout } = useAuth();
  const [scores, setScores]   = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Only visitors allowed here
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!isVisitor)  return <Navigate to="/admin" replace />;

  useEffect(() => {
    api.get('/auth/scores')
      .then(({ data }) => setScores(data.quizScores || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  const best     = scores.length ? Math.max(...scores.map(s => s.percentage)) : null;
  const avg      = scores.length ? Math.round(scores.reduce((a, s) => a + s.percentage, 0) / scores.length) : null;
  const bestRank = best !== null ? getRank(best) : null;

  const card = {
    background: 'rgba(0,20,40,0.7)',
    border: '1px solid rgba(0,243,255,0.15)',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#010a14' }}>

      {/* ── Navbar ── */}
      <div style={{ borderBottom: '1px solid rgba(0,243,255,0.1)', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'rgba(1,10,20,0.95)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
        <span style={{ fontFamily: 'Orbitron', fontSize: '16px', color: '#00f3ff', textShadow: '0 0 10px #00f3ff44' }}>
          XENOVA ARCHIVE
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(0,243,255,0.1)', border: '1px solid rgba(0,243,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Orbitron', fontSize: '14px', color: '#00f3ff', fontWeight: 700 }}>
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ fontFamily: 'Orbitron', fontSize: '12px', color: 'white', lineHeight: 1 }}>{user?.username}</p>
              <p style={{ fontFamily: 'Orbitron', fontSize: '10px', color: '#00f3ff66', marginTop: '2px' }}>VISITOR</p>
            </div>
          </div>
          <button onClick={handleLogout} style={{ fontFamily: 'Orbitron', fontSize: '11px', color: '#00f3ff', border: '1px solid rgba(0,243,255,0.4)', background: 'transparent', padding: '7px 14px', borderRadius: '6px', cursor: 'pointer' }}>
            LOGOUT
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>

        {/* ── Welcome ── */}
        <div style={{ marginBottom: '36px' }}>
          <p style={{ fontFamily: 'Orbitron', fontSize: '11px', color: '#00f3ff66', letterSpacing: '3px', marginBottom: '6px' }}>
            VISITOR DASHBOARD
          </p>
          <h1 style={{ fontFamily: 'Orbitron', fontSize: '28px', fontWeight: 900, color: 'white' }}>
            Welcome, <span style={{ color: '#00f3ff' }}>{user?.username}</span>
          </h1>
          <p style={{ color: '#6b7280', marginTop: '6px', fontSize: '14px' }}>{user?.email}</p>
        </div>

        {/* ── Quiz Stats ── */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontFamily: 'Orbitron', fontSize: '11px', color: '#00f3ff66', letterSpacing: '3px', marginBottom: '14px' }}>QUIZ STATS</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { label: 'ATTEMPTS',   value: scores.length            },
              { label: 'BEST SCORE', value: best !== null ? `${best}%` : '—' },
              { label: 'AVERAGE',    value: avg  !== null ? `${avg}%`  : '—' },
            ].map(({ label, value }) => (
              <div key={label} style={{ ...card, padding: '20px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Orbitron', fontSize: '26px', fontWeight: 900, color: '#00f3ff', textShadow: '0 0 10px #00f3ff66' }}>{value}</p>
                <p style={{ fontFamily: 'Orbitron', fontSize: '10px', color: '#6b7280', marginTop: '4px', letterSpacing: '2px' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Best Rank ── */}
        {bestRank && (
          <div style={{ ...card, padding: '20px', marginBottom: '32px', textAlign: 'center', borderColor: RANK_CONFIG[bestRank].color + '44' }}>
            <p style={{ fontFamily: 'Orbitron', fontSize: '10px', color: '#6b7280', letterSpacing: '3px', marginBottom: '10px' }}>HIGHEST RANK ACHIEVED</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 24px', borderRadius: '8px', background: RANK_CONFIG[bestRank].color + '15', border: `1px solid ${RANK_CONFIG[bestRank].color}44` }}>
              <span style={{ fontSize: '22px', color: RANK_CONFIG[bestRank].color }}>{RANK_CONFIG[bestRank].icon}</span>
              <span style={{ fontFamily: 'Orbitron', fontSize: '18px', fontWeight: 700, color: RANK_CONFIG[bestRank].color }}>{bestRank}</span>
            </div>
          </div>
        )}

        {/* ── Quiz History ── */}
        <div style={{ ...card, marginBottom: '32px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(0,243,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontFamily: 'Orbitron', fontSize: '12px', color: '#9ca3af', letterSpacing: '2px' }}>QUIZ HISTORY</p>
            <Link to="/quiz" style={{ fontFamily: 'Orbitron', fontSize: '11px', color: '#00f3ff', border: '1px solid rgba(0,243,255,0.3)', padding: '6px 14px', borderRadius: '6px', textDecoration: 'none' }}>
              TAKE QUIZ →
            </Link>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Orbitron', fontSize: '12px', color: '#00f3ff44' }}>LOADING...</div>
          ) : scores.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Orbitron', fontSize: '28px', color: 'rgba(0,243,255,0.1)', marginBottom: '10px' }}>◇</p>
              <p style={{ fontFamily: 'Orbitron', fontSize: '12px', color: '#4b5563', letterSpacing: '2px', marginBottom: '16px' }}>NO QUIZ ATTEMPTS YET</p>
              <Link to="/quiz" style={{ fontFamily: 'Orbitron', fontSize: '11px', color: '#00f3ff', border: '1px solid rgba(0,243,255,0.4)', padding: '8px 20px', borderRadius: '6px', textDecoration: 'none' }}>
                TAKE YOUR FIRST QUIZ
              </Link>
            </div>
          ) : (
            <div>
              {[...scores].reverse().map((s, i) => {
                const rank = getRank(s.percentage);
                const cfg  = RANK_CONFIG[rank];
                return (
                  <div key={i} style={{ padding: '16px 24px', borderBottom: '1px solid rgba(0,243,255,0.05)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* Attempt # */}
                    <div style={{ width: '34px', height: '34px', border: '1px solid rgba(0,243,255,0.15)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Orbitron', fontSize: '10px', color: '#6b7280' }}>#{scores.length - i}</span>
                    </div>

                    {/* Bar */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontFamily: 'Orbitron', fontSize: '11px', color: cfg.color }}>{cfg.icon} {rank}</span>
                        <span style={{ fontFamily: 'Orbitron', fontSize: '12px', fontWeight: 700, color: 'white' }}>{s.score}/{s.total}</span>
                      </div>
                      <div style={{ height: '5px', background: 'rgba(0,243,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${s.percentage}%`, borderRadius: '3px', background: s.percentage >= 70 ? '#00f3ff' : s.percentage >= 50 ? '#3b82f6' : '#ef4444', transition: 'width 0.7s' }} />
                      </div>
                    </div>

                    {/* % + date */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ fontFamily: 'Orbitron', fontSize: '18px', fontWeight: 700, color: cfg.color }}>{s.percentage}%</p>
                      <p style={{ fontSize: '11px', color: '#6b7280' }}>{new Date(s.takenAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Explore Sections ── */}
        <p style={{ fontFamily: 'Orbitron', fontSize: '11px', color: '#00f3ff66', letterSpacing: '3px', marginBottom: '14px' }}>EXPLORE ARCHIVE</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
          {SECTIONS.map(s => (
            <Link key={s.path} to={s.path} style={{ textDecoration: 'none' }}>
              <div style={{ ...card, padding: '22px', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,243,255,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,243,255,0.15)'}>
                <span style={{ fontSize: '26px' }}>{s.icon}</span>
                <p style={{ fontFamily: 'Orbitron', fontSize: '12px', color: 'white', marginTop: '10px', marginBottom: '4px' }}>{s.title}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>{s.desc}</p>
                <p style={{ fontFamily: 'Orbitron', fontSize: '10px', color: '#00f3ff44', marginTop: '10px', letterSpacing: '2px' }}>ENTER →</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
