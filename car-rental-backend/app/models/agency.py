from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Agency(Base):
    __tablename__ = "agencies"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    code = Column(String)
    logo = Column(String)
    rating = Column(Float)