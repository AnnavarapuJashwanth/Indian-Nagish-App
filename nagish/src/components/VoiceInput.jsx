// components/VoiceInput.jsx
import { useState, useEffect } from "react";
import { Button, Spinner, Alert } from "react-bootstrap";
import { sendVoiceToText, isSpeechRecognitionSupported } from "../services/sttService";

function VoiceInput({ onResult, language }) {
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if speech recognition is supported
    setIsSupported(isSpeechRecognitionSupported());
  }, []);

  const handleRecord = async () => {
    try {
      setLoading(true);
      setIsRecording(true);
      const result = await sendVoiceToText(language);
      onResult(result);
    } catch (error) {
      console.error("Voice input error:", error);
      onResult("❌ Error converting speech to text. Please try again.");
    } finally {
      setLoading(false);
      setIsRecording(false);
    }
  };

  if (!isSupported) {
    return (
      <Alert variant="warning" className="text-center">
        <i className="fas fa-exclamation-triangle me-2"></i>
        Speech recognition is not supported in your browser. 
        Please try Chrome, Edge, or another supported browser.
      </Alert>
    );
  }

  return (
    <div className="text-center my-4">
      <Button 
        className={`btn-record ${isRecording ? 'recording' : ''}`}
        onClick={handleRecord} 
        disabled={loading}
      >
        {loading ? (
          <Spinner animation="border" variant="light" size="sm" />
        ) : isRecording ? (
          <i className="fas fa-stop"></i>
        ) : (
          <i className="fas fa-microphone"></i>
        )}
      </Button>
      <p className="mt-2 text-muted">
        {isRecording ? 
          <><i className="fas fa-circle text-danger me-1"></i> Listening... Speak now</> : 
          "Tap to start recording"
        }
      </p>
    </div>
  );
}

export default VoiceInput;