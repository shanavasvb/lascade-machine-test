from sqlalchemy import Column, Integer, Float, Boolean, String, ForeignKey
from app.database import Base

class CarPrice(Base):
    __tablename__ = "car_prices"
    
    id = Column(Integer, primary_key=True, index=True)
    car_id = Column(Integer)
    agency_id = Column(Integer)
    provider_id = Column(Integer)
    price = Column(Float)
    free_cancellation = Column(Boolean, default=False)
    unlimited_mileage = Column(Boolean, default=False)
    fuel_policy = Column(String)
    pickup_location = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)