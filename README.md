# FinSight AI — Premium Fintech Website

A modern, premium startup website for a financial-market intelligence company, built with **Django + DRF** backend and **React + Tailwind CSS + Vite** frontend.

## Architecture

```
fintech-website/
├── backend/                  # Django + Django REST Framework
│   ├── fintech_backend/      # Project settings, URL routing
│   ├── api/                  # REST API endpoints
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/                 # React + Tailwind CSS + Vite
    ├── src/
    │   ├── components/       # Navbar, Footer
    │   ├── pages/            # HomePage with all sections
    │   ├── styles/           # Tailwind & custom CSS
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Setup & Run

### 1. Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
```

Backend runs at: `http://localhost:8000`
API base: `http://localhost:8000/api/`

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/features/` | Platform features |
| GET | `/api/testimonials/` | Client testimonials |
| GET | `/api/models/` | Proprietary model info |
| GET | `/api/solutions/` | Solutions by client type |
| GET | `/api/security/features/` | Security architecture |
| GET | `/api/market/overview/` | Mock market data |
| POST | `/api/contact/` | Contact form submission |
| POST | `/api/demo/` | Demo request submission |
| GET | `/health/` | Health check |

## Features

### Frontend Stack
- **React 18** with hooks & functional components
- **Vite** for fast dev & build
- **Tailwind CSS** with custom theme (dark fintech palette)
- **Recharts** for financial data visualizations
- **Lucide React** for icon system
- **React Router** for navigation
- **Intersection Observer API** for scroll animations

### Backend Stack
- **Django 4.2** web framework
- **Django REST Framework** for API endpoints
- **CORS Headers** for cross-origin requests
- **SQLite** for development (PostgreSQL-ready)
- **Throttling** for API rate limiting
- Modular app structure (`api` app)

### Sections Implemented
- Sticky navigation with mobile responsiveness
- Problem statement section with visual contrast
- 4 technology pillar cards
- Proprietary market models architecture diagram
- Document intelligence pipeline + extracted metrics dashboard
- Private AI infrastructure visualization
- Who we serve (client types grid)
- Security architecture grid
- Data-to-decision pipeline animation
- Traditional vs Our approach table
- Future vision section with animated counters
- Contact form + Demo request form (both wired to backend)

### Design Language
- Deep charcoal/black background
- White typography with blue accent gradient
- Subtle grid backgrounds & neural patterns
- Glass morphism cards with hover effects
- Smooth scroll-based animations
- Financial chart visualizations
- Responsive grid layouts
- Mobile-optimized navigation

## Production Build

```bash
# Frontend
cd frontend
npm run build
# Output in frontend/dist/

# Backend (with Gunicorn)
cd backend
gunicorn fintech_backend.wsgi:application
```

## Environment Variables

```bash
# Backend
export DJANGO_SECRET_KEY="your-secret-key"
export DJANGO_DEBUG="False"
```