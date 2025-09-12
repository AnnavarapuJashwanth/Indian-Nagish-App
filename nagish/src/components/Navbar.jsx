// components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';

function AppNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeNavbar = () => setExpanded(false);

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      expanded={expanded}
      onToggle={setExpanded}
      className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className="navbar-brand"
          onClick={closeNavbar}
        >
          <span className="brand-icon">🇮🇳</span>
          <span className="brand-text">Nagish India</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
              onClick={closeNavbar}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/stt" 
              className={location.pathname === '/stt' ? 'active' : ''}
              onClick={closeNavbar}
            >
              Voice → Text
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/tts" 
              className={location.pathname === '/tts' ? 'active' : ''}
              onClick={closeNavbar}
            >
              Text → Voice
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/settings" 
              className={location.pathname === '/settings' ? 'active' : ''}
              onClick={closeNavbar}
            >
              Translation
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;