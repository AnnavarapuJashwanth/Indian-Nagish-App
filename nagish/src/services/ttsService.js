import axios from "axios";

const API_URL = "http://localhost:5000/api/tts";

export const convertTextToSpeech = async (text, languageCode = "en-IN") => {
  try {
    const res = await axios.post(API_URL, { text, languageCode }, { responseType: "arraybuffer" });

    const audioBlob = new Blob([res.data], { type: "audio/mpeg" });
    return URL.createObjectURL(audioBlob);
  } catch (err) {
    console.error("TTS API error:", err);
    throw err;
  }
};
