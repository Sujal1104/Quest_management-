import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Add request interceptors to include token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User APIs
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const fetchQuests = () => API.get("/quests");
export const fetchQuestDetails = (questId) => API.get(`/quests/${questId}`);

// Submit proof for a quest
export const submitProof = async (questId, userId, file) => {
  if (!file) {
    console.error("No file selected!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);  // Ensure file is correctly appended
  formData.append("userId", userId);  // Ensure userId is correctly appended

  console.log("Submitting FormData:", Object.fromEntries(formData.entries())); // Debugging log

  try {
    return await axios.post(`http://localhost:5000/api/quests/${questId}/submit`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Error submitting proof:", error);
    throw error;
  }
};



// Fetch submissions for the admin panel
export const fetchSubmissions = () => API.get("/submissions");

export const fetchAllQuests = async () => {
  return axios.get("http://localhost:5000/api/quests");
};

// Approve or reject a submission
export const approveSubmission = (submissionId, status) => API.put(`/submissions/${submissionId}`, { status });
// export const submitProof = async (proofData) => {
//   return await axios.post("http://localhost:5000/api/quests/submit-proof", proofData);
// };

// Admin APIs for managing quests
export const createQuest = (data) => API.post("/quests/upload", data);
export const updateQuest = (id, data) => API.put(`/admin/quests/${id}`, data);
export const deleteQuest = (id) => API.delete(`/admin/quests/${id}`);
export const approveQuest = (questId) => API.put(`/quests/${questId}/approve`);
export const rejectQuest = (questId) => API.put(`/quests/${questId}/reject`);
