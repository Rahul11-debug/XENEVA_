import { useState } from 'react';
import TimelineCard from '../components/TimelineCard';

const ERAS = [
  {
    name: 'Origin',
    period: '~10,000 BXE',
    icon: '◉',
    shortDesc: 'First Xenova emerge on Xerath Prime.',
    description: 'The Xenova species evolved on Xerath Prime, a dense atmospheric world rich in xenon gas. Early civilizations were tribal, dependent on the planet\'s crystal formations for energy. The first signs of organized society appeared around this era, with rudimentary language and tool-making. The violet skies of Xerath Prime became an enduring cultural symbol.',
    color: '#7c3aed',
  },
  {
    name: 'Expansion',
    period: '~5,000 BXE',
    icon: '◈',
    shortDesc: 'Colonization of outer planets begins.',
    description: 'Armed with early faster-than-light travel, the Xenova expanded across their star system, terraforming barren worlds and establishing colonies. Velthar and Keth\'ara were the first to be colonized. This era saw rapid technological advancement, driven by the need to survive hostile environments. The Expansion era also saw the first inter-planetary conflicts as factions competed for resources.',
    color: '#0891b2',
  },
  {
    name: 'Golden Age',
    period: '~1,000 BXE – 500 BXE',
    icon: '★',
    shortDesc: 'Peak of Xenova science and culture.',
    description: 'The pinnacle of Xenova civilization. A unified galactic council governed all six known planets. Science advanced beyond what modern humans can replicate — quantum consciousness transfer, stellar engineering, and bio-mechanical integration became common. The great Xenova works, including the Void Station Omega and the Stellar Navigation Network, were completed during this era. Art and philosophy flourished.',
    color: '#d97706',
  },
  {
    name: 'Decline',
    period: '~500 BXE – 100 BXE',
    icon: '◇',
    shortDesc: 'Internal conflict fractures the civilization.',
    description: 'A series of catastrophic civil wars, triggered by disputes over consciousness transfer ethics, fractured the unified council. Planets broke into warring factions. The conflict escalated to the use of stellar weapons, causing irreversible damage to several worlds. Resources depleted, and the once-thriving trade networks collapsed. Many of the greatest scientific achievements were lost or deliberately destroyed.',
    color: '#dc2626',
  },
  {
    name: 'Extinction',
    period: '~100 BXE',
    icon: '✦',
    shortDesc: 'The final silence falls across Xenova space.',
    description: 'The exact cause of the Xenova extinction remains debated. Leading theories suggest a combination of factors: a self-replicating bio-weapon released during the Decline wars, a rogue stellar engineering project that destabilized Xerath Prime\'s sun, and a pandemic spread via the neural resonance network. Within a century, all known Xenova worlds went silent. Only their artifacts remain — scattered across the galaxy for future civilizations to find.',
    color: '#475569',
  },
];

export default function Timeline() {
  const [activeEra, setActiveEra] = useState(0);

  return (
    <div className="min-h-screen star-bg pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-3">HISTORICAL RECORD</p>
          <h1 className="section-title text-4xl md:text-5xl mb-4">Civilization Timeline</h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            From the first sparks of intelligence on Xerath Prime to their mysterious extinction — 10,000 years of Xenova history.
          </p>
        </div>

        {/* Era selector pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {ERAS.map((era, i) => (
            <button
              key={era.name}
              onClick={() => setActiveEra(i)}
              className={`font-orbitron text-xs tracking-widest px-4 py-2 border rounded transition-all duration-200 ${
                activeEra === i
                  ? 'border-xenova-blue bg-xenova-blue/20 text-xenova-blue shadow-neon'
                  : 'border-xenova-blue/20 text-gray-500 hover:border-xenova-blue/40'
              }`}
            >
              {era.icon} {era.name}
            </button>
          ))}
        </div>

        {/* Timeline line */}
        <div className="relative">
          {/* Vertical center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-xenova-blue/50 via-xenova-blue/20 to-transparent -translate-x-1/2" />

          <div className="space-y-10">
            {ERAS.map((era, i) => (
              <TimelineCard
                key={era.name}
                era={era}
                index={i}
                isActive={activeEra === i}
                onClick={setActiveEra}
              />
            ))}
          </div>
        </div>

        {/* Active era detail panel */}
        <div className="mt-16 glass-card p-8 border-xenova-blue/30 shadow-neon">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{ERAS[activeEra].icon}</span>
            <div>
              <p className="font-orbitron text-xs text-xenova-blue/60 tracking-widest">{ERAS[activeEra].period}</p>
              <h2 className="font-orbitron text-2xl font-bold neon-text">{ERAS[activeEra].name} Era</h2>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">{ERAS[activeEra].description}</p>
        </div>
      </div>
    </div>
  );
}
