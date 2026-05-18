import React, { useState, useId } from "react";
import { StickyNote } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ─── Mock chart data ─── */
const chartData = [
  { month: "Jan", revenue: 4200, expenses: 2400 },
  { month: "Feb", revenue: 3800, expenses: 2100 },
  { month: "Mar", revenue: 5100, expenses: 2900 },
  { month: "Apr", revenue: 4600, expenses: 2600 },
  { month: "May", revenue: 5800, expenses: 3200 },
  { month: "Jun", revenue: 6200, expenses: 3400 },
  { month: "Jul", revenue: 5400, expenses: 3000 },
  { month: "Aug", revenue: 6800, expenses: 3800 },
  { month: "Sep", revenue: 7200, expenses: 4100 },
  { month: "Oct", revenue: 6500, expenses: 3600 },
  { month: "Nov", revenue: 7800, expenses: 4200 },
  { month: "Dec", revenue: 8200, expenses: 4500 },
];

/* ─── Custom Tooltip ─── */
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className="rounded-lg border border-grey-200 dark:border-border bg-card px-3 py-2 shadow-md font-sans"
      style={{ fontSize: "var(--text-xs)" }}
    >
      <p
        className="text-foreground mb-1"
        style={{ fontWeight: "var(--font-weight-medium)" }}
      >
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2">
          <span
            className="inline-block size-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground capitalize">
            {entry.dataKey}:
          </span>
          <span className="text-foreground">
            £{entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ChartExample() {
  const [activeSection, setActiveSection] = useState<"notes" | "history">(
    "notes"
  );
  const uniqueId = useId().replace(/:/g, "");
  const revenueGradientId = `colorRevenue-${uniqueId}`;
  const expensesGradientId = `colorExpenses-${uniqueId}`;

  return (
    <div className="w-full">
      {/* ═══ Card container ═══ */}
      <div className="rounded-xl border border-grey-200 dark:border-border bg-card shadow-sm overflow-hidden">
        {/* ── Header bar ── */}
        <div className="flex items-center gap-4 px-5 py-4 border-b border-grey-200 dark:border-border">
          {/* Left: icon + large section toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center size-10 rounded-lg bg-dp-500 shrink-0">
              <StickyNote className="size-5 text-cosmic-300" />
            </div>
            <div
              className="flex items-center gap-4 font-sans tracking-tight leading-none"
              style={{
                fontSize: "var(--text-4xl)",
                fontWeight: 600,
              }}
            >
              <button
                onClick={() => setActiveSection("notes")}
                className={`cursor-pointer transition-colors ${
                  activeSection === "notes"
                    ? "text-[var(--color-dp-700)] dark:text-[var(--color-dp-300)]"
                    : "text-[var(--color-grey-500)]"
                }`}
              >
                Notes
              </button>
              <div className="w-[2px] h-[36px] bg-[var(--color-dp-700)] dark:bg-[var(--color-dp-300)] rounded-full" />
              <button
                onClick={() => setActiveSection("history")}
                className={`cursor-pointer transition-colors ${
                  activeSection === "history"
                    ? "text-[var(--color-dp-700)] dark:text-[var(--color-dp-300)]"
                    : "text-[var(--color-grey-500)]"
                }`}
              >
                History
              </button>
            </div>
          </div>
        </div>

        {/* ── Chart area ── */}
        <div className="px-5 pt-5 pb-4">
          {/* Legend */}
          <div className="flex items-center gap-5 mb-4">
            <div className="flex items-center gap-2">
              <span className="inline-block size-2.5 rounded-full bg-chart-1" />
              <span
                className="text-muted-foreground font-sans"
                style={{ fontSize: "var(--text-xs)" }}
              >
                Revenue
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block size-2.5 rounded-full bg-chart-3" />
              <span
                className="text-muted-foreground font-sans"
                style={{ fontSize: "var(--text-xs)" }}
              >
                Expenses
              </span>
            </div>
          </div>

          {/* Area chart */}
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
            >
              <defs key="chart-defs">
                <linearGradient
                  id={revenueGradientId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-chart-1)"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-chart-1)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient
                  id={expensesGradientId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-chart-3)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-chart-3)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                key="grid"
                strokeDasharray="3 3"
                stroke="var(--color-grey-200)"
                vertical={false}
              />
              <XAxis
                key="xaxis"
                dataKey="month"
                tick={{
                  fill: "var(--color-grey-500)",
                  fontSize: "var(--text-xs)",
                  fontFamily: "'Roboto Flex', sans-serif",
                }}
                tickLine={false}
                axisLine={{ stroke: "var(--color-grey-200)" }}
              />
              <YAxis
                key="yaxis"
                tick={{
                  fill: "var(--color-grey-500)",
                  fontSize: "var(--text-xs)",
                  fontFamily: "'Roboto Flex', sans-serif",
                }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) =>
                  `£${(value / 1000).toFixed(0)}k`
                }
              />
              <Tooltip
                key="tooltip"
                content={<ChartTooltip />}
                cursor={{
                  stroke: "var(--color-grey-200)",
                  strokeDasharray: "4 4",
                }}
              />
              <Area
                key="area-revenue"
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
                fill={`url(#${revenueGradientId})`}
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: "var(--color-chart-1)",
                  strokeWidth: 2,
                  fill: "var(--color-card)",
                }}
              />
              <Area
                key="area-expenses"
                type="monotone"
                dataKey="expenses"
                stroke="var(--color-chart-3)"
                strokeWidth={2}
                fill={`url(#${expensesGradientId})`}
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: "var(--color-chart-3)",
                  strokeWidth: 2,
                  fill: "var(--color-card)",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}