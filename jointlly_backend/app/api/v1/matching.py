"""
Matching router
"""
from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.dependencies import require_authenticated
from app.models.user import User
from app.schemas.matching import MatchResponse
from app.services.matching_service import MatchingService

router = APIRouter(prefix="/matching", tags=["Matching"])


@router.get("/projects/{project_id}/matches", response_model=List[MatchResponse])
async def get_project_matches(
    project_id: UUID,
    limit: int = 10,
    current_user: User = Depends(require_authenticated),
    db: AsyncSession = Depends(get_db)
):
    """Get matched professionals for a project"""
    matches = await MatchingService.get_project_matches(db, project_id, limit)
    return matches


@router.get("/professionals/{professional_id}/projects", response_model=List[MatchResponse])
async def get_professional_matches(
    professional_id: UUID,
    limit: int = 10,
    current_user: User = Depends(require_authenticated),
    db: AsyncSession = Depends(get_db)
):
    """Get matched projects for a professional"""
    matches = await MatchingService.get_professional_matches(db, professional_id, limit)
    return matches


@router.post("/matches/{match_id}/accept", response_model=MatchResponse)
async def accept_match(
    match_id: UUID,
    current_user: User = Depends(require_authenticated),
    db: AsyncSession = Depends(get_db)
):
    """Accept a match"""
    match = await MatchingService.accept_match(db, match_id)
    return match


@router.post("/matches/{match_id}/reject", response_model=MatchResponse)
async def reject_match(
    match_id: UUID,
    current_user: User = Depends(require_authenticated),
    db: AsyncSession = Depends(get_db)
):
    """Reject a match"""
    match = await MatchingService.reject_match(db, match_id)
    return match
