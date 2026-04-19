'use client';

const logos = [
  { name: 'BBC', src: '/images/logos/bbc.png' },
  { name: 'The Guardian', src: '/images/logos/guardian.png' },
  { name: 'Gymshark', src: '/images/logos/gymshark.png' },
  { name: 'Sweatcoin', src: '/images/logos/sweatcoin.png' },
  { name: 'The Telegraph', src: '/images/logos/telegraph.png' },
  { name: 'Wired', src: '/images/logos/wired.png' },
];

export default function FeaturedIn() {
  return (
    <section className="featured-in" id="featured">
      <p className="featured-in__text fade-up">
        Loved by elite cyclists, rhythm studios and performance riders alike, the RE:GEN is a high-performance smart bike that delivers a real road feel. Featuring precision digital resistance, handlebar gear shifters, instant power zone feedback, and for gyms &mdash; an industry-first, auto-controlled resistance for group cycling. All while generating clean, usable energy.
        <br /><br />
        Train for performance. Train for longevity. Train for the planet.
      </p>
      {/* As featured by section removed per user request */}
    </section>
  );
}
