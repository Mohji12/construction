"""
Matching service with scoring algorithm
"""
import math
from uuid import UUID
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from app.models.matching import Match, MatchScore
from app.models.landowner import Project
from app.models.professional import ProfessionalProfile, Capability, PricingTier
from app.models.landowner import Property
from app.models.verification import PIDVerification
from app.utils.constants import (
    MatchStatus,
    MATCH_WEIGHTS,
    ProjectType,
    CapabilityType,
    VerificationStatus
)
from app.exceptions import NotFoundError


class MatchingService:
    """Service for matching projects with professionals"""
    
    @staticmethod
    def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """
        Calculate distance between two coordinates using Haversine formula
        Returns distance in kilometers
        """
        R = 6371  # Earth radius in kilometers
        
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        
        a = (
            math.sin(dlat / 2) ** 2 +
            math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
            math.sin(dlon / 2) ** 2
        )
        c = 2 * math.asin(math.sqrt(a))
        
        return R * c
    
    @staticmethod
    def calculate_project_type_score(
        project_type: ProjectType,
        capabilities: List[Capability]
    ) -> float:
        """Calculate project type match score (20% weight)"""
        capability_type_map = {
            ProjectType.CONTRACT_CONSTRUCTION: CapabilityType.CONSTRUCTION,
            ProjectType.INTERIOR: CapabilityType.INTERIOR,
            ProjectType.RECONSTRUCTION: CapabilityType.RECONSTRUCTION,
            ProjectType.JV_JD: CapabilityType.JV_JD,
        }
        
        required_capability = capability_type_map.get(project_type)
        if not required_capability:
            return 0.0
        
        for capability in capabilities:
            if capability.capability_type == required_capability:
                return 1.0
        
        return 0.0
    
    @staticmethod
    def calculate_location_score(
        property_city: str,
        location_preferences: Optional[List[str]]
    ) -> float:
        """Calculate location match score (25% weight)"""
        if not location_preferences:
            return 0.5  # Neutral score if no preferences
        
        property_city_lower = property_city.lower()
        for pref in location_preferences:
            if property_city_lower in pref.lower() or pref.lower() in property_city_lower:
                return 1.0
        
        return 0.3  # Partial match
    
    @staticmethod
    def calculate_project_size_score(
        project_area_sqft: float,
        pricing_tiers: List[PricingTier],
        capability_type: CapabilityType
    ) -> float:
        """Calculate project size compatibility score (15% weight)"""
        if not pricing_tiers:
            return 0.5
        
        # Find matching pricing tier
        for tier in pricing_tiers:
            if tier.capability_type != capability_type:
                continue
            
            min_area = tier.min_area_sqft or 0
            max_area = tier.max_area_sqft or float('inf')
            
            if min_area <= project_area_sqft <= max_area:
                return 1.0
        
        return 0.5  # Neutral if no exact match
    
    @staticmethod
    def calculate_pricing_score(
        project_area_sqft: float,
        pricing_tiers: List[PricingTier],
        capability_type: CapabilityType
    ) -> float:
        """Calculate pricing match score (15% weight)"""
        if not pricing_tiers:
            return 0.5
        
        # Find applicable pricing tier
        applicable_tiers = [
            t for t in pricing_tiers
            if t.capability_type == capability_type and
            (t.min_area_sqft is None or project_area_sqft >= t.min_area_sqft) and
            (t.max_area_sqft is None or project_area_sqft <= t.max_area_sqft)
        ]
        
        if applicable_tiers:
            # Score based on competitive pricing (lower is better, normalized)
            avg_price = sum(t.price_per_sqft for t in applicable_tiers) / len(applicable_tiers)
            # Normalize: assume ₹1000-5000 per sqft range
            normalized = max(0, min(1, 1 - (avg_price - 1000) / 4000))
            return normalized
        
        return 0.5
    
    @staticmethod
    def calculate_capability_score(
        capabilities: List[Capability],
        project_type: ProjectType
    ) -> float:
        """Calculate capability match score (15% weight)"""
        if not capabilities:
            return 0.0
        
        capability_type_map = {
            ProjectType.CONTRACT_CONSTRUCTION: CapabilityType.CONSTRUCTION,
            ProjectType.INTERIOR: CapabilityType.INTERIOR,
            ProjectType.RECONSTRUCTION: CapabilityType.RECONSTRUCTION,
            ProjectType.JV_JD: CapabilityType.JV_JD,
        }
        
        required = capability_type_map.get(project_type)
        if not required:
            return 0.0
        
        # Check if required capability exists
        for cap in capabilities:
            if cap.capability_type == required:
                return 1.0
        
        return 0.0
    
    @staticmethod
    def calculate_verification_score(
        property_obj: Property,
        pid_verifications: List[PIDVerification]
    ) -> float:
        """Calculate verification level score (10% weight)"""
        score = 0.0
        
        # PID verification
        verified_pid = any(
            v.verification_status == VerificationStatus.VERIFIED
            for v in pid_verifications
        )
        if verified_pid:
            score += 0.5
        
        # Basic property info
        if property_obj.pid_number:
            score += 0.2
        if property_obj.tax_paid:
            score += 0.2
        if property_obj.e_khatha_status:
            score += 0.1
        
        return min(1.0, score)
    
    @staticmethod
    async def calculate_match_score(
        db: AsyncSession,
        project: Project,
        professional: ProfessionalProfile
    ) -> dict:
        """Calculate comprehensive match score"""
        # Get project property
        property_obj = project.property
        
        # Get professional capabilities
        capabilities_result = await db.execute(
            select(Capability).where(Capability.professional_id == professional.id)
        )
        capabilities = list(capabilities_result.scalars().all())
        
        # Get pricing tiers
        pricing_result = await db.execute(
            select(PricingTier).where(PricingTier.professional_id == professional.id)
        )
        pricing_tiers = list(pricing_result.scalars().all())
        
        # Get PID verifications
        pid_result = await db.execute(
            select(PIDVerification).where(PIDVerification.property_id == property_obj.id)
        )
        pid_verifications = list(pid_result.scalars().all())
        
        # Map project type to capability type
        capability_type_map = {
            ProjectType.CONTRACT_CONSTRUCTION: CapabilityType.CONSTRUCTION,
            ProjectType.INTERIOR: CapabilityType.INTERIOR,
            ProjectType.RECONSTRUCTION: CapabilityType.RECONSTRUCTION,
            ProjectType.JV_JD: CapabilityType.JV_JD,
        }
        capability_type = capability_type_map.get(project.project_type, CapabilityType.CONSTRUCTION)
        
        # Calculate project area
        project_area = property_obj.plot_area_sqft
        
        # Calculate individual scores
        project_type_score = MatchingService.calculate_project_type_score(
            project.project_type,
            capabilities
        )
        
        location_score = MatchingService.calculate_location_score(
            property_obj.city,
            professional.location_preferences
        )
        
        project_size_score = MatchingService.calculate_project_size_score(
            project_area,
            pricing_tiers,
            capability_type
        )
        
        pricing_score = MatchingService.calculate_pricing_score(
            project_area,
            pricing_tiers,
            capability_type
        )
        
        capability_score = MatchingService.calculate_capability_score(
            capabilities,
            project.project_type
        )
        
        verification_score = MatchingService.calculate_verification_score(
            property_obj,
            pid_verifications
        )
        
        # Calculate weighted total score
        total_score = (
            project_type_score * MATCH_WEIGHTS["project_type"] +
            location_score * MATCH_WEIGHTS["location"] +
            project_size_score * MATCH_WEIGHTS["project_size"] +
            pricing_score * MATCH_WEIGHTS["pricing"] +
            capability_score * MATCH_WEIGHTS["capability"] +
            verification_score * MATCH_WEIGHTS["verification"]
        )
        
        return {
            "project_type_score": project_type_score,
            "location_score": location_score,
            "project_size_score": project_size_score,
            "pricing_score": pricing_score,
            "capability_score": capability_score,
            "verification_score": verification_score,
            "total_score": total_score
        }
    
    @staticmethod
    async def create_match(
        db: AsyncSession,
        project_id: UUID,
        professional_id: UUID
    ) -> Match:
        """Create match between project and professional"""
        # Get project and professional
        project_result = await db.execute(
            select(Project).where(Project.id == project_id)
        )
        project = project_result.scalar_one_or_none()
        if not project:
            raise NotFoundError("Project", str(project_id))
        
        professional_result = await db.execute(
            select(ProfessionalProfile).where(ProfessionalProfile.id == professional_id)
        )
        professional = professional_result.scalar_one_or_none()
        if not professional:
            raise NotFoundError("ProfessionalProfile", str(professional_id))
        
        # Calculate match score
        score_data = await MatchingService.calculate_match_score(db, project, professional)
        
        # Create match
        match = Match(
            project_id=project_id,
            professional_id=professional_id,
            match_score=score_data["total_score"],
            status=MatchStatus.PENDING
        )
        
        db.add(match)
        await db.commit()
        await db.refresh(match)
        
        # Create match score details
        match_score = MatchScore(
            match_id=match.id,
            project_type_score=score_data["project_type_score"],
            location_score=score_data["location_score"],
            project_size_score=score_data["project_size_score"],
            pricing_score=score_data["pricing_score"],
            capability_score=score_data["capability_score"],
            verification_score=score_data["verification_score"],
            total_score=score_data["total_score"]
        )
        
        db.add(match_score)
        await db.commit()
        
        return match
    
    @staticmethod
    async def match_project_to_professionals(
        db: AsyncSession,
        project_id: UUID
    ) -> List[Match]:
        """Match a project to all suitable professionals"""
        # Get project
        project_result = await db.execute(
            select(Project).where(Project.id == project_id)
        )
        project = project_result.scalar_one_or_none()
        if not project:
            raise NotFoundError("Project", str(project_id))
        
        # Get all professionals with matching capabilities
        capability_type_map = {
            ProjectType.CONTRACT_CONSTRUCTION: CapabilityType.CONSTRUCTION,
            ProjectType.INTERIOR: CapabilityType.INTERIOR,
            ProjectType.RECONSTRUCTION: CapabilityType.RECONSTRUCTION,
            ProjectType.JV_JD: CapabilityType.JV_JD,
        }
        required_capability = capability_type_map.get(project.project_type)
        
        if required_capability:
            professionals_result = await db.execute(
                select(ProfessionalProfile)
                .join(Capability)
                .where(Capability.capability_type == required_capability)
            )
        else:
            professionals_result = await db.execute(select(ProfessionalProfile))
        
        professionals = list(professionals_result.scalars().all())
        
        # Create matches
        matches = []
        for professional in professionals:
            # Check if match already exists
            existing_result = await db.execute(
                select(Match).where(
                    and_(
                        Match.project_id == project_id,
                        Match.professional_id == professional.id
                    )
                )
            )
            if existing_result.scalar_one_or_none():
                continue
            
            match = await MatchingService.create_match(db, project_id, professional.id)
            matches.append(match)
        
        return matches
    
    @staticmethod
    async def get_project_matches(
        db: AsyncSession,
        project_id: UUID,
        limit: int = 10
    ) -> List[Match]:
        """Get matches for a project, sorted by score"""
        result = await db.execute(
            select(Match)
            .where(Match.project_id == project_id)
            .order_by(Match.match_score.desc())
            .limit(limit)
        )
        return list(result.scalars().all())
    
    @staticmethod
    async def get_professional_matches(
        db: AsyncSession,
        professional_id: UUID,
        limit: int = 10
    ) -> List[Match]:
        """Get matches for a professional, sorted by score"""
        result = await db.execute(
            select(Match)
            .where(Match.professional_id == professional_id)
            .order_by(Match.match_score.desc())
            .limit(limit)
        )
        return list(result.scalars().all())
    
    @staticmethod
    async def accept_match(
        db: AsyncSession,
        match_id: UUID
    ) -> Match:
        """Accept a match"""
        result = await db.execute(select(Match).where(Match.id == match_id))
        match = result.scalar_one_or_none()
        
        if not match:
            raise NotFoundError("Match", str(match_id))
        
        match.status = MatchStatus.ACCEPTED
        await db.commit()
        await db.refresh(match)
        
        return match
    
    @staticmethod
    async def reject_match(
        db: AsyncSession,
        match_id: UUID
    ) -> Match:
        """Reject a match"""
        result = await db.execute(select(Match).where(Match.id == match_id))
        match = result.scalar_one_or_none()
        
        if not match:
            raise NotFoundError("Match", str(match_id))
        
        match.status = MatchStatus.REJECTED
        await db.commit()
        await db.refresh(match)
        
        return match
