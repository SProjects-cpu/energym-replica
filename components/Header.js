'use client';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 80);
      if (currentY > lastScrollY.current && currentY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'RE:GEN For Home', links: [{ text: 'RE:GEN + Ohm', href: '#' }, { text: 'Accessories', href: '#' }] },
    { label: 'RE:GEN For Business', links: [{ text: 'Gyms', href: '#' }, { text: 'Office', href: '#' }, { text: 'Live Events', href: '#' }] },
    { label: 'More', links: [{ text: 'Mission', href: '#' }, { text: 'Blog', href: '#' }, { text: 'Contact', href: '#' }, { text: 'Team', href: '#' }] },
  ];

  return (
    <div className={`header-wrapper ${isScrolled ? 'solid' : 'transparent'} ${isHidden ? 'hidden' : ''}`}>
      <header className="header">
        <button className="header__menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <svg viewBox="0 0 18 16" fill="none"><path d="M1 .5h15.71M1 7.5h15.71M1 14.5h15.71" stroke="#fff" strokeLinecap="round"/></svg>
        </button>

        <a href="/" className="header__logo" aria-label="Energym Home">
          <svg viewBox="0 0 600 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="40" fill="white" fontFamily="var(--ff)" fontSize="42" fontWeight="400" letterSpacing="8">ENERGYM</text>
            <path d="M260.11,25.08l9.71,6.92-13.07,4.15,3.36-11.07Z" fill="#00aa13"/>
            <path d="M272.51,4.49l-10.5,7.34,32.15,.06c.55-.01,1.01,.43,1.02,.98,0,.18-.04,.36-.13,.52l-1.31,2.23c-.27,.46-.72,.78-1.25,.89l-31.32,7.4,46.17,31.35-25.49-27.14,14.65-4.62c1.87-.5,3.53-1.57,4.76-3.07l9.38-12.55c.55-.73,.4-1.76-.33-2.31-.28-.21-.62-.33-.96-.33l-36.8-.73h-.02Z" fill="#00aa13"/>
          </svg>
        </a>

        <nav className="header__nav">
          {navItems.map((item) => (
            <div key={item.label} className="header__nav-item">
              <span>{item.label}</span>
              <svg viewBox="0 0 10 6"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"/></svg>
            </div>
          ))}
        </nav>

        <div className="header__icons">
          <a href="#" className="header__icon" aria-label="Search">
            <svg viewBox="0 0 18 19" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z" fill="#fff"/></svg>
          </a>
          <a href="#" className="header__icon header__cart-icon" aria-label="Cart">
            <svg viewBox="0 0 46 40" fill="none">
              <polyline points="10.53 8 11 1 1 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <polyline points="7.02 28.6 33.57 28.51 44.53 8 10.53 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <polyline points="26.72 33 6.72 33 6.78 30 10.53 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <ellipse cx="25.67" cy="36" rx="3.38" ry="2.66" stroke="#fff" strokeWidth="2" fill="none"/>
              <ellipse cx="10.67" cy="35.99" rx="3.38" ry="2.66" stroke="#fff" strokeWidth="2" fill="none"/>
            </svg>
          </a>
        </div>
      </header>
    </div>
  );
}
