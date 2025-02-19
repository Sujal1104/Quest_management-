import React, { useEffect, useState } from "react";
import {
  fetchQuests,
  createQuest,
  updateQuest,
  deleteQuest,
  approveQuest,
  rejectQuest,
} from "../services/api";

const ManageQuests = () => {
  const [quests, setQuests] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reward: "",
    file: null,
  });
  const [editingQuest, setEditingQuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuests = async () => {
      try {
        setLoading(true);
        const { data } = await fetchQuests();
        setQuests(data);
      } catch (err) {
        setError("Failed to load quests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadQuests();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("reward", formData.reward);
    if (formData.file) form.append("file", formData.file);

    try {
      if (editingQuest) {
        await updateQuest(editingQuest._id, form);
      } else {
        await createQuest(form);
      }

      const { data } = await fetchQuests();
      setQuests(data);
      setFormData({ title: "", description: "", reward: "", file: null });
      setEditingQuest(null);
    } catch (err) {
      setError("Failed to save quest. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuest(id);
      const { data } = await fetchQuests();
      setQuests(data);
    } catch (err) {
      setError("Failed to delete quest. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10 drop-shadow-lg">
        Manage Quests
      </h1>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      {/* Quest Form */}
      <form
        onSubmit={handleFormSubmit}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg max-w-lg mx-auto mb-10 border border-gray-300/20"
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">
          {editingQuest ? "Edit Quest" : "Add Quest"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full mb-4 p-3 bg-gray-900 text-white border border-gray-700 rounded"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          className="w-full mb-4 p-3 bg-gray-900 text-white border border-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Reward"
          value={formData.reward}
          onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
          required
          className="w-full mb-4 p-3 bg-gray-900 text-white border border-gray-700 rounded"
        />
        <input
          type="file"
          onChange={(e) =>
            setFormData({ ...formData, file: e.target.files[0] })
          }
          className="w-full mb-4 p-3 bg-gray-900 text-white border border-gray-700 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition duration-300"
        >
          {editingQuest ? "Update Quest" : "Add Quest"}
        </button>
      </form>

      {/* Quests List */}
      {loading ? (
        <p className="text-center text-gray-300">Loading quests...</p>
      ) : quests.length === 0 ? (
        <p className="text-center text-gray-400">No quests available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest) => (
            <div
              key={quest._id}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-300/20"
            >
              <h2 className="text-2xl font-bold text-blue-300">{quest.title}</h2>
              <p className="text-gray-300 mt-2">{quest.description}</p>
              <p className="text-green-400 mt-2 font-semibold">
                {quest.reward} 
              </p>
              {quest.file && (
                <p className="mt-2 text-green-500">
                  File uploaded:{" "}
                  <a
                    href={`http://localhost:5000/uploads/${quest.file}`}
                    className="underline"
                  >
                    Download
                  </a>
                </p>
              )}
              <p
                className={`mt-2 font-semibold ${
                  quest.status === "approved"
                    ? "text-green-500"
                    : quest.status === "rejected"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                Status: {quest.status}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => {
                    setEditingQuest(quest);
                    setFormData({
                      title: quest.title,
                      description: quest.description,
                      reward: quest.reward,
                    });
                  }}
                  className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(quest._id)}
                  className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => approveQuest(quest._id)}
                  className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectQuest(quest._id)}
                  className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageQuests;
