import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.routers import cars, filters

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Car Rental API",
    description="API for car rental service",
    version="1.0.0"
)

# Get CORS origins from environment
cors_origins = os.getenv("CORS_ORIGINS"). split(",")

# CORS - Allow frontend to access
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(cars.router)
app.include_router(filters.router)

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