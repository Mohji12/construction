"""
Password hashing utilities using PBKDF2 (more compatible than bcrypt)
"""
import hashlib
import secrets
import base64


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a hashed password
    Format: algorithm$iterations$salt$hash
    """
    try:
        parts = hashed_password.split('$')
        if len(parts) != 4:
            return False
        
        algorithm, iterations, salt_b64, hash_b64 = parts
        iterations = int(iterations)
        salt = base64.b64decode(salt_b64)
        stored_hash = base64.b64decode(hash_b64)
        
        # Hash the provided password with the same salt
        new_hash = hashlib.pbkdf2_hmac(
            algorithm,
            plain_password.encode('utf-8'),
            salt,
            iterations
        )
        
        # Use constant-time comparison
        return secrets.compare_digest(new_hash, stored_hash)
    except Exception:
        return False


def get_password_hash(password: str) -> str:
    """
    Hash a password using PBKDF2-SHA256
    Format: algorithm$iterations$salt$hash
    """
    algorithm = 'sha256'
    iterations = 100000  # OWASP recommended minimum
    salt = secrets.token_bytes(32)
    
    # Hash the password
    password_hash = hashlib.pbkdf2_hmac(
        algorithm,
        password.encode('utf-8'),
        salt,
        iterations
    )
    
    # Encode to base64 for storage
    salt_b64 = base64.b64encode(salt).decode('ascii')
    hash_b64 = base64.b64encode(password_hash).decode('ascii')
    
    return f"{algorithm}${iterations}${salt_b64}${hash_b64}"
