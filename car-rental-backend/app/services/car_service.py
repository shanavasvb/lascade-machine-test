from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.models.car import Car
from app.models.price import CarPrice
from app.models.agency import Agency
from app.models.provider import Provider

def get_cars(
    db: Session,
    page: int,
    limit: int,
    min_price: float,
    max_price: float,
    car_type: str,
    fuel_type: str,
    agency: str,
):
    query = (
        db.query(CarPrice, Car, Agency, Provider)
        .join(Car, CarPrice.car_id == Car.id)
        .join(Agency, CarPrice.agency_id == Agency.id)
        .join(Provider, CarPrice.provider_id == Provider.id)
    )

    # apply filters
    if min_price is not None:
        query = query.filter(CarPrice.price >= min_price)
    if max_price is not None:
        query = query.filter(CarPrice.price <= max_price)
    if car_type:
        query = query.filter(Car.type.ilike(f"%{car_type}%"))
    if fuel_type:
        query = query.filter(Car.fuel.ilike(f"%{fuel_type}%"))
    if agency:
        query = query.filter(Agency.name.ilike(f"%{agency}%"))

    total = query.count()

    # pagination
    cars = query.offset((page - 1) * limit).limit(limit).all()

    return cars, total
