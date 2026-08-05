# VitalSync - Online Doctor Appointment System

VitalSync is a full-stack healthcare appointment management platform that streamlines the process of scheduling and managing doctor appointments. It enables patients to book appointments online while providing administrators with a centralized dashboard to manage doctors, appointments, and users. The application is built using **React.js**, **Spring Boot**, **MySQL**, and **JWT Authentication**.

---

## 🚀 Features

### 👤 Patient Module
- Secure User Registration & Login
- JWT-Based Authentication
- Browse Available Doctors
- Book Doctor Appointments
- View Appointment History
- Cancel Appointments
- Receive Email Notifications
- Responsive User Interface

### 👨‍💼 Admin Module
- Secure Admin Authentication
- Admin Dashboard
- Manage Doctors
- View All Appointments
- Approve, Cancel, or Reschedule Appointments
- Email Notifications for Appointment Updates

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- CSS

### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
- Spring Mail
- Maven

### Database
- MySQL

---

## 📂 Project Structure

```
VitalSync/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   └── application.properties
│
└── README.md
```

---

## ⚙️ Prerequisites

Before running the project, ensure you have installed:

- Java 17 or later
- Node.js 18 or later
- MySQL 8+
- Git
- Maven (or Maven Wrapper)

---

## 🗄️ Database Setup

Create a MySQL database:

```sql
CREATE DATABASE vitalsync;
```

Update the database configuration in:

```
backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/vitalsync
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
```

---

## ▶️ Running the Backend

Navigate to the backend folder.

Using Maven Wrapper:

```bash
./mvnw spring-boot:run
```

Windows:

```bash
mvnw.cmd spring-boot:run
```

Backend URL:

```
http://localhost:8080
```

---

## ▶️ Running the Frontend

Navigate to the frontend folder.

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

## 🔐 Authentication

VitalSync uses **JWT (JSON Web Token)** authentication with Spring Security.

Supported Roles:

- ROLE_USER
- ROLE_ADMIN

Admin APIs are protected and require administrator privileges.

---

## 📧 Email Notifications

Spring Mail is used to send automated email notifications for:

- Appointment Confirmation
- Appointment Cancellation
- Appointment Rescheduling

---

## 📌 Core Modules

- Authentication & Authorization
- Patient Management
- Doctor Management
- Appointment Booking
- Appointment Scheduling
- Admin Dashboard
- Email Notification Service

---

## 💻 REST APIs

The backend exposes RESTful APIs for:

- User Authentication
- Doctor Management
- Appointment Management
- Admin Operations
- Email Services

---

## 📸 Screenshots

Add screenshots of:

- Home Page
- Login Page
- Doctor Listing
- Appointment Booking
- User Dashboard
- Admin Dashboard

---

## 🚀 Future Enhancements

- Online Payment Gateway
- Video Consultation
- Doctor Availability Calendar
- Medical Report Uploads
- Prescription Management
- SMS Notifications
- Cloud Deployment (AWS/Docker)

---

## 👨‍💻 Author

Pratyush Jha

GitHub: https://github.com/Pratyush-xxvi/VitalSync.git

---

## 📄 License

This project is developed for educational and learning purposes.
