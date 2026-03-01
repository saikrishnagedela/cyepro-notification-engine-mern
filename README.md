#  Notification Prioritization Engine (MERN Stack)

A production-ready AI-driven Notification Prioritization System built using the MERN stack.

This system classifies incoming notifications into:

- NOW (High Priority)
- LATER (Deferred)
- NEVER (Low Priority)

The project demonstrates full-stack architecture, real-time analytics, and system monitoring.

---

##  Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Custom Dark SaaS UI

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

---

##  System Architecture

Frontend → Express API → MongoDB → Aggregation APIs → Dashboard UI

### Key APIs

| Endpoint | Method | Description |
|----------|--------|------------|
| `/events` | POST | Classify & store notification |
| `/events` | GET | Fetch all events (Audit Log) |
| `/queue` | GET | Fetch only LATER notifications |
| `/stats` | GET | Dashboard statistics |
| `/metrics` | GET | System health & uptime |

---

##  Features Implemented

### 1️ Dashboard
- Live event statistics
- NOW / LATER / NEVER breakdown
- Real-time database counts

### 2️ Simulator
- User ID input
- Event type input
- Message input
- Priority selector
- Live classification result
- Loading state

### 3️ Audit Log
- Full notification history
- Timestamp display
- Priority & classification tracking

### 4️ Queue System
- Displays only LATER notifications
- Sorted by latest first

### 5️ Metrics / Monitoring
- System status
- Database status
- Server uptime
- Event counts
- Auto-refresh every 5 seconds

---

##  Database Schema

```js
{
  user_id: String,
  event_type: String,
  message: String,
  priority_hint: String,
  classification: String,
  source: String,
  channel: String,
  createdAt: Date
}
```

---

##  Local Setup Instructions

### Backend

```bash
cd backend
npm install
npx nodemon server.js
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

##  Deployment

### Frontend
Deployed on Vercel

### Backend
Deployed on Render / Railway

Environment Variables required:

```
PORT
MONGO_URI
```

---

##  System Workflow

1. User submits notification
2. Backend classifies priority
3. Event stored in MongoDB
4. Dashboard updates via `/stats`
5. Queue shows deferred events
6. Metrics page monitors system health

---

##  Engineering Highlights

- Modular API design
- Clean separation of frontend & backend
- MongoDB aggregation for real-time stats
- Auto-refresh monitoring dashboard
- Production-style architecture
- Error handling & loading states

---

##  Evaluation Readiness

✔ Fully working end-to-end system  
✔ Real database integration  
✔ Monitoring & metrics implemented  
✔ Clean SaaS UI  
✔ Modular scalable architecture  

---

##  Author

Sai Krishna Shashank Gedela    
Cyepro Solutions – Round 2 Build Test

---
