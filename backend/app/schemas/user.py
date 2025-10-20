# In: backend/app/schemas/user.py

from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional

# Base properties shared by all User schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    department: Optional[str] = None

# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str

# Properties to return via API (e.g., in a "user out" response)
# Notice it doesn't include the password
class UserOut(UserBase):
    id: int
    is_active: bool = True
    is_superuser: bool = False
    
    model_config = ConfigDict(from_attributes=True)

# Properties stored in DB
# This is the main schema we'll use for relationships
class User(UserOut):
    pass  # Inherits all fields from UserOut