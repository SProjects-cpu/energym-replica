'use client';

import FitnessQuiz from './FitnessQuiz';

export default function HeroSection() {
  return (
    <section className="hero" id="hero">
      <video className="hero__video" autoPlay muted playsInline loop poster="/images/hero-poster.jpg">
        <source src="https://cdn.shopify.com/videos/c/o/v/f1192faf982b4bd9bb2fed6b66bb281f.mp4" type="video/mp4" />
      </video>
      <div className="hero__overlay" style={{ background: "rgba(0,0,0,0.4)" }} />
      <FitnessQuiz />
    </section>
  );
}
