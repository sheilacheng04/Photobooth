# The Regency Keepsake 🎭✨

A luxurious single-page web application (SPA) that functions as a **Digital Keepsake** for high-society events. Featuring a Virtual Photobooth, Digital Typewriter, and a Society Ledger (Guestbook) with Regency-era aesthetic.

**Live Demo**: [https://regency-keepsake-photobooth.vercel.app](https://regency-keepsake-photobooth.vercel.app)

---

## 🎨 Visual Identity

- **Palette**: Duck Egg Blue (#B0C4DE), Creamy Ivory (#FFFDD0), Antique Gold (#D4AF37), Wax-Seal Red (#961216)
- **Typography**: 
  - Headers: *Playfair Display* (serif elegance)
  - Typewriter: *Special Elite* (handwritten notes)
  - Signatures: *Great Vibes* (flowing script)
- **Aesthetic**: CSS-only ornate gilded borders, parchment textures, and hand-crafted wax seals—no external image assets.

---

## 🛠️ Technical Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite + Tailwind CSS + GSAP |
| **Backend** | NestJS (REST API) |
| **Database** | Supabase (PostgreSQL) |
| **Storage** | Supabase Storage (for future portrait uploads) |
| **Styling** | CSS-only gilded frames, parchment, wax seals |
| **Animation** | GSAP ScrollTrigger (scroll reveal effect) |
| **Export** | html2canvas (portrait + letter as PNG) |
| **Deployment** | Vercel (monorepo) |

---

## 🏗️ Architecture

### Monorepo Structure

```
regency-keepsake-photobooth/
├── frontend/              # React SPA (Vite)
│   ├── src/
│   │   ├── App.jsx       # Main layout + refs for portrait/letter
│   │   ├── App.css       # Gilded frames, buttons, stationery
│   │   ├── index.css     # Tailwind + parchment background
│   │   ├── components/
│   │   │   ├── RoyalGallery.jsx      # Photobooth (upload + gold frame)
│   │   │   ├── WhistledownTypewriter.jsx # Letter textarea + export
│   │   │   ├── SocietyLedger.jsx     # Guestbook form + entries
│   │   │   ├── ScrollReveal.jsx      # GSAP word-by-word animation
│   │   │   └── WaxSeal.jsx           # CSS-only wax seal stamp
│   │   └── lib/
│   │       └── supabaseClient.js     # Supabase JS client init
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── api/                   # NestJS REST API
│   ├── src/
│   │   ├── main.ts       # Bootstrap (localhost:3001)
│   │   ├── app.module.ts # Root module
│   │   ├── supabase/
│   │   │   ├── supabase.module.ts    # Global provider
│   │   │   └── supabase.service.ts   # Wraps Supabase JS client
│   │   └── guestbook/
│   │       ├── guestbook.controller.ts   # GET/POST /api/guestbook
│   │       ├── guestbook.service.ts      # Database queries
│   │       ├── guestbook.module.ts
│   │       └── dto/
│   │           └── create-entry.dto.ts   # DTO + class-validator
│   ├── vercel/
│   │   └── index.ts      # Serverless adapter for Vercel
│   ├── package.json
│   └── tsconfig.json
├── supabase/
│   └── migrations/
│       └── 001_create_guestbook.sql # Database schema + RLS
├── vercel.json            # Monorepo deployment config
├── package.json           # Root workspace
├── .gitignore
├── .env.example           # Template for env vars
├── DEPLOYMENT_GUIDE.md    # Step-by-step deployment
├── QUICK_START.md         # Copy-paste terminal commands
└── README.md              # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- GitHub account (for version control)
- Supabase account (for database)
- Vercel account (for hosting)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/regency-keepsake-photobooth.git
   cd regency-keepsake-photobooth
   ```

2. **Create environment files** (see [.env.example](.env.example)):
   ```bash
   # frontend/.env.local
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJh...
   
   # api/.env
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJh...
   ```

3. **Start the backend** (Terminal 1):
   ```bash
   cd api
   npm run start:dev
   ```
   Backend runs on `http://localhost:3001`

4. **Start the frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

5. **Open browser**: [http://localhost:5173](http://localhost:5173)

---

## 📚 Component Overview

### 1. The Royal Gallery (Photobooth)
- **File**: [frontend/src/components/RoyalGallery.jsx](frontend/src/components/RoyalGallery.jsx)
- **Features**:
  - File upload with browser input
  - CSS-only gold ornate frame (12px border-image gradient)
  - Sepia filter + contrast/brightness boost
  - Responsive sizing (320×400px on desktop, 260×340px on mobile)

### 2. The Whistledown Typewriter (Letter)
- **File**: [frontend/src/components/WhistledownTypewriter.jsx](frontend/src/components/WhistledownTypewriter.jsx)
- **Features**:
  - Cream-colored stationery with lined-paper CSS pattern
  - Special Elite monospace font for handwritten effect
  - Author name input
  - "Seal for Delivery" button exports portrait + letter as PNG using html2canvas
  - Real-time preview as you type

### 3. The Society Ledger (Guestbook)
- **File**: [frontend/src/components/SocietyLedger.jsx](frontend/src/components/SocietyLedger.jsx)
- **Features**:
  - Form to submit: name, title/honorific, message
  - Fetches all entries from `/api/guestbook` on mount
  - Displays entries with wax seal stamps
  - ScrollReveal GSAP animation for dramatic entry
  - Entries ordered newest-first from Supabase
  - Real-time submission feedback

### 4. Wax Seal Stamp
- **File**: [frontend/src/components/WaxSeal.jsx](frontend/src/components/WaxSeal.jsx)
- **Styling**: [frontend/src/App.css](.wax-seal, .wax-seal-letter)
- **Features**:
  - CSS-only clip-path polygon (decagonal seal)
  - Inset shadows for 3D depth
  - Drop shadow for floating effect
  - Customizable letter (defaults to 'W')
  - Antique gold letter on wax-red background

### 5. ScrollReveal (GSAP Animation)
- **File**: [frontend/src/components/ScrollReveal.jsx](frontend/src/components/ScrollReveal.jsx)
- **Features**:
  - Per-word blur + opacity stagger on scroll
  - Rotation animation synchronized with scroll
  - Uses GSAP ScrollTrigger plugin
  - Elegant reveal effect for quotes/section headers

---

## 🗄️ Database Schema

### Supabase `guestbook` Table

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid (PK) | Auto-generated UUID |
| `name` | text | Required. Guest's name (max 100 chars) |
| `title` | text | Optional. Title/honorific (max 100 chars) |
| `message` | text | Required. Guest's message (max 1000 chars) |
| `created_at` | timestamptz | Auto-set to now(). Indexed for sorting. |

### Row-Level Security (RLS)

```sql
-- Anyone can read all entries
CREATE POLICY "Allow public read" ON guestbook
  FOR SELECT USING (true);

-- Anyone can insert (public guestbook)
CREATE POLICY "Allow public insert" ON guestbook
  FOR INSERT WITH CHECK (true);
```

---

## 📡 API Endpoints

### Backend: NestJS (Vercel Serverless)

#### `GET /api/guestbook`
Returns all guestbook entries, newest first.

**Response** (200 OK):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "The Bridgerton Family",
    "title": "Duke and Duchess",
    "message": "What a splendid affair!",
    "created_at": "2026-02-14T18:30:00+00:00"
  }
]
```

#### `POST /api/guestbook`
Create a new guestbook entry.

**Request Body**:
```json
{
  "name": "Lady Whistledown",
  "title": "Gossip Columnist",
  "message": "The ton shall find this evening most extraordinary."
}
```

**Response** (201 Created):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "name": "Lady Whistledown",
  "title": "Gossip Columnist",
  "message": "The ton shall find this evening most extraordinary.",
  "created_at": "2026-02-14T18:35:00+00:00"
}
```

---

## 🎨 Styling Deep Dive

### CSS-Only Features

1. **Parchment Background** (`.parchment-bg`)
   - Layered radial gradients
   - Linear grid patterns for texture
   - No external images

2. **Gilded Horizontal Rule** (`.gilded-rule`)
   - Linear gradient with opacity fade
   - Centered fleuron (⚜) pseudo-element
   - Used as visual dividers

3. **Gold Ornate Frame** (`.gold-frame`)
   - `border-image` with multi-color gradient
   - Triple `box-shadow` for depth
   - Inner pseudo-element outline
   - Overflow hidden for portrait containment

4. **Stationery** (`.stationery`)
   - `repeating-linear-gradient` for lines
   - 32px line spacing
   - Special Elite typography
   - Focus state with gold border + blur

5. **Regency Button** (`.regency-btn`)
   - Linear gradient background (gold → brown)
   - Uppercase with letter-spacing
   - Smooth transitions + hover lift effect
   - Variants: `.regency-btn--outline`, `.regency-btn--seal`

---

## 📦 Build & Deployment

### Local Build

```bash
# Frontend
cd frontend && npm run build
# Output: frontend/dist/

# Backend
cd api && npm run build
# Output: api/dist/
```

### Deploy to Vercel

1. Connect GitHub repo to Vercel
2. Set environment variables (4 Supabase keys)
3. Vercel auto-runs build command
4. Functions deploy to serverless runtime
5. Frontend served as static files with rewrites for SPA routing

**Vercel Config**: [vercel.json](./vercel.json)
- Build command: `cd frontend && npm install && npm run build`
- Output directory: `frontend/dist`
- API rewrites to NestJS serverless functions
- SPA fallback to `index.html`

---

## 📋 Feature Checklist

- [x] Virtual Photobooth with gold frame + sepia filter
- [x] Digital typewriter with lined stationery effect
- [x] Export portrait + letter as PNG (html2canvas)
- [x] Guestbook form with name/title/message
- [x] Guestbook entries list with CSS wax seals
- [x] GSAP scroll reveal animation
- [x] Responsive design (mobile-first Tailwind)
- [x] PostgreSQL database (Supabase)
- [x] REST API (NestJS)
- [x] Vercel serverless deployment
- [x] Production-ready error handling

---

## 🐛 Troubleshooting

### "VITE_SUPABASE_URL is not defined"
- Check `frontend/.env.local` exists
- Restart dev server after creating `.env.local`

### "Guestbook entries not loading"
- Verify Supabase credentials in `api/.env`
- Check Vercel environment variables are set
- Verify guestbook table exists in Supabase

### "Seal for Delivery downloads blank image"
- Check browser console for html2canvas errors
- Ensure portrait image is fully loaded before clicking
- Disable ad-blockers (they may block canvas operations)

### "API errors in Vercel logs"
- Check `SUPABASE_SERVICE_ROLE_KEY` is correct
- Verify guestbook table RLS policies allow inserts
- Inspect Supabase SQL logs for query errors

---

## 🔐 Security Notes

- ✅ `.env` files never committed (in `.gitignore`)
- ✅ Service role key only in backend `.env`
- ✅ Anon key in frontend (safe to expose)
- ✅ RLS policies restrict access appropriately
- ✅ Input validation via NestJS DTOs + class-validator
- ✅ CORS enabled for Vercel domain

---

## 📈 Future Enhancements

- [ ] Supabase Storage for portrait uploads (with CDN)
- [ ] Email notifications when new entries signed
- [ ] Admin dashboard to moderate entries
- [ ] Export guestbook entries as JSON/CSV
- [ ] Theme toggle (light/dark mode)
- [ ] Social sharing (Twitter, Facebook)
- [ ] Analytics integration

---

## 📄 License

MIT License — Feel free to use this as a template for your own events!

---

## 🙏 Credits

Built with:
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [NestJS](https://nestjs.com)
- [Supabase](https://supabase.com)
- [GSAP](https://gsap.com)
- [html2canvas](https://html2canvas.hertzen.com)
- [Vercel](https://vercel.com)

---

## 📞 Support

For detailed deployment instructions, see:
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) — Full step-by-step guide
- [QUICK_START.md](./QUICK_START.md) — Copy-paste terminal commands

---

**Until the next Season** 🎭✨
