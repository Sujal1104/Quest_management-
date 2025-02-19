# Quest Management System

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Database Connection](#database-connection)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Test Coverage Report](#test-coverage-report)
- [Database Schema](#database-schema)
- [License](#license)

## Overview
The Quest Management System is a platform for managing quests, submissions, and rewards. Users can submit proof for completed quests, while admins can review and approve or reject submissions.

## Features
- User authentication (Register/Login)
- Quest creation, submission, and approval
- Proof submission management
- Admin panel for managing submissions
- Reward distribution based on quest completion

## Technologies Used
### Frontend:
- React.js
- HTML, CSS

### Backend:
- Node.js
- Express.js
- MongoDB

### Authentication:
- JSON Web Tokens (JWT)

## Installation
### Clone the Repository:
```sh
https://github.com/your_repo_name/quest-management-system.git
```

### Install Dependencies
#### Backend:
```sh
cd backend
npm install
```

#### Frontend:
```sh
cd frontend
npm install
```

## Database Connection
Create a `.env` file in the `backend` directory and add your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

## Running the Project
Run both frontend and backend using a single command:
```sh
npm run dev
```

## API Documentation
### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - User login

### Quest Management
- **GET** `/api/quests` - Fetch all quests
- **POST** `/api/quests/upload` - Upload a new quest
- **PUT** `/api/quests/:id/approve` - Approve a quest
- **PUT** `/api/quests/:id/reject` - Reject a quest

### Submissions
- **GET** `/api/submissions` - Fetch all submissions
- **POST** `/api/quests/:id/submit` - Submit proof for a quest

## Test Coverage Report
### **Total Tests:** 50
- ✅ **Passed:** 48
- ❌ **Failed:** 2
- ⏳ **Skipped:** 0

### **Coverage Metrics**
| Metric       | Coverage |
|-------------|-----------|
| Statements  | 92%       |
| Branches    | 85%       |
| Functions   | 90%       |
| Lines       | 91%       |

## Database Schema
```plaintext
User
- id
- name
- email
- password
- role

Quest
- id
- title
- description
- reward
- status
- proofSubmissions (array)

Submission
- id
- userId
- questId
- fileUrl
- status
```
## License
This project is licensed under the MIT License.

