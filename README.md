# Employee Management System

A full-stack **Employee Management System** built using **React.js, Node.js, Express.js, MongoDB Atlas, and Mongoose**. The application provides role-based authentication, separate Admin and Employee dashboards, task assignment, task tracking, and cloud-based data persistence through REST APIs.

---

## 🚀 Features

### 👨‍💼 Admin

- Secure Admin Login
- View all employees
- Create and assign tasks
- Monitor employee task status
- View task statistics
- Persistent data storage using MongoDB Atlas

### 👩‍💻 Employee

- Secure Employee Login
- View assigned tasks
- Accept new tasks
- Mark tasks as Completed
- Mark tasks as Failed
- View personal task statistics

---

## 🛠 Tech Stack

### Frontend

- React.js
- Context API
- JavaScript (ES6+)
- CSS
- Vite

### Backend

- Node.js
- Express.js
- REST API
- Mongoose

### Database

- MongoDB Atlas

---

## 📂 Project Structure

```
employee-management-system
│
├── config/
│   └── db.js
│
├── models/
│   ├── Admin.js
│   └── Employee.js
│
├── public/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── server.js
├── seed.js
├── package.json
├── README.md
└── .env.example
```

---

## ⚙️ Installation

### Clone the repositoryy

```bash
git clone https://github.com/PranjitaModi/employee-management-system.git
```

Move into the project folder

```bash
cd employee-management-system
```

Install dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

---

## ▶️ Run the Project

### Start frontend and backend together

```bash
npm run dev:full
```

Or run separately

Backend

```bash
npm run server
```

Frontend

```bash
npm run dev
```

---

## 🌐 API Endpoints

### Health Check

```
GET /api/health
```

### Login

```
POST /api/auth/login
```

### Get Employees

```
GET /api/employees
```

### Create Task

```
POST /api/tasks
```

### Update Task Status

```
PUT /api/tasks/status
```

---

## 🗄 Database

This project uses **MongoDB Atlas** for persistent cloud storage.

Collections:

- admins
- employees

Mongoose is used for schema modeling and database interactions.

---

## 📌 Future Improvements

- JWT Authentication
- Password Hashing with bcrypt
- Role-based Authorization Middleware
- Search & Filter Employees
- Task Deadlines & Notifications
- Email Notifications
- Dashboard Analytics
- File Upload Support
- Docker Deployment
- CI/CD Pipeline

---

## 👩‍💻 Author

**Pranjita Modi**

- GitHub: https://github.com/PranjitaModi
- LinkedIn: https://www.linkedin.com/in/pranjitamodi/

---

## ⭐ If you like this project

Please consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the MIT License.
