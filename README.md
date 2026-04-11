# 🌌 Xenova Archive — Interactive Sci-Fi Digital Museum

A full-stack MERN application: an immersive digital museum of the fictional **Xenova** alien civilization.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)

### 2. Clone & Install

```bash
# Install all dependencies (root + server + client)
npm run install:all
```

### 3. Environment Setup

```bash
cd server
cp .env.example .env

### 4. Seed the Database

```bash
npm run seed
```

### 5. Run the App

```bash
# Run both server and client simultaneously
npm run dev

# Or separately:
npm run server   # http://localhost:5000
npm run client   # http://localhost:5173
```

---

## 🗂 Project Structure

```
xenova-archive/
├── client/                     # React + Vite frontend
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx          # Navigation bar
│       │   ├── ArtifactCard.jsx    # Gallery card
│       │   ├── Artifact3DViewer.jsx # Three.js 3D viewer
│       │   ├── TimelineCard.jsx    # Era timeline card
│       │   ├── PlanetCard.jsx      # Planet info card
│       │   ├── QuizCard.jsx        # Quiz question card
│       │   └── StarField.jsx       # Animated star background
│       ├── context/
│       │   └── AuthContext.jsx     # JWT auth state
│       ├── pages/
│       │   ├── Home.jsx            # Landing page
│       │   ├── Artifacts.jsx       # Gallery with search/filter
│       │   ├── ArtifactDetail.jsx  # Detail + 3D viewer
│       │   ├── Timeline.jsx        # Civilization timeline
│       │   ├── Decoder.jsx         # Alien language decoder
│       │   ├── Map.jsx             # SVG galactic map
│       │   ├── Quiz.jsx            # Knowledge quiz
│       │   ├── Login.jsx           # Admin login
│       │   └── AdminDashboard.jsx  # CRUD management
│       └── services/
│           └── api.js              # Axios API calls
│
└── server/                     # Node.js + Express backend
    ├── config/db.js                # MongoDB connection
    ├── controllers/
    │   ├── authController.js
    │   ├── artifactController.js
    │   ├── planetController.js
    │   └── quizController.js
    ├── middleware/
    │   └── authMiddleware.js       # JWT protect + adminOnly
    ├── models/
    │   ├── User.js
    │   ├── Artifact.js
    │   ├── Planet.js
    │   └── Quiz.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── artifactRoutes.js
    │   ├── planetRoutes.js
    │   └── quizRoutes.js
    ├── seed/seedData.js            # Database seeder
    └── server.js                   # Express entry point
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | — | Admin login |
| GET | `/api/auth/me` | Admin | Get current user |
| GET | `/api/artifacts` | — | List (search, filter) |
| GET | `/api/artifacts/:id` | — | Single artifact |
| POST | `/api/artifacts` | Admin | Create |
| PUT | `/api/artifacts/:id` | Admin | Update |
| DELETE | `/api/artifacts/:id` | Admin | Delete |
| GET | `/api/planets` | — | All planets |
| GET | `/api/quiz` | — | Quiz questions |
| POST | `/api/quiz/submit` | — | Submit answers |

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🖼 Artifact Gallery | 10+ artifacts with search & category filter |
| 🔮 3D Artifact Viewer | Three.js interactive viewer — drag, zoom, rotate |
| 📅 Civilization Timeline | 5 eras with animated interactive cards |
| 🔤 Language Decoder | Real-time English → Xenova glyph translator |
| 🗺 Galactic Map | SVG planet map with clickable detail popups |
| 📝 Quiz System | 10 questions, scoring, rank classification |
| 🔐 Admin Dashboard | JWT-protected artifact CRUD with table UI |
| 🌠 Sci-Fi UI | Dark theme, neon glows, glassmorphism, star field |

---

## 🎨 Tech Stack

**Frontend**: React 18, Vite, TailwindCSS, Axios, React Router v6, Three.js  
**Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Multer  

---

## 👤 Admin Access

- **URL**: `http://localhost:5173/login`
- **Username**: `xenova_admin`
- **Password**: `admin123`
