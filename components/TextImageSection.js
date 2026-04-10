'use client';

export default function TextImageSection() {
  return (
    <section className="text-image">
      <div className="text-image__text">
        <h3 className="text-image__title fade-up">Designed for performance.</h3>
        <h4 className="text-image__subtitle fade-up">Wherever you train.</h4>
        <p className="text-image__body fade-up" style={{ fontSize: 'var(--fs-body)', color: 'var(--mediumgrey)', marginBottom: '32px' }}>
          Driven by data. Designed for progress. Whether you&apos;re riding at home or leading a class, our software
          adapts to your setup — and your goals. With ERG mode at its core, it keeps every rider in the right zone,
          automatically adjusting resistance. Workouts are built to boost VO₂ max, support longevity, and drive
          performance through a smart blend of Zone 2 and high-intensity training.
        </p>
        <div className="button-group fade-up">
          <a href="#" className="btn btn-outline">Tech for home</a>
          <a href="#" className="btn btn-chevron">
            Tech for Business
            <svg viewBox="0 0 10 6" width="10" height="6"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"/></svg>
          </a>
        </div>
      </div>
      <div className="text-image__media">
        <img src="/images/tech-platform.jpg" alt="Energym software platform" loading="lazy" />
      </div>
    </section>
  );
}
