"use client";

import { useState } from "react";

export default function Simulator() {
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("Low");
  const [result, setResult] = useState("");

  const handleClassify = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            type,
            message,
            priority,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setResult(data.classification);
      } else {
        setResult("Server Error");
      }
    } catch (error) {
      console.error(error);
      setResult("Server Error");
    }
  };

  return (
    <div>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button onClick={handleClassify}>Classify</button>

      <h3>Classification: {result}</h3>
    </div>
  );
}