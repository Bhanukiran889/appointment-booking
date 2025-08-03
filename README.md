# Doctor Appointment Booking System

A full-stack web application for booking doctor appointments, browsing doctor profiles, and managing medical consultations. Built with React, TypeScript, Tailwind CSS, Node.js, and Express.

---

## Table of Contents

- [Overview](#overview)
- [Quickstart](#quickstart)
- [Core Requirements](#core-requirements)
- [Tools/Libraries Used](#toolslibraries-used)
- [Improvements with More Time](#improvements-with-more-time)
- [Challenges Faced and Solutions](#challenges-faced-and-solutions)

---

## Overview

This is a doctor appointment booking system where patients can browse a list of doctors, view detailed profiles, check availability, and book appointments. Doctors can manage appointments through a dashboard, and backend integration sends booking confirmations via email. The UI is fully responsive and styled with Tailwind CSS.

---

## Quickstart

1. **Clone the repository**

```bash
git clone https://github.com/your-username/doctor-booking-app.git
cd doctor-booking-app
```

2. **Install dependencies**

```bash
# For frontend
cd frontend
npm install

# For backend
cd ../backend
npm install
```

3. **Run the project**

```bash
# Start backend (runs on http://localhost:5000)
cd backend
npm run dev

# Start frontend (runs on http://localhost:3000)
cd ../frontend
npm run dev
```

---

## Core Requirements

### Frontend (React + TypeScript)

1. **Landing Page:**
   - Displays a clear list of doctors.
   - Each card shows name, specialization, profile image, and availability status.
   - Includes a search bar to filter doctors by name or specialization.

2. **Doctor Profile Page:**
   - Clicking on a doctor opens a detailed profile page.
   - Shows bio, education, languages, location, consultation fee, and availability schedule.
   - Includes a "Book Appointment" button.

3. **Book Appointment:**
   - Form to collect patient name, email, desired date & time.
   - Submits data to backend and shows a confirmation message on success.

4. **Email Confirmation:**
   - Backend sends confirmation mail to patient's email using NodeMailer upon successful booking.

---

## Tools/Libraries Used

- **Frontend**
  - React
  - TypeScript
  - Tailwind CSS
  - React Icons
  - Next.js App Router

- **Backend**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - Nodemailer

---

## Improvements with More Time

1. **Role-Based Authentication:**
   - Patients can register/login to book and manage appointments.
   - Admin dashboard to validate doctor registrations.
   - Doctors can log in to manage their own schedules and appointment lists.

2. **User Profile System:**
   - Patients can view their past consultations, prescriptions, and medical history.
   - Option to rate and comment on recent consultations.
   - Logout button and profile edit options.

3. **Doctor Dashboard:**
   - Section to view upcoming, completed, and cancelled appointments.
   - Actions like "Start Consultation", "Add Report", "End Consultation".
   - Real-time status updates with toggle: Available / On Leave.

4. **Admin Dashboard:**
   - View and approve new doctor registrations.
   - Patients auto-approved, but doctors require admin approval.
   - Approve/decline buttons with notification system.

5. **Scalability & SaaS Version:**
   - Split the app into microservices (auth, appointments, notifications, users).
   - Make it a SaaS platform for multiple hospitals to manage their own doctors and patients.
   - Add full Hospital Management System integration (billing, pharmacy, reports).

---

## Challenges Faced and Solutions

### 1. **Dynamic Routing in Next.js**
- **Problem:** Dynamic routing for individual doctor profiles (`/doctor/[id]`) threw errors with data fetching.
- **Solution:** Used `generateStaticParams` and client-side fetching with fallback loaders.

### 2. **Backend API Integration**
- **Problem:** Delays in fetching data with SSR/ISR.
- **Solution:** Used `useEffect` for fetching in client components, fallback states for loading, and separated API calls into a `utils/api.ts` file.

### 3. **Email Sending via Nodemailer**
- **Problem:** Gmail SMTP blocked by default security settings.
- **Solution:** Created a separate Gmail app password and tested email delivery with logs.

### 4. **Form Validations**
- **Problem:** Some form submissions were failing silently.
- **Solution:** Added required fields, character limits, and toast-based feedback.

### 5. **Responsive UI**
- **Problem:** Table and grid layouts broke on smaller screens.
- **Solution:** Used Tailwind’s responsive utilities to adjust layout and spacing dynamically.

---

```
