const Quest = require("../models/Quest");
const User = require("../models/User");
const Submission = require("../models/Submission");
// 🟢 Get all quests
exports.getQuests = async (req, res) => {
  try {
    const quests = await Quest.find();
    res.status(200).json(quests);
  } catch (error) {
    console.error("Error fetching quests:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 🟢 Get a quest by ID
exports.getQuestById = async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) return res.status(404).json({ message: "Quest not found" });
    res.status(200).json(quest);
  } catch (error) {
    console.error("Error fetching quest by ID:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 🟢 User uploads a quest with a file
exports.uploadQuest = async (req, res) => {
  try {
    const { title, description, requirements, reward, userId } = req.body;

    if (!title || !description || !requirements || !reward || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuest = new Quest({
      title,
      description,
      requirements,
      reward,
      file: req.file ? req.file.path : null, // ✅ Save file path if uploaded
      status: "pending", // ✅ Default status is pending
      user: userId, // ✅ Assign quest to a user
    });

    await newQuest.save();
    res.status(201).json({ message: "Quest uploaded successfully", quest: newQuest });
  } catch (error) {
    console.error("Error uploading quest:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 🟢 User submits proof for a quest
exports.submitQuestProof = async (req, res) => {
  try {
    const { userId } = req.body;
    const questId = req.params.id;
    const filePath = req.file?.path; // Get uploaded file path

    console.log("🔹 Checking user:", userId);
    console.log("🔹 Checking quest:", questId);
    console.log("✅ Proof submission received:", filePath);

    // Check if quest exists
    const quest = await Quest.findById(questId);
    if (!quest) {
      return res.status(404).json({ error: "Quest not found" });
    }

    // Ensure proofSubmissions array exists
    if (!quest.proofSubmissions) {
      quest.proofSubmissions = [];
    }

    // Add proof submission
    quest.proofSubmissions.push({
      userId,
      filePath,
      submittedAt: new Date(),
      status: "pending",
    });

    // Save updated quest
    await quest.save();

    return res.status(200).json({ message: "Proof submitted successfully!" });
  } catch (error) {
    console.error("❌ Error in submitQuestProof:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



// 🔴 Admin approves a quest
exports.approveQuest = async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) return res.status(404).json({ message: "Quest not found" });

    quest.status = "approved";
    await quest.save();

    res.status(200).json({ message: "Quest approved", quest });
  } catch (error) {
    console.error("Error approving quest:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 🔴 Admin rejects a quest
exports.rejectQuest = async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) return res.status(404).json({ message: "Quest not found" });

    quest.status = "rejected";
    await quest.save();

    res.status(200).json({ message: "Quest rejected", quest });
  } catch (error) {
    console.error("Error rejecting quest:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 🏆 Check if user is rewardable
exports.checkUserReward = async (req, res) => {
  try {
    const userId = req.params.userId;
    const completedQuests = await Quest.find({ user: userId, status: "approved" });

    if (completedQuests.length >= 3) { // ✅ Example: User must complete at least 3 quests
      res.status(200).json({ rewardable: true, message: "User is eligible for a reward!" });
    } else {
      res.status(200).json({ rewardable: false, message: "User needs to complete more quests." });
    }
  } catch (error) {
    console.error("Error checking user reward:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("userId", "name")
      .populate("questId", "title");
    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.submitProof = async (req, res) => {
  try {
    const { userId, questId, fileUrl } = req.body;

    if (!userId || !questId || !fileUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newSubmission = new Submission({ userId, questId, fileUrl });
    await newSubmission.save();

    res.status(201).json({ message: "Proof submitted successfully", submission: newSubmission });
  } catch (error) {
    console.error("Error saving submission:", error);
    res.status(500).json({ message: "Server error", error });
  }
};