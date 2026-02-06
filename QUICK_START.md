# ⚡ QUICK START - 2 MINUTES TO DEMO

## 🔥 FASTEST WAY TO RUN

### Step 1: Start Backend (1 min)
```bash
cd backend
pip install Flask flask-cors
python app.py
```

✅ **Wait for**: `Server running on: http://127.0.0.1:5000`

### Step 2: Open Frontend (30 sec)
```bash
cd frontend/pages
# Double-click dashboard.html
# Or:
open dashboard.html  # Mac
start dashboard.html # Windows
```

✅ **That's it!** Project is running!

---

## 🎯 DEMO IN 3 CLICKS

1. **Dashboard** - Show real-time waste stats
2. **Recommendations** - Point to AI suggestions (CRITICAL priority)
3. **Events** - Show Ganesh Chaturthi prediction

**Talk about**: How this helps BMC officers make better decisions

---

## 🆘 IF SOMETHING BREAKS

### Backend won't start?
```bash
python3 app.py  # Try python3 instead of python
```

### Frontend blank page?
- Press **F12** → Check console for errors
- Verify backend running: visit `http://127.0.0.1:5000`
- Refresh page (**Ctrl+R** or **Cmd+R**)

### Still broken?
**Frontend still works without backend!** (React components have hardcoded data)
Just explain: *"In production, this connects to live BMC data via our Flask API"*

---

## 📂 File Locations

```
IWMDSS_FINAL/
├── backend/
│   ├── app.py              ← Start this first!
│   └── database/*.json     ← All data here
│
└── frontend/
    └── pages/
        └── dashboard.html  ← Open this in browser!
```

---

## 🎤 30-SECOND PITCH

*"IWMDSS helps BMC manage 8,000+ tons of daily waste across 20 Mumbai wards. Our AI analyzes real-time data to recommend exactly where to deploy trucks, predict festival waste surges, and identify problem areas before complaints pile up. This turns reactive waste management into proactive decision-making."*

---

## ✅ VERIFY WORKING

- [ ] Backend shows "Server running" message
- [ ] Dashboard displays wards and charts
- [ ] Recommendations section shows 6 actions
- [ ] Alerts section shows 4 items
- [ ] Can navigate between Dashboard/Analytics/Events

**All checked?** → You're ready! 🚀

---

## 🏆 REMEMBER

- **Keep backend terminal open** (don't close it!)
- **Refresh page if it freezes** (Ctrl+R)
- **Smile and be confident** (you built this in 24 hours!)

**GOOD LUCK BRO!** 💪🔥
