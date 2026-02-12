"""
Matching models
"""
from uuid import uuid4
from datetime import datetime
from sqlalchemy import (
    Column, Float, DateTime, ForeignKey,
    Enum as SQLEnum
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
from app.utils.constants import MatchStatus


class Match(Base):
    """Match model between projects and professionals"""
    
    __tablename__ = "matches"
    
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid4,
        index=True
    )
    project_id = Column(
        UUID(as_uuid=True),
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    professional_id = Column(
        UUID(as_uuid=True),
        ForeignKey("professional_profiles.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    match_score = Column(Float, nullable=False, index=True)
    status = Column(
        SQLEnum(MatchStatus, name="match_status"),
        default=MatchStatus.PENDING,
        nullable=False,
        index=True
    )
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    
    # Relationships
    project = relationship("Project", back_populates="matches")
    professional = relationship("ProfessionalProfile", back_populates="matches")
    match_score_details = relationship("MatchScore", back_populates="match", uselist=False, cascade="all, delete-orphan")
    
    def __repr__(self) -> str:
        return f"<Match(id={self.id}, project_id={self.project_id}, professional_id={self.professional_id}, score={self.match_score})>"


class MatchScore(Base):
    """Detailed match score breakdown"""
    
    __tablename__ = "match_scores"
    
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid4,
        index=True
    )
    match_id = Column(
        UUID(as_uuid=True),
        ForeignKey("matches.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True
    )
    project_type_score = Column(Float, nullable=True)
    location_score = Column(Float, nullable=True)
    project_size_score = Column(Float, nullable=True)
    pricing_score = Column(Float, nullable=True)
    capability_score = Column(Float, nullable=True)
    verification_score = Column(Float, nullable=True)
    total_score = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    match = relationship("Match", back_populates="match_score_details")
    
    def __repr__(self) -> str:
        return f"<MatchScore(id={self.id}, match_id={self.match_id}, total_score={self.total_score})>"
