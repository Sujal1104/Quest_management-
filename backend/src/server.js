const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); // Explicitly importing cors for clarity
const multer = require("multer"); // For file uploads
const path = require("path"); // For file paths
const adminRoutes = require("./routes/adminRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const questRoutes = require("./routes/questRoutes");
const userRoutes = require("./routes/userRoutes"); 
dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB
// Ensure this path is correct

const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filenames
  },
});
const upload = multer({ storage }); // Initialize multer

// Ensure the 'uploads' directory is served as static files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// // app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", require("./routes/authRoutes")); // Authentication routes
app.use("/api/quests", require("./routes/questRoutes")); // Quest routes
app.use("/api/admin", adminRoutes); // Admin-specific routes
app.use("/api/submissions", submissionRoutes); // Submission routes
app.use("/api/quests", questRoutes);
// Health check route (optional for debugging)
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api", userRoutes); // Ensure this is included

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
