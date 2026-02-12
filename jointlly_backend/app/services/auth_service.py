"""
Authentication service
"""
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User
from app.utils.constants import Role
from app.utils.password import verify_password, get_password_hash
from app.utils.jwt import create_access_token, create_refresh_token
from app.exceptions import UnauthorizedError, ConflictError, NotFoundError
from datetime import timedelta


class AuthService:
    """Service for authentication operations"""
    
    @staticmethod
    async def register_user(
        db: AsyncSession,
        email: str,
        password: str,
        name: str,
        role: Role
    ) -> User:
        """
        Register a new user
        """
        # Check if user already exists
        result = await db.execute(select(User).where(User.email == email))
        existing_user = result.scalar_one_or_none()
        
        if existing_user:
            raise ConflictError(f"User with email {email} already exists")
        
        # Create new user
        hashed_password = get_password_hash(password)
        user = User(
            email=email,
            name=name,
            hashed_password=hashed_password,
            role=role
        )
        
        db.add(user)
        await db.commit()
        await db.refresh(user)
        
        return user
    
    @staticmethod
    async def authenticate_user(
        db: AsyncSession,
        email: str,
        password: str
    ) -> User:
        """
        Authenticate user and return user object
        """
        result = await db.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()
        
        if not user:
            raise UnauthorizedError("Invalid email or password")
        
        if not verify_password(password, user.hashed_password):
            raise UnauthorizedError("Invalid email or password")
        
        if user.is_active != "true":
            raise UnauthorizedError("User account is inactive")
        
        return user
    
    @staticmethod
    def create_tokens(user: User) -> dict:
        """
        Create access and refresh tokens for user
        """
        token_data = {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role.value if hasattr(user.role, 'value') else str(user.role)
        }
        
        access_token = create_access_token(token_data)
        refresh_token = create_refresh_token(token_data)
        
        # Import here to avoid circular dependency
        from app.schemas.auth import UserResponse
        
        # Create UserResponse object to ensure proper serialization
        user_response = UserResponse(
            id=user.id,
            email=user.email,
            name=user.name,
            role=user.role,
            is_active=user.is_active == "true",
            created_at=user.created_at
        )
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": user_response
        }
    
    @staticmethod
    async def get_user_by_id(
        db: AsyncSession,
        user_id: UUID
    ) -> User:
        """
        Get user by ID
        """
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        
        if not user:
            raise NotFoundError("User", str(user_id))
        
        return user
