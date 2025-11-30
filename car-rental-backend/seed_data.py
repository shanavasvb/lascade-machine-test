import json
import os
from app.database import SessionLocal
from app.models.car import Car
from app.models.agency import Agency
from app.models.provider import Provider
from app.models.price import CarPrice

def load_json():
    file_path = os.path.join(os.path.dirname(__file__), "..", "car-results.json")
    with open(file_path, "r") as f:
        return json.load(f)

def seed_database():
    data = load_json()
    results = data.get("results", [])

    db = SessionLocal()

    print(f"Found {len(results)} results in JSON.")

    for idx, item in enumerate(results):
        # --------------------------
        # 1. Insert Agency
        # --------------------------
        agency_data = item["agency"]
        agency = Agency(
            name=agency_data["name"],
            code=agency_data["code"],
            logo=agency_data["logo"],
            rating=agency_data.get("rating", None)
        )
        db.add(agency)
        db.flush()

        # --------------------------
        # 2. Insert Car
        # --------------------------
        car_data = item["car"]

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

        # --------------------------
        # 3. Insert Providers
        # --------------------------
        provider_ids = {}
        for pr in item.get("providers", []):
            provider = Provider(name=pr["name"], logo=pr["logo"])
            db.add(provider)
            db.flush()
            provider_ids[pr["name"]] = provider.id

        # --------------------------
        # 4. Insert CarPrice
        # --------------------------
        for pr in item.get("providers", []):
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
    print("Seeding completed successfully!")

if __name__ == "__main__":
    seed_database()

