from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    role: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None

class QuarryBase(BaseModel):
    slug: str
    name_uz: str
    name_ru: Optional[str] = None
    name_en: Optional[str] = None
    type: Optional[str] = None
    colors: Optional[List[str]] = None
    location: Optional[str] = None
    region: Optional[str] = None
    reserves: Optional[float] = None
    density: Optional[float] = None
    description_uz: Optional[str] = None
    images: Optional[List[str]] = None

class QuarryResponse(QuarryBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    slug: str
    name_uz: str
    name_ru: Optional[str] = None
    name_en: Optional[str] = None
    category: Optional[str] = None
    quarry_id: Optional[int] = None
    colors: Optional[List[str]] = None
    dimensions: Optional[str] = None
    thickness: Optional[float] = None
    finish_type: Optional[str] = None
    price_per_unit: Optional[float] = None
    unit: Optional[str] = None
    description_uz: Optional[str] = None
    images: Optional[List[str]] = None

class ProductResponse(ProductBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class WorkshopResponse(BaseModel):
    id: int
    name: str
    type: Optional[str] = None
    annual_capacity: Optional[float] = None
    description: Optional[str] = None
    equipment: Optional[List[str]] = None
    is_active: bool
    
    class Config:
        from_attributes = True

class InvestmentBase(BaseModel):
    slug: str
    name_uz: str
    name_ru: Optional[str] = None
    min_amount: Optional[float] = None
    expected_roi: Optional[float] = None
    payback_years: Optional[float] = None
    description_uz: Optional[str] = None
    requirements: Optional[str] = None

class InvestmentResponse(InvestmentBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class InvestmentCalculate(BaseModel):
    amount: float
    project_type: str
    period: int = 5

class ChatMessageRequest(BaseModel):
    message: str

class ChatMessageResponse(BaseModel):
    response: str