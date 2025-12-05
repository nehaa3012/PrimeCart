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

**Frontend:** [fascinating-melba-f9ff0c.netlify.app](https://fascinating-melba-f9ff0c.netlify.app/)  
**Backend API:** [blog-backend-njkp.onrender.com](https://blog-backend-njkp.onrender.com/)

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


---

## 👥 User Roles & Features

### 🛒 Users
- Register & login securely
- Browse all products (all categories loaded automatically)
- View product details
- Add products to cart
- Place orders
- View order history
- Update profile & avatar
- Change password

### 🧑‍💼 Admin
- Access admin dashboard
- Create / update / delete products
- Upload multiple product images
- Manage users & roles
- View & manage orders
- Update order status
- View analytics & stats

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas
- Cloudinary account

---

## **🔧 Frontend Setup**

```bash

# Clone the repository
git clone https://github.com/your-username/primecart.git
cd primecart/frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your environment variables
VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev

```

---
  
## **⚙️ Backend Setup**

```bash

# Navigate to backend directory
cd ../backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your environment variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Start development server
npm run dev

```
