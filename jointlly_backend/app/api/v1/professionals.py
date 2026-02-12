"""
Professional router
"""
from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.dependencies import require_professional
from app.models.user import User
from app.schemas.professional import (
    ProfessionalProfileCreate,
    ProfessionalProfileResponse,
    CapabilityCreate,
    CapabilityResponse,
    LicenseCreate,
    LicenseResponse,
    PortfolioCreate,
    PortfolioResponse,
    PricingTierCreate,
    PricingTierResponse
)
from app.schemas.onboarding import (
    OnboardingStatusResponse,
    OnboardingStepResponse
)
from app.services.professional_service import ProfessionalService
from app.services.verification_service import VerificationService
from app.utils.constants import CapabilityType

router = APIRouter(prefix="/professionals", tags=["Professionals"])


@router.post("/profile", response_model=ProfessionalProfileResponse, status_code=status.HTTP_201_CREATED)
async def create_profile(
    profile_data: ProfessionalProfileCreate,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Create professional profile"""
    profile = await ProfessionalService.create_profile(
        db,
        current_user.id,
        **profile_data.model_dump()
    )
    return profile


@router.get("/profile", response_model=ProfessionalProfileResponse)
async def get_profile(
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Get professional profile"""
    profile = await ProfessionalService.get_profile(db, current_user.id)
    return profile


@router.put("/profile", response_model=ProfessionalProfileResponse)
async def update_profile(
    profile_data: ProfessionalProfileCreate,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Update professional profile"""
    profile = await ProfessionalService.update_profile(
        db,
        current_user.id,
        **profile_data.model_dump(exclude_unset=True)
    )
    return profile


@router.post("/capabilities", response_model=CapabilityResponse, status_code=status.HTTP_201_CREATED)
async def add_capability(
    capability_data: CapabilityCreate,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Add capability"""
    profile = await ProfessionalService.get_profile(db, current_user.id)
    capability = await ProfessionalService.add_capability(
        db,
        profile.id,
        capability_data.capability_type,
        capability_data.description
    )
    return capability


@router.get("/capabilities", response_model=List[CapabilityResponse])
async def list_capabilities(
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """List all capabilities"""
    profile = await ProfessionalService.get_profile(db, current_user.id)
    capabilities = await ProfessionalService.list_capabilities(db, profile.id)
    return capabilities


@router.post("/licenses", response_model=LicenseResponse, status_code=status.HTTP_201_CREATED)
async def add_license(
    license_data: LicenseCreate,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Add license"""
    profile = await ProfessionalService.get_profile(db, current_user.id)
    license_obj = await ProfessionalService.add_license(
        db,
        profile.id,
        **license_data.model_dump()
    )
    return license_obj


@router.get("/licenses", response_model=List[LicenseResponse])
async def list_licenses(
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """List all licenses"""
    profile = await ProfessionalService.get_profile(db, current_user.id)
    licenses = await ProfessionalService.list_licenses(db, profile.id)
    return licenses


@router.post("/portfolio", response_model=PortfolioResponse, status_code=status.HTTP_201_CREATED)
async def add_portfolio_item(
    portfolio_data: PortfolioCreate,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Add portfolio item"""
    profile = await ProfessionalService.get_profile(db, current_user.id)
    portfolio = await ProfessionalService.add_portfolio_item(
        db,
        profile.id,
        **portfolio_data.model_dump()
    )
    return portfolio


@router.get("/portfolio", response_model=List[PortfolioResponse])
async def list_portfolio(
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """List all portfolio items"""
    profile = await ProfessionalService.get_profile(db, current_user.id)
    portfolio = await ProfessionalService.list_portfolio(db, profile.id)
    return portfolio


@router.post("/pricing", response_model=PricingTierResponse, status_code=status.HTTP_201_CREATED)
async def add_pricing_tier(
    pricing_data: PricingTierCreate,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Add pricing tier"""
    profile = await ProfessionalService.get_profile(db, current_user.id)
    pricing_tier = await ProfessionalService.add_pricing_tier(
        db,
        profile.id,
        **pricing_data.model_dump()
    )
    return pricing_tier


@router.get("/pricing", response_model=List[PricingTierResponse])
async def list_pricing_tiers(
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """List all pricing tiers"""
    profile = await ProfessionalService.get_profile(db, current_user.id)
    pricing_tiers = await ProfessionalService.list_pricing_tiers(db, profile.id)
    return pricing_tiers


# ==================== Onboarding Endpoints ====================

@router.post("/onboarding/start", response_model=ProfessionalProfileResponse, status_code=status.HTTP_201_CREATED)
async def start_onboarding(
    capability_type: CapabilityType,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Start onboarding for a capability type"""
    profile = await ProfessionalService.start_onboarding(
        db,
        current_user.id,
        capability_type
    )
    return profile


@router.post("/onboarding/{capability_type}/step/{step_number}", response_model=OnboardingStepResponse)
async def complete_onboarding_step(
    capability_type: CapabilityType,
    step_number: int,
    step_data: dict,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Complete a specific onboarding step"""
    profile = await ProfessionalService.get_profile(db, current_user.id)
    result = await ProfessionalService.complete_onboarding_step(
        db,
        current_user.id,
        capability_type,
        step_number,
        step_data
    )
    return result


@router.get("/onboarding/status", response_model=OnboardingStatusResponse)
async def get_onboarding_status(
    capability_type: CapabilityType,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Get onboarding status for a capability type"""
    status_data = await ProfessionalService.get_onboarding_status(
        db,
        current_user.id,
        capability_type
    )
    return status_data


@router.post("/onboarding/{capability_type}/submit", response_model=ProfessionalProfileResponse)
async def submit_onboarding(
    capability_type: CapabilityType,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Submit and finalize onboarding"""
    profile = await ProfessionalService.submit_onboarding(
        db,
        current_user.id,
        capability_type
    )
    return profile


# ==================== Verification Endpoints ====================

@router.post("/verify/company")
async def verify_company(
    company_name: str,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Verify company name (placeholder)"""
    verification_service = VerificationService()
    result = await verification_service.verify_company_name(company_name)
    return result


@router.post("/verify/address")
async def verify_address(
    address: str,
    city: str = "Bangalore",
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Verify address (placeholder)"""
    verification_service = VerificationService()
    result = await verification_service.verify_address(address, city)
    return result


@router.post("/verify/license")
async def verify_license(
    license_number: str,
    issuing_authority: Optional[str] = None,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Verify license (placeholder)"""
    verification_service = VerificationService()
    result = await verification_service.verify_license(license_number, issuing_authority)
    return result


# ==================== Enhanced Endpoints ====================

@router.post("/location-preferences", status_code=status.HTTP_201_CREATED)
async def add_location_preferences(
    location_preferences: List[dict],
    capability_type: Optional[CapabilityType] = None,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Add location preferences with radius"""
    from app.models.professional import LocationPreference
    
    profile = await ProfessionalService.get_profile(db, current_user.id)
    
    created_locations = []
    for loc_data in location_preferences:
        location = LocationPreference(
            professional_id=profile.id,
            location_name=loc_data.get("location_name"),
            radius_km=loc_data.get("radius_km"),
            capability_type=capability_type or CapabilityType.CONSTRUCTION
        )
        db.add(location)
        created_locations.append(location)
    
    await db.commit()
    for loc in created_locations:
        await db.refresh(loc)
    
    return {"message": "Location preferences added", "count": len(created_locations)}


@router.post("/subcontractor-scopes", status_code=status.HTTP_201_CREATED)
async def add_subcontractor_scopes(
    scopes: List[dict],
    capability_type: Optional[CapabilityType] = None,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Add subcontractor scope details"""
    from app.models.professional import SubcontractorScope
    from app.utils.constants import SubcontractorScopeType
    
    profile = await ProfessionalService.get_profile(db, current_user.id)
    
    created_scopes = []
    for scope_data in scopes:
        scope = SubcontractorScope(
            professional_id=profile.id,
            scope_type=SubcontractorScopeType(scope_data.get("scope_type")),
            description=scope_data.get("description"),
            capability_type=capability_type or CapabilityType.CONSTRUCTION
        )
        db.add(scope)
        created_scopes.append(scope)
    
    await db.commit()
    for scope in created_scopes:
        await db.refresh(scope)
    
    return {"message": "Subcontractor scopes added", "count": len(created_scopes)}


@router.post("/project-size-categories", status_code=status.HTTP_201_CREATED)
async def add_project_size_category(
    size_category: str,
    custom_range: Optional[str] = None,
    wallet_size_range: Optional[str] = None,
    capability_type: CapabilityType = CapabilityType.CONSTRUCTION,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Add project size category"""
    from app.models.professional import ProjectSizeCategory
    from app.utils.constants import ProjectSizeCategoryEnum, WalletSizeRange
    
    profile = await ProfessionalService.get_profile(db, current_user.id)
    
    size_cat = ProjectSizeCategory(
        professional_id=profile.id,
        capability_type=capability_type,
        size_category=ProjectSizeCategoryEnum(size_category),
        custom_range=custom_range,
        wallet_size_range=WalletSizeRange(wallet_size_range) if wallet_size_range else None
    )
    
    db.add(size_cat)
    await db.commit()
    await db.refresh(size_cat)
    
    return {"message": "Project size category added", "id": str(size_cat.id)}


@router.post("/pricing/detailed", status_code=status.HTTP_201_CREATED)
async def add_detailed_pricing(
    pricing_data: dict,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Add detailed pricing structure"""
    from app.models.professional import ProfessionalPricing
    from app.utils.constants import PricingTierType, ProjectIntent
    
    profile = await ProfessionalService.get_profile(db, current_user.id)
    
    capability_type = CapabilityType(pricing_data.get("capability_type", "CONSTRUCTION"))
    project_type = ProjectIntent(pricing_data.get("project_type")) if pricing_data.get("project_type") else None
    pricing_tier = PricingTierType(pricing_data.get("pricing_tier")) if pricing_data.get("pricing_tier") else None
    price_per_sqft = pricing_data.get("price_per_sqft")
    custom_pricing = pricing_data.get("custom_pricing")
    
    pricing = ProfessionalPricing(
        professional_id=profile.id,
        capability_type=capability_type,
        project_type=project_type,
        pricing_tier=pricing_tier,
        price_per_sqft=price_per_sqft,
        custom_pricing=custom_pricing
    )
    
    db.add(pricing)
    await db.commit()
    await db.refresh(pricing)
    
    return {"message": "Detailed pricing added", "id": str(pricing.id)}


@router.post("/jv-preferences", status_code=status.HTTP_201_CREATED)
async def add_jv_preferences(
    preferred_jv_models: List[str],
    rera_registered_projects_count: Optional[int] = None,
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Add JV/JD preferences"""
    from app.models.professional import JVJDPreferences, ProfessionalProfile
    
    profile = await ProfessionalService.get_profile(db, current_user.id)
    
    # Check if preferences exist
    from sqlalchemy import select
    result = await db.execute(
        select(JVJDPreferences).where(JVJDPreferences.professional_id == profile.id)
    )
    existing = result.scalar_one_or_none()
    
    if existing:
        existing.preferred_jv_models = preferred_jv_models
        if rera_registered_projects_count is not None:
            existing.rera_registered_projects_count = rera_registered_projects_count
            profile.rera_project_count = rera_registered_projects_count
        await db.commit()
        await db.refresh(existing)
        return {"message": "JV preferences updated", "id": str(existing.id)}
    
    jv_prefs = JVJDPreferences(
        professional_id=profile.id,
        preferred_jv_models=preferred_jv_models,
        rera_registered_projects_count=rera_registered_projects_count or profile.rera_project_count
    )
    
    db.add(jv_prefs)
    await db.commit()
    await db.refresh(jv_prefs)
    
    return {"message": "JV preferences added", "id": str(jv_prefs.id)}


@router.post("/reconstruction-work-types", status_code=status.HTTP_201_CREATED)
async def add_reconstruction_work_types(
    work_types: List[dict],
    current_user: User = Depends(require_professional),
    db: AsyncSession = Depends(get_db)
):
    """Add reconstruction work type preferences"""
    from app.models.professional import ReconstructionWorkType
    from app.utils.constants import ReconstructionWorkType as ReconstructionWorkTypeEnum
    
    profile = await ProfessionalService.get_profile(db, current_user.id)
    
    created_work_types = []
    for work_type_data in work_types:
        work_type = ReconstructionWorkType(
            professional_id=profile.id,
            work_type=ReconstructionWorkTypeEnum(work_type_data.get("work_type")),
            custom_description=work_type_data.get("custom_description")
        )
        db.add(work_type)
        created_work_types.append(work_type)
    
    await db.commit()
    for wt in created_work_types:
        await db.refresh(wt)
    
    return {"message": "Reconstruction work types added", "count": len(created_work_types)}
