# In: backend/app/core/security.py
# (REPLACE the entire file with this)

from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from jose import JWTError, jwt
from app.core.config import settings

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def _truncate_password_to_bytes(password: str) -> bytes:
    """
    Encodes password to bytes and truncates at 72 bytes (bcrypt limit).
    This is the format passlib's hash/verify functions expect.
    """
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        return password_bytes[:72]
    return password_bytes

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies a plain password against a hash, applying 72-byte
    truncation.
    """
    truncated_password_bytes = _truncate_password_to_bytes(plain_password)
    try:
        # Pass bytes directly to verify
        return pwd_context.verify(truncated_password_bytes, hashed_password)
    except Exception:
        # Catch any errors during verification (e.g., hash mismatch)
        return False

def get_password_hash(password: str) -> str:
    """
    Hashes a password, applying 72-byte truncation.
    """
    truncated_password_bytes = _truncate_password_to_bytes(password)
    # Pass bytes directly to hash
    return pwd_context.hash(truncated_password_bytes)

# JWT Token Creation
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt