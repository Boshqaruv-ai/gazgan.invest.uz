from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import Investment, SavedInvestment
from app.schemas import InvestmentResponse, InvestmentCalculate
from app.routers.auth import get_current_user
from app.models import User

router = APIRouter()

ROI_DATA = {
    "granite-processing": {"roi": 0.25, "payback_years": 4},
    "marble-processing": {"roi": 0.22, "payback_years": 5},
    "quarry-development": {"roi": 0.30, "payback_years": 3},
    "souvenir-factory": {"roi": 0.30, "payback_years": 3},
    "export-line": {"roi": 0.18, "payback_years": 6},
}

ROI_MAP = {
    "granite-processing": "Granit qayta ishlash",
    "marble-processing": "Marmar qayta ishlash",
    "quarry-development": "Kon ochish",
    "souvenir-factory": "Suvenir ishlab chiqarish",
}

@router.get("", response_model=List[InvestmentResponse])
async def get_investments(db: Session = Depends(get_db)):
    return db.query(Investment).filter(Investment.is_active == True).all()

@router.get("/{slug}", response_model=InvestmentResponse)
async def get_investment(slug: str, db: Session = Depends(get_db)):
    investment = db.query(Investment).filter(Investment.slug == slug).first()
    if not investment:
        raise HTTPException(status_code=404, detail="Investment not found")
    return investment

@router.post("/calculate")
async def calculate_investment(data: InvestmentCalculate):
    project = ROI_DATA.get(data.project_type, ROI_DATA["marble-processing"])
    period = data.period or project["payback_years"]
    annual_return = data.amount * project["roi"]
    total_return = annual_return * period
    
    optimistic_roi = project["roi"] + 0.07
    pessimistic_roi = max(project["roi"] - 0.07, 0.05)
    
    return {
        "invested_amount": data.amount,
        "project_name": ROI_MAP.get(data.project_type, data.project_type),
        "period": period,
        "annual_return_percent": project["roi"] * 100,
        "annual_return_amount": annual_return,
        "payback_years": project["payback_years"],
        "total_return": total_return,
        "scenarios": {
            "optimistic": {
                "roi": optimistic_roi * 100,
                "annual_return": data.amount * optimistic_roi,
                "total_return": data.amount * optimistic_roi * period
            },
            "realistic": {
                "roi": project["roi"] * 100,
                "annual_return": annual_return,
                "total_return": total_return
            },
            "pessimistic": {
                "roi": pessimistic_roi * 100,
                "annual_return": data.amount * pessimistic_roi,
                "total_return": data.amount * pessimistic_roi * period
            }
        }
    }

@router.get("/dashboard/saved")
async def get_saved_investments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    saved = db.query(SavedInvestment).filter(
        SavedInvestment.user_id == current_user.id
    ).all()
    return saved

@router.post("/dashboard/save/{investment_id}")
async def save_investment(
    investment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing = db.query(SavedInvestment).filter(
        SavedInvestment.user_id == current_user.id,
        SavedInvestment.investment_id == investment_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Already saved")
    
    saved = SavedInvestment(
        user_id=current_user.id,
        investment_id=investment_id
    )
    db.add(saved)
    db.commit()
    return {"success": True}

@router.delete("/dashboard/save/{investment_id}")
async def remove_saved_investment(
    investment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    saved = db.query(SavedInvestment).filter(
        SavedInvestment.user_id == current_user.id,
        SavedInvestment.investment_id == investment_id
    ).first()
    
    if not saved:
        raise HTTPException(status_code=404, detail="Not found")
    
    db.delete(saved)
    db.commit()
    return {"success": True}