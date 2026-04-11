export default function PlanetCard({ planet, onClick, isSelected }) {
  const barWidth = `${planet.technologyLevel * 10}%`;

  return (
    <div
      onClick={() => onClick(planet)}
      className={`glass-card p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
        isSelected ? 'border-xenova-blue/70 shadow-neonLg' : 'hover:border-xenova-blue/40 hover:shadow-neon'
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="rounded-full flex-shrink-0 animate-float"
          style={{
            width: `${Math.max(36, Math.min(56, planet.radius * 0.6))}px`,
            height: `${Math.max(36, Math.min(56, planet.radius * 0.6))}px`,
            background: `radial-gradient(circle at 35% 35%, ${planet.color}cc, ${planet.color}33)`,
            boxShadow: `0 0 20px ${planet.color}44`,
          }}
        />
        <div>
          <h3 className="font-orbitron text-sm font-bold text-white">{planet.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{planet.location}</p>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500 font-orbitron">TECH LEVEL</span>
          <span className="text-xenova-blue font-orbitron">{planet.technologyLevel}/10</span>
        </div>
        <div className="h-1 bg-xenova-blue/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: barWidth, background: `linear-gradient(90deg, ${planet.color}, ${planet.color}88)` }}
          />
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Pop: <span className="text-gray-300">{planet.population}</span>
      </p>

      <p className="text-xs text-gray-400 mt-2 line-clamp-2">{planet.description}</p>

      {isSelected && (
        <div className="mt-3 pt-3 border-t border-xenova-blue/20 text-xs text-xenova-blue font-orbitron tracking-widest animate-pulse">
          ◉ SELECTED
        </div>
      )}
    </div>
  );
}
