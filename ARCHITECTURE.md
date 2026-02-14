# Architecture & Data Flow Diagram

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         VERCEL DEPLOYMENT                              │
├──────────────────────────────────────────┬──────────────────────────────┤
│                                          │                              │
│  ┌────────────────────────────────────┐  │  ┌────────────────────────┐  │
│  │   FRONTEND (Static HTML/JS/CSS)    │  │  │  SERVERLESS FUNCTIONS  │  │
│  │   ──────────────────────────────   │  │  │  ──────────────────    │  │
│  │  • React App (Vite)                │  │  │  • NestJS API         │  │
│  │  • Tailwind CSS                    │  │  │  • /api/guestbook     │  │
│  │  • GSAP Animations                 │  │  │    - GET (list)       │  │
│  │  • html2canvas Export              │  │  │    - POST (create)    │  │
│  │                                    │  │  │                       │  │
│  │  URL: regency-keepsake...          │  │  │  Runtime: Node.js 18+ │  │
│  │       .vercel.app                  │  │  │                       │  │
│  └────────────────────────────────────┘  │  └────────────────────────┘  │
│         ↓                                 │         ↓                    │
│    Browser User              Proxy Rule  │    Express Adapter          │
│    (Edge Network)     /api/* → Functions │                             │
└─────────────────────────────────────────────────────────────────────────┘
                    ↓                                  ↓
            ┌───────────────────────────────────────────────────┐
            │          SUPABASE (PostgreSQL + Auth)            │
            ├───────────────────────────────────────────────────┤
            │                                                   │
            │  ┌────────────────────────────────────────────┐  │
            │  │  Database: regency-keepsake               │  │
            │  │  ───────────────────────────────────     │  │
            │  │  • guestbook (table)                     │  │
            │  │    - id (UUID PK)                        │  │
            │  │    - name, title, message (text)         │  │
            │  │    - created_at (timestamp)              │  │
            │  │  • RLS Policies (Public R/W)             │  │
            │  │  • Indexes on created_at                 │  │
            │  └────────────────────────────────────────────┘  │
            │                                                   │
            │  ┌────────────────────────────────────────────┐  │
            │  │  Storage (for future portrait uploads)    │  │
            │  │  ────────────────────────────────────     │  │
            │  │  • Bucket: guestbook-portraits            │  │
            │  │  • Signed URLs (time-limited access)      │  │
            │  └────────────────────────────────────────────┘  │
            │                                                   │
            └───────────────────────────────────────────────────┘
```

---

## 📡 Data Flow

### 1. Upload Portrait (Frontend Only)

```
User Browser
     ↓
[Choose Portrait Button]
     ↓
FileReader API (reads local file)
     ↓
React State: setImage()
     ↓
Display in .gold-frame with sepia filter
     ↓
No network call (stays local until export)
```

### 2. Export Keepsake (html2canvas)

```
User Browser
     ↓
[Seal for Delivery Button]
     ↓
html2canvas(keepsakeRef)
     ↓
Captures: Portrait + Letter together as canvas
     ↓
Convert to data URL
     ↓
Download as PNG file
     ↓
Saved to user's Downloads folder
     ↓
Data NOT sent to any server (client-side only)
```

### 3. Sign Guestbook (GET entries)

```
User Browser
     ↓
SocietyLedger component mounts
     ↓
useEffect: fetch('/api/guestbook')
     ↓
Vercel Function receives request
     ↓
NestJS Router: GET /guestbook
     ↓
GuestbookController.findAll()
     ↓
GuestbookService.findAll()
     ↓
Supabase.select('*').order('created_at', {ascending: false})
     ↓
PostgreSQL Query:
   SELECT * FROM guestbook ORDER BY created_at DESC;
     ↓
Supabase returns array of entries
     ↓
Express response (JSON)
     ↓
Browser receives JSON
     ↓
React renders <ul> with entries
     ↓
Display: Wax seal + name + title + message + date
```

### 4. Sign Guestbook (POST new entry)

```
User Browser
     ↓
Form inputs: name, title, message
     ↓
User clicks "✒ Sign the Ledger"
     ↓
handleSubmit()
     ↓
fetch('/api/guestbook', {
  method: 'POST',
  body: JSON.stringify(formData)
})
     ↓
Vercel Function receives POST request
     ↓
Request Body → CreateGuestbookEntryDto
     ↓
class-validator: validate DTO
     ↓
NestJS Router: POST /guestbook
     ↓
GuestbookController.create(dto)
     ↓
GuestbookService.create(dto)
     ↓
Supabase.insert({
  name: dto.name,
  title: dto.title || null,
  message: dto.message
})
     ↓
PostgreSQL INSERT:
   INSERT INTO guestbook (name, title, message)
   VALUES ('...', '...', '...')
   RETURNING *;
     ↓
Supabase returns inserted row with generated id + timestamp
     ↓
Express response (JSON with new entry)
     ↓
Browser receives entry
     ↓
React updates state
     ↓
List refreshes: calls GET /api/guestbook again
     ↓
New entry appears at top with wax seal + date
     ↓
Form clears for next entry
```

---

## 🔐 Security & Authentication Flow

### Frontend (Supabase Anon Key)

```
Browser
  ↓
supabaseClient.js
  ↓
createClient(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY  ← Public key (OK to expose)
)
  ↓
Used for: Auth, client-side reads (if enabled)
```

### Backend (Service Role Key)

```
Vercel Function
  ↓
process.env.SUPABASE_SERVICE_ROLE_KEY  ← Secret (server-side only)
  ↓
supabaseClient.js
  ↓
createClient(url, SERVICE_ROLE_KEY)
  ↓
Used for: ALL database operations (admin access)
  ↓
Protected by: Vercel environment variables (encrypted)
```

### RLS Policies

```
PostgreSQL Row-Level Security
     ↓
SELECT: allow public read
        → Anyone can fetch guestbook entries
        → No authentication required
     ↓
INSERT: allow public insert with check(true)
        → Anyone can submit a new entry
        → Service role key bypasses RLS
        → DTO validation protects against malformed data
```

---

## 🔄 Component Communication

```
┌─────────────────────────────────────────────────────────────┐
│                    App.jsx (Root)                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ <main> keepsakeRef & portraitRef                     │  │
│  │                                                      │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │ RoyalGallery (Photobooth)                      │  │  │
│  │  │ ────────────────────────────                   │  │  │
│  │  │ • portraitRef (passed down)                    │  │  │
│  │  │ • State: image (local file)                    │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │          ↓ (image state used by)                     │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │ WhistledownTypewriter (Letter)                 │  │  │
│  │  │ ────────────────────────────────────           │  │  │
│  │  │ • keepsakeRef (passed down)                    │  │  │
│  │  │ • Captures portrait + letter together          │  │  │
│  │  │ • State: letter & name (local)                 │  │  │
│  │  │ • OnClick: html2canvas(keepsakeRef)            │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                      │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │ SocietyLedger (Guestbook)                      │  │  │
│  │  │ ────────────────────────────────              │  │  │
│  │  │ • Independent component                        │  │  │
│  │  │ • Form: name, title, message                   │  │  │
│  │  │ • useEffect: fetch('/api/guestbook')           │  │  │
│  │  │ • Display entries with WaxSeal component       │  │  │
│  │  │ • ScrollReveal animation on quote              │  │  │
│  │  │                                                │  │  │
│  │  │  ┌────────────────────────────────────────┐   │  │  │
│  │  │  │ WaxSeal (sub-component)                 │   │  │  │
│  │  │  │ ───────────────────────               │   │  │  │
│  │  │  │ • letter prop (first char of name)     │   │  │  │
│  │  │  │ • CSS-only clip-path decagon           │   │  │  │
│  │  │  └────────────────────────────────────────┘   │  │  │
│  │  │                                                │  │  │
│  │  │  ┌────────────────────────────────────────┐   │  │  │
│  │  │  │ ScrollReveal (sub-component)           │   │  │  │
│  │  │  │ ──────────────────────                │   │  │  │
│  │  │  │ • children = quote text                │   │  │  │
│  │  │  │ • GSAP ScrollTrigger animation         │   │  │  │
│  │  │  │ • Per-word blur + opacity stagger      │   │  │  │
│  │  │  └────────────────────────────────────────┘   │  │  │
│  │  │                                                │  │  │
│  │  │ POST /api/guestbook on form submit             │  │  │
│  │  │ → Refetch & update list                        │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Styling:                                                   │
│  • App.css: Global classes (.gold-frame, .stationery, etc) │
│  • index.css: Tailwind + parchment BG                      │
│  • Tailwind config: Color semantics (@apply utilities)     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔌 API Contract

### Request/Response Examples

**GET /api/guestbook**

```http
GET /api/guestbook HTTP/1.1
Host: api.vercel.app
Accept: application/json
```

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "The Duke of Hastings",
    "title": "Duke",
    "message": "What a delightful evening of wit and refinement.",
    "created_at": "2026-02-14T18:30:00.000Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Lady Bridgerton",
    "title": null,
    "message": "Simply divine! Do mark me down for next Season.",
    "created_at": "2026-02-14T18:15:00.000Z"
  }
]
```

---

**POST /api/guestbook**

```http
POST /api/guestbook HTTP/1.1
Host: api.vercel.app
Content-Type: application/json
Content-Length: 123

{
  "name": "Lady Whistledown",
  "title": "Gossip Correspondent",
  "message": "Dear Reader, this evening has proven most extraordinary..."
}
```

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "name": "Lady Whistledown",
  "title": "Gossip Correspondent",
  "message": "Dear Reader, this evening has proven most extraordinary...",
  "created_at": "2026-02-14T18:45:00.000Z"
}
```

---

## 📊 Database Query Examples

### List Guestbook Entries (Newest First)

```sql
SELECT id, name, title, message, created_at
FROM guestbook
ORDER BY created_at DESC;
```

### Insert New Entry

```sql
INSERT INTO guestbook (name, title, message)
VALUES ('Lady Whistledown', 'Gossip Columnist', 'Extraordinary evening...')
RETURNING id, name, title, message, created_at;
```

### Check RLS Policies

```sql
SELECT * FROM pg_policies WHERE tablename = 'guestbook';
```

---

## 🚀 Deployment Pipeline

```
Local Development
    ↓
    • npm run dev (frontend: :5173)
    • npm run start:dev (backend: :3001)
    • .env.local & .env (not committed)
    ↓
Code Commit to GitHub
    ↓
    • git add .
    • git commit
    • git push origin main
    • ✅ Files pushed to GitHub
    ↓
Vercel Detects Push
    ↓
    • Webhook received from GitHub
    • Clone repo
    • Install dependencies
    ↓
Vercel Build
    ↓
    • Run: cd frontend && npm install && npm run build
    • Output: frontend/dist/
    • Build API: NestJS → api/dist/
    • Package functions for serverless
    ↓
Vercel Deploy
    ↓
    • Upload static files (CDN edge nodes)
    • Deploy serverless functions
    • Set environment variables (Supabase keys)
    • Configure rewrites (SPA + API routing)
    ↓
Production Live
    ↓
    • 🌍 https://regency-keepsake-photobooth.vercel.app
    • 📊 Supabase database reads/writes
    • 📈 Analytics & logs available
```

---

## 📱 Responsive Breakpoints

```
Mobile (< 640px)
  │
  ├─ .gold-frame: 260×340px
  ├─ Padding: 1.5rem
  ├─ Single column layout
  ├─ Stack buttons vertically
  │
Desktop (≥ 640px)
  │
  ├─ .gold-frame: 320×400px
  ├─ Padding: 2.5rem
  ├─ Side-by-side buttons
  ├─ Wider form inputs
  │
Max (≥ 1280px)
  │
  ├─ Container max-w-5xl
  ├─ Better spacing
  ├─ Optimal line lengths
```

---

## 🆔 Data Types Reference

| Field | Type | Example |
|-------|------|---------|
| `id` | UUID v4 | `550e8400-e29b-41d4-a716-446655440000` |
| `name` | string (1–100) | `"Lady Whistledown"` |
| `title` | string (0–100, nullable) | `"Gossip Correspondent"` or `null` |
| `message` | string (1–1000) | `"Extraordinary evening..."` |
| `created_at` | timestamp (UTC) | `2026-02-14T18:30:00.000Z` |

---

**May this diagram guide your understanding of The Regency Keepsake's elegant architecture!** 🎭✨
