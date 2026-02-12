# Frontend-Backend Integration Setup Guide

## Overview
The frontend (React + TypeScript) is now connected to the FastAPI backend with authentication.

## What's Been Implemented

### Frontend Components Created:

1. **Login Page** (`/login`)
   - Email and password authentication
   - Password visibility toggle
   - Role-based routing (landowner vs professional)
   - Error handling with toast notifications

2. **Signup Page** (`/signup`)
   - Full name, email, password fields
   - Password confirmation validation
   - Minimum 8 character password requirement
   - Automatic role assignment based on user type

3. **API Service** (`src/services/api.ts`)
   - Login endpoint integration
   - Signup endpoint integration
   - Token management (localStorage)
   - Authentication state checking

4. **CTA Section Updates**
   - "Landowner" button → navigates to `/login?type=landowner`
   - "Construction Company" button → navigates to `/login?type=professional`

### Routes Added:
- `/` - Home page
- `/login?type=landowner` - Landowner login
- `/login?type=professional` - Professional/Builder login
- `/signup?type=landowner` - Landowner signup
- `/signup?type=professional` - Professional/Builder signup

## Setup Instructions

### 1. Backend Setup (FastAPI)

```bash
# Navigate to backend directory
cd E:\Jointly

# Install dependencies
pip install -r requirements.txt

# Create .env file with database credentials (already configured)
# DATABASE_URL=mysql+aiomysql://admin:Critical%232025@critical-classes.cnq64ucw4hew.ap-south-1.rds.amazonaws.com:3306/jointly

# Run database migrations
alembic upgrade head

# Start the backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at: `http://localhost:8000`

### 2. Frontend Setup (React + Vite)

```bash
# Navigate to frontend directory
cd E:\Jointly\frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at: `http://localhost:5173` (or similar port)

### 3. Test the Integration

1. **Open the frontend** in your browser
2. **Scroll down** to the "Ready to Build With Confidence?" section
3. **Click "Landowner"** or **"Construction Company"** button
4. You'll be redirected to the login page
5. **Click "Sign up"** if you don't have an account
6. **Fill in the form**:
   - Name: Your full name
   - Email: your@email.com
   - Password: minimum 8 characters
   - Confirm Password: same as password
7. **Click "Create Account"**
8. If successful, you'll be logged in and tokens will be saved

## API Endpoints Used

### Authentication Endpoints:

**POST** `/api/v1/auth/register`
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "LANDOWNER" // or "PROFESSIONAL"
}
```

**POST** `/api/v1/auth/login`
```
Content-Type: application/x-www-form-urlencoded

username=user@example.com&password=password123
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "role": "LANDOWNER",
    "is_active": true
  }
}
```

## Token Management

Tokens are stored in `localStorage`:
- `access_token` - Used for authenticated API requests
- `refresh_token` - Used to refresh expired access tokens

## CORS Configuration

The backend is configured to accept requests from the frontend:
- **Backend**: `http://localhost:8000`
- **Frontend**: `http://localhost:5173`

CORS is set to allow all origins in development (`allow_origins=["*"]` in `app/main.py`)

## Next Steps

1. **Create Dashboard Pages**:
   - `/landowner/dashboard` - Landowner dashboard
   - `/professional/dashboard` - Professional dashboard

2. **Add Protected Routes**:
   - Create a PrivateRoute component to protect authenticated pages
   - Redirect to login if not authenticated

3. **Add Profile Management**:
   - View/edit user profile
   - Logout functionality

4. **Implement Onboarding**:
   - Multi-step onboarding for professionals
   - Property registration for landowners

## Troubleshooting

### CORS Errors
If you see CORS errors, ensure:
1. Backend is running on port 8000
2. Frontend is running on port 5173
3. `VITE_API_URL` in frontend `.env` matches backend URL

### Database Connection Errors
If you see database errors:
1. Check AWS RDS security group allows your IP
2. Verify database credentials in backend `.env`
3. Ensure database `jointly` exists

### Authentication Errors
If login/signup fails:
1. Check backend logs for errors
2. Verify JWT_SECRET_KEY is set in backend `.env`
3. Check network tab in browser DevTools for API response

## File Structure

```
E:\Jointly\
├── app/                          # Backend (FastAPI)
│   ├── api/v1/auth.py           # Auth endpoints
│   ├── services/auth_service.py  # Auth business logic
│   └── main.py                   # FastAPI app with CORS
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx        # Login page
│   │   │   ├── Signup.tsx       # Signup page
│   │   │   └── Index.tsx        # Home page
│   │   ├── services/
│   │   │   └── api.ts           # API service
│   │   ├── components/
│   │   │   └── CTASection.tsx   # CTA with login buttons
│   │   └── App.tsx              # Routes configuration
│   └── .env                      # Frontend environment variables
└── .env                          # Backend environment variables
```

## Environment Variables

### Backend `.env`:
```env
DATABASE_URL=mysql+aiomysql://admin:Critical%232025@critical-classes.cnq64ucw4hew.ap-south-1.rds.amazonaws.com:3306/jointly
JWT_SECRET_KEY=your-secret-key-min-32-chars
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

### Frontend `.env`:
```env
VITE_API_URL=http://localhost:8000
```

## Success Indicators

✅ Backend running on `http://localhost:8000`
✅ Frontend running on `http://localhost:5173`
✅ Clicking CTA buttons navigates to login page
✅ Signup form creates new user in database
✅ Login form authenticates and returns JWT tokens
✅ Tokens saved in localStorage
✅ Toast notifications show success/error messages

---

**Note**: This is a development setup. For production, you'll need to:
- Use HTTPS
- Set proper CORS origins
- Use secure token storage (httpOnly cookies)
- Add rate limiting
- Implement refresh token rotation
