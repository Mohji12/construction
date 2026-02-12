# Professional Dashboard - Quick Testing Guide

## Prerequisites

Make sure both backend and frontend are running:

```bash
# Terminal 1 - Backend
cd E:\Jointly
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd E:\Jointly\frontend
npm run dev
```

Open browser: http://localhost:5173

---

## Test Scenarios

### Scenario 1: New Professional Signup

**Steps:**
1. Click the **"Construction Company"** button (with Briefcase/Building icon)
2. Click **"Sign up"** link
3. Fill in the form:
   - Name: Test Professional
   - Email: professional@test.com
   - Password: password123
   - Confirm Password: password123
4. Click **"Create Account"**

**Expected Result:**
- Success toast appears
- Automatically redirected to `/professional/dashboard`
- Dashboard shows 4 service type cards
- Header says "Professional Dashboard"
- Welcome message shows your name

---

### Scenario 2: Existing Professional Login

**Steps:**
1. Click **"Construction Company"** button
2. Enter credentials:
   - Email: professional@test.com
   - Password: password123
3. Click **"Login"**

**Expected Result:**
- Success toast appears
- Redirected to `/professional/dashboard`
- Dashboard displays correctly

---

### Scenario 3: Service Type Cards Display

**Verify each card:**

1. **Contract Construction** (Blue):
   - Icon: Building
   - Description mentions "legal agreements" and "quality standards"
   
2. **JV/JD Developer** (Teal):
   - Icon: Handshake
   - Description mentions "joint ventures" and "manage capital"
   
3. **Interior Architect / Designer** (Purple):
   - Icon: Palette
   - Description mentions "interior spaces" and "functionality"
   
4. **Reconstruction / Repair / Painting** (Orange):
   - Icon: Wrench
   - Description mentions "repair, renovation, painting"

**Test hover effects:**
- Hover over each card
- Card should scale up slightly
- Glow effect should appear
- Smooth animations

---

### Scenario 4: Contract Construction Onboarding

**Steps:**
1. From dashboard, click **"Contract Construction"** card

**Expected Result:**
- Navigate to `/professional/onboarding/contract-construction`
- Page shows "Coming Soon!" with rocket icon
- Badge shows "Contract Construction"
- Description explains contract construction
- **8 onboarding steps listed**:
  1. Company information and licenses
  2. Business entity type and office location
  3. Project capabilities
  4. Experience and portfolio
  5. Team structure
  6. Typical project size
  7. Indicative pricing
  8. Preferred locations
- "How Contract Finalization Works" section shown
- "Back to Dashboard" button present

---

### Scenario 5: JV/JD Developer Onboarding

**Steps:**
1. From dashboard, click **"JV/JD Developer"** card

**Expected Result:**
- Navigate to `/professional/onboarding/jv-jd`
- Badge shows "JV/JD Developer"
- Description explains joint venture model
- **10 onboarding steps listed**:
  1. Company information and RERA registration
  2. Business entity type and office location
  3. Project capabilities
  4. RERA project count
  5. Project wallet size
  6. Last 3 completed projects
  7. Preferred locations with radius
  8. Workforce capacity
  9. JV/JD arrangement preferences
  10. Team structure

---

### Scenario 6: Interior Designer Onboarding

**Steps:**
1. From dashboard, click **"Interior Architect / Designer"** card

**Expected Result:**
- Navigate to `/professional/onboarding/interior`
- Badge shows "Interior Architect / Designer"
- Description explains interior design services
- **7 onboarding steps listed**:
  1. Company or sole proprietorship details
  2. Years of business operation
  3. Office or physical address
  4. Types of projects undertaken
  5. Last 3 completed projects
  6. Tentative pricing for different sizes
  7. Preferred project locations

---

### Scenario 7: Reconstruction/Repair Onboarding

**Steps:**
1. From dashboard, click **"Reconstruction / Repair / Painting"** card

**Expected Result:**
- Navigate to `/professional/onboarding/reconstruction`
- Badge shows "Reconstruction / Repair / Painting"
- Description explains repair and renovation
- **10 onboarding steps listed**:
  1. Company details and business entity
  2. Licenses and registrations
  3. Registered office address
  4. Project capabilities
  5. Total projects completed
  6. Portfolio with images
  7. Team structure
  8. Typical project size
  9. Work type preferences
  10. Tentative pricing

---

### Scenario 8: Back Navigation

**Steps:**
1. Click any service type card
2. On Coming Soon page, click **"Back to Dashboard"** button

**Expected Result:**
- Returns to `/professional/dashboard`
- All 4 cards still visible and functional
- No errors in console

---

### Scenario 9: Protected Route Test

**Steps:**
1. From dashboard, click **"Logout"**
2. Manually navigate to: http://localhost:5173/professional/dashboard

**Expected Result:**
- Automatically redirected to `/login` page
- Cannot access dashboard without login

---

### Scenario 10: Role Protection Test

