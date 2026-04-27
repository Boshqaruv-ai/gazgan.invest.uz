from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import Quarry
from app.schemas import QuarryResponse
from app.routers.auth import get_current_user
from app.models import User

router = APIRouter()

@router.get("", response_model=List[QuarryResponse])
async def get_quarries(
    type: Optional[str] = None,
    region: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Quarry).filter(Quarry.is_active == True)
    if type:
        query = query.filter(Quarry.type == type)
    if region:
        query = query.filter(Quarry.region == region)
    return query.all()

@router.get("/{slug}", response_model=QuarryResponse)
async def get_quarry(slug: str, db: Session = Depends(get_db)):
    quarry = db.query(Quarry).filter(Quarry.slug == slug).first()
    if not quarry:
        raise HTTPException(status_code=404, detail="Quarry not found")
    return quarry