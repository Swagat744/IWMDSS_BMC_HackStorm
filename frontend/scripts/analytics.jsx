const { useState, useEffect, useRef } = React;


const wardData = {
  all: {
    name: "All Wards Overview",
    location: "Mumbai Municipal Corporation - Complete City Analytics",
    waste: 8472,
    trucks: 42,
    efficiency: 87,
    collection: [8420, 8650, 8580, 8720, 8890, 9050, 8980],
    trend: 5.2,
    performance: 87.5,
    collectionRate: 89,
    segregation: 78,
    timeliness: 92,
    citizenRating: "4.2/5",
    complaints: 12,
    pending: 12,
    resolved: 48,
    responseTime: "2.3 hrs",
    resolutionRate: "94%",
    insights: [
      { title: "📊 Overall Performance", desc: "City-wide waste management efficiency at 87.5%. Top performing wards: Z (98%), N (95%), A (93%)." },
      { title: "⚠️ Critical Areas", desc: "Ward F and Ward K require immediate attention with 45% surge in waste generation." },
      { title: "💡 Optimization Tips", desc: "Route optimization can save 24.5 km/day across all wards, reducing fuel costs by ₹850/week." }
    ]
  },

  A: {
    name: "Ward A",
    location: "Colaba & Cuffe Parade - Residential Zone",
    waste: 320,
    trucks: 3,
    efficiency: 93,
    collection: [315, 325, 318, 322, 320, 328, 320],
    trend: 2.1,
    performance: 93.2,
    collectionRate: 95,
    segregation: 88,
    timeliness: 96,
    citizenRating: "4.5/5",
    complaints: 0,
    pending: 0,
    resolved: 5,
    responseTime: "1.8 hrs",
    resolutionRate: "98%",
    insights: [
      { title: "🌟 Excellent Performance", desc: "Ward A maintains 93% efficiency with excellent citizen compliance." },
      { title: "✅ Best Practices", desc: "High segregation rate (88%) and timely collection (96%) are key success factors." },
      { title: "💚 Resident Engagement", desc: "Strong community participation with 4.5/5 satisfaction rating." }
    ]
  },

  F: {
    name: "Ward F",
    location: "Dadar Market & Crawford Market - Commercial Hub",
    waste: 715,
    trucks: 6,
    efficiency: 72,
    collection: [492, 520, 580, 635, 688, 715, 720],
    trend: 45.3,
    performance: 72.5,
    collectionRate: 82,
    segregation: 65,
    timeliness: 78,
    citizenRating: "3.6/5",
    complaints: 12,
    pending: 12,
    resolved: 8,
    responseTime: "4.2 hrs",
    resolutionRate: "78%",
    insights: [
      { title: "🚨 Critical Alert", desc: "Ward F experiencing 45% surge - deploy 2 additional trucks immediately." },
      { title: "📈 Market Impact", desc: "Commercial activity spike causing overflow. Extend collection hours by 3 hours." },
      { title: "⚠️ Action Required", desc: "12 active complaints. Priority response team deployment recommended." }
    ]
  },

  K: {
    name: "Ward K",
    location: "Andheri East - Industrial + Residential Mix",
    waste: 680,
    trucks: 5,
    efficiency: 74,
    collection: [468, 495, 540, 590, 645, 680, 675],
    trend: 45.3,
    performance: 74.8,
    collectionRate: 84,
    segregation: 68,
    timeliness: 80,
    citizenRating: "3.7/5",
    complaints: 15,
    pending: 15,
    resolved: 12,
    responseTime: "3.8 hrs",
    resolutionRate: "80%",
    insights: [
      { title: "🔴 Hotspot Alert", desc: "Ward K showing critical waste levels - immediate intervention needed." },
      { title: "🏭 Industrial Impact", desc: "MIDC area contributing 60% of total waste. Coordinate with factories." },
      { title: "📞 Complaints Surge", desc: "15 active complaints. Deploy additional support team for faster resolution." }
    ]
  }
};

/* -------------------------------
   Helpers
-------------------------------- */
function getTrendColor(trend) {
  return trend >= 0 ? "#16a34a" : "#dc2626";
}

function getTrendBg(trend) {
  return trend >= 0 ? "#dcfce7" : "#fee2e2";
}

function ChartComponent({ type, data, options }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // destroy old chart
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const ctx = canvasRef.current.getContext("2d");

    chartRef.current = new Chart(ctx, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...options
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [type, JSON.stringify(data), JSON.stringify(options)]);

  return <canvas ref={canvasRef}></canvas>;
}


