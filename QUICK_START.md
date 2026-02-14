# The Regency Keepsake — Quick Start Terminal Commands

**Copy & paste these commands in order. Replace placeholders with your actual values.**

---

## PART 1: GitHub Setup (5 minutes)

Open a terminal in VS Code at the workspace root.

```bash
# 1. Initialize git repo and commit all files
cd c:\Users\Sheila\Downloads\Photobooth
git init
git add .
git commit -m "Initial commit: The Regency Keepsake SPA"

# 2. Set main branch and add remote origin
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/regency-keepsake-photobooth.git

# 3. Push to GitHub
git push -u origin main
```

**After this, your repo will be at:**
```
https://github.com/YOUR_USERNAME/regency-keepsake-photobooth
```

---

## PART 2: Supabase Setup (10 minutes)

### 2.1 Create a Supabase Project

**In browser:**
1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **New Project**
3. Fill in:
   - **Project name**: `regency-keepsake`
   - **Database password**: (create a strong one)
   - **Region**: (select nearest to you)
4. Click **Create new project** (wait 1–2 minutes)

### 2.2 Create the Guestbook Table

**In Supabase dashboard:**
1. Navigate to **SQL Editor**
2. Click **New Query**
3. Copy and paste this entire SQL block:

```sql
-- ═══════════════════════════════════════════════════
-- Supabase SQL: Create the guestbook table
-- ═══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS guestbook (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  title      TEXT,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read entries
CREATE POLICY "Allow public read" ON guestbook
  FOR SELECT USING (true);

-- Allow anyone to insert entries (for the public guestbook)
CREATE POLICY "Allow public insert" ON guestbook
  FOR INSERT WITH CHECK (true);

-- Optional: Create an index on created_at for faster ordering
CREATE INDEX IF NOT EXISTS idx_guestbook_created_at
  ON guestbook (created_at DESC);
```

4. Click **Run** at the bottom right
5. Verify: Go to **Table Editor** and confirm `guestbook` table exists

### 2.3 Copy Your Supabase Credentials

**In Supabase dashboard:**
1. Click **Settings** → **API**
2. Find and copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJh...`)
   - **Service Role key** (long string starting with `eyJh...`, marked PRIVATE)

**Save these in a text editor for Step 3!**

---

## PART 3: Create Environment Files (5 minutes)

### 3.1 Create `frontend/.env.local`

**In VS Code:**
1. Right-click on `frontend` folder
2. Click **New File**
3. Name it: `.env.local`
4. Paste this (replace with YOUR values from Step 2.3):

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example** (DO NOT USE — for reference only):
```
VITE_SUPABASE_URL=https://abcdefgh12345.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoMTIzNDUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwOTEwMDAwMCwiZXhwIjoxODk5OTk5OTk5fQ.fake_key_DO_NOT_USE
```

### 3.2 Create `api/.env`

**In VS Code:**
1. Right-click on `api` folder
2. Click **New File**
3. Name it: `.env`
4. Paste this (replace with YOUR values from Step 2.3):

```
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ IMPORTANT**: These files have `.` at the start and won't be committed (already in `.gitignore`)

---

## PART 4: Local Testing (5 minutes)

### 4.1 Terminal 1: Start the Backend

```bash
cd c:\Users\Sheila\Downloads\Photobooth\api
npm run start:dev
```

**Expected output:**
```
[Nest] 12345  - 02/14/2026, 3:45:00 PM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 02/14/2026, 3:45:01 PM     LOG API running on http://localhost:3001
```

### 4.2 Terminal 2: Start the Frontend

```bash
cd c:\Users\Sheila\Downloads\Photobooth\frontend
npm run dev
```

**Expected output:**
```
VITE v5.4.21  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### 4.3 Test in Browser

1. Open [http://localhost:5173](http://localhost:5173)
2. Test all features:
   - Upload a portrait image → should appear in gold frame with sepia filter
   - Write a letter → should display on cream stationery
   - Click "⚜ Seal for Delivery" → should download PNG
   - Fill in name/message in guestbook → click "✒ Sign the Ledger"
   - Verify entry appears in the list below

**If all works, you're ready for production!**

---

## PART 5: Deploy to Vercel (10 minutes)

### 5.1 Connect GitHub to Vercel

**In browser:**
1. Go to [vercel.com](https://vercel.com) and log in (or create account with GitHub)
2. Click **Add New** → **Project**
3. Click **Import Git Repository**
4. Search for: `regency-keepsake-photobooth`
5. Click the result to select it

### 5.2 Configure Build Settings

**Vercel will auto-detect the monorepo structure. Verify:**

- **Root Directory**: `.` (current)
- **Framework**: None (monorepo, custom)
- **Build Command**: Overwrite with:
  ```
  cd frontend && npm install && npm run build
  ```
- **Output Directory**: `frontend/dist`

### 5.3 Add Environment Variables

On the same page, scroll to **Environment Variables** and add these 4 variables:

| Variable Name | Value |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon public key |
| `SUPABASE_URL` | Your Supabase Project URL (same as above) |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |

**Paste the values you saved from Step 2.3!**

### 5.4 Deploy

Click the **Deploy** button at the bottom right.

**Wait for build to complete** (2–3 minutes). You should see:
- ✅ Deployment building...
- ✅ Functions deployed
- ✅ Production deployment ready

Once you see **"✓ Production"** in green, your app is live!

### 5.5 Get Your Live URL

After deployment completes, Vercel will show you a live URL like:
```
https://regency-keepsake-photobooth.vercel.app
```

Click it to test your live app!

---

## PART 6: Verify Production (5 minutes)

### Test Everything Works

1. Go to `https://your-vercel-deployment-url.vercel.app`
2. Upload a portrait
3. Write a letter and seal it
4. Submit a guestbook entry
5. Refresh the page and verify your entry appears

### Check Supabase Logs

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click your **regency-keepsake** project
3. Go to **Logs** to see API calls
4. Verify new guestbook entries appear

---

## QUICK REFERENCE: Key Commands

```bash
# Start backend dev
cd api && npm run start:dev

# Start frontend dev
cd frontend && npm run dev

# Build frontend for production
cd frontend && npm run build

# Build backend
cd api && npm run build

# Check for TypeScript errors
cd api && npx tsc --noEmit

# Push latest code to GitHub
git add .
git commit -m "Your message"
git push

# Redeploy from Vercel (if needed)
# Go to: https://vercel.com → Project → Deployments → Latest → 3 dots → Redeploy
```

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---|---|
| **Guestbook entries not showing** | Check Vercel env vars are set. Go to **Settings** → **Environment Variables** and verify all 4 keys. Then **Redeploy**. |
| **"Cannot fetch from Supabase"** | Verify `SUPABASE_SERVICE_ROLE_KEY` is correct (not anon key). Check in Vercel logs. |
| **"Module not found"** | Delete `api/package-lock.json`, commit, push, redeploy. |
| **Portrait upload fails** | Check browser console (F12) for CORS errors. Likely local issue, not deployment issue. |
| **Seal for Delivery does nothing** | Check F12 console. Ensure javascript is enabled. May be ad-blocker blocking canvas. |

---

## You're Done! 🎭✨

Your **Regency Keepsake** is now:
- ✅ Hosted on GitHub
- ✅ Connected to Supabase database
- ✅ Deployed on Vercel with serverless functions
- ✅ Live on the internet!

Share your URL with friends!
