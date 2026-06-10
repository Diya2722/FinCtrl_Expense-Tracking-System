# FinCtrl – Expense Tracking System

A full-stack MERN expense tracker with OTP-based password management, admin dashboard, and Cloudinary image uploads.

---

## Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React 19, Vite, Tailwind CSS v4, Recharts |
| Backend   | Node.js, Express, MongoDB Atlas, Mongoose |
| Auth      | JWT, bcryptjs |
| Email OTP | Nodemailer + Gmail App Password |
| Images    | Cloudinary |
| Deploy    | Render (backend web service + frontend static site) |

---

## Local Development Setup

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account
- Gmail account with **App Password** enabled (for OTP)

### 1. Clone & Install

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm install --prefix backend
```

### 2. Configure Environment

```bash
cd backend
cp .env.example .env
```

Fill in your `.env`:

```
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb+srv://...
JWT_SECRET=any_long_random_string
JWT_EXPIRES_IN=7d
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx   ← Gmail App Password (not your login password)
```

#### How to get a Gmail App Password
1. Go to [Google Account](https://myaccount.google.com) → **Security**
2. Enable **2-Step Verification** if not already on
3. Search for **App passwords** → create one for "Mail"
4. Use the 16-character password (with spaces) as `EMAIL_PASSWORD`

### 3. Run

```bash
# Terminal 1 – Backend
cd backend
npm run dev

# Terminal 2 – Frontend
npm run dev

# OR both at once (from project root)
npm run dev:all
```

Frontend → http://localhost:5173  
Backend  → http://localhost:5000  
API health → http://localhost:5000/api/health

### Fix: Port 5000 Already In Use

If you see `EADDRINUSE :::5000`, another process is using the port:

**Windows:**
```cmd
netstat -ano | findstr :5000
taskkill /PID <pid> /F
```

**Mac / Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

Or just change `PORT=5001` in `backend/.env`.

---

## Deployment (Render)

1. Push code to GitHub (`.env` is git-ignored, never committed)
2. Create a **Web Service** for the backend:
   - Root: `backend`  
   - Build: `npm install`  
   - Start: `npm start`
   - Add all env vars from `.env.example` in the Render dashboard
3. Create a **Static Site** for the frontend:
   - Root: `.`  
   - Build: `npm install && npm run build`  
   - Publish: `dist`
   - Add `VITE_API_BASE_URL=https://<your-backend>.onrender.com/api`
4. Set `CLIENT_URL=https://<your-frontend>.onrender.com` in the backend env vars

---

## Default Admin Credentials

| Field    | Value |
|----------|-------|
| Email    | `diya.v.p.108@gmail.com` |
| Password | `diyavp108` |

> **Change these before deploying to production!** Update `seedAdmin()` in `backend/src/config/db.js`.

---

## Project Structure

```
├── frontend/          # React source files
│   ├── pages/
│   ├── components/
│   ├── context/
│   └── util/
├── backend/
│   ├── src/
│   │   ├── config/    # db.js, env.js
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/     # emailService.js, generateToken.js
│   └── .env           # (git-ignored, create from .env.example)
├── public/
│   └── favicon.png    # FinCtrl logo (tab icon)
├── dist/              # Production build output (git-ignored)
├── index.html
├── vite.config.js
└── render.yaml
```
# FinCtrl_Expense-Tracking-System
