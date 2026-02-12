"""
Authentication schemas
"""
from datetime import datetime
from typing import Optional, Union
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field, ConfigDict, field_validator
from app.utils.constants import Role


class UserRegister(BaseModel):
    """User registration schema"""
    email: EmailStr
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters")
    name: str = Field(..., min_length=1, description="User's full name")
    role: Union[Role, str]
    
    @field_validator('role', mode='before')
    @classmethod
    def validate_role(cls, v):
        """Convert string to Role enum"""
        if isinstance(v, str):
            try:
                return Role(v)
            except ValueError:
                raise ValueError(f"Invalid role: {v}. Must be one of: {', '.join([r.value for r in Role])}")
        return v
    
    model_config = ConfigDict(use_enum_values=False)


class UserLogin(BaseModel):
    """User login schema"""
    email: EmailStr
    password: str
    
    model_config = ConfigDict(strict=True)


class UserResponse(BaseModel):
    """User response schema"""
    id: UUID
    email: str
    name: str
    role: Role
    is_active: bool
    created_at: datetime
    
    model_config = ConfigDict(
        from_attributes=True,
        strict=True
    )


class Token(BaseModel):
    """Token response schema"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse
    
    model_config = ConfigDict(strict=True)


class TokenRefresh(BaseModel):
    """Token refresh schema"""
    refresh_token: str
    
    model_config = ConfigDict(strict=True)
