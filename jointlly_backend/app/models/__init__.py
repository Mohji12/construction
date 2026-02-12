"""
Database models
"""
from app.database import Base

# Import all models to ensure they're registered with Base
from app.models.user import User
from app.models.landowner import LandownerProfile, Property, Project, JVPreferences
from app.models.professional import (
    ProfessionalProfile,
    Capability,
    License,
    Portfolio,
    PricingTier,
    LocationPreference,
    SubcontractorScope,
    ProjectSizeCategory,
    ProfessionalPricing,
    JVJDPreferences,
    ReconstructionWorkType
)
from app.models.verification import FARCalculation, FeasibilityReport, PIDVerification
from app.models.payment import Transaction, Payment
from app.models.matching import Match, MatchScore

__all__ = [
    "Base",
    "User",
    "LandownerProfile",
    "Property",
    "Project",
    "JVPreferences",
    "ProfessionalProfile",
    "Capability",
    "License",
    "Portfolio",
    "PricingTier",
    "LocationPreference",
    "SubcontractorScope",
    "ProjectSizeCategory",
    "ProfessionalPricing",
    "JVJDPreferences",
    "ReconstructionWorkType",
    "FARCalculation",
    "FeasibilityReport",
    "PIDVerification",
    "Transaction",
    "Payment",
    "Match",
    "MatchScore",
]
