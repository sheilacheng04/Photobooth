import { useState, useEffect } from 'react';
import WaxSeal from './WaxSeal';
import ScrollReveal from './ScrollReveal';

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
    <section className="flex flex-col items-center">
      <h2 className="font-playfair text-3xl md:text-4xl font-bold text-antique-gold mb-2 tracking-wide text-center">
        The Society Ledger
      </h2>
      <p className="font-typewriter text-sm text-amber-800/70 mb-8 text-center">
        Inscribe thy name upon the registry of distinguished guests
      </p>

      {/* ── Entry Form ── */}
      <form onSubmit={handleSubmit} className="ledger-form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-playfair text-sm text-amber-900 mb-1">
              Thy Name <span className="text-wax-red">*</span>
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
            <label className="block font-playfair text-sm text-amber-900 mb-1">
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
        <div className="mb-4">
          <label className="block font-playfair text-sm text-amber-900 mb-1">
            Message <span className="text-wax-red">*</span>
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
            placeholder="What a splendid evening of refinement and revelry..."
            rows={4}
            className="stationery"
          />
        </div>
        <button type="submit" disabled={submitting} className="regency-btn w-full">
          {submitting ? 'Inscribing...' : '✒ Sign the Ledger'}
        </button>
      </form>

      {/* ── ScrollReveal Quote ── */}
      <div className="my-12 max-w-2xl px-4">
        <ScrollReveal>
          All the world is made of faith, and trust, and pixie dust — and the memories we seal within these pages shall endure beyond the Season.
        </ScrollReveal>
      </div>

      {/* ── Entries List ── */}
      <div className="w-full max-w-2xl">
        {loading ? (
          <p className="text-center font-typewriter text-amber-800/60 py-8">
            Consulting the ledger...
          </p>
        ) : entries.length === 0 ? (
          <p className="text-center font-typewriter text-amber-800/60 py-8">
            The ledger awaits its first distinguished guest.
          </p>
        ) : (
          <ul className="space-y-6">
            {entries.map((entry) => (
              <li key={entry.id} className="ledger-entry">
                <div className="flex items-start gap-4">
                  <WaxSeal letter={entry.name?.charAt(0)?.toUpperCase() || 'W'} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-signature text-2xl text-wax-red">
                        {entry.name}
                      </span>
                      {entry.title && (
                        <span className="font-playfair text-xs text-antique-gold italic">
                          — {entry.title}
                        </span>
                      )}
                    </div>
                    <p className="font-typewriter text-sm text-amber-900/80 mt-1 leading-relaxed">
                      {entry.message}
                    </p>
                    <time className="block font-typewriter text-xs text-amber-700/50 mt-2">
                      {formatDate(entry.created_at)}
                    </time>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default SocietyLedger;
