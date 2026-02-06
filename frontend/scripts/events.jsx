
const { useState, useEffect, useMemo } = React;

/* Icons */
const ChevronLeft = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const Calendar = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Users = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const Trash = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const Truck = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

const Brain = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const AlertTriangle = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

/* Helpers */
function toDateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getDateRange(startStr, endStr) {
  const start = new Date(startStr);
  const end = new Date(endStr);

  const days = [];
  let cur = new Date(start);

  while (cur <= end) {
    days.push(toDateStr(cur));
    cur = addDays(cur, 1);
  }
  return days;
}

/* AI Suggestions */
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function getEventDayInfo(ev, clickedDateStr) {
  const start = new Date(ev.start_date);
  const end = new Date(ev.end_date);
  const clicked = new Date(clickedDateStr);

  const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
  const dayIndex = Math.floor((clicked - start) / (1000 * 60 * 60 * 24)) + 1;

  return { totalDays, dayIndex };
}

function getDailyIntensityFactor(dayIndex, totalDays) {
  const openingEnd = Math.ceil(totalDays * 0.3);
  const peakStart = Math.floor(totalDays * 0.75);

  if (dayIndex <= openingEnd) {
    return { factor: 0.7, phase: "OPENING DAYS", priority: "MEDIUM" };
  }
  if (dayIndex >= peakStart) {
    return { factor: 1.3, phase: "PEAK DAYS", priority: "CRITICAL" };
  }
  return { factor: 1.0, phase: "MID PHASE", priority: "HIGH" };
}

function generateAIForEvent(ev, selectedDateStr) {
  const { totalDays, dayIndex } = getEventDayInfo(ev, selectedDateStr);
  const intensity = getDailyIntensityFactor(dayIndex, totalDays);

  const baseFootfall = Number(ev.footfall_estimate || 0);
  const baseIncrease = Number(ev.expected_waste_increase_percent || 0);

  const affectedWards = Array.isArray(ev.affected_wards) ? ev.affected_wards : [];
  const wardCount = affectedWards.length || 1;

  // Day-wise dynamic numbers
  const dayFootfall = Math.round(baseFootfall * intensity.factor);

  const dayWasteIncrease = clamp(
    Math.round(baseIncrease * intensity.factor),
    10,
    120
  );

  // Waste estimation
  const expectedWasteKg = Math.round(dayFootfall * 0.6 * (1 + dayWasteIncrease / 100));
  const expectedWasteTons = Math.round((expectedWasteKg / 1000) * 10) / 10;

  // Resources
  const trucksNeeded = Math.max(2, Math.ceil(expectedWasteTons / 8));
  const binsNeeded = Math.max(30, Math.ceil(dayFootfall / 120));
  const workersNeeded = Math.max(10, Math.ceil(dayFootfall / 350));

  // Type-based strategy
  const type = (ev.event_type || "").toLowerCase();

  const strategy = [];
  if (type.includes("religious")) {
    strategy.push("Focus on idol decoration waste, flowers, and food plates near pandals.");
    strategy.push("Add temporary segregation points for wet waste near community areas.");
  } else if (type.includes("sports") || type.includes("match")) {
    strategy.push("Deploy bins near entry gates, food stalls, and parking areas.");
    strategy.push("Schedule rapid pickup immediately after match ends.");
  } else if (type.includes("political") || type.includes("rally")) {
    strategy.push("Prepare for banner waste, plastic bottles, and crowd litter.");
    strategy.push("Keep police coordination for road clearance.");
  } else {
    strategy.push("Deploy extra bins at high-footfall entry/exit zones.");
    strategy.push("Schedule extra collection round in evening peak hours.");
  }

  // Phase-based actions
  const phaseActions = [];
  if (intensity.phase === "OPENING DAYS") {
    phaseActions.push("Ensure all bins are deployed before 8 AM and marked clearly.");
    phaseActions.push("Keep standby truck on-site for overflow prevention.");
  } else if (intensity.phase === "PEAK DAYS") {
    phaseActions.push("Plan for maximum waste spike after peak hours.");
    phaseActions.push("Schedule night cleaning + post-event deep cleanup.");
  } else {
    phaseActions.push("Maintain 2 collection trips daily in affected wards.");
    phaseActions.push("Monitor complaint spikes and respond within 30 minutes.");
  }

  const suggestions = [
    `Priority Level: ${intensity.priority} • Phase: ${intensity.phase} (Day ${dayIndex}/${totalDays})`,
    `Expected waste load: ~${expectedWasteTons} tons/day across ${wardCount} wards.`,
    `Deploy ${trucksNeeded} extra trucks and ${workersNeeded} temporary workers.`,
    `Install ~${binsNeeded} portable bins (wet/dry segregation) in affected wards: ${affectedWards.join(", ") || "N/A"}.`,
    ...strategy,
    ...phaseActions,
    "Add a night collection shift for 2 peak days to prevent roadside overflow.",
    "Assign 1 supervisor per 2 wards for faster monitoring.",
    "Enable auto-alerts for overflowing complaints and missed pickups."
  ];

  return {
    // For UI cards
    footfall: dayFootfall,
    wasteIncreasePercent: dayWasteIncrease,
    trucksNeeded,

    // For text
    expectedWasteTons,
    workersNeeded,
    binsNeeded,
    urgency: intensity.priority,
    phase: intensity.phase,
    suggestions
  };
}

const IWMDSSEventsPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date("2024-03-01"));
  const [selectedDate, setSelectedDate] = useState(null);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  /* Load JSON */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // events_data.json is inside backend/database/
        const res = await fetch("../../backend/database/events_data.json");
        const data = await res.json();

        // IMPORTANT: events are in data.events
        setEvents(Array.isArray(data?.events) ? data.events : []);
      } catch (e) {
        console.error("Failed to load events_data.json:", e);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* Build a map of all dates -> events */
  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach((ev) => {
      const dates = getDateRange(ev.start_date, ev.end_date);
      dates.forEach((ds) => {
        if (!map[ds]) map[ds] = [];
        map[ds].push(ev);
      });
    });
    return map;
  }, [events]);

  const getDaysInMonth = (date) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    return {
      daysInMonth: lastDay.getDate(),
      startingDayOfWeek: firstDay.getDay()
    };
  };

  const navigateMonth = (direction) => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + direction);
    setCurrentDate(d);
    setSelectedDate(null);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const selectedDateStr = selectedDate ? toDateStr(selectedDate) : null;
  const selectedEvents = selectedDateStr ? (eventsByDate[selectedDateStr] || []) : [];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)",
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      color: "#1e293b"
    }}>
      {/* Top Header */}
      {/* <header style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
        padding: "0.75rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        marginBottom: "2rem"
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
            color: "white"
          }}>
            IW
          </div>
          <div>
            <div style={{ fontSize: "1.25rem", fontWeight: "800", color: "white" }}>IWMDSS</div>
            <div style={{ fontSize: "0.75rem", color: "#bfdbfe", fontWeight: "600" }}>Event Prediction Center</div>
          </div>
        </div>

        <div style={{
          padding: "0.6rem 1rem",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "10px",
          fontSize: "0.9rem",
          color: "white",
          fontWeight: "700"
        }}>
          🗓️ Events
        </div>
      </header> */}

      <div style={{ padding: "0 2rem 2rem" }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: selectedDate ? "1fr 1fr" : "1fr",
          gap: "1.5rem"
        }}>
          {/* Calendar */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <button onClick={() => navigateMonth(-1)} style={{
                background: "#f1f5f9",
                border: "none",
                borderRadius: "10px",
                padding: "0.75rem",
                cursor: "pointer"
              }}>
                <ChevronLeft size={20} color="#475569" />
              </button>

              <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "900" }}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>

              <button onClick={() => navigateMonth(1)} style={{
                background: "#f1f5f9",
                border: "none",
                borderRadius: "10px",
                padding: "0.75rem",
                cursor: "pointer"
              }}>
                <ChevronRight size={20} color="#475569" />
              </button>
            </div>

            <div style={{
              background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
              borderRadius: "12px",
              padding: "1rem",
              marginBottom: "1rem",
              border: "2px solid #93c5fd",
              fontWeight: "800",
              color: "#1e40af"
            }}>
              {loading ? "Loading events..." : "Click a highlighted date to see AI preventive measures"}
            </div>

            {/* Day names */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem", marginBottom: "0.5rem" }}>
              {dayNames.map((d) => (
                <div key={d} style={{ textAlign: "center", fontSize: "0.75rem", fontWeight: "900", color: "#64748b", padding: "0.5rem" }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem" }}>
              {[...Array(startingDayOfWeek)].map((_, idx) => (
                <div key={`empty-${idx}`} style={{ aspectRatio: "1", padding: "0.5rem" }} />
              ))}

              {[...Array(daysInMonth)].map((_, idx) => {
                const day = idx + 1;
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const ds = toDateStr(date);
                const dayEvents = eventsByDate[ds] || [];

                const hasEvents = dayEvents.length > 0;
                const isSelected = selectedDate && toDateStr(selectedDate) === ds;

                return (
                  <div
                    key={day}
                    onClick={() => {
                      setSelectedDate(date);
                    }}
                    style={{
                      aspectRatio: "1",
                      padding: "0.5rem",
                      borderRadius: "10px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      border: hasEvents ? "2px solid #f59e0b" : "1px solid #e2e8f0",
                      background: isSelected
                        ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                        : hasEvents
                          ? "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
                          : "transparent"
                    }}
                    title={hasEvents ? `${dayEvents.length} event(s)` : ""}
                  >
                    <div style={{
                      fontSize: "0.9rem",
                      fontWeight: "900",
                      color: isSelected ? "white" : hasEvents ? "#92400e" : "#64748b"
                    }}>
                      {day}
                    </div>

                    {hasEvents && (
                      <div style={{ marginTop: "0.25rem", display: "flex", gap: "3px" }}>
                        {dayEvents.slice(0, 3).map((_, i) => (
                          <div key={i} style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: isSelected ? "white" : "#f59e0b"
                          }} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Panel */}
          {selectedDate && (
            <div style={{
              background: "white",
              borderRadius: "16px",
              padding: "2rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              maxHeight: "900px",
              overflowY: "auto"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <Brain size={22} color="#3b82f6" />
                <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "900" }}>
                  AI Suggestions for {selectedDateStr}
                </h3>
              </div>

              {selectedEvents.length === 0 ? (
                <div style={{
                  padding: "1rem",
                  borderRadius: "12px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  color: "#64748b",
                  fontWeight: "700"
                }}>
                  No events on this day.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {selectedEvents.map((ev) => {
                    const ai = generateAIForEvent(ev, selectedDateStr);

                    return (
                      <div key={ev.event_id} style={{
                        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                        borderRadius: "14px",
                        padding: "1.25rem",
                        border: "2px solid #e2e8f0"
                      }}>
                        <div style={{ fontSize: "1.05rem", fontWeight: "900" }}>{ev.event_name}</div>
                        <div style={{ marginTop: "0.35rem", color: "#64748b", fontWeight: "700", fontSize: "0.9rem" }}>
                          {ev.event_type} • Wards: {ev.affected_wards?.join(", ")}
                        </div>

                        {/* Stats */}
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "0.75rem",
                            marginTop: "1rem"
                          }}
                        >
                          {/* Footfall */}
                          <div
                            style={{
                              background: "white",
                              borderRadius: "12px",
                              padding: "0.9rem",
                              border: "1px solid #e2e8f0"
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                color: "#64748b",
                                fontWeight: "900",
                                fontSize: "0.75rem"
                              }}
                            >
                              <Users size={14} /> Footfall
                            </div>
                            <div style={{ fontSize: "1.1rem", fontWeight: "900", marginTop: "0.25rem" }}>
                              {Number(ev.footfall_estimate || 0).toLocaleString()}
                            </div>
                          </div>

                          {/* Waste Increase */}
                          <div
                            style={{
                              background: "white",
                              borderRadius: "12px",
                              padding: "0.9rem",
                              border: "1px solid #e2e8f0"
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                color: "#64748b",
                                fontWeight: "900",
                                fontSize: "0.75rem"
                              }}
                            >
                              <Trash size={14} /> Waste Increase
                            </div>
                            <div style={{ fontSize: "1.1rem", fontWeight: "900", marginTop: "0.25rem" }}>
                              {ev.expected_waste_increase_percent || 0}%
                            </div>
                          </div>

                          {/* Extra Trucks */}
                          <div
                            style={{
                              background: "white",
                              borderRadius: "12px",
                              padding: "0.9rem",
                              border: "1px solid #e2e8f0"
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                color: "#64748b",
                                fontWeight: "900",
                                fontSize: "0.75rem"
                              }}
                            >
                              <Truck size={14} /> Extra Trucks
                            </div>
                            <div style={{ fontSize: "1.1rem", fontWeight: "900", marginTop: "0.25rem" }}>
                              {ai.trucksNeeded}
                            </div>
                          </div>
                        </div>

                        {/* Suggestions */}
                        <div style={{
                          marginTop: "1rem",
                          background: "white",
                          borderRadius: "14px",
                          padding: "1rem",
                          border: "1px solid #e2e8f0"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "900", marginBottom: "0.75rem" }}>
                            <AlertTriangle size={16} color="#f59e0b" />
                            Preventive Measures
                          </div>

                          <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "#334155", lineHeight: "1.7" }}>
                            {ai.suggestions.map((s, i) => (
                              <li key={i} style={{ fontWeight: "600", fontSize: "0.92rem" }}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<IWMDSSEventsPage />, document.getElementById("root"));