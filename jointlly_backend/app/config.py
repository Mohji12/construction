"""
Application configuration using Pydantic Settings
"""
from typing import List, Optional
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
        env_ignore_empty=True
    )
    
    # Database
    database_url: str = Field(
        ...,
        description="Database URL (MySQL with aiomysql or PostgreSQL with asyncpg driver)"
    )
    
    # JWT
    jwt_secret_key: str = Field(
        ...,
        min_length=32,
        description="Secret key for JWT token signing"
    )
    jwt_algorithm: str = Field(default="HS256", description="JWT algorithm")
    jwt_access_token_expire_minutes: int = Field(
        default=30,
        description="Access token expiration in minutes"
    )
    jwt_refresh_token_expire_days: int = Field(
        default=7,
        description="Refresh token expiration in days"
    )
    
    # Razorpay
    razorpay_key_id: str = Field(..., description="Razorpay Key ID")
    razorpay_key_secret: str = Field(..., description="Razorpay Key Secret")
    
    # Application
    app_name: str = Field(default="Jointly Real Estate Platform")
    app_version: str = Field(default="1.0.0")
    debug: bool = Field(default=False, description="Debug mode")
    environment: str = Field(default="production", description="Environment")
    
    # Ignore CORS_ORIGINS if present in environment (not used, handled in main.py)
    cors_origins: Optional[str] = Field(default=None, description="Ignored - CORS handled in main.py")
    
    @field_validator("cors_origins", mode="before")
    @classmethod
    def ignore_cors_origins(cls, v):
        """Ignore CORS_ORIGINS value - always return None"""
        return None
    
    # Server
    host: str = Field(default="0.0.0.0", description="Server host")
    port: int = Field(default=8000, description="Server port")
    
    @property
    def database_url_sync(self) -> str:
        """Get synchronous database URL for Alembic"""
        # Remove async drivers (aiomysql for MySQL, asyncpg for PostgreSQL)
        url = self.database_url.replace("+aiomysql", "").replace("+asyncpg", "")
        return url


# Global settings instance
settings = Settings()
