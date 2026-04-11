import { useEffect, useRef } from 'react';

export default function StarField() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const count = 120;
    const stars = [];

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 2 + 0.5;
      star.style.cssText = `
        width:  ${size}px;
        height: ${size}px;
        left:   ${Math.random() * 100}%;
        top:    ${Math.random() * 100}%;
        --duration: ${Math.random() * 4 + 2}s;
        --opacity:  ${Math.random() * 0.8 + 0.2};
        animation-delay: ${Math.random() * 5}s;
      `;
      container.appendChild(star);
      stars.push(star);
    }
    return () => stars.forEach((s) => s.remove());
  }, []);

  return <div ref={ref} className="stars" />;
}
