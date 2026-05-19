# Team Task Manager

A full-stack web application for project and task management with role-based access control. This system allows administrators to manage projects, assign tasks to team members, monitor task progress, and manage users, while members can track and update their assigned work.

## Features

### Authentication & Authorization
- User signup and login using JWT authentication
- Role-based access control (Admin / Member)
- Secure protected API routes

### Project Management
- Admin can create projects
- View all projects
- Navigate project-wise tasks

### Task Management
- Admin can create tasks
- Assign tasks to team members
- Reassign tasks
- Edit task status
- Delete tasks
- Due date support
- Overdue task highlighting

### User Management
- Admin can view all users
- Admin can delete users
- Tasks assigned to deleted users are automatically reassigned to admin
- Members can view admin contact details

### Dashboard
- Total tasks
- Completed tasks
- Pending tasks
- Overdue tasks
- User management table
- Role visibility

## Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- JWT Decode

### Backend
- Node.js
- Express.js
- Sequelize ORM
- JWT Authentication
- bcrypt

### Database
- MySQL

### Deployment
- Railway

## Project Structure

```bash
team-task-manager/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/insaneprasun251/team-task-manager.git
cd team-task-manager
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
JWT_SECRET=your_secret_key

MYSQLHOST=localhost
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=your_mysql_password
MYSQLDATABASE=taskdb
```

Run backend:

```bash
npm start
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

## API Endpoints

### Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Projects
- `GET /api/projects`
- `POST /api/projects`

### Tasks
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/tasks/dashboard`

### Users
- `GET /api/users`
- `DELETE /api/users/:id`

---

## Role Permissions

### Admin
- Create projects
- Create tasks
- Assign tasks
- Reassign tasks
- Delete tasks
- View all users
- Delete users
- View all tasks
- Access dashboard analytics

### Member
- View assigned tasks only
- Update task status
- View admin details
- Access personal dashboard

---

## Future Improvements
- Email notifications
- Task comments
- File attachments
- Team chat
- Search & filtering
- Pagination
- Activity logs

## Author

**Prasun Gupta**

GitHub: https://github.com/insaneprasun251