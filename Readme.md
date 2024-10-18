
# Patient Health Dashboard for Prior Authorization

This project is a full-stack application designed to help healthcare providers manage patient health data and handle prior authorization workflows. Built for **Basys AI's Co-Pilot** product, the application features a patient dashboard and an API for submitting and managing prior authorization requests.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Video Demonstration](#video-demonstration)
- [Bonus: Deployment](#bonus-deployment)

---

## Features

### Frontend (React + Tailwind CSS)

- **Patient Dashboard:**
  - Displays a list of patients with details like name, age, and condition.
  - Detailed view of a selected patient, showing health records (past treatments, medication history, lab results).
  - Filter and search feature for easy navigation through patient data.
- **Prior Authorization Form:**
  - Allows healthcare providers to submit requests for prior authorization.
  - Includes fields like treatment type, insurance plan, date of service, and diagnosis code.
  - Includes client-side validation for form fields.
- **Responsive Design:**
  - Optimized for mobile and desktop devices using **Tailwind CSS**.

### Backend (Node.js + Express + MongoDB)

- **Patient Data API:**
  - Provides endpoints to fetch patient data and their details from MongoDB.
  - Allows submission of prior authorization requests via REST API.
- **Authorization API:**
  - Stores and retrieves prior authorization requests with patient ID, treatment details, and status.
- **Database Structure:**
  - **Patients Collection:** Contains fields like `name`, `age`, `medical history`, and `treatment plan`.
  - **Authorization Requests Collection:** Stores requests with patient ID, treatment details, status, and timestamps.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB
- **Database:** MongoDB (NoSQL)
- **Authentication:** JWT for Authentication

## Installation

1. **Clone the repository:**

    ```bash
    git clone git@github.com:Prashant-iViewLabs/Patient-Health-Dashboard.git
    cd patient-health-dashboard
    ```

2. **Install dependencies for frontend and backend:**

    ```bash
    # Navigate to the frontend
    cd frontend
    npm install

    # Navigate to the backend
    cd ../backend
    npm install
    ```

## Environment Variables

Create a `.env` file in the `frontend` folder and add the following variables:

```env
VITE_APP_API_URL = your_backend_hosted_url
```

Create a `.env` file in the `backend` folder and add the following variables:

```env
MONGO_URI=your_mongodb_connection_string
```

## Running the Application

1. **Seeding the Patients Database**
    ```
    cd backend
    node src/seed.js
    ```
2. **Start the backend server:**

    ```bash
    cd backend
    node src/app.js
    ```

3. **Start the frontend server:**

    ```bash
    cd frontend
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:5173` to view the application.

## API Documentation

### Patient Data API

- **GET /api/patients?size=10&page=1**: Fetch all patients.
- **GET /api/patients?size=10&page=1&search=searchText**: Fetch filtered patients.
- **GET /api/patients/:id**: Fetch details of a specific patient.


### Authorization API

- **POST /api/authorization**: Submit a prior authorization request.
  - **Body**: `{ patientId, treatmentType, insurancePlan, dateOfService, diagnosisCode, doctorNotes }`

## Video Demonstration

A short video demonstrating the project's functionality can be found [here](#). The video covers:

- Navigating the patient dashboard
- Viewing patient details and health records
- Submitting a prior authorization request

## Bonus: Deployment

The application is deployed on **Render** (frontend) and **Render** (backend). You can access the live version at:

- **Frontend**: [https://patient-heath-frontend.onrender.com/]
- **Backend**: [https://patient-health-dashboard-8v2o.onrender.com]

---

