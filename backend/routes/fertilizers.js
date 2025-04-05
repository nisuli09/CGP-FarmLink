const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all fertilizers
router.get("/", (req, res) => {
  const query = "SELECT * FROM Fertilizers";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching fertilizers:", err);
      return res.status(500).json({ error: "Failed to fetch fertilizers" });
    }
    res.status(200).json(results);
  });
});

router.get("/:id", (req, res) => {
  const query = "SELECT * FROM Fertilizers WHERE fert_id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error fetching fertilizer" });
    res.status(200).json(result[0]);
  });
});


// ADD a fertilizer
router.post("/", (req, res) => {
  const { fert_id, fert_name, fert_image, fert_description, fert_stock, fert_rating, fert_price } = req.body;
  const query = "INSERT INTO Fertilizers VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [fert_id, fert_name, fert_image, fert_description, fert_stock, fert_rating, fert_price];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error adding fertilizer:", err);
      return res.status(500).json({ error: "Failed to add fertilizer" });
    }
    res.status(201).json({ message: "Fertilizer added successfully" });
  });
});

// UPDATE a fertilizer
router.put("/:id", (req, res) => {
  const fert_id = req.params.id;
  const { fert_name, fert_image, fert_description, fert_stock, fert_rating, fert_price } = req.body;

  const query = `
    UPDATE Fertilizers 
    SET fert_name=?, fert_image=?, fert_description=?, fert_stock=?, fert_rating=?, fert_price=?
    WHERE fert_id=?
  `;
  const values = [fert_name, fert_image, fert_description, fert_stock, fert_rating, fert_price, fert_id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating fertilizer:", err);
      return res.status(500).json({ error: "Failed to update fertilizer" });
    }
    res.status(200).json({ message: "Fertilizer updated successfully" });
  });
});

// DELETE a fertilizer
router.delete("/:id", (req, res) => {
  const fert_id = req.params.id;
  const query = "DELETE FROM Fertilizers WHERE fert_id = ?";

  db.query(query, [fert_id], (err, result) => {
    if (err) {
      console.error("Error deleting fertilizer:", err);
      return res.status(500).json({ error: "Failed to delete fertilizer" });
    }
    res.status(200).json({ message: "Fertilizer deleted successfully" });
  });
});

module.exports = router;
