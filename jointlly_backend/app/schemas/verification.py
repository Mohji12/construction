"""
Verification schemas
"""
from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict
from app.utils.constants import VerificationStatus


class FARCalculationRequest(BaseModel):
    road_width_ft: float = Field(..., gt=0)
    zone_type: Optional[str] = Field(None, max_length=100)
    
    model_config = ConfigDict(strict=True)


class FARCalculationResponse(BaseModel):
    id: UUID
    property_id: UUID
    road_width_ft: float
    zone_type: Optional[str]
    calculated_far: float
    total_buildable_area: float
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True, strict=True)


class FeasibilityReportResponse(BaseModel):
    id: UUID
    property_id: UUID
    plot_category: Optional[str]
    front_setback_m: Optional[float]
    rear_setback_m: Optional[float]
    side_setback_m: Optional[float]
    net_buildable_area_sqft: Optional[float]
    allowed_floors: Optional[int]
    total_built_up_area_sqft: Optional[float]
    saleable_area_sqft: Optional[float]
    number_of_units: Optional[int]
    is_unlocked: bool
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True, strict=True)


class PIDVerificationRequest(BaseModel):
    pid_number: str = Field(..., min_length=1, max_length=100)
    
    model_config = ConfigDict(strict=True)


class PIDVerificationResponse(BaseModel):
    id: UUID
    property_id: UUID
    pid_number: str
    owner_name: Optional[str]
    location_details: Optional[dict]
    tax_history: Optional[dict]
    e_khatha_status: Optional[str]
    verification_status: VerificationStatus
    verification_fee: Optional[float]
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True, strict=True)
