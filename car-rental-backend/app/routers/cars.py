from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_, cast, String
from app.database import SessionLocal
from app.models.car import Car
from app.models.price import CarPrice
from app.models.agency import Agency
from app.models.provider import Provider
import json

router = APIRouter(prefix="/cars", tags=["cars"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def extract_address_from_pickup(pickup_data):
    """Extract address string from pickup JSON data"""
    if not pickup_data:
        return ""
    
    # If it's a string, parse it
    if isinstance(pickup_data, str):
        try:
            pickup_dict = json.loads(pickup_data)
        except:
            return pickup_data
    else:
        pickup_dict = pickup_data
    
    # Get address field
    return pickup_dict.get('address', '') if isinstance(pickup_dict, dict) else ""


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
            .join(CarPrice, Car.id == CarPrice.car_id)
            .join(Agency, Agency.id == CarPrice.agency_id)
            .join(Provider, Provider.id == CarPrice.provider_id)
        )

        # Price filters
        if min_price > 0:
            query = query.filter(CarPrice.price >= min_price)
        
        if max_price < 999999:
            query = query.filter(CarPrice.price <= max_price)

        # ✅ FIXED: Filter by pickup location using JSON field
        if pickup_location:
            import re
            
            print(f"🔍 User searching for: '{pickup_location}'")
            
            # Get all results first, then filter in Python
            # This is necessary because we need to parse JSON
            all_results = query.all()
            
            # Normalize search term
            search_term = pickup_location.strip().lower()
            
            # Extract search keywords
            search_keywords = re.split(r'[\s\-,+]+', search_term)
            search_keywords = [k for k in search_keywords if len(k) >= 2]
            
            # Remove stop words
            stop_words = ['airport', 'downtown', 'city', 'center', 'centre', 'station', 'the', 'at', 'in']
            search_keywords = [k for k in search_keywords if k not in stop_words]
            
            print(f"🔍 Search keywords: {search_keywords}")
            
            # Filter results by checking pickup JSON
            filtered_results = []
            for car, price, agency, provider in all_results:
                pickup_address = extract_address_from_pickup(price.pickup)
                pickup_address_lower = pickup_address.lower()
                
                # Check if ANY keyword matches the address
                if any(keyword in pickup_address_lower for keyword in search_keywords):
                    filtered_results.append((car, price, agency, provider))
            
            print(f"✅ Found {len(filtered_results)} cars matching location")
            
            # Replace query results with filtered results
            results = filtered_results
            total_count = len(filtered_results)
            
            # Handle pagination manually
            paginated_results = results[offset:offset + limit]
            
        else:
            # No location filter - continue with normal query
            
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
                fuels = [f.strip() for f in fuel.split(',')]
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
                query = query.filter(CarPrice.unlimited_mileage == unlimited_mileage)

            # Sorting
            if sort_by == "price_asc":
                query = query.order_by(CarPrice.price.asc())
            elif sort_by == "price_desc":
                query = query.order_by(CarPrice.price.desc())
            elif sort_by == "rating":
                query = query.order_by(Agency.rating.desc())
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
            paginated_results = query.offset(offset).limit(limit).all()

        # Format response
        response = []
        for car, price, agency, provider in paginated_results:
            # Extract pickup info
            pickup_address = extract_address_from_pickup(price.pickup)
            
            response.append({
                "car": {
                    "id": car.id,
                    "name": car.name,
                    "type": car.type,
                    "category": car.category,
                    "fuel": car.fuel,
                    "transmission": car.transmission,
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
                    "name": provider.name,
                    "logo": provider.logo,
                },
                "price": float(price.price),
                "pickup_location": pickup_address,
                "latitude": price.pickup.get('latitude') if isinstance(price.pickup, dict) else None,
                "longitude": price.pickup.get('longitude') if isinstance(price.pickup, dict) else None,
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
            .join(Provider, Provider.id == CarPrice.provider_id)
            .filter(Car.id == car_id)
            .first()
        )

        if not result:
            raise HTTPException(status_code=404, detail="Car not found")

        car, price, agency, provider = result
        
        pickup_address = extract_address_from_pickup(price.pickup)

        return {
            "car": {
                "id": car.id,
                "name": car.name,
                "type": car.type,
                "category": car.category,
                "fuel": car.fuel,
                "transmission": car.transmission,
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
                "name": provider.name,
                "logo": provider.logo,
            },
            "price": float(price.price),
            "pickup_location": pickup_address,
            "latitude": price.pickup.get('latitude') if isinstance(price.pickup, dict) else None,
            "longitude": price.pickup.get('longitude') if isinstance(price.pickup, dict) else None,
            "fuel_policy": price.fuel_policy,
            "free_cancellation": price.free_cancellation,
            "unlimited_mileage": price.unlimited_mileage,
        }

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")