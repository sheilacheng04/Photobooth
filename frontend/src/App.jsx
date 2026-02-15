import { useRef, useState } from 'react';
import RoyalGallery from './components/RoyalGallery';
import WhistledownTypewriter from './components/WhistledownTypewriter';
import SocietyLedger from './components/SocietyLedger';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [letter, setLetter] = useState('');
  const [name, setName] = useState('');
  const keepsakeRef = useRef(null);
  const portraitRef = useRef(null);
  const galleryRef = useRef(null);

  const handleEnter = () => {
    setShowMainContent(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  if (!showMainContent) {
    return <LandingPage onEnter={handleEnter} />;
  }

  return (
    <div className="parchment-bg min-h-screen">
      {/* ═══════════════ HEADER ═══════════════ */}
      <header className="pt-14 pb-10 text-center px-4">
        <p className="font-body text-xs tracking-[0.4em] text-rose-gold uppercase mb-3 font-medium">
          A Cottagecore Affair
        </p>
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-rose-gold leading-tight">
          The Keepsake Corner
        </h1>
        <div className="gilded-rule mt-6">
          <span>🌸</span>
        </div>
        <p className="font-body text-sm text-aged-rose mt-4 max-w-lg mx-auto font-light">
          Capture thy portrait, pen thy sentiments, seal thy memories
        </p>
      </header>

      {/* ═══════════════ SECTION 1: THE CREATION DESK ═══════════════ */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        <div className="mb-6 text-center">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-rose-gold tracking-wide">
            ✿ The Creation Desk ✿
          </h2>
          <p className="font-body text-sm text-aged-rose mt-2 font-light">
            Compose thy keepsake with portrait &amp; letter
          </p>
        </div>

        <div ref={keepsakeRef} className="keepsake-capture-area">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* LEFT: The Portrait Frame — Output */}
            <div className="flex flex-col items-center">
              <div className="bg-vintage-cream border-2 border-double border-rose-gold rounded-cottage p-6 shadow-cottage w-full">
                <h3 className="font-playfair text-xl font-bold text-rose-gold mb-1 text-center">
                  The Portrait Frame
                </h3>
                <p className="font-body text-xs text-aged-rose mb-4 text-center font-light">
                  Your keepsake preview
                </p>
                <RoyalGallery 
                  ref={galleryRef}
                  portraitRef={portraitRef} 
                  capturedImage={capturedImage}
                  onImageCapture={setCapturedImage}
                  letterName={name}
                  letterText={letter}
                />
              </div>
            </div>

            {/* RIGHT: The Typewriter — Controls */}
            <div className="flex flex-col items-center">
              <div className="bg-vintage-cream border-2 border-double border-rose-gold rounded-cottage p-6 shadow-cottage w-full">
                <h3 className="font-playfair text-xl font-bold text-rose-gold mb-1 text-center">
                  The Typewriter
                </h3>
                <p className="font-body text-xs text-aged-rose mb-4 text-center font-light">
                  Take thy portrait &amp; pen thy sentiments
                </p>
                <WhistledownTypewriter 
                  portraitRef={portraitRef} 
                  galleryRef={galleryRef}
                  capturedImage={capturedImage}
                  letter={letter}
                  setLetter={setLetter}
                  name={name}
                  setName={setName}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Vine Divider ── */}
        <div className="gilded-rule my-14">
          <span>🌿</span>
        </div>

        {/* ═══════════════ SECTION 2: THE KEEPSAKE LATTICE ═══════════════ */}
        <div className="mb-6 text-center">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-rose-gold tracking-wide">
            ✿ The Keepsake Lattice ✿
          </h2>
          <p className="font-body text-sm text-aged-rose mt-2 font-light">
            Leave a note &amp; view entries from distinguished guests
          </p>
        </div>

        <div className="section-card">
          <SocietyLedger />
        </div>
      </main>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="text-center py-12 border-t border-rose-gold/20">
        <p className="font-signature text-2xl text-rose-gold">
          Until the next Season
        </p>
        <p className="font-body text-xs text-aged-rose/50 mt-2 font-light tracking-widest">
          A DIGITAL KEEPSAKE &middot; ✿
        </p>
      </footer>
    </div>
  );
}

export default App;
