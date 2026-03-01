"use client";

import { useState } from "react";

export default function Simulator() {
  const [userId, setUserId] = useState("");
  const [eventType, setEventType] = useState("");
  const [message, setMessage] = useState("");
  const [priorityHint, setPriorityHint] = useState("low");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userId || !eventType || !message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          event_type: eventType,
          message,
          priority_hint: priorityHint,
        }),
      });

      const data = await res.json();
      setResult(data.classification || "Error");
    } catch {
      setResult("Server Error");
    }

    setLoading(false);
  };

  const badgeColor =
    result === "NOW"
      ? "badge-now"
      : result === "LATER"
      ? "badge-later"
      : result === "NEVER"
      ? "badge-never"
      : "";

  return (
    <div className="center">
      <div className="form">
        <h2>Notification Prioritization Engine</h2>

        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          placeholder="Event Type"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <select
          value={priorityHint}
          onChange={(e) => setPriorityHint(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="critical">Critical</option>
        </select>

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Classifying..." : "Classify"}
        </button>

        {result && (
          <div className={`result ${badgeColor}`}>
            Classification: <strong>{result}</strong>
          </div>
        )}
      </div>
    </div>
  );
}