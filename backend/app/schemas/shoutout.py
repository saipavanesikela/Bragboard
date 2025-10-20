# In: backend/app/schemas/shoutout.py

from pydantic import BaseModel, ConfigDict
from typing import List, Optional, Dict
from datetime import datetime
from .user import User  # Import the User schema for relationships

class ShoutoutBase(BaseModel):
    message: str

class ShoutoutCreate(ShoutoutBase):
    recipient_ids: List[int]

class Shoutout(ShoutoutBase):
    id: int
    sender_id: int
    created_at: datetime
    
    # These are the relationships we want to show in the API response
    sender: User
    recipients: List[User]

    # Placeholder for reaction and comment counts to match your frontend
    # You will need to populate these in your CRUD function
    reactions: Dict[str, int] = {'like': 0, 'clap': 0, 'star': 0}
    comment_count: int = 0

    model_config = ConfigDict(from_attributes=True)