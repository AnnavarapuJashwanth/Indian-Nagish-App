// pages/Home.jsx — Reference-matched design
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Home.css";

const LANGUAGES = ["Hindi", "Bengali", "Marathi", "Tamil", "Telugu", "Kannada", "+6 More"];
const SMALL_FEATURES = [
  { icon: "🔒", title: "Private & Secure",    desc: "All conversations are encrypted and processed with the highest data sovereignty standards." },
  { icon: "⚡", title: "Ultra-Low Latency",   desc: "Experience sub-second transcription and speech generation on 5G networks." },
  { icon: "📱", title: "Cross-Platform",      desc: "Access Nagish on Web, Android, and iOS with synchronized history and preferences." },
];
const CHECKS = ["Nuance Detection", "Accent Adaptations", "Slang Recognition", "Tone Synthesis"];

function Home() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="home-page">

      {/* ── HERO ─────────────────────────────────── */}
      <section className="h-hero">
        <div className="h-hero__inner">

          <div className="reveal">
            <div className="h-hero__badge">
              <span className="h-hero__badge-dot" />
              Now Available in 17+ Indian Languages
            </div>

            <h1 className="h-hero__heading">
              Accessible communication<br />
              at <em>your fingertips</em>
            </h1>

            <p className="h-hero__desc">
              Breaking language barriers and empowering every voice. Experience the
              future of inclusive communication with real-time AI-powered speech
              technology tailored for India.
            </p>

            <div className="h-hero__actions">
              <Link to="/stt" className="btn-orange">Start Converting Voice →</Link>
              <Link to="/tts" className="btn-ghost">Text to Speech 🔊</Link>
            </div>

            <div className="h-hero__proof">
              <div className="h-hero__avatars">
                <div className="h-hero__avatar">A</div>
                <div className="h-hero__avatar">B</div>
                <div className="h-hero__avatar">C</div>
              </div>
              <p className="h-hero__proof-text">
                Trusted by <strong>88,290+</strong> users across all kinds
              </p>
            </div>
          </div>

          <div className="h-hero__visual reveal">
            <img
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="City communication at night"
            />
            <div className="h-hero__visual-overlay" />
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────── */}
      <section className="h-features">
        <div className="h-features__inner">
          <div className="h-features__head reveal">
            <p className="h-features__tag">Built different</p>
            <h2 className="h-features__title">Engineered for the Indian Context</h2>
            <p className="h-features__sub">
              Tailored specifically to handle diverse accents, dialects, and regional languages
              with unprecedented precision.
            </p>
          </div>

          <div className="h-features__grid reveal">

            {/* Large — Languages */}
            <div className="h-fcard h-fcard--lang">
              <div>
                <div className="h-fcard__icon-wrap">🌐</div>
                <h3 className="h-fcard__title">10+ Indian Languages</h3>
                <p className="h-fcard__desc">
                  Seamlessly communicate in Hindi, Marathi, Bengali, Tamil, Telugu and more.
                  Our engine understands the natural nuances of Indian speech.
                </p>
              </div>
              <div className="h-fcard__langs">
                {LANGUAGES.map((l) => (
                  <span
                    key={l}
                    className={`h-fcard__lang-chip ${l.startsWith("+") ? "h-fcard__lang-chip--more" : ""}`}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Orange — Accuracy */}
            <div className="h-fcard h-fcard--accuracy">
              <div>
                <div className="h-fcard__icon-wrap">🎯</div>
                <div className="h-fcard__big-num">95%</div>
                <h3 className="h-fcard__title">Industry-Leading Accuracy</h3>
                <p className="h-fcard__desc">
                  Trained on millions of hours of regional Indian audio data.
                </p>
              </div>
              <Link to="/stt" className="h-fcard__view-btn">View Benchmarks →</Link>
            </div>

            {/* 3 small cards */}
            {SMALL_FEATURES.map((f) => (
              <div className="h-fcard h-fcard--sm" key={f.title}>
                <div className="h-fcard__icon-wrap">{f.icon}</div>
                <h4 className="h-fcard__title">{f.title}</h4>
                <p className="h-fcard__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LANGUAGE WITHOUT BORDERS ──────────────── */}
      <section className="h-lang">
        <div className="h-lang__inner">

          <div className="h-lang__visual reveal">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
              alt="People communicating across languages"
            />
            <div className="h-lang__badge">
              <span className="h-lang__badge-dot" />
              Live Real-time Processing
            </div>
          </div>

          <div className="reveal">
            <p className="h-lang__tag">Advanced AI</p>
            <h2 className="h-lang__title">Language without<br />borders</h2>
            <p className="h-lang__desc">
              Our advanced neural networks are specifically trained on the
              linguistic richness and code-switching patterns unique to the Indian
              linguistic landscape. We don't just translate words, we convey intent
              and cultural nuance.
            </p>
            <div className="h-lang__checks">
              {CHECKS.map((c) => (
                <div className="h-lang__check" key={c}>
                  <span className="h-lang__check-icon">✓</span>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="h-cta">
        <div className="h-cta__inner">
          <div className="h-cta__card reveal">
            <div>
              <h2 className="h-cta__title">Ready to start<br />communicating better?</h2>
              <p className="h-cta__sub">
                Join thousands of individuals and businesses who use Nagish to
                bridge the gap every day.
              </p>
            </div>
            <div className="h-cta__actions">
              <Link to="/stt" className="btn-cta-primary">Get Started Free</Link>
              <Link to="/settings" className="btn-cta-ghost">Try Translation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="h-footer">
        <div className="h-footer__inner">
          <div>
            <div className="h-footer__brand">🇮🇳 Nagish India</div>
            <div className="h-footer__copy">© {new Date().getFullYear()} Nagish India. Empowering communication for all.</div>
          </div>
          <div className="h-footer__links">
            <a href="#" className="h-footer__link">Accessibility Statement</a>
            <a href="#" className="h-footer__link">Terms of Service</a>
            <a href="#" className="h-footer__link">Privacy Policy</a>
            <a href="#" className="h-footer__link">Contact Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;