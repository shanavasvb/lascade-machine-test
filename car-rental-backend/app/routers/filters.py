from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import SessionLocal
from app.models.car import Car
from app.models.agency import Agency
from app.models. price import CarPrice

router = APIRouter(prefix="/filters", tags=["filters"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_filters(db: Session = Depends(get_db)):
    # Get distinct car types
    car_types = db. query(Car.type).distinct(). filter(Car.type.isnot(None)).all()
    
    # Get distinct fuel types
    fuel_types = db.query(Car.fuel).distinct().filter(Car.fuel.isnot(None)).all()
    
    # Get distinct categories
    categories = db.query(Car.category).distinct().filter(Car.category.isnot(None)).all()
    
    # Get unique agencies - group by code to avoid duplicates
    agencies_query = db.query(
        Agency.name,
        Agency.code,
        Agency.logo,
        func.max(Agency.rating).label('rating')  # Use max rating if there are duplicates
    ).group_by(
        Agency.name,
        Agency.code,
        Agency.logo
    ). all()
    
    # Get price range
    price_stats = db.query(
        func.min(CarPrice.price). label('min_price'),
        func.max(CarPrice.price).label('max_price')
    ).first()

    # Format agencies list
    agencies_list = []
    seen_codes = set()
    
    for agency in agencies_query:
        # Only add if we haven't seen this code before
        if agency.code not in seen_codes:
            agencies_list.append({
                "name": agency.name,
                "code": agency.code,
                "logo": agency.logo,
                "rating": float(agency.rating) if agency. rating else 0
            })
            seen_codes.add(agency.code)

    return {
        "car_types": sorted([c[0] for c in car_types if c[0]]),
        "fuel_types": sorted([f[0] for f in fuel_types if f[0]]),
        "categories": sorted([c[0] for c in categories if c[0]]),
        "agencies": sorted(agencies_list, key=lambda x: x["name"]),
        "price_range": {
            "min": float(price_stats.min_price) if price_stats. min_price else 0,
            "max": float(price_stats.max_price) if price_stats.max_price else 10000
        }
    }