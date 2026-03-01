"use client";

import { useEffect, useState } from "react";

export default function Health() {
  const [health, setHealth] = useState<any>(null);

  const fetchHealth = async () => {
    const res = await fetch("http://localhost:5000/health");
    const data = await res.json();
    setHealth(data);
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  if (!health)
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">System Health</h1>

      <div className="bg-gray-900 p-6 rounded-xl w-80 text-center">
        <p>Status: <b>{health.status}</b></p>
        <p>Circuit Breaker: <b>{health.circuit}</b></p>
        <p>AI Failures: <b>{health.aiFailures}</b></p>
      </div>

      <button
        onClick={fetchHealth}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Refresh
      </button>
    </div>
  );
}