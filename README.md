<<<<<<< HEAD
# React + Vite
=======
# ClockedIn – Smarter LinkedIn Job Search

ClockedIn is a minimal, focused Chrome extension that enhances the job-seeking experience on LinkedIn by giving users finer control over job search filters, especially recency, which LinkedIn buries deep in its UI (or doesn't expose fully at all).

## Why I Built It

LinkedIn search has long frustrated me, especially as a job seeker trying to be early and competitive. I came across a post revealing that if you manipulate LinkedIn job search URLs manually (e.g., by adding `f_TPR=r1800`), you can surface jobs posted as recently as 30 minutes ago, which LinkedIn doesn't surface by default.

After testing this "hack," I noticed that applying within the first hour led to a ~5% increase in responses, especially from startups and recruiters doing outreach fast. It's a small edge, but in this market, small edges matter.

I built ClockedIn to:
- Simplify that URL manipulation
- Save job searches for easy reuse
- Automate something that felt tedious and critical
- Stay organized while job hunting daily

---

### Features

- 🔍 **Search Builder UI**: Customize keyword, search radius, recency (30 minutes to 24 hours)
- 🌐 **Smart URL Generator**: Generates a valid LinkedIn job search URL using hidden LinkedIn parameters
- 📋 **History Tab**: View, re-launch, or remove saved searches easily
- 💡 **No bloat**: Clean, fast popup — designed to stay out of the way

---

### 📸 Screenshots

<img width="361" alt="Screenshot 2025-05-11 at 12 19 36 AM" src="https://github.com/user-attachments/assets/8bce8703-12ea-422d-b67d-9c67e92da7e1" />

<img width="364" alt="Screenshot 2025-05-11 at 12 20 33 AM" src="https://github.com/user-attachments/assets/db807d26-5214-4a1e-87eb-31f21c972690" />

---

### 🛠 Tech Stack

- HTML, CSS, JavaScript (Vanilla)
- Chrome Extension API 
- Font Awesome for icons
- Minimal dependencies, zero build tools

---

### 🙋🏽‍♀️ Author

Built by [Jordan Walters](https://github.com/J-Walters) — because LinkedIn’s search UI sucks.

---

### 📎 Installation (Dev Mode)

1. Clone this repo
2. Go to `chrome://extensions`
3. Click “Load unpacked” and select the project folder
4. Pin the extension and click to launch the popup

---

### 🤝 Contributions

If you’ve figured out other LinkedIn parameter hacks or UX improvements, I’d love to hear them.

---
>>>>>>> b706695fdef4215b3ff5b129f3ee2f18ed05d44c

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
