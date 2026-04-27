from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routers import auth, quarries, products, investments, chat

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="G'ozg'an Investitsion Portali API",
    description="API for G'ozg'on marble and granite investment portal",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(quarries.router, prefix="/api/quarries", tags=["quarries"])
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(investments.router, prefix="/api/investments", tags=["investments"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])

@app.get("/")
async def root():
    return {"message": "G'ozg'an Investitsion Portali API", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}