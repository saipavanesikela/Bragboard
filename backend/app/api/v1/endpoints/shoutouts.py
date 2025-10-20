from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import crud, models, schemas
from app.db.session import get_db
from app.api import deps

router = APIRouter()

@router.post("/", response_model=schemas.Shoutout)
def create_shoutout(
    shoutout: schemas.ShoutoutCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """
    Create a new shoutout.
    """
    return crud.crud_shoutout.create_shoutout(
        db=db, shoutout=shoutout, sender_id=current_user.id
    )

@router.get("/", response_model=List[schemas.Shoutout])
def read_shoutouts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    # This endpoint is protected, uncomment if you want it public
    # current_user: models.User = Depends(deps.get_current_user), 
):
    """
    Retrieve all shoutouts.
    """
    shoutouts = crud.crud_shoutout.get_shoutouts(db, skip=skip, limit=limit)
    return shoutouts
