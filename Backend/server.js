const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Generate Registration Number
function generateRegistrationNumber() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `AUFOET${randomNum}`;
}

// MongoDB Connection
const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/university_project";

mongoose
  .connect(mongoUri)
  .then(() => console.log(`✅ Connected to MongoDB`))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Mongoose Schema
const SubmissionSchema = new mongoose.Schema({
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  registrationNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  studentWhatsapp: { type: String, required: true },
  parentWhatsapp: { type: String, required: true },
  numParents: { type: Number, required: true },
});

const Submission = mongoose.model("Submission", SubmissionSchema);

// API Route
app.post("/api/submit-form", async (req, res) => {
  try {
    const {
      fullName,
      email,
      branch,
      studentWhatsapp,
      parentWhatsapp,
      numParents,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !branch ||
      !studentWhatsapp ||
      !parentWhatsapp ||
      numParents === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Submission.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const token = generateRegistrationNumber();

    await Submission.create({
      fullName,
      email,
      registrationNumber: token,
      branch,
      studentWhatsapp,
      parentWhatsapp,
      numParents,
    });

    const branchLinks = {
      CE: "https://chat.whatsapp.com/ce-branch-invite",
      CSE: "https://chat.whatsapp.com/cse-branch-invite",
      EC: "https://chat.whatsapp.com/ec-branch-invite",
      CIVIL: "https://chat.whatsapp.com/civil-branch-invite",
      MECH: "https://chat.whatsapp.com/mech-branch-invite",
      EE: "https://chat.whatsapp.com/ee-branch-invite",
    };

    const inviteLink = branchLinks[branch] || "";

    return res.status(200).json({
      message: "Registered successfully!",
      inviteLink,
      token,
    });
  } catch (err) {
    console.error("❌ API Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
