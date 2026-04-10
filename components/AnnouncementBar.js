'use client';

export default function AnnouncementBar() {
  return (
    <details className="announcement-bar">
      <summary className="announcement-bar__summary">
        <span>573,000 Watt Hours Generated</span>
        <svg viewBox="0 0 10 6"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"/></svg>
      </summary>
      <div className="announcement-bar__content" style={{ backgroundImage: 'linear-gradient(135deg, #0a0a0a 0%, #1a2a1a 100%)' }}>
        <div className="stat-number">573,000</div>
        <h3 style={{ fontSize: '1.6rem', color: 'var(--white)', marginTop: '12px' }}>Watt hours of clean energy generated with Energym</h3>
        <p style={{ color: 'var(--mediumgrey)', marginTop: '12px', fontSize: '1.3rem' }}>Learn how we&apos;re aiming to be Carbon Zero</p>
        <a href="#" className="btn btn-primary" style={{ marginTop: '24px' }}>Our Mission</a>
      </div>
    </details>
  );
}
