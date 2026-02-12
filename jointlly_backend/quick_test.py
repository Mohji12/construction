"""Quick test to check database connection"""
import sys

# Test 1: Check if aiomysql is installed
print("=" * 60)
print("TEST 1: Checking if aiomysql is installed...")
print("=" * 60)
try:
    import aiomysql
    print("✅ aiomysql is installed (version:", aiomysql.__version__, ")")
except ImportError as e:
    print("❌ aiomysql is NOT installed")
    print("   Run: pip install aiomysql pymysql cryptography")
    sys.exit(1)

# Test 2: Check if environment variables are loaded
print("\n" + "=" * 60)
print("TEST 2: Checking environment variables...")
print("=" * 60)
try:
    from dotenv import load_dotenv
    import os
    load_dotenv()
    db_url = os.getenv("DATABASE_URL")
    if db_url:
        # Mask password for security
        masked_url = db_url.split("@")[0].split(":")[0:2]
        print(f"✅ DATABASE_URL is set")
        print(f"   Connection type: {masked_url[0] if masked_url else 'unknown'}")
    else:
        print("❌ DATABASE_URL not found in .env")
except Exception as e:
    print(f"❌ Error loading environment: {e}")

# Test 3: Try to connect to database
print("\n" + "=" * 60)
print("TEST 3: Testing database connection...")
print("=" * 60)
try:
    import asyncio
    from app.database import engine
    
    async def test_connection():
        try:
            async with engine.connect() as conn:
                from sqlalchemy import text
                result = await conn.execute(text("SELECT 1"))
                data = result.fetchone()
                print("✅ Database connection successful!")
                print(f"   Test query result: {data}")
                return True
        except Exception as e:
            print(f"❌ Database connection failed!")
            print(f"   Error: {str(e)}")
            return False
    
    success = asyncio.run(test_connection())
    
    if not success:
        print("\n" + "=" * 60)
        print("TROUBLESHOOTING TIPS:")
        print("=" * 60)
        print("1. Install aiomysql: pip install aiomysql pymysql cryptography")
        print("2. Check if AWS RDS allows your IP address")
        print("3. Verify database credentials in .env file")
        print("4. Ensure database 'jointly' exists")
        
except Exception as e:
    print(f"❌ Error during connection test: {e}")
    print("\n   This usually means aiomysql is not installed.")
    print("   Run: pip install aiomysql pymysql cryptography")

print("\n" + "=" * 60)
print("Test completed!")
print("=" * 60)
