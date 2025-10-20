# In: backend/app/api/v1/endpoints/users.py

from fastapi import APIRouter, Depends
from app import models, schemas
from app.api import deps

router = APIRouter()

@router.get("/me", response_model=schemas.UserOut)
def read_users_me(
    current_user: models.User = Depends(deps.get_current_user)
):
    return current_user