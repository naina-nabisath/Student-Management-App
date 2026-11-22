# Student Management System

A full-stack Student Management System built using **React.js, Spring Boot, and MySQL**. This application helps manage student records through a clean and responsive dashboard.

## Features

- **Dashboard:** View total students, courses, and departments.
- **Add Students:** Register students with their personal and academic details.
- **View Students:** Display all registered students in an organized table.
- **Search Students:** Search records by name, email, course, or department.
- **Edit Students:** Update existing student information.
- **Delete Students:** Remove student records.
- **Database Integration:** Store and manage student information using MySQL.

## Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- Lucide React

**Backend**
- Java 21
- Spring Boot
- Spring Data JPA
- Maven

**Database**
- MySQL

## Project Structure

```text
Student Management/
├── backend/
│   └── Spring Boot application
│
└── frontend/
    └── React application
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Run the Backend

Navigate to the backend folder:

```bash
cd backend
```

Configure your MySQL database credentials in `application.properties`, then run:

```bash
mvn spring-boot:run
```

Backend runs at:

`http://localhost:8080`

### 3. Run the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

`http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Add a student |
| PUT | `/api/students/{id}` | Update a student |
| DELETE | `/api/students/{id}` | Delete a student |
| GET | `/api/students/count` | Get student count |

## Purpose

This project was developed to practise full-stack application development, REST API integration, database operations, and CRUD functionality using React and Spring Boot.
