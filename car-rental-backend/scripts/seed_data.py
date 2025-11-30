import json
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models.car import Car
from app.models.agency import Agency
from app.models.provider import Provider
from app.models.price import CarPrice

# Load JSON data
JSON_PATH = "car-results.json"

def seed():
    print("🚗 Starting database seed...")

    # Create DB session
    db: Session = SessionLocal()

    # Load JSON file
    with open(JSON_PATH, "r") as f:
        data = json.load(f)

    results = data.get("results", [])

    print(f"📦 Found {len(results)} results in JSON")

    for item in results:
        # --- Agency ---
        agency_data = item.get("agency", {})
        agency = Agency(
            name=agency_data.get("name"),
            code=agency_data.get("code"),
            logo=agency_data.get("logo"),
            rating=agency_data.get("rating"),
        )
        db.add(agency)
        db.flush()  # get agency.id

        # --- Car ---
        car_data = item.get("car", {})
        car = Car(
            name=car_data.get("name"),
            category=car_data.get("category"),
            type=car_data.get("type"),
            fuel=car_data.get("fuel"),
            transmission=car_data.get("transmission"),
            passengers=car_data.get("passengers"),
            bags=car_data.get("bags"),
            sipp=car_data.get("sipp"),
            image=car_data.get("image"),
        )
        db.add(car)
        db.flush()

        # --- Providers / Prices ---
        for p in item.get("providers", []):
            # Create provider
            provider = Provider(
                name=p.get("name"),
                logo=p.get("logo")
            )
            db.add(provider)
            db.flush()

            # Insert price entry
            price = CarPrice(
                car_id=car.id,
                agency_id=agency.id,
                provider_id=provider.id,
                price=p.get("price"),
                free_cancellation=p.get("free_cancellation"),
                unlimited_mileage=p.get("unlimited_mileage"),
                fuel_policy=p.get("fuel_policy"),
                pickup_location=item.get("pickup", {}).get("location"),
                latitude=item.get("pickup", {}).get("lat"),
                longitude=item.get("pickup", {}).get("lon"),
            )
            db.add(price)

    # Commit everything
    db.commit()
    db.close()

    print("✅ Seeding complete!")
    print("🎉 All data inserted successfully.")
    

if __name__ == "__main__":
    seed()
