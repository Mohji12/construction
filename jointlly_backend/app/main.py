"""
FastAPI application entry point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.database import init_db, close_db
from app.exceptions import (
    AppException,
    app_exception_handler,
    validation_exception_handler,
    general_exception_handler,
    integrity_error_handler
)
from sqlalchemy.exc import IntegrityError
from fastapi.exceptions import RequestValidationError

# Import routers
from app.api.v1 import auth, landowners, professionals, projects, matching, payments


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    # await init_db()  # Use Alembic migrations instead
    yield
    # Shutdown
    await close_db()


# Create FastAPI app
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Real Estate Collaboration Platform Backend API",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handlers
app.add_exception_handler(AppException, app_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(IntegrityError, integrity_error_handler)
app.add_exception_handler(Exception, general_exception_handler)

# Include routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(landowners.router, prefix="/api/v1")
app.include_router(professionals.router, prefix="/api/v1")
app.include_router(projects.router, prefix="/api/v1")
app.include_router(matching.router, prefix="/api/v1")
app.include_router(payments.router, prefix="/api/v1")


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Jointly Real Estate Platform API",
        "version": settings.app_version,
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


# Store settings in app state for exception handlers
app.state.settings = settings
