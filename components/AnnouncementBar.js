'use client';

export default function AnnouncementBar() {
  return (
    <details className="announcement-bar" style={{ background: 'var(--green)', border: 'none' }}>
      <summary className="announcement-bar__summary" style={{ color: 'var(--white)' }}>
        <span style={{ fontWeight: 500 }}>573,000 WATT HOURS GENERATED</span>
        <svg aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 10 6" style={{ color: 'var(--white)' }}>
          <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></path>
        </svg>
      </summary>
      <div className="announcement-bar__content" style={{ backgroundImage: 'url(/images/product-gym.jpg)' }}>
        <div className="stat-number">
          <span>573,000</span>
        </div>
        <h3 style={{ fontSize: '1.6rem', color: 'var(--white)', marginTop: '12px' }}>Watt hours of clean energy generated with Energym</h3>
        <p style={{ color: 'var(--mediumgrey)', marginTop: '12px', fontSize: '1.3rem' }}>Learn how we&apos;re aiming to be Carbon Zero</p>
        <a href="#" className="btn btn-primary" style={{ marginTop: '24px' }}>Our Mission</a>
      </div>
    </details>
  );
}
