# 🌸 The Keepsake Corner

> *A Cottagecore Digital Photobooth & Guestbook Experience*

A luxurious, fully-responsive web application that captures memories through a virtual photobooth, digital letter writing, and an elegant guestbook - all wrapped in a beautiful cottagecore aesthetic with rose gold tones and vintage charm.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0-red.svg)](https://nestjs.com/)

---

## ✨ Features

### 📸 **The Creation Desk (Photobooth)**
- **3-Photo Capture**: Take three portrait photos using your device's camera
- **Live Preview**: See yourself in real-time before capturing each shot
- **Mirrored Display**: Natural selfie-style mirrored video feed
- **Photo Strip Layout**: Classic photobooth strip presentation
- **Retake Option**: Easily retake all photos if needed

### ✍️ **The Typewriter (Letter Composer)**
- **Personalized Messages**: Write your name and a custom letter
- **Vintage Styling**: Typewriter-style font with lined paper effect
- **Background Frames**: Choose from multiple decorative frame backgrounds
- **Export as Image**: Download your complete keepsake (photos + letter) as PNG
- **Real-time Preview**: See your letter appear in the keepsake as you type

### 📖 **The Keepsake Lattice (Guestbook)**
- **Public Registry**: Sign the digital guestbook with your name and message
- **Optional Titles**: Add honorifics or titles to your entry
- **Live Updates**: See all guest entries in real-time
- **Wax Seal Initials**: Each entry displays a decorative wax seal with the guest's initial
- **Scroll Reveal Animation**: Elegant text reveal effect as you scroll
- **Timestamp Display**: All entries show the date they were created

### 🎨 **Design Features**
- **Fully Responsive**: Optimized for mobile (360px+), tablet, and desktop
- **Cottagecore Aesthetic**: Rose gold, vintage cream, and blush pink palette
- **Dynamic Background**: Animated gradient shader background using WebGL (Grainient)
- **Elegant Typography**: 
  - Playfair Display for headers
  - Great Vibes for signatures
  - Special Elite for typewriter text
  - Montserrat for body text
- **CSS Animations**: Smooth transitions and hover effects throughout
- **GSAP Scroll Effects**: Word-by-word text reveal animations

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **Vite** | Fast development server & build tool |
| **Tailwind CSS** | Utility-first styling framework |
| **GSAP + ScrollTrigger** | Advanced scroll-based animations |
| **html2canvas** | Export keepsake as downloadable PNG |
| **OGL (WebGL)** | Dynamic animated background shader |
| **MediaStream API** | Camera access for photobooth |

### **Backend**
| Technology | Purpose |
|------------|---------|
| **NestJS** | TypeScript-based REST API framework |
| **Supabase (PostgreSQL)** | Cloud database for guestbook entries |
| **Supabase Storage** | Future: Image persistence |
| **class-validator** | Request validation |
| **TypeScript** | Type-safe backend code |

### **Deployment**
| Technology | Purpose |
|------------|---------|
| **Vercel** | Monorepo hosting (frontend + backend) |
| **Supabase Cloud** | Managed PostgreSQL database |
| **Vercel Functions** | Serverless API endpoints |

---

## 📁 Project Structure

```
the-keepsake-corner/
├── frontend/                      # React SPA (Vite)
│   ├── public/
│   │   └── frames/               # Background frame images
│   │       ├── frame1.jpg
│   │       ├── frame2.jpg
│   │       ├── frame3.jpg
│   │       └── frame4.jpg
│   ├── src/
│   │   ├── App.jsx               # Main app component with routing logic
│   │   ├── App.css               # Global styles, frames, buttons
│   │   ├── index.css             # Tailwind directives, base styles
│   │   ├── main.jsx              # React entry point
│   │   ├── components/
│   │   │   ├── LandingPage.jsx   # Welcome screen with enter button
│   │   │   ├── LandingPage.css   # Landing page specific styles
│   │   │   ├── RoyalGallery.jsx  # Photobooth camera component
│   │   │   ├── WhistledownTypewriter.jsx  # Letter input & export
│   │   │   ├── SocietyLedger.jsx # Guestbook form & entries list
│   │   │   ├── WaxSeal.jsx       # Decorative wax seal component
│   │   │   ├── ScrollReveal.jsx  # GSAP animated text reveal
│   │   │   ├── Grainient.jsx     # WebGL animated background
│   │   │   └── Grainient.css     # Background shader container
│   │   └── lib/
│   │       └── supabaseClient.js # Supabase client initialization
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js        # Custom colors & theme
│   └── postcss.config.js
│
├── backend/                       # NestJS REST API ⚠️ RENAME api → backend
│   ├── src/
│   │   ├── main.ts               # Bootstrap (localhost:3001)
│   │   ├── app.module.ts         # Root module
│   │   ├── guestbook/
│   │   │   ├── guestbook.controller.ts  # GET/POST /api/guestbook
│   │   │   ├── guestbook.service.ts     # Database operations
│   │   │   ├── guestbook.module.ts
│   │   │   └── dto/
│   │   │       └── create-entry.dto.ts  # Validation schema
│   │   └── supabase/
│   │       ├── supabase.module.ts       # Global Supabase provider
│   │       └── supabase.service.ts      # Supabase client wrapper
│   ├── index.ts                  # Vercel serverless adapter
│   ├── package.json
│   ├── nest-cli.json
│   └── tsconfig.json
│
├── supabase/
│   └── migrations/
│       └── 001_create_guestbook.sql  # Database schema + RLS policies
│
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── package.json                  # Root workspace scripts
├── vercel.json                   # Deployment configuration
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

You'll also need accounts for:
- **Supabase** (free tier) - [Sign up](https://supabase.com/)
- **Vercel** (free tier, optional for deployment) - [Sign up](https://vercel.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/the-keepsake-corner.git
   cd the-keepsake-corner
   ```

2. **⚠️ IMPORTANT: Rename the API folder to backend**
   ```bash
   # Windows
   rename api backend
   
   # Mac/Linux
   mv api backend
   ```
   
   > **Note**: The folder might be locked if you have terminals or IDE running. Close all terminals/VSCode first, then rename the `api` folder to `backend`.

3. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   
   Or install manually:
   ```bash
   # Frontend dependencies
   cd frontend
   npm install
   
   # Backend dependencies
   cd ../backend
   npm install
   ```

4. **Set up Supabase Database**

   a. Create a new project at [supabase.com](https://supabase.com/)
   
   b. Navigate to the SQL Editor and run the migration:
   ```sql
   -- Create guestbook table
   CREATE TABLE guestbook (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     title TEXT,
     message TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

   -- Allow public read access
   CREATE POLICY "Allow public read access"
     ON guestbook FOR SELECT
     TO public
     USING (true);

   -- Allow public insert access
   CREATE POLICY "Allow public insert access"
     ON guestbook FOR INSERT
     TO public
     WITH CHECK (true);

   -- Create index for performance
   CREATE INDEX idx_guestbook_created_at ON guestbook(created_at DESC);
   ```

5. **Configure Environment Variables**

   **Frontend** (`frontend/.env.local`):
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   **Backend** (`backend/.env`):
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   PORT=3001
   ```

   > 💡 Find your Supabase credentials in: **Project Settings → API**

---

## 💻 Development

### Running Locally

**Option 1: Run both frontend and backend separately**

```bash
# Terminal 1 - Frontend (http://localhost:5173)
npm run dev:frontend

# Terminal 2 - Backend API (http://localhost:3001)
npm run dev:backend
```

**Option 2: Frontend only (using Vercel API)**
```bash
cd frontend
npm run dev
# The frontend will use /api routes which Vercel redirects to the backend
```

### Development Workflow

1. **Frontend Development**
   - Hot module replacement enabled
   - Changes reflect instantly in browser
   - Located at `http://localhost:5173`

2. **Backend Development**
   - Auto-restart on file changes (NestJS watch mode)
   - API available at `http://localhost:3001/api/guestbook`
   - Test with: `curl http://localhost:3001/api/guestbook`

3. **Testing Camera Features**
   - **HTTPS Required**: Camera access requires HTTPS in production
   - **Local Development**: Works on `localhost` without HTTPS
   - **Mobile Testing**: Use ngrok or Vercel preview deployments

---

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Connect to GitHub**
   - Push your code to GitHub
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your repository

3. **Configure Environment Variables** in Vercel Dashboard:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

4. **Deploy**
   - Vercel auto-deploys on every push to main
   - Preview deployments for all branches
   - Build command: `cd frontend && npm install && npm run build`
   - Output directory: `frontend/dist`

### Manual Deployment

```bash
# Build both frontend and backend
npm run build:frontend
npm run build:backend

# Deploy using Vercel CLI
vercel --prod
```

---

## 🔌 API Endpoints

### Base URL
- **Local**: `http://localhost:3001/api`
- **Production**: `https://your-domain.vercel.app/api`

### Endpoints

#### `GET /api/guestbook`
Retrieve all guestbook entries, sorted by newest first.

**Response:**
```json
[
  {
    "id": "uuid-string",
    "name": "Lady Whistledown",
    "title": "Society Observer",
    "message": "What a delightful evening...",
    "created_at": "2026-02-15T20:30:00Z"
  }
]
```

#### `POST /api/guestbook`
Create a new guestbook entry.

**Request Body:**
```json
{
  "name": "The Duke of Hastings",
  "title": "Duke",
  "message": "A splendid affair indeed!"
}
```

**Validation:**
- `name`: Required, string, max 100 characters
- `title`: Optional, string, max 50 characters
- `message`: Required, string, max 500 characters

**Response:** `201 Created`
```json
{
  "id": "uuid-string",
  "name": "The Duke of Hastings",
  "title": "Duke",
  "message": "A splendid affair indeed!",
  "created_at": "2026-02-15T20:30:00Z"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "statusCode": 400,
  "message": ["name should not be empty"],
  "error": "Bad Request"
}
```

---

## 🎨 Component Architecture

### **App.jsx** (Main Container)
- Manages global state (photos, letter text, name)
- Controls landing page vs main content visibility
- Provides refs for camera and export functionality
- Wraps everything with Grainient background

### **LandingPage.jsx** (Welcome Screen)
- Animated entrance with fade-in effect
- Ornate oval frame with cottagecore styling
- "Enter the Garden" button to start experience
- Fully responsive (360px - desktop)

### **RoyalGallery.jsx** (Photobooth)
- Uses MediaStream API for camera access
- Captures 3 photos sequentially
- Mirrors video feed for natural selfie view
- Displays photos in classic strip layout
- Canvas-based photo capture with mirroring
- Shows letter text in preview

### **WhistledownTypewriter.jsx** (Letter Composer)
- Text input for name and letter content
- Live preview in RoyalGallery
- Frame selection (4 backgrounds)
- Export using html2canvas
- "Seal with Love" button downloads PNG

### **SocietyLedger.jsx** (Guestbook)
- Two-column layout (form + entries)
- Real-time entry fetching
- Form validation
- ScrollReveal quote animation
- Wax seal icons for each entry
- Formatted timestamps

### **Grainient.jsx** (Animated Background)
- WebGL shader using OGL library
- Smooth gradient animation
- Customizable colors (rose/blush tones)
- Fixed position behind all content
- Performance-optimized

### **ScrollReveal.jsx** (GSAP Animation)
- Word-by-word fade-in effect
- Scroll-triggered animation
- Blur effect on inactive words
- Configurable opacity & blur

### **WaxSeal.jsx** (Decorative Element)
- CSS clip-path for seal shape
- Displays initial letter
- Rose gold color scheme
- Used in guestbook entries

---

## 📱 Responsive Design

The application is fully responsive with **5 breakpoint tiers**:

| Breakpoint | Target | Key Changes |
|------------|--------|-------------|
| **≤1024px** | Tablets landscape | Reduced frame sizes, adjusted spacing |
| **≤768px** | Tablets portrait | Vertical photobooth layout, stacked forms |
| **≤640px** | Mobile standard | Smaller typography, compact buttons |
| **≤480px** | Small phones | Minimized padding, reduced textarea rows |
| **≤360px** | Extra-small | Ultra-compact layout, minimal spacing |

### Mobile Optimizations
- **Overflow Prevention**: `overflow-x: hidden` on html/body/#root
- **Fluid Sizing**: All fixed widths converted to max-width with 100%
- **Flexible Grids**: CSS Grid and Flexbox with responsive breakpoints  
- **Touch-Friendly**: Larger tap targets (44x44px minimum)
- **Reduced Row Counts**: Textareas show 3-5 rows on mobile vs 8 on desktop
- **Proportional Photos**: Photobooth frames use flex-basis for equal sizing
- **Viewport Units**: Text sizes use responsive Tailwind classes

---

## 🎭 Color Palette

```css
/* Primary Colors */
--rose-gold: #B76E79      /* Headers, borders, accents */
--vintage-cream: #FFFDD0  /* Backgrounds, frames */
--deep-rose: #E29DA4      /* Highlights, signatures */

/* Secondary Colors */
--aged-rose: #D4A0A0      /* Body text, subtle elements */
--petal-pink: #FFF5F7     /* Page background */
--moss-green: #8A9A5B     /* "Seal" button accent */

/* Grainient Background */
--gradient-1: #e4c4ca     /* Light blush */
--gradient-2: #e6a7b2     /* Rose pink */
--gradient-3: #edb6bf     /* Soft rose */
```

---

## 🐛 Troubleshooting

### Camera Not Working
- **Issue**: Camera access denied
- **Solution**: Check browser permissions, ensure HTTPS (or localhost)
- **Chrome**: Click lock icon → Site settings → Camera → Allow

### CORS Errors
- **Issue**: API requests blocked
- **Solution**: Backend has CORS enabled by default. Check network tab for actual error.

### Build Fails
- **Issue**: `npm run build` errors
- **Solution**: 
  1. Clear node_modules: `rm -rf node_modules package-lock.json`
  2. Reinstall: `npm install`
  3. Check Node version: `node -v` (needs 18+)

### Supabase Connection Failed
- **Issue**: "Failed to fetch entries"
- **Solution**:
  1. Verify environment variables are set
  2. Check Supabase RLS policies are created
  3. Test connection: `curl https://your-project.supabase.co`

### Photos Show Backwards
- **Issue**: Captured photos are mirrored wrong  
- **Solution**: This is intentional - video is mirrored (natural), photos are un-mirrored (correct orientation)

### Layout Overlaps on Mobile
- **Issue**: Content extends beyond screen
- **Solution**: Verify all breakpoints are working, check for fixed widths, ensure viewport meta tag is present

### Folder Rename Issues
- **Issue**: Cannot rename `api` to `backend` (access denied)
- **Solution**: 
  1. Close all terminals, VSCode, and Node processes
  2. On Windows: Open Task Manager and end all Node processes
  3. Try renaming again via File Explorer or terminal
  4. If still locked, restart your computer and try again

---

## 🔮 Future Enhancements

- [ ] **Persistent Photos**: Upload to Supabase Storage instead of client-only
- [ ] **Photo Gallery**: Public gallery of all keepsakes
- [ ] **Social Sharing**: Share keepsakes to social media
- [ ] **Filters & Effects**: Add vintage filters to photos
- [ ] **Print Layout**: Optimized 4x6" print format
- [ ] **Email Export**: Send keepsake via email
- [ ] **Admin Dashboard**: Moderate guestbook entries
- [ ] **Custom Frames**: User-uploaded frame backgrounds
- [ ] **Dark Mode**: Alternative color scheme
- [ ] **Internationalization**: Multi-language support

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **Fonts**: Google Fonts (Playfair Display, Great Vibes, Special Elite, Montserrat)
- **Icons**: Unicode decorative symbols
- **Inspiration**: Regency-era aesthetics, cottagecore design
- **Libraries**: React, NestJS, Supabase, GSAP, OGL, html2canvas

---

## 💌 Contact & Support

For questions, issues, or feature requests:
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/the-keepsake-corner/issues)

---

**Made with 🌸 and ✨**

*Capturing memories, one keepsake at a time.*
