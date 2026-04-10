'use client';
import { useEffect, useRef, useState } from 'react';

function CounterNumber({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();
          const step = (timestamp) => {
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const formatted = count.toLocaleString();
  return (
    <span ref={ref} className="stat-card__number">
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const stats = [
    { number: 8, suffix: '', label: 'Billion People' },
    { number: 1600, suffix: '', label: 'GWh of Clean Power Per Day' },
    { number: 760000, prefix: '', suffix: '', label: 'Tonnes of Carbon Saving Potential' },
  ];

  return (
    <section className="stats-section">
      <div className="stats-section__overlay" style={{ background: 'linear-gradient(180deg, #000 0%, #0a1a0a 50%, #000 100%)' }} />
      <div className="stats-section__content">
        <p className="stats-section__label fade-up">Power Potential</p>
        <h2 className="stats-section__title fade-up">Human Power: ON</h2>
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card fade-up">
              <CounterNumber target={stat.number} suffix={stat.suffix} prefix={stat.prefix || ''} />
              <p className="stat-card__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
