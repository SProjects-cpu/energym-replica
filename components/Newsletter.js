'use client';

export default function Newsletter() {
  return (
    <section className="newsletter" id="newsletter">
      <h3 className="newsletter__title fade-up">Knowledge is Power</h3>
      <p className="newsletter__desc fade-up">
        Find out first about company updates, product announcements, special offers and more.
      </p>
      <form className="newsletter__form fade-up" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          className="newsletter__input"
          placeholder="Email"
          aria-label="Email address"
          required
        />
        <button type="submit" className="newsletter__submit">Subscribe</button>
      </form>
    </section>
  );
}
