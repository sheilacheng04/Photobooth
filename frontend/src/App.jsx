import { useRef } from 'react';
import RoyalGallery from './components/RoyalGallery';
import WhistledownTypewriter from './components/WhistledownTypewriter';
import SocietyLedger from './components/SocietyLedger';
import './App.css';

function App() {
  const keepsakeRef = useRef(null);
  const portraitRef = useRef(null);

  return (
    <div className="parchment-bg min-h-screen">
      {/* ═══════════════ HEADER ═══════════════ */}
      <header className="pt-12 pb-8 text-center px-4">
        <p className="font-typewriter text-xs tracking-[0.35em] text-antique-gold uppercase mb-3">
          By Invitation of Her Majesty
        </p>
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-amber-900 leading-tight">
          The Regency Keepsake
        </h1>
        <div className="gilded-rule mx-auto mt-6" />
        <p className="font-typewriter text-sm text-amber-800/70 mt-4 max-w-lg mx-auto">
          A Digital Memento of the Season's Most Distinguished Affair
        </p>
      </header>

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <main className="max-w-5xl mx-auto px-4 pb-20">
        {/* ── Keepsake capture area (portrait + letter) ── */}
        <div ref={keepsakeRef} className="keepsake-capture-area">
          {/* Section A: Royal Gallery (Photobooth) */}
          <div className="section-card mb-16">
            <RoyalGallery portraitRef={portraitRef} />
          </div>

          {/* Section B: Whistledown Typewriter */}
          <div className="section-card mb-16">
            <WhistledownTypewriter keepsakeRef={keepsakeRef} portraitRef={portraitRef} />
          </div>
        </div>

        {/* Gilded divider */}
        <div className="gilded-rule mx-auto my-12" />

        {/* Section C: Society Ledger (Guestbook) */}
        <div className="section-card">
          <SocietyLedger />
        </div>
      </main>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="text-center py-10 border-t-2 border-antique-gold/20">
        <p className="font-signature text-2xl text-antique-gold">
          Until the next Season
        </p>
        <p className="font-typewriter text-xs text-amber-800/40 mt-2">
          MDCCCXV &middot; A Digital Keepsake
        </p>
      </footer>
    </div>
  );
}

export default App;
