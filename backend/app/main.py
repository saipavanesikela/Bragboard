# In: backend/app/main.py
# (REPLACE the entire file)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.base import Base
from app.db.session import engine
from app.api.v1.api import api_router

# --- ADD THIS IMPORT ---
# This line is crucial. It imports app/models/__init__.py,
# which in turn imports your User and Shoutout models.
# This "registers" them with the 'Base' so create_all() knows about them.
from app import models
# ---------------------

# This creates your database tables if they don't exist
Base.metadata.create_all(bind=engine)

# This is the main application object Uvicorn is looking for
app = FastAPI(title="BragBoard API")

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your API router
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the BragBoard API"}