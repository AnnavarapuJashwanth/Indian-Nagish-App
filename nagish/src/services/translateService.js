import axios from "axios";

const API_URL = "http://localhost:5000/api/translate";

export const translateText = async (text, target = "hi") => {
  try {
    const res = await axios.post(API_URL, { text, target });
    return res.data.translatedText;
  } catch (err) {
    console.error("Translate API error:", err);
    throw err;
  }
};
