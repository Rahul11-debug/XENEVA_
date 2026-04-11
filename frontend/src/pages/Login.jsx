import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [tab, setTab]           = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [role, setRole]         = useState('visitor');
  const [secret, setSecret]     = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const { login, register, isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Already logged in — go to home (visitor) or admin dashboard
  if (isLoggedIn) return <Navigate to={isAdmin ? '/admin' : '/'} replace />;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const u = await login(email, password);
      // Admin → admin dashboard, Visitor → home page
      navigate(u.role === 'admin' ? '/admin' : '/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError('Passwords do not match');
    if (password.length < 6)  return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      const u = await register(username, email, password, role, secret);
      // Admin → admin dashboard, Visitor → home page
      navigate(u.role === 'admin' ? '/admin' : '/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  const inp = `w-full bg-xenova-navy border border-xenova-blue/20 rounded px-4 py-3
    text-white placeholder-gray-600 text-sm focus:outline-none
    focus:border-xenova-blue/50 transition-all`;

  return (
    <div className="min-h-screen star-bg grid-overlay flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link to="/">
            <div className="w-14 h-14 border-2 border-xenova-blue/60 rotate-45 mx-auto mb-4 flex items-center justify-center shadow-neon">
              <div className="w-5 h-5 bg-xenova-blue/80" />
            </div>
          </Link>
          <h1 className="font-orbitron text-2xl font-bold neon-text tracking-wider">XENOVA ARCHIVE</h1>
          <p className="text-gray-500 text-xs font-orbitron tracking-widest mt-1">ACCESS PORTAL</p>
        </div>

        {/* Tab switcher */}
        <div className="flex glass-card p-1 rounded-lg mb-6">
          {[['login','SIGN IN'],['register','REGISTER']].map(([t, label]) => (
            <button key={t} onClick={() => { setTab(t); setError(''); }}
              className={`flex-1 py-2.5 font-orbitron text-xs tracking-widest rounded transition-all ${
                tab === t ? 'bg-xenova-blue/20 text-xenova-blue border border-xenova-blue/40' : 'text-gray-500 hover:text-gray-300'
              }`}>
              {label}
            </button>
          ))}
        </div>

        <div className="glass-card p-8">

          {/* LOGIN */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-orbitron text-xs text-gray-500 tracking-widest mb-1.5">EMAIL</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" required className={inp} />
              </div>
              <div>
                <label className="block font-orbitron text-xs text-gray-500 tracking-widest mb-1.5">PASSWORD</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required className={inp} />
              </div>
              {error && <p className="text-red-400 text-xs font-orbitron text-center border border-red-400/30 bg-red-400/10 rounded p-2">⚠ {error}</p>}
              <button type="submit" disabled={loading} className="w-full btn-neon py-3 text-sm disabled:opacity-50">
                {loading ? 'SIGNING IN...' : 'ENTER ARCHIVE'}
              </button>
              <p className="text-center text-xs text-gray-600 mt-3">
                No account?{' '}
                <button type="button" onClick={() => setTab('register')} className="text-xenova-blue hover:underline">
                  Register here
                </button>
              </p>
            </form>
          )}

          {/* REGISTER */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block font-orbitron text-xs text-gray-500 tracking-widest mb-1.5">USERNAME</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                  placeholder="explorer_001" required className={inp} />
              </div>
              <div>
                <label className="block font-orbitron text-xs text-gray-500 tracking-widest mb-1.5">EMAIL</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" required className={inp} />
              </div>
              <div>
                <label className="block font-orbitron text-xs text-gray-500 tracking-widest mb-1.5">PASSWORD</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters" required className={inp} />
              </div>
              <div>
                <label className="block font-orbitron text-xs text-gray-500 tracking-widest mb-1.5">CONFIRM PASSWORD</label>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                  placeholder="••••••••" required className={inp} />
              </div>

              <div>
                <label className="block font-orbitron text-xs text-gray-500 tracking-widest mb-2">REGISTER AS</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setRole('visitor')}
                    className={`p-3 border rounded text-left transition-all ${
                      role === 'visitor' ? 'border-xenova-blue/60 bg-xenova-blue/10 text-xenova-blue' : 'border-xenova-blue/15 text-gray-500 hover:border-xenova-blue/30'
                    }`}>
                    <p className="font-orbitron text-xs font-bold">◉ Visitor</p>
                    <p className="text-xs opacity-60 mt-0.5">Explore the archive</p>
                  </button>
                  <button type="button" onClick={() => setRole('admin')}
                    className={`p-3 border rounded text-left transition-all ${
                      role === 'admin' ? 'border-purple-500/60 bg-purple-500/10 text-purple-300' : 'border-xenova-blue/15 text-gray-500 hover:border-xenova-blue/30'
                    }`}>
                    <p className="font-orbitron text-xs font-bold">◈ Admin</p>
                    <p className="text-xs opacity-60 mt-0.5">Manage artifacts</p>
                  </button>
                </div>
              </div>

              {role === 'admin' && (
                <div>
                  <label className="block font-orbitron text-xs text-purple-400/70 tracking-widest mb-1.5">ADMIN SECRET KEY</label>
                  <input type="password" value={secret} onChange={e => setSecret(e.target.value)}
                    placeholder="Enter admin secret key" required
                    className={inp + ' border-purple-500/30 focus:border-purple-400/50'} />
                  <p className="text-xs text-gray-600 mt-1">Key: <code className="text-purple-400">xenova_admin_secret_2024</code></p>
                </div>
              )}

              {error && <p className="text-red-400 text-xs font-orbitron text-center border border-red-400/30 bg-red-400/10 rounded p-2">⚠ {error}</p>}
              <button type="submit" disabled={loading} className="w-full btn-neon py-3 text-sm disabled:opacity-50">
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>
              <p className="text-center text-xs text-gray-600 mt-3">
                Already registered?{' '}
                <button type="button" onClick={() => setTab('login')} className="text-xenova-blue hover:underline">Sign in</button>
              </p>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}

