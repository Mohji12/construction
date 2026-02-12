"""
Credibility scoring service for professionals
"""
from typing import Dict
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.professional import ProfessionalProfile, License, Portfolio
from app.models.verification import PIDVerification
from app.utils.constants import VerificationStatus


class CredibilityService:
    """Service for calculating professional credibility scores"""
    
    # Scoring weights
    WEIGHTS = {
        "company_verification": 0.20,
        "license_presence": 0.15,
        "rera_registration": 0.10,
        "portfolio_completeness": 0.20,
        "experience_years": 0.15,
        "project_count": 0.10,
        "address_verification": 0.10,
    }
    
    @staticmethod
    async def calculate_credibility_score(
        db: AsyncSession,
        professional_id: str
    ) -> float:
        """
        Calculate credibility score for a professional
        Returns score between 0.0 and 1.0
        """
        # Get professional profile
        result = await db.execute(
            select(ProfessionalProfile).where(ProfessionalProfile.id == professional_id)
        )
        profile = result.scalar_one_or_none()
        
        if not profile:
            return 0.0
        
        scores = {}
        
        # 1. Company verification (20%)
        # Placeholder: Assume verified if company name exists
        scores["company_verification"] = 1.0 if profile.company_name else 0.0
        
        # 2. License presence (15%)
        license_count = await db.execute(
            select(func.count(License.id))
            .where(License.professional_id == professional_id)
        )
        license_count_val = license_count.scalar() or 0
        scores["license_presence"] = min(1.0, license_count_val / 2.0)  # Max score with 2+ licenses
        
        # 3. RERA registration (10%)
        scores["rera_registration"] = 1.0 if profile.rera_experience else 0.0
        
        # 4. Portfolio completeness (20%)
        portfolio_count = await db.execute(
            select(func.count(Portfolio.id))
            .where(Portfolio.professional_id == professional_id)
        )
        portfolio_count_val = portfolio_count.scalar() or 0
        # Max score with 3+ portfolio items
        scores["portfolio_completeness"] = min(1.0, portfolio_count_val / 3.0)
        
        # 5. Experience years (15%)
        if profile.experience_years:
            # Max score at 10+ years
            scores["experience_years"] = min(1.0, profile.experience_years / 10.0)
        else:
            scores["experience_years"] = 0.0
        
        # 6. Project count (10%)
        if profile.total_projects_completed:
            # Max score at 20+ projects
            scores["project_count"] = min(1.0, profile.total_projects_completed / 20.0)
        else:
            scores["project_count"] = 0.0
        
        # 7. Address verification (10%)
        # Placeholder: Assume verified if address exists
        scores["address_verification"] = 1.0 if profile.office_address else 0.0
        
        # Calculate weighted total
        total_score = sum(
            scores[key] * CredibilityService.WEIGHTS[key]
            for key in CredibilityService.WEIGHTS
        )
        
        return round(total_score, 4)  # Round to 4 decimal places
    
    @staticmethod
    async def update_credibility_score(
        db: AsyncSession,
        professional_id: str
    ) -> float:
        """
        Calculate and update credibility score in profile
        """
        score = await CredibilityService.calculate_credibility_score(db, professional_id)
        
        # Update profile
        result = await db.execute(
            select(ProfessionalProfile).where(ProfessionalProfile.id == professional_id)
        )
        profile = result.scalar_one_or_none()
        
        if profile:
            profile.credibility_score = score
            await db.commit()
            await db.refresh(profile)
        
        return score
