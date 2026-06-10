# FinCtrl — Expense Tracking System

A full-stack MERN application to manage personal finances. Users can track their income and expenses, visualize spending patterns through charts, manage custom categories, and export their transaction history. A separate admin panel allows platform-level user and report management.

---

## Features

### Authentication
- User registration and login with JWT-based authentication
- Role-based access — separate flows for users and admins
- OTP-verified password reset via email (no token exposed in response)
- OTP-verified password change for logged-in users
- Profile photo upload via Cloudinary

### Dashboard
- Summary cards showing total income, total expense, and net balance
- Bar chart comparing income vs expenses over time
- Pie chart showing expense distribution by category
- Recent transactions list

### Income & Expense Management
- Add, edit, and delete income and expense transactions
- Each transaction includes title, amount, date, category, and notes
- Transactions displayed with sorting by date

### Categories
- Create and manage custom income and expense categories
- Emoji picker support for category icons
- Default categories auto-created on registration

### Filters
- Filter transactions by date range, transaction type, and category
- Results update instantly based on selected filters

### Export
- Download income or expense transactions as an Excel file

### Admin Panel
- Separate admin login and dashboard
- View all registered users
- Edit or delete user accounts along with all their data
- View system-wide reports and records

---

## Tech Stack

**Frontend**
- React 19, Vite
- Tailwind CSS
- Recharts (charts)
- React Router DOM
- Axios
- React Hot Toast
- Lucide React
- Emoji Picker React

**Backend**
- Node.js, Express.js
- MongoDB Atlas, Mongoose
- JWT (jsonwebtoken)
- Bcryptjs
- Nodemailer (OTP email)
- Morgan, CORS

---

## Project Structure

```
Expense_Tracking/
├── backend/
│   └── src/
│       ├── config/         # DB and env config
│       ├── controllers/    # Auth, Transaction, Category, Dashboard, Filter
│       ├── middleware/     # JWT auth, error handler
│       ├── models/         # User, OTP, Transaction, Category
│       ├── routes/         # All API routes
│       ├── services/       # Category default seeding
│       └── utils/          # Email, token, CSV, async handler
└── frontend/
    ├── admin/              # Admin panel pages and components
    ├── components/         # Reusable UI components
    ├── context/            # Global state (AppContext)
    ├── hooks/              # Custom React hooks
    ├── pages/              # User-facing pages
    └── util/               # Axios config, API endpoints, validators
```
