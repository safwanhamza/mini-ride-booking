# 📘 API Documentation - Mini Ride Booking System

This document outlines and explains in detail all the RESTful API endpoints available in the **Mini Ride Booking System** backend. This system is developed using **Node.js**, **Express.js**, and **SQLite** on the backend, and consumed through a modern React frontend powered by Vite. The API enables communication between passengers and drivers for tasks like registration, authentication, requesting rides, managing driver availability, and tracking ride status updates.

All responses are formatted in `application/json` and the majority of endpoints are protected by **JWT-based authentication**, with access roles enforced through middleware.

---

## 🛠️ Base URL

```
http://localhost:3000
```

This is the root address for all backend endpoints in the development environment.

---

## 🔐 Authentication Endpoints

These endpoints allow new users to register or existing users to authenticate and receive a token to access protected resources.

### ➕ Register User

```
POST /auth/register
```

Registers a new user into the system as either a **passenger** or **driver**.

#### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "type": "passenger" // or "driver"
}
```

#### Response (201 Created)

```json
{
  "message": "User registered successfully",
  "token": "<JWT_TOKEN>"
}
```

> The token is used for authenticating future API calls. Save this securely.

### 🔑 Login User

```
POST /auth/login
```

Authenticates a user and returns a JWT token.

#### Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

#### Response (200 OK)

```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

---

## 👤 User Endpoints

Endpoints to manage driver-specific features, such as setting availability.

### 🔄 Toggle Driver Availability

```
PATCH /users/availability
```

> Requires: Authorization header with a valid JWT and driver role.

Toggles the current driver's availability status between `available` and `unavailable`.

#### Response (200 OK)

```json
{
  "message": "Availability toggled successfully",
  "status": "available" // or "unavailable"
}
```

---

## 🚕 Passenger Ride Endpoints

These endpoints allow passengers to request rides, view ride history, and get details of individual rides.

### 📝 Request a Ride

```
POST /rides
```

> Requires: Auth header + Role: passenger

#### Request Body

```json
{
  "pickup_location": "Airport",
  "drop_location": "Downtown",
  "ride_type": "car" // accepted: "bike", "car", "rickshaw"
}
```

#### Response

```json
{
  "id": 1,
  "status": "requested",
  "passenger_id": 2,
  "pickup_location": "Airport",
  "drop_location": "Downtown",
  "ride_type": "car",
  "created_at": "2025-07-06T12:00:00Z"
}
```

### 📖 View All My Rides

```
GET /rides
```

Returns all rides booked by the currently authenticated passenger.

#### Response

```json
[
  {
    "id": 1,
    "pickup_location": "Airport",
    "drop_location": "Downtown",
    "status": "completed",
    "ride_type": "car"
  },
  {
    "id": 2,
    "pickup_location": "Station",
    "status": "requested"
  }
]
```

### 🔍 Get Ride by ID

```
GET /rides/:id
```

Returns detailed information about a specific ride, including assigned driver if available.

#### Response

```json
{
  "id": 1,
  "status": "in_progress",
  "pickup_location": "Airport",
  "drop_location": "Mall Road",
  "ride_type": "car",
  "driver": {
    "id": 3,
    "name": "Driver Ali"
  }
}
```

---

## 🚖 Driver Ride Endpoints

Endpoints that allow drivers to view and manage ride requests.

### 👀 View Available Rides

```
GET /rides/available
```

> Requires: Auth header + Role: driver

Returns a list of rides that are currently unassigned and in `requested` status.

#### Response

```json
[
  {
    "id": 5,
    "pickup_location": "Station",
    "drop_location": "University",
    "ride_type": "bike",
    "passenger": {
      "id": 7,
      "name": "Ahmed"
    }
  }
]
```

### ✅ Accept Ride

```
POST /rides/:id/accept
```

> Requires: Auth header + Role: driver

Accepts a ride, updating its status to `accepted` and assigning it to the driver.

#### Response

```json
{
  "message": "Ride accepted",
  "ride_id": 5,
  "status": "accepted"
}
```

### ❌ Reject Ride

```
POST /rides/:id/reject
```

> Requires: Auth header + Role: driver

Rejects a ride, marking it as `rejected` and making it unavailable to other drivers.

#### Response

```json
{
  "message": "Ride rejected"
}
```

### 🔄 Update Ride Status

```
PATCH /rides/:id/status
```

> Requires: Auth header + Role: driver

Updates the current status of a ride assigned to the authenticated driver. Only allowed transitions:

- `accepted` → `in_progress`
- `in_progress` → `completed`

#### Request Body

```json
{
  "status": "in_progress" // or "completed"
}
```

#### Response

```json
{
  "message": "Status updated",
  "ride_id": 5,
  "status": "in_progress"
}
```

---

## 🚨 Error Response Format

In case of validation or authorization failure, the API returns the following structure:

```json
{
  "error": "Validation error",
  "message": "Ride not found or not allowed"
}
```

### Additional Error Examples

```json
{
  "error": "Unauthorized",
  "message": "JWT token missing or invalid"
}
```

```json
{
  "error": "Forbidden",
  "message": "User is not authorized to perform this action"
}
```

---

## 📦 JWT Authorization Header

All protected routes require the following HTTP header:

```http
Authorization: Bearer <your_jwt_token>
```

You can obtain this token after registering or logging in.

---

## 📘 Notes

- **Ride Status Values**: `requested`, `accepted`, `in_progress`, `completed`, `rejected`
- **Ride Types**: `bike`, `car`, `rickshaw`
- Tokens are required for all non-auth endpoints
- All API responses follow REST conventions with proper status codes
- Role-based access is enforced using middleware functions

