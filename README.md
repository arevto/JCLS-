# Jesus Christ Lord & Savior Church (JCLS) Website

Official website for **Jesus Christ Lord & Savior Church** located in 71 Hills Street, Batasan Hills, Quezon City. Built with React 19, TypeScript, Vite, and Tailwind CSS.

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open `http://localhost:5173` (or the port shown in your terminal).

### 3. Build for production
```bash
npm run build
```
The output bundle will be generated in `/dist`.

---

## How The Website Works

### 1. Content Management (`src/data/churchData.ts`)
Almost all church content lives in a single configuration file: `src/data/churchData.ts`. You do not need to hunt through dozens of components to update information.
- **Church info:** Name, verified address, phone, email, office hours, social links, Google Maps URL.
- **Service & Rehearsal Schedules:**
  - Main Celebration Service (Sunday 9:00 AM – 12:00 NN)
  - Young Professionals Fellowship (Every 2nd & 3rd Sunday 1:30 PM – 3:00 PM)
  - Youth Fellowship (Sunday 3:00 PM – 5:00 PM)
  - Musicians Rehearsal (Saturday 5:00 PM – 9:00 PM)
- **Doctrinal Beliefs:** The complete text of **The 16 Fundamental Truths of the Assemblies of God**.
- **Ministries, Events, and Pastoral Team:** Editable arrays for ministries, sermon archives, leadership bios, and announcements.

### 2. Page Navigation (`src/context/UIContext.tsx`)
Navigation uses an in-memory page state (`currentPage`) managed by `UIContext`. This keeps the site fast, smooth, and prevents broken page reloads when hosted on static hosting services:
- `home`
- `about` (Church vision, core values, leadership, 16 Fundamental Truths)
- `ministries` (Worship, Young Pro, Youth, Kids, Intercession, Outreach)
- `sermons` (Sermon notes, video modal player, series filter)
- `events` (Upcoming celebrations and event RSVP)
- `visit` (VIP visitor pre-registration, interactive Google Map, FAQs)
- `prayer` (Confidential prayer request submission form)
- `contact` (Direct message form, physical location pin, Facebook link)

### 3. Automated Excel Repository (`data/JCLS_Visit_Bookings.xlsx`)
Whenever a visitor submits a booking (through the "Plan Your Visit" modal or the Visit page):
1. **Auto-Save:** The booking is immediately stored in browser storage and sent to Vite's local backend middleware.
2. **Excel File Update:** The system creates or updates `data/JCLS_Visit_Bookings.xlsx` right in your project folder.
3. **No Duplicates:** Entries are checked against existing rows by `Booking ID` and `Email + Gathering Date`. If a match is found, the row updates in-place rather than creating duplicate rows.
4. **Reference Columns:** Guest name, email, phone, chosen service & time, estimated party size, kids ministry needs, special requests, date booked, and booking status.

### 4. Host & Admin Dashboard
Click **"🔒 Host & Admin Dashboard"** in the footer of any page to:
- Review the list of all visitors who booked a visit.
- Update their status (`New Guest` → `Host Assigned` → `Welcomed`).
- Read confidential prayer requests submitted by the church community.
- Download the real **Microsoft Excel (`.xlsx`)** workbook with one click.
- Export records to CSV.
- Manually force a re-sync of the disk file via **"Sync Disk File"**.

---

## Project Structure

```
├── data/
│   └── JCLS_Visit_Bookings.xlsx # Auto-updated Excel repository for visit bookings
├── public/
│   ├── favicon.png             # Church seal tab icon
│   └── images/
│       ├── church-logo.png     # Official church seal
│       ├── hero-worship.jpg    # Main worship backdrop
│       ├── pastor-preaching.jpg
│       ├── youth-ministry.jpg
│       ├── kids-ministry.jpg
│       └── prayer-ministry.jpg
├── src/
│   ├── components/
│   │   ├── common/             # Reusable buttons, badges, headers, modals
│   │   ├── home/               # Sections for the home landing page
│   │   ├── layout/             # Navbar, Footer, Search modal, Announcements
│   │   └── modals/             # Plan Visit, Sermon Player, RSVP, Admin Dashboard
│   ├── context/
│   │   └── UIContext.tsx       # Global UI navigation & modal state
│   ├── data/
│   │   └── churchData.ts       # Central content file for all church details
│   ├── pages/                  # Page components (Home, About, Sermons, etc.)
│   ├── services/
│   │   ├── excelService.ts     # Client Excel generation & server sync
│   │   └── submissionService.ts# Local persistence for visits & prayer requests
│   └── index.css               # Design tokens, fonts, Tailwind utilities
├── vite.config.ts              # Vite config + local API plugin for Excel file sync
└── package.json
```

---

## Updating Assets & Information

- **To change the logo:** Replace `public/images/church-logo.png` and `public/favicon.png`.
- **To edit schedules or contact details:** Open `src/data/churchData.ts` and modify the values in `churchInfo` or `serviceSchedules`.
- **To view visitor bookings:** Open `data/JCLS_Visit_Bookings.xlsx` directly in Excel, or click the footer link on the website.
