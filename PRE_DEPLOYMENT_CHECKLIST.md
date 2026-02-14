# Pre-Deployment Checklist ✓

**Use this checklist before pushing to GitHub and deploying to Vercel.**

---

## 📦 Project Files & Structure

- [ ] All frontend files exist:
  - [ ] `frontend/src/App.jsx`
  - [ ] `frontend/src/App.css`
  - [ ] `frontend/src/index.css`
  - [ ] `frontend/src/main.jsx`
  - [ ] `frontend/src/components/RoyalGallery.jsx`
  - [ ] `frontend/src/components/WhistledownTypewriter.jsx`
  - [ ] `frontend/src/components/SocietyLedger.jsx`
  - [ ] `frontend/src/components/ScrollReveal.jsx`
  - [ ] `frontend/src/components/WaxSeal.jsx`
  - [ ] `frontend/src/lib/supabaseClient.js`

- [ ] All backend files exist:
  - [ ] `api/src/main.ts`
  - [ ] `api/src/app.module.ts`
  - [ ] `api/src/supabase/supabase.module.ts`
  - [ ] `api/src/supabase/supabase.service.ts`
  - [ ] `api/src/guestbook/guestbook.module.ts`
  - [ ] `api/src/guestbook/guestbook.controller.ts`
  - [ ] `api/src/guestbook/guestbook.service.ts`
  - [ ] `api/src/guestbook/dto/create-entry.dto.ts`

- [ ] Config files:
  - [ ] `frontend/package.json` (has React, Vite, GSAP, html2canvas, Supabase)
  - [ ] `frontend/vite.config.js` (has proxy to :3001)
  - [ ] `frontend/tailwind.config.js` (has custom colors + fonts)
  - [ ] `frontend/postcss.config.js`
  - [ ] `frontend/index.html` (links Google Fonts)
  - [ ] `api/package.json` (has NestJS, Supabase)
  - [ ] `api/tsconfig.json`
  - [ ] `api/nest-cli.json`
  - [ ] Root `package.json` (has workspaces)
  - [ ] `vercel.json` (monorepo config)

- [ ] Documentation:
  - [ ] `README.md` (this file)
  - [ ] `DEPLOYMENT_GUIDE.md`
  - [ ] `QUICK_START.md`
  - [ ] `.env.example`

- [ ] Database:
  - [ ] `supabase/migrations/001_create_guestbook.sql` (table DDL)

---

## 💾 Dependencies

### Frontend (`frontend/package.json`)

```bash
cd frontend && npm list
```

Should include:
- [ ] `react@^18.3.1`
- [ ] `react-dom@^18.3.1`
- [ ] `vite@^5.4.0`
- [ ] `@vitejs/plugin-react@^4.3.1`
- [ ] `tailwindcss@^3.4.6`
- [ ] `autoprefixer@^10.4.19`
- [ ] `postcss@^8.4.39`
- [ ] `gsap@^3.12.5`
- [ ] `html2canvas@^1.4.1`
- [ ] `@supabase/supabase-js@^2.45.0`

### Backend (`api/package.json`)

```bash
cd api && npm list
```

Should include:
- [ ] `@nestjs/common@^10.3.10`
- [ ] `@nestjs/core@^10.3.10`
- [ ] `@nestjs/platform-express@^10.3.10`
- [ ] `@supabase/supabase-js@^2.45.0`
- [ ] `reflect-metadata@^0.2.2`
- [ ] `rxjs@^7.8.1`
- [ ] `class-validator@^0.14.1`
- [ ] `class-transformer@^0.5.1`

---

## 🛠️ Local Testing

### Backend Startup

```bash
cd api && npm run start:dev
```

- [ ] No TypeScript compilation errors
- [ ] Server starts without crashing
- [ ] Console shows: `"API running on http://localhost:3001"`

### Frontend Startup

```bash
cd frontend && npm run dev
```

