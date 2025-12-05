from app.database import Base, engine
from app.models.car import Car
from app.models.agency import Agency
from app.models.provider import Provider
from app.models.price import CarPrice

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created!")
