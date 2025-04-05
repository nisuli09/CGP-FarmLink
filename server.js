const express = require("express");
const cors = require("cors");
const db = require("../CGP-FarmLink/backend/db");

// Existing Routes
const staffRoutes = require("../CGP-FarmLink/backend/routes/staff");

// New Shop Routes
const rentItemsRoutes = require("../CGP-FarmLink/backend/routes/rentItems");
const fertilizersRoutes = require("../CGP-FarmLink/backend/routes/fertilizers");
const buyersRoutes = require("../CGP-FarmLink/backend/routes/buyers"); 
const dashboardRoutes = require("../CGP-FarmLink/backend/routes/dashboard");

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/staff", staffRoutes);
app.use("/api/rent-items", rentItemsRoutes);
app.use("/api/fertilizers", fertilizersRoutes);

// Farmer details route
app.get("/api/farmer/details", (req, res) => {
  const query = "SELECT * FROM farmer";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching farmer details:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }

    res.status(200).json(results);
  });
});

// Harvest details route
app.get("/api/harvest/getHarvest", (req, res) => {
  const query = "SELECT * FROM Harvest";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching harvest details:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }

    res.status(200).json(results);
  });
});

// Root Route
app.get("/", (req, res) => {
  res.send("FarmLink Backend is Running! 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});


app.use("/api/buyers", buyersRoutes);

app.use("/api/dashboard", dashboardRoutes);