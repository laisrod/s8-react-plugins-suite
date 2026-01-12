# React Plugins Suite

Full-stack web application that integrates multiple functionalities into a dashboard. Ideal project for learning React, TypeScript, Node.js, and MongoDB.

## What is this project?

This application is a complete dashboard with 4 main features:

1. Interactive Map - View locations on a map with category filters
2. Calendar - Manage events with creation, editing, and deletion
3. Charts - Visualize data with different chart types
4. User CRUD - Complete system to create, read, update, and delete users

## Technologies Used

### Frontend
- React 19
- TypeScript
- Vite
- React Router
- Leaflet (maps)
- Chart.js (charts)
- React Calendar

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- TypeScript

## Prerequisites

Before starting, you need to have installed:

1. Node.js (version 18 or higher)
   - Download at: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. Git
   - Download at: https://git-scm.com/
   - Verify: `git --version`

3. Docker (optional, for MongoDB)
   - Download at: https://www.docker.com/
   - Or use MongoDB Atlas (free cloud service)

## Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/seu-usuario/s8-react-plugins-suite.git
cd s8-react-plugins-suite
```

### Step 2: Configure the Backend

```bash
cd backend
npm install
```

Create the `backend/.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/crud_db
PORT=3000
```

Or if using MongoDB Atlas:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database-name
PORT=3000
```

### Step 3: Start MongoDB

Option A: Using Docker

```bash
cd backend
docker-compose up -d
```

Option B: MongoDB Atlas

1. Visit: https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Copy the connection string
5. Paste it in the `.env` file

### Step 4: Start the Backend

```bash
cd backend
npm run dev
```

You should see: "Server running on port 3000" and "MongoDB connected"

### Step 5: Configure the Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

### Step 6: Start the Frontend

```bash
cd frontend
npm run dev
```

You should see: "Local: http://localhost:5173"

### Step 7: Open in Browser

Open your browser and visit: http://localhost:5173

Done! The application is running.

## Project Structure

```
sprint8/
├── frontend/              # React Application
│   ├── src/
│   │   ├── components/    # React Components
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API Communication
│   │   └── types/         # TypeScript Definitions
│   └── package.json
│
└── backend/               # Node.js API
    ├── src/
    │   ├── controllers/   # Business Logic
    │   ├── models/        # Database Models
    │   ├── routes/        # API Routes
    │   └── config/        # Configurations
    └── package.json
```

## Features

### 1. Interactive Map
- View locations on a map
- Filter by category
- Click on markers to see information

### 2. Calendar
- View events in a visual calendar
- Double-click on an event to edit
- Create new events

### 3. Charts
- 4 different chart types
- Visualize data interactively

### 4. User CRUD
- Create - Add new users
- Read - View user list
- Update - Edit existing users
- Delete - Remove users

## Useful Commands

### Backend

```bash
cd backend

# Development
npm run dev

# Compile TypeScript
npm run build

# Run compiled version
npm start
```

### Frontend

```bash
cd frontend

# Development
npm run dev

# Build for production
npm run build

# Preview production version
npm run preview

# Check for errors
npm run lint
```

## Learning Resources

- React Documentation: https://react.dev/
- TypeScript Documentation: https://www.typescriptlang.org/
- Node.js Documentation: https://nodejs.org/
- MongoDB Documentation: https://www.mongodb.com/docs/
- Express Documentation: https://expressjs.com/



Developed for learning

