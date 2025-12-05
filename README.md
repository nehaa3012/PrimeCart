# **🛒 PrimeCart – Full Stack E-Commerce Platform**

<div align="center">

# 🛒 **PrimeCart**

### A modern, scalable, and secure e-commerce platform built with the MERN stack,  
### delivering a seamless shopping experience with role-based access and a powerful admin dashboard.

<br />

<a href="https://your-frontend-url.com">
  <img src="https://img.shields.io/badge/🌐%20Live%20Demo-000000?style=for-the-badge" />
</a>
<a href="https://your-backend-api-url.com">
  <img src="https://img.shields.io/badge/🔗%20Backend%20API-1f6feb?style=for-the-badge" />
</a>

<br /><br />

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" />

</div>

---


## 📱 About PrimeCart

PrimeCart is a **full-stack e-commerce web application** built using the **MERN stack**, designed to offer a real-world shopping experience similar to platforms like Amazon and Flipkart.

The platform supports **secure authentication**, **role-based access control (RBAC)**, **product management**, and **order processing**, all wrapped in a **modern, responsive UI** built with Tailwind CSS.

---

## 🎯 Key Features

- 🛂 **Authentication & Authorization**
  - JWT-based authentication using HttpOnly cookies
  - Role-Based Access Control (User / Admin)

- 🛍️ **Product Management**
  - Automatic display of products from all categories
  - Product search and filtering
  - Product details page with multiple images

- 🖼️ **Secure Image Uploads**
  - Multer (Memory Storage)
  - Cloudinary integration
  - Image cleanup on update & delete

- 🛒 **Cart & Orders**
  - Add to cart & checkout process
  - User order history
  - Order status management (Admin)

- 🧑‍💼 **Admin Dashboard**
  - Manage products (CRUD)
  - Manage users and roles
  - Manage orders
  - View platform analytics & stats

- 📱 **Modern UI**
  - Responsive design (mobile-first)
  - Clean, sleek interface using Tailwind CSS

---

## 🚀 Live Demo

Frontend: _Coming Soon_  
Backend API: _Coming Soon_

---

## 🛠️ Tech Stack

### Frontend
- React 18 (Vite)
- Tailwind CSS
- React Router DOM
- Context API
- Axios
- Framer Motion
- React Hot Toast
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Role-Based Access Control (RBAC)
- Multer (Memory Storage)
- Cloudinary (Image Uploads)
- Cookie Parser
- CORS

### Development & Deployment
- Git & GitHub
- Render (Backend Deployment)
- MongoDB Atlas
- npm
- ESLint

---

## 🏗️ Project Structure

primecart/                                                                                                                                                                                                  
│                                                                                                                                                                                                      
├── backend/                                                                                                                                                                                    
│   ├── config              # Database & third-party configurations                                                                                                                             
│   ├── controller          # Controllers (Auth, Product, Order, Admin)                                                                                                                             
│   ├── middleware          # Authentication, role & upload middleware                                                                                                                          
│   ├── models              # Database schemas                                                                                                                                                      
│   ├── routes              # API routes                                                                                                                                                    
│   ├── utils               # Cloudinary & helper utilities                                                                                                                                           
│   └── index.js            # Backend entry point                                                                                                                                                         
│                                                                                                                                                                                                        
├── frontend/                                                                                                                                                                                     
│   ├── public              # Static assets                                                                                                                                                            
│   │                                                                                                                                                                                                 
│   ├── src                                                                                                                                                                                           
│   │   ├── components      # Reusable UI components                                                                                                                                                      
│   │   │   ├── cart                                                                                                                                                                                    
│   │   │   ├── common                                                                                                                                                                                  
│   │   │   ├── home                                                                                                                                                                                    
│   │   │   ├── orders                                                                                                                                                                                   
│   │   │   ├── products                                                                                                                                                                                    
│   │   │   └── ui                                                                                                                                                                                             
│   │   │
│   │   ├── context         # Global state (Cart, Theme)                                                                                                                                                    
│   │   ├── lib             # Shared utilities                                                                                                                                                                    
│   │   ├── pages           # Application pages                                                                                                                                                              
│   │   ├── services        # API service layer                                                                                                                                                          
│   │   ├── utils           # Constants & helpers                                                                                                                                                       
│   │   │                                                                                                                                                                                                         
│   │   ├── App.jsx                                                                                                                                                                                  
│   │   ├── main.jsx                                                                                                                                                                              
│   │   └── index.css                                                                                                                                                          
│   │                                                                                                                                                                                             
│   └── config files        # Vite, ESLint, package.json                                                                                                                                               
│                                                                                                                                                                                               
└── README.md                                                                                                                                                                              

