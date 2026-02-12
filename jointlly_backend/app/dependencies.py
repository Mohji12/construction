"""
FastAPI dependencies for authentication and database
"""
from typing import Optional
from uuid import UUID
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.user import User
from app.utils.constants import Role
from app.utils.jwt import decode_token
from app.exceptions import UnauthorizedError, ForbiddenError

security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    """
    Get current authenticated user from JWT token
    """
    token = credentials.credentials
    
    try:
        payload = decode_token(token)
        user_id: str = payload.get("sub")
        if user_id is None:
            raise UnauthorizedError("Invalid token")
    except Exception:
        raise UnauthorizedError("Invalid or expired token")
    
    # Get user from database
    result = await db.execute(select(User).where(User.id == UUID(user_id)))
    user = result.scalar_one_or_none()
    
    if user is None:
        raise UnauthorizedError("User not found")
    
    return user


def require_role(*allowed_roles: Role):
    """
    Dependency factory for role-based access control
    """
    async def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in allowed_roles:
            raise ForbiddenError(
                f"Access denied. Required roles: {', '.join(r.value for r in allowed_roles)}"
            )
        return current_user
    
    return role_checker


# Common role dependencies
require_landowner = require_role(Role.LANDOWNER)
require_professional = require_role(Role.PROFESSIONAL)
require_admin = require_role(Role.ADMIN)
require_authenticated = get_current_user
