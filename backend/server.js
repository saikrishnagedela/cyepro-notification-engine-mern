require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Event = require("./src/models/Event");

const app = express();

/* ===============================
   MIDDLEWARE
================================ */
app.use(
  cors({
    origin: "*", // allow Vercel frontend
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

/* ===============================
   DATABASE CONNECTION
================================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

/* ===============================
   ROOT ROUTE
================================ */
app.get("/", (req, res) => {
  res.send("✅ Cypro Notification Engine Backend Running");
});

/* ===============================
   HEALTH CHECK
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

    res.json({ total, now, later, never });
  } catch (err) {
    console.error("STATS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Stats fetch failed",
    });
  }
});

/* ===============================
   CLASSIFICATION FUNCTION
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

    const safePriority = priority_hint || "low";

    const classification = classifyEvent(safePriority);

    const event = await Event.create({
      user_id,
      event_type,
      message,
      source: "unknown",
      priority_hint: safePriority,
      channel: "push",
      classification,
    });

    console.log(
      `📩 Event Saved (${classification}):`,
      event._id.toString()
    );

    res.json({
      success: true,
      classification,
      data: event,
    });
  } catch (err) {
    console.error("EVENT ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to process event",
    });
  }
});

/* ===============================
   SERVER START (RENDER SAFE)
================================ */
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});