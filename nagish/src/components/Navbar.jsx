// components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/stt',      label: 'Voice to Text' },
  { to: '/tts',      label: 'Text to Voice' },
  { to: '/settings', label: 'Language Translation' },
];

function AppNavbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`ni-nav ${scrolled ? 'ni-nav--scrolled' : ''}`}>
      <div className="ni-nav__inner">

        {/* Logo */}
        <Link to="/" className="ni-nav__logo" onClick={() => setMenuOpen(false)}>
          <span className="ni-nav__logo-icon">🇮🇳</span>
          <span className="ni-nav__logo-text">Nagish India</span>
        </Link>

        {/* Desktop links */}
        <nav className="ni-nav__links">
          {NAV_LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`ni-nav__link ${location.pathname === l.to ? 'ni-nav__link--active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className={`ni-nav__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="ni-nav__mobile">
          {NAV_LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`ni-nav__mobile-link ${location.pathname === l.to ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default AppNavbar;