// translateService.js - Uses FREE MyMemory Translation API (no API key needed)
// Limit: 5000 chars/day per IP on free tier

const LANG_CODE_MAP = {
  hi: "hi",
  te: "te",
  ta: "ta",
  kn: "kn",
  ml: "ml",
  mr: "mr",
  bn: "bn",
  gu: "gu",
  pa: "pa",
  ur: "ur",
  en: "en",
};

export const translateText = async (text, target = "hi") => {
  try {
    const langCode = LANG_CODE_MAP[target] || target;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${langCode}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetails || "Translation failed");
    }

    return data.responseData.translatedText;
  } catch (err) {
    console.error("MyMemory Translate error:", err.message);
    throw err;
  }
};
