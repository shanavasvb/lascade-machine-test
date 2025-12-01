# Car Rental Application

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
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
| **Python** | Programming language | 3.10+ |

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

**1. Python 3.10 or higher**
```bash
python3 --version  # Should output 3.10.x or higher
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

### Step 2: Database Setup

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

### Step 3: Backend Setup

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

# Upgrade pip and install dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 4: Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd car-rental-frontend

# Install dependencies
npm install
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

**3. Seed the database:**
```bash
# Make sure virtual environment is activated and you're in car-rental-backend/
python scripts/seed_data.py
```

Expected output:
```
✓ Database tables created successfully
✓ Seeded X cars, Y agencies, Z providers
✓ Database seeded successfully!
```

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

## Project Structure

```
lascade-machine-test/
│
├── car-rental-backend/              # FastAPI Backend
│   ├── app/
│   │   ├── models/                  # SQLAlchemy Models
│   │   │   ├── __init__.py
│   │   │   ├── car.py              # Car model
│   │   │   ├── agency.py           # Rental agency model
│   │   │   ├── provider.py         # Provider model
│   │   │   └── price.py            # Pricing model
│   │   │
│   │   ├── routers/                 # API Endpoints
│   │   │   ├── __init__.py
│   │   │   ├── cars.py             # Car search & CRUD
│   │   │   └── filters.py          # Filter options
│   │   │
│   │   ├── schemas/                 # Pydantic Schemas
│   │   │   ├── __init__.py
│   │   │   ├── car.py
│   │   │   └── filters.py
│   │   │
│   │   ├── services/                # Business logic layer
│   │   │   ├── __init__.py
│   │   │   └── car_service.py
│   │   │
│   │   ├── database.py              # Database connection
│   │   └── main.py                  # FastAPI app entry point
│   │
│   ├── scripts/
│   │   └── seed_data.py             # Database seeding
│   │
│   ├── .env.example                 # Environment template
│   ├── requirements.txt             # Python dependencies
│   ├── .gitignore
│   └── README.md
│
├── car-rental-frontend/             # Next.js Frontend
│   ├── public/                      # Static assets
│   │   ├── icons/
│   │   └── images/
│   │       ├── background.png
│   │       └── phone-mockups.png
│   │
│   ├── src/
│   │   ├── app/                     # Next.js App Router
│   │   │   ├── css/
│   │   │   │   └── calender-custom.css
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── page.tsx             # Home page
│   │   │   ├── globals.css          # Global styles
│   │   │   ├── search/
│   │   │   │   └── page.tsx         # Search results page
│   │   │   └── payment/
│   │   │       └── page.tsx         # Payment page
│   │   │
│   │   ├── components/              # React Components
│   │   │   ├── hero/
│   │   │   │   └── hero.tsx         # Hero section with search
│   │   │   ├── navbar/
│   │   │   │   └── navbar.tsx       # Navigation bar
│   │   │   ├── footer/
│   │   │   │   └── footer.tsx       # Footer component
│   │   │   ├── search/              # Search-related components
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   ├── FilterSidebar.tsx
│   │   │   │   ├── CarCard.tsx
│   │   │   │   ├── SortBar.tsx
│   │   │   │   ├── Pagination.tsx
│   │   │   │   ├── LocationInput.tsx
│   │   │   │   ├── CalenderInput.tsx
│   │   │   │   └── date-range-picker.tsx
│   │   │   ├── brands/
│   │   │   │   └── BrandStrip.tsx
│   │   │   ├── places/
│   │   │   │   ├── PlacesCard.tsx
│   │   │   │   └── PlacesGrid.tsx
│   │   │   ├── guides/
│   │   │   │   ├── GuideCard.tsx
│   │   │   │   └── TravelGuide.tsx
│   │   │   └── apppromo/
│   │   │       └── Apppromo.tsx
│   │   │
│   │   ├── lib/                     # Utility functions
│   │   │   └── search-api.ts        # API client functions
│   │   │
│   │   ├── types/                   # TypeScript type definitions
│   │   │   └── search.ts            # Search-related types
│   │   │
│   │   └── data/                    # Static data
│   │       ├── data.ts              # App data
│   │       └── location.ts          # Location data
│   │
│   ├── .env.example                 # Environment template
│   ├── .env.local                   # Local environment (gitignored)
│   ├── package.json                 # Node dependencies
│   ├── tsconfig.json                # TypeScript config
│   ├── tailwind.config.ts           # Tailwind config
│   ├── next.config.ts               # Next.js config
│   ├── .gitignore
│   └── README.md
│
├── docs/                            # Documentation
│   └── home-page-ui.md
│
├── .gitignore                       # Root gitignore
├── LICENSE                          # MIT License
└── README.md                        # This file
```

---

## API Documentation

### Interactive Documentation

Once the backend is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs (recommended)
- **ReDoc**: http://localhost:8000/redoc

### Main Endpoints

#### Health Check
```http
GET /
```
Returns API status and version information.

**Example Response:**
```json
{
  "message": "Car Rental API",
  "status": "running"
}
```

#### Search Cars
```http
GET /cars/
```

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `pickup_location` | string | Search by location | `Las Vegas` |
| `pickup_date` | string | Pickup date (ISO 8601) | `2024-12-15` |
| `dropoff_date` | string | Drop-off date (ISO 8601) | `2024-12-20` |
| `min_price` | float | Minimum price per day | `50.00` |
| `max_price` | float | Maximum price per day | `150.00` |
| `car_type` | string | Type of car | `SUV`, `Sedan`, `Compact` |
| `fuel_type` | string | Fuel type | `Petrol`, `Diesel`, `Electric` |
| `category` | string | Car category | `Economy`, `Luxury`, `Premium` |
| `agency` | string | Rental agency name | `Enterprise`, `Hertz` |
| `free_cancellation` | boolean | Free cancellation option | `true`, `false` |
| `unlimited_mileage` | boolean | Unlimited mileage option | `true`, `false` |
| `sort_by` | string | Sort results | `price_asc`, `price_desc` |
| `page` | integer | Page number | `1` |
| `limit` | integer | Results per page (max 100) | `20` |

**Example Requests:**
```bash
# Get all cars
curl http://localhost:8000/cars/

