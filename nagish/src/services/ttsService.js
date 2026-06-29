// ttsService.js - Uses FREE browser Web Speech Synthesis API (no backend needed)

// Language code mapping: our app codes -> BCP-47 for SpeechSynthesis
const langMap = {
  "hi-IN": "hi-IN",
  "te-IN": "te-IN",
  "ta-IN": "ta-IN",
  "kn-IN": "kn-IN",
  "ml-IN": "ml-IN",
  "mr-IN": "mr-IN",
  "bn-IN": "bn-IN",
  "gu-IN": "gu-IN",
  "pa-IN": "pa-IN",
  "ur-IN": "ur-IN",
  "en-IN": "en-IN",
  "en-US": "en-US",
};

export const convertTextToSpeech = (text, languageCode = "hi-IN") => {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error("Speech synthesis not supported in this browser."));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[languageCode] || languageCode;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find a matching voice
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find((v) => v.lang === utterance.lang)
      || voices.find((v) => v.lang.startsWith(utterance.lang.split("-")[0]))
      || null;

    if (matchedVoice) utterance.voice = matchedVoice;

    utterance.onend = () => resolve("spoken");
    utterance.onerror = (e) => reject(new Error(`Speech error: ${e.error}`));

    window.speechSynthesis.speak(utterance);

    // Return immediately with a flag so UI can update
    resolve("speaking");
  });
};

// Ensure voices are loaded
export const loadVoices = () => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) return resolve(voices);
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices());
    };
  });
};
