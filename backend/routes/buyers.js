const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all buyers
router.get("/", (req, res) => {
  const query = "SELECT * FROM buyer";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching buyers:", err);
      return res.status(500).json({ error: "Failed to fetch buyers" });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
