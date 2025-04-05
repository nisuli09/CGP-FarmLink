const express = require("express");
const router = express.Router();
const db = require("../db");

// Dashboard Summary API
router.get("/summary", async (req, res) => {
  try {
    const queries = {
      staff: "SELECT COUNT(*) AS count FROM staff",
      farmers: "SELECT COUNT(*) AS count FROM Farmer",
      buyers: "SELECT COUNT(*) AS count FROM buyer",
      harvest: "SELECT SUM(TotalHarvest) AS total FROM Harvest"
    };

    const results = {};

    // Use Promises for each query
    for (const [key, query] of Object.entries(queries)) {
      const [rows] = await db.promise().query(query);
      results[key] = rows[0].count || rows[0].total || 0;
    }

    res.status(200).json({
      staff: results.staff,
      farmers: results.farmers,
      buyers: results.buyers,
      totalHarvest: results.harvest,
    });
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
});

module.exports = router;
