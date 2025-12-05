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
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

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

@app.get("/seed")
def seed_endpoint():
    """
    Endpoint to seed the database with car data from car-results.json
    Visit: https://your-backend-url.onrender.com/seed
    """
    import json
    from app.database import SessionLocal
    from app.models.car import Car
    from app.models.agency import Agency
    from app.models.provider import Provider
    from app.models.price import CarPrice
    
    def load_json():
        file_path = os.path.join(os.path.dirname(__file__), "..", "car-results.json")
        with open(file_path, "r") as f:
            return json.load(f)
    
    try:
        data = load_json()
        results = data.get("results", [])
        db = SessionLocal()
        
        print(f"Found {len(results)} results in JSON.")
        
        for idx, item in enumerate(results):
            # 1. Insert Agency
            agency_data = item["agency"]
            
            # Check if agency already exists
            existing_agency = db.query(Agency).filter(Agency.code == agency_data["code"]).first()
            if existing_agency:
                agency = existing_agency
            else:
                agency = Agency(
                    name=agency_data["name"],
                    code=agency_data["code"],
                    logo=agency_data["logo"],
                    rating=agency_data.get("rating", None)
                )
                db.add(agency)
                db.flush()
            
            # 2. Insert Car
            car_data = item["car"]
            
            # Check if car already exists
            existing_car = db.query(Car).filter(
                Car.name == car_data["name"],
                Car.sipp == car_data["sipp"]
            ).first()
            
            if existing_car:
                car = existing_car
            else:
                car = Car(
                    name=car_data["name"],
                    category=car_data["category"],
                    type=car_data["type"],
                    fuel=car_data["fuel"],
                    transmission=car_data["transmission"],
                    passengers=car_data["passengers"],
                    bags=car_data["bags"],
                    sipp=car_data["sipp"],
                    image=car_data["image"]
                )
                db.add(car)
                db.flush()
            
            # 3. Insert Providers
            provider_ids = {}
            for pr in item.get("providers", []):
                # Check if provider already exists
                existing_provider = db.query(Provider).filter(Provider.name == pr["name"]).first()
                if existing_provider:
                    provider = existing_provider
                else:
                    provider = Provider(name=pr["name"], logo=pr["logo"])
                    db.add(provider)
                    db.flush()
                provider_ids[pr["name"]] = provider.id
            
            # 4. Insert CarPrice
            for pr in item.get("providers", []):
                # Check if price entry already exists
                existing_price = db.query(CarPrice).filter(
                    CarPrice.car_id == car.id,
                    CarPrice.agency_id == agency.id,
                    CarPrice.provider_id == provider_ids[pr["name"]]
                ).first()
                
                if not existing_price:
                    price_entry = CarPrice(
                        car_id=car.id,
                        agency_id=agency.id,
                        provider_id=provider_ids[pr["name"]],
                        price=pr["price"],
                        free_cancellation=pr.get("free_cancellation", False),
                        unlimited_mileage=pr.get("unlimited_mileage", False),
                        fuel_policy=pr.get("fuel_policy", None),
                        pickup_location=item["pickup"]["name"],
                        latitude=item["pickup"]["latitude"],
                        longitude=item["pickup"]["longitude"]
                    )
                    db.add(price_entry)
            
            if (idx + 1) % 50 == 0:
                print(f"Inserted {idx + 1} records...")
        
        db.commit()
        db.close()
        
        return {
            "status": "success",
            "message": f"Database seeded successfully with {len(results)} car entries!",
            "total_records": len(results)
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }