'use client';

const articles = [
  { date: '10 Jul 2025', title: 'London\'s First Energy-Generating Spin Studio is Coming' },
  { date: '10 Jul 2025', title: 'Pedalling Towards a Greener, Smarter Gym Experience' },
  { date: '20 Jun 2025', title: 'How Indoor Cycling Boosts Longevity and Aids Rehabilitation' },
  { date: '21 May 2025', title: 'Bringing ERG Mode to Studio Cycling — A Game-Changer for Gyms' },
  { date: '12 May 2025', title: 'Mastering Your Home Cycling Pedalling Technique' },
  { date: '30 Apr 2025', title: 'How Indoor Cycling Drives Retention and Revenue in Gyms' },
];

export default function NewsSection() {
  return (
    <section className="news-section" id="news">
      <div style={{ maxWidth: 'var(--page-width)', margin: '0 auto' }}>
        <div className="news-section__header">
          <h2 className="news-section__title fade-up">News</h2>
          <a href="#" className="news-section__link fade-up">
            All Articles
            <svg viewBox="0 0 10 6" width="10" height="6"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor" /></svg>
          </a>
        </div>

        <div className="news-grid">
          {articles.slice(0, 3).map((article, i) => (
            <a key={i} href="#" className="news-card fade-up">
              <div className="news-card__image" style={{ background: `linear-gradient(135deg, #1a1a2e ${i * 10}%, #16213e 100%)` }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--ff)', fontSize: '3rem', color: 'rgba(0,170,19,0.3)', textTransform: 'uppercase' }}>E</span>
                </div>
              </div>
              <div className="news-card__body">
                <p className="news-card__date">{article.date}</p>
                <h3 className="news-card__title">{article.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
