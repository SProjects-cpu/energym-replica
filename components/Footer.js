'use client';

const footerLinks = {
  explore: [
    { text: 'For Business', href: '#' },
    { text: 'For Home', href: '#' },
  ],
  about: [
    { text: 'Our Mission', href: '#' },
    { text: 'Blog', href: '#' },
    { text: 'Press', href: '#' },
    { text: 'Careers', href: '#' },
  ],
  help: [
    { text: 'Contact Us', href: '#' },
    { text: 'Privacy', href: '#' },
    { text: 'Terms', href: '#' },
    { text: 'Refund Policy', href: '#' },
    { text: 'FAQs', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <h4 className="footer__heading">Explore</h4>
          {footerLinks.explore.map((link) => (
            <a key={link.text} href={link.href} className="footer__link">{link.text}</a>
          ))}
        </div>
        <div>
          <h4 className="footer__heading">About us</h4>
          {footerLinks.about.map((link) => (
            <a key={link.text} href={link.href} className="footer__link">{link.text}</a>
          ))}
        </div>
        <div>
          <h4 className="footer__heading">Help</h4>
          {footerLinks.help.map((link) => (
            <a key={link.text} href={link.href} className="footer__link">{link.text}</a>
          ))}
        </div>
        <div>
          <h4 className="footer__heading">Connect with us</h4>
          <div className="footer__socials">
            <a href="https://www.instagram.com/energym.io" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="footer__social-icon" viewBox="0 0 18 18">
                <path fill="currentColor" d="M8.77 1.58c2.34 0 2.62.01 3.54.05.86.04 1.32.18 1.63.3.41.17.7.35 1.01.66.3.3.5.6.65 1 .12.32.27.78.3 1.64.05.92.06 1.2.06 3.54s-.01 2.62-.05 3.54a4.79 4.79 0 01-.3 1.63c-.17.41-.35.7-.66 1.01-.3.3-.6.5-1.01.66-.31.12-.77.26-1.63.3-.92.04-1.2.05-3.54.05s-2.62 0-3.55-.05a4.79 4.79 0 01-1.62-.3c-.42-.16-.7-.35-1.01-.66-.31-.3-.5-.6-.66-1a4.87 4.87 0 01-.3-1.64c-.04-.92-.05-1.2-.05-3.54s0-2.62.05-3.54c.04-.86.18-1.32.3-1.63.16-.41.35-.7.66-1.01.3-.3.6-.5 1-.65.32-.12.78-.27 1.63-.3.93-.05 1.2-.06 3.55-.06zm0-1.58C6.39 0 6.09.01 5.15.05c-.93.04-1.57.2-2.13.4-.57.23-1.06.54-1.55 1.02C1 1.96.7 2.45.46 3.02c-.22.56-.37 1.2-.4 2.13C0 6.1 0 6.4 0 8.77s.01 2.68.05 3.61c.04.94.2 1.57.4 2.13.23.58.54 1.07 1.02 1.56.49.48.98.78 1.55 1.01.56.22 1.2.37 2.13.4.94.05 1.24.06 3.62.06 2.39 0 2.68-.01 3.62-.05.93-.04 1.57-.2 2.13-.41a4.27 4.27 0 001.55-1.01c.49-.49.79-.98 1.01-1.56.22-.55.37-1.19.41-2.13.04-.93.05-1.23.05-3.61 0-2.39 0-2.68-.05-3.62a6.47 6.47 0 00-.4-2.13 4.27 4.27 0 00-1.02-1.55A4.35 4.35 0 0014.52.46a6.43 6.43 0 00-2.13-.41A69 69 0 008.77 0z"/>
                <path fill="currentColor" d="M8.8 4a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.43a2.92 2.92 0 110-5.85 2.92 2.92 0 010 5.85zM13.43 5a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/energym.io" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg className="footer__social-icon" viewBox="0 0 18 18">
                <path fill="currentColor" d="M16.42.61c.27 0 .5.1.69.28.19.2.28.42.28.7v15.44c0 .27-.1.5-.28.69a.94.94 0 01-.7.28h-4.39v-6.7h2.25l.31-2.65h-2.56v-1.7c0-.4.1-.72.28-.93.18-.2.5-.32 1-.32h1.37V3.35c-.6-.06-1.27-.1-2.01-.1-1.01 0-1.83.3-2.45.9-.62.6-.93 1.44-.93 2.53v1.97H7.04v2.65h2.24V18H.98c-.28 0-.5-.1-.7-.28a.94.94 0 01-.28-.7V1.59c0-.27.1-.5.28-.69a.94.94 0 01.7-.28h15.44z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/energym-io" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg className="footer__social-icon" viewBox="0 0 512 512">
                <path fill="currentColor" d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          &copy; 2026 Energym
          <span style={{ color: 'var(--mediumgrey)' }}>|</span>
          <span style={{ fontFamily: 'var(--ff)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '1.1rem' }}>
            GYMSHARK Accelerated
          </span>
        </p>
      </div>
    </footer>
  );
}
