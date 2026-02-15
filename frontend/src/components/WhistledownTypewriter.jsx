import { useState } from 'react';
import html2canvas from 'html2canvas';

const WhistledownTypewriter = ({ portraitRef, galleryRef, capturedImage, letter, setLetter, name, setName }) => {
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSeal = async () => {
    const target = portraitRef?.current;
    if (!target) return;

    setIsSaving(true);
    try {
      const canvas = await html2canvas(target, {
        backgroundColor: '#FFFDD0',
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
    <section className="flex flex-col items-center w-full h-full gap-5">
      {/* TOP: Take Photo / Retake Button */}
      <div className="w-full flex justify-center">
        {capturedImage ? (
          <button onClick={handleRetake} className="regency-btn w-full max-w-xl text-base py-3">
            🌸 Retake Photo 🌸
          </button>
        ) : (
          <button onClick={takePhoto} className="regency-btn w-full max-w-xl text-base py-3">
            🌸 Take Photo 🌸
          </button>
        )}
      </div>

      {/* MIDDLE: Name + Letter Input */}
      <div className="w-full max-w-xl flex-1 flex flex-col gap-4">
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
        <div className="flex-1 flex flex-col">
          <label className="block font-playfair text-sm text-rose-gold mb-1.5 font-semibold">
            Thy Letter
          </label>
          <textarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            placeholder="Dearest reader, it has come to my attention that..."
            rows={8}
            className="stationery flex-1"
          />
        </div>
      </div>

      {/* BOTTOM: Seal for Delivery Button */}
      <div className="w-full flex justify-center">
        <button
          onClick={handleSeal}
          disabled={isSaving}
          className="regency-btn regency-btn--seal w-full max-w-xl text-base py-3"
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
      </div>
    </section>
  );
};

export default WhistledownTypewriter;
