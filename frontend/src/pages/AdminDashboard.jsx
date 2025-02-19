import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-800 p-10 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-white text-center mb-12 drop-shadow-lg">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Manage Quests */}
        <Link
          to="/admin/quests"
          className="p-8 rounded-xl bg-white/10 backdrop-blur-md shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 border border-gray-300/20 text-white text-center"
        >
          <h2 className="text-2xl font-semibold text-blue-300">Manage Quests</h2>
          <p className="mt-2 text-gray-300">Add, edit, or delete quests for the system.</p>
        </Link>

        {/* View Users */}
        <Link
          to="/admin/users"
          className="p-8 rounded-xl bg-white/10 backdrop-blur-md shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 border border-gray-300/20 text-white text-center"
        >
          <h2 className="text-2xl font-semibold text-green-300">View Users</h2>
          <p className="mt-2 text-gray-300">View and manage user accounts in the system.</p>
        </Link>

        {/* Manage Submissions */}
        <Link
          to="/admin/submissions"
          className="p-8 rounded-xl bg-white/10 backdrop-blur-md shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 border border-gray-300/20 text-white text-center"
        >
          <h2 className="text-2xl font-semibold text-yellow-300">Manage Submissions</h2>
          <p className="mt-2 text-gray-300">Review and validate user quest submissions.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
