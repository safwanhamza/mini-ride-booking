# 🚖 Mini Ride Booking System (MERN Stack)

A full-stack ride-hailing system built using **Node.js**, **Express**, **React**, and **SQLite**. This app allows passengers to request rides and drivers to accept/reject and complete them.

---

## 🏗️ Architecture Overview

### Backend (Node.js + Express + SQLite)
- **Authentication**: JWT-based auth with role distinction (driver/passenger)
- **Models**: Sequelize ORM with SQLite
- **Routing**: RESTful API endpoints for user and ride management

### Frontend (React + Tailwind + Axios)
- **SPA** with routing using React Router
- **Stateful Auth** with token stored in localStorage
- **Clean UI** with Tailwind CSS
- **Role-Based Dashboards**: Passenger and Driver flows separated

---

## 🚀 Features

### 👤 User Management
- Register/Login as **driver** or **passenger**
- JWT-based authentication
- Role-based API and UI access

### 🛺 Passenger Features
- Request a new ride (pickup/drop/vehicle type)
- View ride history and statuses

### 🚖 Driver Features
- Toggle availability (available/unavailable)
- View and accept/reject incoming ride requests
- Update ride status: `in_progress`, `completed`

### 💡 System Highlights
- Role-based API protection
- RESTful design
- Fully integrated frontend-backend architecture

---

## 🧰 Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | React, Tailwind CSS, Axios     |
| Backend   | Node.js, Express.js            |
| Database  | SQLite (via Sequelize ORM)     |
| Auth      | JSON Web Tokens (JWT)          |
| Dev Tools | Vite, Nodemon, Postman         |

---

## 📁 Folder Structure

```
ride-booking-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── db.js
│   └── app.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── api/
│   └── index.html
└── README.md
```

---

## 🔌 Setup Instructions

### 🔙 Backend Setup
```bash
cd ride-booking-app/backend
npm install
node app.js  # or use nodemon
```
Backend runs on: `http://localhost:3000`

### 🔜 Frontend Setup
```bash
cd ride-booking-app/frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 📡 API Endpoints Overview

### Auth APIs
| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login`    | Login and get token |
| GET    | `/auth/me`       | Get current user    |

### Passenger APIs
| Method | Endpoint      | Description         |
|--------|---------------|---------------------|
| POST   | `/rides`      | Request a ride      |
| GET    | `/rides`      | View ride history   |
| GET    | `/rides/:id`  | View ride by ID     |

### Driver APIs
| Method | Endpoint                | Description                  |
|--------|-------------------------|------------------------------|
| PATCH  | `/users/availability`   | Toggle driver availability   |
| GET    | `/rides/available`      | Get pending ride requests    |
| POST   | `/rides/:id/accept`     | Accept a ride                |
| POST   | `/rides/:id/reject`     | Reject a ride                |
| PATCH  | `/rides/:id/status`     | Update ride status           |

---

## 🎯 Business Logic & Flow

- ✅ Only drivers can accept or reject ride requests
- ✅ Only passengers can request rides
- ✅ Rides can be updated only by the assigned driver
- ✅ Passengers can view their own ride history

### Ride Lifecycle
```
REQUESTED → ACCEPTED → IN_PROGRESS → COMPLETED
                       ↓
                   REJECTED
```

---

## 🧪 Testing with Postman

### Example: Register a Passenger
```bash
POST http://localhost:3000/auth/register
{
  "name": "Ali",
  "email": "ali@jeeny.com",
  "password": "123456",
  "type": "passenger"
}
```

### Example: Request a Ride
```bash
POST /rides
Authorization: Bearer <token>
{
  "pickup_location": "Airport",
  "drop_location": "Mall Road",
  "ride_type": "car"
}
```

---

## 🧾 Screens (Frontend Routes)

| Path            | Purpose                    |
|-----------------|----------------------------|
| `/`             | Landing page               |
| `/login`        | Login form                 |
| `/register`     | Register form              |
| `/passenger`    | Passenger dashboard        |
| `/request`      | Request ride form          |
| `/driver`       | Driver dashboard           |
| `/ride-status`  | Ride status update page    |

---

## 🔐 Security
- JWT tokens stored in localStorage
- Auth-protected backend endpoints
- Role validation middleware
- CORS enabled for local dev (`5173 → 3000`)

---

## 🌟 Future Improvements
- Google Maps integration for real-time locations
- Payment system for completed rides
- Rating system for passengers and drivers
- Admin panel for monitoring activity

---

## 📌 Contributors
- Built by Safi (Tech Pioneer Program 2025)

---

## ✅ Submission-Ready
> This repo is a complete full-stack implementation of the Jeeny Case Study, covering **all required + optional + bonus** features.

