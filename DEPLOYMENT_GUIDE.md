# The Regency Keepsake — Complete Deployment Guide

**From GitHub → Supabase → Vercel**

---

## 📋 Table of Contents
1. [Step 1: GitHub Setup](#step-1-github-setup)
2. [Step 2: Supabase Configuration](#step-2-supabase-configuration)
3. [Step 3: Environment Variables](#step-3-environment-variables)
4. [Step 4: Local Testing](#step-4-local-testing)
5. [Step 5: Vercel Deployment](#step-5-vercel-deployment)
6. [Step 6: Production Verification](#step-6-production-verification)

---

## Step 1: GitHub Setup

### 1.1 Initialize Git Repository in VS Code

Run these commands in the terminal at the workspace root (`c:\Users\Sheila\Downloads\Photobooth`):

```bash
cd c:\Users\Sheila\Downloads\Photobooth
git init
git add .
git commit -m "Initial commit: The Regency Keepsake SPA"
```

### 1.2 Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Enter repository name: `regency-keepsake-photobooth`
3. Description: "A single-page Regency-themed digital keepsake with photobooth, typewriter, and guestbook."
4. Choose **Public** (recommended for portfolio) or **Private**
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

### 1.3 Push to GitHub

After creating the repo, GitHub will show you the commands. Run:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/regency-keepsake-photobooth.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username.**

### 1.4 Verify

Go to `https://github.com/YOUR_USERNAME/regency-keepsake-photobooth` and confirm all files are there.

---

## Step 2: Supabase Configuration

### 2.1 Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **New Project**
3. **Project name**: `regency-keepsake` (or similar)
4. **Database password**: Create a strong password & save it securely
5. **Region**: Choose nearest to your users (e.g., us-east-1, eu-west-1)
6. Click **Create new project** (this takes 1–2 minutes)

### 2.2 Run the Database Migration

Once your Supabase project is ready:

1. Navigate to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy and paste the entire contents of [supabase/migrations/001_create_guestbook.sql](./supabase/migrations/001_create_guestbook.sql)
4. Click **Run** at the bottom right

**Expected output**: "Success. No rows returned"

This creates:
- `guestbook` table with columns: `id`, `name`, `title`, `message`, `created_at`
- Row-level security policies (public read + insert)
- Index on `created_at` for fast ordering

### 2.3 Verify the Table

Go to **Table Editor** in Supabase. You should see:
- `guestbook` table listed
- Columns: `id` (uuid), `name` (text), `title` (text), `message` (text), `created_at` (timestamptz)

---

## Step 3: Environment Variables

### 3.1 Get Your Supabase Credentials

In your Supabase project dashboard:

1. Click **Settings** → **API**
2. Find and copy:
   - **Project URL** → `VITE_SUPABASE_URL` and `SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`
   - **Service Role key** → `SUPABASE_SERVICE_ROLE_KEY`

### 3.2 Local `.env` Setup

Create two `.env` files:

**`frontend/.env.local`:**
```
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc... (your anon public key)
```

**`api/.env`:**
```
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (your service role key)
```

### 3.3 Add `.env` to `.gitignore`

✅ Already done in [.gitignore](./.gitignore) — your `.env` files won't be committed.

---

## Step 4: Local Testing

### 4.1 Terminal 1: Start the NestJS Backend

```bash
cd c:\Users\Sheila\Downloads\Photobooth\api
npm run start:dev
```

**Expected output:**
```
[Nest] 12345  - 02/14/2026, 3:45:00 PM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 02/14/2026, 3:45:01 PM     LOG API running on http://localhost:3001
```

### 4.2 Terminal 2: Start the React Frontend

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

### 4.3 Test the Application

1. Open [http://localhost:5173](http://localhost:5173)
2. **Royal Gallery**: Upload a portrait image
3. **Whistledown Typewriter**: Write a test letter
4. **Seal for Delivery**: Click the button to export as PNG
5. **Society Ledger**: Fill out the form and click "✒ Sign the Ledger"
6. Verify the entry appears in the list

**If it works locally, you're ready for Vercel!**

---

## Step 5: Vercel Deployment

### 5.1 Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (or create account)
2. Click **Add New** → **Project**
3. Click **Import Git Repository**
4. Search for `regency-keepsake-photobooth` and click **Import**

### 5.2 Configure Environment Variables in Vercel

Vercel will show you a "Configure Project" page:

**Root Directory**: Select "." (current directory) — Vercel will auto-detect the monorepo

**Environment Variables**: Add all four variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Copy/paste the values from your Supabase dashboard.

**Important**: Make sure these are available to **both** production and preview environments.

### 5.3 Verify Vercel Config

Check that [vercel.json](./vercel.json) exists at the root with:
```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "functions": {
    "api/dist/**/*.js": {
      "runtime": "@vercel/node@3"
    }
  }
}
```

✅ Already included in the project.

### 5.4 Deploy

Click **Deploy** on the Vercel dashboard.

**Expected build time**: 2–3 minutes

**Build output checklist**:
- ✅ `frontend/dist/index.html` created
- ✅ `api/dist` built
- ✅ No TypeScript or build errors

Once the green "✓ Production" indicator appears, your app is live!

---

## Step 6: Production Verification

### 6.1 Test Your Live App

1. Vercel will give you a URL like: `https://regency-keepsake-photobooth.vercel.app`
2. Open it and verify:
   - Page loads without errors
   - Parchment background, gold styling visible
   - Can upload portrait image
   - Can write letter and export
   - Can submit guestbook entry
   - Can see fetched entries from Supabase

### 6.2 Check API Logs

In Vercel dashboard:
1. Click your project
2. Go to **Logs** tab
3. Check for any 500 errors from `/api/guestbook`

**If you see errors**, check:
- Environment variables are set (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)
- Supabase project is still accessible
- Network/CORS issues (unlikely with Vercel + Supabase free tier)

### 6.3 Monitor Supabase

In Supabase dashboard:
1. Go to **SQL Editor** → **Guestbook Table**
2. Verify new entries appear when you submit from production

### 6.4 Set Up Custom Domain (Optional)

In Vercel project settings:
1. Go to **Settings** → **Domains**
2. Add your custom domain (e.g., `keepsake.yourdomain.com`)
3. Follow Vercel's DNS configuration instructions

---

## Quick Reference: Deployment Checklist

- [ ] GitHub repo created and all code pushed
- [ ] Supabase project created
- [ ] Guestbook table created via SQL migration
- [ ] `.env.local` and `api/.env` filled with Supabase credentials
- [ ] Local testing successful (both dev servers running)
- [ ] Vercel project created and connected to GitHub
- [ ] Environment variables added to Vercel
- [ ] First deployment successful
- [ ] Live app tested and verified
- [ ] Custom domain added (optional)

---

## Troubleshooting

### Frontend loads but guestbook is empty / errors fetching entries

**Cause**: Environment variables not loaded in Vercel

**Fix**:
1. In Vercel dashboard, go to **Settings** → **Environment Variables**
2. Verify all four Supabase variables are there
3. Redeploy: Click **Deployments** → Latest → **3 dots** → **Redeploy**

### Seal for Delivery button does nothing

**Cause**: `html2canvas` might fail in production if CORS restricted

**Fix**: The current implementation uses local HTML/canvas, should work. If it doesn't:
1. Check browser console (F12) for errors
2. Ensure no ad-blockers blocking canvas operations

### Can write letter but POST fails

**Cause**: NestJS API not reaching Supabase, or validation error

**Fix**:
1. Check Vercel function logs for 500 errors
2. Verify `SUPABASE_SERVICE_ROLE_KEY` is correct (not anon key)
3. Ensure guestbook table exists in Supabase

### "Cannot find module @nestjs/..." errors in Vercel logs

**Cause**: `api/package.json` dependencies not installed

**Fix**: The `vercel.json` build command includes `npm install`. If still failing:
1. Delete `api/package-lock.json`
2. Commit and push
3. Redeploy from Vercel

---

## Production Tips

1. **Hide sensitive keys**: Never commit `.env` files. Use Vercel's secure environment variable management.
2. **Monitor Supabase usage**: Free tier = 2GB storage, 50K monthly active users. Upgrade if needed.
3. **Set up alerts**: In Vercel, enable email notifications for failed deployments.
4. **Backup guestbook data**: Periodically export from Supabase SQL Editor.
5. **Use Vercel Analytics**: Add it to track performance and user behavior.

---

**You're all set! Your Regency Keepsake is now live on the web. 🎭✨**
