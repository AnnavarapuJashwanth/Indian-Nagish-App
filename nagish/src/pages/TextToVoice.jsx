// TextToVoice.jsx
import { useState, useRef } from "react";
import { Button, Card, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { convertTextToSpeech } from "../services/ttsService";
import LanguageSelector from "../components/LanguageSelector";

function TextToVoice() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("hi-IN");
  const [error, setError] = useState("");
  const audioRef = useRef(null);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please enter some text first!");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const url = await convertTextToSpeech(text, selectedLang);
      setAudioUrl(url);
    } catch (err) {
      setError("Error generating speech. Please try again.");
      console.error("TTS error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="custom-card p-4 mb-4 fade-in">
            <h2 className="text-center mb-4 gradient-text">📝 Text to Voice</h2>
            <p className="text-center text-muted mb-4">
              Type your message and hear it spoken in your preferred Indian language.
            </p>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <LanguageSelector 
              selectedLang={selectedLang} 
              onChange={setSelectedLang}
              className="mb-4"
            />
            
            <Form.Group className="mb-4">
              <Form.Label>Enter Text to Convert</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Type your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="rounded-3"
                style={{ resize: 'none' }}
              />
              <Form.Text className="text-muted">
                {text.length} characters
              </Form.Text>
            </Form.Group>
            
            <div className="d-grid">
              <Button 
                onClick={handleSubmit} 
                disabled={isLoading || !text.trim()}
                size="lg"
              >
                {isLoading ? 'Generating Speech...' : 'Convert to Speech'}
              </Button>
            </div>
          </Card>
          
          {audioUrl && (
            <Card className="custom-card p-4 fade-in">
              <h5 className="mb-3">Generated Audio</h5>
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <audio ref={audioRef} controls src={audioUrl} className="flex-grow-1"></audio>
                <Button 
                  variant="outline-primary" 
                  onClick={handlePlay}
                  className="d-flex align-items-center"
                >
                  <span className="me-2">▶️</span> Play
                </Button>
                <Button 
                  variant="outline-secondary"
                  as="a"
                  href={audioUrl}
                  download="speech.mp3"
                  className="d-flex align-items-center"
                >
                  <span className="me-2">💾</span> Download
                </Button>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default TextToVoice;