# Landowner Workflow Documentation

## Complete Workflow Overview

This document describes the complete workflow for landowners/property owners in the Jointly Real Estate Platform, from registration to project publishing and professional matching.

---

## Phase 1: Registration & Authentication

### Step 1.1: User Registration
**Endpoint:** `POST /api/v1/auth/register`

**Request:**
```json
{
  "email": "landowner@example.com",
  "password": "securepassword123",
  "role": "LANDOWNER"
}
```

**Response:** User account created with role `LANDOWNER`

### Step 1.2: Login
**Endpoint:** `POST /api/v1/auth/login`

**Request:**
```json
{
  "email": "landowner@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

**Note:** Use `access_token` in `Authorization: Bearer <token>` header for all subsequent requests.

---

## Phase 2: Profile Setup

### Step 2.1: Create Landowner Profile
**Endpoint:** `POST /api/v1/landowners/profile`

**Request:**
```json
{
  "name": "John Doe",
  "phone": "+91-9876543210",
  "city": "Bangalore"
}
```

**Response:** Landowner profile created with UUID

### Step 2.2: Update Profile (Optional)
**Endpoint:** `PUT /api/v1/landowners/profile`

**Request:**
```json
{
  "name": "John Doe Updated",
  "phone": "+91-9876543211",
  "city": "Bengaluru"
}
```

---

## Phase 3: Property Management

### Step 3.1: Create Property
**Endpoint:** `POST /api/v1/landowners/properties`

**Request:**
```json
{
  "name": "My Property",
  "city": "Bangalore",
  "ward": "Ward 123",
  "landmark": "Near Metro Station",
  "google_maps_pin": "https://maps.google.com/...",
  "width_ft": 30.0,
  "length_ft": 40.0,
  "facing": "North",
  "is_corner_plot": false,
  "facings": null,
  "road_width_ft": 40.0,
  "khatha_type": "A Khatha",
  "e_khatha_status": "Active",
  "tax_paid": true,
  "pid_number": "PID123456789"
}
```

**Response:** Property created with UUID

**Note:** 
- For corner plots, set `is_corner_plot: true` and provide `facings: ["North", "East"]`
- `road_width_ft` is required for FAR calculations
- `pid_number` is optional for Contract Construction but mandatory for JV/JD

### Step 3.2: List Properties
**Endpoint:** `GET /api/v1/landowners/properties`

**Response:** Array of all properties owned by the landowner

### Step 3.3: Get Property Details
**Endpoint:** `GET /api/v1/landowners/properties/{property_id}`

---

## Phase 4: Project Creation

### Step 4.1: Select Project Type

The system supports 4 project types:

1. **CONTRACT_CONSTRUCTION** - "I am planning to construct a property and need a professional team"
2. **JV_JD** - "I own land and want to explore joint venture or joint development opportunities"
3. **INTERIOR** - "I am seeking an interior architecture or design professional"
4. **RECONSTRUCTION** - "I want to repair, renovate, or improve my existing property"

### Step 4.2: Create Project
**Endpoint:** `POST /api/v1/landowners/projects`

**Request:**
```json
{
  "property_id": "uuid-of-property",
  "project_type": "CONTRACT_CONSTRUCTION",
  "intent": "RESIDENTIAL",
  "timeline": "Within 3 months",
  "scope": "Complete construction of duplex house"
}
```

**Response:** Project created with status `DRAFT`

**Project Types & Required Fields:**

#### CONTRACT_CONSTRUCTION
- Property details (required)
- FAR calculation (free)
- PID verification (optional, ₹1,999-₹2,999)
- Project intent (residential/commercial/industrial)
- Timeline

#### JV_JD (Joint Venture/Joint Development)
- Property details (required)
- PID verification (MANDATORY, ₹1,999-₹2,999)
- FAR calculation (required)
- Feasibility report (free basic, detailed requires payment ₹999-₹3,999)
- JV preferences (post-construction expectation, development vision)

#### INTERIOR
- Building type
- Location
- Project scope (complete end-to-end or specific needs)
- Timeline

#### RECONSTRUCTION
- Property type
- Location
- Scope of work (repair, add floor, repaint, flooring, etc.)
- Timeline

---

## Phase 5: FAR Calculation (Free)

### Step 5.1: Calculate FAR
**Endpoint:** `POST /api/v1/projects/{project_id}/calculate-far`

**Request:**
```json
{
  "road_width_ft": 40.0,
  "zone_type": "Residential"
}
```

**Response:**
```json
{
  "id": "uuid",
  "property_id": "uuid",
  "road_width_ft": 40.0,
  "zone_type": "Residential",
  "calculated_far": 2.5,
  "total_buildable_area": 3000.0,
  "created_at": "2026-01-25T10:00:00"
}
```

**FAR Calculation Logic:**
- Based on road width and zone type (Bengaluru rules)
- Road width < 30 ft: FAR ~1.5-2.0
- Road width 30-40 ft: FAR ~2.0-2.5
- Road width 40-60 ft: FAR ~2.5-3.0
- Road width > 60 ft: FAR ~3.0-3.25

### Step 5.2: Get FAR Calculation
**Endpoint:** `GET /api/v1/projects/{project_id}/far`

---

## Phase 6: PID Verification (Optional/Mandatory)

### Step 6.1: Request PID Verification
**Endpoint:** `POST /api/v1/projects/{project_id}/verify-pid`

**Request:**
```json
{
  "pid_number": "PID123456789"
}
```

**Response:**
```json
{
  "id": "uuid",
  "property_id": "uuid",
  "pid_number": "PID123456789",
  "verification_status": "PENDING",
  "verification_fee": 1999.0,
  "created_at": "2026-01-25T10:00:00"
}
```

**Business Rules:**
- **Optional** for CONTRACT_CONSTRUCTION
- **Mandatory** for JV_JD projects
- Fee: ₹1,999 - ₹2,999
- Status: PENDING → VERIFIED/FAILED

**Note:** Integration with BBMPTAX.KARNATAKA.GOV.IN API is placeholder (TODO)

---

## Phase 7: Feasibility Report (Free Basic / Paid Detailed)

### Step 7.1: Generate Feasibility Report
**Endpoint:** `POST /api/v1/projects/{project_id}/feasibility`

**Prerequisites:** FAR calculation must exist

**Response:**
```json
{
  "id": "uuid",
  "property_id": "uuid",
  "plot_category": "150-250 sq m",
  "front_setback_m": 1.0,
  "rear_setback_m": 0.8,
  "side_setback_m": 0.8,
  "net_buildable_area_sqft": 1883.37,
  "allowed_floors": 5,
  "total_built_up_area_sqft": 4800.0,
  "saleable_area_sqft": 3600.0,
  "number_of_units": 4,
  "is_unlocked": false,
  "created_at": "2026-01-25T10:00:00"
}
```

**Setback Rules Applied (BBMP Jan 5, 2026):**
- ≤60 sq m: Front 0.7m, Sides 0.6m each, Rear eliminated
- 60-150 sq m: Front 0.9m, Rear 0.7m, One side 0.7m
- 150-250 sq m: Front 1m, Rear 0.8m, Sides 0.8m each
- >250 sq m: 12% front, 8% rear/sides
- >4000 sq m: Minimum 5m all sides

### Step 7.2: Unlock Detailed Feasibility Report (Paid)
**Endpoint:** `POST /api/v1/payments/create-order`

**Request:**
```json
{
  "amount": 1999.0,
  "transaction_type": "FEASIBILITY_UNLOCK",
  "project_id": "uuid-of-project",
  "currency": "INR"
}
```

**Response:** Razorpay order details for payment

After payment verification, the feasibility report is automatically unlocked.

### Step 7.3: Get Feasibility Report
**Endpoint:** `GET /api/v1/projects/{project_id}/feasibility`

**Note:** If payment is successful, report is automatically unlocked and full details are returned.

---

## Phase 8: JV/JD Preferences (For JV_JD Projects Only)

### Step 8.1: Set JV Preferences
**Endpoint:** `POST /api/v1/landowners/projects/{project_id}/jv-preferences`

**Request:**
```json
{
  "post_construction_expectation": "BUILT_UP_AREA_SHARING",
  "development_vision": "Build a 4-floor apartment complex with 6 units"
}
```

**Options:**
- `post_construction_expectation`: `BUILT_UP_AREA_SHARING` or `REVENUE_SHARING`
- `development_vision`: Free text describing development plans

---

## Phase 9: Project Publishing & Matching

### Step 9.1: Publish Project
**Endpoint:** `POST /api/v1/landowners/projects/{project_id}/publish`

**Prerequisites:**
- For JV_JD: PID verification must be VERIFIED
- Property details must be complete
- Project must be in DRAFT status

**What Happens:**
1. Validates project requirements
2. Changes project status from `DRAFT` to `PUBLISHED`
3. **Automatically triggers matching engine** to find suitable professionals
4. Professionals are scored and ranked based on:
   - Project type match (20%)
   - Location compatibility (25%)
   - Project size match (15%)
   - Pricing compatibility (15%)
   - Capability match (15%)
   - Verification level (10%)

**Response:** Published project with status `PUBLISHED`

### Step 9.2: View Matched Professionals
**Endpoint:** `GET /api/v1/matching/projects/{project_id}/matches`

**Response:**
```json
[
  {
    "id": "match-uuid",
    "project_id": "project-uuid",
    "professional_id": "professional-uuid",
    "match_score": 0.85,
    "status": "PENDING",
    "match_score_details": {
      "project_type_score": 1.0,
      "location_score": 0.9,
      "project_size_score": 0.8,
      "pricing_score": 0.75,
      "capability_score": 1.0,
      "verification_score": 0.7,
      "total_score": 0.85
    },
    "created_at": "2026-01-25T10:00:00"
  }
]
```

**Note:** Matches are sorted by `match_score` (highest first)

### Step 9.3: Accept/Reject Matches
**Endpoint:** `POST /api/v1/matching/matches/{match_id}/accept`
**Endpoint:** `POST /api/v1/matching/matches/{match_id}/reject`

---

## Phase 10: Payment Workflow (Optional Services)

### Step 10.1: Create Payment Order
**Endpoint:** `POST /api/v1/payments/create-order`

**Transaction Types:**
- `PID_VERIFICATION`: ₹1,999 - ₹2,999
- `FEASIBILITY_UNLOCK`: ₹999 - ₹3,999
- `PRIORITY_LISTING`: Variable pricing

**Request:**
```json
{
  "amount": 1999.0,
  "transaction_type": "PID_VERIFICATION",
  "project_id": "uuid",
  "currency": "INR"
}
```

**Response:**
```json
{
  "transaction_id": "uuid",
  "order_id": "order_razorpay123",
  "amount": 1999.0,
  "currency": "INR",
  "razorpay_key_id": "rzp_test_dummy1234567890"
}
```

### Step 10.2: Verify Payment
**Endpoint:** `POST /api/v1/payments/verify`

**Request:**
```json
{
  "transaction_id": "uuid",
  "razorpay_payment_id": "pay_razorpay123",
  "razorpay_signature": "signature_hash"
}
```

**What Happens:**
- Payment signature is verified
- Transaction status updated to `SUCCESS`
- If `FEASIBILITY_UNLOCK`: Report is automatically unlocked
- If `PID_VERIFICATION`: Verification process initiated

### Step 10.3: View Transaction History
**Endpoint:** `GET /api/v1/payments/transactions`

---

## Complete Workflow Summary

### For CONTRACT_CONSTRUCTION:
1. Register & Login
2. Create Profile
3. Create Property (with dimensions, road width)
4. Create Project (type: CONTRACT_CONSTRUCTION)
5. Calculate FAR (free)
6. (Optional) Verify PID (paid)
7. Publish Project → Automatic matching

### For JV_JD:
1. Register & Login
2. Create Profile
3. Create Property (with PID number)
4. Create Project (type: JV_JD)
5. Calculate FAR (free)
6. **Verify PID (MANDATORY, paid)**
7. Generate Feasibility Report (free basic)
8. (Optional) Unlock Detailed Feasibility (paid)
9. Set JV Preferences
10. Publish Project → Automatic matching

### For INTERIOR:
1. Register & Login
2. Create Profile
3. Create Property (location details)
4. Create Project (type: INTERIOR, scope details)
5. Publish Project → Automatic matching

### For RECONSTRUCTION:
1. Register & Login
2. Create Profile
3. Create Property (location, existing structure details)
4. Create Project (type: RECONSTRUCTION, scope of work)
5. Publish Project → Automatic matching

---

## API Endpoints Summary

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/v1/auth/register` | POST | Register new user | No |
| `/api/v1/auth/login` | POST | Login and get tokens | No |
| `/api/v1/auth/me` | GET | Get current user | Yes |
| `/api/v1/landowners/profile` | POST/GET/PUT | Profile management | Yes (LANDOWNER) |
| `/api/v1/landowners/properties` | POST/GET | Property CRUD | Yes (LANDOWNER) |
| `/api/v1/landowners/properties/{id}` | GET | Get property | Yes (LANDOWNER) |
| `/api/v1/landowners/projects` | POST | Create project | Yes (LANDOWNER) |
| `/api/v1/landowners/projects/{id}` | GET | Get project | Yes (LANDOWNER) |
| `/api/v1/landowners/projects/{id}/publish` | POST | Publish project | Yes (LANDOWNER) |
| `/api/v1/landowners/projects/{id}/jv-preferences` | POST | Set JV preferences | Yes (LANDOWNER) |
| `/api/v1/projects/{id}/calculate-far` | POST | Calculate FAR | Yes (LANDOWNER) |
| `/api/v1/projects/{id}/far` | GET | Get FAR calculation | Yes |
| `/api/v1/projects/{id}/feasibility` | POST/GET | Feasibility report | Yes |
| `/api/v1/projects/{id}/verify-pid` | POST | Request PID verification | Yes (LANDOWNER) |
| `/api/v1/payments/create-order` | POST | Create payment order | Yes |
| `/api/v1/payments/verify` | POST | Verify payment | Yes |
| `/api/v1/payments/transactions` | GET | Transaction history | Yes |
| `/api/v1/matching/projects/{id}/matches` | GET | Get matched professionals | Yes |
| `/api/v1/matching/matches/{id}/accept` | POST | Accept match | Yes |
| `/api/v1/matching/matches/{id}/reject` | POST | Reject match | Yes |

