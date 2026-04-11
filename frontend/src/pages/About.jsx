import { Link } from "react-router-dom";

const TEAM = [
  {
    name: "Dr. Aria Voss",
    role: "Chief Archaeologist",
    planet: "Xerath Prime Lead",
    icon: "◉",
  },
  {
    name: "Cmdr. Zhen Karlos",
    role: "Stellar Cartographer",
    planet: "Galactic Mapping",
    icon: "◈",
  },
  {
    name: "Dr. Lyra Osman",
    role: "Xenova Linguist",
    planet: "Language Decoder",
    icon: "⌘",
  },
  {
    name: "Eng. Rho Tarvis",
    role: "Artifact Technician",
    planet: "3D Reconstruction",
    icon: "◇",
  },
  {
    name: "Dr. Sable Nyx",
    role: "Civilization Historian",
    planet: "Timeline Research",
    icon: "★",
  },
  {
    name: "Analyst Kev Dran",
    role: "Data Archivist",
    planet: "Database Systems",
    icon: "⬡",
  },
];

const STATS = [
  { value: "10+", label: "Artifacts Cataloged" },
  { value: "6", label: "Planets Documented" },
  { value: "5", label: "Historical Eras" },
  { value: "10K", label: "Years of History" },
  { value: "26", label: "Alien Glyphs Decoded" },
  { value: "2247", label: "Year of Discovery" },
];

const SECTIONS = [
  {
    icon: "🖼",
    title: "Artifact Gallery",
    desc: "Browse every recovered relic from Xenova space. Search by name, filter by category — Weapons, Technology, Ritual objects and more. Click any artifact for its full history and interactive 3D model.",
  },
  {
    icon: "🔮",
    title: "3D Artifact Viewer",
    desc: "Powered by Three.js, every artifact renders in real-time 3D. Drag to rotate, scroll to zoom, explore every angle. The geometry adapts to the artifact category — cones for weapons, rings for communication devices.",
  },
  {
    icon: "📅",
    title: "Civilization Timeline",
    desc: "Journey through 5 eras — Origin, Expansion, Golden Age, Decline, and Extinction. Understand how the most advanced civilization in the galaxy rose to greatness and vanished without a trace.",
  },
  {
    icon: "🔤",
    title: "Language Decoder",
    desc: "Type any English text and watch it transform instantly into ancient Xenova glyphs. Their language was derived from quantum waveform patterns — a 26-symbol alphabet unlike anything on Earth.",
  },
  {
    icon: "🗺",
    title: "Galactic Map",
    desc: "An interactive SVG map of all 6 known Xenova planets across the Andromeda spiral arm. Click any planet to reveal its population, technology level, and historical significance.",
  },
  {
    icon: "📝",
    title: "Knowledge Quiz",
    desc: "10 questions about Xenova civilization. Earn your rank — from Novice Researcher to Xenova Scholar. Test what you have learned from the archive and prove your knowledge.",
  },
];

const TIMELINE_BRIEF = [
  {
    era: "Origin",
    year: "~10,000 BXE",
    color: "#7c3aed",
    note: "First Xenova emerge on Xerath Prime",
  },
  {
    era: "Expansion",
    year: "~5,000 BXE",
    color: "#0891b2",
    note: "Colonization of outer planets begins",
  },
  {
    era: "Golden Age",
    year: "~1,000 BXE",
    color: "#d97706",
    note: "Peak of science, culture and unified council",
  },
  {
    era: "Decline",
    year: "~500 BXE",
    color: "#dc2626",
    note: "Civil wars fracture the civilization",
  },
  {
    era: "Extinction",
    year: "~100 BXE",
    color: "#475569",
    note: "All six planets fall silent forever",
  },
];

