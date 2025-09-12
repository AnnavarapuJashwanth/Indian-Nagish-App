// Settings.jsx
import { useState } from "react";
import { Button, Card, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { translateText } from "../services/translateService";
import LanguageSelector from "../components/LanguageSelector";

function Settings() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [selectedLang, setSelectedLang] = useState("hi");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError("Please enter some text to translate!");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const res = await translateText(text, selectedLang);
      setTranslated(res);
    } catch (err) {
      setError("Translation failed. Please try again.");
      console.error("Translation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="custom-card p-4 mb-4 fade-in">
            <h2 className="text-center mb-4 gradient-text">🌐 Translation</h2>
            <p className="text-center text-muted mb-4">
              Translate text between English and various Indian languages.
            </p>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form.Group className="mb-4">
              <Form.Label>Text to Translate</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Type your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="rounded-3"
              />
            </Form.Group>

            <LanguageSelector
              selectedLang={selectedLang}
              onChange={setSelectedLang}
              className="mb-4"
            />

            <div className="d-grid">
              <Button 
                onClick={handleTranslate} 
                disabled={isLoading || !text.trim()}
                size="lg"
              >
                {isLoading ? 'Translating...' : `Translate to ${selectedLang.toUpperCase()}`}
              </Button>
            </div>
          </Card>

          {translated && (
            <Card className="custom-card p-4 fade-in">
              <h5 className="mb-3">Translation Result</h5>
              <Card className="p-3 bg-light rounded-3">
                <p className="mb-0 fs-5">{translated}</p>
              </Card>
              <div className="text-center mt-3">
                <Button 
                  variant="outline-primary" 
                  onClick={() => navigator.clipboard.writeText(translated)}
                >
                  Copy Translation
                </Button>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Settings;