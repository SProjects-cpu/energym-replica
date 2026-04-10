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
      label: 'RE:GEN FOR HOME',
      textTitle: 'Take Back Your Power',
      links: [
        { text: 'RE:GEN + OHM', img: '/images/product-home.jpg', href: '/pages/regen-ride' },
        { text: 'Add ons', img: '/images/product-home.jpg', href: '/collections/add-ons' }
      ]
    },
    {
      label: 'RE:GEN FOR BUSINESS',
      textTitle: 'Power Up Your Facility',
      links: [
        { text: 'Gyms', img: '/images/product-gym.jpg', href: '/pages/regen-for-business' },
        { text: 'Office', img: '/images/product-office.jpg', href: '/pages/regen-for-the-office' },
        { text: 'Live Events', img: '/images/product-gym.jpg', href: '/pages/live-events' }
      ]
    },
    {
      label: 'MORE',
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
          <svg viewBox="0 0 600.25 55.25" style={{ height: '22px', width: 'auto' }} xmlns="http://www.w3.org/2000/svg">
            {/* The Stylized R and Registration Mark */}
            <path d="M260.11,25.08l9.71,6.92-13.07,4.15,3.36-11.07Z" fill="#00aa13"/>
            <path d="M272.51,4.49l-10.5,7.34,32.15,.06c.55-.01,1.01,.43,1.02,.98,0,.18-.04,.36-.13,.52l-1.31,2.23c-.27,.46-.72,.78-1.25,.89l-31.32,7.4,46.17,31.35-25.49-27.14,14.65-4.62c1.87-.5,3.53-1.57,4.76-3.07l9.38-12.55c.55-.73,.4-1.76-.33-2.31-.28-.21-.62-.33-.96-.33l-36.8-.73h-.02Z" fill="#00aa13"/>
            <path d="M600.25,4.47c0,.61-.12,1.21-.35,1.77-.23,.53-.55,1.02-.96,1.43-.42,.41-.91,.73-1.44,.96-.56,.24-1.17,.36-1.78,.35-.62,0-1.23-.11-1.8-.34-.53-.21-1.02-.53-1.42-.94-.4-.41-.72-.89-.93-1.41-.23-.57-.34-1.18-.33-1.8,0-.61,.11-1.21,.35-1.76,.23-.53,.55-1.02,.96-1.43,.41-.41,.9-.73,1.44-.95,.56-.23,1.17-.35,1.77-.34,.62,0,1.23,.11,1.8,.33,.53,.21,1.02,.53,1.42,.93,.4,.41,.72,.89,.93,1.41,.23,.57,.34,1.18,.33,1.79h0Zm-1.04,.07c0-.51-.08-1.01-.26-1.49-.16-.43-.41-.82-.72-1.15-.31-.32-.68-.57-1.09-.73-.44-.17-.91-.26-1.38-.25-.49,0-.98,.09-1.44,.28-.42,.18-.79,.44-1.1,.76-.31,.32-.55,.71-.71,1.13-.17,.44-.25,.9-.25,1.37,0,.5,.08,1.01,.26,1.48,.16,.43,.41,.82,.72,1.15,.31,.32,.68,.57,1.09,.74,.44,.18,.9,.26,1.38,.26,.5,0,.99-.09,1.44-.28,.83-.36,1.48-1.04,1.8-1.88,.17-.44,.25-.9,.25-1.37h0Zm-1.36,2.11s0,.06-.02,.09c-.01,.03-.04,.05-.08,.06-.07,.02-.13,.02-.2,.03-.08,0-.2,.01-.34,.01-.11,0-.21,0-.32-.01-.07,0-.14-.02-.2-.04-.04-.01-.08-.04-.11-.08-.03-.04-.05-.09-.06-.15l-.24-.8c-.06-.22-.17-.43-.33-.59-.16-.12-.36-.18-.57-.17h-.31v1.62c0,.07-.03,.14-.1,.18-.15,.04-.3,.05-.46,.05-.16,0-.32,0-.47-.05-.07-.02-.12-.1-.11-.18V2.47c0-.14,.04-.29,.13-.4,.1-.1,.24-.16,.38-.15h1.32c.27,0,.54,.02,.81,.08,.21,.05,.42,.13,.6,.25,.16,.11,.29,.26,.37,.43,.09,.19,.13,.41,.13,.62,.02,.32-.09,.63-.3,.86-.22,.22-.5,.37-.81,.43,.19,.07,.37,.17,.52,.31,.19,.19,.33,.41,.42,.66l.28,.74c.04,.11,.07,.22,.08,.33h0Zm-1.43-3.2c0-.08-.01-.16-.03-.24-.02-.08-.07-.15-.14-.2-.08-.06-.16-.11-.26-.13-.13-.03-.27-.05-.41-.05h-.53v1.29h.51c.24,.03,.48-.04,.67-.19,.13-.13,.19-.3,.19-.48h0Z" fill="#fff" />
            {/* The Extracted ENERGYM text paths */}
            <path d="M123.31,35.25h-3.39V16.93c0-1.03-.84-1.86-1.87-1.87h-27.05c-1.03,0-1.87,.83-1.87,1.86h0v18.32h-3.39V16.93c0-2.9,2.36-5.24,5.26-5.24h27.05c2.9,0,5.25,2.35,5.25,5.24v18.32Z" fill="#fff" stroke="#fff" strokeWidth=".5px" />
            <path d="M5.54,15.06H37.8v-3.38H5.54c-2.91,0-5.27,2.34-5.29,5.24v13.09c.02,2.9,2.38,5.24,5.28,5.24H37.8v-3.38H5.53c-1.03,0-1.87-.83-1.87-1.86v-4.5h30.42v-3.38H3.66v-5.2c0-1.03,.85-1.86,1.88-1.86h0Z" fill="#fff" stroke="#fff" strokeWidth=".5px" />
            <path d="M176.54,15.06h32.27v-3.38h-32.27c-2.91,0-5.27,2.34-5.29,5.24v13.09c.02,2.9,2.38,5.24,5.28,5.24h32.28v-3.38h-32.27c-1.03,0-1.87-.83-1.87-1.86v-4.5h30.42v-3.38h-30.42v-5.2c0-1.03,.85-1.86,1.88-1.86h0Z" fill="#fff" stroke="#fff" strokeWidth=".5px" />
            <path d="M364.18,35.25c-1.4,0-2.74-.55-3.74-1.53-.99-.98-1.55-2.32-1.55-3.71v-13.09c.02-2.91,2.38-5.25,5.29-5.24h32.27v3.38h-32.27c-1.03,0-1.87,.83-1.88,1.86h0v13.08c0,.5,.2,.97,.55,1.32,.35,.35,.83,.55,1.33,.55h26.54c1.03,0,1.87-.84,1.88-1.88h0v-5.28h3.42v5.28c-.02,2.91-2.38,5.25-5.29,5.25h-26.54s-.01,0-.01,0Z" fill="#fff" stroke="#fff" strokeWidth=".5px" />
            <path d="M481.94,11.68l-3.45,1.55v3.9c.02,.52-.28,.99-.74,1.21l-14.1,6.78-14.97-6.78-.09-.03c-.48-.21-.78-.69-.76-1.21v-3.87l-3.44-1.55v5.42c-.02,1.94,1.14,3.7,2.93,4.46l14.64,6.63v7.06h3.45v-7.09l13.69-6.59c1.76-.78,2.88-2.54,2.85-4.47v-5.42h0Z" fill="#fff" stroke="#fff" strokeWidth=".5px" />
            <path d="M567.25,16.66c-.1-2.81-2.43-5.03-5.25-4.98h-26.89c-2.85-.02-5.19,2.27-5.23,5.12v18.45h3.39V16.8c0-1.02,.83-1.86,1.85-1.88h11.75v18.01h3.39V14.92h11.74c1.04-.02,1.93,.74,2.06,1.78v18.56h3.2V16.66h0Z" fill="#fff" stroke="#fff" strokeWidth=".5px" />
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
          <a href="/search" className="header__icon" aria-label="Search">
            <svg viewBox="0 0 18 19" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z" fill="currentColor"/></svg>
          </a>
          <a href="/account" className="header__icon" aria-label="Account">
            <svg viewBox="0 0 18 19" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-6.5 9c0-3.5 2.5-6.5 6.5-6.5s6.5 3 6.5 6.5" />
            </svg>
          </a>
          <a href="/cart" className="header__icon header__cart-icon" aria-label="Cart">
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
