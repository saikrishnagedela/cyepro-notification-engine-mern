const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const startTime = Date.now();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

const eventSchema = new mongoose.Schema({
  user_id: String,
  event_type: String,
  message: String,
  priority_hint: String,
  classification: String,
  source: { type: String, default: "unknown" },
  channel: { type: String, default: "push" },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);

function classifyEvent(priority) {
  if (priority === "critical") return "NOW";
  if (priority === "medium") return "LATER";
  return "NEVER";
}

app.post("/events", async (req, res) => {
  try {
    const { user_id, event_type, message, priority_hint } = req.body;
    const classification = classifyEvent(priority_hint);

    const newEvent = new Event({
      user_id,
      event_type,
      message,
      priority_hint,
      classification,
    });

    await newEvent.save();
    res.json({ success: true, classification });
  } catch {
    res.status(500).json({ success: false });
  }
});

app.get("/events", async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.json(events);
});

app.get("/queue", async (req, res) => {
  const queue = await Event.find({
    classification: "LATER",
  }).sort({ createdAt: -1 });

  res.json(queue);
});

app.get("/stats", async (req, res) => {
  const total = await Event.countDocuments();
  const now = await Event.countDocuments({ classification: "NOW" });
  const later = await Event.countDocuments({ classification: "LATER" });
  const never = await Event.countDocuments({ classification: "NEVER" });

  res.json({ total, now, later, never });
});

/* ===== METRICS ===== */

app.get("/metrics", async (req, res) => {
  const total = await Event.countDocuments();
  const now = await Event.countDocuments({ classification: "NOW" });
  const later = await Event.countDocuments({ classification: "LATER" });
  const never = await Event.countDocuments({ classification: "NEVER" });

  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

  res.json({
    systemStatus: "UP",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    uptimeSeconds,
    totalEvents: total,
    now,
    later,
    never,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});