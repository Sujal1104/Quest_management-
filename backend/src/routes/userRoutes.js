const express = require("express");
const User = require("../models/User");
const Submission = require("../models/Submission");
const mongoose = require('mongoose');

// Your route definitions...




const router = express.Router();

// Fetch user profile including XP and proof submission status
router.get("/profile/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      console.log("Fetching profile for user:", userId);
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID format" });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found in database" });
      }
  
      const submission = await Submission.findOne({ userId }).sort({ createdAt: -1 });
  
      res.json({
        userId: user._id,
        username: user.username,
        xp: user.xp || 0,
        submissionStatus: submission ? submission.status : "No Submission",
        proofUrl: submission ? submission.fileUrl : null,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

module.exports = router;
