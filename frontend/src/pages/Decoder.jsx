import { useState } from 'react';

const ALIEN_MAP = {
  A:'∆', B:'β', C:'¢', D:'Ð', E:'⊕', F:'ƒ', G:'ɠ', H:'ħ',
  I:'ι', J:'ʝ', K:'ķ', L:'ʟ', M:'ɱ', N:'ŋ', O:'θ', P:'ρ',
  Q:'φ', R:'я', S:'ϟ', T:'†', U:'υ', V:'√', W:'ω', X:'χ',
  Y:'ψ', Z:'ζ',
  a:'α', b:'ƀ', c:'ç', d:'δ', e:'ε', f:'φ', g:'ɡ', h:'η',
  i:'ï', j:'ȷ', k:'κ', l:'λ', m:'μ', n:'η', o:'ø', p:'π',
  q:'ɋ', r:'ŗ', s:'σ', t:'τ', u:'ü', v:'ν', w:'ŵ', x:'ξ',
  y:'γ', z:'ʐ',
  ' ':' ', '.':'·', ',':'‚', '!':'¡', '?':'¿',
  '0':'⓪','1':'①','2':'②','3':'③','4':'④',
  '5':'⑤','6':'⑥','7':'⑦','8':'⑧','9':'⑨',
};

const REFERENCE_TABLE = [
  ['A','∆'],['B','β'],['C','¢'],['D','Ð'],['E','⊕'],['F','ƒ'],['G','ɠ'],['H','ħ'],
  ['I','ι'],['J','ʝ'],['K','ķ'],['L','ʟ'],['M','ɱ'],['N','ŋ'],['O','θ'],['P','ρ'],
  ['Q','φ'],['R','я'],['S','ϟ'],['T','†'],['U','υ'],['V','√'],['W','ω'],['X','χ'],
  ['Y','ψ'],['Z','ζ'],
];

const PRESET_PHRASES = [
  'Hello World',
  'Xenova Archive',
  'The Golden Age',
  'We are the last',
  'Seek the truth beyond the stars',
];

function encode(text) {
  return text.split('').map(ch => ALIEN_MAP[ch] ?? ch).join('');
}

export default function Decoder() {
  const [input, setInput]   = useState('');
  const [copied, setCopied] = useState(false);

  const output = encode(input);

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen star-bg pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-3">
            LINGUISTIC ANALYSIS SYSTEM
          </p>
          <h1 className="section-title text-4xl md:text-5xl mb-4">Alien Language Decoder</h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Translate human text into ancient Xenova glyphs. The Xenova language uses a
            symbolic alphabet derived from quantum waveform patterns.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {PRESET_PHRASES.map(p => (
            <button
              key={p}
              onClick={() => setInput(p)}
              className="text-xs font-orbitron tracking-wider border border-xenova-blue/20
                         text-gray-400 hover:border-xenova-blue/50 hover:text-xenova-blue
                         px-3 py-1.5 rounded transition-all"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Input */}
          <div className="glass-card p-1 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-xenova-blue/10">
              <span className="font-orbitron text-xs text-gray-500 tracking-widest">HUMAN TEXT</span>
              <button
                onClick={() => setInput('')}
                className="text-xs text-gray-600 hover:text-red-400 transition-colors font-orbitron"
              >
                CLEAR
              </button>
            </div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message here..."
              rows={7}
              className="bg-transparent px-4 py-3 text-white placeholder-gray-700
                         focus:outline-none resize-none text-base leading-relaxed flex-1"
            />
            <div className="px-4 py-2 border-t border-xenova-blue/10 text-right">
              <span className="text-xs text-gray-600 font-orbitron">{input.length} CHARS</span>
            </div>
          </div>

          <div className="glass-card p-1 flex flex-col border-xenova-blue/30">
            <div className="flex items-center justify-between px-4 py-2 border-b border-xenova-blue/10">
              <span className="font-orbitron text-xs text-xenova-blue/70 tracking-widest">XENOVA GLYPHS</span>
              <button
                onClick={copy}
                className={`text-xs font-orbitron transition-colors ${
                  copied ? 'text-green-400' : 'text-gray-600 hover:text-xenova-blue'
                }`}
              >
                {copied ? 'COPIED ✓' : 'COPY'}
              </button>
            </div>
            <div className="px-4 py-3 flex-1 text-xenova-blue text-2xl leading-relaxed tracking-wider min-h-[168px]
                            overflow-auto break-all select-all"
                 style={{ textShadow: '0 0 8px rgba(0,243,255,0.5)' }}>
              {output || (
                <span className="text-gray-700 text-base font-exo">
                  Alien glyphs will appear here...
                </span>
              )}
            </div>
            {output && (
              <div className="px-4 py-2 border-t border-xenova-blue/10">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-gradient-to-r from-xenova-blue/40 to-transparent" />
                  <span className="text-xs text-xenova-blue/50 font-orbitron tracking-widest">TRANSMISSION ENCODED</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-xenova-blue/40 to-transparent" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="font-orbitron text-sm text-xenova-blue/70 tracking-widest mb-5 text-center">
            XENOVA ALPHABET REFERENCE TABLE
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-px bg-xenova-blue/10 rounded overflow-hidden">
            {REFERENCE_TABLE.map(([eng, alien]) => (
              <div
                key={eng}
                className="bg-xenova-darker flex flex-col items-center py-3 gap-1
                           hover:bg-xenova-blue/10 transition-colors cursor-default"
              >
                <span className="text-gray-400 font-orbitron text-xs">{eng}</span>
                <span className="text-xenova-blue text-xl" style={{ textShadow: '0 0 6px rgba(0,243,255,0.4)' }}>
                  {alien}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-600 font-orbitron mt-4 tracking-widest">
            26 GLYPHS · XENOVA STANDARD ENCODING v3.7
          </p>
        </div>

      </div>
    </div>
  );
}