- [ ] Vite dev server starts
- [ ] No build warnings
- [ ] Console shows: `"Local: http://localhost:5173/"`

### Feature Testing (at http://localhost:5173)

#### Royal Gallery
- [ ] Page loads with creamy-ivory background
- [ ] "The Royal Gallery" heading visible
- [ ] "Choose Portrait" button clickable
- [ ] Can upload an image (jpg/png)
- [ ] Image displays in gold frame with sepia filter

#### Whistledown Typewriter
- [ ] "Thy Name" input visible
- [ ] "Thy Letter" textarea with line pattern visible
- [ ] Text lines align with CSS grid
- [ ] "⚜ Seal for Delivery" button clickable
- [ ] Clicking downloads PNG (check Downloads folder)

#### Society Ledger Form
- [ ] Form visible below the ScrollReveal quote
- [ ] "Thy Name" (required) input works
- [ ] "Title / Honorific" (optional) input works
- [ ] "Message" (required) textarea works
- [ ] "✒ Sign the Ledger" button clickable
- [ ] Submission succeeds (no 400/500 errors)
- [ ] Success: Form clears and new entry appears below

#### Society Ledger List
- [ ] Entries display with wax seal stamp
- [ ] Guest name in Great Vibes font (signature style)
- [ ] Title shown in italics below name
- [ ] Message text visible
- [ ] Date formatted correctly (e.g., "14 February 2026")
- [ ] Newest entries appear first
- [ ] ScrollReveal quote animates on scroll

