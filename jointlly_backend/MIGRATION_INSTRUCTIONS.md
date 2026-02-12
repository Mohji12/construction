# Database Migration Instructions

## Initial Setup

1. **Create PostgreSQL database:**
   ```bash
   createdb jointly_db
   ```

2. **Update `.env` file with your database URL:**
   ```
   DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/jointly_db
   ```

3. **Generate initial migration:**
   ```bash
   alembic revision --autogenerate -m "Initial migration"
   ```

4. **Apply migrations:**
   ```bash
   alembic upgrade head
   ```

## Creating New Migrations

When you make changes to models:

1. **Generate migration:**
   ```bash
   alembic revision --autogenerate -m "Description of changes"
   ```

2. **Review the generated migration file** in `alembic/versions/`

3. **Apply migration:**
   ```bash
   alembic upgrade head
   ```

## Rolling Back

To rollback the last migration:
```bash
alembic downgrade -1
```

To rollback to a specific revision:
```bash
alembic downgrade <revision_id>
```

## View Migration History

```bash
alembic history
```

## Current Revision

```bash
alembic current
```
