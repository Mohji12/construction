"""
FAR (Floor Area Ratio) calculation service
"""
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.verification import FARCalculation
from app.models.landowner import Property
from app.utils.constants import BENGALURU_FAR_MIN, BENGALURU_FAR_MAX


class FARService:
    """Service for FAR calculations"""
    
    @staticmethod
    def calculate_far(
        plot_area_sqft: float,
        road_width_ft: float,
        zone_type: Optional[str] = None,
        city: str = "Bengaluru"
    ) -> dict:
        """
        Calculate FAR based on road width, zone, and city rules
        
        Bengaluru FAR rules (simplified):
        - Residential zones: FAR typically 1.5 to 3.25
        - Depends on road width:
          - < 30 ft road: FAR ~1.5-2.0
          - 30-40 ft road: FAR ~2.0-2.5
          - 40-60 ft road: FAR ~2.5-3.0
          - > 60 ft road: FAR ~3.0-3.25
        - Premium FAR available with payment
        """
        if city.lower() != "bengaluru":
            # Default to Bengaluru rules for now
            pass
        
        # Determine FAR based on road width
        if road_width_ft < 30:
            base_far = 1.5
            max_far = 2.0
        elif road_width_ft < 40:
            base_far = 2.0
            max_far = 2.5
        elif road_width_ft < 60:
            base_far = 2.5
            max_far = 3.0
        else:
            base_far = 3.0
            max_far = 3.25
        
        # Use base FAR for calculation (can be upgraded with premium payment)
        calculated_far = base_far
        
        # Calculate total buildable area
        total_buildable_area = plot_area_sqft * calculated_far
        
        return {
            "calculated_far": calculated_far,
            "min_far": BENGALURU_FAR_MIN,
            "max_far": max_far,
            "base_far": base_far,
            "premium_far_available": max_far > base_far,
            "total_buildable_area_sqft": total_buildable_area,
            "plot_area_sqft": plot_area_sqft,
            "road_width_ft": road_width_ft,
            "zone_type": zone_type or "Residential"
        }
    
    @staticmethod
    async def create_far_calculation(
        db: AsyncSession,
        property_id: str,
        road_width_ft: float,
        zone_type: Optional[str] = None
    ) -> FARCalculation:
        """
        Create and save FAR calculation
        """
        # Get property
        result = await db.execute(
            select(Property).where(Property.id == property_id)
        )
        property_obj = result.scalar_one_or_none()
        
        if not property_obj:
            from app.exceptions import NotFoundError
            raise NotFoundError("Property", property_id)
        
        # Calculate FAR
        plot_area = property_obj.plot_area_sqft
        far_data = FARService.calculate_far(
            plot_area,
            road_width_ft,
            zone_type
        )
        
        # Create FAR calculation record
        far_calculation = FARCalculation(
            property_id=property_id,
            road_width_ft=road_width_ft,
            zone_type=zone_type or "Residential",
            calculated_far=far_data["calculated_far"],
            total_buildable_area=far_data["total_buildable_area_sqft"]
        )
        
        db.add(far_calculation)
        await db.commit()
        await db.refresh(far_calculation)
        
        return far_calculation
    
    @staticmethod
    async def get_far_calculation(
        db: AsyncSession,
        property_id: str
    ) -> Optional[FARCalculation]:
        """
        Get latest FAR calculation for a property
        """
        result = await db.execute(
            select(FARCalculation)
            .where(FARCalculation.property_id == property_id)
            .order_by(FARCalculation.created_at.desc())
        )
        return result.scalar_one_or_none()
