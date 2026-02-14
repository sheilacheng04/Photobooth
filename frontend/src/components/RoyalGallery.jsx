import { useState, useRef } from 'react';

const RoyalGallery = ({ portraitRef }) => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className="flex flex-col items-center">
      {/* Section heading */}
      <h2 className="font-playfair text-3xl md:text-4xl font-bold text-antique-gold mb-2 tracking-wide text-center">
        The Royal Gallery
      </h2>
      <p className="font-typewriter text-sm text-amber-800/70 mb-8 text-center">
        Present thy likeness for posterity
      </p>

      {/* Gold ornate frame */}
      <div className="gold-frame" ref={portraitRef}>
        {image ? (
          <img
            src={image}
            alt="Royal portrait"
            className="portrait-image"
          />
        ) : (
          <div className="portrait-placeholder">
            <svg
              className="w-16 h-16 text-antique-gold/40 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <span className="font-typewriter text-antique-gold/60 text-sm">
              Upload thy portrait
            </span>
          </div>
        )}
      </div>

      {/* Upload / Remove controls */}
      <div className="mt-6 flex gap-4">
        <label className="regency-btn cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          Choose Portrait
        </label>
        {image && (
          <button onClick={handleRemove} className="regency-btn regency-btn--outline">
            Remove
          </button>
        )}
      </div>
    </section>
  );
};

export default RoyalGallery;
