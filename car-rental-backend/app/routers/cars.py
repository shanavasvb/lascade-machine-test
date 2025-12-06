from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.car import Car
from app.models.price import CarPrice
from app.models.agency import Agency
from app.models. provider import Provider
import re

router = APIRouter(prefix="/cars", tags=["cars"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db. close()


def normalize_location_search(search_term: str) -> list[str]:
    """
    Normalize location search term into searchable keywords. 
    """
    if not search_term:
        return []
    
    # Convert to lowercase and strip
    normalized = search_term.strip().lower()
    
    # Split by common separators
    keywords = re.split(r'[\s\-,+]+', normalized)
    
    # Filter out very short words (less than 3 chars)
    keywords = [k. strip() for k in keywords if len(k) >= 3]
    
    return keywords


def matches_location(address: str, search_keywords: list[str]) -> bool:
    """
    Check if address matches any of the search keywords.
    """
    if not address or not search_keywords:
        return False
    
    address_lower = address.lower()
    
    # Match if ANY keyword is found
    for keyword in search_keywords:
        if keyword in address_lower:
            return True
    
    return False


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

        # ✅ ADD DEBUG LOGGING
        print(f"\n{'='*80}")
        print(f"[REQUEST] New car search request")
        print(f"[REQUEST] pickup_location param: '{pickup_location}'")
        print(f"[REQUEST] Type: {type(pickup_location)}")
        print(f"[REQUEST] page={page}, limit={limit}")
        print(f"{'='*80}\n")

        # Base query
        query = (
            db.query(Car, CarPrice, Agency, Provider)
            .join(CarPrice, Car.id == CarPrice.car_id)
            .join(Agency, Agency.id == CarPrice.agency_id)
            .join(Provider, Provider.id == CarPrice.provider_id)
        )

        # Price filters
        if min_price > 0:
            query = query. filter(CarPrice.price >= min_price)
            print(f"[FILTER] Applied min_price: {min_price}")
        
        if max_price < 999999:
            query = query.filter(CarPrice.price <= max_price)
            print(f"[FILTER] Applied max_price: {max_price}")

        # Location filtering logic
        if pickup_location:
            print(f"\n[LOCATION] 🔍 Starting location filter")
            print(f"[LOCATION] Raw input: '{pickup_location}'")
            
            # Normalize search term
            search_keywords = normalize_location_search(pickup_location)
            print(f"[LOCATION] Extracted keywords: {search_keywords}")
            
            if search_keywords:
                # Fetch all results first
                all_results = query.all()
                print(f"[LOCATION] Total records before location filter: {len(all_results)}")
                
                # Filter by location
                filtered_results = []
                match_count = 0
                no_match_count = 0
                
                for car, price, agency, provider in all_results:
                    try:
                        # Use pickup_location field (String)
                        pickup_address = price.pickup_location or ""
                        
                        if matches_location(pickup_address, search_keywords):
                            filtered_results.append((car, price, agency, provider))
                            match_count += 1
                            if match_count <= 5:  # Show first 5 matches
                                print(f"[MATCH ✓] Car ID {car.id}: '{pickup_address}'")
                        else:
                            no_match_count += 1
                            if no_match_count <= 3:  # Show first 3 non-matches
                                print(f"[NO MATCH ✗] Car ID {car.id}: '{pickup_address}'")
                    
                    except Exception as e:
                        print(f"[ERROR] Processing car {car.id}: {str(e)}")
                        continue 
                
                print(f"[LOCATION] ✅ Found {len(filtered_results)} matching cars")
                print(f"[LOCATION] Matched: {match_count}, No Match: {no_match_count}\n")
                results = filtered_results
            else:
                results = query.all()
                print(f"[LOCATION] ⚠️ No valid keywords, showing all {len(results)} cars\n")
            
            # Apply other filters
            if car_type and isinstance(car_type, str):
                car_types = [ct.strip() for ct in car_type.split(',')]
                results = [(c, p, a, pr) for c, p, a, pr in results if c.type in car_types]
                print(f"[FILTER] After car_type filter: {len(results)} cars")
            
            if category and isinstance(category, str):
                categories = [cat.strip() for cat in category.split(',')]
                results = [(c, p, a, pr) for c, p, a, pr in results if c. category in categories]
                print(f"[FILTER] After category filter: {len(results)} cars")
            
            if fuel and isinstance(fuel, str):
                fuels = [f.strip() for f in fuel. split(',')]
                results = [(c, p, a, pr) for c, p, a, pr in results if c.fuel in fuels]
                print(f"[FILTER] After fuel filter: {len(results)} cars")
            
            if agency and isinstance(agency, str):
                agencies = [ag.strip() for ag in agency. split(',')]
                results = [(c, p, a, pr) for c, p, a, pr in results if a.name in agencies]
                print(f"[FILTER] After agency filter: {len(results)} cars")
            
            if free_cancellation is not None:
                results = [(c, p, a, pr) for c, p, a, pr in results if p.free_cancellation == free_cancellation]
                print(f"[FILTER] After free_cancellation filter: {len(results)} cars")
            
            if unlimited_mileage is not None:
                results = [(c, p, a, pr) for c, p, a, pr in results if p.unlimited_mileage == unlimited_mileage]
                print(f"[FILTER] After unlimited_mileage filter: {len(results)} cars")
            
            # Sorting
            if sort_by == "price_asc":
                results = sorted(results, key=lambda x: x[1].price)
            elif sort_by == "price_desc":
                results = sorted(results, key=lambda x: x[1].price, reverse=True)
            elif sort_by == "rating":
                results = sorted(results, key=lambda x: x[2].rating if x[2].rating else 0, reverse=True)
            elif sort_by == "name":
                results = sorted(results, key=lambda x: x[0]. name)
            
            print(f"[SORT] Applied sort_by: {sort_by}")
            
            total_count = len(results)
            paginated_results = results[offset:offset + limit]
            
            print(f"[PAGINATION] Total: {total_count}, Page: {page}, Showing: {len(paginated_results)} results\n")
        
        else:
            # No location filter - use normal query
            print(f"[LOCATION] ⚠️ No pickup_location provided, fetching all cars\n")
            
            if car_type and isinstance(car_type, str):
                car_types = [ct.strip() for ct in car_type.split(',')]
                query = query.filter(Car.type.in_(car_types))
            
            if category and isinstance(category, str):
                categories = [c.strip() for c in category. split(',')]
                query = query.filter(Car.category.in_(categories))

            if fuel and isinstance(fuel, str):
                fuels = [f.strip() for f in fuel.split(',')]
                query = query.filter(Car.fuel. in_(fuels))
            
            if agency and isinstance(agency, str):
                agencies = [a.strip() for a in agency.split(',')]
                query = query.filter(Agency.name.in_(agencies))
            
            if free_cancellation is not None:
                query = query.filter(CarPrice.free_cancellation == free_cancellation)
            
            if unlimited_mileage is not None:
                query = query. filter(CarPrice.unlimited_mileage == unlimited_mileage)

            # Sorting
            if sort_by == "price_asc":
                query = query.order_by(CarPrice.price. asc())
            elif sort_by == "price_desc":
                query = query.order_by(CarPrice.price.desc())
            elif sort_by == "rating":
                query = query. order_by(Agency.rating.desc())
            elif sort_by == "name":
                query = query.order_by(Car.name.asc())

            total_count = query.count()
            
            if total_count == 0:
                return {
                    "page": page,
                    "limit": limit,
                    "count": 0,
                    "total_pages": 0,
                    "results": []
                }
            
            paginated_results = query.offset(offset).limit(limit).all()

        # Format response
        response = []
        for car, price, agency, provider in paginated_results:
            try:
                response.append({
                    "car": {
                        "id": car. id,
                        "name": car.name,
                        "type": car.type,
                        "category": car.category,
                        "fuel": car. fuel,
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
                        "rating": float(agency.rating) if agency. rating else 0,
                    },
                    "provider": {
                        "name": provider.name,
                        "logo": provider.logo,
                    },
                    "price": float(price.price),
                    "pickup_location": price.pickup_location or '',
                    "latitude": float(price.latitude) if price. latitude else None,
                    "longitude": float(price.longitude) if price. longitude else None,
                    "fuel_policy": price.fuel_policy,
                    "free_cancellation": price.free_cancellation,
                    "unlimited_mileage": price.unlimited_mileage,
                })
            except Exception as e:
                print(f"[ERROR] Failed to format car {car.id}: {str(e)}")
                continue

        total_pages = (total_count + limit - 1) // limit if total_count > 0 else 0

        print(f"[RESPONSE] Returning {len(response)} cars, total_pages: {total_pages}\n")

        return {
            "page": page,
            "limit": limit,
            "count": total_count,
            "total_pages": total_pages,
            "results": response
        }

    except Exception as e:
        import traceback
        print(f"\n[ERROR] Exception occurred:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.get("/{car_id}")
async def get_car_by_id(car_id: int, db: Session = Depends(get_db)):
    """Get a specific car by ID with all its details"""
    try:
        result = (
            db.query(Car, CarPrice, Agency, Provider)
            .join(CarPrice, Car.id == CarPrice.car_id)
            .join(Agency, Agency.id == CarPrice. agency_id)
            .join(Provider, Provider.id == CarPrice.provider_id)
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