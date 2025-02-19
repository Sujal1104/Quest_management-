const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("./src/models/User"); // Adjust the path to your User model

dotenv.config(); // Load environment variables

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Check if an admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin);
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("admin_password", 10);

    // Create the admin user
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin", // Set the role to "admin"
    });

    console.log("Admin user created successfully:", adminUser);
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

createAdminUser();
