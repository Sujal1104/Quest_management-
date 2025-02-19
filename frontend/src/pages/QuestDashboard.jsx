import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuests } from "../services/api";

const QuestDashboard = () => {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuests = async () => {
      try {
        const { data } = await fetchQuests();
        setQuests(data);
      } catch (err) {
        console.error("Error fetching quests:", err);
        alert("Failed to load quests. Please log in again.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    loadQuests();
  }, [navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading quests...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500 p-8">
         <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => navigate("/profile")}
          className="px-5 py-2 text-white font-semibold bg-black rounded-lg shadow-lg hover:bg-gray-900 transition-all hover:scale-105"
        >
          Go to Profile
        </button>

        <button
          onClick={() => navigate("/leaderboard")}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/50 flex items-center gap-2"
        >
          🏆 View Leaderboard
        </button>
      </div>
      <h1 className="text-4xl font-bold text-white text-center mb-8">Quest Dashboard</h1>

      {quests.length === 0 ? (
        <p className="text-center text-gray-200 text-lg">No quests available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {quests.map((quest) => (
            <div
              key={quest._id}
              className="p-6 rounded-xl bg-gradient-to-br from-green-300 to-white-500 shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-transparent hover:border-yellow-300"
              onClick={() => navigate(`/quest/${quest._id}`)}
            >
              <h2 className="text-2xl font-bold text-white">{quest.title}</h2>
              <p className="text-gray-200 mt-2">{quest.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-yellow-300 font-semibold">{quest.reward} </p>
                <button className="bg-black text-white py-1 px-4 rounded-lg shadow-md hover:bg-gray-900 transition-all hover:scale-105">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestDashboard;