**Steps:**
1. Logout if logged in
2. Login as **LANDOWNER** (use landowner@test.com if you have one)
3. Manually navigate to: http://localhost:5173/professional/dashboard

**Expected Result:**
- Redirected to home page
- Only PROFESSIONAL role can access professional dashboard

---

### Scenario 11: Responsive Design Test

**Steps:**
1. From professional dashboard
2. Resize browser window to mobile size (375px width)

**Expected Result:**
- Cards stack vertically (1 column)
- Text remains readable
- Buttons are accessible
- No horizontal scroll

**Desktop (1920px width):**
- Cards in 2x2 grid
- Proper spacing between cards
- All content visible

---

## Checklist

Use this to verify everything works:

- [ ] Can signup as professional
- [ ] Can login as professional
- [ ] Dashboard shows "Professional Dashboard" subtitle
- [ ] Dashboard displays 4 service cards
- [ ] Card colors are correct (Blue, Teal, Purple, Orange)
- [ ] Card icons are correct (Building, Handshake, Palette, Wrench)
- [ ] Card hover animations work
- [ ] Contract Construction navigation works
- [ ] JV/JD Developer navigation works
- [ ] Interior Designer navigation works
- [ ] Reconstruction/Repair navigation works
- [ ] Coming Soon pages show correct service names
- [ ] Coming Soon pages show correct step counts
- [ ] "How it Works" section displays
- [ ] Back button works from all Coming Soon pages
- [ ] Logout works
- [ ] Cannot access dashboard when logged out
- [ ] Cannot access dashboard as landowner
- [ ] No console errors
- [ ] Responsive on mobile and desktop

---

## Common Issues & Fixes

### Issue: "Network Error" when logging in
**Fix**: Ensure backend is running on port 8000
```bash
cd E:\Jointly
uvicorn app.main:app --reload
```

### Issue: Can't see service cards
**Fix**: Check browser console for import errors. Verify files exist:
- `frontend/src/pages/professional/Dashboard.tsx`
- `frontend/src/pages/professional/ComingSoon.tsx`

### Issue: Wrong role after login
**Fix**: Check localStorage in DevTools (F12 → Application tab):
- Should have `user_role: PROFESSIONAL`
- If wrong, logout and signup again with "Construction Company" button

### Issue: Cards not animating
**Fix**: Verify Framer Motion is installed:
```bash
cd frontend
npm install framer-motion
```

### Issue: Coming Soon page shows wrong info
**Fix**: Check the URL - service type is in the URL path:
- `/professional/onboarding/contract-construction`
- `/professional/onboarding/jv-jd`
- `/professional/onboarding/interior`
- `/professional/onboarding/reconstruction`

---

## Browser DevTools Checks

### LocalStorage (Application tab)
After successful login, should see:
```
access_token: eyJ0eXAiOiJKV1QiLC...
refresh_token: eyJ0eXAiOiJKV1QiLC...
user_role: PROFESSIONAL
```

### Console (Console tab)
Should see no errors. Successful signup shows:
```
Signup request data: {email: "...", name: "...", role: "PROFESSIONAL", ...}
```

### Network (Network tab)
Successful requests:
- POST `/api/v1/auth/register` → 201 Created
- POST `/api/v1/auth/login` → 200 OK

---

## Screenshots to Verify

### Professional Dashboard
- Header: "Jointlly" logo, "Professional Dashboard" subtitle, "Logout" button
- Welcome: "Welcome back, [Name]"
- Subtitle: "Select your area of expertise"
- Section: "Select Your Area of Work"
- 4 cards in 2x2 grid with proper colors and icons

### Coming Soon Pages
- Rocket icon at top
- "Coming Soon!" heading
- Service type badge (colored)
- Service description paragraph
- "Your Onboarding Process" section
- Numbered list of steps (7-10 steps depending on service)
- "How Contract Finalization Works" section
- Two buttons: "Back to Dashboard" and "Notify Me When Ready"

---

## Quick Test Script

Run through this in 5 minutes:

1. **Signup** as professional → Should redirect to dashboard
2. **Hover** over all 4 cards → Should see animations
3. **Click** Contract Construction → Should see 8 steps
4. **Click** Back → Should return to dashboard
5. **Click** JV/JD Developer → Should see 10 steps
6. **Click** Back → Should return to dashboard
7. **Click** Logout → Should go to home page
8. Try accessing `/professional/dashboard` → Should redirect to login

**If all 8 steps work, you're good to go!**

---

## Next Development Phase

After confirming everything works:

1. **Implement Contract Construction Form**
   - Company details input
   - License upload fields
   - Portfolio image gallery
   - Pricing calculator

2. **Implement JV/JD Developer Form**
   - RERA verification
   - Wallet size selector
   - Project showcase (last 3)
   - Location picker with radius

3. **Backend Integration**
   - Connect to professional onboarding APIs
   - File upload to cloud storage
   - Profile save and update

4. **Profile Management**
   - View/edit profile
   - Upload documents
   - Track verification status

---

**Happy Testing!**
