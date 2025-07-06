# 📘 Design Document - Mini Ride Booking System (Node.js + React)

## 📋 Project Overview

The Mini Ride Booking System is a full-stack web application designed to simulate the core workflow of a ride-hailing platform. Built as part of the Jeeny Tech Pioneer Program 2025, the system enables seamless coordination between passengers and drivers, allowing users to register, book rides, manage ride status, and monitor availability.

This system is ideal for prototyping and small-scale deployment in localized areas where a minimal and responsive interface is preferred. It excludes GPS and payment integration but supports authentication, availability toggling, and role-based access control to demonstrate core platform behavior.

The platform consists of a frontend powered by React (with Vite and Tailwind CSS) and a backend built using Node.js with Express and Sequelize (SQLite). It adheres to RESTful design principles and demonstrates clean separation of concerns.

---

## 🏗️ Technology Stack Selection

### 🧠 Programming Language

- **JavaScript (ES6+)**
  - Utilized on both frontend and backend for a consistent development experience.
  - Widely supported by modern browsers and backend environments (Node.js).
  - Rich ecosystem of libraries and tooling.

### ⚙️ Backend

- **Node.js + Express.js**
  - Non-blocking event-driven architecture ideal for I/O-heavy applications.
  - Simple yet powerful middleware system.
  - Large community and active plugin ecosystem.

### 💄 Database

- **SQLite with Sequelize ORM**
  - File-based SQL database requiring minimal setup.
  - Sequelize adds model abstraction, migrations, and associations.
  - Great for demo environments and unit testing.

### 🧹 Frontend

- **React.js (Vite)**
  - Fast hot module replacement and build optimization.
  - React hooks and functional components improve performance and maintainability.
- **Tailwind CSS**
  - Rapid UI development with a utility-first approach.
  - Mobile-first responsive design out of the box.
- **React Router**
  - Declarative routing system with dynamic and nested route support.

### 🔒 Security

- **JWT (JSON Web Tokens)**
  - Stateless and secure method of managing user sessions.
  - Tokens stored in localStorage; used to authorize API access.
- **CORS (Cross-Origin Resource Sharing)**
  - Enabled on the backend to permit API calls from the Vite development server.

---

## 🎯 Feature Mapping to Requirements

| Feature                    | Endpoint/Path                   | Role             | Method |
| -------------------------- | ------------------------------- | ---------------- | ------ |
| Register/Login (JWT)       | `/auth/register`, `/auth/login` | Passenger/Driver | POST   |
| Request Ride               | `/rides`                        | Passenger        | POST   |
| View Ride History          | `/rides`, `/rides/:id`          | Passenger        | GET    |
| View Available Rides       | `/rides/available`              | Driver           | GET    |
| Accept/Reject Ride         | `/rides/:id/accept` / `reject`  | Driver           | POST   |
| Update Ride Status         | `/rides/:id/status`             | Driver           | PATCH  |
| Toggle Driver Availability | `/users/availability`           | Driver           | PATCH  |
| Landing Page Navigation    | `/`                             | All Roles        | GET    |
| Role-Based Dashboards      | `/driver`, `/passenger`         | Driver/Passenger | GET    |

---

## 🧱 Database Design

### ERD (Entity Relationship Diagram)

```
User (1) <--- (passenger_id) Ride (M) ---> (driver_id) User (1)
```

### Tables and Fields

#### 📄 User

| Field        | Type     | Description                             |
| ------------ | -------- | --------------------------------------- |
| id           | Integer  | Unique user identifier                  |
| name         | String   | User's display name                     |
| email        | String   | Login email address (unique)            |
| password     | String   | Encrypted using bcrypt                  |
| type         | Enum     | 'passenger' or 'driver'                 |
| availability | Enum     | For drivers: 'available', 'unavailable' |
| created\_at  | DateTime | Timestamp when user was registered      |

#### 🚗 Ride

