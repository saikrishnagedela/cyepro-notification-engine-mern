require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Event = require("./src/models/Event");

const app = express();

/* ===============================
   MIDDLEWARE
================================ */
app.use(cors());
app.use(express.json());

/* ===============================
   DATABASE CONNECTION
================================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

/* ===============================
   ROOT ROUTE
================================ */
app.get("/", (req, res) => {
  res.send("✅ Cypro Notification Engine Backend Running");
});

/* ===============================
   HEALTH CHECK ROUTE
================================ */
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Notification Engine API",
  });
});

/* ===============================
   STATS ENDPOINT
================================ */
app.get("/stats", async (req, res) => {
  try {
    const total = await Event.countDocuments();
    const now = await Event.countDocuments({ classification: "NOW" });
    const later = await Event.countDocuments({ classification: "LATER" });
    const never = await Event.countDocuments({ classification: "NEVER" });

    res.json({
      total,
      now,
      later,
      never,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Stats fetch failed",
    });
  }
});

/* ===============================
   CLASSIFICATION LOGIC
================================ */
function classifyEvent(priority) {
  if (priority === "critical") return "NOW";
  if (priority === "medium") return "LATER";
  return "NEVER";
}

/* ===============================
   CREATE EVENT API
================================ */
app.post("/events", async (req, res) => {
  try {
    const { user_id, event_type, message, priority_hint } = req.body;

    if (!user_id || !event_type || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const classification = classifyEvent(priority_hint);

    const event = await Event.create({
      user_id,
      event_type,
      message,
      source: "unknown",
      priority_hint,
      channel: "push",
      classification,
    });

    console.log(`📩 Event Saved (${classification}):`, event._id);

    res.json({
      success: true,
      classification,
      data: event,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to process event",
    });
  }
});

/* ===============================
   SERVER START
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});