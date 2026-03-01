// mern/backend/server.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Root route (important for Render test)
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ Classification Route
app.post("/api/classify", (req, res) => {
  try {
    const { userId, type, message, priority } = req.body;

    if (!userId || !type || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Simple logic (replace with your real logic if needed)
    let finalPriority = priority || "Low";

    if (type === "promo") {
      finalPriority = "Low";
    }

    if (type === "alert") {
      finalPriority = "High";
    }

    res.status(200).json({
      success: true,
      classification: finalPriority,
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ✅ PORT for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});