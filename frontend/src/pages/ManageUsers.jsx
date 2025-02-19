import React, { useEffect, useState } from "react";
import { FaUsers, FaSearch } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message));
  }, []);

  // Filter users based on search term (by Name or ID)
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        {/* Title */}
        <div className="flex items-center justify-center mb-6">
          <FaUsers className="text-4xl text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Search Input */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg mb-4">
          <FaSearch className="text-gray-500 ml-2" />
          <input
            type="text"
            placeholder="Search by Name or ID..."
            className="flex-1 bg-transparent outline-none px-3 text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`border-b transition duration-300 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="p-3 text-gray-700">{user._id}</td>
                    <td className="p-3 font-medium text-gray-800">{user.name}</td>
                    <td className="p-3 text-gray-700">{user.email}</td>
                    <td
                      className={`p-3 font-semibold uppercase ${
                        user.role === "admin" ? "text-green-600" : "text-blue-600"
                      }`}
                    >
                      {user.role.toUpperCase()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
