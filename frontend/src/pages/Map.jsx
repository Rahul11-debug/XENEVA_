import { useState, useEffect, useRef } from 'react';
import { planetAPI } from '../services/api';
import PlanetCard from '../components/PlanetCard';

const PLANET_POSITIONS = [
  { cx: 50,  cy: 50  }, 
  { cx: 72,  cy: 30  }, 
  { cx: 28,  cy: 28  }, 
  { cx: 75,  cy: 65  }, 
  { cx: 22,  cy: 68  }, 
  { cx: 83,  cy: 48  },
];

export default function Map() {
  const [planets, setPlanets]     = useState([]);
  const [selected, setSelected]   = useState(null);
  const [loading, setLoading]     = useState(true);
  const svgRef = useRef(null);

  useEffect(() => {
    planetAPI.getAll()
      .then(({ data }) => setPlanets(data))
      .finally(() => setLoading(false));
  }, []);

  const handlePlanetClick = (planet) => {
    setSelected(prev => prev?._id === planet._id ? null : planet);
  };

  return (
    <div className="min-h-screen star-bg pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-3">
            STELLAR CARTOGRAPHY SYSTEM
          </p>
          <h1 className="section-title text-4xl md:text-5xl mb-4">Galactic Map</h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Known Xenova territorial space across the Andromeda spiral arm. Six planets,
            each a chapter in the civilization's story.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* SVG Map — takes 3 columns */}
          <div className="lg:col-span-3 glass-card p-4 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              {/* Grid lines */}
              <svg width="100%" height="100%" className="opacity-10">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f3ff" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <span className="font-orbitron text-xenova-blue/50 animate-pulse tracking-widest">
                  LOADING MAP...
                </span>
              </div>
            ) : (
              <svg
                ref={svgRef}
                viewBox="0 0 100 100"
                className="w-full"
                style={{ aspectRatio: '1 / 1' }}
              >
                {/* Orbit rings from center */}
                {[15, 28, 38].map(r => (
                  <circle
                    key={r}
                    cx="50" cy="50" r={r}
                    fill="none"
                    stroke="rgba(0,243,255,0.08)"
                    strokeWidth="0.3"
                    strokeDasharray="1 2"
                  />
                ))}

                {/* Connection lines from center planet */}
                {planets.slice(1).map((p, i) => {
                  const pos = PLANET_POSITIONS[i + 1] || { cx: 50, cy: 50 };
                  return (
                    <line
                      key={p._id}
                      x1="50" y1="50"
                      x2={pos.cx} y2={pos.cy}
                      stroke="rgba(0,243,255,0.06)"
                      strokeWidth="0.2"
                    />
                  );
                })}

                {/* Planets */}
                {planets.map((planet, i) => {
                  const pos = PLANET_POSITIONS[i] || { cx: 50, cy: 50 };
                  const isSelected = selected?._id === planet._id;
                  const r = (planet.radius / 80) * 5 + 2;

                  return (
                    <g
                      key={planet._id}
                      onClick={() => handlePlanetClick(planet)}
                      className="cursor-pointer"
                    >
                      {/* Glow ring */}
                      {isSelected && (
                        <circle
                          cx={pos.cx} cy={pos.cy}
                          r={r + 2.5}
                          fill="none"
                          stroke={planet.color}
                          strokeWidth="0.5"
                          opacity="0.6"
                        >
                          <animate attributeName="r" values={`${r+1.5};${r+3.5};${r+1.5}`} dur="2s" repeatCount="indefinite"/>
                          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite"/>
                        </circle>
                      )}

                      {/* Planet body */}
                      <circle
                        cx={pos.cx} cy={pos.cy} r={r}
                        fill={planet.color}
                        opacity={isSelected ? 1 : 0.75}
                        style={{ filter: `drop-shadow(0 0 ${isSelected ? 4 : 2}px ${planet.color})` }}
                      />

                      {/* Highlight */}
                      <circle
                        cx={pos.cx - r * 0.25} cy={pos.cy - r * 0.25}
                        r={r * 0.35}
                        fill="white"
                        opacity="0.2"
                      />

                      {/* Label */}
                      <text
                        x={pos.cx}
                        y={pos.cy + r + 3}
                        textAnchor="middle"
                        fontSize="2.2"
                        fill={isSelected ? planet.color : 'rgba(255,255,255,0.5)'}
                        fontFamily="Orbitron, monospace"
                      >
                        {planet.name}
                      </text>
                    </g>
                  );
                })}

                {/* Coordinates watermark */}
                <text x="1" y="99" fontSize="1.8" fill="rgba(0,243,255,0.15)" fontFamily="monospace">
                  SEC-7 · ANDROMEDA
                </text>
              </svg>
            )}

            <p className="text-center text-xs text-gray-600 font-orbitron tracking-widest mt-2">
              CLICK A PLANET TO INSPECT
            </p>
          </div>

          {/* Planet list — 2 columns */}
          <div className="lg:col-span-2 space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {loading
              ? Array(6).fill(0).map((_, i) => (
                  <div key={i} className="glass-card h-32 animate-pulse" />
                ))
              : planets.map(p => (
                  <PlanetCard
                    key={p._id}
                    planet={p}
                    onClick={handlePlanetClick}
                    isSelected={selected?._id === p._id}
                  />
                ))
            }
          </div>
        </div>

        {/* Selected planet popup */}
        {selected && (
          <div className="mt-8 glass-card p-8 border-xenova-blue/40 shadow-neonLg animate-pulse-slow">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Planet visual */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <div
                  className="rounded-full animate-float"
                  style={{
                    width: '100px', height: '100px',
                    background: `radial-gradient(circle at 35% 35%, ${selected.color}cc, ${selected.color}22)`,
                    boxShadow: `0 0 40px ${selected.color}44`,
                  }}
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-orbitron text-2xl font-bold" style={{ color: selected.color }}>
                    {selected.name}
                  </h2>
                  <span className="text-xs font-orbitron border px-2 py-0.5 rounded"
                        style={{ color: selected.color, borderColor: selected.color + '44' }}>
                    TECH LVL {selected.technologyLevel}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">{selected.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { label: 'Location',       value: selected.location         },
                    { label: 'Population',     value: selected.population       },
                    { label: 'Tech Level',     value: `${selected.technologyLevel} / 10` },
                  ].map(({ label, value }) => (
                    <div key={label} className="glass-card p-3">
                      <p className="text-xs font-orbitron text-gray-500">{label}</p>
                      <p className="text-sm text-white mt-1">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
