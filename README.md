# Task_Flow 📋

A modern, full-stack task management system for organizing projects and tasks efficiently. Built with React, FastAPI, and PostgreSQL.

![Task_Flow](frontend/public/task-icon.svg)

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure signup/login with JWT tokens
- **Project Management**: Create, view, and organize projects with custom colors
- **Task Management**: Full CRUD operations for tasks with priorities and status tracking
- **Dashboard**: Overview of projects and tasks with statistics
- **Theme Support**: Light, Dark, and System theme options
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Task Features
- Multiple status types (To Do, In Progress, Completed, Blocked)
- Priority levels (Urgent, High, Medium, Low)
- Task filtering and search
- Project-specific task organization
- Due date tracking
- Task editing and deletion with confirmation dialogs

### User Experience
- Clean, modern UI with Tailwind CSS
- Real-time theme switching
- Protected routes with authentication
- Error boundaries for graceful error handling
- Loading states and skeleton loaders
- Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Validation**: Zod

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT (python-jose)
- **Password Hashing**: bcrypt with passlib
- **CORS**: FastAPI CORS middleware
- **Environment**: python-dotenv

## 📦 Project Structure

```
Task_Flow/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── layout/      # Layout components (AppLayout, Sidebar)
│   │   │   └── ui/          # shadcn/ui components
│   │   ├── contexts/        # React contexts (Auth, Theme)
│   │   ├── features/        # Feature-specific components
│   │   │   ├── dashboard/   # Dashboard components
│   │   │   ├── projects/    # Project components
│   │   │   └── tasks/       # Task components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and helpers
│   │   ├── pages/           # Page components
│   │   └── services/        # API service layer
│   └── package.json
│
├── backend/                  # FastAPI backend application
│   ├── app/
│   │   ├── core/            # Core configurations
│   │   │   ├── config.py    # Settings and environment variables
│   │   │   └── security.py  # Password hashing and JWT
│   │   ├── db/              # Database configuration
│   │   │   ├── models.py    # SQLAlchemy models
│   │   │   └── session.py   # Database session
│   │   ├── dependencies/    # Dependency injection
│   │   ├── routes/          # API endpoints
│   │   │   ├── auth.py      # Authentication routes
│   │   │   ├── projects.py  # Project routes
│   │   │   └── tasks.py     # Task routes
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic layer
│   │   └── utils/           # Utility functions
│   ├── requirements.txt
│   └── .env
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (3.12 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** 

### Database Setup

1. **Install PostgreSQL** (if not already installed)

2. **Create a database**:
   ```sql
   CREATE DATABASE taskflow;
   ```

3. **Run the database schema** (found in `backend/database.sql`):
   ```bash
   psql -U postgres -d taskflow -f backend/database.sql
   ```

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Create a `.env` file** in the `backend` directory:
   ```env
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/taskflow
   SECRET_KEY=your-secret-key-here-change-in-production
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

6. **Run the backend server**:
   ```bash
   uvicorn app.main:app --reload --port 5000
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:8080`

## 🔑 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/taskflow` |
| `SECRET_KEY` | JWT secret key | `your-secret-key-here` |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time | `30` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:5000/docs
- **ReDoc**: http://localhost:5000/redoc

### Main Endpoints

#### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login and get JWT token

#### Projects
- `GET /projects` - Get all user projects
- `POST /projects` - Create a new project
- `GET /projects/{project_id}` - Get project by ID
- `PUT /projects/{project_id}` - Update project
- `DELETE /projects/{project_id}` - Delete project

#### Tasks
- `GET /tasks` - Get all user tasks
- `POST /tasks` - Create a new task
- `GET /tasks/{task_id}` - Get task by ID
- `PUT /tasks/{task_id}` - Update task
- `DELETE /tasks/{task_id}` - Delete task
- `GET /projects/{project_id}/tasks` - Get tasks for a project

## 🎨 UI Components

The project uses [shadcn/ui](https://ui.shadcn.com/) components, including:
- Buttons, Inputs, Forms
- Dialogs, Modals, Sheets
- Cards, Badges, Avatars
- Dropdowns, Selects, Tabs
- Toast notifications
- Theme provider

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Frontend route guards
- **CORS Configuration**: Controlled cross-origin requests
- **SQL Injection Protection**: SQLAlchemy ORM
- **Input Validation**: Pydantic schemas

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
```
The production build will be in the `frontend/dist` directory.

### Backend
The FastAPI backend can be deployed using:
- **Uvicorn** with Gunicorn
- **Docker**
- **Cloud platforms** (AWS, Heroku, Railway, etc.)

Example production command:
```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:5000
```

## 🐳 Docker Deployment (Optional)

### Create Dockerfile for Backend
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]
```

### Create Dockerfile for Frontend
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Harsh Chaurasia**

- GitHub: [@harshchaurasia](https://github.com/harshchaurasia)

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [React](https://react.dev/) - JavaScript library for building UIs
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [PostgreSQL](https://www.postgresql.org/) - Powerful open source database

## 📧 Contact

For Contact, email chaursiaharsh324@gmail.com or open an issue in the repository.

---
