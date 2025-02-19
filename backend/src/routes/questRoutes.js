const express = require("express");
const multer = require("multer");
const {
  getQuests,
  getQuestById,
  uploadQuest,
  approveQuest,
  rejectQuest,
} = require("../controllers/questController");
const checkRole = require("../middlewares/checkRole");
const Submission = require("../models/Submission"); 
const User = require("../models/User");

const router = express.Router();

// 🟢 Multer Storage Setup for File Uploads
const storage = multer.diskStorage({
  destination: "uploads/", 
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});
const upload = multer({ storage }).single("file");

// 🟢 Fetch all quests
router.get("/", getQuests);

// 🟢 Fetch submissions
router.get("/submissions", async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("userId", "name") // Get only user's name
      .populate("questId", "title"); // Get quest title

    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// 🟢 Fetch a single quest by ID
router.get("/:id", getQuestById);

// 🟢 User uploads a new quest (File Upload)
router.post("/upload", upload, uploadQuest);

// 🟢 User submits proof for a quest
router.post("/submit-proof", upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    const { userId, questId, userName } = req.body;
    if (!userId || !questId || !userName) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const fileUrl = `uploads/${req.file.filename}`; // Simulated file URL

    const newSubmission = new Submission({
      userId,
      questId,
      fileUrl,
      userName,
      status: "pending",
    });

    await newSubmission.save();
    res.status(201).json({ message: "Proof submitted successfully!", fileUrl });
  } catch (error) {
    console.error("Error submitting proof:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🟢 Approve Submission & Add Reward
router.post("/approve", async (req, res) => {
  const { submissionId, userId } = req.body;

  try {
    const submission = await Submission.findById(submissionId);
    if (!submission) return res.status(404).json({ message: "Submission not found" });

    if (submission.status === "approved") {
      return res.status(400).json({ message: "Already approved." });
    }

    await Submission.findByIdAndUpdate(submissionId, { status: "approved" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.rewards += 100; // Example reward
    await user.save();

    res.status(200).json({ message: "Submission approved & reward added!" });
  } catch (error) {
    console.error("Error approving submission:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟢 Reject Submission
router.post("/reject", async (req, res) => {
  const { submissionId } = req.body;

  try {
    await Submission.findByIdAndUpdate(submissionId, { status: "rejected" });
    res.status(200).json({ message: "Submission rejected." });
  } catch (error) {
    console.error("Error rejecting submission:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔴 Admin approves a quest
router.put("/:id/approve", checkRole("admin"), approveQuest);

// 🔴 Admin rejects a quest
router.put("/:id/reject", checkRole("admin"), rejectQuest);






module.exports = router;
