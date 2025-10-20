from sqlalchemy.orm import Session, joinedload
from app import models, schemas
from typing import List

def create_shoutout(db: Session, shoutout: schemas.ShoutoutCreate, sender_id: int) -> models.Shoutout:
    """
    Creates a new shoutout in the database.
    """
    # Create the main shoutout object
    db_shoutout = models.Shoutout(
        message=shoutout.message,
        sender_id=sender_id
    )
    
    # Find the recipient user objects from the database
    recipients = db.query(models.User).filter(models.User.id.in_(shoutout.recipient_ids)).all()
    if not recipients:
        # Handle case where no valid recipients were found
        return None

    # Associate the recipients with the shoutout
    db_shoutout.recipients.extend(recipients)
    
    db.add(db_shoutout)
    db.commit()
    db.refresh(db_shoutout)
    return db_shoutout

def get_shoutouts(db: Session, skip: int = 0, limit: int = 100) -> List[models.Shoutout]:
    """
    Retrieves a list of shoutouts with sender and recipient data pre-loaded.
    """
    return (
        db.query(models.Shoutout)
        .options(
            joinedload(models.Shoutout.sender),
            joinedload(models.Shoutout.recipients)
        )
        .order_by(models.Shoutout.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
