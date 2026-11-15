# 💰 Svtracker - Modern Personal Finance & Expense Tracker Dashboard

[![React](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Express](https://img.shields.io/badge/Backend-Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%2B%20Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Deployment-Docker%20Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](https://opensource.org/licenses/ISC)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-brightgreen?logo=vercel&logoColor=white)](https://svtracker.maddaathia.my.id/)

🚀 **Live Demo:** [svtracker.maddaathia.my.id](https://svtracker.maddaathia.my.id/)  
🔗 **Backend API:** [api.svtracker.maddaathia.my.id](https://api.svtracker.maddaathia.my.id/)

**Svtracker** is a modern personal finance management tool designed to help users track their spending habits through an intuitive, data-driven dashboard. It transforms raw financial data into meaningful visual insights using interactive charts, real-time summaries, and category/source breakdowns.

Built with a decoupled **Client-Server architecture**, Svtracker features a responsive React + TypeScript frontend hosted on **Vercel** and a containerized Node.js + Express backend deployed via **Docker & Nginx Reverse Proxy** on a VPS.

---

## ✨ Key Features

- **📊 Comprehensive Financial Dashboard**
  Real-time calculation of total balance, total income, and total expenses with interactive visualizations:
  - **Balance Trend Chart**: Dynamic line chart tracking balance fluctuations over time.
  - **Income vs Expense Analysis**: Comparison bar charts and daily cash flow trackers.
  - **Distribution Donut Charts**: Visual category-based breakdown of expenses and income sources.
- **💸 Income & Expense Management**
  Seamless tracking and CRUD operations for transactions with custom amount, category/source assignment, notes, and timestamping.
- **🏷️ Customizable Categories & Sources**
  Personalized category management (e.g., Food, Transportation, Utilities) and income source channels (e.g., Salary, Freelance, Investments).
- **📄 Client-Side In-Place Pagination**
  Fluid navigation through transaction histories with client-side pagination cards without full-page reloads.
- **🖼️ Profile & Avatar Management (Cloudinary)**
  User profile personalization with image upload and avatar hosting powered by Cloudinary.
- **🔐 Secure JWT Cookie Authentication**
  Stateless JSON Web Token (JWT) authentication stored in secure, `HttpOnly` and `SameSite: None` cookies to prevent XSS attacks across domains.
- **🐳 Production Ready & Containerized**
  Backend containerized with multi-stage Docker builds, Docker Compose orchestration, and Nginx SSL Reverse Proxy on Linux VPS.

---

## 🛠️ Tech Stack & Architecture

Svtracker adopts a decoupled, modern *Client-Server* architecture:

### 💻 Frontend (Client)
| Technology | Description |
| :--- | :--- |
| **React 18 & TypeScript** | Declarative component-based UI library with strict type-safety. |
| **Vite** | Ultra-fast next-generation frontend tooling and bundler. |
| **React Router v7** | Declarative client-side routing with `ProtectedRoute` guards. |
| **Tailwind CSS** | Modern utility-first CSS framework for slick, responsive layouts. |
| **Chart.js & Recharts** | High-performance interactive charts for financial analytics. |
| **Zustand** | Lightweight, reactive client-side state management. |
| **Zod & Validation** | Robust schema declaration and runtime validation for forms. |
| **Lucide React** | Consistent, customizable UI icons. |

### ⚙️ Backend (Server)
| Technology | Description |
| :--- | :--- |
| **Node.js & Express.js** | Fast, unopinionated REST API runtime built with modern ES Modules (`import/export`). |
| **MongoDB & Mongoose** | NoSQL document database with schema validation and aggregation pipelines. |
| **Docker & Docker Compose** | Multi-container orchestration, lightweight Alpine images, and automated health checks. |
| **Nginx Reverse Proxy** | Production reverse proxy handling SSL certificates, rate limits, and caching. |
| **Cloudinary SDK** | Cloud storage service for handling user profile pictures and assets. |
| **JSONWebToken & Cookie-Parser** | Secure session management with HTTP-Only authentication cookies. |
| **bcryptjs** | Salted password hashing algorithm for secure credential storage. |

---

## 🗄️ Database Schema

Svtracker uses **MongoDB** with Mongoose ODM. The collections and their relational references are structured as follows:

```mermaid
erDiagram
    User ||--o{ Expense : "records"
    User ||--o{ Income : "earns"
    User ||--o{ Category : "owns"
    User ||--o{ Source : "owns"
    Category ||--o{ Expense : "categorizes"
    Source ||--o{ Income : "originates"

    User {
        ObjectId _id PK
        string fullname
        string email UK
        string password
        object profileImage "url, publicId"
        timestamp createdAt
        timestamp updatedAt
    }

    Category {
        ObjectId _id PK
        ObjectId userId FK
        string name
        timestamp createdAt
        timestamp updatedAt
    }

    Source {
        ObjectId _id PK
        ObjectId userId FK
        string name
        timestamp createdAt
        timestamp updatedAt
    }

    Expense {
        ObjectId _id PK
        ObjectId userId FK
        ObjectId category FK
        number amount
        date date
        timestamp createdAt
        timestamp updatedAt
    }

    Income {
        ObjectId _id PK
        ObjectId userId FK
        ObjectId source FK
        number amount
        date date
        timestamp createdAt
        timestamp updatedAt
    }
```

---

## 📁 Project Folder Structure

```text
expense-tracker/
├── backend/                 # BACKEND EXPRESS & MONGODB API
│   ├── src/
│   │   ├── config/          # Database (Mongoose) connection
│   │   ├── controllers/     # Route controllers (Auth, Dashboard, Expense, Income, etc.)
│   │   ├── middlewares/     # JWT Auth verification & validation
│   │   ├── models/          # Mongoose Schemas (User, Income, Expense, Category, Source)
│   │   └── routes/          # Express API route definitions
│   ├── .env.example         # Environment template
│   ├── .dockerignore        # Docker build exclusion rules
│   ├── Dockerfile           # Alpine production container build
│   ├── docker-compose.yml   # Docker service orchestration
│   ├── server.js            # Express server entry point
│   └── package.json
│
├── frontend/                # FRONTEND REACT APPLICATION
│   ├── public/              # Static assets & logos
│   ├── src/
│   │   ├── api/             # API client services (auth, dashboard, income, expense, etc.)
│   │   ├── assets/          # Images and SVGs
│   │   ├── components/      # UI components, layout, charts, modals, skeletons
│   │   ├── hooks/           # Custom data fetching hooks
│   │   ├── pages/           # Page views (Dashboard, Income, Expense, Settings, Login, Register)
│   │   ├── routes/          # Route setup & ProtectedRoute component
│   │   ├── schemas/         # Zod validation schemas
│   │   ├── store/           # Zustand global state stores
│   │   ├── utils/           # Formatters (formatRupiah, formatDate)
│   │   └── main.tsx         # React application entry point
│   ├── .env.example         # Client environment template
│   ├── package.json
│   └── vite.config.ts       # Vite bundler configuration
│
└── README.md                # Project documentation
```

---

## 🚀 Installation & Setup Guide

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18+ or v20+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or [MongoDB Atlas](https://cloud.mongodb.com/))
- [Docker](https://www.docker.com/) (Optional, for containerized deployment)
- [Cloudinary](https://cloudinary.com/) account for avatar image uploads

---

### Step 1: Clone the Repositories
Svtracker maintains independent repositories for frontend and backend:
```bash
# Frontend Repository
git clone https://github.com/madpy-og/Svtracker-frontend.git frontend

# Backend Repository
git clone https://github.com/madpy-og/Svtracker-backend.git backend
```

---

### Step 2: Configure & Run the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and configure your `.env` file:
   ```bash
   cp .env.example .env
   ```
3. Fill in your environment variables:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/expense-tracker?retryWrites=true&w=majority"
   SECRET_KEY="generate_a_very_long_secure_secret_key"
   CLIENT_URL="http://localhost:5173"
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   ```

#### Option A: Run via Docker (Recommended for VPS)
```bash
# Build and start container in detached mode
docker compose up -d --build

# Check container status
docker compose ps

# View live logs
docker compose logs -f backend
```

#### Option B: Run Locally with Node.js
```bash
npm install
npm run dev
```
*Backend server will run at: `http://localhost:3000`*  
*Healthcheck endpoint: `http://localhost:3000/health`*

---

### Step 3: Configure & Run the Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Create and configure your `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Configure the backend API URL:
   ```env
   # Local development
   VITE_API_URL="http://localhost:3000"

   # Production (VPS)
   # VITE_API_URL="https://api.svtracker.maddaathia.my.id"
   ```
5. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *Frontend will run at: `http://localhost:5173`*

---

## 🔌 API Endpoints Structure

The backend provides a structured RESTful API under `/api/v1`:

### 🔑 Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/register` : Register a new user account.
- `POST /api/v1/auth/login` : Authenticate user & issue secure HTTP-Only JWT cookie.
- `POST /api/v1/auth/logout` : Clear authentication token cookie.
- `GET /api/v1/auth/me` : Verify session & retrieve authenticated user data. *(Protected)*

### 📊 Dashboard Analytics (`/api/v1/dashboard`)
- `GET /api/v1/dashboard` : Fetch total balance, total income, total expense, and recent transactions. *(Protected)*
- `GET /api/v1/dashboard/chart` : Aggregated chart analytics (monthly trends, category distributions). *(Protected)*

### 💰 Transactions (`/api/v1/incomes` & `/api/v1/expenses`)
- `GET /api/v1/incomes` : Fetch all user income records. *(Protected)*
- `POST /api/v1/incomes` : Create a new income record. *(Protected)*
- `DELETE /api/v1/incomes/:id` : Delete an income record. *(Protected)*
- `GET /api/v1/expenses` : Fetch all user expense records. *(Protected)*
- `POST /api/v1/expenses` : Create a new expense record. *(Protected)*
- `DELETE /api/v1/expenses/:id` : Delete an expense record. *(Protected)*

### 🏷️ Categories & Sources (`/api/v1/categories` & `/api/v1/sources`)
- `GET /api/v1/categories` : Get list of expense categories. *(Protected)*
- `POST /api/v1/categories` : Add custom expense category. *(Protected)*
- `DELETE /api/v1/categories/:id` : Delete expense category. *(Protected)*
- `GET /api/v1/sources` : Get list of income sources. *(Protected)*
- `POST /api/v1/sources` : Add custom income source. *(Protected)*
- `DELETE /api/v1/sources/:id` : Delete income source. *(Protected)*

### 👤 User Profile (`/api/v1/users`)
- `GET /api/v1/users/profile` : Fetch profile details. *(Protected)*
- `PUT /api/v1/users/profile` : Update account information. *(Protected)*
- `POST /api/v1/cloudinary/upload` : Upload user avatar to Cloudinary. *(Protected)*

### 🩺 System & Healthcheck
- `GET /health` : Verify API server status and container uptime.

---

## 📄 License

This project is licensed under the **ISC License**. Feel free to use, modify, and distribute this codebase for educational or personal projects.

---
*Developed with ❤️ to empower personal financial freedom through data-driven tracking.*
