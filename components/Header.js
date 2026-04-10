'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const lastScrollY = useRef(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 80);
      if (currentY > lastScrollY.current && currentY > 200) {
        setIsHidden(true);
        setOpenDropdown(null); // Close menus on scroll down
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (label, e) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const navItems = [
    {
      label: 'RE:GEN For Home',
      textTitle: 'Take Back Your Power',
      links: [
        { text: 'RE:GEN + OHM', img: '/images/product-home.jpg', href: '/pages/regen-ride' },
        { text: 'Add ons', img: '/images/product-home.jpg', href: '/collections/add-ons' }
      ]
    },
    {
      label: 'RE:GEN For Business',
      textTitle: 'Power Up Your Facility',
      links: [
        { text: 'Gyms', img: '/images/product-gym.jpg', href: '/pages/regen-for-business' },
        { text: 'Office', img: '/images/product-office.jpg', href: '/pages/regen-for-the-office' },
        { text: 'Live Events', img: '/images/product-gym.jpg', href: '/pages/live-events' }
      ]
    },
    {
      label: 'More',
      textTitle: 'Turn Human Power:ON',
      links: [
        { text: 'Mission', img: '/images/tech-platform.jpg', href: '/pages/our-mission' },
        { text: 'Brain Gains', img: '/images/tech-platform.jpg', href: '/blogs/braingains' },
        { text: 'Invest', img: '/images/tech-platform.jpg', href: '/pages/invest' },
        { text: 'Contact', img: '/images/tech-platform.jpg', href: '/pages/contact-us' },
        { text: 'Customer Support', img: '/images/tech-platform.jpg', href: '/pages/support' },
        { text: 'Team', img: '/images/tech-platform.jpg', href: '/pages/who-we-are' }
      ]
    }
  ];

  return (
    <div className={`header-wrapper ${isScrolled ? 'solid' : 'transparent'} ${isHidden ? 'hidden' : ''} ${openDropdown ? 'menu-open' : ''}`} ref={headerRef}>
      <header className="header">
        <button className="header__menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <svg viewBox="0 0 18 16" fill="none"><path d="M1 .5h15.71M1 7.5h15.71M1 14.5h15.71" stroke="#fff" strokeLinecap="round"/></svg>
        </button>

        <Link href="/" className="header__logo" aria-label="Energym Home" onClick={() => setOpenDropdown(null)}>
          <svg viewBox="0 0 600 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="40" fill={openDropdown ? 'var(--black)' : 'white'} fontFamily="var(--ff)" fontSize="42" fontWeight="400" letterSpacing="8">ENERGYM</text>
            <path d="M260.11,25.08l9.71,6.92-13.07,4.15,3.36-11.07Z" fill="#00aa13"/>
            <path d="M272.51,4.49l-10.5,7.34,32.15,.06c.55-.01,1.01,.43,1.02,.98,0,.18-.04,.36-.13,.52l-1.31,2.23c-.27,.46-.72,.78-1.25,.89l-31.32,7.4,46.17,31.35-25.49-27.14,14.65-4.62c1.87-.5,3.53-1.57,4.76-3.07l9.38-12.55c.55-.73,.4-1.76-.33-2.31-.28-.21-.62-.33-.96-.33l-36.8-.73h-.02Z" fill="#00aa13"/>
          </svg>
        </Link>

        <nav className={`header__nav ${mobileOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <details key={item.label} className="nav-details" open={openDropdown === item.label}>
              <summary className="header__nav-item" onClick={(e) => toggleDropdown(item.label, e)}>
                <span>{item.label}</span>
                <svg className="icon-caret" viewBox="0 0 10 6"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"/></svg>
              </summary>
              <div className="mega-menu-content">
                <div className="mega-menu-wrap">
                  <div className="mega-menu__text">
                    <h3>{item.textTitle}</h3>
                    <div className="nav-socials">
                      <h5>Follow us</h5>
                      <div className="social-icons">
                        <a href="#"><svg className="icon" viewBox="0 0 18 18"><path fill="currentColor" d="M8.77 1.58c2.34 0 2.62.01 3.54.05.86.04 1.32.18 1.63.3.41.17.7.35 1.01.66.3.3.5.6.65 1 .12.32.27.78.3 1.64.05.92.06 1.2.06 3.54s-.01 2.62-.05 3.54a4.79 4.79 0 01-.3 1.63c-.17.41-.35.7-.66 1.01-.3.3-.6.5-1.01.66-.31.12-.77.26-1.63.3-.92.04-1.2.05-3.54.05s-2.62 0-3.55-.05a4.79 4.79 0 01-1.62-.3c-.42-.16-.7-.35-1.01-.66-.31-.3-.5-.6-.66-1a4.87 4.87 0 01-.3-1.64c-.04-.92-.05-1.2-.05-3.54s0-2.62.05-3.54c.04-.86.18-1.32.3-1.63.16-.41.35-.7.66-1.01.3-.3.6-.5 1-.65.32-.12.78-.27 1.63-.3.93-.05 1.2-.06 3.55-.06zm0-1.58C6.39 0 6.09.01 5.15.05c-.93.04-1.57.2-2.13.4-.57.23-1.06.54-1.55 1.02C1 1.96.7 2.45.46 3.02c-.22.56-.37 1.2-.4 2.13C0 6.1 0 6.4 0 8.77s.01 2.68.05 3.61c.04.94.2 1.57.4 2.13.23.58.54 1.07 1.02 1.56.49.48.98.78 1.55 1.01.56.22 1.2.37 2.13.4.94.05 1.24.06 3.62.06 2.39 0 2.68-.01 3.62-.05.93-.04 1.57-.2 2.13-.41a4.27 4.27 0 001.55-1.01c.49-.49.79-.98 1.01-1.56.22-.55.37-1.19.41-2.13.04-.93.05-1.23.05-3.61 0-2.39 0-2.68-.05-3.62a6.47 6.47 0 00-.4-2.13 4.27 4.27 0 00-1.02-1.55A4.35 4.35 0 0014.52.46a6.43 6.43 0 00-2.13-.41A69 69 0 008.77 0z"/><path fill="currentColor" d="M8.8 4a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.43a2.92 2.92 0 110-5.85 2.92 2.92 0 010 5.85zM13.43 5a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1z"/></svg></a>
                        <a href="#"><svg className="icon" viewBox="0 0 18 18"><path fill="currentColor" d="M16.42.61c.27 0 .5.1.69.28.19.2.28.42.28.7v15.44c0 .27-.1.5-.28.69a.94.94 0 01-.7.28h-4.39v-6.7h2.25l.31-2.65h-2.56v-1.7c0-.4.1-.72.28-.93.18-.2.5-.32 1-.32h1.37V3.35c-.6-.06-1.27-.1-2.01-.1-1.01 0-1.83.3-2.45.9-.62.6-.93 1.44-.93 2.53v1.97H7.04v2.65h2.24V18H.98c-.28 0-.5-.1-.7-.28a.94.94 0 01-.28-.7V1.59c0-.27.1-.5.28-.69a.94.94 0 01.7-.28h15.44z"/></svg></a>
                      </div>
                    </div>
                  </div>
                  <div className="mega-menu__links">
                    {item.links.map((link, i) => (
                      <Link key={i} href={link.href} className="mega-menu__card" onClick={() => setOpenDropdown(null)}>
                        <img src={link.img} alt={link.text} loading="lazy" />
                        <span>{link.text}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </details>
          ))}
        </nav>

        <div className="header__icons">
          <a href="#" className="header__icon" aria-label="Search">
            <svg viewBox="0 0 18 19" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z" fill="currentColor"/></svg>
          </a>
          <a href="#" className="header__icon header__cart-icon" aria-label="Cart">
            <svg viewBox="0 0 46 40" fill="none">
              <polyline points="10.53 8 11 1 1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <polyline points="7.02 28.6 33.57 28.51 44.53 8 10.53 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <polyline points="26.72 33 6.72 33 6.78 30 10.53 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <ellipse cx="25.67" cy="36" rx="3.38" ry="2.66" stroke="currentColor" strokeWidth="2" fill="none"/>
              <ellipse cx="10.67" cy="35.99" rx="3.38" ry="2.66" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </a>
        </div>
      </header>
    </div>
  );
}
