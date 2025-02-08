const express = require("express");
const multer = require("multer");
const Assignment = require("../models/Assignment");
const authenticateToken = require("../helpers/auth");

const router = express.Router();

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Setting upload destination");
    cb(null, "uploads/"); // Ensure 'uploads/' exists
  },
  filename: (req, file, cb) => {
    console.log("Setting file name");
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload Assignment
router.post(
  "/upload",
  authenticateToken,
  upload.single("file"),
  async (req, res) => {
    console.log("File:", req.file); // Log file details
    console.log("Body:", req.body); // Log request body

    const { title } = req.body;
    const filePath = req.file?.path; // Optional chaining to avoid undefined errors

    if (!filePath) {
      return res.status(400).json({ message: "File upload failed" });
    }

    try {
      const assignment = new Assignment({
        userId: req.user.id,
        title,
        filePath,
      });
      await assignment.save();
      res.status(201).json({ message: "Assignment Uploaded" });
    } catch (error) {
      console.error("Error uploading assignment:", error);
      res.status(500).json({ message: "Error Uploading Assignment", error });
    }
  }
);

// Get User's Assignments
router.get("/", authenticateToken, async (req, res) => {
  console.log("Fetching assignments for user:", req.user.id);

  try {
    const assignments = await Assignment.find({ userId: req.user.id });
    res.status(200).json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ message: "Error Fetching Assignments", error });
  }
});


router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const assignment = await Assignment.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({ message: "Assignment Deleted", assignment });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Assignment", error });
  }
});


module.exports = router;
