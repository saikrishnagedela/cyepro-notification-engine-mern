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
      setResult("Processing...");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, type, message, priority }),
        }
      );

      const data = await res.json();
      setResult(data.classification || "No result");
    } catch (error) {
      setResult("Server Error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Notification Simulator</h2>

        <div style={styles.row}>
          <input
            style={styles.input}
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Type (promo, alert...)"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <textarea
          style={styles.textarea}
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div style={styles.row}>
          <select
            style={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button style={styles.button} onClick={handleClassify}>
            Classify
          </button>
        </div>

        <h3 style={styles.result}>
          Classification: <span>{result}</span>
        </h3>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "40px",
  },
  card: {
    width: "500px",
    background: "#0f172a",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
  },
  row: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
    minHeight: "80px",
    marginBottom: "15px",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
  },
  button: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  result: {
    marginTop: "20px",
    textAlign: "center",
  },
};