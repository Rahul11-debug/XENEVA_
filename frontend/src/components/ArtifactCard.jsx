import { Link } from "react-router-dom";

const CATEGORY_COLORS = {
  Weapon: "text-red-400    border-red-400/40    bg-red-400/10",
  Communication: "text-blue-400  border-blue-400/40   bg-blue-400/10",
  Navigation: "text-green-400 border-green-400/40  bg-green-400/10",
  Ritual: "text-purple-400 border-purple-400/40 bg-purple-400/10",
  Technology: "text-cyan-400  border-cyan-400/40   bg-cyan-400/10",
  Biology: "text-lime-400  border-lime-400/40   bg-lime-400/10",
  Unknown: "text-gray-400  border-gray-400/40   bg-gray-400/10",
};

const RARITY_COLORS = {
  Common: "text-gray-300",
  Rare: "text-blue-300",
  Legendary: "text-yellow-300",
};

export default function ArtifactCard({ artifact }) {
  const {
    _id,
    name,
    description,
    image,
    category,
    originPlanet,
    discoveredYear,
    rarity,
  } = artifact;
  const catColor = CATEGORY_COLORS[category] || CATEGORY_COLORS.Unknown;

  return (
    <Link to={`/artifacts/${_id}`} className="group block">
      <div className="glass-card overflow-hidden transition-all duration-300 hover:border-xenova-blue/50 hover:shadow-neon hover:-translate-y-1 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden bg-xenova-navy">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 border border-xenova-blue/30 rotate-45 flex items-center justify-center">
                <div className="w-6 h-6 bg-xenova-blue/20 rotate-0" />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-xenova-darker/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div
            className={`absolute top-2 right-2 text-xs font-orbitron tracking-wider ${RARITY_COLORS[rarity] || ""}`}
          >
            ◆ {rarity}
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2 flex-1">
          <span className={`category-badge border self-start ${catColor}`}>
            {category}
          </span>

          <h3 className="font-orbitron text-sm font-bold text-white group-hover:text-xenova-blue transition-colors line-clamp-1">
            {name}
          </h3>

          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 flex-1">
            {description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-xenova-blue/10 pt-2 mt-auto">
            <span className="flex items-center gap-1">
              <span className="text-xenova-blue/60">◉</span> {originPlanet}
            </span>
            <span>Yr {discoveredYear}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
