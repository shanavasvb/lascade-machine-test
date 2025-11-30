from pydantic import BaseModel

class CarBase(BaseModel):
    id: int
    name: str
    category: str
    type: str
    fuel: str
    transmission: str
    passengers: int
    bags: int
    sipp: str
    image: str

class CarResponse(BaseModel):
    car: CarBase
    provider: str
    agency: str
    price: float

    class Config:
        from_attributes = True
