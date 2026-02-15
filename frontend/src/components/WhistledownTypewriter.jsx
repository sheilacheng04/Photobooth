import { useState } from 'react';
import html2canvas from 'html2canvas';

const WhistledownTypewriter = ({ portraitRef, galleryRef, capturedImages, letter, setLetter, name, setName }) => {
  const [isSaving, setIsSaving] = useState(false);

  const photosTaken = capturedImages ? capturedImages.filter(img => img !== null).length : 0;
  const allPhotosTaken = photosTaken >= 3;

  const frameImages = [
    'https://i.pinimg.com/736x/05/38/3b/05383b00f44604ba8127cd3741e3859a.jpg',
    'https://i.pinimg.com/736x/0c/c9/6a/0cc96a58c5833803730a344e25e84b73.jpg',
    'https://i.pinimg.com/1200x/c6/2a/ae/c62aae590d15ae7ecb1a328c5a99af4e.jpg',
    'https://i.pinimg.com/1200x/e2/73/60/e2736084ff09258f9aaa99970cb6dc77.jpg'
  ];

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
    const randomImage = frameImages[Math.floor(Math.random() * frameImages.length)];
    const frameElement = document.querySelector('.keepsake-output-inner');
    if (frameElement) {
      frameElement.style.backgroundImage = `url('${randomImage}')`;
      frameElement.style.backgroundSize = 'cover';
      frameElement.style.backgroundPosition = 'center';
    }
  };

  const handleSeal = async () => {
    const target = document.querySelector('.keepsake-output-inner');
    if (!target) return;

    setIsSaving(true);
    try {
      const canvas = await html2canvas(target, {
        scale: 2,
        useCORS: true,
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
    <section className="flex flex-col items-center w-full gap-5">
      {/* TOP: Take Photo / Retake Button */}
      <div className="w-full flex flex-col items-center gap-2">
        {allPhotosTaken ? (
          <button onClick={handleRetake} className="regency-btn w-full max-w-xl text-base py-3">
            🌸 Retake All Photos 🌸
          </button>
        ) : (
          <button onClick={takePhoto} className="regency-btn w-full max-w-xl text-base py-3">
            📸 Take Photo ({photosTaken + 1}/3)
          </button>
        )}
        {photosTaken > 0 && !allPhotosTaken && (
          <p className="font-body text-xs text-aged-rose font-light italic">
            {3 - photosTaken} photo{3 - photosTaken > 1 ? 's' : ''} remaining
          </p>
        )}
      </div>

      {/* MIDDLE: Name + Letter Input */}
      <div className="w-full max-w-xl flex flex-col gap-4">
        <div>
          <label className="block font-playfair text-sm text-rose-gold mb-1.5 font-semibold">
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
          <label className="block font-playfair text-sm text-rose-gold mb-1.5 font-semibold">
            Thy Letter
          </label>
          <textarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            placeholder="Dearest reader, it has come to my attention that..."
            rows={8}
            className="stationery"
          />
        </div>
        {/* Seal for Delivery Button */}
        <button
          onClick={handleSeal}
          disabled={isSaving}
          className="regency-btn regency-btn--seal w-full text-base py-3"
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
            '🌿 Seal with Love 🌿'
          )}
        </button>
        {/* Change Frame Button */}
        <button
          onClick={handleChangeFrame}
          className="regency-btn w-full text-base py-3"
        >
          🎨 Change Frame
        </button>
      </div>
    </section>
  );
};

export default WhistledownTypewriter;
