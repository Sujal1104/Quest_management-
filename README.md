# Quest Submission App

A full-stack web application where users can submit proof for quests, and admins can review and approve or reject submissions.

## Features

- **User Authentication**: Register/Login functionality
- **Quest Management**: Users can create, view, and submit proof for quests
- **Admin Dashboard**: Admins can approve or reject submitted proofs
- **Rewards System**: Users gain XP upon successful proof approval

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository

```sh
 git clone <your-repository-url>
 cd quest-submission-app
```

### 2️⃣ Install Dependencies (Frontend & Backend)

```sh
 cd frontend
 npm install
 cd ../backend
 npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the backend directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🚀 Running the Project

### **Start both Frontend & Backend together**

```sh
 npm run dev
```

This will run both the frontend and backend concurrently using `` package.

### **Run Individually (Optional)**

#### **Start Backend Only**

```sh
 cd backend
 npm run dev
```

#### **Start Frontend Only**

```sh
 cd frontend
 npm run dev
```

---

## 🔧 API Endpoints (Backend)

### **Auth Routes**

- `POST /api/auth/register` → User Registration
- `POST /api/auth/login` → User Login

### **Quest Routes**

- `GET /api/quests` → Fetch all quests
- `POST /api/quests/upload` → Upload a new quest (User)
- `POST /api/quests/:id/submit` → Submit proof for a quest
- `PUT /api/quests/:id/approve` → Approve quest submission (Admin)
- `PUT /api/quests/:id/reject` → Reject quest submission (Admin)

---

## 📁 Folder Structure

```plaintext
quest-submission-app/
│── backend/        # Node.js backend (Express, MongoDB)
│── frontend/       # React frontend
│── uploads/        # Folder for storing uploaded files
│── README.md       # Project documentation
│── package.json    # Dependencies & scripts
```

---

## 🔥 Troubleshooting

### Issue: `Failed to load resource: the server responded with a status of 400 (Bad Request)`

**Fix:** Ensure you are sending the correct `FormData` fields when uploading quests.

### Issue: `MulterError: Unexpected field`

**Fix:** Make sure your file input has the correct `name` attribute matching the backend (e.g., `file`).

### Issue: `MongoServerError: bad auth`

**Fix:** Check your `.env` file for the correct `MONGO_URI` and restart the backend.

---

## 🤝 Contributing

Feel free to fork the repository, open issues, and submit pull requests!

---

## 📜 License

This project is licensed under the MIT License.

