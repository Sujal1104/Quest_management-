import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestDetails, submitProof } from "../services/api";

const QuestDetails = () => {
  const { id } = useParams();
  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadQuestDetails = async () => {
      try {
        const { data } = await fetchQuestDetails(id);
        setQuest(data);
      } catch (err) {
        setErrorMessage("Failed to load quest details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.id) {
        setUser(storedUser);
      } else {
        setErrorMessage("User not found. Please log in again.");
      }
    } catch {
      setErrorMessage("Failed to load user data. Please log in again.");
    }

    loadQuestDetails();
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setErrorMessage("File size exceeds the 5MB limit.");
      return;
    }

    setFile(selectedFile);
    setErrorMessage(null);
  };

  const handleSubmitProof = async () => {
    if (!file) {
      setErrorMessage("Please select a file!");
      return;
    }

    if (!user || !user.id || !user.name) {
      setErrorMessage("User information is missing. Please log in again.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user.id);
      formData.append("questId", id);
      formData.append("userName", user.name);

      const response = await fetch("http://localhost:5000/api/quests/submit-proof", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Proof submitted successfully!");
        setErrorMessage(null);
        setFile(null);
        setTimeout(() => setSuccessMessage(null), 3000); // Auto-dismiss success message
      } else {
        throw new Error(data.message || "Failed to submit proof.");
      }
    } catch (error) {
      setErrorMessage("Failed to submit proof. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6 flex justify-center items-center">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full animate-fade-in">
          {quest ? (
            <>
              <h1 className="text-4xl font-bold text-gray-900">{quest.title}</h1>
              <p className="mt-4 text-gray-700">{quest.description}</p>
              <h3 className="mt-6 font-semibold text-lg text-gray-800">Requirements:</h3>
              <p className="text-gray-600">{quest.requirements}</p>
              <h3 className="mt-6 font-semibold text-lg text-gray-800">Reward:</h3>
              <p className="text-blue-500 font-bold">{quest.reward}</p>
            </>
          ) : (
            <p className="text-red-500">Quest details not available.</p>
          )}

          {successMessage && (
            <div className="mt-6 p-4 bg-green-100 text-green-700 rounded shadow-md animate-slide-in">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mt-6 p-4 bg-red-100 text-red-700 rounded shadow-md animate-slide-in">
              {errorMessage}
            </div>
          )}

          <div className="mt-8">
            <label className="block w-full border-dashed border-2 border-gray-300 rounded-lg p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
              <input type="file" onChange={handleFileChange} className="hidden" />
              {file ? (
                <span className="text-gray-700">{file.name}</span>
              ) : (
                <span className="text-gray-400">Click to upload proof</span>
              )}
            </label>

            <button
              onClick={handleSubmitProof}
              className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50"
              disabled={!file}
            >
              Submit Proof
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestDetails;