#### Design & Styling
- [ ] Parchment background texture visible
- [ ] Antique gold headers (#D4AF37) visible
- [ ] Buttons have gold gradient + hover effect
- [ ] Wax seals are decagonal red circles
- [ ] Typography: Playfair = headers, Special Elite = stationery, Great Vibes = signatures
- [ ] Responsive: works on mobile, tablet, desktop

---

## 🔧 Environment Setup

- [ ] `frontend/.env.local` exists with:
  ```
  VITE_SUPABASE_URL=https://xxxxx.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJh...
  ```

- [ ] `api/.env` exists with:
  ```
  SUPABASE_URL=https://xxxxx.supabase.co
  SUPABASE_SERVICE_ROLE_KEY=eyJh...
  ```

- [ ] Both `.env` files in `.gitignore` (verify with `git status`)

---

## 📊 Supabase Verification

- [ ] Supabase project created at [app.supabase.com](https://app.supabase.com)
- [ ] Guestbook table created (SQL migration run successfully)
- [ ] Table has correct columns: `id`, `name`, `title`, `message`, `created_at`
- [ ] RLS policies created (public read + insert)
- [ ] Test entry can be inserted via Supabase UI
- [ ] API credentials visible and copied correctly

---

## 🔨 Build Verification

### Frontend Build

```bash
cd frontend && npm run build
```

- [ ] No build errors
- [ ] Output created: `frontend/dist/index.html`
- [ ] Bundle size reasonable (~500KB gzipped is normal for React + GSAP)

### Backend Build

```bash
cd api && npm run build
```

- [ ] No TypeScript errors
- [ ] Output created: `api/dist/`
- [ ] `dist/main.js` exists

### Type Checking

```bash
cd api && npx tsc --noEmit
```

- [ ] Zero errors/warnings

---

## 🐙 GitHub Preparation

### Git Status

```bash
git status
```

Should show:
- [ ] No uncommitted changes (except `.env` files which should be untracked)
- [ ] `.env` and `.env.local` listed under "Untracked files"
- [ ] All source files are tracked

### .gitignore Check

```bash
cat .gitignore
```

Should include:
- [ ] `node_modules/`
- [ ] `dist/`
- [ ] `.env`
- [ ] `.env.local`
- [ ] `*.log`

### Initialize & Commit

```bash
git init
git add .
git commit -m "Initial commit: The Regency Keepsake SPA"
git branch -M main
```

- [ ] Git initialized
- [ ] All files staged (except `.env`)
- [ ] Commit successful with message

---

## 🚀 Deploy to Vercel

### Before Pushing to GitHub

- [ ] All files committed locally
- [ ] No uncommitted changes
- [ ] `.env` files NOT committed

### Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/regency-keepsake-photobooth.git
git push -u origin main
```

- [ ] Repository created at `github.com/YOUR_USERNAME/regency-keepsake-photobooth`
- [ ] All files pushed successfully
- [ ] GitHub repo is public (or private if preferred)

### Configure Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Import your GitHub repository
3. Configure project:
   - [ ] Root directory: `.` (auto-detected)
   - [ ] Build command: `cd frontend && npm install && npm run build`
   - [ ] Output directory: `frontend/dist`

4. Add environment variables (all 4):
   - [ ] `VITE_SUPABASE_URL`
   - [ ] `VITE_SUPABASE_ANON_KEY`
   - [ ] `SUPABASE_URL`
   - [ ] `SUPABASE_SERVICE_ROLE_KEY`

5. Click **Deploy**
   - [ ] Build completes (watch logs for errors)
   - [ ] Functions compiled
   - [ ] ✓ Production deployment ready

---

## ✅ Production Verification

### Site Loads

- [ ] Live URL accessible (e.g., `https://regency-keepsake-photobooth.vercel.app`)
- [ ] Page loads without 404 or 500 errors
- [ ] Styling loads correctly (gold, cream, parchment visible)

### Features Work

- [ ] Upload portrait → displays in frame
- [ ] Write letter → "Seal for Delivery" works (downloads PNG)
- [ ] Submit guestbook → new entry appears immediately
- [ ] Page refresh → entries still there (persisted in Supabase)

### Performance

- [ ] No console errors (F12 Developer Tools)
- [ ] Network tab shows no failed requests
- [ ] Page loads in <3 seconds

### API Testing

Open browser console and test:

```javascript
// Fetch all entries
fetch('/api/guestbook').then(r => r.json()).then(console.log)

// Create test entry
fetch('/api/guestbook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Test User', message: 'Test message' })
}).then(r => r.json()).then(console.log)
```

- [ ] Both requests succeed
- [ ] API returns proper JSON

---

## 📋 Final Checklist

- [ ] All source code committed to GitHub
- [ ] Environment variables set in Vercel
- [ ] Vercel deployment successful
- [ ] Live site tested and works
- [ ] Supabase credentials are secret (not in repo)
- [ ] No sensitive keys in code or commits
- [ ] README up to date
- [ ] DEPLOYMENT_GUIDE.md up to date
- [ ] QUICK_START.md up to date

---

## 🎉 You're Ready!

Once all items are checked:

1. Your code is safely versioned on GitHub
2. Your app functions on Vercel (serverless)
3. Your data persists in Supabase (PostgreSQL)
4. You have a professional, elegant digital keepsake app

**Share your live URL with friends and family!**

```
https://regency-keepsake-photobooth.vercel.app
```

---

## 🆘 Troubleshooting Checklist

If something fails:

| Issue | Check |
|-------|-------|
| **Guestbook entries 404** | [ ] Supabase table exists [ ] RLS policies are correct [ ] API credentials in Vercel env vars |
| **Portrait won't upload** | [ ] Check browser console for errors [ ] Ensure file is JPG/PNG [ ] Clear browser cache |
| **API 500 errors** | [ ] Check Vercel function logs [ ] Verify SUPABASE_SERVICE_ROLE_KEY [ ] Ensure guestbook table exists |
| **Vite build fails locally** | [ ] Delete `frontend/node_modules` and `frontend/package-lock.json` [ ] Run `npm install` again [ ] Restart dev server |
| **TypeScript errors** | [ ] Run `cd api && npx tsc --noEmit` [ ] Check for missing types [ ] Ensure all imports are correct |

---

**Until the next Season!** 🎭✨
