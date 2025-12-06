# Car Rental Application

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.10--3.12-blue.svg)
![Next.js](https://img.shields.io/badge/next.js-16-black.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-latest-009688.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791.svg)

A modern, full-stack car rental platform built with **Next.js 16** and **FastAPI**, enabling users to search, compare, and book rental cars from multiple agencies with an intuitive interface and powerful filtering capabilities.

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#api-documentation) • [Demo](#demo-video)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Demo Video](#demo-video)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This car rental application provides a seamless experience for users to find and book rental vehicles. The platform aggregates cars from multiple rental agencies, allowing users to compare prices, view detailed specifications, and make informed decisions. Built with modern technologies, it ensures high performance, scalability, and an excellent user experience across all devices.

### Key Highlights

- **Advanced Search**: Multi-parameter search with location, dates, price ranges, and vehicle specifications
- **Real-time Comparison**: Compare prices and features across different rental agencies
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **RESTful API**: Well-documented FastAPI backend with interactive Swagger documentation
- **Type Safety**: Full TypeScript implementation in the frontend

---

## Demo Video
![demo-video](docs/demo-video.gif)

## Features

### User Features

**▸ Smart Search Engine**
- Location-based car search with proximity filtering
- Flexible date range selection for pickup and drop-off
- Advanced filtering by price, car type, fuel type, and category

**▸ Price Transparency**
- Real-time price comparison across multiple agencies
- Clear breakdown of rental costs
- Filter results by budget constraints

**▸ Comprehensive Car Information**
- Detailed vehicle specifications
- High-quality images
- Agency ratings and reviews
- Availability status

**▸ Responsive Interface**
- Mobile-first design approach
- Seamless experience across all screen sizes
- Fast loading and smooth animations

**▸ Dynamic Updates**
- Real-time search results without page reloads
- Instant filter application
- Live availability updates

**▸ Filter Options**
- Car type (Sedan, SUV, Convertible, Luxury, etc.)
- Category (Economy, Premium, Standard, etc.)
- Fuel type (Petrol, Diesel, Electric, Hybrid)
- Price range selection
- Agency/Provider filtering
- Free cancellation option
- Unlimited mileage option

---

## Tech Stack

### Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| **FastAPI** | Web framework | Latest |
| **PostgreSQL** | Database | 14+ |
| **SQLAlchemy** | ORM | 2.0+ |
| **Uvicorn** | ASGI server | Latest |
| **Pydantic** | Data validation | 2.0+ |
| **Python** | Programming language | 3.10-3.12 (recommended) |

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework | 16.x |
| **TypeScript** | Type safety | 5.x |
| **Tailwind CSS** | Styling | 4.x |
| **React** | UI library | 19.x |
| **Axios** | HTTP client | Latest |
| **date-fns** | Date handling | Latest |
| **Lucide React** | Icons | Latest |

---

## Prerequisites

Before you begin, ensure your system meets the following requirements:

### Required Software

**1. Python 3.10 to 3.12 (recommended)**

> ⚠️ **Important:** Python 3.13 is NOT recommended due to compatibility issues with some dependencies. Use Python 3.10, 3.11, or 3.12 for best results.

```bash
python3 --version  # Should output 3.10.x to 3.12.x
```

Download: [python.org/downloads](https://www.python.org/downloads/)

**2. Node.js 18 or higher with npm**
```bash
node --version  # Should output v18.x.x or higher
npm --version
```
Download: [nodejs.org](https://nodejs.org/)

**3. PostgreSQL 14 or higher**
```bash
psql --version  # Should output 14.x or higher
```
Download: [postgresql.org/download](https://www.postgresql.org/download/)

**4. Git**
```bash
git --version
```
Download: [git-scm.com/downloads](https://git-scm.com/downloads)

### System Requirements

- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 2GB free space
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/shanavasvb/lascade-machine-test.git
cd lascade-machine-test
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd car-rental-backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# For Linux/Mac:
source venv/bin/activate

# For Windows:
venv\Scripts\activate

# You should see (venv) in your terminal

# Upgrade pip
pip install --upgrade pip
```

#### Install Dependencies

**For Python 3.10-3.12 (Recommended):**

```bash
pip install -r requirements.txt
```

**For Python 3.13 (if you encounter build errors):**

If you see errors like `Failed building wheel for psycopg2-binary` or `Failed building wheel for pydantic-core`, use this method:

```bash
# Install system dependencies first

# For Linux (Debian/Ubuntu):
sudo apt-get update
sudo apt-get install libpq-dev python3-dev build-essential

# For macOS:
brew install postgresql

# Install Python packages with compatible versions
pip install fastapi uvicorn[standard] sqlalchemy python-dotenv
pip install psycopg2-binary==2.9.10
pip install pydantic==2.10.3

# Verify installation
python3 -c "import fastapi, uvicorn, sqlalchemy, psycopg2, pydantic; print('✅ All packages installed successfully')"
```

**Alternative: Use Docker (Recommended for Python 3.13)**

If you continue to face installation issues:

```bash
# Make sure Docker is installed
docker --version

# Build and run with Docker Compose
docker-compose up --build
```

> **💡 Pro Tip:** If you're using Python 3.13, we strongly recommend using **Python 3.11 or 3.12** for better compatibility. You can install multiple Python versions and create a venv with a specific version:
>
> ```bash
> # Install Python 3.11 (Ubuntu/Debian)
> sudo apt-get install python3.11 python3.11-venv
>
> # Install Python 3.11 (macOS)
> brew install python@3.11
>
> # Create venv with Python 3.11
> python3.11 -m venv venv
> source venv/bin/activate
> pip install -r requirements.txt
> ```

### Step 3: Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd car-rental-frontend

# Install dependencies
npm install
```

---

## Database Setup

You can run this project using either a **local PostgreSQL instance** or a **remote PostgreSQL database** (like Render).

### Option A: Local PostgreSQL Setup

#### For Linux/Mac:

```bash
# Start PostgreSQL service
sudo systemctl start postgresql  # Linux
brew services start postgresql   # macOS

# Access PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE car_rental;
CREATE USER car_rental_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE car_rental TO car_rental_user;

# Grant schema privileges (PostgreSQL 15+)
\c car_rental
GRANT ALL ON SCHEMA public TO car_rental_user;

# Exit PostgreSQL
\q
```

#### For Windows:

```bash
# Open Command Prompt as Administrator
# Access PostgreSQL
psql -U postgres

# Create database and user
CREATE DATABASE car_rental;
CREATE USER car_rental_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE car_rental TO car_rental_user;

# Exit
\q
```

### Option B: Remote PostgreSQL (Render - Recommended for Production)

1. **Create a PostgreSQL instance on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Create a new PostgreSQL database
   - Copy the **External Database URL**

2. **The URL format will be:**
   ```
   postgresql://user:password@host:port/database?sslmode=require
   ```

3. **Update your backend `.env` file** (see Configuration section below)

4. **Ensure `python-dotenv` is installed:**
   ```bash
   pip install python-dotenv
   ```

---

## Configuration

### Backend Configuration

**1. Create environment file:**
```bash
cd car-rental-backend
cp .env.example .env
```

**2. Edit `.env` file with your settings:**

#### For Local PostgreSQL:
```env
# Database Configuration
DATABASE_URL=postgresql://car_rental_user:your_secure_password@localhost:5432/car_rental

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=True

# CORS Settings
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Environment
ENVIRONMENT=development
DEBUG=True
```

#### For Render PostgreSQL:
```env
# Database Configuration (use the External Database URL from Render)
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=True

# CORS Settings
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Environment
ENVIRONMENT=development
DEBUG=True
```

**3. Create database tables:**

Before seeding data, you MUST create the database tables.

```bash
# Make sure you're in car-rental-backend/ with venv activated
python3 -m app.scripts.create_tables
```

Expected output:
```
Creating tables...
Tables created successfully!
```

**4. Seed the database:**

The seed script loads **868+ cars, agencies, providers, and pricing data** from `car-results.json`.

```bash
# Make sure virtual environment is activated and you're in car-rental-backend/
python3 -m app.scripts.seed_data
```

Expected output:
```
Found 868 results in JSON.
Inserted 50 records...
Inserted 100 records...
...
Seeding completed successfully!
```

> **Note:** The seed script includes fallback values to handle missing fields in the JSON data (like missing logos or fuel policies).

### Frontend Configuration

**1. Create environment file:**
```bash
cd car-rental-frontend
cp .env.example .env.local
```

**2. Edit `.env.local` file:**
```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

# Environment
NEXT_PUBLIC_ENV=development
```

---

## Running the Application

You'll need **two terminal windows** - one for the backend and one for the frontend.

### Terminal 1: Start Backend Server

```bash
# Navigate to backend directory
cd car-rental-backend

# Activate virtual environment
source venv/bin/activate  # Linux/Mac
# OR
venv\Scripts\activate     # Windows

# Start FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [xxxxx] using WatchFiles
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**Backend URLs:**
- API Base: http://localhost:8000
- Interactive API Docs (Swagger): http://localhost:8000/docs
- Alternative Docs (ReDoc): http://localhost:8000/redoc

### Terminal 2: Start Frontend Server

```bash
# Navigate to frontend directory
cd car-rental-frontend

# Start Next.js development server
npm run dev
```

**Expected Output:**
```
▲ Next.js 16.0.5
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.5s
```

**Frontend URL:**
- Application: http://localhost:3000

### Access the Application

Open your browser and navigate to **http://localhost:3000**

You should see the car rental homepage with a search form ready to use!

---

## Troubleshooting

### Python 3.13 Compatibility Issues

**Issue: `Failed building wheel for psycopg2-binary` or `Failed building wheel for pydantic-core`**

**Cause:** Python 3.13 is very new and some packages haven't released pre-built wheels for it yet.

**Solution 1: Install system dependencies and use compatible versions**

```bash
# Linux (Debian/Ubuntu)
sudo apt-get update
sudo apt-get install libpq-dev python3-dev build-essential

# macOS
brew install postgresql

# Then install packages with specific versions
pip install fastapi uvicorn[standard] sqlalchemy python-dotenv
pip install psycopg2-binary==2.9.10
pip install pydantic==2.10.3
```

**Solution 2: Use Python 3.11 or 3.12 (Recommended) ⭐**

```bash
# Check available Python versions
ls /usr/bin/python3*

# Install Python 3.11 or 3.12
# Ubuntu/Debian:
sudo apt-get install python3.11 python3.11-venv

# macOS (using Homebrew):
brew install python@3.11

# Recreate venv with compatible Python version
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Solution 3: Use Docker**

```bash
# Make sure Docker is installed
docker --version

# Build and run with Docker Compose
docker-compose up --build
```

**Solution 4: Use Render's deployed backend**

If local setup continues to fail, you can use the deployed backend API on Render and only run the frontend locally:

```bash
# In car-rental-frontend/.env.local
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com

# Then start only the frontend
cd car-rental-frontend
npm run dev
```

### Database Setup Issues

**Issue: Tables not created**

Solution:
```bash
cd car-rental-backend
source venv/bin/activate
python3 create_tables.py
```

**Issue: `relation "agencies" does not exist`**

Solution:
```bash
# Tables weren't created before seeding
python3 create_tables.py
python3 seed_data.py
```

**Issue: Database connection failed**

Solution:
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list               # macOS

# Start PostgreSQL if not running
sudo systemctl start postgresql  # Linux
brew services start postgresql   # macOS

# Verify DATABASE_URL in .env is correct
cat .env
```

**Issue: Connection refused (Render PostgreSQL)**

Solution:
- Verify external connections are enabled in Render dashboard
- Check that your DATABASE_URL includes `?sslmode=require`
- Ensure your IP is not blocked (Render allows all by default)

### Seeding Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| `KeyError: logo` | Some providers don't have a logo | Script uses `pr.get("logo", "")` for fallback |
| `KeyError: fuel_policy` | Missing fuel policy in JSON | Script uses `cp.get("fuelPolicy", "Unknown")` |
| `.env not loading` | Missing python-dotenv | Install: `pip install python-dotenv` |
| Wrong DB URL format | Missing SSL mode for Render | Add `?sslmode=require` to URL |
| No data after seeding | JSON file not found | Ensure `car-results.json` is in backend root |

### Common Backend Issues

**Issue: ModuleNotFoundError: No module named 'app'**

Solution:
```bash
cd car-rental-backend
source venv/bin/activate  # Make sure venv is activated
pip install -r requirements.txt
```

**Issue: Port 8000 already in use**

Solution:
```bash
# Find and kill process on port 8000
# Linux/Mac:
lsof -ti:8000 | xargs kill -9

# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or use a different port
uvicorn app.main:app --reload --port 8001
```

**Issue: ImportError or dependency conflicts**

Solution:
```bash
# Clear pip cache and reinstall
pip cache purge
pip uninstall -r requirements.txt -y
pip install -r requirements.txt
```

### Common Frontend Issues

**Issue: Cannot connect to backend API**

Solution:
- Verify backend is running at http://localhost:8000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for CORS errors
- Ensure backend `CORS_ORIGINS` includes `http://localhost:3000`

**Issue: Module not found errors**

Solution:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Issue: Port 3000 already in use**

Solution:
```bash
# Kill process on port 3000
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 npm run dev
```

**Issue: Build errors**

Solution:
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### Environment Variable Issues

**Issue: No cars showing in search**

Solution:
```bash
# Re-seed database
cd car-rental-backend
source venv/bin/activate
python3 create_tables.py
python3 seed_data.py

# Verify data exists
psql "$DATABASE_URL"
SELECT COUNT(*) FROM cars;
\q
```

**Issue: Environment variables not loading**

Solution:
- Ensure file is named exactly `.env` (backend) or `.env.local` (frontend)
- Check file is in correct directory
- Restart the development server after changes
- For frontend, variable names must start with `NEXT_PUBLIC_`

---

## Python Version Compatibility Matrix

| Python Version | Status | Notes |
|---------------|--------|-------|
| 3.10.x | ✅ Fully Supported | Recommended |
| 3.11.x | ✅ Fully Supported | Recommended |
| 3.12.x | ✅ Fully Supported | Recommended |
| 3.13.x | ⚠️ Limited Support | Some dependencies may require manual compilation |

---

## Contributing

Contributions are welcome! Please follow these steps:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable
4. **Commit your changes**
   ```bash
   git commit -m "Add: amazing new feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- **Frontend**: Follow TypeScript and React best practices
- **Backend**: Follow PEP 8 Python style guide
- **Commits**: Use conventional commit messages
- **Testing**: Add tests for new features
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation when needed

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

If you encounter any issues not covered in the troubleshooting section:

1. Check existing [GitHub Issues](https://github.com/shanavasvb/lascade-machine-test/issues)
2. Create a new issue with:
   - Your Python version (`python3 --version`)
   - Your OS and version
   - Complete error message
   - Steps to reproduce

---

## Acknowledgments

- FastAPI for the excellent Python web framework
- Next.js team for the powerful React framework
- All contributors and users of this project

---

<div align="center">
Made with ❤️ by Shanavasvb
</div>