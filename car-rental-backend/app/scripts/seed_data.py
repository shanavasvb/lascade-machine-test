import os
import json
from app.database import SessionLocal
from app.models.car import Car
from app.models.agency import Agency
from app.models.provider import Provider
from app.models.price import CarPrice

def load_json():
    file_path = os.path.join(os.path.dirname(__file__), "car-results.json")
    with open(file_path, "r") as f:
        return json.load(f)

def seed_database():
    data = load_json()
    results = data.get("results", [])

    db = SessionLocal()

    print(f"Found {len(results)} results in JSON.")

    for idx, item in enumerate(results):

        # 1. Insert Agency
        agency_data = item.get("agency", {})
        agency = Agency(
            name=agency_data.get("name"),
            code=agency_data.get("code"),
            logo=agency_data.get("logo"),
            rating=agency_data.get("rating")
        )
        db.add(agency)
        db.flush()

        # 2. Insert Car
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
            image=car_data.get("image")
        )
        db.add(car)
        db.flush()

        # 3. Insert Providers
        provider_ids = {}
        for pr in item.get("providers", []):
            provider = Provider(
                name=pr.get("name"),
                logo=pr.get("logo")  
            )
            db.add(provider)
            db.flush()
            provider_ids[pr.get("name")] = provider.id

        # 4. Insert CarPrice
        pickup = item.get("pickup", {})

        for pr in item.get("providers", []):
            price_entry = CarPrice(
                car_id=car.id,
                agency_id=agency.id,
                provider_id=provider_ids.get(pr.get("name")),
                price=pr.get("price", 0),  # SAFE: default price
                free_cancellation=pr.get("free_cancellation", False),
                unlimited_mileage=pr.get("unlimited_mileage", False),
                fuel_policy=pr.get("fuel_policy"),
                pickup_location=pickup.get("name"),
                latitude=pickup.get("latitude"),
                longitude=pickup.get("longitude")
            )
            db.add(price_entry)

        if (idx + 1) % 50 == 0:
            print(f"Inserted {idx + 1} records...")

    db.commit()
    db.close()
    print("Seeding completed successfully!")

if __name__ == "__main__":
    seed_database()
