import React, { useState, useEffect } from "react";
import { FaMedal, FaTrophy, FaCrown } from "react-icons/fa";

const userData = [
  { id: "67b331296208e4f23883ab88", username: "John Doe", email: "john@example.com" },
  { id: "67b334b96a1f4d4464d09923", username: "Sujal Mansuri", email: "sujalsujal73838@gmail.com" },
  { id: "67b3799d46aa8ab345084d00", username: "Admin User", email: "admin@gmail.com" },
  { id: "67b40f622cc6624a123201a3", username: "Rahil Mansuri", email: "rahil@gmail.com" },
  { id: "67b5550570bbab6da8c9e0ce", username: "Jone", email: "jone123@gmail.com" },
];

// Assigning random XP values for demo
const generateXP = () => Math.floor(Math.random() * 5000) + 500;

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const leaderboardData = userData.map(user => ({
      ...user,
      xp: generateXP(),
    }));

    setPlayers(leaderboardData.sort((a, b) => b.xp - a.xp));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-lg w-full border border-white/20">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">🏆 Leaderboard</h2>

        {players.length === 0 ? (
          <p className="text-gray-300 text-center">⏳ Loading...</p>
        ) : (
          <div className="space-y-4">
            {players.map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-3 rounded-xl text-white transition-all ${
                  index === 0
                    ? "bg-yellow-500/20 border border-yellow-400/50 shadow-yellow-400/30"
                    : index === 1
                    ? "bg-gray-500/20 border border-gray-400/50 shadow-gray-400/30"
                    : index === 2
                    ? "bg-orange-500/20 border border-orange-400/50 shadow-orange-400/30"
                    : "bg-gray-800/50 border border-gray-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold">{index + 1}.</span>
                  <span className="text-xl">{player.username}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-300 font-semibold">{player.xp} XP</span>
                  {index === 0 && <FaCrown className="text-yellow-400 text-xl" />}
                  {index === 1 && <FaTrophy className="text-gray-400 text-lg" />}
                  {index === 2 && <FaMedal className="text-orange-400 text-lg" />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