# Search by location
curl "http://localhost:8000/cars/?pickup_location=Las%20Vegas"

# Filter by car type and price range
curl "http://localhost:8000/cars/?car_type=SUV&min_price=50&max_price=150"

# Sort by price (lowest first)
curl "http://localhost:8000/cars/?sort_by=price_asc"

# Filter with multiple criteria
curl "http://localhost:8000/cars/?pickup_location=Las%20Vegas&car_type=Sedan&free_cancellation=true&unlimited_mileage=true"
```

**Example Response:**
```json
{
  "total": 25,
  "page": 1,
  "limit": 20,
  "cars": [
    {
      "id": 1,
      "name": "Toyota RAV4",
      "type": "SUV",
      "category": "Premium",
      "fuel": "Petrol",
      "transmission": "Automatic",
      "passengers": 5,
      "bags": 3,
      "image": "https://example.com/rav4.jpg",
      "price": 85.00,
      "agency": {
        "name": "Enterprise",
        "code": "ENT",
        "rating": 4.5
      },
      "provider": {
        "name": "CarTrawler",
        "logo": "https://example.com/cartrawler.png"
      },
      "pickup_location": "Las Vegas Airport",
      "latitude": 36.0840,
      "longitude": -115.1537,
      "fuel_policy": "Full to Full",
      "free_cancellation": true,
      "unlimited_mileage": true
    }
  ]
}
```

#### Get Car Details
```http
GET /cars/{car_id}
```

Returns detailed information about a specific car.

**Example Request:**
```bash
curl http://localhost:8000/cars/1
```

#### Get Filter Options
```http
GET /filters/
```

Returns all available filter options for the search.

**Example Request:**
```bash
curl http://localhost:8000/filters/
```

**Example Response:**
```json
{
  "car_types": ["SUV", "Sedan", "Compact", "Luxury", "Convertible"],
  "fuel_types": ["Petrol", "Diesel", "Electric", "Hybrid"],
  "categories": ["Economy", "Premium", "Luxury", "Standard"],
  "agencies": ["Enterprise", "Hertz", "Avis", "Budget"],
  "price_range": {
    "min": 25.00,
    "max": 500.00
  }
}
```

---

## Testing

### Testing the Application

**1. Access the Application**

Open your browser and navigate to:
```
http://localhost:3000
```

**2. Test Search Functionality**

- Enter pickup location (e.g., "Las Vegas Airport")
- Select pickup date from the calendar
- Enter dropoff location (can be same as pickup)
- Select dropoff date
- Click "Search" button

**3. Test Filters**

On the search results page, try:
- Filter by car type (Sedan, SUV, etc.)
- Filter by category (Economy, Luxury, etc.)
- Filter by fuel type
- Filter by agency
- Toggle free cancellation
- Toggle unlimited mileage
- Apply price range filter

**4. Test API Endpoints**

```bash
# Test root endpoint
curl http://localhost:8000/

