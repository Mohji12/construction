"""add name to users table

Revision ID: add_name_to_users
Revises: 
Create Date: 2026-01-25

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_name_to_users'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Add name column to users table
    op.add_column('users', sa.Column('name', sa.String(length=255), nullable=True))
    
    # Update existing users to have a default name (if any exist)
    op.execute("UPDATE users SET name = 'User' WHERE name IS NULL")
    
    # Make the column non-nullable after setting default values
    op.alter_column('users', 'name', nullable=False)


def downgrade():
    # Remove name column
    op.drop_column('users', 'name')
