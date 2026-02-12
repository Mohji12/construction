# Database Connection Test Guide

## Current Status

❌ **aiomysql package is not installed** - This is required to connect to MySQL database.

## Step 1: Install Required Packages

Open a **Command Prompt as Administrator** and run:

```bash
cd E:\Jointly
pip install aiomysql pymysql cryptography
```

Or if you get permission errors, try:

```bash
python -m pip install --user aiomysql pymysql cryptography
```

## Step 2: Verify Installation

```bash
python -c "import aiomysql; print('aiomysql installed:', aiomysql.__version__)"
```

## Step 3: Test Database Connection

Run the test script:

```bash
cd E:\Jointly
python test_db_connection.py
```

### Expected Output (Success):

```
============================================================
DATABASE CONNECTION TEST
============================================================

Database URL: mysql+aiomysql://admin:Critical%232025@critical-cl...

[1/4] Creating database engine...
✓ Engine created successfully

[2/4] Testing connection...
✓ Connection established

[3/4] Executing test query...
✓ Query executed successfully: (1,)

[4/4] Checking database name...
✓ Connected to database: jointly

============================================================
✅ DATABASE CONNECTION SUCCESSFUL!
============================================================

Your backend is ready to connect to AWS RDS MySQL.
```

## Step 4: Run the Backend Server

Once database connection is successful:

```bash
cd E:\Jointly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Common Issues and Solutions

### Issue 1: Module Not Found Error
```
ModuleNotFoundError: No module named 'aiomysql'
```

**Solution**: Install the package using pip (Step 1 above)

### Issue 2: Permission Error During Installation
```
ERROR: Could not install packages due to an OSError: [WinError 5] Access is denied
```

**Solution**: 
- Run Command Prompt as Administrator, OR
- Use `--user` flag: `pip install --user aiomysql pymysql`

### Issue 3: Connection Timeout
```
TimeoutError: [Errno 110] Connection timed out
```

**Solution**: 
- Check AWS RDS security group allows your IP address
- Verify VPC settings allow external connections

### Issue 4: Access Denied for User
```
Access denied for user 'admin'@'your-ip'
```

**Solution**: 
- Verify password is correct (Critical#2025)
- Check if password needs URL encoding in .env (# = %23)

### Issue 5: Unknown Database
```
Unknown database 'jointly'
```

**Solution**: 
- Database needs to be created in AWS RDS
- Connect to MySQL and run: `CREATE DATABASE jointly;`

## Alternative: Quick MySQL Connection Test

If you have MySQL client installed:

```bash
mysql -h critical-classes.cnq64ucw4hew.ap-south-1.rds.amazonaws.com -P 3306 -u admin -p
# Enter password: Critical#2025

# Then:
SHOW DATABASES;
USE jointly;
SHOW TABLES;
```

## Database Configuration

Current configuration in `.env`:

```env
DATABASE_URL=mysql+aiomysql://admin:Critical%232025@critical-classes.cnq64ucw4hew.ap-south-1.rds.amazonaws.com:3306/jointly
```

**Connection Details:**
- **Host**: critical-classes.cnq64ucw4hew.ap-south-1.rds.amazonaws.com
- **Port**: 3306
- **Username**: admin
- **Password**: Critical#2025
- **Database**: jointly
- **Driver**: aiomysql (async) / pymysql (sync for Alembic)

## Next Steps After Successful Connection

1. **Run Database Migrations**:
   ```bash
   alembic upgrade head
   ```

2. **Start Backend Server**:
   ```bash
   uvicorn app.main:app --reload
   ```

3. **Test API**:
   - Open: http://localhost:8000/docs
   - Try the auth endpoints

4. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

## Verification Checklist

- [ ] aiomysql package installed
- [ ] Database connection test successful
- [ ] Backend server starts without errors
- [ ] API documentation accessible at /docs
- [ ] Frontend connects to backend
- [ ] Login/Signup working

---

**Need help?** Check the error message from `test_db_connection.py` - it will tell you exactly what's wrong.
