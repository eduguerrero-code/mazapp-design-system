import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Separator } from "../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  ChevronLeft,
  Mail,
  Clock,
  TriangleAlert,
  CircleAlert,
  CircleCheck,
  ArrowDown,
  Info,
  MoreVertical,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ─── Chart Data ─── */
const chartData = [
  { month: "JAN", Sent: 200, "Awaiting Payment": 0, Due: 300, Overdue: 100, Paid: 0 },
  { month: "FEB", Sent: 800, "Awaiting Payment": 2800, Due: 600, Overdue: 200, Paid: 0 },
  { month: "MAR", Sent: 1100, "Awaiting Payment": 1500, Due: 0, Overdue: 0, Paid: 2200 },
  { month: "APR", Sent: 0, "Awaiting Payment": 1000, Due: 1200, Overdue: 400, Paid: 0 },
  { month: "MAY", Sent: 0, "Awaiting Payment": 1200, Due: 0, Overdue: 200, Paid: 800 },
  { month: "JUN", Sent: 0, "Awaiting Payment": 0, Due: 0, Overdue: 0, Paid: 0 },
  { month: "JUL", Sent: 0, "Awaiting Payment": 0, Due: 0, Overdue: 0, Paid: 0 },
  { month: "AUG", Sent: 0, "Awaiting Payment": 0, Due: 0, Overdue: 0, Paid: 0 },
  { month: "SEP", Sent: 0, "Awaiting Payment": 0, Due: 0, Overdue: 0, Paid: 0 },
  { month: "OCT", Sent: 0, "Awaiting Payment": 0, Due: 0, Overdue: 0, Paid: 0 },
  { month: "NOV", Sent: 0, "Awaiting Payment": 0, Due: 0, Overdue: 0, Paid: 0 },
  { month: "DEC", Sent: 0, "Awaiting Payment": 0, Due: 0, Overdue: 0, Paid: 0 },
];

/* ─── Invoice Data ─── */
const invoices = [
  {
    id: "025",
    ref: "3824",
    recipient: "Mrs Flowers Land…",
    issueDate: "11th Jul 24",
    dueDate: "11th Aug 24",
    dueDateIcon: null,
    daysLeft: 20,
    paid: "0.00",
    due: "1,500",
    status: "Sent",
  },
  {
    id: "026",
    ref: "3824b",
    recipient: "Dave Lovemartin",
    issueDate: "1st Jun 24",
    dueDate: "21st Jul 24",
    dueDateIcon: null,
    daysLeft: 11,
    paid: "0.00",
    due: "1,500",
    status: "Awaiting",
  },
  {
    id: "027",
    ref: "3824",
    recipient: "Michelle Parrett",
    issueDate: "12th Apr 24",
    dueDate: "11th Jun 24",
    dueDateIcon: "warning",
    daysLeft: 6,
    paid: "750",
    due: "1,500",
    status: "Due",
  },
  {
    id: "028",
    ref: "3824",
    recipient: "Jake Harry",
    recipientSub: "From: Quote",
    issueDate: "9th Apr 24",
    dueDate: "9th Jun 24",
    dueDateIcon: "danger",
    daysLeft: -5,
    paid: "0",
    due: "1,500",
    status: "Overdue",
  },
  {
    id: "029",
    ref: "3824",
    recipient: "Lighting Studio Ltd",
    recipientSub: "Edited",
    issueDate: "2nd May 24",
    dueDate: "21st Jul 24",
    dueDateIcon: "ok",
    daysLeft: "OK",
    paid: "1,500",
    due: "1,500",
    status: "Paid",
  },
] as const;

/* ─── Filter Pills ─── */
const filters = ["All", "Sent", "Overdue", "Due", "Paid", "Drafts", "Cancelled"];

/* ─── KPI Card ─── */
function KpiCard({
  icon,
  iconColour,
  label,
  amount,
  count,
}: {
  icon: React.ReactNode;
  iconColour: string;
  label: string;
  amount: string;
  count: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-grey-200 dark:border-border bg-card px-4 py-3.5 min-w-[160px]">
      <div className="flex items-center gap-1.5">
        <span className={iconColour}>{icon}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-xl tracking-tight">{amount}</span>
        <span className="text-xs text-muted-foreground">/ {count}</span>
      </div>
    </div>
  );
}

