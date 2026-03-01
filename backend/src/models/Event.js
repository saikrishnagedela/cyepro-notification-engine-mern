const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    event_type: { type: String, required: true },
    message: { type: String, required: true },
    source: { type: String, default: "unknown" },
    priority_hint: {
      type: String,
      enum: ["critical", "high", "medium", "low"],
      default: "medium",
    },
    channel: { type: String, default: "push" },
    classification: {
      type: String,
      enum: ["NOW", "LATER", "NEVER"],
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);