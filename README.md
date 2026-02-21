# 🚀 React LMS System

[![Live Site](https://img.shields.io/badge/🌐_Live_Demo-Open_App-22c55e?style=for-the-badge)](https://react-lms-system.vercel.app/)
![GitHub stars](https://img.shields.io/github/stars/HarithaGeemal/React-LMS-System?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/HarithaGeemal/React-LMS-System?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/HarithaGeemal/React-LMS-System?style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/HarithaGeemal/React-LMS-System?style=for-the-badge)

---

## 📚 Live Application
👉 https://react-lms-system.vercel.app/

A full-stack **Learning Management System (LMS)** where users can browse courses, enroll, purchase, and watch lectures online.  
This project was built to understand real production-level frontend ↔ backend integration.

---

## 🧠 Project Purpose

The main goal of this project was to:
- Integrate a React frontend with a real backend API
- Implement protected routes and authentication
- Handle course enrollment workflow
- Debug real deployment problems
- Understand how production systems behave (not just UI)

---

## 🛠 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0EA5E9?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)
![React Router](https://img.shields.io/badge/React_Router-DD0031?style=for-the-badge&logo=react-router)

### Backend (Connected API)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-13AA52?style=for-the-badge&logo=mongodb&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel)

---

## ✨ Features
- User authentication
- Browse available courses
- Course details page
- Video lecture player
- Purchase & enrollment system
- Enrolled courses dashboard
- Responsive UI

---

## 📁 Project Structure

src
 ┣ assets
 ┣ components
 ┃ ┣ student
 ┃ ┣ educator
 ┃ ┗ shared
 ┣ context
 ┣ pages
 ┣ services
 ┣ utils
 ┗ App.jsx

---

## ⚙️ Local Installation

```bash
git clone https://github.com/HarithaGeemal/React-LMS-System.git
cd React-LMS-System
npm install
npm start
```

---

## 🔐 Environment Variable

Create `.env.local`:

REACT_APP_BACKEND_URL=YOUR_BACKEND_URL

---

# 🐞 Real Development Challenges & Fixes

## 1️⃣ Backend URL Not Found (Major Issue)

The backend API failed even though the server was running.

Cause: Backend URL ended with a trailing slash like:
https://api-domain.com/

Axios generated:
https://api-domain.com//api/user/purchase

Fix:

```js
const base = BACKEND_URL.replace(/\/$/, "");
const { data } = await axios.post(`${base}/api/user/purchase`, payload);
```

---

## 2️⃣ CORS Blocking Requests After Deployment
After deploying to Vercel, the browser blocked API calls.  
Fix: Whitelisted frontend domain in backend CORS settings.

---

## 3️⃣ 401 Unauthorized Even After Login
Requests were missing the auth token.

```js
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
```

---

## 4️⃣ YouTube Lecture Player Not Loading
Different YouTube URL formats caused video crashes.

```js
lecture.lectureUrl.split("v=").pop().split("&")[0];
```

---

## 5️⃣ Environment Variables Not Updating
Vercel cached old backend URL.  
Fix: Redeploy project after updating environment variables.

---

## 🧪 Testing Performed
- Register new account
- Login
- Browse courses
- Enroll in course
- Watch lecture videos

---

## 🚀 Deployment
Frontend deployed on **Vercel**  
https://react-lms-system.vercel.app/

---

## 📊 GitHub Stats
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=HarithaGeemal&show_icons=true&theme=tokyonight)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=HarithaGeemal&layout=compact&theme=tokyonight)
![GitHub Streak](https://streak-stats.demolab.com?user=HarithaGeemal&theme=tokyonight)

---

## 📈 Future Improvements
- Course progress tracking
- Certificates
- Admin analytics dashboard
- Payment verification webhooks
- Automated testing

---

## 👨‍💻 Author
**Haritha Geemal**  
Software Engineering Undergraduate  
Full-Stack & Cloud Enthusiast

---
