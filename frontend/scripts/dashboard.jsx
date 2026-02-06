const { useState, useMemo, useEffect } = React;

/* ICONS (same as your html) */
const { Bell, User, Download, Search, TrendingUp, TrendingDown, AlertTriangle, Calendar, Navigation, Zap } = {
  Bell: ({ size, color, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  User: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  Download: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  ),
  Search: ({ size, color, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  ),
  TrendingUp: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  ),
  TrendingDown: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
      <polyline points="17 18 23 18 23 12"></polyline>
    </svg>
  ),
  AlertTriangle: ({ size, color, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
  Calendar: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  Navigation: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
    </svg>
  ),
  Zap: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  )
};

const ActivityIcon = ({ size = 20, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
  </svg>
);

const EventIcon = ({ size = 20, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const EmergencyIcon = ({ size = 20, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

/* ---------------------------
   META from waste (fallback)
---------------------------- */
function getWardMetaFromWaste(waste) {
  if (waste <= 350) return { status: "normal", risk: "Low", color: "#4ade80" };
  if (waste <= 450) return { status: "watch", risk: "Low", color: "#fbbf24" };
  if (waste <= 550) return { status: "rising", risk: "Medium", color: "#fb923c" };
  return { status: "urgent", risk: "High", color: "#ef4444" };
}

/* ---------------------------
   Tooltip Card Component
---------------------------- */
function WardHoverCard({ ward, x, y, visible }) {
  if (!visible || !ward) return null;

  const safeAreas = Array.isArray(ward.areas) ? ward.areas : [];

  return (
    <div
      style={{
        position: "fixed",
        left: x + 18,
        top: y + 18,
        width: "320px",
        background: "white",
        borderRadius: "14px",
        boxShadow: "0 14px 35px rgba(0,0,0,0.22)",
        border: "1px solid #e2e8f0",
        zIndex: 99999,
        padding: "14px",
        pointerEvents: "none"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: "15px", color: "#0f172a" }}>
            {ward.ward_name || ward.name}
          </div>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", marginTop: "2px" }}>
            {ward.zone || "Zone: -"}
          </div>
        </div>

        <span
          style={{
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "11px",
            fontWeight: 900,
            background:
              ward.status === "urgent" ? "#fee2e2" :
              ward.status === "rising" ? "#fed7aa" :
              ward.status === "watch" ? "#fef3c7" :
              "#d1fae5",
            color:
              ward.status === "urgent" ? "#991b1b" :
              ward.status === "rising" ? "#9a3412" :
              ward.status === "watch" ? "#92400e" :
              "#065f46"
          }}
        >
          {String(ward.status || "normal").toUpperCase()}
        </span>
      </div>

      <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "10px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: "#64748b" }}>Waste Today</div>
          <div style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>
            {ward.waste_collected_today ?? ward.waste ?? "-"} tons
          </div>
        </div>

        <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "10px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: "#64748b" }}>Trucks Available</div>
          <div style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>
            {ward.trucks_available ?? ward.trucks ?? "-"}
          </div>
        </div>

        <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "10px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: "#64748b" }}>Complaints Today</div>
          <div style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>
            {ward.complaints_today ?? ward.complaints ?? "-"}
          </div>
        </div>

        <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "10px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: "#64748b" }}>Pending Complaints</div>
          <div style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>
            {ward.pending_complaints ?? "-"}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "12px", fontWeight: 800, color: "#64748b" }}>
          Population: <span style={{ fontWeight: 900, color: "#0f172a" }}>{(ward.population ?? "-").toLocaleString?.() ?? ward.population}</span>
        </div>

        <div style={{ fontSize: "12px", fontWeight: 900, color: ward.risk_level === "High" ? "#dc2626" : ward.risk_level === "Medium" ? "#ea580c" : "#16a34a" }}>
          Risk: {ward.risk_level ?? ward.risk ?? "-"}
        </div>
      </div>

      <div style={{ marginTop: "12px" }}>
        <div style={{ fontSize: "12px", fontWeight: 900, color: "#0f172a", marginBottom: "6px" }}>
          Areas Under Ward
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {safeAreas.length > 0 ? (
            safeAreas.slice(0, 10).map((a, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "5px 8px",
                  borderRadius: "999px",
                  background: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  color: "#1e3a8a"
                }}
              >
                {a}
              </span>
            ))
          ) : (
            <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 700 }}>No areas data</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------
   MAIN DASHBOARD
---------------------------- */
const IWMDSSDashboard = () => {
  const [activeMode, setActiveMode] = useState("normal");
  const [selectedWard, setSelectedWard] = useState("all");
  const [activeTab, setActiveTab] = useState("recommendations");

  /* Hover tooltip state */
  const [hoverWard, setHoverWard] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [hoverVisible, setHoverVisible] = useState(false);

  /* Wards data */
  const [wards, setWards] = useState([]);
  const [loadingWards, setLoadingWards] = useState(true);

  /* ---------------------------
     FETCH WARDS from API
  ---------------------------- */
  useEffect(() => {
    async function loadWards() {
      try {
        setLoadingWards(true);
        const res = await fetch("http://127.0.0.1:5000/api/wards");
        const data = await res.json();

        if (!data || !Array.isArray(data.wards)) {
          console.error("Invalid wards response", data);
          setWards([]);
          setLoadingWards(false);
          return;
        }

        // Convert API -> dashboard format (keep full original fields too)
        const mapped = data.wards.map((w) => ({
          ...w,
          name: `Ward ${w.ward_code}`, // used by old UI
          waste: w.waste_collected_today,
          complaints: w.complaints_today,
          trucks: w.trucks_available,
          risk: w.risk_level
        }));

        setWards(mapped);
        setLoadingWards(false);
      } catch (err) {
        console.error("Failed to fetch wards:", err);

        // fallback old static data (so dashboard still loads)
        setWards([
          { name: "Ward A", waste: 420, complaints: 2, trucks: 8, ward_name: "Ward A", areas: [] },
          { name: "Ward B", waste: 385, complaints: 4, trucks: 7, ward_name: "Ward B", areas: [] },
          { name: "Ward C", waste: 290, complaints: 1, trucks: 6, ward_name: "Ward C", areas: [] },
          { name: "Ward D", waste: 502, complaints: 8, trucks: 8, ward_name: "Ward D", areas: [] },
          { name: "Ward E", waste: 310, complaints: 2, trucks: 7, ward_name: "Ward E", areas: [] },
          { name: "Ward F", waste: 615, complaints: 12, trucks: 6, ward_name: "Ward F", areas: [] },
          { name: "Ward G", waste: 420, complaints: 7, trucks: 9, ward_name: "Ward G", areas: [] },
          { name: "Ward H", waste: 295, complaints: 3, trucks: 8, ward_name: "Ward H", areas: [] },
          { name: "Ward J", waste: 488, complaints: 6, trucks: 7, ward_name: "Ward J", areas: [] },
          { name: "Ward K", waste: 680, complaints: 15, trucks: 5, ward_name: "Ward K", areas: [] },
          { name: "Ward L", waste: 480, complaints: 9, trucks: 7, ward_name: "Ward L", areas: [] },
          { name: "Ward M", waste: 275, complaints: 1, trucks: 9, ward_name: "Ward M", areas: [] },
          { name: "Ward N", waste: 305, complaints: 2, trucks: 8, ward_name: "Ward N", areas: [] },
          { name: "Ward P", waste: 420, complaints: 7, trucks: 9, ward_name: "Ward P", areas: [] },
          { name: "Ward R", waste: 340, complaints: 4, trucks: 10, ward_name: "Ward R", areas: [] },
          { name: "Ward S", waste: 315, complaints: 3, trucks: 8, ward_name: "Ward S", areas: [] },
          { name: "Ward T", waste: 285, complaints: 2, trucks: 7, ward_name: "Ward T", areas: [] },
          { name: "Ward V", waste: 515, complaints: 10, trucks: 7, ward_name: "Ward V", areas: [] },
          { name: "Ward X", waste: 298, complaints: 1, trucks: 8, ward_name: "Ward X", areas: [] },
          { name: "Ward Z", waste: 312, complaints: 2, trucks: 9, ward_name: "Ward Z", areas: [] }
        ]);
        setLoadingWards(false);
      }
    }

    loadWards();
  }, []);

  /* ---------------------------
     Add meta for color/status
  ---------------------------- */
  const wardsWithMeta = useMemo(() => {
    return wards.map((w) => {
      const fallbackMeta = getWardMetaFromWaste(w.waste ?? 0);

      return {
        ...w,
        status: w.status || fallbackMeta.status,
        risk: w.risk || w.risk_level || fallbackMeta.risk,
        color: w.color || fallbackMeta.color
      };
    });
  }, [wards]);

  /* ---------------------------
     Filtered wards
  ---------------------------- */
  const filteredWards = useMemo(() => {
    if (selectedWard === "all") return wardsWithMeta;
    return wardsWithMeta.filter((w) => w.name === selectedWard);
  }, [selectedWard, wardsWithMeta]);

  /* ---------------------------
     Summary Cards
  ---------------------------- */
  const summaryCards = useMemo(() => {
    const totalWaste = wardsWithMeta.reduce((sum, w) => sum + (w.waste || 0), 0);
    const wardsNeedingAttention = wardsWithMeta.filter((w) => w.status === "urgent" || w.status === "rising").length;
    const totalComplaints = wardsWithMeta.reduce((sum, w) => sum + (w.complaints || 0), 0);

    return [
      { label: "Total Waste Collected", value: totalWaste.toLocaleString(), unit: "tons", trend: "Live", trendUp: null, icon: "🗑️" },
      { label: "Wards Needing Attention", value: wardsNeedingAttention, unit: "wards", trend: "Auto", trendUp: null, icon: "⚠️" },
      { label: "Pending Complaints", value: totalComplaints, unit: "pending", trend: "Live", trendUp: null, icon: "📋" },
      { label: "Active Emergencies", value: "2", unit: "ongoing", trend: "+1", trendUp: true, icon: "🚨" },
      { label: "Upcoming Events", value: "1", unit: "major event", trend: "6 days", trendUp: null, icon: "📅" },
      { label: "Risk Index", value: wardsNeedingAttention >= 6 ? "High" : wardsNeedingAttention >= 3 ? "Medium" : "Low", unit: "prediction", trend: "Auto", trendUp: null, icon: "📊" }
    ];
  }, [wardsWithMeta]);

  /* ---------------------------
     Demo Buttons (optional)
  ---------------------------- */
  const simulateWasteIncrease = () => {
  if (selectedWard === "all") return;

  setWards((prev) =>
    prev.map((w) => {
      if (w.name !== selectedWard) return w;

      const updatedWaste = w.waste + 80;

      return {
        ...w,
        waste: updatedWaste,
        complaints: w.complaints + 2,
        ...getWardMetaFromWaste(updatedWaste)
      };
    })
  );
};

  const simulateWasteDecrease = () => {
  if (selectedWard === "all") return;

  setWards((prev) =>
    prev.map((w) => {
      if (w.name !== selectedWard) return w;

      const updatedWaste = Math.max(100, w.waste - 80);

      return {
        ...w,
        waste: updatedWaste,
        complaints: Math.max(0, w.complaints - 1),
        ...getWardMetaFromWaste(updatedWaste)
      };
    })
  );
};
  /* ---------------------------
     Recommendations
  ---------------------------- */
  const recommendations = useMemo(() => {
    if (selectedWard !== "all") {
      const w = wardsWithMeta.find((x) => x.name === selectedWard);
      if (!w) return [];

      if (w.status === "urgent") {
        return [
          {
            action: `Deploy 2 extra trucks to ${w.name}`,
            priority: "CRITICAL",
            details: `Waste is extremely high (${w.waste} tons). Immediate action required.`,
            resources: "2 Additional Trucks"
          },
          {
            action: `Trigger admin alert for cleaning`,
            priority: "HIGH",
            details: `Waste above 90% threshold. Auto message should be sent to admin.`,
            resources: "Auto Notification"
          }
        ];
      }

      if (w.status === "rising") {
        return [
          {
            action: `Increase collection frequency in ${w.name}`,
            priority: "HIGH",
            details: `Waste rising trend detected (${w.waste} tons).`,
            resources: "1 Extra Collection Trip"
          }
        ];
      }

      return [
        {
          action: `${w.name} is stable`,
          priority: "MEDIUM",
          details: `No immediate action required. Continue monitoring.`,
          resources: "Monitoring"
        }
      ];
    }

    const urgentWards = wardsWithMeta.filter((w) => w.status === "urgent");
    return urgentWards.slice(0, 4).map((w) => ({
      action: `Deploy 2 extra trucks to ${w.name}`,
      priority: "CRITICAL",
      details: `Waste above threshold (${w.waste} tons)`,
      resources: "2 Additional Trucks"
    }));
  }, [selectedWard, wardsWithMeta]);

  const alerts = [
    { text: "Ward F waste level rising (+22%)", type: "warning", time: "5 min ago" },
    { text: "Emergency flood alert in Kurla", type: "emergency", time: "12 min ago" },
    { text: "Complaint spike detected in Dadar Market", type: "info", time: "1 hour ago" },
    { text: "Event coming: Ganesh Chaturthi", type: "event", time: "6 days" }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)",
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      color: "#1e293b"
    }}>
      {/* Hover tooltip */}
      <WardHoverCard ward={hoverWard} x={hoverPos.x} y={hoverPos.y} visible={hoverVisible} />

      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
        padding: "0.75rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{
            width: "48px",
            height: "48px",
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "900",
            color: "white",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)"
          }}>
            IW
          </div>
          <div>
            <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "white", letterSpacing: "-0.02em" }}>IWMDSS</div>
            <div style={{ fontSize: "0.75rem", color: "#bfdbfe", fontWeight: "500" }}>Brihanmumbai Municipal Corporation</div>
          </div>
        </div>

        <nav style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {[
            { name: "Dashboard", page: "dashboard.html" },
            { name: "Events", page: "events.html" },
            { name: "Analytics", page: "analytics.html" },
            { name: "Hotspots", page: "hotspots.html" }
          ].map((tab) => (
            <a
              key={tab.name}
              href={tab.page}
              style={{
                padding: "0.625rem 1.25rem",
                background: tab.name === "Dashboard" ? "rgba(255,255,255,0.2)" : "transparent",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: tab.name === "Dashboard" ? "600" : "500",
                transition: "all 0.2s",
                backdropFilter: tab.name === "Dashboard" ? "blur(10px)" : "none",
                textDecoration: "none",
                display: "inline-block"
              }}
            >
              {tab.name}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search ward / hotspot / ID"
              style={{
                padding: "0.625rem 1rem 0.625rem 2.5rem",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "0.875rem",
                width: "280px",
                outline: "none",
                backdropFilter: "blur(10px)"
              }}
            />
            <Search size={18} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#bfdbfe" }} />
          </div>

          <button style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px",
            padding: "0.625rem",
            cursor: "pointer",
            position: "relative",
            backdropFilter: "blur(10px)"
          }}>
            <Bell size={20} color="white" />
            <span style={{
              position: "absolute",
              top: "4px",
              right: "4px",
              width: "8px",
              height: "8px",
              background: "#ef4444",
              borderRadius: "50%",
              border: "2px solid #1e3a8a"
            }} />
          </button>

          <button style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px",
            padding: "0.625rem",
            cursor: "pointer",
            backdropFilter: "blur(10px)"
          }}>
            <User size={20} color="white" />
          </button>
        </div>
      </header>

      <div style={{ display: "flex", height: "calc(100vh - 80px)" }}>
        {/* Left Sidebar */}
        <aside style={{
          width: "280px",
          background: "white",
          padding: "1.5rem",
          boxShadow: "4px 0 12px rgba(0,0,0,0.05)",
          overflowY: "auto"
        }}>
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
              Operation Mode
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { id: "normal", label: "Normal Operations", icon: <ActivityIcon />, href: "dashboard.html" },
                { id: "event", label: "Event Planning", icon: <EventIcon />, href: "events.html" },
                { id: "emergency", label: "Emergency Response", icon: <EmergencyIcon />, href: "hotspots.html" }
              ].map((mode) => (
                <a
                  key={mode.id}
                  href={mode.href}
                  style={{ textDecoration: "none" }}
                >
                  <button
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      background: "#ffffff",
                      cursor: "pointer",
                      fontWeight: 800
                    }}
                  >
                    {mode.icon}
                    {mode.label}
                  </button>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "0.875rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
              Filters
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Ward filter */}
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#64748b", marginBottom: "0.5rem", display: "block" }}>
                  Select Ward
                </label>

                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.625rem",
                    borderRadius: "8px",
                    border: "2px solid #e2e8f0",
                    fontSize: "0.875rem",
                    background: "white",
                    cursor: "pointer"
                  }}
                >
                  <option value="all">All Wards</option>
                  {wardsWithMeta.map((ward) => (
                    <option key={ward.name} value={ward.name}>{ward.name}</option>
                  ))}
                </select>

                {/* DEMO BUTTONS */}
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                  <button
                    onClick={simulateWasteIncrease}
                    disabled={selectedWard === "all"}
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: selectedWard === "all" ? "not-allowed" : "pointer",
                      background: selectedWard === "all" ? "#e2e8f0" : "#fee2e2",
                      color: selectedWard === "all" ? "#64748b" : "#991b1b",
                      fontWeight: "700",
                      fontSize: "0.8rem"
                    }}
                  >
                    + Waste
                  </button>

                  <button
                    onClick={simulateWasteDecrease}
                    disabled={selectedWard === "all"}
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: selectedWard === "all" ? "not-allowed" : "pointer",
                      background: selectedWard === "all" ? "#e2e8f0" : "#dcfce7",
                      color: selectedWard === "all" ? "#64748b" : "#065f46",
                      fontWeight: "700",
                      fontSize: "0.8rem"
                    }}
                  >
                    - Waste
                  </button>
                </div>
              </div>

              {/* toggles */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
                {[
                  { label: "Show only wards needing attention", checked: false },
                  { label: "Show hotspots", checked: true },
                  { label: "Show active emergencies", checked: true }
                ].map((toggle, idx) => (
                  <label key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", fontSize: "0.875rem" }}>
                    <input
                      type="checkbox"
                      defaultChecked={toggle.checked}
                      style={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer",
                        accentColor: "#3b82f6"
                      }}
                    />
                    <span style={{ color: "#475569" }}>{toggle.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "2rem" }}>
          {/* Summary Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
            gap: "1.25rem",
            marginBottom: "2rem",
            width: "100%"
          }}>
            {summaryCards.map((card, idx) => (
              <div
                key={idx}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "1.25rem",
                  minHeight: "140px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  border: "1px solid #f1f5f9"
                }}
              >
                <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{card.icon}</div>
                <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.25rem" }}>
                  {card.value}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.5rem" }}>{card.unit}</div>
                <div style={{ fontSize: "0.75rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  {card.trendUp === true && <TrendingUp size={14} color="#10b981" />}
                  {card.trendUp === false && <TrendingDown size={14} color="#ef4444" />}
                  <span style={{ color: card.trendUp === true ? "#10b981" : card.trendUp === false ? "#ef4444" : "#64748b" }}>
                    {card.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Map and Recommendations Section */}
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
            {/* Map */}
            <div style={{
              flex: 1,
              background: "white",
              borderRadius: "16px",
              padding: "1.5rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.25rem" }}>
                    Mumbai Ward Map
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.875rem", color: "#64748b" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ width: "8px", height: "8px", background: "#10b981", borderRadius: "50%", animation: "pulse 2s infinite" }} />
                      Live Mode
                    </div>
                    <span>{loadingWards ? "Loading wards..." : "Last updated: API"}</span>
                  </div>
                </div>
              </div>

              {/* Ward Grid */}
              <div style={{
                position: "relative",
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                borderRadius: "12px",
                padding: "2rem",
                minHeight: "500px"
              }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "1rem",
                  height: "100%"
                }}>
                  {(selectedWard === "all" ? wardsWithMeta : filteredWards).slice(0, 20).map((ward) => (
                    <div
                      key={ward.name}
                      onClick={() => setSelectedWard(ward.name)}
                      onMouseEnter={(e) => {
                        setHoverWard(ward);
                        setHoverPos({ x: e.clientX, y: e.clientY });
                        setHoverVisible(true);
                      }}
                      onMouseMove={(e) => {
                        setHoverPos({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => {
                        setHoverVisible(false);
                        setHoverWard(null);
                      }}
                      style={{
                        background: ward.color,
                        borderRadius: "12px",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        boxShadow: selectedWard === ward.name ? "0 0 0 4px rgba(59,130,246,0.5)" : "0 2px 8px rgba(0,0,0,0.1)",
                        border: "2px solid rgba(255,255,255,0.5)",
                        position: "relative",
                        aspectRatio: "1 / 1"
                      }}
                    >
                      <div style={{ fontSize: "1.125rem", fontWeight: "700", color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                        {ward.name}
                      </div>
                      <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "rgba(255,255,255,0.9)", marginTop: "0.25rem" }}>
                        {ward.waste} tons
                      </div>
                      {ward.status === "urgent" && (
                        <AlertTriangle size={20} color="white" style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "1.5rem",
                  background: "white",
                  borderRadius: "12px",
                  padding: "1rem",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
                }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: "700", marginBottom: "0.75rem", color: "#1e293b" }}>Legend</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {[
                      { color: "#4ade80", label: "Normal" },
                      { color: "#fbbf24", label: "Watch" },
                      { color: "#fb923c", label: "Rising Risk" },
                      { color: "#ef4444", label: "Urgent" }
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem" }}>
                        <div style={{ width: "16px", height: "16px", background: item.color, borderRadius: "4px" }} />
                        <span>{item.label}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid #e2e8f0", marginTop: "0.5rem", paddingTop: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", marginBottom: "0.25rem" }}>
                        <AlertTriangle size={14} color="#ef4444" />
                        <span>Emergency</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem" }}>
                        <Navigation size={14} color="#3b82f6" />
                        <span>Hotspot</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Panel */}
            <div style={{
              width: "380px",
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{
                display: "flex",
                borderBottom: "2px solid #e2e8f0",
                padding: "1rem 1.5rem",
                gap: "0.5rem"
              }}>
                <button
                  onClick={() => setActiveTab("recommendations")}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    background: activeTab === "recommendations" ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" : "transparent",
                    color: activeTab === "recommendations" ? "white" : "#64748b",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s"
                  }}
                >
                  <Zap size={16} />
                  AI Recommendations
                </button>

                <button
                  onClick={() => setActiveTab("alerts")}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    background: activeTab === "alerts" ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" : "transparent",
                    color: activeTab === "alerts" ? "white" : "#64748b",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s",
                    position: "relative"
                  }}
                >
                  <Bell size={16} />
                  Alerts
                </button>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
                {activeTab === "recommendations" ? (
                  <>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.5rem" }}>
                        AI Action Suggestions
                      </h3>
                      <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                        {selectedWard === "all" ? "City-wide" : `For ${selectedWard}`}
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {recommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                            borderRadius: "12px",
                            padding: "1.25rem",
                            border: "2px solid #e2e8f0"
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.5rem", lineHeight: "1.4" }}>
                                {rec.action}
                              </div>
                            </div>
                            <span style={{
                              padding: "0.25rem 0.625rem",
                              borderRadius: "6px",
                              fontSize: "0.7rem",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              background: rec.priority === "CRITICAL" ? "#fee2e2" : rec.priority === "HIGH" ? "#fed7aa" : "#fef3c7",
                              color: rec.priority === "CRITICAL" ? "#991b1b" : rec.priority === "HIGH" ? "#9a3412" : "#92400e"
                            }}>
                              {rec.priority}
                            </span>
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#475569", marginBottom: "0.75rem", lineHeight: "1.5" }}>
                            {rec.details}
                          </div>
                          <div style={{ fontSize: "0.8rem", fontWeight: "600", color: "#64748b" }}>
                            📦 {rec.resources}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.5rem" }}>
                        Active Alerts
                      </h3>
                      <div style={{ fontSize: "0.875rem", color: "#64748b" }}>Real-time notifications</div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {alerts.map((alert, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: "1rem",
                            borderRadius: "10px",
                            background: alert.type === "emergency" ? "#fee2e2" : alert.type === "warning" ? "#fef3c7" : alert.type === "event" ? "#dbeafe" : "#f0fdf4",
                            border: `2px solid ${alert.type === "emergency" ? "#fca5a5" : alert.type === "warning" ? "#fde68a" : alert.type === "event" ? "#bfdbfe" : "#bbf7d0"}`
                          }}
                        >
                          <div style={{ fontSize: "0.875rem", fontWeight: "600", color: "#1e293b", marginBottom: "0.25rem" }}>
                            {alert.text}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{alert.time}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1.5rem" }}>
            {/* Top wards */}
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.5rem" }}>
                Top Wards by Waste
              </h3>
              <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "1.5rem" }}>
                Today's collection (tons)
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {(selectedWard === "all" ? wardsWithMeta : filteredWards)
                  .slice()
                  .sort((a, b) => (b.waste || 0) - (a.waste || 0))
                  .slice(0, 8)
                  .map((ward, idx) => (
                    <div key={ward.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ fontSize: "0.875rem", fontWeight: "600", color: "#94a3b8", minWidth: "20px" }}>
                        {idx + 1}.
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          height: "28px",
                          background: "linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)",
                          borderRadius: "6px",
                          width: `${((ward.waste || 0) / 680) * 100}%`,
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "0.75rem",
                          color: "white",
                          fontSize: "0.8rem",
                          fontWeight: "600"
                        }}>
                          {ward.name}
                        </div>
                      </div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "600", color: "#1e293b", minWidth: "50px", textAlign: "right" }}>
                        {ward.waste}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Table */}
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.5rem" }}>
                Ward Status Table
              </h3>

              <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "1.5rem" }}>
                {selectedWard === "all" ? "Real-time ward overview" : `Showing: ${selectedWard}`}
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                      <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "700", color: "#64748b" }}>Ward</th>
                      <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "700", color: "#64748b" }}>Status</th>
                      <th style={{ padding: "0.75rem", textAlign: "right", fontWeight: "700", color: "#64748b" }}>Waste</th>
                      <th style={{ padding: "0.75rem", textAlign: "right", fontWeight: "700", color: "#64748b" }}>Complaints</th>
                      <th style={{ padding: "0.75rem", textAlign: "right", fontWeight: "700", color: "#64748b" }}>Trucks</th>
                      <th style={{ padding: "0.75rem", textAlign: "center", fontWeight: "700", color: "#64748b" }}>Risk</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(selectedWard === "all" ? wardsWithMeta : filteredWards).slice(0, 7).map((ward) => (
                      <tr key={ward.name} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "0.75rem", fontWeight: "600", color: "#1e293b" }}>{ward.name}</td>
                        <td style={{ padding: "0.75rem" }}>
                          <span style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            background: ward.status === "urgent" ? "#fee2e2" : ward.status === "rising" ? "#fed7aa" : ward.status === "watch" ? "#fef3c7" : "#d1fae5",
                            color: ward.status === "urgent" ? "#991b1b" : ward.status === "rising" ? "#9a3412" : ward.status === "watch" ? "#92400e" : "#065f46"
                          }}>
                            {ward.status}
                          </span>
                        </td>
                        <td style={{ padding: "0.75rem", textAlign: "right", fontWeight: "700" }}>{ward.waste}</td>
                        <td style={{ padding: "0.75rem", textAlign: "right" }}>{ward.complaints}</td>
                        <td style={{ padding: "0.75rem", textAlign: "right" }}>{ward.trucks}</td>
                        <td style={{
                          padding: "0.75rem",
                          textAlign: "center",
                          fontWeight: "700",
                          color: ward.risk === "High" ? "#dc2626" : ward.risk === "Medium" ? "#ea580c" : "#16a34a"
                        }}>
                          {ward.risk}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        button:hover { transform: translateY(-1px); }
        button:active { transform: translateY(0); }
      `}</style>
    </div>
  );
};

/* IMPORTANT */
ReactDOM.render(<IWMDSSDashboard />, document.getElementById("root"));