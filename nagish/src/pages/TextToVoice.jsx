// TextToVoice.jsx - Uses free browser Web Speech Synthesis API
import { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { convertTextToSpeech, loadVoices } from "../services/ttsService";
import LanguageSelector from "../components/LanguageSelector";

function TextToVoice() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLang, setSelectedLang] = useState("hi-IN");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Preload voices on mount
    if (window.speechSynthesis) loadVoices();
    return () => {
      // Stop any speech on unmount
      window.speechSynthesis?.cancel();
    };
  }, []);

  const handleSpeak = async () => {
    if (!text.trim()) {
      setError("Please enter some text first!");
      return;
    }

    setError("");
    setSuccess("");
    setIsSpeaking(true);

    try {
      await convertTextToSpeech(text, selectedLang);
      setSuccess("🔊 Speaking... Listen carefully!");

      // Wait for speech to finish
      const checkSpeaking = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          setIsSpeaking(false);
          clearInterval(checkSpeaking);
        }
      }, 300);
    } catch (err) {
      setError("Error generating speech. Please try again.");
      setIsSpeaking(false);
      console.error("TTS error:", err);
    }
  };

  const handleStop = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setSuccess("");
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
            {success && <Alert variant="success">{success}</Alert>}

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
                style={{ resize: "none" }}
              />
              <Form.Text className="text-muted">{text.length} characters</Form.Text>
            </Form.Group>

            <div className="d-flex gap-3">
              <Button
                onClick={handleSpeak}
                disabled={isSpeaking || !text.trim()}
                size="lg"
                className="flex-grow-1"
              >
                {isSpeaking ? "🔊 Speaking..." : "▶️ Convert to Speech"}
              </Button>
              {isSpeaking && (
                <Button
                  onClick={handleStop}
                  variant="outline-danger"
                  size="lg"
                >
                  ⏹ Stop
                </Button>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TextToVoice;