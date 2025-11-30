from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, distinct
from app.database import SessionLocal
from app.models.price import CarPrice
import json

router = APIRouter(prefix="/locations", tags=["locations"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db. close()


@router.get("/")
def get_locations(db: Session = Depends(get_db)):
    """
    Get unique pickup locations from car prices
    """
    # If pickup is stored as JSON
    locations_raw = db.query(CarPrice. pickup).distinct(). all()
    
    locations = []
    seen_addresses = set()
    
    for (pickup_json,) in locations_raw:
        if pickup_json:
            # If stored as JSON string, parse it
            if isinstance(pickup_json, str):
                pickup_data = json. loads(pickup_json)
            else:
                pickup_data = pickup_json
            
            address = pickup_data.get('address', '')
            
            # Extract city name from address (e.g., "Las Vegas" from full address)
            # Format: "7135 Gilespie St, Las Vegas, Clark County, Nevada, 89119, United States"
            parts = address.split(',')
            if len(parts) >= 2:
                city = parts[1]. strip()  # Get "Las Vegas"
                state = parts[3].strip() if len(parts) >= 4 else ""
                
                # Create a clean location string
                location_key = f"{city}, {state}".strip(', ')
                
                if location_key and location_key not in seen_addresses:
                    seen_addresses.add(location_key)
                    locations.append({
                        "name": location_key,
                        "full_address": address,
                        "latitude": pickup_data.get('latitude'),
                        "longitude": pickup_data.get('longitude')
                    })
    
    # Sort alphabetically
    locations.sort(key=lambda x: x['name'])
    
    return locations