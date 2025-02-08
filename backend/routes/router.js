const express = require("express");
const { verifyToken, authorizeRoles } = require("../helpers/auth");
const router = express.Router();

router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.status(200).json({ message: "Welcome, Admin!" });
});

router.get("/user", verifyToken, authorizeRoles("user", "admin"), (req, res) => {
  res.status(200).json({ message: "Welcome, User!" });
});

module.exports = router;
