const express = require("express");
const multer = require("multer");
const Submission = require("../models/Submission");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Upload proof submission
router.post("/upload/:questId", upload.single("file"), async (req, res) => {
  try {
    const { userId, userName } = req.body;
    const { questId } = req.params;
    const fileUrl = req.file.path;

    if (!userId || !questId || !fileUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newSubmission = new Submission({
      userId,
      userName,
      questId,
      fileUrl,
    });

    await newSubmission.save();
    res.status(201).json({ message: "Proof submitted successfully" });
  } catch (error) {
    console.error("Error uploading proof:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all submissions (Admin panel)
router.get("/", async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("userId")
      .populate("questId");
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching submissions" });
  }
});

// Approve/reject a submission
router.put("/:submissionId", async (req, res) => {
  try {
    const { status } = req.body;
    const { submissionId } = req.params;

    const submission = await Submission.findByIdAndUpdate(
      submissionId,
      { status },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    res.status(200).json({ message: `Submission marked as ${status}` });
  } catch (error) {
    res.status(500).json({ error: "Error updating submission status" });
  }
});

module.exports = router;
