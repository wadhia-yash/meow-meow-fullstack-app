from sqlalchemy import create_engine, Column, Integer, String, MetaData, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://avnadmin:AVNS__stQULz4kfKc7jvcdtT@pg-assignment-assignment-db.g.aivencloud.com:27907/defaultdb?sslmode=require"

engine = create_engine(DATABASE_URL)
metadata = MetaData()

documents = Table(
    "documents",
    metadata,
    Column("type", String, nullable=False),
    Column("title", String, nullable=False),
    Column("position", Integer, nullable=False)
)

base = declarative_base()
SessionLocal = sessionmaker(autoflush=False, bind=engine)