/* ─── Days-Left Badge ─── */
function DaysLeftBadge({ value }: { value: number | string }) {
  if (value === "OK") {
    return (
      <span className="inline-flex items-center justify-center rounded-full bg-positive-50 text-positive-700 dark:bg-positive-700/20 dark:text-positive-500 px-2.5 py-0.5 text-xs font-medium">
        OK
      </span>
    );
  }

  const num = Number(value);
  let colour = "bg-positive-50 text-positive-700 dark:bg-positive-700/20 dark:text-positive-500";
  if (num <= 0) {
    colour = "bg-negative-50 text-negative-700 dark:bg-negative-500/20 dark:text-negative-500";
  } else if (num <= 7) {
    colour = "bg-notice-50 text-notice-700 dark:bg-notice-500/20 dark:text-notice-500";
  } else if (num <= 14) {
    colour = "bg-mz-blue-50 text-mz-blue-700 dark:bg-mz-blue-500/20 dark:text-mz-blue-300";
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full ${colour} min-w-[32px] px-2.5 py-0.5 text-xs font-medium`}
    >
      {num}
    </span>
  );
}

/* ─── Due Date Icon ─── */
function DueDateIcon({ type }: { type: string | null }) {
  if (!type) return null;
  if (type === "warning") return <TriangleAlert className="size-3.5 text-notice-500" />;
  if (type === "danger") return <CircleAlert className="size-3.5 text-negative-500" />;
  if (type === "ok") return <CircleCheck className="size-3.5 text-positive-500" />;
  return null;
}

/* ─── Custom Chart Tooltip ─── */
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s: number, p: any) => s + (p.value || 0), 0);
  return (
    <div className="rounded-lg border border-grey-200 dark:border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-medium">£{total.toLocaleString()}</p>
    </div>
  );
}

/* ─── Custom Legend ─── */
function ChartLegend() {
  const items = [
    { label: "Sent", colour: "#AEAEAE" },
    { label: "Awaiting Payment", colour: "#00DEEF" },
    { label: "Due", colour: "#FF990A" },
    { label: "Overdue", colour: "#B00020" },
    { label: "Paid", colour: "#7BAE37" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span
            className="size-2.5 rounded-full"
            style={{ backgroundColor: item.colour }}
          />
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function InvoicingPattern() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="space-y-2">
      {/* Page meta header */}
      <div>
        <Badge className="mb-3 bg-dp-100 text-dp-500 dark:bg-mz-purple-900 dark:text-mz-purple-300 border-dp-300/20">
          Patterns
        </Badge>
        <h1 className="mb-2">Invoicing Dashboard</h1>
        <p className="text-muted-foreground">
          A full invoicing view pattern demonstrating charts, tables, KPI cards,
          filter pills, and status badges composed from MazApp design system
          components.
        </p>
      </div>

      <Separator className="!my-6" />

      {/* ── Live Pattern ─────────────────────────────── */}
      <div className="rounded-2xl border border-grey-200 dark:border-border bg-card overflow-hidden">
        {/* ── Top Header Bar ── */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-grey-200 dark:border-border bg-card">
          <div className="flex items-center gap-3">
            <button className="p-1.5 rounded-lg border border-grey-200 dark:border-border hover:bg-muted transition-colors">
              <ChevronLeft className="size-4 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-mz-purple-500">
                <Mail className="size-4 text-white" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Invoicing</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">Quotations</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              New Quote
            </Button>
            <Button size="sm">New Invoice</Button>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="px-5 py-5 space-y-5">
          {/* ── Filter Pills ── */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors border ${
                  activeFilter === f
                    ? "bg-mz-purple-500 text-white border-mz-purple-500"
                    : "bg-card text-foreground border-grey-200 dark:border-border hover:bg-muted"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* ── KPI Summary Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard
              icon={<Clock className="size-3.5" />}
              iconColour="text-mz-blue-500"
              label="Awaiting payment"
              amount="£4,250"
              count="4 invoices"
            />
            <KpiCard
              icon={<TriangleAlert className="size-3.5" />}
              iconColour="text-notice-500"
              label="Due (Next 7 days)"
              amount="£1,732"
              count="1 invoice"
            />
            <KpiCard
              icon={<CircleAlert className="size-3.5" />}
              iconColour="text-negative-500"
              label="Overdue"
              amount="£ 954.32"
              count="2 invoices"
            />
            <KpiCard
              icon={<CircleCheck className="size-3.5" />}
              iconColour="text-positive-500"
              label="Paid"
              amount="£ 8,750"
              count="4 invoices"
            />
          </div>

          {/* ── Chart Section ── */}
          <div className="rounded-xl border border-grey-200 dark:border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <ChartLegend />
              <Select defaultValue="this-year">
                <SelectTrigger className="w-[130px] h-9 rounded-lg bg-card text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-year">This year</SelectItem>
                  <SelectItem value="last-year">Last year</SelectItem>
                  <SelectItem value="all-time">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 5, left: -10, bottom: 0 }}
                barCategoryGap="30%"
                barGap={1}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--color-grey-200)"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-grey-500)", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-grey-500)", fontSize: 11 }}
                  tickFormatter={(v) =>
                    v === 0 ? "0" : `${(v / 1000).toFixed(0)}k`
                  }
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
                <Bar key="sent" id="bar-sent" dataKey="Sent" stackId="a" fill="#AEAEAE" radius={[0, 0, 0, 0]} isAnimationActive={false} />
                <Bar key="awaiting" id="bar-awaiting" dataKey="Awaiting Payment" stackId="a" fill="#00DEEF" radius={[0, 0, 0, 0]} isAnimationActive={false} />
                <Bar key="due" id="bar-due" dataKey="Due" stackId="a" fill="#FF990A" radius={[0, 0, 0, 0]} isAnimationActive={false} />
                <Bar key="overdue" id="bar-overdue" dataKey="Overdue" stackId="a" fill="#B00020" radius={[0, 0, 0, 0]} isAnimationActive={false} />
                <Bar key="paid" id="bar-paid" dataKey="Paid" stackId="a" fill="#7BAE37" radius={[3, 3, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ── Invoice Table ── */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox />
                </TableHead>
                <TableHead>
                  <span className="inline-flex items-center gap-1">
                    Inv # <ArrowDown className="size-3 text-table-sort-arrow stroke-[2.5]" />
                  </span>
                </TableHead>
                <TableHead>
                  <span className="inline-flex items-center gap-1">
                    Ref <ArrowDown className="size-3 text-table-sort-arrow stroke-[2.5]" />
                  </span>
                </TableHead>
                <TableHead>
                  <span className="inline-flex items-center gap-1">
                    Recipient <ArrowDown className="size-3 text-table-sort-arrow stroke-[2.5]" />
                  </span>
                </TableHead>
                <TableHead>
                  <span className="inline-flex items-center gap-1">
                    Issue Date <ArrowDown className="size-3 text-table-sort-arrow stroke-[2.5]" />
                  </span>
                </TableHead>
                <TableHead>
                  <span className="inline-flex items-center gap-1">
                    Due Date <Info className="size-3 text-table-sort-arrow stroke-[2.5]" />
                  </span>
                </TableHead>
                <TableHead>
                  <span className="inline-flex items-center gap-1">
                    Days left <ArrowDown className="size-3 text-table-sort-arrow stroke-[2.5]" />
                  </span>
                </TableHead>
                <TableHead>
                  <span className="inline-flex items-center gap-1">
                    Paid/Due (£) <ArrowDown className="size-3 text-table-sort-arrow stroke-[2.5]" />
                  </span>
                </TableHead>
                <TableHead>
                  <span className="inline-flex items-center gap-1">
                    Status <ArrowDown className="size-3 text-table-sort-arrow stroke-[2.5]" />
                  </span>
                </TableHead>
                <TableHead className="w-10">
                  <MoreVertical className="size-4 text-muted-foreground" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{inv.id}</TableCell>
                  <TableCell className="text-muted-foreground">{inv.ref}</TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium">{inv.recipient}</span>
                      {"recipientSub" in inv && inv.recipientSub && (
                        <span className="block text-xs text-grey-500">
                          {inv.recipientSub}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      {inv.issueDate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <ArrowRight className="size-3 text-grey-500" />
                      {inv.dueDate}
                      <DueDateIcon type={inv.dueDateIcon} />
                    </span>
                  </TableCell>
                  <TableCell>
                    <DaysLeftBadge value={inv.daysLeft} />
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {inv.paid}/{inv.due}
                  </TableCell>
                  <TableCell>{inv.status}</TableCell>
                  <TableCell>
                    <button className="p-1 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                      <MoreVertical className="size-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* ── Load More ── */}
          <div className="flex justify-center pt-2">
            <Button variant="outline" className="rounded-full px-8">
              Load more
            </Button>
          </div>
        </div>

        {/* ── Support FAB ── */}
        <div className="flex justify-end px-5 pb-4">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mz-purple-500 text-white text-sm hover:bg-mz-purple-700 transition-colors shadow-lg">
            Support
            <HelpCircle className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}