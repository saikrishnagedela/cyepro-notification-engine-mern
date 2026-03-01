require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Event = require("./src/models/Event");

const app = express();

app.use(cors());
app.use(express.json());

/* ===============================
   MongoDB Connection
================================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

/* ===============================
   ROOT HEALTH ROUTE
================================ */
app.get("/", (req, res) => {
  res.send("✅ Cypro Notification Engine Backend Running");
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

    res.json({ total, now, later, never });
  } catch (err) {
    res.status(500).json({ error: "Stats failed" });
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
   EVENTS API
================================ */
app.post("/events", async (req, res) => {
  try {
    const { user_id, event_type, message, priority_hint } = req.body;

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

    res.json({
      success: true,
      classification,
      data: event,
    });
  } catch (err) {
    console.log(err);
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