from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(255))
    phone = Column(String(50))
    role = Column(String(50), default="investor")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Quarry(Base):
    __tablename__ = "quarries"
    
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    name_uz = Column(String(255), nullable=False)
    name_ru = Column(String(255))
    name_en = Column(String(255))
    type = Column(String(50))
    colors = Column(ARRAY(String))
    location = Column(String(255))
    region = Column(String(255))
    reserves = Column(Float)
    density = Column(Float)
    description_uz = Column(Text)
    description_ru = Column(Text)
    description_en = Column(Text)
    images = Column(ARRAY(String))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    name_uz = Column(String(255), nullable=False)
    name_ru = Column(String(255))
    name_en = Column(String(255))
    category = Column(String(50))
    quarry_id = Column(Integer, ForeignKey("quarries.id"))
    colors = Column(ARRAY(String))
    dimensions = Column(String(100))
    thickness = Column(Float)
    finish_type = Column(String(50))
    price_per_unit = Column(Float)
    unit = Column(String(50))
    description_uz = Column(Text)
    images = Column(ARRAY(String))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Workshop(Base):
    __tablename__ = "workshops"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    type = Column(String(50))
    annual_capacity = Column(Float)
    description = Column(Text)
    equipment = Column(ARRAY(String))
    is_active = Column(Boolean, default=True)

class Investment(Base):
    __tablename__ = "investments"
    
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    name_uz = Column(String(255), nullable=False)
    name_ru = Column(String(255))
    min_amount = Column(Float)
    expected_roi = Column(Float)
    payback_years = Column(Float)
    description_uz = Column(Text)
    requirements = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class SavedInvestment(Base):
    __tablename__ = "saved_investments"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    investment_id = Column(Integer, ForeignKey("investments.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    role = Column(String(20))
    content = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())