| Field            | Type                    | Description                                   |
| ---------------- | ----------------------- | --------------------------------------------- |
| id               | Integer                 | Unique ride identifier                        |
| passenger\_id    | FK → User.id            | Reference to requesting passenger             |
| driver\_id       | FK → User.id (nullable) | Assigned driver (if accepted)                 |
| pickup\_location | String                  | Text field representing pickup location       |
| drop\_location   | String                  | Text field representing destination           |
| ride\_type       | Enum                    | Vehicle type: 'bike', 'car', or 'rickshaw'    |
| status           | Enum                    | 'requested', 'accepted', 'in\_progress', etc. |
| created\_at      | DateTime                | Timestamp when ride was requested             |

### Ride Status Lifecycle

```
REQUESTED → ACCEPTED → IN_PROGRESS → COMPLETED
              ↓
           REJECTED
```

Each transition is role-bound and time-logged to ensure traceability.

---

## 🔒 Security Architecture

### 🔐 Authentication

- On successful registration/login, a JWT token is returned.
- Stored on frontend in `localStorage` and attached to each API request.
- Backend decodes and validates token for all protected routes.

### 🛡️ Authorization

- Middleware checks both token validity and role access.
- Separate route logic for passengers vs. drivers.
- Enforced at route level using `requireRole()` middleware.

---

## 🌐 Frontend Architecture

### Page Routes (React Router)

| Path           | Component               | Access                |
| -------------- | ----------------------- | --------------------- |
| `/`            | Home (Landing)          | Public                |
| `/login`       | Login Form              | Public                |
| `/register`    | Registration Form       | Public                |
| `/passenger`   | Passenger Dashboard     | Protected (Passenger) |
| `/request`     | Ride Request Page       | Protected (Passenger) |
| `/driver`      | Driver Dashboard        | Protected (Driver)    |
| `/ride-status` | Ride Status Update Page | Protected (Driver)    |

### Shared Components

- **Navbar**: Accessible from all pages with navigation links.
- **AuthContext** (optional): Centralized login state provider.
- **ProtectedRoute**: Guards components based on login + role.

---

## 🧪 Testing Strategy

### ✅ Manual Testing

- Frontend validated using browser tools (Chrome DevTools)
- Backend validated using Postman collections and curl
- User scenarios tested:
  - Registration & Login
  - Requesting a ride
  - Accepting a ride as driver
  - Updating ride status
  - Viewing history

### 🪪 API Testing Tools

- Postman for endpoint testing
- DevTools → Network tab for frontend/backend integration

### 🏃 Sample Test Payloads

#### Register Passenger

```json
{
  "name": "Ali",
  "email": "ali@jeeny.com",
  "password": "123456",
  "type": "passenger"
}
```

#### Accept Ride (Driver)

```http
POST /rides/2/accept
Authorization: Bearer <driver_token>
```

#### Update Ride Status

```json
PATCH /rides/2/status
{
  "status": "completed"
}
```

---

## 🗺 Business Assumptions

- Each passenger can only have **one active ride** at a time
- Rides are manually accepted by drivers (no automated matching)
- Locations are input manually (no geolocation API)
- Drivers must manually toggle availability to receive requests
- Payment handling and OTP are excluded from this prototype

---

## ✅ Requirements Fulfilled

| Requirement                | Status |
| -------------------------- | ------ |
| User Registration & Login  | ✅      |
| Passenger Ride Request     | ✅      |
| Driver Ride Acceptance     | ✅      |
| Ride Status Updates        | ✅      |
| Passenger Ride History     | ✅      |
| Toggle Driver Availability | ✅      |
| Role-Based Access Control  | ✅      |
| JWT Authentication         | ✅      |
| CORS Support for Frontend  | ✅      |
| Separate Dashboards        | ✅      |
| Clean UI with Tailwind     | ✅      |

---

## 🔮 Future Enhancements

- Integrate Google Maps API for geolocation and address validation
- Add WebSocket support for real-time ride updates
- Enable fare estimation and payment integration (Stripe, etc.)
- Implement driver/passenger rating system
- Launch an admin dashboard for system-wide monitoring
- OTP/SMS verification using Twilio API

