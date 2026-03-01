"use client";

import { useEffect, useState } from "react";

export default function AuditPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div>
      <h1 className="title">Audit Log</h1>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Event</th>
              <th>Message</th>
              <th>Priority</th>
              <th>Classification</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {events.map((e: any) => (
              <tr key={e._id}>
                <td>{e.user_id}</td>
                <td>{e.event_type}</td>
                <td>{e.message}</td>
                <td>{e.priority_hint}</td>
                <td>{e.classification}</td>
                <td>{new Date(e.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}