// LanguageSelector.jsx
import { Form } from "react-bootstrap";

function LanguageSelector({ selectedLang, onChange, className = "" }) {
  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "bn", name: "Bengali", flag: "🇧🇩" },
    { code: "ta", name: "Tamil", flag: "🇮🇳" },
    { code: "te", name: "Telugu", flag: "🇮🇳" },
    { code: "ml", name: "Malayalam", flag: "🇮🇳" },
    { code: "gu", name: "Gujarati", flag: "🇮🇳" },
    { code: "mr", name: "Marathi", flag: "🇮🇳" },
    { code: "pa", name: "Punjabi", flag: "🇮🇳" },
    { code: "kn", name: "Kannada", flag: "🇮🇳" }
  ];

  return (
    <Form.Group className={`language-selector ${className}`}>
      <Form.Label>Select Language</Form.Label>
      <Form.Select
        value={selectedLang}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-3 p-3"
        style={{ cursor: 'pointer' }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default LanguageSelector;