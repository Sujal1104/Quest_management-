import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import QuestDashboard from "./pages/QuestDashboard";
import QuestDetails from "./pages/QuestDetails";
import AdminDashboard from "./pages/AdminDashboard";
import ManageQuests from "./pages/ManageQuests";
import ManageUsers from "./pages/ManageUsers"; 
import ManageSubmissions from "./pages/ManageSubmissions"; 
import Profile from "./pages/Profile"; // 🟢 Import the Profile Page
import ProtectedRoute from "./Components/ProtectedRoute";
import Leaderboard from "./pages/Leaderboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />     

        {/* User Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <QuestDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quest/:id"
          element={
            <ProtectedRoute requiredRole="user">
              <QuestDetails />
            </ProtectedRoute>
          }
        />
        
        {/* 🟢 Add Profile Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute requiredRole="user">
              <Profile />
            </ProtectedRoute>
          }
        /> 
         <Route
          path="/leaderboard"
          element={
            <ProtectedRoute requiredRole="user">
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/quests"
          element={
            <ProtectedRoute requiredRole="admin">
              <ManageQuests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/submissions"
          element={
            <ProtectedRoute requiredRole="admin">
              <ManageSubmissions />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
