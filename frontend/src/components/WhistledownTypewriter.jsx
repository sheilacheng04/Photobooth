import { useState } from 'react';
import html2canvas from 'html2canvas';

const WhistledownTypewriter = ({ keepsakeRef, portraitRef }) => {
  const [letter, setLetter] = useState('');
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSeal = async () => {
    const target = keepsakeRef?.current;
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
    <section className="flex flex-col items-center">
      <h2 className="font-playfair text-3xl md:text-4xl font-bold text-antique-gold mb-2 tracking-wide text-center">
        The Whistledown Typewriter
      </h2>
      <p className="font-typewriter text-sm text-amber-800/70 mb-8 text-center">
        Compose thy sentiments upon this fine stationery
      </p>

      {/* Author name */}
      <div className="w-full max-w-xl mb-4">
        <label className="block font-playfair text-sm text-amber-900 mb-1">
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

      {/* Letter textarea */}
      <div className="w-full max-w-xl mb-6">
        <label className="block font-playfair text-sm text-amber-900 mb-1">
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

      {/* Seal for Delivery */}
      <button
        onClick={handleSeal}
        disabled={isSaving}
        className="regency-btn regency-btn--seal"
      >
        {isSaving ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Sealing...
          </span>
        ) : (
          '⚜ Seal for Delivery ⚜'
        )}
      </button>
    </section>
  );
};

export default WhistledownTypewriter;
