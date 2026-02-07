# 🗑️ IWMDSS - Intelligent Waste Management Decision Support System

## 📋 Project Overview

**IWMDSS** is an AI-powered waste management system designed for Brihanmumbai Municipal Corporation (BMC) to optimize waste collection, predict hotspots, and provide intelligent recommendations for SWM (Solid Waste Management) officers.

### 🎯 Problem Statement
Municipal corporations face challenges in:
- Predicting waste accumulation patterns
- Managing complaints efficiently  
- Optimizing resource allocation (trucks, workers)
- Planning for events and festivals
- Identifying problem areas (hotspots)

### 💡 Our Solution
An intelligent dashboard that:
- ✅ Provides real-time waste analytics across 20 Mumbai wards
- ✅ Generates AI-powered recommendations for resource deployment
- ✅ Detects and alerts on critical situations
- ✅ Predicts waste surge during events/festivals
- ✅ Identifies complaint hotspots
- ✅ Optimizes truck and worker allocation

---

## 🏗️ Project Structure

```
IWMDSS_FINAL/
│
├── frontend/                  # Frontend Application
│   ├── pages/                # HTML Pages
│   │   ├── dashboard.html   # Main Dashboard
│   │   ├── analytics.html   # Analytics Page
│   │   └── events.html      # Events & Planning Page
│   │
│   ├── styles/               # CSS Stylesheets
│   │   ├── dashboard.css
│   │   ├── analytics.css
│   │   └── events.css
│   │
│   └── scripts/              # JavaScript/React Components
│       ├── dashboard.jsx     # Dashboard React Component
│       ├── analytics.jsx     # Analytics React Component
│       └── events.jsx        # Events React Component
│
├── backend/                   # Flask Backend API
│   ├── app.py                # Main Flask Application
│   ├── requirements.txt      # Python Dependencies
│   │
│   └── database/             # Mock Data (JSON Files)
│       ├── wards_data.json          # 20 Mumbai Wards Data
│       ├── recommendations_data.json # AI Recommendations
│       ├── alerts_data.json         # Active Alerts & Trends
│       └── events_data.json         # Events, Emergencies, Hotspots
│
├── docs/                      # Documentation
│   └── HOW_TO_RUN.md         # Setup & Demo Guide
│
└── README.md                  # This File
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python 3.8+** installed
- **Web Browser** (Chrome, Firefox, Edge)
- **Code Editor** (VS Code recommended)

### Installation (5 Minutes)

#### 1️⃣ Navigate to Backend Folder
```bash
cd backend
```

#### 2️⃣ Install Python Dependencies
```bash
pip install Flask flask-cors
```
*Or use requirements.txt:*
```bash
pip install -r requirements.txt
```

#### 3️⃣ Start Flask Server
```bash
python app.py
```

You should see:
```
🚀 IWMDSS Backend Server Starting...
🌐 Server running on: http://127.0.0.1:5000
```

#### 4️⃣ Open Frontend
Navigate to `/frontend/pages/` and open `dashboard.html` in your browser.

**That's it!** ✅ Your project is running!

---

## 📊 Features

### 1. **Dashboard** (`dashboard.html`)
- 📈 Real-time waste statistics across 20 wards
- 🚨 Active alerts and emergencies
- 💡 AI-generated recommendations (CRITICAL, HIGH, MEDIUM priority)
- 📊 7-day waste trend charts
- 📋 Ward status table with risk levels
- 🗺️ Top wards by waste collection

### 2. **Analytics** (`analytics.html`)
- 📉 Detailed waste trends analysis
- 🔥 Complaint hotspot detection
- 📊 Ward-by-ward comparison
- 🎯 Predictive analytics

### 3. **Events & Planning** (`events.html`)
- 📅 Upcoming events (Ganesh Chaturthi, etc.)
- 🎪 Festival waste surge predictions
- 🚛 Resource planning recommendations
- ⚠️ Event-specific alerts

---

## 🗄️ Database Structure

All data is stored in **JSON format** in `/backend/database/` folder:

### `wards_data.json`
Contains 20 Mumbai wards with:
- Ward ID, Code, Name
- Population
- Waste collected today
- Complaints (today + pending)
- Trucks available
- Risk level & Status

### `recommendations_data.json`
AI-generated actions with:
- Priority (CRITICAL, HIGH, MEDIUM)
- Action details
- Resource requirements
- Estimated impact

### `alerts_data.json`
Contains:
- Active alerts (emergency, warning, info)
- Dashboard summary statistics
- 7-day waste trend
- 7-day complaints trend

### `events_data.json`
Contains:
- Upcoming events
- Active emergencies
- Complaint hotspots

---

## 🔌 API Endpoints

Backend provides RESTful API endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API welcome & info |
| `/api/wards` | GET | All 20 wards data |
| `/api/recommendations` | GET | AI recommendations |
| `/api/alerts` | GET | Active alerts |
| `/api/dashboard` | GET | Dashboard summary |
| `/api/trends` | GET | 7-day trends |
| `/api/events` | GET | Upcoming events |
| `/api/emergencies` | GET | Active emergencies |
| `/api/hotspots` | GET | Complaint hotspots |

**Example Request:**
```bash
curl http://127.0.0.1:5000/api/wards
```

---

## 🎨 Tech Stack

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling
- **React 18** - UI Components
- **Babel** - JSX Compilation
- **Google Fonts (Inter)** - Typography

### Backend
- **Python 3** - Language
- **Flask** - Web Framework
- **Flask-CORS** - Cross-Origin Support
- **JSON** - Data Storage

### Design
- Clean, modern UI
- Responsive design
- Color-coded status indicators
- Interactive charts & graphs

---

## 👥 Team

- **Team Name : HackStorm**
- **Swgaat Patil**
- **Sumit Barve**
- **Prajusha Bamane**
- **Gayatri Bajaj**

---

## 📝 Demo Script

For your hackathon presentation, see `docs/HOW_TO_RUN.md` for:
- ✅ Step-by-step demo flow
- ✅ Key features to highlight
- ✅ Talking points
- ✅ Q&A preparation

---

## 🏆 Key Highlights

1. **Real Mumbai Data**: Uses actual ward names and realistic waste figures
2. **AI Recommendations**: Smart suggestions for resource deployment
3. **Event Planning**: Predicts festival waste surge (Ganesh Chaturthi)
4. **Hotspot Detection**: Identifies problem areas automatically
5. **Clean Architecture**: Separated concerns (HTML, CSS, JS, Backend)
6. **No Database Setup**: Uses JSON files (perfect for hackathon demo)

---

## 🔮 Future Enhancements

- 🗺️ Interactive map integration
- 📱 Mobile app version
- 🤖 Machine learning models for prediction
- 📧 Email/SMS alerts to officers
- 📊 Historical data analysis
- 🔐 User authentication & roles


---

## ⚖️ License

This project was created for BMC Hackathon 2024.

---
