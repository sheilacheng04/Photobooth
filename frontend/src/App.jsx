import { useRef, useState } from 'react';
import RoyalGallery from './components/RoyalGallery';
import WhistledownTypewriter from './components/WhistledownTypewriter';
import SocietyLedger from './components/SocietyLedger';
import LandingPage from './components/LandingPage';
import Grainient from './components/Grainient';
import './App.css';

function App() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [capturedImages, setCapturedImages] = useState([null, null, null]);
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
    <div className="min-h-screen relative">
      {/* Fixed Grainient background */}
      <div className="fixed inset-0 z-0">
        <Grainient
          color1="#e4c4ca"
          color2="#e6a7b2"
          color3="#edb6bf"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={1}
          grainAmount={0.03}
          grainScale={1.8}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Main content above background */}
      <div className="relative z-10">
      {/* ═══════════════ HEADER ═══════════════ */}
      <header className="pt-8 md:pt-14 pb-6 md:pb-10 text-center px-4">
        <p className="font-body text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-rose-gold uppercase mb-2 md:mb-3 font-medium">
          A Cottagecore Affair
        </p>
        <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-rose-gold leading-tight px-2">
          The Keepsake Corner
        </h1>
        <div className="gilded-rule mt-4 md:mt-6">
          <span>❀</span>
        </div>
        <p className="font-body text-xs sm:text-sm text-aged-rose mt-3 md:mt-4 max-w-lg mx-auto font-light px-4">
          Capture thy portrait, pen thy sentiments, seal thy memories
        </p>
      </header>

      {/* ═══════════════ SECTION 1: THE CREATION DESK ═══════════════ */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 pb-12 md:pb-20">
        <div className="mb-4 md:mb-6 text-center">
          <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-rose-gold tracking-wide px-2">
            ❀ The Creation Desk ❀
          </h2>
          <p className="font-body text-xs sm:text-sm text-aged-rose mt-2 font-light px-4">
            Compose thy keepsake with portrait &amp; letter
          </p>
        </div>

        <div ref={keepsakeRef} className="keepsake-capture-area">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-10 md:mb-16 auto-rows-fr">
            {/* LEFT: The Portrait Frame — Output */}
            <div className="flex flex-col items-center h-full">
              <div className="bg-vintage-cream border-2 border-double border-rose-gold rounded-cottage p-4 md:p-6 shadow-cottage w-full h-full">
                <h3 className="font-playfair text-lg md:text-xl font-bold text-rose-gold mb-1 text-center">
                  The Portrait Frame
                </h3>
                <p className="font-body text-[10px] sm:text-xs text-aged-rose mb-3 md:mb-4 text-center font-light">
                  Your keepsake preview
                </p>
                <RoyalGallery 
                  ref={galleryRef}
                  portraitRef={portraitRef} 
                  capturedImages={capturedImages}
                  onImageCapture={setCapturedImages}
                  letterName={name}
                  letterText={letter}
                />
              </div>
            </div>

            {/* RIGHT: The Typewriter — Controls */}
            <div className="flex flex-col items-center h-full">
              <div className="bg-vintage-cream border-2 border-double border-rose-gold rounded-cottage p-4 md:p-6 shadow-cottage w-full h-full">
                <h3 className="font-playfair text-lg md:text-xl font-bold text-rose-gold mb-1 text-center">
                  The Typewriter
                </h3>
                <p className="font-body text-[10px] sm:text-xs text-aged-rose mb-3 md:mb-4 text-center font-light">
                  Take thy portrait &amp; pen thy sentiments
                </p>
                <WhistledownTypewriter 
                  portraitRef={portraitRef} 
                  galleryRef={galleryRef}
                  capturedImages={capturedImages}
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
        <div className="gilded-rule my-8 md:my-14">
          <span>✿</span>
        </div>

        {/* ═══════════════ SECTION 2: THE KEEPSAKE LATTICE ═══════════════ */}
        <div className="mb-4 md:mb-6 text-center">
          <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-rose-gold tracking-wide px-2">
            ❀ The Keepsake Lattice ❀
          </h2>
          <p className="font-body text-xs sm:text-sm text-aged-rose mt-2 font-light px-4">
            Leave a note &amp; view entries from distinguished guests
          </p>
        </div>

        <div className="section-card">
          <SocietyLedger />
        </div>
      </main>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="text-center py-8 md:py-12 border-t border-rose-gold/20 px-4">
        <p className="font-signature text-xl md:text-2xl text-rose-gold">
          Until the next Season
        </p>
        <p className="font-body text-[10px] md:text-xs text-aged-rose/50 mt-2 font-light tracking-widest">
          A DIGITAL KEEPSAKE &middot; ✿
        </p>
      </footer>
      </div>
    </div>
  );
}

export default App;
