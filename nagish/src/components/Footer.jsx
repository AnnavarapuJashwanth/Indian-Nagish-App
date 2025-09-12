// components/Footer.jsx
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer py-5 mt-5">
      <Container>
        <Row>
          <Col lg={4} className="mb-4">
            <h5 className="d-flex align-items-center">
              <span className="me-2">🇮🇳</span> 
              <span className="text-gradient fw-bold">Nagish India</span>
            </h5>
            <p className="mt-2">Breaking communication barriers with AI-powered speech technology for Indian languages.</p>
            <div className="social-icons mt-3">
              <a href="#" className="me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="me-3"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </Col>
          <Col lg={2} md={4} className="mb-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/stt">Voice to Text</Link></li>
              <li><Link to="/tts">Text to Voice</Link></li>
              <li><Link to="/settings">Translation</Link></li>
            </ul>
          </Col>
          <Col lg={2} md={4} className="mb-4">
            <h6>Support</h6>
            <ul className="list-unstyled">
              <li><a href="/help">Help Center</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </Col>
          <Col lg={4} md={4} className="mb-4">
            <h6>Newsletter</h6>
            <p>Subscribe to our newsletter for the latest updates</p>
            <div className="d-flex">
              <input 
                type="email" 
                className="form-control me-2" 
                placeholder="Your email" 
              />
              <button className="btn btn-gradient">Subscribe</button>
            </div>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Nagish India. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;