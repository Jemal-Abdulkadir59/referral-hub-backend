# Referral Hub

Referral Hub is a referral management system designed to connect health centers and a general hospital. Built using modern technologies — Node.js, Express.js, MongoDB, and Mongoose — it streamlines the patient referral process for better coordination, tracking, and care delivery.

## 🌐 What it does
Referral Hub enables healthcare centers to refer patients to a general hospital, where the referral can be managed by staff and doctors. It supports different user roles and responsibilities in the healthcare workflow.

## 🏥 Core Features
Health Center Workflow:

  . Health centers register patients.

  . Create and send referral requests to the general hospital.

## General Hospital Workflow:
  Hospital staff review incoming referrals.
  
  Doctors treat patients and submit treatment reports.
  
  Referral status is updated as it progresses (e.g., Pending, Accepted).

## 👥 User Roles & Permissions
Admin

  Manages users, roles, system settings, and full access.

Doctor
 
  adds treatment reports.

Nurse
 
 assigned referrals for doctors, adds reports.
 
 Supports doctors by preparing patient data and managing follow-ups.

Data Clerk
 
 Enters and verifies patient information, updates referral status.

Health Center Users
 
  Can register patients and send referrals to the general hospital.
  
## 🛠️ Technologies Used
Backend: Node.js, Express.js

Database: MongoDB (via Mongoose ODM)

Authentication: JWT,cookie, role-based access control

Validation: Mongoose schema validation

## Getting Started
  npm install

  npm start

  ## Getting Started Frontend
    https://github.com/Jemal-Abdulkadir59/referral-hub-frontend.git
    npm install
    npm run start
    
## ⚙️ Environment Variables
Create a .env file in the root directory with:

PORT=8000

MONGO_URI=mongodb://127.0.0.1:27017/hospital

JWT_SECRET=my-hospital-secure-and-ultra-long-code

JWT_EXPIRES_IN=90d

JWT_COOKIE_EXPIRES_IN=90

## 📁 Project Structure
referral-hub/

├── controllers/

├── models/

├── public/

├── routes/

├── utils/

├── config/

└── app.js

└── server.js



