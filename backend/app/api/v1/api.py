# In: backend/app/api/v1/api.py

from fastapi import APIRouter
from app.api.v1.endpoints import auth, shoutouts, analytics, users  # <-- 1. Import users

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(shoutouts.router, prefix="/shoutouts", tags=["shoutouts"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(users.router, prefix="/users", tags=["users"])  # <-- 2. Add this line