// pages/VoiceToText.jsx
import { useState, useRef } from "react";
import { Button, Card, Form, Container, Row, Col, Alert, Spinner, ProgressBar } from "react-bootstrap";
import { convertSpeechToText, getAudioDuration } from "../services/sttService";
import VoiceInput from "../components/VoiceInput";
import TextOutput from "../components/TextOutput";
import LanguageSelector from "../components/LanguageSelector";

function VoiceToText() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleResult = (text) => {
    setResult(text);
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setResult(""); // Clear previous results
      setError(""); // Clear previous errors
      
      // Get file info
      const duration = await getAudioDuration(file);
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2),
        type: file.type,
        duration: duration ? `${duration.toFixed(1)} seconds` : 'Unknown'
      });
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setError("Please select an audio file first!");
      return;
    }
    
    setIsLoading(true);
    setError("");
    setProgress(0);
    
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          // Simulate progress
          const interval = setInterval(() => {
            setProgress(prev => {
              if (prev >= 90) {
                clearInterval(interval);
                return prev;
              }
              return prev + 10;
            });
          }, 300);
          
          const base64Audio = reader.result.split(",")[1];
          const response = await convertSpeechToText(base64Audio, selectedLang);
          
          clearInterval(interval);
          setProgress(100);
          
          if (response.success) {
            setResult(response.text);
          } else {
            setError(response.text);
          }
        } catch (err) {
          console.error("Conversion error:", err);
          setError("Error processing the audio file. Please try again.");
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      console.error("File reading error:", err);
      setError("Error reading the file. Please try again.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setFileInfo(null);
    setResult("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="custom-card p-4 mb-4 fade-in">
            <h2 className="text-center mb-4 gradient-text">
              <i className="fas fa-microphone-alt me-2"></i>
              Voice to Text
            </h2>
            <p className="text-center text-muted mb-4">
              Convert spoken words into text. Speak naturally or upload an audio file.
            </p>
            
            {error && (
              <Alert variant="danger" className="d-flex align-items-center">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {error}
              </Alert>
            )}
            
            <LanguageSelector 
              selectedLang={selectedLang} 
              onChange={setSelectedLang}
              className="mb-4"
            />
            
            <div className="text-center mb-4">
              <VoiceInput onResult={handleResult} language={selectedLang} />
            </div>
            
            <div className="text-center mb-4">
              <p className="text-muted mb-3">Or upload an audio file</p>
              
              <Form.Group className="mb-3">
                <Form.Label className="btn btn-outline-primary rounded-pill">
                  <i className="fas fa-upload me-2"></i>
                  Choose Audio File
                  <Form.Control 
                    ref={fileInputRef}
                    type="file" 
                    accept="audio/*"
                    onChange={handleFileSelect}
                    disabled={isLoading}
                    style={{ display: 'none' }}
                  />
                </Form.Label>
                <Form.Text className="d-block text-muted mt-2">
                  Supported formats: MP3, WAV, OGG, M4A
                </Form.Text>
              </Form.Group>
              
              {fileInfo && (
                <div className="my-3 p-3 bg-light rounded-3">
                  <h6 className="mb-3">
                    <i className="fas fa-file-audio text-primary me-2"></i>
                    Selected File Details
                  </h6>
                  <div className="row text-start">
                    <div className="col-6">
                      <strong>Name:</strong> {fileInfo.name}
                    </div>
                    <div className="col-6">
                      <strong>Size:</strong> {fileInfo.size} KB
                    </div>
                    <div className="col-6">
                      <strong>Type:</strong> {fileInfo.type}
                    </div>
                    <div className="col-6">
                      <strong>Duration:</strong> {fileInfo.duration}
                    </div>
                  </div>
                </div>
              )}
              
              {isLoading && (
                <div className="my-3">
                  <ProgressBar now={progress} label={`${progress}%`} className="mb-2" />
                  <small className="text-muted">Processing your audio file...</small>
                </div>
              )}
              
              <div className="d-flex justify-content-center gap-2 mt-3">
                <Button 
                  onClick={handleConvert} 
                  disabled={isLoading || !selectedFile}
                  className="btn-gradient"
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-exchange-alt me-2"></i>
                      Convert to Text
                    </>
                  )}
                </Button>
                
                {selectedFile && (
                  <Button 
                    variant="outline-secondary" 
                    onClick={clearSelection}
                    disabled={isLoading}
                  >
                    <i className="fas fa-times me-2"></i>
                    Clear File
                  </Button>
                )}
              </div>
            </div>
          </Card>
          
          {result && (
            <Card className="custom-card p-4 fade-in">
              <TextOutput text={result} />
              <div className="text-center mt-3">
                <Button 
                  variant="outline-primary" 
                  onClick={() => navigator.clipboard.writeText(result)}
                  className="me-2"
                >
                  <i className="fas fa-copy me-2"></i>
                  Copy Text
                </Button>
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setResult("")}
                >
                  <i className="fas fa-times me-2"></i>
                  Clear Result
                </Button>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default VoiceToText;