function IWMDSSAnalyticsPage() {
  const [selectedWard, setSelectedWard] = useState("all");
  const [timeFilter, setTimeFilter] = useState("week");

  const currentData = wardData[selectedWard] || wardData.all;

  // wards list
  const wards = ["all", "A", "B", "C", "D", "E", "F", "G", "H", "K", "L", "M", "N", "P", "R", "S", "T", "X", "Y", "Z"];

  // Chart Data
  const collectionChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Waste (tons)",
        data: currentData.collection,
        borderColor: "#5B8DEF",
        backgroundColor: "rgba(91, 141, 239, 0.12)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#5B8DEF"
      }
    ]
  };

  const compositionChartData = {
    labels: ["Organic", "Plastic", "Paper", "Metal", "Glass", "Other"],
    datasets: [
      {
        data: [45, 22, 16, 8, 6, 3],
        backgroundColor: ["#10b981", "#ef4444", "#f59e0b", "#6366f1", "#06b6d4", "#64748b"]
      }
    ]
  };

  const peakHoursChartData = {
    labels: ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM"],
    datasets: [
      {
        label: "Volume",
        data: [280, 420, 580, 720, 640, 780, 690],
        backgroundColor: ["#10b981", "#10b981", "#f59e0b", "#ef4444", "#f59e0b", "#ef4444", "#f59e0b"],
        borderRadius: 6
      }
    ]
  };

  // forecast
  const avgWaste = currentData.collection.reduce((a, b) => a + b, 0) / currentData.collection.length;

  const forecastChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Actual",
        data: [currentData.collection[0], currentData.collection[1], currentData.collection[2], null, null, null, null],
        borderColor: "#5B8DEF",
        borderWidth: 2,
        pointRadius: 5
      },
      {
        label: "Predicted",
        data: [null, null, currentData.collection[2], avgWaste * 1.02, avgWaste * 1.05, avgWaste * 1.08, avgWaste * 1.06],
        borderColor: "#8b5cf6",
        borderDash: [6, 6],
        borderWidth: 2,
        pointRadius: 5
      }
    ]
  };

  return (
    <div style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif", background: "#f5f7fa", minHeight: "100vh" }}>
      {/* Header */}
      {/* <header style={{ background: "#1e3a8a", color: "white", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ background: "#5B8DEF", width: "40px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900" }}>
            IW
          </div>
          <div>
            <h1 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>IWMDSS</h1>
            <p style={{ fontSize: "11px", color: "#bfdbfe", margin: 0 }}>Analytics Center</p>
          </div>
        </div>

        <a href="./dashboard.html" style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "10px 16px", borderRadius: "10px", textDecoration: "none", fontWeight: 800 }}>
          ⬅ Dashboard
        </a>
      </header> */}

      {/* Main */}
      <div id="analyticsReportArea" style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}> 
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", margin: 0 }}>Ward Analytics Dashboard</h2>
            <p style={{ marginTop: "6px", color: "#64748b", fontWeight: 700 }}>Dynamic charts update when you change the ward.</p>
          </div>

          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            {/* Ward Selector */}
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              style={{
                padding: "10px 16px",
                paddingRight: "40px",
                border: "2px solid #e2e8f0",
                borderRadius: "10px",
                background: "white",
                fontSize: "14px",
                fontWeight: 800,
                color: "#0f172a",
                cursor: "pointer",
                minWidth: "220px"
              }}
            >
              <option value="all">All Wards - Overview</option>
              {wards.filter(w => w !== "all").map((ward) => (
                <option key={ward} value={ward}>
                  Ward {ward}
                </option>
              ))}
            </select>


          </div>
        </div>

        {/* Ward Banner */}
        <div style={{
          background: "linear-gradient(135deg, #5B8DEF 0%, #4169e1 100%)",
          color: "white",
          padding: "20px 24px",
          borderRadius: "14px",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "18px",
          boxShadow: "0 6px 16px rgba(91,141,239,0.25)"
        }}>
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: 900, margin: "0 0 8px 0" }}>{currentData.name}</h2>
            <p style={{ fontSize: "14px", opacity: 0.92, margin: 0 }}>{currentData.location}</p>
          </div>

          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "28px", fontWeight: 900, display: "block" }}>{currentData.waste.toLocaleString()}</span>
              <span style={{ fontSize: "12px", opacity: 0.9 }}>Total Waste (tons)</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "28px", fontWeight: 900, display: "block" }}>{currentData.trucks}</span>
              <span style={{ fontSize: "12px", opacity: 0.9 }}>Active Trucks</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "28px", fontWeight: 900, display: "block" }}>{currentData.efficiency}%</span>
              <span style={{ fontSize: "12px", opacity: 0.9 }}>Efficiency</span>
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "20px" }}>
          {/* Collection */}
          <div style={{ background: "white", borderRadius: "14px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ fontSize: "15px", fontWeight: 900, color: "#0f172a" }}>Daily Waste Collection</div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: 900,
                background: getTrendBg(currentData.trend),
                color: getTrendColor(currentData.trend)
              }}>
                {currentData.trend >= 0 ? "↑" : "↓"} {Math.abs(currentData.trend)}%
              </div>
            </div>
            <div style={{ position: "relative", height: "280px" }}>
              <ChartComponent type="line" data={collectionChartData} options={{ plugins: { legend: { display: false } } }} />
            </div>
          </div>

          {/* Composition */}
          <div style={{ background: "white", borderRadius: "14px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "15px", fontWeight: 900, color: "#0f172a", marginBottom: "16px" }}>Waste Type Distribution</div>
            <div style={{ position: "relative", height: "280px" }}>
              <ChartComponent type="doughnut" data={compositionChartData} options={{ plugins: { legend: { position: "right" } } }} />
            </div>
          </div>

          {/* Peak */}
          <div style={{ background: "white", borderRadius: "14px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "15px", fontWeight: 900, color: "#0f172a", marginBottom: "16px" }}>Collection Peak Hours</div>
            <div style={{ position: "relative", height: "280px" }}>
              <ChartComponent type="bar" data={peakHoursChartData} options={{ plugins: { legend: { display: false } } }} />
            </div>
          </div>

          {/* Performance */}
          <div style={{ background: "white", borderRadius: "14px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "15px", fontWeight: 900, color: "#0f172a", marginBottom: "16px" }}>Performance Score</div>
            <div style={{ fontSize: "38px", fontWeight: 900, color: "#5B8DEF", margin: "12px 0 8px 0" }}>{currentData.performance}</div>
            <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 700 }}>Overall efficiency rating</div>

            <div style={{ marginTop: "20px" }}>
              {[
                ["Collection Rate", `${currentData.collectionRate}%`],
                ["Segregation Score", `${currentData.segregation}%`],
                ["Timeliness", `${currentData.timeliness}%`],
                ["Citizen Rating", currentData.citizenRating]
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: k !== "Citizen Rating" ? "1px solid #f1f5f9" : "none", fontSize: "14px" }}>
                  <span style={{ fontWeight: 700 }}>{k}</span>
                  <span style={{ fontWeight: 900 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Forecast */}
          <div style={{ background: "white", borderRadius: "14px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "15px", fontWeight: 900, color: "#0f172a", marginBottom: "16px" }}>7-Day Waste Forecast</div>
            <div style={{ position: "relative", height: "280px" }}>
              <ChartComponent type="line" data={forecastChartData} />
            </div>
          </div>

          {/* Complaints */}
          <div style={{ background: "white", borderRadius: "14px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "15px", fontWeight: 900, color: "#0f172a", marginBottom: "16px" }}>Complaints & Issues</div>
            <div style={{ fontSize: "38px", fontWeight: 900, color: "#5B8DEF", margin: "12px 0 8px 0" }}>{currentData.complaints}</div>
            <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 700 }}>Active complaints</div>

            <div style={{ marginTop: "20px" }}>
              {[
                ["Pending", currentData.pending],
                ["Resolved (This Week)", currentData.resolved],
                ["Avg Response Time", currentData.responseTime],
                ["Resolution Rate", currentData.resolutionRate]
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: k !== "Resolution Rate" ? "1px solid #f1f5f9" : "none", fontSize: "14px" }}>
                  <span style={{ fontWeight: 700 }}>{k}</span>
                  <span style={{ fontWeight: 900, color: k.includes("Resolved") ? "#16a34a" : "#0f172a" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div style={{
          background: "linear-gradient(135deg, #5B8DEF 0%, #7c3aed 100%)",
          color: "white",
          borderRadius: "14px",
          padding: "24px",
          marginTop: "24px"
        }}>
          <div style={{ fontSize: "18px", fontWeight: 900, marginBottom: "16px" }}>
            🤖 AI Insights for {currentData.name}
          </div>

          {currentData.insights.map((insight, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                padding: "16px",
                borderRadius: "12px",
                marginBottom: index < currentData.insights.length - 1 ? "12px" : 0,
                border: "1px solid rgba(255,255,255,0.2)"
              }}
            >
              <div style={{ fontWeight: 900, marginBottom: "6px" }}>{insight.title}</div>
              <div style={{ fontSize: "14px", opacity: 0.95, lineHeight: 1.5 }}>{insight.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Render
ReactDOM.render(<IWMDSSAnalyticsPage />, document.getElementById("root"));

window.downloadAnalyticsPDF = async function () {
  try {
    const area = document.getElementById("analyticsReportArea");
    if (!area) {
      alert("analyticsReportArea not found!");
      return;
    }

    if (!window.html2canvas) {
      alert("html2canvas not loaded. Add script in analytics.html");
      return;
    }

    if (!window.jspdf) {
      alert("jsPDF not loaded. Add script in analytics.html");
      return;
    }

    // Ward name from dropdown
    const wardSelect = document.querySelector("select");
    let wardName = "All-Wards";
    if (wardSelect) {
      wardName = wardSelect.value === "all" ? "All-Wards" : `Ward-${wardSelect.value}`;
    }

    const btn = document.getElementById("downloadReportBtn");
    if (btn) {
      btn.innerText = "Generating PDF...";
      btn.disabled = true;
    }

    const canvas = await window.html2canvas(area, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = 297;

    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(`IWMDSS_Analytics_${wardName}.pdf`);

    if (btn) {
      btn.innerText = "⬇ Download Report";
      btn.disabled = false;
    }
  } catch (err) {
    console.error(err);
    alert("PDF download failed. Check console.");

    const btn = document.getElementById("downloadReportBtn");
    if (btn) {
      btn.innerText = "⬇ Download Report";
      btn.disabled = false;
    }
  }
};