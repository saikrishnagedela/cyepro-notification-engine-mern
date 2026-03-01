require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Event = require("./src/models/Event");

const app = express();

app.use(cors());
app.use(express.json());

/* ===============================
   ROOT ROUTE (FIXES Cannot GET /)
================================*/
app.get("/", (req, res) => {
  res.send("✅ Cypro Notification Engine Backend Running");
});

/* ===============================
   HEALTH CHECK
================================*/
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

/* ===============================
   STATS API
================================*/
app.get("/stats", async (req, res) => {
  try {
    const total = await Event.countDocuments();
    const now = await Event.countDocuments({ classification: "NOW" });
    const later = await Event.countDocuments({ classification: "LATER" });
    const never = await Event.countDocuments({ classification: "NEVER" });

    res.json({ total, now, later, never });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===============================
   CREATE EVENT
================================*/
app.post("/events", async (req, res) => {
  try {
    const { user_id, event_type, message, priority_hint } = req.body;

    let classification = "LATER";

    if (priority_hint === "critical") classification = "NOW";
    else if (priority_hint === "low") classification = "LATER";
    else classification = "NEVER";

    const event = new Event({
      user_id,
      event_type,
      message,
      priority_hint,
      classification,
    });

    await event.save();

    res.json({
      success: true,
      classification,
      data: event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* ===============================
   DATABASE CONNECT
================================*/
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

/* ===============================
   SERVER START
================================*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});