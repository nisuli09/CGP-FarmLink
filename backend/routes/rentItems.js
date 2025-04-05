const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all rent items
router.get("/", (req, res) => {
  const query = "SELECT * FROM RentItems";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching rent items:", err);
      return res.status(500).json({ error: "Failed to fetch rent items" });
    }
    res.status(200).json(results);
  });
});

// GET all rent items
router.get("/:id", (req, res) => {
  const query = "SELECT * FROM RentItems WHERE rent_id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error fetching rent item" });
    res.status(200).json(result[0]);
  });
});

// ADD a rent item
router.post("/", (req, res) => {
  const { rent_id, rent_name, rent_image, rent_description, rent_stock, rent_rating, rent_price } = req.body;
  const query = "INSERT INTO RentItems VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [rent_id, rent_name, rent_image, rent_description, rent_stock, rent_rating, rent_price];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error adding rent item:", err);
      return res.status(500).json({ error: "Failed to add rent item" });
    }
    res.status(201).json({ message: "Rent item added successfully" });
  });
});

// UPDATE a rent item
router.put("/:id", (req, res) => {
  const rent_id = req.params.id;
  const { rent_name, rent_image, rent_description, rent_stock, rent_rating, rent_price } = req.body;

  const query = `
    UPDATE RentItems 
    SET rent_name=?, rent_image=?, rent_description=?, rent_stock=?, rent_rating=?, rent_price=?
    WHERE rent_id=?
  `;
  const values = [rent_name, rent_image, rent_description, rent_stock, rent_rating, rent_price, rent_id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating rent item:", err);
      return res.status(500).json({ error: "Failed to update rent item" });
    }
    res.status(200).json({ message: "Rent item updated successfully" });
  });
});

// DELETE a rent item
router.delete("/:id", (req, res) => {
  const rent_id = req.params.id;
  const query = "DELETE FROM RentItems WHERE rent_id = ?";

  db.query(query, [rent_id], (err, result) => {
    if (err) {
      console.error("Error deleting rent item:", err);
      return res.status(500).json({ error: "Failed to delete rent item" });
    }
    res.status(200).json({ message: "Rent item deleted successfully" });
  });
});


module.exports = router;
