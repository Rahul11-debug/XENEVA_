export default function TimelineCard({ era, index, isActive, onClick }) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex items-start gap-4 cursor-pointer group transition-all duration-300 ${
        isEven ? 'flex-row' : 'flex-row-reverse'
      }`}
      onClick={() => onClick(index)}
    >
      <div className={`flex-1 transition-all duration-500 ${isEven ? 'text-right' : 'text-left'}`}>
        <div className={`glass-card p-5 inline-block max-w-sm transition-all duration-300 ${
          isActive
            ? 'border-xenova-blue/60 shadow-neon'
            : 'hover:border-xenova-blue/30 hover:shadow-neon'
        }`}>
          <div className={`flex items-center gap-2 mb-2 ${isEven ? 'flex-row-reverse' : ''}`}>
            <span className="text-2xl">{era.icon}</span>
            <span className={`text-xs font-orbitron tracking-widest ${
              isActive ? 'text-xenova-blue' : 'text-xenova-blue/50'
            }`}>
              {era.period}
            </span>
          </div>
          <h3 className={`font-orbitron text-lg font-bold mb-2 transition-colors ${
            isActive ? 'text-xenova-blue' : 'text-white group-hover:text-xenova-blue'
          }`}>
            {era.name}
          </h3>
          {isActive && (
            <p className="text-gray-300 text-sm leading-relaxed animate-pulse-slow">
              {era.description}
            </p>
          )}
          {!isActive && (
            <p className="text-gray-500 text-sm">{era.shortDesc}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-0 flex-shrink-0">
        <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
          isActive
            ? 'border-xenova-blue bg-xenova-blue shadow-neon scale-125'
            : 'border-xenova-blue/40 bg-xenova-darker group-hover:border-xenova-blue'
        }`}>
          {isActive && <div className="w-2 h-2 rounded-full bg-white animate-ping" />}
        </div>
      </div>

      <div className="flex-1" />
    </div>
  );
}
