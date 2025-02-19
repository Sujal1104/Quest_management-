const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questId: { type: mongoose.Schema.Types.ObjectId, ref: "Quest", required: true },
  fileUrl: { type: String, required: true },
  userName: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
});

module.exports = mongoose.model("Submission", SubmissionSchema);
