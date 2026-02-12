"""
Project management router (FAR, Feasibility, PID)
"""
from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.dependencies import require_landowner, require_authenticated
from app.models.user import User
from app.schemas.verification import (
    FARCalculationRequest,
    FARCalculationResponse,
    FeasibilityReportResponse,
    PIDVerificationRequest,
    PIDVerificationResponse
)
from app.services.far_service import FARService
from app.services.feasibility_service import FeasibilityService
from app.services.landowner_service import LandownerService

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.post("/{project_id}/calculate-far", response_model=FARCalculationResponse, status_code=status.HTTP_201_CREATED)
async def calculate_far(
    project_id: UUID,
    far_data: FARCalculationRequest,
    current_user: User = Depends(require_landowner),
    db: AsyncSession = Depends(get_db)
):
    """Calculate FAR for a project (free)"""
    # Verify project ownership
    profile = await LandownerService.get_profile(db, current_user.id)
    project = await LandownerService.get_project(db, project_id, profile.id)
    
    # Create FAR calculation
    far_calculation = await FARService.create_far_calculation(
        db,
        str(project.property_id),
        far_data.road_width_ft,
        far_data.zone_type
    )
    return far_calculation


@router.get("/{project_id}/far", response_model=FARCalculationResponse)
async def get_far_calculation(
    project_id: UUID,
    current_user: User = Depends(require_authenticated),
    db: AsyncSession = Depends(get_db)
):
    """Get FAR calculation for a project"""
    project = await LandownerService.get_project(db, project_id)
    far_calculation = await FARService.get_far_calculation(db, str(project.property_id))
    
    if not far_calculation:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="FAR calculation not found")
    
    return far_calculation


@router.post("/{project_id}/feasibility", response_model=FeasibilityReportResponse, status_code=status.HTTP_201_CREATED)
async def generate_feasibility_report(
    project_id: UUID,
    current_user: User = Depends(require_landowner),
    db: AsyncSession = Depends(get_db)
):
    """Generate feasibility report (basic metrics free, detailed requires payment)"""
    # Verify project ownership
    profile = await LandownerService.get_profile(db, current_user.id)
    project = await LandownerService.get_project(db, project_id, profile.id)
    
    # Get FAR calculation for total buildable area
    far_calc = await FARService.get_far_calculation(db, str(project.property_id))
    if not far_calc:
        from fastapi import HTTPException
        raise HTTPException(status_code=400, detail="FAR calculation required first")
    
    # Create feasibility report (unlocked=False by default)
    feasibility_report = await FeasibilityService.create_feasibility_report(
        db,
        str(project.property_id),
        far_calc.total_buildable_area,
        is_unlocked=False
    )
    return feasibility_report


@router.get("/{project_id}/feasibility", response_model=FeasibilityReportResponse)
async def get_feasibility_report(
    project_id: UUID,
    current_user: User = Depends(require_authenticated),
    db: AsyncSession = Depends(get_db)
):
    """Get feasibility report (unlock if paid)"""
    project = await LandownerService.get_project(db, project_id)
    feasibility_report = await FeasibilityService.get_feasibility_report(
        db,
        str(project.property_id)
    )
    
    if not feasibility_report:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Feasibility report not found")
    
    # Check if user has paid for unlock
    if not feasibility_report.is_unlocked:
        # Check for successful payment
        from app.models.payment import Transaction
        from app.utils.constants import TransactionType, TransactionStatus
        from sqlalchemy import select
        
        result = await db.execute(
            select(Transaction)
            .where(Transaction.project_id == project_id)
            .where(Transaction.transaction_type == TransactionType.FEASIBILITY_UNLOCK)
            .where(Transaction.status == TransactionStatus.SUCCESS)
            .where(Transaction.user_id == current_user.id)
        )
        transaction = result.scalar_one_or_none()
        
        if transaction:
            # Unlock the report
            feasibility_report = await FeasibilityService.unlock_feasibility_report(
                db,
                str(project.property_id)
            )
    
    return feasibility_report


@router.post("/{project_id}/verify-pid", response_model=PIDVerificationResponse, status_code=status.HTTP_201_CREATED)
async def verify_pid(
    project_id: UUID,
    pid_data: PIDVerificationRequest,
    current_user: User = Depends(require_landowner),
    db: AsyncSession = Depends(get_db)
):
    """Request PID verification"""
    # Verify project ownership
    profile = await LandownerService.get_profile(db, current_user.id)
    project = await LandownerService.get_project(db, project_id, profile.id)
    
    # Create PID verification request
    from app.models.verification import PIDVerification
    from app.utils.constants import VerificationStatus
    from app.utils.constants import PID_VERIFICATION_FEE_MIN
    
    pid_verification = PIDVerification(
        property_id=project.property_id,
        pid_number=pid_data.pid_number,
        verification_status=VerificationStatus.PENDING,
        verification_fee=PID_VERIFICATION_FEE_MIN
    )
    
    db.add(pid_verification)
    await db.commit()
    await db.refresh(pid_verification)
    
    # TODO: Integrate with actual PID verification API (BBMPTAX.KARNATAKA.GOV.IN)
    # For now, this is a placeholder
    
    return pid_verification