---

## Data Flow Diagram

```
Registration → Login → Profile Creation
    ↓
Property Creation (with dimensions, location, PID)
    ↓
Project Creation (select type: CONTRACT/JV_JD/INTERIOR/RECONSTRUCTION)
    ↓
FAR Calculation (free, based on road width)
    ↓
[Optional] PID Verification (paid, mandatory for JV_JD)
    ↓
Feasibility Report Generation (free basic, paid detailed)
    ↓
[For JV_JD] Set JV Preferences
    ↓
Publish Project
    ↓
Automatic Matching Engine (scores professionals)
    ↓
View Matched Professionals (ranked by score)
    ↓
Accept/Reject Matches
```

---

## Business Rules

1. **PID Verification:**
   - Optional for CONTRACT_CONSTRUCTION
   - Mandatory for JV_JD (enforced at publish)

2. **FAR Calculation:**
   - Always free
   - Required before feasibility report

3. **Feasibility Report:**
   - Basic metrics: Free
   - Detailed report: Paid (₹999-₹3,999)
   - Auto-unlocks after successful payment

4. **Project Publishing:**
   - Status changes: DRAFT → PUBLISHED
   - Automatically triggers matching
   - JV_JD requires verified PID

5. **Matching:**
   - Automatic on publish
   - Scoring algorithm with weighted factors
   - Results sorted by match score

