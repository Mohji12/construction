"""
Matching schemas
"""
from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, ConfigDict
from app.utils.constants import MatchStatus


class MatchScoreResponse(BaseModel):
    id: UUID
    match_id: UUID
    project_type_score: Optional[float]
    location_score: Optional[float]
    project_size_score: Optional[float]
    pricing_score: Optional[float]
    capability_score: Optional[float]
    verification_score: Optional[float]
    total_score: float
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True, strict=True)


class MatchResponse(BaseModel):
    id: UUID
    project_id: UUID
    professional_id: UUID
    match_score: float
    status: MatchStatus
    created_at: datetime
    updated_at: datetime
    match_score_details: Optional[MatchScoreResponse] = None
    
    model_config = ConfigDict(from_attributes=True, strict=True)
