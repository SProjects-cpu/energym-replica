'use client';

const solutions = [
  { label: 'Home', desc: 'The most innovative home fitness bike. Transform your workouts into clean energy.' },
  { label: 'Gym', desc: 'Power-up your facility with our award-winning, studio-grade RE:GEN indoor fitness bike.' },
  { label: 'Office', desc: 'Re:think well-being. Re:define colleague experience. Re:ignite performance.' },
  { label: 'Live Events', desc: 'Electrify your live events with Energym. Game-changing experiences powered by people.' },
];

export default function SolutionsSection() {
  return (
    <section className="solutions-section" id="solutions">
      <div style={{ maxWidth: 'var(--page-width)', margin: '0 auto' }}>
        <div className="solutions-section__header fade-up">
          <h2 className="solutions-section__title">Join the Re:volution</h2>
          <p className="solutions-section__subtitle">Solutions for every environment</p>
        </div>

        <div className="solutions-grid">
          {solutions.map((sol, i) => (
            <a key={i} href="#" className="solution-card fade-up">
              <div className="solution-card__bg">
                <div style={{
                  width: '100%', height: '100%',
                  background: `linear-gradient(${135 + i * 30}deg, #0a0a0a, #1a2a${1 + i}a, #0d${1 + i}d0d)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--ff)', fontSize: '6rem', color: 'rgba(0,170,19,0.15)', textTransform: 'uppercase' }}>
                    {sol.label.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="solution-card__overlay" />
              <div className="solution-card__content">
                <h3 className="solution-card__label">{sol.label}</h3>
                <p className="solution-card__desc">{sol.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
