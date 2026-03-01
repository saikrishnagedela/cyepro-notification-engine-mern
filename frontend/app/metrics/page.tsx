"use client";

import { useEffect, useState } from "react";

interface Metrics {
  systemStatus: string;
  database: string;
  uptimeSeconds: number;
  totalEvents: number;
  now: number;
  later: number;
  never: number;
}

export default function MetricsPage() {
  const [data, setData] = useState<Metrics | null>(null);

  useEffect(() => {
    const fetchMetrics = () => {
      fetch("http://localhost:5000/metrics")
        .then((res) => res.json())
        .then((metrics) => setData(metrics));
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!data) return <p>Loading metrics...</p>;

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div>
      <h1 className="title">System Metrics</h1>

      <div className="grid">
        <Card
          title="System Status"
          value={data.systemStatus}
          type="status"
        />
        <Card
          title="Database"
          value={data.database}
          type="database"
        />
        <Card
          title="Uptime"
          value={formatUptime(data.uptimeSeconds)}
        />
        <Card title="Total Events" value={data.totalEvents} />
        <Card title="NOW" value={data.now} />
        <Card title="LATER" value={data.later} />
        <Card title="NEVER" value={data.never} />
      </div>
    </div>
  );
}

function Card({ title, value, type }: any) {
  let badgeClass = "";

  if (type === "status") {
    badgeClass = value === "UP" ? "badge-up" : "badge-down";
  }

  if (type === "database") {
    badgeClass =
      value === "Connected" ? "badge-up" : "badge-down";
  }

  return (
    <div className="card">
      <p>{title}</p>
      <h2 className={badgeClass}>{value}</h2>
    </div>
  );
}