// App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VoiceToText from "./pages/VoiceToText";
import TextToVoice from "./pages/TextToVoice";
import Settings from "./pages/Settings";
import "./App.css";

// Show old Footer only on inner pages (not Home, which has its own footer)
function Layout() {
  const loc = useLocation();
  const isHome = loc.pathname === "/";
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/stt"     element={<VoiceToText />} />
          <Route path="/tts"     element={<TextToVoice />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      {!isHome && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;