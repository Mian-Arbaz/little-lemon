import { useState } from 'react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#reservations', label: 'Reservations' },
  { href: '#contact', label: 'Contact' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#home" className="logo-link" onClick={closeMenu} aria-label="Little Lemon home">
          <svg
            className="logo-mark"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="17" cy="17" r="17" fill="#F4CE14" />
            <path
              d="M12 21c5-1 8-6 6-11-4 1-7 6-6 11Z"
              fill="#495E57"
            />
          </svg>
          <span className="logo-text">Little Lemon</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-bar" aria-hidden="true"></span>
          <span className="nav-toggle-bar" aria-hidden="true"></span>
          <span className="nav-toggle-bar" aria-hidden="true"></span>
        </button>

        <nav aria-label="Primary">
          <ul id="primary-navigation" className={`nav-list ${isMenuOpen ? 'nav-list-open' : ''}`}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
