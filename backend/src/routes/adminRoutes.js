const express = require("express");
const { createQuest, updateQuest, deleteQuest, getAllUsers } = require("../controllers/adminController");
const checkRole = require("../middlewares/checkRole");
const router = express.Router();

// Protect all admin routes with role check
router.use(checkRole("admin"));

router.post("/quests", createQuest); // Add a quest
router.put("/quests/:id", updateQuest); // Update a quest
router.delete("/quests/:id", deleteQuest); // Delete a quest
router.get("/users", getAllUsers); // Fetch all users

router.post("/approve-submission/:submissionId", async (req, res) => {
    try {
      const { submissionId } = req.params;
      const { isApproved, xpReward } = req.body; // Admin decides XP
  
      const submission = await Submission.findById(submissionId);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }
  
      // Update submission status
      submission.status = isApproved ? "approved" : "rejected";
      await submission.save();
  
      if (isApproved) {
        // Update user XP only if the proof is valid
        await User.findByIdAndUpdate(submission.userId, { $inc: { xp: xpReward } });
      }
  
      res.json({ message: `Submission ${isApproved ? "approved" : "rejected"}` });
    } catch (error) {
      console.error("Error approving submission:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  



module.exports = router;
