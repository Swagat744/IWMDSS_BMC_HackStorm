const { useState, useEffect } = React;

/* ---------------------------
   Helpers
--------------------------- */
function getHotspotColor(score) {
  if (score >= 85) return "#ef4444"; // red
  if (score >= 70) return "#fb923c"; // orange
  return "#f59e0b"; // yellow
}

function getHotspotLevel(score) {
  if (score >= 85) return "CRITICAL";
  if (score >= 70) return "HIGH";
  return "MEDIUM";
}

/* ---------------------------
   Main Component
--------------------------- */
function IWMDSSHotspotsPage() {
  const [loading, setLoading] = useState(true);
  const [selectedWard, setSelectedWard] = useState("all");

  const [hotspots, setHotspots] = useState([]);
  const [events, setEvents] = useState([]);
  const [emergencies, setEmergencies] = useState([]);

  // Load JSON
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("../../backend/database/events_data.json");
        const json = await res.json();

        setHotspots(json.hotspots || []);
        setEvents(json.events || []);
        setEmergencies(json.emergencies || []);
      } catch (e) {
        console.error("Hotspots JSON load failed:", e);
        setHotspots([]);
        setEvents([]);
        setEmergencies([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // ward list
  const wardSet = new Set();
  hotspots.forEach((h) => wardSet.add(h.ward_code));
  const wards = ["all", ...Array.from(wardSet).sort()];

  // filter
  const filteredHotspots =
    selectedWard === "all"
      ? hotspots
      : hotspots.filter((h) => h.ward_code === selectedWard);

  // sort by score high -> low
  const sortedHotspots = [...filteredHotspots].sort(
    (a, b) => (b.hotspot_score || 0) - (a.hotspot_score || 0)
  );

  // ward stats
  const wardEmergencyCount =
    selectedWard === "all"
      ? emergencies.length
      : emergencies.filter((e) => e.ward_code === selectedWard).length;

  const wardEventsCount =
    selectedWard === "all"
      ? events.length
      : events.filter((e) =>
          (e.affected_wards || []).includes(selectedWard)
        ).length;

  if (loading) {
    return (
      <div style={{ padding: "2rem", fontWeight: "800", color: "#334155" }}>
        Loading hotspots...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      {/* Header */}
      {/* <header
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
          color: "white",
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              background: "#5B8DEF",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "900"
            }}
          >
            IW
          </div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: 900 }}>IWMDSS</div>
            <div style={{ fontSize: "11px", color: "#bfdbfe", fontWeight: 700 }}>
              Hotspot Monitoring Center
            </div>
          </div>
        </div>

        <a
          href="./dashboard.html"
          style={{
            background: "rgba(255,255,255,0.15)",
            color: "white",
            padding: "10px 16px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 800
          }}
        >
          ⬅ Dashboard
        </a>
      </header> */}

      {/* Main */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px" }}>
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "20px"
          }}
        >
          <div>
            <div style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a" }}>
              Hotspots Dashboard
            </div>
            <div style={{ marginTop: "6px", color: "#64748b", fontWeight: 700 }}>
              Identify high-risk waste locations and take action quickly.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontWeight: 900, color: "#334155" }}>Ward:</div>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: "2px solid #e2e8f0",
                fontWeight: 900,
                background: "white",
                cursor: "pointer",
                minWidth: "220px"
              }}
            >
              <option value="all">All Wards</option>
              {wards
                .filter((w) => w !== "all")
                .map((w) => (
                  <option key={w} value={w}>
                    Ward {w}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "1rem",
            marginBottom: "22px"
          }}
        >
          <div style={{ background: "white", borderRadius: "14px", padding: "1.2rem", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight: 900, color: "#64748b" }}>Total Hotspots</div>
            <div style={{ fontSize: "2rem", fontWeight: 900, marginTop: "0.5rem" }}>
              {sortedHotspots.length}
            </div>
          </div>

          <div style={{ background: "white", borderRadius: "14px", padding: "1.2rem", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight: 900, color: "#64748b" }}>Critical (85+)</div>
            <div style={{ fontSize: "2rem", fontWeight: 900, marginTop: "0.5rem", color: "#ef4444" }}>
              {sortedHotspots.filter(h => (h.hotspot_score || 0) >= 85).length}
            </div>
          </div>

          <div style={{ background: "white", borderRadius: "14px", padding: "1.2rem", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight: 900, color: "#64748b" }}>Events Linked</div>
            <div style={{ fontSize: "2rem", fontWeight: 900, marginTop: "0.5rem" }}>
              {wardEventsCount}
            </div>
          </div>

          <div style={{ background: "white", borderRadius: "14px", padding: "1.2rem", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight: 900, color: "#64748b" }}>Emergencies</div>
            <div style={{ fontSize: "2rem", fontWeight: 900, marginTop: "0.5rem" }}>
              {wardEmergencyCount}
            </div>
          </div>
        </div>

        {/* Hotspots List */}
        <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a", marginBottom: "14px" }}>
            Top Hotspots {selectedWard === "all" ? "(Mumbai)" : `(Ward ${selectedWard})`}
          </div>

          {sortedHotspots.length === 0 ? (
            <div style={{ padding: "1rem", color: "#64748b", fontWeight: 700 }}>
              No hotspots found for this ward.
            </div>
          ) : (
            sortedHotspots.map((h) => (
              <div
                key={h.hotspot_id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "14px",
                  padding: "16px",
                  borderRadius: "14px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  marginBottom: "14px"
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", fontWeight: 900, color: "#0f172a" }}>
                    {h.location_name}
                  </div>
                  <div style={{ marginTop: "4px", color: "#64748b", fontWeight: 800 }}>
                    Ward {h.ward_code} • Complaints: {h.complaints_count} • Avg Waste/day: {h.avg_waste_per_day} tons
                  </div>

                  <div style={{ marginTop: "10px", fontWeight: 900, color: "#334155" }}>
                    Recommended Action:
                  </div>
                  <div style={{ marginTop: "4px", color: "#0f172a", fontWeight: 700, lineHeight: 1.45 }}>
                    {h.recommended_action}
                  </div>
                </div>

                <div style={{ minWidth: "160px", textAlign: "right" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontWeight: 900,
                      fontSize: "12px",
                      background: getHotspotColor(h.hotspot_score),
                      color: "white"
                    }}
                  >
                    {getHotspotLevel(h.hotspot_score)} • {h.hotspot_score}/100
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

// Render
ReactDOM.render(<IWMDSSHotspotsPage />, document.getElementById("root"));