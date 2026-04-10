'use client';

export default function HeroSection() {
  return (
    <section className="hero" id="hero">
      <video className="hero__video" autoPlay muted playsInline loop poster="/images/hero-poster.jpg">
        <source src="https://cdn.shopify.com/videos/c/o/v/f1192faf982b4bd9bb2fed6b66bb281f.mp4" type="video/mp4" />
      </video>
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title fade-up">The next generation of indoor cycling</h1>
      </div>
      <a href="#featured" className="hero__scroll-indicator" aria-label="Scroll down">
        <svg viewBox="0 0 10 6"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"/></svg>
      </a>
    </section>
  );
}
