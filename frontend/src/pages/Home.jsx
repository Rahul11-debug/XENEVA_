import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ERA_BADGES = ['Origin', 'Expansion', 'Golden Age', 'Decline', 'Extinction'];

const FEATURES = [
  { icon: '⬡', title: 'Artifact Gallery',      desc: 'Browse 10+ recovered alien artifacts from across the Xenova galaxy.',        path: '/artifacts' },
  { icon: '◎', title: 'Civilization Timeline',  desc: 'Journey through 5 eras of Xenova history from origin to extinction.',         path: '/timeline'  },
  { icon: '◈', title: 'Galactic Map',           desc: 'Explore the 6 known Xenova planets and their technological achievements.',    path: '/map'       },
  { icon: '⌘', title: 'Language Decoder',       desc: 'Translate human text into ancient Xenova glyphs in real time.',               path: '/decoder'   },
  { icon: '◇', title: 'Knowledge Quiz',         desc: 'Test your knowledge of Xenova civilization across 10 challenging questions.', path: '/quiz'      },
];

export default function Home() {
  const [typeText, setTypeText] = useState('');
  const full = 'XENOVA ARCHIVE';

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTypeText(full.slice(0, i + 1));
      i++;
      if (i >= full.length) clearInterval(t);
    }, 100);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen star-bg grid-overlay">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16">
        {/* Glowing orb */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full opacity-[0.04]"
               style={{ background: 'radial-gradient(circle, #00f3ff 0%, transparent 70%)' }} />
        </div>

        {/* Era badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {ERA_BADGES.map((e) => (
            <span key={e} className="text-xs font-orbitron tracking-widest border border-xenova-blue/20 px-3 py-1 text-xenova-blue/50">
              {e}
            </span>
          ))}
        </div>

        {/* Main title */}
        <div className="mb-2">
          <p className="font-orbitron text-xs tracking-[0.4em] text-xenova-blue/60 mb-4">
            DIGITAL MUSEUM SYSTEM · SECTOR 7
          </p>
          <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black tracking-wider">
            <span className="neon-text">{typeText}</span>
            <span className="animate-pulse text-xenova-blue">_</span>
          </h1>
        </div>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed font-light">
          Explore the remnants of an ancient alien civilization. Discover their artifacts,
          decode their language, and uncover the mysteries of their rise and fall.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link to="/artifacts" className="btn-neon text-base py-3 px-8">
            Enter Archive
          </Link>
          <Link to="/timeline" className="btn-purple text-base py-3 px-8">
            View Timeline
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <span className="text-xs font-orbitron text-xenova-blue/60 tracking-widest">SCROLL</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-xenova-blue/60 to-transparent" />
        </div>
      </section>

      {/* Stats row */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '10+', label: 'Artifacts Cataloged' },
            { value: '6',   label: 'Planets Mapped'      },
            { value: '5',   label: 'Civilization Eras'   },
            { value: '10K', label: 'Years of History'    },
          ].map(({ value, label }) => (
            <div key={label} className="glass-card p-5 text-center neon-border">
              <p className="font-orbitron text-3xl font-bold neon-text">{value}</p>
              <p className="text-xs text-gray-500 mt-1 font-orbitron tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="text-center mb-14">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-3">EXPLORE THE ARCHIVE</p>
          <h2 className="section-title">Museum Sections</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon, title, desc, path }) => (
            <Link key={path} to={path} className="group glass-card p-6 hover:border-xenova-blue/50 hover:shadow-neon transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-4 text-xenova-blue/70 group-hover:text-xenova-blue transition-colors font-orbitron">
                {icon}
              </div>
              <h3 className="font-orbitron text-base font-bold text-white group-hover:text-xenova-blue transition-colors mb-2">
                {title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              <div className="mt-4 text-xs text-xenova-blue/50 font-orbitron tracking-widest group-hover:text-xenova-blue transition-colors">
                ENTER →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-xenova-blue/10 py-8 text-center">
        <p className="font-orbitron text-xs text-gray-600 tracking-widest">
          XENOVA ARCHIVE · DIGITAL PRESERVATION SYSTEM · ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}
