import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { path: '/',          label: 'Home'     },
  { path: '/artifacts', label: 'Gallery'  },
  { path: '/timeline',  label: 'Timeline' },
  { path: '/map',       label: 'Map'      },
  { path: '/decoder',   label: 'Decoder'  },
  { path: '/quiz',      label: 'Quiz'     },
  { path: '/about',     label: 'About'    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, logout, isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');  // redirect to home on logout
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-xenova-darker/95 backdrop-blur-md border-b border-xenova-blue/20 shadow-neon' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border border-xenova-blue/60 rotate-45 flex items-center justify-center group-hover:border-xenova-blue transition-all">
              <div className="w-3 h-3 bg-xenova-blue group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <span className="font-orbitron text-lg font-bold neon-text tracking-widest hidden sm:block">XENOVA</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label }) => (
              <Link key={path} to={path}
                className={`px-3 py-1.5 font-orbitron text-xs tracking-widest transition-all duration-200 rounded ${
                  pathname === path
                    ? 'text-xenova-blue border-b border-xenova-blue'
                    : 'text-gray-400 hover:text-xenova-blue hover:bg-xenova-blue/5'
                }`}>
                {label}
              </Link>
            ))}
          </div>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                {/* Visitor — show avatar + profile link */}
                {!isAdmin && (
                  <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 border border-xenova-blue/20 hover:border-xenova-blue/50 rounded transition-all group">
                    <div className="w-6 h-6 rounded-full bg-xenova-blue/20 border border-xenova-blue/40 flex items-center justify-center">
                      <span className="font-orbitron text-xs text-xenova-blue font-bold">
                        {user?.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-orbitron text-xs text-gray-400 group-hover:text-xenova-blue transition-colors">
                      {user?.username}
                    </span>
                  </Link>
                )}
                {/* Admin — show dashboard button */}
                {isAdmin && (
                  <Link to="/admin" className="btn-purple text-xs py-1.5 px-4">Dashboard</Link>
                )}
                {/* Logout — goes to home */}
                <button onClick={handleLogout} className="btn-neon text-xs py-1.5 px-4">Logout</button>
              </>
            ) : (
              <Link to="/login" className="btn-neon text-xs py-1.5 px-4">Login / Register</Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`w-6 h-0.5 bg-xenova-blue transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-xenova-blue transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-xenova-blue transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-xenova-darker/98 border-t border-xenova-blue/20 px-4 py-4">
          {navLinks.map(({ path, label }) => (
            <Link key={path} to={path} onClick={() => setMenuOpen(false)}
              className={`block py-2.5 font-orbitron text-sm tracking-widest border-b border-xenova-blue/10 ${
                pathname === path ? 'text-xenova-blue' : 'text-gray-400'
              }`}>
              {label}
            </Link>
          ))}
          <div className="mt-4 space-y-2">
            {isLoggedIn ? (
              <>
                {!isAdmin && (
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="btn-neon block text-center text-sm">
                    My Profile ({user?.username})
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)} className="btn-purple block text-center text-sm">
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="btn-neon w-full text-sm opacity-60">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-neon block text-center text-sm">
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
