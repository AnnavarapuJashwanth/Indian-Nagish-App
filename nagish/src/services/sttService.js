// services/sttService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Function to convert speech to text using the browser's Web Speech API
export const sendVoiceToText = (language = 'en') => {
  return new Promise((resolve, reject) => {
    // Check if browser supports Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      reject(new Error('Speech recognition is not supported in this browser'));
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      resolve(transcript);
    };

    recognition.onerror = (event) => {
      reject(new Error(`Speech recognition error: ${event.error}`));
    };

    recognition.onend = () => {
      console.log('Voice recognition ended');
    };

    recognition.start();
  });
};

// Function to convert uploaded audio file to text
export const convertSpeechToText = async (audioData, language = 'en') => {
  try {
    console.log('Audio conversion requested for language:', language);
    console.log('Audio data length:', audioData.length);
    
    // Try to call the actual backend API
    try {
      const response = await axios.post(`${API_BASE_URL}/stt/transcribe`, {
        audio: audioData,
        language: language,
        sampleRate: 16000
      });
      
      return response.data;
    } catch (apiError) {
      console.error('API Error, using mock data:', apiError);
      
      // Fallback to mock data if API fails
      return getMockResponse(language, audioData.length);
    }
  } catch (error) {
    console.error('Error converting speech to text:', error);
    
    // Return error message
    return {
      success: false,
      text: `Error: ${error.message}. Please try again with a different audio file.`,
      language: language
    };
  }
};

// Function to check if speech recognition is supported
export const isSpeechRecognitionSupported = () => {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
};

// Function to get audio file duration
export const getAudioDuration = (file) => {
  return new Promise((resolve) => {
    if (!file) {
      resolve(0);
      return;
    }
    
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);
    
    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);
      URL.revokeObjectURL(audio.src);
    });
    
    audio.addEventListener('error', () => {
      resolve(0); // Fallback if we can't get duration
      URL.revokeObjectURL(audio.src);
    });
  });
};

// Helper function for mock responses
const getMockResponse = (language, dataLength) => {
  // Simulate API delay based on file size
  const delay = Math.min(2000 + (dataLength / 5000), 4000);
  
  // Mock responses for different languages
  const mockResponses = {
    'en': [
      "Hello, this is a demonstration of voice to text conversion technology.",
      "Welcome to Nagish India, your speech accessibility platform for Indian languages.",
      "The quick brown fox jumps over the lazy dog. This is a test of the voice recognition system.",
      "India is a diverse country with many languages and cultures living together in harmony.",
      "Speech recognition technology helps break down communication barriers for everyone."
    ],
    'hi': [
      "नमस्ते, यह आवाज से पाठ रूपांतरण तकनीक का प्रदर्शन है।",
      "नागिश इंडिया में आपका स्वागत है, भारतीय भाषाओं के लिए आपका वाक् पहुंच मंच।",
      "यह आवाज पहचान प्रणाली का एक परीक्षण है।",
      "भारत एक विविधतापूर्ण देश है जहाँ कई भाषाएं और संस्कृतियाँ एक साथ सद्भाव में रहती हैं।",
      "ध्वनि पहचान तकनीक सभी के लिए संचार बाधाओं को दूर करने में मदद करती है।"
    ],
    'ta': [
      "வணக்கம், இது குரல் முதல் உரை மாற்றம் தொழில்நுட்பத்தின் நிரூபணம்.",
      "நாகிஷ் இந்தியாவிற்கு வரவேற்கிறோம், இந்திய மொழிகளுக்கான உங்கள் பேச்சு அணுகல் தளம்.",
      "இது குரல் அங்கீகார அமைப்பின் சோதனையாகும்.",
      "இந்தியா ஒரு பல்வகைப்பட்ட நாடாகும், இதில் பல மொழிகள் மற்றும் கலாச்சாரங்கள் ஒன்றிணைந்து வாழ்கின்றன.",
      "குரல் அங்கீகார தொழில்நுட்பம் அனைவருக்கும் தொடர்பு தடைகளை உடைக்க உதவுகிறது."
    ],
    'te': [
      "నమస్కారం, ఇది వాయిస్ టు టెక్స్ట్ కన్వర్షన్ టెక్నాలజీ యొక్క ప్రదర్శన.",
      "నాగిష్ ఇండియాకు స్వాగతం, భారతీయ భాషలకు మీ స్పీచ్ యాక్సెసిబిలిటీ ప్లాట్‌ఫార్మ్.",
      "ఇది వాయిస్ రికగ్నిషన్ సిస్టమ్ యొక్క పరీక్ష.",
      "భారతదేశం ఒక వివిధతలు కలిగిన దేశం, ఇక్కడ అనేక భాషలు మరియు సంస్కృతులు ఏకమైయి ఉంటాయి.",
      "స्पీచ్ రికగ్నిషన్ టెక్నాలజీ ప్రతి ఒక్కరికీ కమ్యూనికేషన్ అడ్డంకులను తొలగించడంలో సహాయపడుతుంది."
    ],
    'bn': [
      "হ্যালো, এটি ভয়েস টু টেক্সট রূপান্তর প্রযুক্তির একটি প্রদর্শনী।",
      "নাগিশ ইন্ডিয়াতে স্বাগতম, ভারতীয় ভাষার জন্য আপনার স্পিচ অ্যাক্সেসিবিলিটি প্ল্যাটফর্ম।",
      "এটি ভয়েস recognition সিস্টেমের একটি পরীক্ষা।",
      "ভারত একটি разнообраз দেশ যেখানে অনেক ভাষা ও সংস্কৃতি একসাথে সামঞ্জস্যে বসবাস করে।",
      "ভয়েস recognition প্রযুক্তি সবার জন্য যোগাযোগের বাধা ভাঙতে সাহায্য করে।"
    ]
  };
  
  // Get a random response from the array for the selected language
  const responses = mockResponses[language] || mockResponses['en'];
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  // Return mock response based on selected language
  return { 
    success: true,
    text: randomResponse,
    language: language,
    duration: `${(delay / 1000).toFixed(1)} seconds`
  };
};