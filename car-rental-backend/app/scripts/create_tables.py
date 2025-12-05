# app/scripts/create_tables.py

from app.database import Base, engine
from app.models.car import Car
from app.models.agency import Agency
from app.models.provider import Provider
from app.models.price import CarPrice


def create_tables():
    """
    Create all database tables on the current engine.
    Call this only when you actually want to create tables.
    """
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created!")
