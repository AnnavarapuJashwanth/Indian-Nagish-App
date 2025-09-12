import axios from "axios";
import { API_BASE_URL } from "./config";

const API_URL = `${API_BASE_URL}/tts`;  // <-- update endpoint

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
