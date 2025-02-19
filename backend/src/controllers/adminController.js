const Quest = require("../models/Quest");
const User = require("../models/User");

// Create a new quest
exports.createQuest = async (req, res) => {
  try {
    const quest = await Quest.create(req.body);
    res.status(201).json({ message: "Quest created successfully", quest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an existing quest
exports.updateQuest = async (req, res) => {
  try {
    const quest = await Quest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quest) return res.status(404).json({ message: "Quest not found" });
    res.status(200).json({ message: "Quest updated successfully", quest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a quest
exports.deleteQuest = async (req, res) => {
  try {
    const quest = await Quest.findByIdAndDelete(req.params.id);
    if (!quest) return res.status(404).json({ message: "Quest not found" });
    res.status(200).json({ message: "Quest deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
