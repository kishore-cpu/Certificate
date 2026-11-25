# 🏆 Official Hackathon Certificate — Static Webpage

A pure, standalone static webpage showcasing an interactive 3D Hackathon Certificate with holographic foil animations, team photo, venue & date details, an embedded QR code pointing to the site, and 1-click PNG/PDF downloads.

## ✨ Highlights

- **Pure Static Webpage**: No backend, no editor clutter — ready to open directly or deploy to GitHub Pages, Netlify, or Vercel.
- **3D Tilt & Holographic Foil**: Interactive perspective tilt and iridescent foil shimmer following cursor movement.
- **Embedded QR Code**: Automatically encodes the live page URL (`window.location.href`) so scanning it brings visitors directly to this certificate download page.
- **Hackathon Details**: Includes **Place** (*Metropolis Innovation Arena, Singapore*), **Date** (*November 25, 2026*), **Team Name**, and **Team Members Photo** (`assets/sample-team.svg`, easily replaceable with your own photo).
- **1-Click Downloads**: Export high-resolution PNG or A4 Landscape PDF directly from the top bar.

## 📁 Files

```
c:\LLM\CERTIFICATE\
├── index.html               # Static certificate showcase & download webpage
├── styles.css               # 3D transforms, holographic foil, cyber grid & print styles
├── script.js                # 3D tilt, responsive scaling, QR generator, confetti & PNG/PDF export
├── README.md                # Documentation
└── assets/
    ├── sample-team.svg      # Team members photo (replace with your own image if desired)
    └── hackathon-seal.svg   # Official 24-point gold starburst seal
```

## 🚀 How to Open

Double-click [`index.html`](index.html) in any browser, or host the folder on any static web host.
