/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        xenova: {
          dark:    '#010a14',
          darker:  '#000508',
          navy:    '#020e1f',
          blue:    '#00f3ff',
          purple:  '#7c3aed',
          glow:    '#00aaff',
          accent:  '#0ff',
          card:    'rgba(0,20,40,0.7)',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        exo: ['"Exo 2"', 'sans-serif'],
      },
      boxShadow: {
        neon:    '0 0 20px rgba(0,243,255,0.4)',
        neonLg:  '0 0 40px rgba(0,243,255,0.6)',
        purple:  '0 0 20px rgba(124,58,237,0.5)',
      },
      animation: {
        'pulse-slow':  'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'float':       'float 6s ease-in-out infinite',
        'scan':        'scan 2s linear infinite',
        'glow-pulse':  'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 10px rgba(0,243,255,0.3)' },
          '50%':     { boxShadow: '0 0 30px rgba(0,243,255,0.8)' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
