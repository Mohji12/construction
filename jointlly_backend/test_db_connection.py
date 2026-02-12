"""
Quick script to test database connection
"""
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

async def test_connection():
    database_url = os.getenv("DATABASE_URL")
    
    print("=" * 60)
    print("DATABASE CONNECTION TEST")
    print("=" * 60)
    print(f"\nDatabase URL: {database_url[:50]}...")
    
    try:
        # Create engine
        print("\n[1/4] Creating database engine...")
        engine = create_async_engine(database_url, echo=False)
        print("✓ Engine created successfully")
        
        # Test connection
        print("\n[2/4] Testing connection...")
        async with engine.connect() as conn:
            print("✓ Connection established")
            
            # Execute test query
            print("\n[3/4] Executing test query...")
            result = await conn.execute(text("SELECT 1"))
            data = result.fetchone()
            print(f"✓ Query executed successfully: {data}")
            
            # Check database name
            print("\n[4/4] Checking database name...")
            result = await conn.execute(text("SELECT DATABASE()"))
            db_name = result.fetchone()
            print(f"✓ Connected to database: {db_name[0]}")
        
        print("\n" + "=" * 60)
        print("✅ DATABASE CONNECTION SUCCESSFUL!")
        print("=" * 60)
        print("\nYour backend is ready to connect to AWS RDS MySQL.")
        
        await engine.dispose()
        return True
        
    except Exception as e:
        print("\n" + "=" * 60)
        print("❌ DATABASE CONNECTION FAILED!")
        print("=" * 60)
        print(f"\nError: {str(e)}")
        print("\nPossible issues:")
        print("1. Check if database credentials are correct")
        print("2. Verify AWS RDS security group allows your IP address")
        print("3. Ensure database 'jointly' exists")
        print("4. Check if aiomysql is installed: pip install aiomysql")
        return False

if __name__ == "__main__":
    asyncio.run(test_connection())
