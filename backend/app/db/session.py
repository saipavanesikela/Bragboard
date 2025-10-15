from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# --- IMPORTANT ---
# Replace the placeholder values below with your actual PostgreSQL connection details.
# Format: "postgresql://USERNAME:PASSWORD@HOST/DATABASE_NAME"
# The format is "postgresql://USERNAME:PASSWORD@HOST/DATABASE_NAME"
DATABASE_URL = "postgresql://postgres:saipavan@localhost/bragboard"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency function to get a DB session for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()