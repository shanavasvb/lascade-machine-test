from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.database import SessionLocal
from app.models.car import Car
from app.models.price import CarPrice
from app.models. agency import Agency
from app.models.provider import Provider

router = APIRouter(prefix="/cars", tags=["cars"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db. close()


@router.get("/")
async def get_cars(
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=50),
    min_price: float = Query(0, ge=0),
    max_price: float = Query(999999, ge=0),
    car_type: str | None = None,
    category: str | None = None,
    fuel: str | None = None,
    agency: str | None = None,
    pickup_location: str | None = None,
    dropoff_location: str | None = None,
    free_cancellation: bool | None = None,
    unlimited_mileage: bool | None = None,
    sort_by: str = "price_asc",
    db: Session = Depends(get_db)
):
    try:
        offset = (page - 1) * limit

        # Base query
        query = (
            db.query(Car, CarPrice, Agency, Provider)
            . join(CarPrice, Car.id == CarPrice.car_id)
            .join(Agency, Agency.id == CarPrice.agency_id)
            .join(Provider, Provider.id == CarPrice. provider_id)
        )

        # Only apply price filter if explicitly set (not default values)
        if min_price > 0:
            query = query.filter(CarPrice.price >= min_price)
        
        if max_price < 999999:
            query = query.filter(CarPrice.price <= max_price)

        # Filter by pickup location - IMPROVED SEARCH
        if pickup_location:
            import re
            # Split search term by spaces, dashes, commas, plus signs
            search_terms = re.split(r'[\s\-,+]+', pickup_location.strip())
            # Remove empty strings and short terms (less than 3 chars)
            search_terms = [term for term in search_terms if len(term) > 2]
            
            if search_terms:
                # Match if ANY of the terms is found in pickup_location
                location_filters = [
                    CarPrice.pickup_location.ilike(f"%{term}%") 
                    for term in search_terms
                ]
                query = query.filter(or_(*location_filters))
                
                # Debug logging
                print(f"🔍 Searching for location terms: {search_terms}")
        
        # Filter by dropoff location
        if dropoff_location:
            import re
            search_terms = re.split(r'[\s\-,+]+', dropoff_location.strip())
            search_terms = [term for term in search_terms if len(term) > 2]
            
            if search_terms:
                location_filters = [
                    CarPrice.pickup_location.ilike(f"%{term}%") 
                    for term in search_terms
                ]
                query = query.filter(or_(*location_filters))
        
        # Filter by car type (can be comma-separated)
        if car_type:
            car_types = [ct.strip() for ct in car_type.split(',')]
            query = query.filter(Car.type.in_(car_types))
        
        # Filter by category (can be comma-separated)
        if category:
            categories = [c.strip() for c in category.split(',')]
            query = query.filter(Car.category.in_(categories))

        # Filter by fuel (can be comma-separated)
        if fuel:
            fuels = [f.strip() for f in fuel. split(',')]
            query = query.filter(Car.fuel.in_(fuels))
        
        # Filter by agency (can be comma-separated)
        if agency:
            agencies = [a.strip() for a in agency.split(',')]
            query = query.filter(Agency.name.in_(agencies))
        
        # Filter by free cancellation
        if free_cancellation is not None:
            query = query.filter(CarPrice.free_cancellation == free_cancellation)
        
        # Filter by unlimited mileage
        if unlimited_mileage is not None:
            query = query. filter(CarPrice.unlimited_mileage == unlimited_mileage)

        # Sorting
        if sort_by == "price_asc":
            query = query.order_by(CarPrice. price.asc())
        elif sort_by == "price_desc":
            query = query.order_by(CarPrice.price. desc())
        elif sort_by == "rating":
            query = query.order_by(Agency. rating.desc())
        elif sort_by == "name":
            query = query.order_by(Car.name.asc())

        # Get total count before pagination
        total_count = query.count()
        
        if total_count == 0:
            return {
                "page": page,
                "limit": limit,
                "count": 0,
                "total_pages": 0,
                "results": []
            }
        
        # Get paginated results
        results = query.offset(offset).limit(limit).all()

        # Format response
        response = []
        for car, price, agency, provider in results:
            response.append({
                "car": {
                    "id": car.id,
                    "name": car. name,
                    "type": car.type,
                    "category": car.category,
                    "fuel": car.fuel,
                    "transmission": car. transmission,
                    "image": car.image,
                    "passengers": car.passengers,
                    "bags": car.bags,
                    "sipp": car.sipp,
                },
                "agency": {
                    "name": agency.name,
                    "code": agency.code,
                    "logo": agency.logo,
                    "rating": float(agency.rating) if agency.rating else 0,
                },
                "provider": {
                    "name": provider. name,
                    "logo": provider.logo,
                },
                "price": float(price. price),
                "pickup_location": price.pickup_location or '',
                "latitude": float(price.latitude) if price.latitude else None,
                "longitude": float(price.longitude) if price. longitude else None,
                "fuel_policy": price.fuel_policy,
                "free_cancellation": price.free_cancellation,
                "unlimited_mileage": price.unlimited_mileage,
            })

        total_pages = (total_count + limit - 1) // limit

        return {
            "page": page,
            "limit": limit,
            "count": total_count,
            "total_pages": total_pages,
            "results": response
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.get("/{car_id}")
async def get_car_by_id(car_id: int, db: Session = Depends(get_db)):
    """Get a specific car by ID with all its details"""
    try:
        result = (
            db.query(Car, CarPrice, Agency, Provider)
            .join(CarPrice, Car.id == CarPrice.car_id)
            .join(Agency, Agency.id == CarPrice.agency_id)
            . join(Provider, Provider.id == CarPrice.provider_id)
            .filter(Car.id == car_id)
            .first()
        )

        if not result:
            raise HTTPException(status_code=404, detail="Car not found")

        car, price, agency, provider = result

        return {
            "car": {
                "id": car. id,
                "name": car.name,
                "type": car.type,
                "category": car.category,
                "fuel": car.fuel,
                "transmission": car.transmission,
                "image": car.image,
                "passengers": car.passengers,
                "bags": car. bags,
                "sipp": car.sipp,
            },
            "agency": {
                "name": agency.name,
                "code": agency.code,
                "logo": agency.logo,
                "rating": float(agency.rating) if agency.rating else 0,
            },
            "provider": {
                "name": provider.name,
                "logo": provider.logo,
            },
            "price": float(price.price),
            "pickup_location": price.pickup_location or '',
            "latitude": float(price.latitude) if price.latitude else None,
            "longitude": float(price.longitude) if price.longitude else None,
            "fuel_policy": price. fuel_policy,
            "free_cancellation": price.free_cancellation,
            "unlimited_mileage": price.unlimited_mileage,
        }

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")