---

## Example Complete Flow (JV_JD)

```bash
# 1. Register
POST /api/v1/auth/register
{ "email": "owner@example.com", "password": "pass123", "role": "LANDOWNER" }

# 2. Login
POST /api/v1/auth/login
{ "email": "owner@example.com", "password": "pass123" }
# → Get access_token

# 3. Create Profile
POST /api/v1/landowners/profile
Headers: Authorization: Bearer <token>
{ "name": "John Doe", "phone": "+91-9876543210", "city": "Bangalore" }

# 4. Create Property
POST /api/v1/landowners/properties
{ "city": "Bangalore", "width_ft": 30, "length_ft": 40, "road_width_ft": 40, "pid_number": "PID123" }

# 5. Create Project
POST /api/v1/landowners/projects
{ "property_id": "<property-uuid>", "project_type": "JV_JD", "intent": "RESIDENTIAL" }

# 6. Calculate FAR
POST /api/v1/projects/<project-id>/calculate-far
{ "road_width_ft": 40, "zone_type": "Residential" }

# 7. Verify PID (Mandatory for JV_JD)
POST /api/v1/projects/<project-id>/verify-pid
{ "pid_number": "PID123" }

# 8. Create Payment Order for PID
POST /api/v1/payments/create-order
{ "amount": 1999, "transaction_type": "PID_VERIFICATION", "project_id": "<project-id>" }

# 9. Verify Payment (after Razorpay payment)
POST /api/v1/payments/verify
{ "transaction_id": "<txn-id>", "razorpay_payment_id": "...", "razorpay_signature": "..." }

# 10. Generate Feasibility Report
POST /api/v1/projects/<project-id>/feasibility

# 11. Set JV Preferences
POST /api/v1/landowners/projects/<project-id>/jv-preferences
{ "post_construction_expectation": "BUILT_UP_AREA_SHARING", "development_vision": "..." }

# 12. Publish Project (triggers matching)
POST /api/v1/landowners/projects/<project-id>/publish

# 13. View Matches
GET /api/v1/matching/projects/<project-id>/matches
```

---

## Notes

- All UUIDs are returned in responses and should be used for subsequent API calls
- JWT tokens expire after 30 minutes (configurable)
- Use refresh token to get new access token
- All timestamps are in UTC
- Property dimensions can be provided as standard sizes (30×40, 20×30, etc.) or custom
- Matching happens automatically on publish - no manual trigger needed
- Professionals can view and accept/reject matches from their side
