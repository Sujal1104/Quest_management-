const mongoose = require("mongoose");

const questSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
  },
  reward: {
    type: String,
  },
  proofSubmissions: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
      filePath: { type: String, required: true }, // File proof path
      submittedAt: { type: Date, default: Date.now }, // Submission timestamp
      status: { 
        type: String, 
        enum: ["pending", "approved", "rejected"], 
        default: "pending" 
      } // Approval status
    }
  ],
});

module.exports = mongoose.model("Quest", questSchema);
