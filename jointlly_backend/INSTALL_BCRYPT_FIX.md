# Fix bcrypt Installation Error

## The Problem

The error `ValueError: password cannot be longer than 72 bytes` is actually a **bcrypt initialization error**, not a password length issue. It occurs because:

1. `passlib[bcrypt]` is installed but the actual `bcrypt` library is missing or broken
2. When passlib tries to initialize bcrypt backend, it fails

## The Solution

You need to **manually install bcrypt**. Here's how:

---

## Step 1: Stop the Backend Server

Press `Ctrl+C` in the terminal running uvicorn to stop the server.

---

## Step 2: Install bcrypt

Run these commands in order:

```bash
# Uninstall any existing bcrypt installations
pip uninstall bcrypt -y

# Install bcrypt fresh
pip install bcrypt

# Verify it's installed
python -c "import bcrypt; print('bcrypt version:', bcrypt.__version__)"
```

**Expected output:**
```
bcrypt version: 4.x.x
```

---

## Step 3: Restart the Backend

```bash
uvicorn app.main:app --reload
```

---

## Step 4: Add name Column to Database

While the server is starting, you also need to fix the database:

```bash
# Connect to MySQL
mysql -h critical-classes.cnq64ucw4hew.ap-south-1.rds.amazonaws.com -P 3306 -u admin -p
# Password: Critical#2025

# Add the name column
USE jointly;
ALTER TABLE users ADD COLUMN name VARCHAR(255) NOT NULL DEFAULT 'User' AFTER email;
EXIT;
```

---

## Step 5: Test Signup

1. Go to http://localhost:5173
2. Click "Landowner" button
3. Click "Sign up"
4. Fill in the form:
   - **Name**: Test User
   - **Email**: test@example.com
   - **Password**: password123
   - **Confirm Password**: password123
5. Click "Create Account"

**It should work now!** ✅

---

## Alternative: Use SHA256 Instead of bcrypt (Temporary)

If bcrypt installation is still problematic, you can temporarily use SHA256 (less secure but will work):

Edit `E:\Jointly\app\utils\password.py`:

```python
"""
Password hashing utilities
"""
import hashlib
import secrets


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a hashed password
    """
    password_hash = hashlib.sha256(plain_password.encode()).hexdigest()
    return secrets.compare_digest(password_hash, hashed_password)


def get_password_hash(password: str) -> str:
    """
    Hash a password using SHA256
    """
    return hashlib.sha256(password.encode()).hexdigest()
```

**Note:** This is less secure than bcrypt. Use only for development/testing!

---

## Common Issues

### Issue: "pip install bcrypt" fails with compiler error

**Windows Solution:**
```bash
pip install --upgrade pip setuptools wheel
pip install bcrypt --only-binary :all:
```

### Issue: bcrypt installs but error persists

**Solution:**
```bash
pip uninstall passlib bcrypt -y
pip install passlib bcrypt
```

### Issue: Still getting the error

**Nuclear Option - Reinstall Everything:**
```bash
pip uninstall passlib bcrypt -y
pip cache purge
pip install bcrypt==4.1.2
pip install passlib[bcrypt]==1.7.4
```

---

## What You Need to Do Right Now

**Quick Steps:**

1. **Stop the server** (Ctrl+C)
2. **Run**: `pip install bcrypt`
3. **Verify**: `python -c "import bcrypt; print('OK')"`
4. **Restart server**: `uvicorn app.main:app --reload`
5. **Add database column** (see Step 4 above)
6. **Test signup**

Once these steps are complete, signup will work! 🎉
