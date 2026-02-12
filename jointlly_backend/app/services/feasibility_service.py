"""
Feasibility calculation service with BBMP setback rules
"""
from typing import Optional, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.verification import FeasibilityReport
from app.models.landowner import Property
from app.exceptions import NotFoundError


class FeasibilityService:
    """Service for feasibility calculations with BBMP setback rules"""
    
    # Conversion: 1 meter = 3.28084 feet
    METER_TO_FEET = 3.28084
    
    @staticmethod
    def calculate_setbacks(
        plot_area_sqft: float,
        width_ft: float,
        length_ft: float,
        facing: Optional[str] = None
    ) -> Dict:
        """
        Calculate setbacks based on BBMP rules (Jan 5, 2026)
        
        Rules:
        - ≤60 sq m: Front 0.7m, Sides 0.6m each, Rear eliminated
        - 60-150 sq m: Front 0.9m, Rear 0.7m, One side 0.7m
        - 150-250 sq m: Front 1m, Rear 0.8m, Sides 0.8m each
        - >250 sq m: Percentage-based (12% front, 8% rear/sides)
        - >4000 sq m: Minimum 5m all sides
        """
        # Convert sqft to sqm (1 sqm = 10.764 sqft)
        plot_area_sqm = plot_area_sqft / 10.764
        
        # Determine plot category and setbacks
        if plot_area_sqm <= 60:
            front_setback_m = 0.7
            rear_setback_m = 0.0  # Eliminated
            side_setback_m = 0.6
            plot_category = "≤60 sq m"
        elif plot_area_sqm <= 150:
            front_setback_m = 0.9
            rear_setback_m = 0.7
            side_setback_m = 0.7
            plot_category = "60-150 sq m"
        elif plot_area_sqm <= 250:
            front_setback_m = 1.0
            rear_setback_m = 0.8
            side_setback_m = 0.8
            plot_category = "150-250 sq m"
        elif plot_area_sqm <= 4000:
            # Percentage-based: 12% front, 8% rear/sides
            # Assume length is the depth (front to back)
            depth_ft = max(width_ft, length_ft)
            front_setback_m = (depth_ft * 0.12) / FeasibilityService.METER_TO_FEET
            rear_setback_m = (depth_ft * 0.08) / FeasibilityService.METER_TO_FEET
            side_setback_m = (min(width_ft, length_ft) * 0.08) / FeasibilityService.METER_TO_FEET
            plot_category = "250-4000 sq m"
        else:
            # Minimum 5m all sides
            front_setback_m = 5.0
            rear_setback_m = 5.0
            side_setback_m = 5.0
            plot_category = ">4000 sq m"
        
        # Convert setbacks to feet
        front_setback_ft = front_setback_m * FeasibilityService.METER_TO_FEET
        rear_setback_ft = rear_setback_m * FeasibilityService.METER_TO_FEET
        side_setback_ft = side_setback_m * FeasibilityService.METER_TO_FEET
        
        # Calculate net buildable area
        # Assuming width is front-facing dimension
        net_length = length_ft - front_setback_ft - rear_setback_ft
        net_width = width_ft - (2 * side_setback_ft)
        
        if net_length < 0:
            net_length = 0
        if net_width < 0:
            net_width = 0
        
        net_buildable_area_sqft = net_length * net_width
        
        return {
            "plot_category": plot_category,
            "front_setback_m": front_setback_m,
            "rear_setback_m": rear_setback_m,
            "side_setback_m": side_setback_m,
            "front_setback_ft": front_setback_ft,
            "rear_setback_ft": rear_setback_ft,
            "side_setback_ft": side_setback_ft,
            "net_buildable_area_sqft": net_buildable_area_sqft,
            "net_length_ft": net_length,
            "net_width_ft": net_width
        }
    
    @staticmethod
    def calculate_floors_and_units(
        net_buildable_area_sqft: float,
        total_buildable_area_sqft: float,
        project_type: str
    ) -> Dict:
        """
        Calculate allowed floors and units
        """
        # Typical floor height: ~10-12 ft per floor (including stilt)
        # Stilt + N floors pattern
        # For residential: typically stilt + 4 floors = 5 total floors
        
        # Calculate floors based on buildable area
        # Assuming average floor area = net buildable area
        floors = int(total_buildable_area_sqft / net_buildable_area_sqft) if net_buildable_area_sqft > 0 else 0
        
        # Limit to typical pattern (stilt + 4)
        if floors > 5:
            floors = 5
        
        # Calculate units (assuming typical unit size ~800-1200 sqft)
        avg_unit_size = 1000  # sqft
        number_of_units = int(total_buildable_area_sqft / avg_unit_size)
        
        # Saleable area (typically 70-80% of built-up area)
        saleable_area_sqft = total_buildable_area_sqft * 0.75
        
        return {
            "allowed_floors": floors,
            "total_floors": floors,  # Including stilt
            "number_of_units": number_of_units,
            "saleable_area_sqft": saleable_area_sqft,
            "average_unit_size_sqft": avg_unit_size
        }
    
    @staticmethod
    async def create_feasibility_report(
        db: AsyncSession,
        property_id: str,
        total_buildable_area_sqft: float,
        is_unlocked: bool = False
    ) -> FeasibilityReport:
        """
        Create feasibility report with setbacks and floor calculations
        """
        # Get property
        result = await db.execute(
            select(Property).where(Property.id == property_id)
        )
        property_obj = result.scalar_one_or_none()
        
        if not property_obj:
            raise NotFoundError("Property", property_id)
        
        # Calculate setbacks
        setback_data = FeasibilityService.calculate_setbacks(
            property_obj.plot_area_sqft,
            property_obj.width_ft or 0,
            property_obj.length_ft or 0,
            property_obj.facing
        )
        
        # Calculate floors and units
        floor_data = FeasibilityService.calculate_floors_and_units(
            setback_data["net_buildable_area_sqft"],
            total_buildable_area_sqft,
            "residential"  # Default, can be parameterized
        )
        
        # Create feasibility report
        feasibility_report = FeasibilityReport(
            property_id=property_id,
            plot_category=setback_data["plot_category"],
            front_setback_m=setback_data["front_setback_m"],
            rear_setback_m=setback_data["rear_setback_m"],
            side_setback_m=setback_data["side_setback_m"],
            net_buildable_area_sqft=setback_data["net_buildable_area_sqft"],
            allowed_floors=floor_data["allowed_floors"],
            total_built_up_area_sqft=total_buildable_area_sqft,
            saleable_area_sqft=floor_data["saleable_area_sqft"],
            number_of_units=floor_data["number_of_units"],
            is_unlocked=is_unlocked
        )
        
        db.add(feasibility_report)
        await db.commit()
        await db.refresh(feasibility_report)
        
        return feasibility_report
    
    @staticmethod
    async def get_feasibility_report(
        db: AsyncSession,
        property_id: str
    ) -> Optional[FeasibilityReport]:
        """
        Get latest feasibility report for a property
        """
        result = await db.execute(
            select(FeasibilityReport)
            .where(FeasibilityReport.property_id == property_id)
            .order_by(FeasibilityReport.created_at.desc())
        )
        return result.scalar_one_or_none()
    
    @staticmethod
    async def unlock_feasibility_report(
        db: AsyncSession,
        property_id: str
    ) -> FeasibilityReport:
        """
        Unlock feasibility report after payment
        """
        report = await FeasibilityService.get_feasibility_report(db, property_id)
        
        if not report:
            raise NotFoundError("FeasibilityReport", property_id)
        
        report.is_unlocked = True
        await db.commit()
        await db.refresh(report)
        
        return report
