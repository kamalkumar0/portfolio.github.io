# 🚀 Kamal Kumar — Personal Portfolio Website

A modern, dark-themed personal portfolio website built with pure **HTML, CSS, and JavaScript** — no frameworks, no build tools, just open the folder and go.

### Live Link : https://kamalkumar0.github.io/portfolio.github.io/
---

## 📁 Project Structure

```
portfolio/
├── index.html       ← Main HTML file (all sections)
├── style.css        ← All styling & animations
├── script.js        ← Interactions, canvas effects, scroll logic
├── profile.jpg      ← Your profile photo (add this yourself — see below)
└── README.md        ← This file
```

---

## ✨ Features

- **Animated hero background** — dot grid canvas with floating particles and scan line
- **Profile photo with light effects** — rotating conic arc, orbiting spark particles, shimmer sweep, animated rings
- **Smooth scroll reveal** — sections fade in as you scroll
- **3D tilt on project cards** — subtle mouse-tracking tilt effect
- **Animated stat counters** — numbers count up when visible
- **Custom cursor** — dot + trailing ring (desktop only, hidden on mobile)
- **Active nav highlight** — current section highlighted automatically
- **Mobile-first responsive** — works cleanly on all screen sizes
- **Pre-filled email & WhatsApp** — visitors can contact with one click

---

## 🖼️ How to Add Your Profile Photo

1. Take your photo file and **rename it to `profile.jpg`**
2. Place it in the **same folder** as `index.html`
3. Open the site — your photo will appear automatically

> ✅ Also supported: `profile.jpeg`, `profile.png`, `profile.webp`  
> If no photo is found, the **"KK" initials fallback** shows instead — so the site never breaks.

---

## 🔗 Things You Need to Update

Search for these placeholders in `index.html` and replace them with your actual links:

| Placeholder | Where | What to put |
|---|---|---|
| `YOUR_YOUTUBE_CHANNEL_URL` | Skills section (Content Creation card) | `https://www.youtube.com/@YourChannelName` |
| `YOUR_YOUTUBE_CHANNEL_URL` | Contact section (social links) | Same YouTube URL |
| `href="#"` on GitHub links | Each project card | Your GitHub repo URLs |

> **Tip:** Press `Ctrl+F` (or `Cmd+F` on Mac) in your code editor and search for `YOUR_YOUTUBE_CHANNEL_URL` — there are 2 places.

---

## 🌐 Sections Overview

| # | Section | Description |
|---|---|---|
| 01 | **About** | Bio, stats counter, profile photo with light effect |
| 02 | **Training** | NIELIT Data Science training + B.Tech education (timeline layout) |
| 03 | **Projects** | Resume Analyzer (live), SafeMask AI, AI Face Attendance |
| 04 | **Skills** | Programming, ML/AI, Libraries, Web Dev, Deployment, Content Creation |
| 05 | **Contact** | Pre-filled email, LinkedIn, GitHub, YouTube, WhatsApp |

---

## 📬 Contact Links Explained

| Button | What it does |
|---|---|
| **Say Hello ✉️** | Opens your email client with subject + body pre-filled — visitor just hits Send |
| **LinkedIn** | Opens `linkedin.com/in/kamalkumar0` directly |
| **GitHub** | Opens your GitHub profile |
| **YouTube** | Opens your YouTube channel (update the URL) |
| **WhatsApp** | Opens WhatsApp chat with a pre-filled message |

---

## 🖥️ How to Run Locally

No installation needed. Just:

1. Download / unzip the folder
2. Double-click `index.html`
3. It opens in your browser — done ✅

> For best results, use **VS Code** with the **Live Server** extension (right-click `index.html` → *Open with Live Server*).

---

## 📦 How to Deploy (Free Options)

### GitHub Pages (Recommended)
1. Create a new GitHub repository (name it `your-username.github.io`)
2. Upload all files (`index.html`, `style.css`, `script.js`, `profile.jpg`)
3. Go to **Settings → Pages → Source → main branch**
4. Your site goes live at `https://your-username.github.io` 🎉

### Netlify (Drag & Drop)
1. Go to [netlify.com](https://netlify.com) and sign up free
2. Drag your portfolio folder onto the Netlify dashboard
3. Live in 30 seconds with a custom URL

### Vercel
1. Go to [vercel.com](https://vercel.com) and sign up free
2. Import from GitHub or drag & drop the folder
3. Instant deployment with HTTPS

---

## 🔧 Customisation Tips

**Change accent color** — open `style.css`, find `:root` at the top and update `--blue`:
```css
:root {
  --blue:        #3b82f6;   /* ← change this hex value */
  --blue-bright: #60a5fa;
  --cyan:        #22d3ee;
}
```

**Add a new project** — copy one of the `.project-card` blocks in `index.html` and update the content. Use `class="proj-link live-badge"` for a green live demo link, or `class="proj-link-disabled"` for a disabled one.

**Update stats** — in `index.html`, find `data-target="3"` (and similar) and change the number. The counter animates up to whatever value you set.

---

## 🛠️ Built With

- HTML5
- CSS3 (custom properties, animations, grid, flexbox)
- Vanilla JavaScript (Canvas API, IntersectionObserver, requestAnimationFrame)
- [Google Fonts](https://fonts.google.com) — Syne, DM Mono, Outfit

---

## 👨‍💻 Author

**Kamal Kumar**  
B.Tech CSE Student | Python Developer & Engineer | Tech YouTuber

- 📧 sharmakamal1605@gmail.com  
- 💼 [LinkedIn](https://www.linkedin.com/in/kamalkumar0)  
- 🐙 [GitHub](https://github.com/kamalsharma0)  
- 📱 WhatsApp: +91-8278077298
