const express = require("express");
const router = express.Router();
const db = require("../db");

// Dashboard Summary API
router.get("/summary", async (req, res) => {
  try {
    const results = {};

    const [staffRows] = await db.promise().query("SELECT COUNT(*) AS count FROM staff");
    results.staff = staffRows[0].count;

    const [farmerRows] = await db.promise().query("SELECT COUNT(*) AS count FROM Farmer");
    results.farmers = farmerRows[0].count;

    const [buyerRows] = await db.promise().query("SELECT COUNT(*) AS count FROM buyer");
    results.buyers = buyerRows[0].count;

    const [harvestRows] = await db.promise().query("SELECT SUM(TotalHarvest) AS total FROM Harvest");
    results.totalHarvest = harvestRows[0].total || 0;

    res.status(200).json(results);
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
});

module.exports = router;
