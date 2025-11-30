# Car_Rental Application
A full-stack car rental application built with **Next.js** (frontend) and **FastAPI** (backend).  Users can search for rental cars with advanced filters, compare prices from different agencies, and complete bookings.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![Node](https://img.shields.io/badge/node-18+-green.svg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Database Setup](#2-database-setup)
  - [3. Backend Setup](#3-backend-setup)
  - [4. Frontend Setup](#4-frontend-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🔍 **Advanced Search** - Search cars by location, dates, price, type, and more
- 🗺️ **Location-Based Search** - Find cars near your pickup location
- 📅 **Date Range Picker** - Select pickup and drop-off dates
- 🚙 **Multiple Filters** - Filter by car type, fuel type, category, and agency
- 💰 **Price Comparison** - Compare prices from different rental agencies
- ⭐ **Agency Ratings** - See ratings and reviews for rental agencies
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔄 **Real-time Updates** - Dynamic search results without page reload
- 💳 **Payment Integration** - Secure payment processing (in development)

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Relational database
- **SQLAlchemy** - Python SQL toolkit and ORM
- **Uvicorn** - ASGI server
- **Python 3.10+**

### Frontend
- **Next. js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React** - UI library

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Python 3.10 or higher** - [Download Python](https://www.python.org/downloads/)
  ```bash
  python3 --version  # Should be 3.10 or higher
  ```

- **Node.js 18 or higher** - [Download Node. js](https://nodejs.org/)
  ```bash
  node --version  # Should be 18 or higher
  npm --version
  ```

- **PostgreSQL 14 or higher** - [Download PostgreSQL](https://www.postgresql.org/download/)
  ```bash
  psql --version  # Should be 14 or higher
  ```

- **Git** - [Download Git](https://git-scm.com/downloads)
  ```bash
  git --version
  ```

## 🚀 Installation

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/car-rental-app.git

# Navigate to the project directory
cd car-rental-app
```

### 2. Database Setup

#### For Linux/Mac:

```bash
# Start PostgreSQL service
sudo systemctl start postgresql  # Linux
# or
brew services start postgresql  # Mac

# Access PostgreSQL as the postgres user
sudo -u postgres psql

# Create the database
CREATE DATABASE car_rental;

# Create a user (optional, but recommended)
CREATE USER car_rental_user WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE car_rental TO car_rental_user;

# Exit PostgreSQL
\q
```

#### For Windows:

```bash
# Open Command Prompt as Administrator and access PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE car_rental;

# Create a user (optional)
CREATE USER car_rental_user WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE car_rental TO car_rental_user;

# Exit
\q
```

### 3. Backend Setup

```bash
# Navigate to the backend directory
cd car-rental-backend

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
# For Linux/Mac:
source venv/bin/activate

# For Windows:
venv\Scripts\activate

# You should see (venv) in your terminal prompt

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Edit the .env file with your database credentials
# Use nano, vim, or any text editor
nano .env
```

**Edit `. env` file:**

```env
DATABASE_URL=postgresql://car_rental_user:your_secure_password@localhost:5432/car_rental
API_HOST=0. 0.0.0
API_PORT=8000
API_RELOAD=True
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
ENVIRONMENT=development
DEBUG=True
```

**Seed the database with sample data:**

```bash
# Make sure you're in the car-rental-backend directory
# and the virtual environment is activated

python scripts/seed_data.py
```

You should see output like:
```
✓ Database tables created successfully
✓ Seeded X cars, Y agencies, Z providers
✓ Database seeded successfully! 
```

### 4. Frontend Setup

Open a **new terminal window** (keep the backend terminal open):

```bash
# Navigate to the frontend directory from the project root
cd car-rental-frontend

# Install Node.js dependencies
npm install

# Create environment file
cp .env.example .env. local

# Edit the .env.local file (usually the defaults work fine)
nano .env.local
```

**Edit `.env. local` file:**

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_ENV=development
```

## ▶️ Running the Application

You'll need **two terminal windows** - one for backend, one for frontend. 

### Terminal 1: Start the Backend

```bash
# Navigate to backend directory
cd car-rental-backend

# Activate virtual environment
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows

# Start the FastAPI server
uvicorn app.main:app --reload --host 0.0.0. 0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Application startup complete.
```

**Backend is now running at:**
- API: http://localhost:8000
- Interactive API Docs: http://localhost:8000/docs
- Alternative Docs: http://localhost:8000/redoc

### Terminal 2: Start the Frontend

```bash
# Navigate to frontend directory
cd car-rental-frontend

# Start the Next.js development server
npm run dev
```

You should see:
```
▲ Next.js 14.x. x
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in Xs
```

**Frontend is now running at:**
- Application: http://localhost:3000

### 🎉 Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the car rental homepage with a search form! 

## 📁 Project Structure

```
car-rental-app/
├── car-rental-backend/           # FastAPI Backend
│   ├── app/
│   │   ├── models/               # Database models
│   │   │   ├── car.py
│   │   │   ├── agency.py
│   │   │   ├── provider. py
│   │   │   └── price. py
│   │   ├── routers/              # API endpoints
│   │   │   ├── cars.py           # Car search & filters
│   │   │   └── filters.py        # Available filters
│   │   ├── database.py           # Database connection
│   │   └── main.py               # FastAPI app entry point
│   ├── scripts/
│   │   └── seed_data.py          # Database seeding script
│   ├── . env.example              # Environment template
│   ├── requirements.txt          # Python dependencies
│   └── README.md
│
├── car-rental-frontend/          # Next.js Frontend
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── search/           # Search results page
│   │   │   └── payment/          # Payment page
│   │   ├── components/           # React components
│   │   │   ├── hero/             # Search form
│   │   │   ├── search/           # Search-related components
│   │   │   ├── navbar/           # Navigation
│   │   │   └── footer/           # Footer
│   │   ├── lib/                  # Utility functions
│   │   │   └── search-api.ts     # API client
│   │   └── types/                # TypeScript types
│   │       └── search.ts
│   ├── public/                   # Static assets
│   ├── .env.example              # Environment template
│   ├── package.json              # Node dependencies
│   └── README.md
│
├── docs/                         # Documentation
├── . gitignore
└── README.md                     # This file
```

## 📚 API Documentation

Once the backend is running, you can access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Main API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API health check |
| GET | `/cars/` | Search cars with filters |
| GET | `/cars/{car_id}` | Get specific car details |
| GET | `/filters/` | Get available filter options |

### Example API Request

```bash
# Get all cars
curl http://localhost:8000/cars/

# Search cars with filters
curl "http://localhost:8000/cars/?pickup_location=Las%20Vegas&min_price=50&max_price=100&car_type=SUV"

# Get available filters
curl http://localhost:8000/filters/
```

## 🔐 Environment Variables

### Backend (`.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/car_rental` |
| `API_HOST` | API host address | `0.0.0.0` |
| `API_PORT` | API port | `8000` |
| `CORS_ORIGINS` | Allowed frontend origins | `http://localhost:3000` |
| `ENVIRONMENT` | Environment mode | `development` |
| `DEBUG` | Debug mode | `True` |

### Frontend (`.env.local`)

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://127.0.0.1:8000` |
| `NEXT_PUBLIC_ENV` | Environment mode | `development` |

## 🐛 Troubleshooting

### Backend Issues

#### Issue: "ModuleNotFoundError: No module named 'app'"

**Solution:**
```bash
# Make sure you're in the backend directory and venv is activated
cd car-rental-backend
source venv/bin/activate
pip install -r requirements.txt
```

#### Issue: "psycopg2. OperationalError: could not connect to server"

**Solution:**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list  # Mac

# Start PostgreSQL if not running
sudo systemctl start postgresql  # Linux
brew services start postgresql  # Mac

# Verify your DATABASE_URL in .env is correct
cat .env
```

#### Issue: "relation 'cars' does not exist"

**Solution:**
```bash
# Run the seed script to create tables
python scripts/seed_data. py
```

#### Issue: "Port 8000 is already in use"

**Solution:**
```bash
# Find and kill the process using port 8000
# Linux/Mac:
lsof -ti:8000 | xargs kill -9

# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or use a different port
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

#### Issue: "Cannot connect to backend API"

**Solution:**
1. Check if backend is running at http://localhost:8000
2.  Verify `NEXT_PUBLIC_API_URL` in `.env.local`
3.  Check browser console for CORS errors
4. Make sure backend `CORS_ORIGINS` includes frontend URL

#### Issue: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue: "Port 3000 is already in use"

**Solution:**
```bash
# Use a different port
PORT=3001 npm run dev

# Or kill the process using port 3000
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Issues

#### Issue: "database 'car_rental' does not exist"

**Solution:**
```bash
sudo -u postgres psql
CREATE DATABASE car_rental;
\q
```

#### Issue: "password authentication failed"

**Solution:**
- Check your `DATABASE_URL` in `.env`
- Make sure username and password are correct
- Try using `postgres` user: `postgresql://postgres:postgres@localhost:5432/car_rental`

### General Issues

#### Issue: No cars showing in search results

**Solution:**
```bash
# Re-run the seed script
cd car-rental-backend
source venv/bin/activate
python scripts/seed_data.py

# Check if data exists
sudo -u postgres psql -d car_rental
SELECT COUNT(*) FROM cars;
\q
```

## 🧪 Testing

### Backend Tests

```bash
cd car-rental-backend
source venv/bin/activate

# Run tests (when implemented)
pytest
```

### Frontend Tests

```bash
cd car-rental-frontend

# Run tests (when implemented)
npm test
```

## 🚢 Deployment

### Backend Deployment (Example: Heroku)

```bash
# Install Heroku CLI
# Create Procfile
echo "web: uvicorn app.main:app --host 0.0.0.0 --port \$PORT" > Procfile

# Deploy
heroku create your-app-name-backend
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set DATABASE_URL=<your-database-url>
git push heroku main
```

### Frontend Deployment (Example: Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd car-rental-frontend
vercel

# Set environment variables in Vercel dashboard
# NEXT_PUBLIC_API_URL=https://your-backend. herokuapp.com
```

## 📝 Development Guide

### Adding a New API Endpoint

1. Create a new router in `car-rental-backend/app/routers/`
2. Define the endpoint logic
3. Register the router in `app/main.py`
4.  Test using Swagger UI at `/docs`

### Adding a New Frontend Component

1. Create component in `car-rental-frontend/src/components/`
2.  Import and use in pages
3. Follow TypeScript typing conventions
4. Use Tailwind CSS for styling

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 

## 👥 Authors

- Your Name - [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- FastAPI for the amazing backend framework
- Next.js team for the excellent frontend framework
- PostgreSQL for the robust database

