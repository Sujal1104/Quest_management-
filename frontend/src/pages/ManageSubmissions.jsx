import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaUser, FaFileAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/quests/submissions");
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };
    fetchData();
  }, []);

  const updateSubmissionStatus = (submissionId, status) => {
    setSubmissions((prev) =>
      prev.map((s) => (s._id === submissionId ? { ...s, status } : s))
    );
  };

  const handleApprove = async (submissionId, userId) => {
    try {
      await axios.post("http://localhost:5000/api/quests/approve", { submissionId, userId });
      updateSubmissionStatus(submissionId, "approved");

      toast.success("✅ Submission Approved!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

    } catch (error) {
      console.error("Error approving submission:", error);
      toast.error("❌ Failed to Approve Submission");
    }
  };

  const handleReject = async (submissionId) => {
    try {
      await axios.post("http://localhost:5000/api/quests/reject", { submissionId });
      updateSubmissionStatus(submissionId, "rejected");

      toast.error("❌ Submission Rejected!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

    } catch (error) {
      console.error("Error rejecting submission:", error);
      toast.error("⚠️ Failed to Reject Submission");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-10">
      {/* Toast Notification Container */}
      <ToastContainer />

      <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-lg mb-8">
        Manage Submissions
      </h1>

      {submissions.length === 0 ? (
        <p className="text-center text-gray-300 text-lg">No submissions available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map((submission) => (
            <div
              key={submission._id}
              className="relative bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg transition hover:scale-105 hover:border-blue-500/50 hover:shadow-blue-500/30 backdrop-blur-md"
            >
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <FaUser className="text-blue-400 text-2xl" />
                <h2 className="text-lg font-semibold text-white">{submission.userName}</h2>
              </div>

              {/* Quest Title */}
              <p className="text-gray-300 mt-2">
                <strong className="text-blue-400">Quest:</strong> {submission.questId?.title || "Unknown Quest"}
              </p>

              {/* Proof File */}
              {submission.fileUrl && (
                <p className="mt-3">
                  <a
                    href={submission.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 flex items-center space-x-2 hover:underline"
                  >
                    <FaFileAlt />
                    <span>View Proof</span>
                  </a>
                </p>
              )}

              {/* Status Badge */}
              <p
                className={`mt-4 inline-block text-sm font-semibold px-3 py-1 rounded-full 
                ${submission.status === "approved" ? "bg-green-500/20 text-green-400" :
                  submission.status === "rejected" ? "bg-red-500/20 text-red-400" :
                  "bg-yellow-500/20 text-yellow-400"}`}
              >
                {submission.status || "Pending"}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleApprove(submission._id, submission.userId)}
                  disabled={submission.status === "approved"}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-lg font-medium hover:bg-green-500/30 transition disabled:opacity-50"
                >
                  <FaCheckCircle />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleReject(submission._id)}
                  disabled={submission.status === "rejected"}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg font-medium hover:bg-red-500/30 transition disabled:opacity-50"
                >
                  <FaTimesCircle />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageSubmissions;
