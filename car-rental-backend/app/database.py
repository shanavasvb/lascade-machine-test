import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Force load using absolute path
ENV_PATH = "/home/shanavas/Documents/Lascade-Machine-test/car-rental-backend/.env"
load_dotenv(ENV_PATH)

DATABASE_URL = os.getenv("DATABASE_URL")
print("Loaded DATABASE_URL =", DATABASE_URL)  # DEBUG LINE

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
