🛒 PrimeCart – Full Stack E-Commerce Platform
PrimeCart Logo

A modern, scalable, and secure e-commerce platform built with the MERN stack, delivering a smooth shopping experience with role-based access and a powerful admin dashboard.

Live Demo | Backend API

React • Node.js • MongoDB • Express.js • Tailwind CSS

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
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Application pages
│ │ ├── context/ # Global state (Auth, Cart)
│ │ ├── services/ # API layer
│ │ ├── routes/ # Protected routes
│ │ └── utils/ # Helpers & constants
│ └── vite.config.js
│
├── server/ # Backend API
│ ├── controllers/ # Business logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── middleware/ # Auth, role & upload middleware
│ ├── utils/ # Cloudinary & helpers
│ ├── app.js
│ └── server.js
│
└── README.md

yaml
Copy code

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

### Frontend Setup

```bash
git clone https://github.com/your-username/primecart.git
cd primecart/client

npm install
npm run dev
Create .env file:

env
Copy code
VITE_API_URL=http://localhost:5000/api
Backend Setup
bash
Copy code
cd ../server

npm install
npm run dev
Create .env file:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
🧪 API Testing
All APIs tested using Postman

Authentication, role protection, image uploads, and CRUD operations validated

Cookie-based authentication enabled

🚦 API Endpoints
Authentication
bash
Copy code
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
Products
bash
Copy code
GET    /api/products
GET    /api/products/:id
POST   /api/products        (Admin)
PUT    /api/products/:id    (Admin)
DELETE /api/products/:id    (Admin)
Orders
bash
Copy code
POST /api/orders
GET  /api/orders/me
PUT  /api/orders/:id        (Admin)
Users
swift
Copy code
GET /api/users/me
PUT /api/users/me/update
PUT /api/users/me/password
GET /api/users/me/orders
Admin
pgsql
Copy code
GET /api/admin/users
PUT /api/admin/users/:id
DELETE /api/admin/users/:id
GET /api/admin/orders
GET /api/admin/stats
🎨 Design System
Minimal & clean UI

Responsive layouts

Smooth hover animations

Consistent spacing & typography

Tailwind utility-first approach

🧠 Learning Outcomes
MERN stack architecture (MVC)

Secure JWT authentication with cookies

Role-based authorization

Cloudinary image handling using Multer memory storage

Admin dashboard design

Scalable code organization

🔮 Future Enhancements
Payment gateway (Stripe / Razorpay)

Wishlist functionality

Product reviews & ratings UI

Coupons & discounts

Pagination & infinite scrolling

Email notifications

Seller role support

👩‍💻 Developer
Neha Chaudhary
MERN Stack Developer

GitHub: @your-github-username
LinkedIn: Add your LinkedIn

🙏 Acknowledgments

React & Node.js community

Tailwind CSS

MongoDB

Cloudinary

Render Hosting

Made with ❤️ and ☕ by Neha

⭐ Star this repository if you found it helpful!
