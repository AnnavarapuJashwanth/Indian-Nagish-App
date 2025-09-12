// backend/controllers/sttController.js
import speech from "@google-cloud/speech";

// Create Google Cloud client
const client = new speech.SpeechClient();

// Export the function with the correct name that matches your import
export const speechToText = async (req, res) => {
  try {
    const { audio, language = 'en-IN', sampleRate = 16000 } = req.body;

    if (!audio) {
      return res.status(400).json({ 
        success: false,
        error: "No audio provided" 
      });
    }

    const audioConfig = {
      content: audio,
    };

    const config = {
      encoding: "WEBM_OPUS", // Common encoding for web audio
      sampleRateHertz: sampleRate,
      languageCode: language,
      enableAutomaticPunctuation: true,
    };

    console.log("Processing speech-to-text request for language:", language);

    const [response] = await client.recognize({ 
      audio: audioConfig, 
      config: config 
    });

    if (!response.results || response.results.length === 0) {
      return res.status(200).json({
        success: true,
        text: "No speech could be recognized. Please try again with clearer audio.",
        language: language
      });
    }

    const transcript = response.results
      .map(result => result.alternatives[0].transcript)
      .join("\n");

    console.log("Speech-to-text successful:", transcript.substring(0, 50) + "...");

    res.json({ 
      success: true,
      text: transcript,
      language: language
    });
  } catch (error) {
    console.error("🛑 STT error:", error);
    res.status(500).json({ 
      success: false,
      error: "Speech-to-Text failed",
      message: error.message 
    });
  }
};