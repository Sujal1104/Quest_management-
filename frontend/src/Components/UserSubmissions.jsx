import { useEffect, useState } from "react";
import axios from "axios";

const UserSubmissions = ({ userId }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/submissions?userId=${userId}`);
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, [userId]);

  return (
    <div>
      <h2 className="text-xl font-bold">Your Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div key={submission._id} className="p-4 border rounded-lg shadow">
              <p><strong>Quest ID:</strong> {submission.questId}</p>
              <p>
                <strong>Proof:</strong>{" "}
                <a href={`http://localhost:5000/${submission.fileUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  View Proof
                </a>
              </p>
              <p><strong>Status:</strong> 
                <span className={submission.status === "approved" ? "text-green-500" : "text-red-500"}>
                  {submission.status}
                </span>
              </p>
              {submission.status === "approved" && (
                <p className="text-green-600 font-semibold">Your XP has been updated!</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSubmissions;
