/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'duck-egg': '#B0C4DE',
        'creamy-ivory': '#FFFDD0',
        'antique-gold': '#D4AF37',
        'wax-red': '#961216',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        typewriter: ['"Special Elite"', 'monospace'],
        signature: ['"Great Vibes"', 'cursive'],
      },
    },
  },
  plugins: [],
};
