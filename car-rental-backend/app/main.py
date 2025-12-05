import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import cars, filters, location
from app.scripts.seed_data import seed_database
from app.scripts.create_tables import create_tables
from dotenv import load_dotenv

# Load environment variables (.env for local, Render injects automatically)
load_dotenv()

app = FastAPI(
    title="Car Rental API",
    description="API for car rental service",
    version="1.0.0"
)

#  CORS CONFIGURATION (FIXED)
cors_env = os.getenv("CORS_ORIGINS")

if cors_env:
    # Split by comma and strip whitespaces
    cors_origins = [c.strip() for c in cors_env.split(",")]
else:
    # Default origins for local + Vercel production
    cors_origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://lascade-machine-test.vercel.app",
    ]

print("Using CORS origins:", cors_origins)

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTERS
app.include_router(cars.router)
app.include_router(filters.router)
app.include_router(location.router)


# BASE ROUTES
@app.get("/")
def read_root():
    return {
        "message": "Car Rental API",
        "status": "running",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}

