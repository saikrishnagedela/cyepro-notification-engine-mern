"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    now: 0,
    later: 0,
    never: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="title">Live Dashboard</h1>

      <div className="grid">
        <Card title="Total Events" value={stats.total} loading={loading} />
        <Card title="NOW" value={stats.now} loading={loading} />
        <Card title="LATER" value={stats.later} loading={loading} />
        <Card title="NEVER" value={stats.never} loading={loading} />
      </div>
    </div>
  );
}

function Card({ title, value, loading }: any) {
  return (
    <div className="card">
      <p>{title}</p>
      <h2>{loading ? "..." : value}</h2>
    </div>
  );
}