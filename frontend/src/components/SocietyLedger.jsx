import { useState, useEffect } from 'react';
import WaxSeal from './WaxSeal';

const API_BASE = '/api/guestbook';

const SocietyLedger = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', title: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchEntries = async () => {
    try {
      const res = await fetch(API_BASE);
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (err) {
      console.error('Failed to fetch guestbook entries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ name: '', title: '', message: '' });
        await fetchEntries();
      }
    } catch (err) {
      console.error('Failed to submit entry:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section>
      {/* Two-column grid: Form (left) + Entries (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
        {/* LEFT COLUMN: The Guestbook Form */}
        <div>
          <h3 className="font-playfair text-lg md:text-xl font-bold text-rose-gold mb-1">
            Leave a Note
          </h3>
          <p className="font-body text-[10px] sm:text-xs text-aged-rose mb-4 md:mb-5 font-light">
            Inscribe thy name upon the registry
          </p>

          <form onSubmit={handleSubmit} className="ledger-form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
              <div>
                <label className="block font-playfair text-xs sm:text-sm text-rose-gold mb-1.5 font-semibold">
                  Thy Name <span className="text-deep-rose">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                  placeholder="The Duke of Hastings"
                  className="stationery-input"
                />
              </div>
              <div>
                <label className="block font-playfair text-xs sm:text-sm text-rose-gold mb-1.5 font-semibold">
                  Title / Honorific
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Viscount, Lady, etc."
                  className="stationery-input"
                />
              </div>
            </div>
            <div className="mb-4 md:mb-5">
              <label className="block font-playfair text-xs sm:text-sm text-rose-gold mb-1.5 font-semibold">
                Message <span className="text-deep-rose">*</span>
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                placeholder="What a splendid evening of refinement..."
                rows={3}
                className="stationery"
              />
            </div>
            <button type="submit" disabled={submitting} className="regency-btn w-full text-sm md:text-base py-2.5 md:py-3">
              {submitting ? 'Inscribing...' : '❀ Sign the Ledger'}
            </button>
          </form>

          {/* Quote */}
          <div className="mt-6 md:mt-8 px-2">
            <h2 className="font-playfair text-xs sm:text-sm md:text-base lg:text-lg text-center leading-snug text-rose-gold/80 italic" style={{ wordSpacing: '0.3em' }}>
              All the world is made of faith, and trust, and pixie dust. The memories we seal within these pages shall endure beyond the Season.
            </h2>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Feedbacks */}
        <div>
          <h3 className="font-playfair text-lg md:text-xl font-bold text-rose-gold mb-1">
            The Guest Ledger
          </h3>
          <p className="font-body text-[10px] sm:text-xs text-aged-rose mb-4 md:mb-5 font-light">
            Notes from distinguished visitors
          </p>

          <div className="max-h-[500px] md:max-h-[600px] overflow-y-auto pr-2 space-y-3 md:space-y-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#E29DA4 #FFF5F7' }}>
            {loading ? (
              <p className="text-center font-body text-[11px] sm:text-xs md:text-sm text-aged-rose/60 py-6 md:py-8">
                Consulting the ledger...
              </p>
            ) : entries.length === 0 ? (
              <p className="text-center font-body text-[11px] sm:text-xs md:text-sm text-aged-rose/60 py-6 md:py-8 italic">
                The ledger awaits its first distinguished guest.
              </p>
            ) : (
              <ul className="space-y-3 md:space-y-4">
                {entries.map((entry) => (
                  <li key={entry.id} className="ledger-entry">
                    <div className="flex items-start gap-2 md:gap-3">
                      <WaxSeal letter={entry.name?.charAt(0)?.toUpperCase() || 'K'} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="font-signature text-lg md:text-xl text-deep-rose">
                            {entry.name}
                          </span>
                          {entry.title && (
                            <span className="font-playfair text-[10px] sm:text-xs text-rose-gold/70 italic">
                              — {entry.title}
                            </span>
                          )}
                        </div>
                        <p className="font-body text-xs sm:text-sm text-rose-gold/80 mt-1 md:mt-1.5 leading-relaxed font-light">
                          {entry.message}
                        </p>
                        <time className="block font-body text-[10px] sm:text-xs text-aged-rose/40 mt-1.5 md:mt-2 font-light">
                          {formatDate(entry.created_at)}
                        </time>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocietyLedger;
