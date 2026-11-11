import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  TrendingUp,
  BarChart3,
  LineChart,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import type { Lead } from "../lib/types";
import { uzDate, uzWeekday } from "../lib/date";

interface RequestsAnalyticsChartProps {
  leads: Lead[];
}

export const RequestsAnalyticsChart: React.FC<RequestsAnalyticsChartProps> = ({
  leads,
}) => {
  const [period, setPeriod] = useState<7 | 14 | 30>(7);
  const [chartType, setChartType] = useState<"bars" | "area">("bars");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const today = new Date();

  // Generate date points for selected period
  const days = Array.from({ length: period }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (period - 1 - i));
    const key = d.toLocaleDateString("en-CA", { timeZone: "Asia/Tashkent" });
    const dayLeads = leads.filter((l) => {
      const leadKey = new Date(l.createdAt).toLocaleDateString("en-CA", {
        timeZone: "Asia/Tashkent",
      });
      return leadKey === key;
    });

    const isToday = i === period - 1;
    const shortLabel = uzWeekday(d);

    return {
      date: d,
      key,
      shortLabel,
      fullDate: `${shortLabel}, ${d.getDate()}-${uzMonthName(d.getMonth())}`,
      count: dayLeads.length,
      leads: dayLeads,
      isToday,
    };
  });

  const maxCount = Math.max(...days.map((d) => d.count), 4);
  const totalInPeriod = days.reduce((sum, d) => sum + d.count, 0);
  const avgPerDay = (totalInPeriod / period).toFixed(1);
  const confirmedCount = leads.filter(
    (l) => l.status === "confirmed" && days.some((d) => {
      const leadKey = new Date(l.createdAt).toLocaleDateString("en-CA", {
        timeZone: "Asia/Tashkent",
      });
      return leadKey === d.key;
    }),
  ).length;

  // SVG Area points
  const svgWidth = 600;
  const svgHeight = 160;
  const paddingX = 24;
  const paddingY = 20;
  const effectiveWidth = svgWidth - paddingX * 2;
  const effectiveHeight = svgHeight - paddingY * 2;

  const points = days.map((d, i) => {
    const x = paddingX + (i / (days.length - 1)) * effectiveWidth;
    const y =
      svgHeight - paddingY - (d.count / maxCount) * effectiveHeight;
    return { x, y, ...d };
  });

  // Build SVG path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const cpX1 = curr.x + (next.x - curr.x) / 2;
    const cpY1 = curr.y;
    const cpX2 = curr.x + (next.x - curr.x) / 2;
    const cpY2 = next.y;
    pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
  }

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  return (
    <section className="admin-card requests-chart modern-analytics-card">
      {/* Top Header */}
      <div className="admin-card-header analytics-header">
        <div>
          <div className="analytics-title-row">
            <h2>Arizalar dinamikasi</h2>
            <span className="live-status-pill">
              <span className="pulse-dot" /> Jonli tahlil
            </span>
          </div>
          <p>Oxirgi {period} kun ichidagi barcha murojaatlar monitoringi</p>
        </div>

        <div className="analytics-controls">
          {/* Chart Type Toggle */}
          <div className="chart-mode-toggle" role="group" aria-label="Grafik turi">
            <button
              type="button"
              className={`mode-btn ${chartType === "bars" ? "active" : ""}`}
              onClick={() => setChartType("bars")}
              title="Ustunli ko‘rinish"
            >
              <BarChart3 size={15} />
            </button>
            <button
              type="button"
              className={`mode-btn ${chartType === "area" ? "active" : ""}`}
              onClick={() => setChartType("area")}
              title="To‘lqinli egri chiziq"
            >
              <LineChart size={15} />
            </button>
          </div>

          {/* Period Selector */}
          <div className="period-pill-group" role="group" aria-label="Davr tanlash">
            {([7, 14, 30] as const).map((p) => (
              <button
                key={p}
                type="button"
                className={`period-btn ${period === p ? "active" : ""}`}
                onClick={() => setPeriod(p)}
              >
                {p} kun
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Highlight Bar */}
      <div className="analytics-summary-bar">
        <div className="summary-metric primary">
          <div className="metric-num-wrap">
            <span className="metric-large">{totalInPeriod}</span>
            <span className="metric-unit">ta yangi ariza</span>
          </div>
          <span className="metric-tag positive">
            <TrendingUp size={12} /> {totalInPeriod > 0 ? "Faol o‘sish" : "Kuzatuvda"}
          </span>
        </div>

        <div className="summary-metric">
          <span className="metric-label">O‘rtacha kunlik</span>
          <strong className="metric-val">{avgPerDay} ta/kun</strong>
        </div>

        <div className="summary-metric">
          <span className="metric-label">Tasdiqlangan</span>
          <strong className="metric-val">{confirmedCount} ta</strong>
        </div>

        <div className="summary-metric">
          <span className="metric-label">Tanlangan davr</span>
          <strong className="metric-val">Oxirgi {period} kun</strong>
        </div>
      </div>

      {/* Main Chart Visualization */}
      <div className="analytics-chart-viewport">
        {/* Guide Lines */}
        <div className="chart-guides">
          {[maxCount, Math.round(maxCount / 2), 0].map((n, i) => (
            <div key={i} className="chart-guide-line">
              <span className="guide-val">{n}</span>
              <span className="guide-dash" />
            </div>
          ))}
        </div>

        {/* BARS VIEW */}
        {chartType === "bars" && (
          <div className="modern-bars-container">
            {days.map((d, i) => {
              const heightPct = d.count ? Math.max((d.count / maxCount) * 100, 10) : 0;
              const isHovered = hoveredIdx === i;

              return (
                <div
                  key={d.key}
                  className={`bar-column-wrap ${d.isToday ? "is-today" : ""} ${isHovered ? "is-hovered" : ""}`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Floating tooltip on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="chart-floating-tooltip"
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                      >
                        <strong>{d.fullDate}</strong>
                        <span>
                          {d.count > 0 ? `${d.count} ta ariza qabul qilindi` : "Arizalar yo‘q"}
                        </span>
                        {d.isToday && <small>Bugun</small>}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Capsule Track */}
                  <div className="bar-capsule-track">
                    {d.count > 0 && (
                      <motion.div
                        className="bar-capsule-fill"
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPct}%` }}
                        transition={{ duration: 0.5, delay: i * 0.03, ease: "easeOut" }}
                      >
                        <span className="bar-top-pill">{d.count}</span>
                      </motion.div>
                    )}
                    {d.count === 0 && <span className="bar-zero-dot" />}
                  </div>

                  {/* Day Label */}
                  <div className="bar-footer-label">
                    <span className="day-name">{d.shortLabel}</span>
                    {d.isToday && <span className="today-badge">Bugun</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* AREA SPLINE VIEW */}
        {chartType === "area" && (
          <div className="modern-area-container">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="area-svg-canvas"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.32" />
                  <stop offset="85%" stopColor="#059669" stopOpacity="0.02" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="chartStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>

              {/* Area Fill */}
              <motion.path
                d={areaD}
                fill="url(#chartGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />

              {/* Stroke line */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#chartStroke)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Nodes */}
              {points.map((pt, i) => (
                <g key={pt.key} className="chart-svg-node">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredIdx === i ? 6 : pt.count > 0 ? 5 : 3.5}
                    className={`node-circle ${pt.count > 0 ? "has-data" : "is-empty"} ${pt.isToday ? "is-today" : ""}`}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  />
                  {pt.count > 0 && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="9"
                      className="node-halo"
                    />
                  )}
                </g>
              ))}
            </svg>

            {/* X Axis Labels under Area chart */}
            <div className="area-axis-labels">
              {days.map((d, i) => (
                <span
                  key={d.key}
                  className={`area-label-item ${d.isToday ? "today" : ""}`}
                  style={{ left: `${(i / (days.length - 1)) * 100}%` }}
                >
                  {d.shortLabel}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="analytics-card-footer">
        <span className="footer-note">
          <Clock size={12} /> Ma’lumotlar har daqiqada avtomatik sinxronlanadi
        </span>
        <span className="footer-status">
          <CheckCircle2 size={12} color="#059669" /> Tizim faol: barqaror
        </span>
      </div>
    </section>
  );
};

function uzMonthName(m: number): string {
  const months = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentabr",
    "oktabr",
    "noyabr",
    "dekabr",
  ];
  return months[m] || "";
}

