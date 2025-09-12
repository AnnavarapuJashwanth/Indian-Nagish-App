// pages/Home.jsx
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="py-5 mb-5">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} className="slide-in-left">
              <h1 className="display-4 fw-bold mb-4">
                Accessible communication <span className="text-gradient">at your fingertips</span>
              </h1>
              <p className="lead mb-4">
                Nagish India uses artificial intelligence to convert text-to-speech and speech-to-text in real time for multiple Indian languages. Our tech makes it easy to communicate without hearing or speaking barriers.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button as={Link} to="/stt" size="lg" className="btn-gradient">
                  Start Converting Voice
                </Button>
                <Button as={Link} to="/tts" variant="outline-primary" size="lg">
                  Convert Text to Speech
                </Button>
              </div>
            </Col>
            <Col lg={6} className="slide-in-right">
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Communication" 
                  className="img-fluid rounded-4 shadow-lg" 
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 mb-5">
        <Container>
          <h2 className="text-center mb-5">How Nagish India Helps You Communicate</h2>
          <Row>
            <Col md={4} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-microphone-alt"></i>
                </div>
                <h4>Voice to Text</h4>
                <p>Convert spoken words into text in real-time with support for multiple Indian languages and accents.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-keyboard"></i>
                </div>
                <h4>Text to Voice</h4>
                <p>Type your message and have it spoken aloud in a natural-sounding voice in your preferred language.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-globe-asia"></i>
                </div>
                <h4>Multi-language Support</h4>
                <p>Supports Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, and other Indian regional languages.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 mb-5">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <h2 className="text-gradient display-4 fw-bold">10+</h2>
                <p className="text-muted">Indian Languages</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <h2 className="text-gradient display-4 fw-bold">95add%</h2>
                <p className="text-muted">Accuracy</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <h2 className="text-gradient display-4 fw-bold">17K+</h2>
                <p className="text-muted">Users</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <h2 className="text-gradient display-4 fw-bold">24/7</h2>
                <p className="text-muted">Support</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-5">
        <Container>
          <Card className="custom-card text-center p-5 bg-gradient text-white">
            <Card.Body>
              <h2 className="mb-3">Start Communicating Without Barriers</h2>
              <p className="mb-4">Join thousands of users who are using Nagish India to break down communication barriers.</p>
              <Button as={Link} to="/stt" size="lg" variant="light" className="rounded-pill px-4">
                Get Started Free
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </div>
  );
}

export default Home;