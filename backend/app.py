"""
IWMDSS Flask Backend
Intelligent Waste Management Decision Support System
Reads data from JSON files in database/ folder
"""

from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Path to database folder
DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'database')

@app.route("/database/api/wards", methods=["GET"])
def get_wards_api():
    json_path = os.path.join(os.path.dirname(__file__), "wards_data.json")

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    return jsonify(data)

def load_json_file(filename):
    """Load data from JSON file in database folder"""
    try:
        filepath = os.path.join(DATABASE_PATH, filename)
        with open(filepath, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        return {"error": f"File {filename} not found"}
    except json.JSONDecodeError:
        return {"error": f"Invalid JSON in {filename}"}

@app.route('/')
def home():
    """API Welcome endpoint"""
    return jsonify({
        "message": "IWMDSS Backend API",
        "version": "1.0",
        "status": "running",
        "endpoints": {
            "/api/wards": "Get all ward data",
            "/api/recommendations": "Get AI recommendations",
            "/api/alerts": "Get active alerts",
            "/api/dashboard": "Get dashboard summary",
            "/api/trends": "Get waste & complaints trends",
            "/api/events": "Get upcoming events",
            "/api/emergencies": "Get active emergencies",
            "/api/hotspots": "Get complaint hotspots"
        }
    })

@app.route('/api/wards', methods=['GET'])
def get_wards():
    """Get all ward data"""
    data = load_json_file('wards_data.json')
    return jsonify(data)

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    """Get AI-generated recommendations"""
    data = load_json_file('recommendations_data.json')
    return jsonify(data)

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    """Get active alerts"""
    data = load_json_file('alerts_data.json')
    return jsonify({
        "alerts": data.get("alerts", [])
    })

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard():
    """Get dashboard summary statistics"""
    data = load_json_file('alerts_data.json')
    return jsonify({
        "summary": data.get("dashboard_summary", {})
    })

@app.route('/api/trends', methods=['GET'])
def get_trends():
    """Get 7-day waste and complaints trends"""
    data = load_json_file('alerts_data.json')
    return jsonify({
        "waste_trend": data.get("waste_trend_7_days", []),
        "complaints_trend": data.get("complaints_trend_7_days", [])
    })

@app.route('/api/events', methods=['GET'])
def get_events():
    """Get upcoming events"""
    data = load_json_file('events_data.json')
    return jsonify({
        "events": data.get("events", [])
    })

@app.route('/api/emergencies', methods=['GET'])
def get_emergencies():
    """Get active emergencies"""
    data = load_json_file('events_data.json')
    return jsonify({
        "emergencies": data.get("emergencies", [])
    })

@app.route('/api/hotspots', methods=['GET'])
def get_hotspots():
    """Get complaint hotspots"""
    data = load_json_file('events_data.json')
    return jsonify({
        "hotspots": data.get("hotspots", [])
    })

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 IWMDSS Backend Server Starting...")
    print("=" * 60)
    print("📁 Database Path:", DATABASE_PATH)
    print("🌐 Server running on: http://127.0.0.1:5000")
    print("=" * 60)
    print("\n✅ Available API Endpoints:")
    print("   - http://127.0.0.1:5000/")
    print("   - http://127.0.0.1:5000/api/wards")
    print("   - http://127.0.0.1:5000/api/recommendations")
    print("   - http://127.0.0.1:5000/api/alerts")
    print("   - http://127.0.0.1:5000/api/dashboard")
    print("   - http://127.0.0.1:5000/api/trends")
    print("   - http://127.0.0.1:5000/api/events")
    print("=" * 60)
    print("\n🔥 Press CTRL+C to stop the server\n")
    
    app.run(debug=True, host='127.0.0.1', port=5000)
