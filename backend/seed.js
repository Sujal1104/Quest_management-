const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Quest = require("./src/models/Quest");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Example quests
const quests = [
  {
    title: "Complete Profile",
    description: "Fill out your profile information to get started.",
    requirements: "Add your name, email, and upload a profile picture.",
    reward: "100 XP",
  },
  {
    title: "First Submission",
    description: "Submit proof for completing your first task.",
    requirements: "Upload a valid proof document or screenshot.",
    reward: "200 XP",
  },
  {
    title: "Leaderboard Challenger",
    description: "Reach the top 10 in the leaderboard by completing quests.",
    requirements: "Achieve at least 1000 XP in total.",
    reward: "300 XP",
  },
  {
    title: "Daily Login Streak",
    description: "Log in every day for 7 consecutive days.",
    requirements: "Ensure you log in every day for a week.",
    reward: "150 XP",
  },
  {
    title: "Share Your Achievements",
    description: "Share your achievements on social media.",
    requirements: "Provide a screenshot of your shared post.",
    reward: "100 XP",
  },
  {
    title: "Bug Hunter",
    description: "Identify and report a bug in the system.",
    requirements: "Submit a detailed bug report.",
    reward: "250 XP",
  },
  {
    title: "Team Collaborator",
    description: "Work with a team to complete a group project.",
    requirements: "Submit proof of collaboration and project details.",
    reward: "400 XP",
  },
  {
    title: "Knowledge Quiz",
    description: "Test your knowledge by completing a short quiz.",
    requirements: "Achieve a score of at least 80% on the quiz.",
    reward: "150 XP",
  },
  {
    title: "Feedback Provider",
    description: "Provide constructive feedback about the platform.",
    requirements: "Submit a detailed feedback form.",
    reward: "50 XP",
  },
  {
    title: "Participate in the Monthly Event",
    description: "Join the monthly event and complete at least one activity.",
    requirements: "Submit proof of event participation.",
    reward: "500 XP",
  },
];

// Seed the database
const seedDatabase = async () => {
  try {
    await Quest.deleteMany(); // Clear existing quests
    await Quest.insertMany(quests); // Add new quests
    console.log("Database seeded with example quests!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    mongoose.connection.close();
  }
};

seedDatabase();