# Test cars endpoint
curl http://localhost:8000/cars/

# Test filters endpoint
curl http://localhost:8000/filters/

# Test with query parameters
curl "http://localhost:8000/cars/?pickup_location=Las%20Vegas&min_price=50&max_price=100"
```

### Automated Tests

#### Backend Tests

```bash
cd car-rental-backend
source venv/bin/activate

# Install test dependencies
pip install pytest pytest-cov

# Run tests
pytest

# Run with coverage
pytest --cov=app tests/
```

#### Frontend Tests

```bash
cd car-rental-frontend

# Run tests (when implemented)
npm test

# Run with coverage
npm test -- --coverage
```

---

## Troubleshooting

### Common Backend Issues

**Issue: ModuleNotFoundError: No module named 'app'**

Solution:
```bash
cd car-rental-backend
source venv/bin/activate  # Make sure venv is activated
pip install -r requirements.txt
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

**Issue: "relation 'cars' does not exist"**

Solution:
```bash
# Run seed script to create tables
python scripts/seed_data.py
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

### Database Issues

**Issue: No cars showing in search**

Solution:
```bash
# Re-seed database
cd car-rental-backend
source venv/bin/activate
python scripts/seed_data.py

# Verify data exists
sudo -u postgres psql -d car_rental
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

## Database Schema

### Cars Table
- `id`: Primary Key
- `name`: Car model name
- `type`: Car type (Sedan, SUV, etc.)
- `category`: Category (Economy, Luxury, etc.)
- `fuel`: Fuel type
- `transmission`: Transmission type
- `passengers`: Number of passengers
- `bags`: Luggage capacity
- `image`: Car image URL
- `sipp`: SIPP code

### Agencies Table
- `id`: Primary Key
- `name`: Agency name
- `code`: Agency code
- `logo`: Logo URL
- `rating`: Agency rating

### Providers Table
- `id`: Primary Key
- `name`: Provider name
- `logo`: Logo URL

### Car Prices Table
- `id`: Primary Key
- `car_id`: Foreign Key → Cars
- `agency_id`: Foreign Key → Agencies
- `provider_id`: Foreign Key → Providers
- `price`: Rental price
- `pickup_location`: Pickup location
- `latitude`: Location latitude
- `longitude`: Location longitude
- `fuel_policy`: Fuel policy
- `free_cancellation`: Boolean
- `unlimited_mileage`: Boolean

---

## Environment Variables Reference

### Backend (.env)

```env
DATABASE_URL=postgresql://user:password@host:port/database
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=True
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
ENVIRONMENT=development
DEBUG=True
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_ENV=development
```

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

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Shanavas VB

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## Authors

**Shanavas VB**
- GitHub: [@shanavasvb](https://github.com/shanavasvb)
- Repository: [lascade-machine-test](https://github.com/shanavasvb/lascade-machine-test)

---

## Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [Next.js](https://nextjs.org/) - React framework
- [PostgreSQL](https://www.postgresql.org/) - Robust database system
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- All contributors who have helped improve this project

---

## Support

If you have questions or need help:

- Open an [issue](https://github.com/shanavasvb/lascade-machine-test/issues)
- Review the [Troubleshooting](#troubleshooting) section
- Check the [API Documentation](http://localhost:8000/docs) when backend is running

---

<div align="center">

**Made with care for Lascade Machine Test**

[Back to Top](#car-rental-application)

</div>