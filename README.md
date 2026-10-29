# Jesus Christ Lord & Savior Church (JCLS) Website

Official production-ready website for **Jesus Christ Lord & Savior Church**, located at 71 Hills Street, Talanay Area C, Brgy. Batasan Hills, Quezon City, Philippines.

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and backed by a normalized **PostgreSQL** relational database with an offline-first client persistence fallback.

---

## 📖 Table of Contents

- [Quick Start](#-quick-start)
- [Public Website vs. Private Admin Portal](#-public-website-vs-private-admin-portal)
- [Admin Authentication & Dashboard](#-admin-authentication--dashboard)
- [PostgreSQL Database & Migrations](#-postgresql-database--migrations)
- [Environment Variables Configuration](#-environment-variables-configuration)
- [Visitor Form Submissions & Data Routing](#-visitor-form-submissions--data-routing)
- [Content Management & Editing](#-content-management--editing)
- [Image Asset Management Checklist](#-image-asset-management-checklist)
- [Project Directory Structure](#-project-directory-structure)

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
- **Public Website:** [http://localhost:5173](http://localhost:5173)
- **Private Admin Portal:** [http://localhost:5173/admin](http://localhost:5173/admin)

### 3. Build for Production
```bash
npm run build
```
Type checks and bundles the production assets into `/dist`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🛡️ Public Website vs. Private Admin Portal

To ensure complete privacy and security:
* **No Prototype Controls on Public Pages:** All administrative badges, in-place edit buttons, placeholder indicators, and sample statistics have been permanently removed from public pages.
* **Separation of Concerns:** The admin experience is completely isolated in `src/components/admin/AdminApp.tsx` and never leaks into public layouts, footers, or search modals.
* **Discreet Staff Entry:** Public users see only a clean, faith-centered design. Church staff can access the portal via `/admin` or by clicking the small, discrete **"Staff Login"** link in the website footer.

---

## 🔐 Admin Authentication & Dashboard

### Logging In
1. Navigate to **[http://localhost:5173/admin](http://localhost:5173/admin)**.
2. Enter the administrator password (default dev password: `jcls2026!`).
3. Click **"Sign In to Dashboard"**.

### Security Protections:
- **Client & Server Hash Verification:** Passwords are never stored in plaintext. They are verified using SHA-256 Web Crypto hashing.
- **Brute-Force Rate Limiting:** 5 consecutive failed login attempts trigger an automated 60-second security lockout.
- **Session Expiry:** Authenticated sessions persist in secure `sessionStorage` with an automated 8-hour timeout.

### 10 Admin Dashboard Modules:
| Module | Description |
|---|---|
| **Overview** | Real-time counts for new submissions, planned visits, prayer requests, recent activity feed, and PostgreSQL status. |
| **Visitor Connections** | Inquiries from ministry cards. Search, filter, update workflow status (`New` &rarr; `In Progress` &rarr; `Contacted` &rarr; `Completed` &rarr; `Archived`), and delete with confirmation. |
| **Planned Visits** | Guest pre-registrations with party size, kids ministry flags, and status management. Also writes to `data/JCLS_Visit_Bookings.xlsx`. |
| **Prayer Requests** | Confidential intercessory requests marked with pastoral privacy notices, category filters, and status triage. |
| **Contact Inquiries** | General questions submitted from the Contact page with read status and administrative notes. |
| **Ministries** | View and edit meeting schedules, descriptions, and audience targeting for the 6 church ministries. |
| **Events** | Create, edit, publish/unpublish, and delete church events (e.g. Annual Church Thanksgiving). |
| **Messages / Sermons** | Manage sermon video links, speakers, scripture passages, and toggle featured sermons. |
| **Leadership** | Manage profiles and biographies for pastoral elders and ministry directors. |
| **Website Settings** | Live editor for church name, address, telephone, email, office hours, and confirmed service times. |

---

## 🗄️ PostgreSQL Database & Migrations

The database architecture is defined in [db/schema.sql](file:///c:/ereb/CODE%20PROJECTS/JCLS%20Website/db/schema.sql) and preloaded with verified church records in [db/seed.sql](file:///c:/ereb/CODE%20PROJECTS/JCLS%20Website/db/seed.sql).

### 1. Local PostgreSQL Setup (Windows)
1. Verify the PostgreSQL service is running (`postgresql-x64-18` on port 5432).
2. Create the database in pgAdmin or PowerShell:
   ```powershell
   "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE jcls_church;"
   ```
3. Copy `.env.example` to `.env` and set your password:
   ```env
   PGPASSWORD=your_actual_postgres_password
   ```
4. Run the automated schema migration and seed script:
   ```bash
   npm run db:setup
   ```

### 2. Creating an Administrator Account
Run the secure CLI script to hash the password and insert the admin into PostgreSQL:
```bash
npm run db:create-admin <email> <password> "<full_name>" [role]
```
**Example:**
```bash
npm run db:create-admin admin@jclschurch.org MySecurePassword2026! "Rev. Zaldy Ordonio" superadmin
```
The script will output the corresponding `VITE_ADMIN_PASSWORD_HASH` to paste into your `.env`.

### 3. Production Deployment (Cloud PostgreSQL)
Your local computer database cannot be reached directly by Vercel. For live production:
1. Create a free PostgreSQL instance on [Neon](https://neon.tech), [Supabase](https://supabase.com), or Vercel Postgres.
2. In Vercel Project Settings, add the `DATABASE_URL` environment variable:
   ```env
   DATABASE_URL=postgresql://user:password@ep-sample.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
3. Run migrations against the cloud endpoint:
   ```bash
   DATABASE_URL="your-connection-string" node db/setup.js
   ```

---

## ⚙️ Environment Variables Configuration

Template file: [.env.example](file:///c:/ereb/CODE%20PROJECTS/JCLS%20Website/.env.example)

```env
# ----------------------------------------------------------------------------
# 1. POSTGRESQL DATABASE CONFIGURATION
# ----------------------------------------------------------------------------
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your_local_postgres_password_here
PGDATABASE=jcls_church
DATABASE_SSL=false

# OR cloud connection string:
# DATABASE_URL=postgresql://user:password@ep-sample.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# ----------------------------------------------------------------------------
# 2. ADMINISTRATOR AUTHENTICATION
# ----------------------------------------------------------------------------
# SHA-256 hash of the master password. Default: jcls2026!
VITE_ADMIN_PASSWORD_HASH=6c367e9894e1cf6f9d43d172088f118182b84eb2e3a1bbbc91aa83c5092eb321

# Session secret for API token verification
ADMIN_SESSION_SECRET=replace_with_a_random_32_character_secret_string

# ----------------------------------------------------------------------------
# 3. ENVIRONMENT & APPLICATION
# ----------------------------------------------------------------------------
NODE_ENV=development
PORT=5173
VITE_APP_URL=http://localhost:5173
```

---

## 📝 Visitor Form Submissions & Data Routing

| Form Name | Public Component | Storage & Processing | Dashboard Destination |
|---|---|---|---|
| **Connect with a Ministry** | [ConnectModal.tsx](file:///c:/ereb/CODE%20PROJECTS/JCLS%20Website/src/components/modals/ConnectModal.tsx) | `submissionService.addMinistryConnection()` | **Visitor Connections** |
| **Plan Your Visit** | [PlanVisitModal.tsx](file:///c:/ereb/CODE%20PROJECTS/JCLS%20Website/src/components/modals/PlanVisitModal.tsx) | `submissionService.addVisit()` + Excel sync | **Planned Visits** |
| **Confidential Prayer** | [PrayerPage.tsx](file:///c:/ereb/CODE%20PROJECTS/JCLS%20Website/src/pages/PrayerPage.tsx) | `submissionService.addPrayer()` | **Prayer Requests** *(Restricted)* |
| **General Contact** | [ContactPage.tsx](file:///c:/ereb/CODE%20PROJECTS/JCLS%20Website/src/pages/ContactPage.tsx) | `submissionService.addContactInquiry()` | **Contact Inquiries** |
| **Event RSVP** | [EventRsvpModal.tsx](file:///c:/ereb/CODE%20PROJECTS/JCLS%20Website/src/components/modals/EventRsvpModal.tsx) | `submissionService.addRsvp()` | **Events Section** |

> **Automated Excel Backup:** When visitors plan a visit, records are automatically appended/updated in `data/JCLS_Visit_Bookings.xlsx` via Vite middleware, preventing duplicate guest entries.

---

## ✍️ Content Management & Editing

Content can be managed in two ways:

1. **Through the Admin Dashboard (No code needed):**
   - Log into `/admin` &rarr; click **Ministries**, **Events**, **Messages**, or **Website Settings** &rarr; edit values &rarr; click **Save**.
   - Changes persist immediately.
2. **In Source Code:**
   - [src/data/churchData.ts](file:///c:/ereb/CODE%20PROJECTS/JCLS%20Website/src/data/churchData.ts) contains all default verified church data, doctrinal truths (The 16 Fundamental Truths of the Assemblies of God), confirmed leadership, and ministry schedules.

---

## 🖼️ Image Asset Management Checklist

Upload your high-resolution photos into `public/images/` using these exact filenames:

| Page / Area | Filename | Recommended Dimensions | Description |
|---|---|---|---|
| **Homepage** | `church-hero.jpg` | 1920 &times; 1080 (16:9) | Cinematic wide-angle sanctuary or congregation worship photo. |
| **Homepage** | `church-worship.jpg` | 1200 &times; 800 (3:2) | Praise and worship singers and musicians on stage. |
| **Homepage** | `church-community.jpg` | 1200 &times; 800 (3:2) | Members conversing, smiling, and greeting one another warmly. |
| **Events** | `church-thanksgiving.jpg` | 1200 &times; 800 (3:2) | Celebratory photo representing the Annual Church Thanksgiving. |
| **About Page** | `church-about.jpg` | 1920 &times; 800 (16:9) | Wide exterior building or sanctuary panorama for page hero banner. |
| **About Page** | `church-interior.jpg` | 1200 &times; 800 (3:2) | Main sanctuary interior showing pulpit, seating, and worship layout. |
| **Ministries** | `worship.jpg` | 800 &times; 500 (16:10) | Musicians, vocalists, or AV technicians in rehearsal/service. |
| **Ministries** | `young-professionals.jpg` | 800 &times; 500 (16:10) | Working young adults in fellowship or Bible study circle. |
| **Ministries** | `youth.jpg` | 800 &times; 500 (16:10) | Students in high-energy GIMIK youth fellowship. |
| **Ministries** | `children.jpg` | 800 &times; 500 (16:10) | Sunday school children with teachers doing crafts / praise. |
| **Ministries** | `womens.jpg` | 800 &times; 500 (16:10) | Women's fellowship circle or prayer meeting. |
| **Ministries** | `mens.jpg` | 800 &times; 500 (16:10) | Men's breakfast fellowship or service group. |
| **Leadership** | `pastor-zaldy-ordonio.jpg` | 600 &times; 750 (4:5) | Portrait of Rev. Zaldy Ordonio, Senior Pastor. |
| **Leadership** | `rogin-ordonio.jpg` | 600 &times; 750 (4:5) | Portrait of Sis. Rogin Ordonio, Pastoral Elder & Women's Leader. |
| **Leadership** | `genrev-ordonio.jpg` | 600 &times; 750 (4:5) | Portrait of Bro. Genrev Ordonio, Ministry Coordinator. |
| **Leadership** | `isaiah-ordonio.jpg` | 600 &times; 750 (4:5) | Portrait of Bro. Isaiah Ordonio, Creative & Media Leader. |
| **Messages** | `message-01.jpg` | 1280 &times; 720 (16:9) | Thumbnail for "Living Out the Great Commission Every Day". |
| **Messages** | `message-02.jpg` | 1280 &times; 720 (16:9) | Thumbnail for "Standing Firm in Faith Through Trials". |
| **Messages** | `message-03.jpg` | 1280 &times; 720 (16:9) | Thumbnail for "The Power of United Corporate Prayer". |
| **Visit Us** | `church-visit.jpg` | 1200 &times; 800 (3:2) | Clear daytime exterior photo of 71 Hills Street, Batasan Hills. |
| **Branding** | `church-logo.png` | 512 &times; 512 (1:1 PNG) | Official JCLS Church emblem with transparent background *(present)*. |

> **Graceful Fallbacks:** If an image is not uploaded yet, the website automatically falls back to an existing asset or styled gradient, preventing broken image icons.

---

## 📁 Project Directory Structure

```
├── data/
│   └── JCLS_Visit_Bookings.xlsx   # Auto-updated Excel repository for visit bookings
├── db/
│   ├── schema.sql                 # Production PostgreSQL normalized schema
│   ├── seed.sql                   # Official church ministries, events, leadership seed data
│   ├── setup.js                   # Automated database migration and verification script
│   └── create-admin.js            # Secure CLI administrator provisioning script
├── public/
│   ├── favicon.png                # Browser tab icon
│   └── images/                    # Centralized church photography assets
├── src/
│   ├── components/
│   │   ├── admin/                 # AdminApp container component
│   │   ├── common/                # Reusable buttons, badges, modals
│   │   ├── home/                  # Homepage sections (Hero, Welcome, Events)
│   │   ├── layout/                # Navbar, Footer, SearchModal, TopAnnouncement
│   │   └── modals/                # PlanVisitModal, ConnectModal, SermonDetailModal
│   ├── context/
│   │   └── UIContext.tsx          # Global client-side navigation & modal state
│   ├── data/
│   │   ├── churchData.ts          # Central repository of church information
│   │   └── imageManifest.ts       # Centralized image asset manifest & specifications
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── MinistriesPage.tsx
│   │   ├── SermonsPage.tsx
│   │   ├── EventsPage.tsx
│   │   ├── VisitPage.tsx
│   │   ├── PrayerPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── AdminLoginPage.tsx     # Private login with brute-force rate limiting
│   │   └── AdminDashboardPage.tsx # 10-module responsive administration dashboard
│   ├── services/
│   │   ├── authService.ts         # SHA-256 Web Crypto authentication
│   │   ├── contentService.ts      # Live CRUD for ministries, events, sermons, settings
│   │   ├── excelService.ts        # Spreadsheet sync service
│   │   └── submissionService.ts   # Persistent visitor inquiries, prayers, visits
│   ├── types/
│   │   └── index.ts               # Core TypeScript interface definitions
│   ├── App.tsx                    # Top-level routing & layout controller
│   └── index.css                  # Custom styling, fonts, and Tailwind utilities
├── .env.example                   # Environment variable template with documentation
├── vite.config.ts                 # Vite bundler config with Excel API middleware
└── package.json
```

---

## 📄 License & Attribution

Jesus Christ Lord & Savior Church (Batasan Hills, Quezon City). All rights reserved.  
*"Go therefore and make disciples of all the nations..."* — Matthew 28:19–20