export default function About() {
  return (
    <div className="min-h-screen star-bg">
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[600px] h-[600px] rounded-full opacity-[0.03]"
            style={{
              background:
                "radial-gradient(circle, #00f3ff 0%, transparent 70%)",
            }}
          />
        </div>

        <p className="font-orbitron text-xs tracking-[0.4em] text-xenova-blue/60 mb-4">
          ESTABLISHED 2247 · ANDROMEDA EXPEDITION DIVISION
        </p>
        <h1 className="font-orbitron text-5xl md:text-6xl font-black mb-6">
          <span className="neon-text">ABOUT</span>{" "}
          <span className="text-white">XENOVA ARCHIVE</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          The universe's first and only digital museum dedicated to preserving
          the history, artifacts, and legacy of the{" "}
          <span className="text-xenova-blue">Xenova</span> — an ancient alien
          civilization discovered in the Andromeda galaxy in 2247.
        </p>

        <div className="flex items-center justify-center gap-4 mt-10">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-xenova-blue/50" />
          <span className="font-orbitron text-xs text-xenova-blue/50 tracking-widest">
            ◈
          </span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-xenova-blue/50" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mb-24">
        <div className="glass-card p-10 border-xenova-blue/30 shadow-neon text-center">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-4">
            OUR MISSION
          </p>
          <blockquote className="text-2xl md:text-3xl text-white font-light leading-relaxed">
            "To ensure that a civilization which lived{" "}
            <span className="text-xenova-blue font-medium">
              10,000 years ago
            </span>
            , in a galaxy{" "}
            <span className="text-xenova-blue font-medium">
              2.5 million light years away
            </span>
            , is never truly forgotten."
          </blockquote>
          <p className="text-gray-500 text-sm mt-6 font-orbitron tracking-widest">
            — XENOVA ARCHIVE FOUNDING CHARTER, 2247
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mb-24">
        <div className="text-center mb-10">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-2">
            BY THE NUMBERS
          </p>
          <h2 className="section-title text-3xl">Archive At A Glance</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="glass-card p-5 text-center hover:border-xenova-blue/40 hover:shadow-neon transition-all"
            >
              <p className="font-orbitron text-3xl font-bold neon-text">
                {value}
              </p>
              <p className="font-orbitron text-xs text-gray-500 tracking-wider mt-2 leading-tight">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mb-24">
        <div className="text-center mb-12">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-2">
            ORIGIN STORY
          </p>
          <h2 className="section-title text-3xl">How It All Began</h2>
        </div>

        <div className="space-y-6">
          {[
            {
              year: "2241",
              title: "The Signal",
              text: "Deep space probe ARIA-7 detects an anomalous energy signature from the Andromeda galaxy. Unlike anything in human scientific records, the signal carries repeating mathematical patterns — a hallmark of intelligent origin.",
            },
            {
              year: "2244",
              title: "The Expedition",
              text: "Humanity's first intergalactic mission launches. The ISV Horizon carries 340 scientists, soldiers, and engineers toward the signal source — a six-year journey through deep space.",
            },
            {
              year: "2247",
              title: "First Contact — With Ruins",
              text: "The ISV Horizon reaches Xerath Prime. The planet is silent. But its cities still stand. Its technology still hums with residual energy. The Xenova are gone — but everything they built remains.",
            },
            {
              year: "2249",
              title: "Xenova Archive Founded",
              text: "To share the discovery with all of humanity, the Xenova Archive digital museum is established. Every artifact cataloged. Every planet mapped. Every glyph decoded. Available to anyone, anywhere, forever.",
            },
          ].map(({ year, title, text }) => (
            <div key={year} className="flex gap-6 group">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="glass-card px-3 py-2 text-center min-w-[64px]">
                  <p className="font-orbitron text-sm font-bold text-xenova-blue">
                    {year}
                  </p>
                </div>
                <div className="w-px flex-1 bg-xenova-blue/20 mt-2" />
              </div>
              <div className="glass-card p-5 flex-1 mb-2 group-hover:border-xenova-blue/40 transition-all">
                <h3 className="font-orbitron text-base font-bold text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mb-24">
        <div className="text-center mb-12">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-2">
            XENOVA HISTORY
          </p>
          <h2 className="section-title text-3xl">10,000 Years In 5 Eras</h2>
        </div>

        <div className="grid sm:grid-cols-5 gap-3">
          {TIMELINE_BRIEF.map(({ era, year, color, note }) => (
            <div
              key={era}
              className="glass-card p-4 text-center hover:-translate-y-1 transition-all duration-300"
              style={{ borderColor: color + "33" }}
            >
              <div
                className="w-3 h-3 rounded-full mx-auto mb-3"
                style={{ background: color, boxShadow: `0 0 10px ${color}` }}
              />
              <p className="font-orbitron text-sm font-bold text-white mb-1">
                {era}
              </p>
              <p className="font-orbitron text-xs mb-2" style={{ color }}>
                {year}
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">{note}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link to="/timeline" className="btn-neon text-sm">
            Explore Full Timeline →
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mb-24">
        <div className="text-center mb-12">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-2">
            MUSEUM SECTIONS
          </p>
          <h2 className="section-title text-3xl">What You Can Explore</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SECTIONS.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="glass-card p-6 hover:border-xenova-blue/40 hover:shadow-neon hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-orbitron text-sm font-bold text-white mb-2">
                {title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mb-24">
        <div className="text-center mb-12">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-2">
            THE TEAM
          </p>
          <h2 className="section-title text-3xl">Research Division</h2>
          <p className="text-gray-400 text-sm mt-3 max-w-lg mx-auto">
            The scientists and engineers who made the Xenova Archive possible.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map(({ name, role, planet, icon }) => (
            <div
              key={name}
              className="glass-card p-5 flex items-start gap-4 hover:border-xenova-blue/40 transition-all"
            >
              <div
                className="w-12 h-12 rounded-full border border-xenova-blue/30 flex items-center justify-center
                              flex-shrink-0 bg-xenova-blue/10 text-xl font-orbitron text-xenova-blue"
              >
                {icon}
              </div>
              <div>
                <p className="font-orbitron text-sm font-bold text-white">
                  {name}
                </p>
                <p className="text-xenova-blue/70 text-xs font-orbitron mt-0.5">
                  {role}
                </p>
                <p className="text-gray-500 text-xs mt-1">{planet}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mb-24">
        <div className="text-center mb-12">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-2">
            BUILT WITH
          </p>
          <h2 className="section-title text-3xl">Technology Stack</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Frontend */}
          <div className="glass-card p-6">
            <p className="font-orbitron text-xs text-xenova-blue/60 tracking-widest mb-4">
              FRONTEND
            </p>
            <div className="space-y-3">
              {[
                ["React 18", "Component-based UI framework"],
                ["Vite", "Lightning fast build tool"],
                ["TailwindCSS", "Utility-first styling"],
                ["Three.js", "3D artifact rendering"],
                ["React Router", "Client-side navigation"],
                ["Axios", "HTTP requests to backend"],
              ].map(([tech, desc]) => (
                <div
                  key={tech}
                  className="flex items-center justify-between py-2 border-b border-xenova-blue/10"
                >
                  <span className="font-orbitron text-sm text-xenova-blue">
                    {tech}
                  </span>
                  <span className="text-gray-500 text-xs">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <p className="font-orbitron text-xs text-xenova-blue/60 tracking-widest mb-4">
              BACKEND
            </p>
            <div className="space-y-3">
              {[
                ["Node.js", "JavaScript runtime"],
                ["Express.js", "REST API framework"],
                ["MongoDB", "NoSQL database"],
                ["Mongoose", "Database modeling"],
                ["JWT", "Authentication tokens"],
                ["bcryptjs", "Password hashing"],
              ].map(([tech, desc]) => (
                <div
                  key={tech}
                  className="flex items-center justify-between py-2 border-b border-xenova-blue/10"
                >
                  <span className="font-orbitron text-sm text-xenova-blue">
                    {tech}
                  </span>
                  <span className="text-gray-500 text-xs">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-24 text-center">
        <div className="glass-card p-12 border-xenova-blue/30 shadow-neon">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-4">
            BEGIN YOUR JOURNEY
          </p>
          <h2 className="font-orbitron text-3xl font-bold text-white mb-4">
            Ready to Explore?
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            10,000 years of alien history awaits. Start with the artifact
            gallery, decode their language, or take the quiz to earn your rank.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/artifacts" className="btn-neon py-3 px-8">
              Enter Gallery
            </Link>
            <Link to="/timeline" className="btn-purple py-3 px-8">
              View Timeline
            </Link>
            <Link to="/quiz" className="btn-neon py-3 px-8">
              Take Quiz
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
