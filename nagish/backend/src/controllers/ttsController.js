import textToSpeech from "@google-cloud/text-to-speech";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const keyFilename = path.resolve(__dirname, "../../keys/google.json");

const client = new textToSpeech.TextToSpeechClient({ keyFilename });

export const textToSpeechHandler = async (req, res) => {
  try {
    const { text, languageCode = "en-IN" } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode, ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    });

    const audioBuffer = Buffer.from(response.audioContent, "base64");

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Disposition", "attachment; filename=output.mp3");
    return res.send(audioBuffer);
  } catch (error) {
    console.error("🛑 TTS error:", error);
    res.status(500).json({ error: "Text-to-Speech failed", message: error.message });
  }
};
