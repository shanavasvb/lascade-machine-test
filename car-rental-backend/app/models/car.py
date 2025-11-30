from sqlalchemy import Column, Integer, String
from app.database import Base

class Car(Base):
    __tablename__ = "cars"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    category = Column(String)
    type = Column(String)
    fuel = Column(String)
    transmission = Column(String)
    passengers = Column(Integer)
    bags = Column(Integer)
    sipp = Column(String)
    image = Column(String)