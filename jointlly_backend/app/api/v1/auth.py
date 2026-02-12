"""
Authentication router
"""
from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.auth import (
    UserRegister,
    UserLogin,
    Token,
    TokenRefresh,
    UserResponse
)
from app.services.auth_service import AuthService
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserRegister,
    db: AsyncSession = Depends(get_db)
):
    """Register a new user and return tokens"""
    user = await AuthService.register_user(
        db,
        user_data.email,
        user_data.password,
        user_data.name,
        user_data.role
    )
    tokens = AuthService.create_tokens(user)
    return tokens


@router.post("/login", response_model=Token)
async def login(
    username: str = Form(...),
    password: str = Form(...),
    db: AsyncSession = Depends(get_db)
):
    """Login and get JWT tokens (OAuth2 compatible with form data)"""
    user = await AuthService.authenticate_user(
        db,
        username,  # username field contains the email
        password
    )
    tokens = AuthService.create_tokens(user)
    return tokens


@router.post("/refresh", response_model=Token)
async def refresh_token(
    refresh_data: TokenRefresh,
    db: AsyncSession = Depends(get_db)
):
    """Refresh access token"""
    from app.utils.jwt import decode_token
    from app.exceptions import UnauthorizedError
    
    try:
        payload = decode_token(refresh_data.refresh_token)
        if payload.get("type") != "refresh":
            raise UnauthorizedError("Invalid refresh token")
        
        user_id = payload.get("sub")
        user = await AuthService.get_user_by_id(db, user_id)
        tokens = AuthService.create_tokens(user)
        return tokens
    except Exception:
        raise UnauthorizedError("Invalid or expired refresh token")


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    """Get current user information"""
    return current_user
