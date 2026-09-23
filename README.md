# EDU YODHA — Official Web Platform

> **Empowering Students. Building Careers.**  
> **Official Domain:** [eduyodha.com](https://eduyodha.com) *(Or free live preview on [eduyodha.netlify.app](https://eduyodha.netlify.app) / [eduyodha.vercel.app](https://eduyodha.vercel.app))*

A modern, student-focused education platform built for engineering students, KCET/COMEDK aspirants, and college students seeking domain internships, verified university updates, and career opportunities.

---

## 🌐 Deploy Free to the Internet (Instant Live URL)

### Option 1: Netlify Drag & Drop (Fastest - 30 seconds)
1. Open **[app.netlify.com/drop](https://app.netlify.com/drop)** in your web browser.
2. Drag and drop the **`dist`** folder (`d:\EDU YODHA\dist`) onto the web page.
3. Your site is live! You can set the site name to `eduyodha.netlify.app` in Netlify Site Settings.

### Option 2: Vercel CLI
Run the following command in your terminal:
```powershell
npx vercel
```
Follow the quick prompts to deploy instantly to `eduyodha.vercel.app`.

### Option 3: GitHub Pages
1. Push this repository to GitHub.
2. Go to **Settings > Pages** in your GitHub repository.
3. Select `main` branch and `/` root (or `/dist` folder) and save.

---

## 🚀 Live Working Community Channels
- **Instagram (KEA Community)**: [https://www.instagram.com/kea_updates_2026](https://www.instagram.com/kea_updates_2026)
- **WhatsApp Channel**: [https://whatsapp.com/channel/0029Vb27q0JKwqSbZewkPh1r](https://whatsapp.com/channel/0029Vb27q0JKwqSbZewkPh1r)
- **YouTube Channel**: [https://youtube.com/@eduyodha?si=U2kOwQNEVUqHb9kp](https://youtube.com/@eduyodha?si=U2kOwQNEVUqHb9kp)

---

## 📁 Project Structure

```
EDU YODHA/
├── assets/
│   ├── css/
│   │   └── style.css            # Responsive design tokens, cards, modals, themes
│   ├── js/
│   │   └── main.js              # Sticky nav, mobile drawer, filters, modal handlers
│   └── images/
│       ├── logo.png             # Official EDU YODHA emblem (Scholar-warrior & shield)
│       └── logo.jpg
├── index.html                   # Comprehensive homepage (All 11 sections)
├── about.html                   # About Us, mission, values, brand philosophy
├── vtu.html                     # VTU Student Hub (Results, circulars, SGPA calculator)
├── vtu-updates.html             # Mirror route for VTU Hub
├── internships.html             # 10 domain internships + interactive application modal
├── courses.html                 # DSA, MERN, Python, Java, Cloud learning tracks
├── resources.html               # 1st-8th sem branch notes, PYQ papers, formulas
├── kcet.html                    # KCET 2026 cutoffs, option entry, KEA verification
├── career.html                  # Placement prep, ATS resumes, top 100 DSA sheet
├── contact.html                 # Student contact desk, query form, FAQ
└── README.md
```

---

## 💻 How to Preview Locally

You can open `index.html` directly in any web browser, or serve it using any local HTTP server:

```powershell
# Using Python
python -m http.server 8000

# Or using Node.js / npx
npx serve .
```
Then visit `http://localhost:8000`.

---

## ⚙️ Editing Statistics & Updates

- **Trust Statistics**: In `index.html`, locate the `<section class="stats-section">`. The numbers use `data-count="50000"` and `data-suffix="+"` which animate automatically on scroll.
- **Announcement Cards**: In `index.html`, locate `<section class="section" id="updates">` to add or edit circulars with tags (`vtu`, `kcet`, `internship`, `career`).
