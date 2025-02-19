import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle, FaCheckCircle, FaTimesCircle, FaFileAlt } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("id");

      if (!userId) {
        setError("⚠ User ID not found in localStorage!");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${userId}`);
        console.log("Profile Data:", res.data);
        setProfile(res.data);
      } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        setError(err.response?.data?.error || "❌ Error loading profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-lg w-full border border-white/20 transform transition-all">
        
        {/* Glowing Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-white/10 to-purple-400/10 blur-lg opacity-20 rounded-2xl"></div>

        {/* Loading & Error States */}
        {loading ? (
          <p className="text-gray-300 text-center">⏳ Loading Profile...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="text-white">
            {/* User Avatar */}
            <div className="flex justify-center">
              <FaUserCircle className="text-6xl text-blue-400 drop-shadow-lg mb-3" />
            </div>

            {/* Username */}
            <h2 className="text-3xl font-extrabold text-center">Sujal Mansuri</h2>   {/*profile?.username || "N/A"} 
            
            {/* XP & Progress Bar */}
            <div className="mt-4">
              <p className="text-gray-300 font-semibold">XP:200 </p>     {/*profile?.xp ?? 0*/}
              <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden mt-2">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all"
                  style={{ width: `${Math.min(profile?.xp ?? 0, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Proof Status */}
            <p className="mt-4 font-medium">
              <strong className="text-blue-400">Proof Status:</strong>{" "}
              {profile?.submissionStatus === "approved" ? (
                <span className="text-green-400 flex items-center space-x-2">
                  <FaCheckCircle /> <span>Approved</span>
                </span>
              ) : profile?.submissionStatus === "rejected" ? (
                <span className="text-red-400 flex items-center space-x-2">
                  <FaTimesCircle /> <span>Rejected</span>
                </span>
              ) : (
                <span className="text-yellow-400">Pending</span>
              )}
            </p>

            {/* Proof File */}
            {/* {profile?.proofUrl ? (
              <p className="mt-4">
                <a
                  href={`http://localhost:5000/${profile.proofUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 flex items-center space-x-2 hover:underline"
                >
                  <FaFileAlt /> <span>View Proof</span>
                </a>
              </p>
            ) : (
              <p className="text-gray-500 mt-4">No proof submitted.</p>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
