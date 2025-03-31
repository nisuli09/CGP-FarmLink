const express = require("express");
const db = require("../db");  // Assuming you're using this for DB connection
const router = express.Router();

// 1. Fetch all Harvest data for a particular farmer
router.get("/getHarvest", (req, res) => {
  const farmerID = req.params.FarmerID;

  const sql = SELECT * FROM Harvest;

  db.query(sql, [farmerID], (err, results) => {
    if (err) {
      console.error("Error fetching harvest data:", err);
      return res.status(500).json({ error: "Database error!" });
    }
    res.status(200).json(results); 
  });
});



module.exports = router;