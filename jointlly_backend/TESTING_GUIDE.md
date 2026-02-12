# Landowner Dashboard - Testing Guide

## Quick Start

### 1. Make Sure Backend is Running
```bash
# In terminal 1
cd E:\Jointly
uvicorn app.main:app --reload
```

### 2. Start Frontend
```bash
# In terminal 2
cd E:\Jointly\frontend
npm run dev
```

### 3. Open Browser
Go to: http://localhost:5173

---

## Test Scenarios

### Scenario 1: New Landowner Signup

**Steps:**
1. Click the **"Landowner"** button (with User icon)
2. Click **"Sign up"** link
3. Fill in the form:
   - Name: Test Landowner
   - Email: landowner@test.com
   - Password: password123
   - Confirm Password: password123
4. Click **"Create Account"**

**Expected Result:**
- Success toast appears
- Automatically redirected to `/landowner/dashboard`
- Dashboard shows 4 project type cards
- Welcome message shows your name

### Scenario 2: Existing Landowner Login

**Steps:**
1. Click **"Landowner"** button
2. Enter credentials:
   - Email: landowner@test.com
   - Password: password123
3. Click **"Login"**

**Expected Result:**
- Success toast appears
- Redirected to `/landowner/dashboard`

### Scenario 3: Explore Project Types

**Steps:**
1. From dashboard, hover over each card
2. Notice the animations (scale, glow)
3. Click **"Contract Construction"** card

**Expected Result:**
- Card animates on hover
- Navigate to `/landowner/project/contract-construction`
- Coming Soon page displays
- Shows list of expected features for Contract Construction

### Scenario 4: Test All Project Types

**Click each card and verify:**

1. **Contract Construction** (Blue):
   - Features: Property details, FAR calculation, PID verification, etc.
   
2. **JV/JD** (Teal):
   - Features: Property verification, JV preferences, feasibility reports, etc.
   
3. **Interior Design** (Purple):
   - Features: Building type, scope definition, designer matching, etc.
   
4. **Reconstruction** (Orange):
   - Features: Property type, scope definition, specialist matching, etc.

### Scenario 5: Navigation Test

**Steps:**
1. Click any project card
2. Click **"Back to Dashboard"** button
3. Click a different project card
4. Click **"Back to Dashboard"** again

**Expected Result:**
- Smooth navigation between pages
- No errors in console
- Dashboard state preserved

### Scenario 6: Logout Test

**Steps:**
1. From dashboard, click **"Logout"** (top right)

**Expected Result:**
- Redirected to home page
- Tokens cleared from localStorage

### Scenario 7: Protected Route Test

**Steps:**
1. After logout, manually navigate to: http://localhost:5173/landowner/dashboard

**Expected Result:**
- Automatically redirected to `/login` page
- URL shows login page

### Scenario 8: Role Protection Test

**Steps:**
1. Logout if logged in
2. Signup/Login as **"Construction Company"** (PROFESSIONAL role)
3. Manually navigate to: http://localhost:5173/landowner/dashboard

**Expected Result:**
- Redirected to home page (not authorized)

---

## Checklist

Use this checklist to verify everything works:

- [ ] Backend server running on port 8000
- [ ] Frontend running on port 5173
- [ ] Can signup as landowner
- [ ] Can login as landowner
- [ ] Dashboard displays 4 cards
- [ ] Card hover animations work
- [ ] All 4 project types navigate correctly
- [ ] Coming Soon pages show correct features
- [ ] Back button works from all pages
- [ ] Logout works
- [ ] Cannot access dashboard when logged out
- [ ] Cannot access dashboard with wrong role
- [ ] No console errors
- [ ] Mobile responsive (resize browser)

---

## Common Issues & Solutions

### Issue: "Network Error" or "Failed to fetch"
**Solution**: Make sure backend is running on port 8000
```bash
cd E:\Jointly
uvicorn app.main:app --reload
```

### Issue: Dashboard shows but no cards
**Solution**: Check browser console for errors, likely a component import issue

### Issue: Redirected to home after login
**Solution**: User role might not be saved. Check localStorage in DevTools:
- Should have: `access_token`, `refresh_token`, `user_role`

### Issue: Can access dashboard without login
**Solution**: ProtectedRoute might not be wrapping the route correctly in App.tsx

### Issue: Cards not animating
**Solution**: Framer Motion might not be installed:
```bash
cd frontend
npm install framer-motion
```

---

## Verify in Browser DevTools

### 1. Check LocalStorage (Application tab)
After successful login, should see:
```
access_token: eyJ0eXAiOiJKV1QiLC...
refresh_token: eyJ0eXAiOiJKV1QiLC...
user_role: LANDOWNER
```

### 2. Check Console (Console tab)
Should see:
```
Signup request data: {email: "...", name: "...", role: "LANDOWNER", ...}
```

No errors should appear

### 3. Check Network (Network tab)
Successful requests:
- POST /api/v1/auth/register → 201 Created
- POST /api/v1/auth/login → 200 OK

---

## Screenshots to Verify

### 1. Home Page
- Two large buttons: "Landowner" and "Construction Company"

### 2. Login Page
- Email and password fields
- "Sign up" link at bottom

### 3. Signup Page
- Name, email, password, confirm password fields
- "Login" link at bottom

### 4. Landowner Dashboard
- Header with "Jointlly" logo and "Logout" button
- Welcome message with user name
- 4 project type cards in 2x2 grid (desktop)
- Each card has icon, title, description, "Get Started" button

### 5. Coming Soon Page
- Rocket icon
- "Coming Soon!" heading
- Project type badge
- List of expected features
- "Back to Dashboard" and "Notify Me" buttons

---

## Success Indicators

✅ You've successfully tested everything when:
1. You can signup and login as landowner
2. Dashboard displays all 4 cards
3. Clicking cards navigates correctly
4. Back navigation works
5. Logout works
6. Protected routes prevent unauthorized access
7. No console errors

---

## Next Development Steps

After confirming everything works, the next phase involves:

1. **Implement Contract Construction Form**
   - Multi-step wizard with property details
   - FAR calculation logic
   - PID verification integration

2. **Implement JV/JD Form**
   - Property verification flow
   - JV preferences selection
   - Feasibility calculations

3. **Add Professional Dashboard**
   - Similar structure for professionals
   - Onboarding workflow
   - Profile management

4. **Integrate Payment System**
   - Razorpay integration
   - Priority listing purchases
   - Verification payment flows

---

**Happy Testing!** 🚀
