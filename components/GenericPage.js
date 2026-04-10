import Link from 'next/link';

export default function GenericPage({ params, type = 'Page' }) {
  // Convert slug to readable title (e.g., 'regen-for-business' -> 'Regen For Business')
  const title = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__subtitle" style={{ color: 'var(--green)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Energym {type}
        </p>
      </div>
      
      <div className="page-content" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Content Coming Soon</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 40px', color: 'var(--mediumgrey)' }}>
          This page is currently a structural placeholder for the <b>{title}</b> route. As part of our iterative replica build, unique page layouts can be specifically built out here in the future.
        </p>
        <Link href="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
