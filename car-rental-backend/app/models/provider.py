from sqlalchemy import Column, Integer, String
from app.database import Base

class Provider(Base):
    __tablename__ = "providers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    logo = Column(String)
