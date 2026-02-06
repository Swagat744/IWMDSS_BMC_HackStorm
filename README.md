backend/
│
├── app.py                  # Main Flask entry point (registers routes + runs server)
├── requirements.txt        # Python dependencies for backend
├── config.py               # Backend configuration (DB credentials, settings)
├── db.py                   # MySQL connection handler (get_db_connection)
│
├── routes/                 # API endpoint modules (Blueprints)
│   ├── summary_routes.py           # /api/summary (dashboard top cards data)
│   ├── ward_routes.py              # /api/wards, /api/ward/<id> (ward data)
│   ├── event_routes.py             # /api/events (festival/event planning)
│   ├── emergency_routes.py         # /api/emergencies (emergency response)
│   ├── hotspot_routes.py           # /api/hotspots (hotspot detection)
│   └── recommendation_routes.py    # /api/recommendations (AI action suggestions)
│
├── services/               # Core logic (AI + allocation)
│   ├── prediction_service.py       # Loads ML model + predicts waste
│   ├── recommendation_engine.py    # Generates action recommendations
│   └── resource_allocator.py       # Allocates trucks/workers between wards
│
└── utils/                  # Helper functions + constants
    ├── helpers.py                  # Formatting, scoring, JSON conversion helpers
    └── constants.py                # Thresholds, ward list, priority labels
