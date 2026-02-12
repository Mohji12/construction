# Jointlly - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Python 3.9+
- Node.js 18+
- MySQL database (AWS RDS configured)

---

## Backend Setup (FastAPI)

```bash
# 1. Navigate to project root
cd E:\Jointly

# 2. Create virtual environment (optional but recommended)
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# 3. Install dependencies
pip install -r requirements.txt

# 4. Environment is already configured (.env file exists)
# DATABASE_URL is set to AWS RDS MySQL

# 5. Run database migrations (if needed)
alembic upgrade head

# 6. Start the backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

✅ Backend running at: **http://localhost:8000**
📚 API Docs at: **http://localhost:8000/docs**

---

## Frontend Setup (React + Vite)

```bash
# 1. Navigate to frontend directory
cd E:\Jointly\frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

✅ Frontend running at: **http://localhost:5173** (or similar)

---

## Test the Authentication Flow

1. **Open browser**: Go to `http://localhost:5173`

2. **Scroll down** to "Ready to Build With Confidence?" section

3. **Click a button**:
   - **"Landowner"** → Login as property owner
   - **"Construction Company"** → Login as builder/professional

4. **Sign up** (if new user):
   - Click "Sign up" link
   - Fill in: Name, Email, Password (min 8 chars), Confirm Password
   - Click "Create Account"

5. **Login** (if existing user):
   - Enter email and password
   - Click "Login"

6. **Success!** 🎉
   - Tokens saved in localStorage
   - Toast notification appears
   - Ready to use the platform

---

## Quick Commands

### Backend
```bash
# Start backend
uvicorn app.main:app --reload

# Create migration
alembic revision --autogenerate -m "description"

# Run migrations
alembic upgrade head

# Check API docs
# Open: http://localhost:8000/docs
```

### Frontend
```bash
# Start frontend
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Troubleshooting

### Port Already in Use
```bash
# Backend (port 8000)
uvicorn app.main:app --reload --port 8001

# Frontend (port 5173)
# Vite will automatically use next available port
```

### Database Connection Error
- Check AWS RDS security group allows your IP
- Verify credentials in `.env` file
- Ensure database `jointly` exists

### CORS Error
- Ensure backend is running on port 8000
- Check `VITE_API_URL` in frontend `.env` matches backend URL

---

## Project Structure

```
E:\Jointly\
├── app/                    # Backend (FastAPI)
│   ├── api/v1/            # API routes
│   ├── models/            # Database models
│   ├── schemas/           # Pydantic schemas
│   ├── services/          # Business logic
│   └── main.py            # FastAPI app
├── frontend/              # Frontend (React)
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   └── services/     # API service
│   └── package.json
├── database_schema.sql    # MySQL schema
└── requirements.txt       # Python dependencies
```

---

## What's Working

✅ User registration (signup)
✅ User login with JWT tokens
✅ Token storage in localStorage
✅ Role-based routing (Landowner vs Professional)
✅ Password validation (min 8 chars)
✅ Email validation
✅ Error handling with toast notifications
✅ Responsive UI with glassmorphism design
✅ Backend connected to AWS RDS MySQL

---

## Next Steps

1. **Create Dashboard Pages**
   - Landowner dashboard
   - Professional dashboard

2. **Add Profile Management**
   - View/edit profile
   - Logout functionality

3. **Implement Features**
   - Property registration
   - Professional onboarding
   - Project matching
   - FAR calculations

---

## Need Help?

- **API Documentation**: http://localhost:8000/docs
- **Backend Logs**: Check terminal running uvicorn
- **Frontend Logs**: Check browser DevTools console
- **Database**: Check `DATABASE_CONNECTION.md` for details

---

**Happy Building! 🏗️**
