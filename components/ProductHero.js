'use client';

export default function ProductHero({
  subtitle,
  title,
  primaryBtn,
  secondaryBtn,
  bgImage,
  usps = [],
  variant = 'default',
  children,
}) {
  return (
    <section className={`product-hero ${variant === 'fade' ? 'product-hero--fade' : ''}`}>
      <div className="product-hero__bg">
        <img src={bgImage} alt={title} loading="lazy" />
      </div>

      <div className="product-hero__content">
        <h5 className="product-hero__subtitle fade-up">{subtitle}</h5>
        <h2 className="product-hero__title fade-up">{title}</h2>
        <div className="button-group fade-up">
          {primaryBtn && (
            <a href={primaryBtn.href} className="btn btn-ghost">{primaryBtn.label}</a>
          )}
          {secondaryBtn && (
            <a href={secondaryBtn.href} className="btn btn-chevron">
              {secondaryBtn.label}
              <svg viewBox="0 0 10 6" width="10" height="6"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"/></svg>
            </a>
          )}
        </div>
      </div>

      {usps.length > 0 && (
        <div className="product-hero__usps" style={{ padding: '24px var(--page-padding)' }}>
          {usps.map((usp, i) => (
            <div key={i} className="product-hero__usp fade-up">
              <svg viewBox="0 0 64 64" width="48" height="48">
                <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" fill="none" />
                <text x="32" y="36" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--ff3)">{i + 1}</text>
              </svg>
              <span>{usp}</span>
            </div>
          ))}
        </div>
      )}

      {children}
    </section>
  );
}
