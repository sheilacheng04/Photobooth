/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'petal-pink': '#FFF5F7',
        'vintage-cream': '#FFFDD0',
        'rose-gold': '#B76E79',
        'deep-rose': '#E29DA4',
        'moss-green': '#8A9A5B',
        'warm-blush': '#FFF0F5',
        'aged-rose': '#D4A0A0',
        'soft-mauve': '#C9A0B0',
        'linen': '#FAF0E6',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        body: ['"Montserrat"', '"Lato"', 'sans-serif'],
        typewriter: ['"Special Elite"', 'monospace'],
        signature: ['"Great Vibes"', 'cursive'],
      },
      borderRadius: {
        'cottage': '1.5rem',
      },
      boxShadow: {
        'cottage': '0 4px 25px rgba(183, 110, 121, 0.12), 0 1px 4px rgba(183, 110, 121, 0.08)',
        'cottage-lg': '0 8px 40px rgba(183, 110, 121, 0.18), 0 2px 8px rgba(183, 110, 121, 0.1)',
        'glow': '0 0 20px rgba(226, 157, 164, 0.25)',
      },
    },
  },
  plugins: [],
};
