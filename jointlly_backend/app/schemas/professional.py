"""
Professional schemas
"""
from datetime import datetime, date
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict
from app.utils.constants import CapabilityType, ProjectType


class ProfessionalProfileCreate(BaseModel):
    company_name: str = Field(..., min_length=1, max_length=255)
    phone: Optional[str] = Field(None, max_length=20)
    city: Optional[str] = Field(None, max_length=100)
    experience_years: Optional[int] = Field(None, ge=0)
    rera_experience: bool = False
    wallet_size: Optional[float] = Field(None, ge=0)
    preferred_jv_model: Optional[str] = Field(None, max_length=255)
    location_preferences: Optional[List[str]] = None
    workforce_capacity: Optional[int] = Field(None, ge=0)
    
    model_config = ConfigDict(strict=True)


class ProfessionalProfileResponse(BaseModel):
    id: UUID
    user_id: UUID
    company_name: str
    phone: Optional[str]
    city: Optional[str]
    experience_years: Optional[int]
    rera_experience: bool
    wallet_size: Optional[float]
    preferred_jv_model: Optional[str]
    location_preferences: Optional[List[str]]
    workforce_capacity: Optional[int]
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True, strict=True)


class CapabilityCreate(BaseModel):
    capability_type: CapabilityType
    description: Optional[str] = None
    
    model_config = ConfigDict(strict=True)


class CapabilityResponse(BaseModel):
    id: UUID
    professional_id: UUID
    capability_type: CapabilityType
    description: Optional[str]
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True, strict=True)


class LicenseCreate(BaseModel):
    license_number: str = Field(..., min_length=1, max_length=255)
    issuing_authority: Optional[str] = Field(None, max_length=255)
    expiry_date: Optional[date] = None
    document_url: Optional[str] = Field(None, max_length=500)
    
    model_config = ConfigDict(strict=True)


class LicenseResponse(BaseModel):
    id: UUID
    professional_id: UUID
    license_number: str
    issuing_authority: Optional[str]
    expiry_date: Optional[date]
    document_url: Optional[str]
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True, strict=True)


class PortfolioCreate(BaseModel):
    project_name: str = Field(..., min_length=1, max_length=255)
    project_type: Optional[ProjectType] = None
    location: Optional[str] = Field(None, max_length=255)
    area_sqft: Optional[float] = Field(None, gt=0)
    completion_date: Optional[date] = None
    images: Optional[List[str]] = None
    description: Optional[str] = None
    
    model_config = ConfigDict(strict=True)


class PortfolioResponse(BaseModel):
    id: UUID
    professional_id: UUID
    project_name: str
    project_type: Optional[ProjectType]
    location: Optional[str]
    area_sqft: Optional[float]
    completion_date: Optional[date]
    images: Optional[List[str]]
    description: Optional[str]
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True, strict=True)


class PricingTierCreate(BaseModel):
    capability_type: CapabilityType
    price_per_sqft: float = Field(..., gt=0)
    min_area_sqft: Optional[float] = Field(None, gt=0)
    max_area_sqft: Optional[float] = Field(None, gt=0)
    tier_name: Optional[str] = Field(None, max_length=100)
    
    model_config = ConfigDict(strict=True)


class PricingTierResponse(BaseModel):
    id: UUID
    professional_id: UUID
    capability_type: CapabilityType
    min_area_sqft: Optional[float]
    max_area_sqft: Optional[float]
    price_per_sqft: float
    tier_name: Optional[str]
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True, strict=True)
