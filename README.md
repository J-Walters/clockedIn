<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/J-Walters/clockedIn">
    <img src="src/assets/extension-logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">ClockedIn</h3>
<h4>Smarter LinkedIn Job Search Tool</h4>

  <p align="center">
A Chrome extension that enhances the job-seeking experience on LinkedIn by giving users finer control over job search filters, especially recency, which LinkedIn buries deep in its UI (or doesn't expose fully at all).
  </p>
</div>

<br />

<!-- ABOUT THE PROJECT -->
## About The Project


<p>
After experiencing an unexpected lay off, I dove headfirst into LinkedIn only to find a job market where most listings already had hundreds or even thousands of applicants. I discovered that by tacking on the parameter f_TPR=r600 to the search URL you can unearth roles posted in the last ten minutes. LinkedIn doesn’t let you do that by default and manually editing URLs is a real pain. So I built Clocked to automate the trick and add filters so you only see the freshest roles. It also hides sponsored posts (often stale or expired) and scrubs out sketchy companies. Now you can spend less time scrolling and more time applying.
 

</p>

---
### Features

- ⏱ **Recency Filter**: choose job postings from the last ten minutes up to 24 hours
- 🚫 **Hide Sponsored Listings**: filter out promoted job ads automatically
- 🔗 **Smart URL Generator**: build LinkedIn search URLs with hidden recency and other parameters in one click
- 📂 **Search History & Tracking**: view, relaunch, and delete saved searches; add searches from other sites for centralized listing tracking
- 🔔 **Apply Reminders**: set customizable hourly (or your chosen interval) Chrome notifications to prompt you to check and apply to jobs
- 💡 **No Bloat**: clean, fast popup designed to stay out of your way

---

<!-- Screenshots -->
### 📸 Screenshots

<img width="341" alt="Screenshot 2025-06-10 at 7 33 04 PM" src="https://github.com/user-attachments/assets/b3613dbb-1ef4-48c5-92ee-ed0e36e85250" />
<img width="353" alt="Screenshot 2025-06-10 at 7 33 53 PM" src="https://github.com/user-attachments/assets/c5b1e9d8-5fa1-48d4-996c-e95fb15dc8f1" />

---

<!-- Built with -->
### 🛠 Built with

- HTML5, CSS3, JavaScript (ES6+)
- React
- Vite
- Node.js & npm
- Chrome Extensions API
- Supabase (PostgreSQL + Auth)
- Google Cloud Platform (OAuth for Google Sign-In)
- Git & GitHub
  
---

<!-- Author -->
### 🙋🏽‍♀️ Author

Built by [Jordan Walters](https://github.com/J-Walters) - [LinkedIn](https://www.linkedin.com/in/walters-jordan/) - jwalters012@gmail.com 

---
<!-- Installation -->
### 📎 Installation 

1. Clone this repo  `git clone https://github.com/J-Walters/clockedIn.git`
2. Install dependencies `npm install`
3. Build the extensions `npm run build`
4. Go to `chrome://extensions`
5. Enable Developer mode (toggle in the top right)
6. Click Load unpacked and select the cloned `dist/` folder
7. Pin the ClockedIn extension to your toolbar and click the ClockedIn icon to launch the popup

---

### 🤝 Contributions

If you’ve figured out other LinkedIn parameter hacks or UX improvements, I’d love to hear them!

---

