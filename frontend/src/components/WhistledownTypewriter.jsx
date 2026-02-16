import { useState } from 'react';
import html2canvas from 'html2canvas';

const FRAME_IMAGES = [
  '/frames/frame1.jpg',
  '/frames/frame2.jpg',
  '/frames/frame3.jpg',
  '/frames/frame4.jpg',
];

const WhistledownTypewriter = ({ portraitRef, galleryRef, capturedImages, letter, setLetter, name, setName }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(null);

  const photosTaken = capturedImages ? capturedImages.filter(img => img !== null).length : 0;
  const allPhotosTaken = photosTaken >= 3;

  const takePhoto = () => {
    if (galleryRef?.current) {
      galleryRef.current.takePhoto();
    }
  };

  const handleRetake = () => {
    if (galleryRef?.current) {
      galleryRef.current.handleRetake();
    }
  };

  const handleChangeFrame = () => {
    // Pick a random frame different from the current one
    let newFrame;
    do {
      newFrame = FRAME_IMAGES[Math.floor(Math.random() * FRAME_IMAGES.length)];
    } while (newFrame === selectedFrame && FRAME_IMAGES.length > 1);
    setSelectedFrame(newFrame);
  };

  const handleSeal = async () => {
    const target = document.querySelector('.keepsake-output-inner-desktop-capture');
    if (!target) return;

    setIsSaving(true);
    try {
      // Ensure fonts are loaded before capturing
      if (document.fonts) {
        await document.fonts.ready;
      }
      
      // Small delay to ensure everything is rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(target, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#FFF8F0',
        logging: false,
        windowWidth: 520,
        windowHeight: target.scrollHeight,
      });
      const link = document.createElement('a');
      link.download = `regency-keepsake-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to capture keepsake:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="flex flex-col items-center w-full gap-3 sm:gap-5">
      {/* Pass selected frame to the output via a hidden mechanism */}
      {selectedFrame && (
        <style>{`
          .keepsake-output-inner,
          .keepsake-output-inner-desktop-capture {
            background-image: url('${selectedFrame}') !important;
            background-size: cover !important;
            background-position: center !important;
          }
        `}</style>
      )}
      {/* TOP: Take Photo / Retake Button */}
      <div className="w-full flex flex-col items-center gap-2">
        {allPhotosTaken ? (
          <button onClick={handleRetake} className="regency-btn w-full max-w-xl text-sm md:text-base py-2.5 md:py-3">
            ❀ Retake All Photos ❀
          </button>
        ) : (
          <button onClick={takePhoto} className="regency-btn w-full max-w-xl text-sm md:text-base py-2.5 md:py-3">
            𔓘 Take Photo ({photosTaken + 1}/3)
          </button>
        )}
        {photosTaken > 0 && !allPhotosTaken && (
          <p className="font-body text-[10px] sm:text-xs text-aged-rose font-light italic">
            {3 - photosTaken} photo{3 - photosTaken > 1 ? 's' : ''} remaining
          </p>
        )}
      </div>

      {/* MIDDLE: Name + Letter Input */}
      <div className="w-full max-w-xl flex flex-col gap-3 sm:gap-4">
        <div>
          <label className="block font-playfair text-xs sm:text-sm text-rose-gold mb-1 sm:mb-1.5 font-semibold">
            Thy Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Lady Whistledown"
            className="stationery-input"
          />
        </div>
        <div>
          <label className="block font-playfair text-xs sm:text-sm text-rose-gold mb-1 sm:mb-1.5 font-semibold">
            Thy Letter
          </label>
          <textarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            placeholder="Dearest reader, it has come to my attention that..."
            rows={5}
            className="stationery sm-rows-8"
          />
        </div>
        {/* Seal for Delivery Button */}
        <button
          onClick={handleSeal}
          disabled={isSaving}
          className="regency-btn regency-btn--seal w-full text-sm md:text-base py-2.5 md:py-3"
        >
          {isSaving ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Sealing...
            </span>
          ) : (
            '✿ Seal with Love ✿'
          )}
        </button>
        {/* Change Frame Button */}
        <button
          onClick={handleChangeFrame}
          className="regency-btn w-full text-sm md:text-base py-2.5 md:py-3"
        >
          ❁ Change Frame
        </button>
      </div>
    </section>
  );
};

export default WhistledownTypewriter;
