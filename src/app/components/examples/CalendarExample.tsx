import { useState } from "react";
import { Calendar } from "../ui/calendar";
import type { DateRange } from "react-day-picker";
import { format, isSameDay, differenceInCalendarDays } from "date-fns";
import {
  CalendarDays,
  Clock,
  Video,
  MapPin,
  ChevronRight,
  ArrowRight,
  Users,
} from "lucide-react";

/* ─── Design tokens via Tailwind classes (maps to CSS vars) ── */

const TODAY = new Date(2026, 2, 9); // March 9 2026

/* ─── Event data ─────────────────────────────────────────────── */
type EventType = "meeting" | "review" | "deadline" | "social";

interface CalEvent {
  id: number;
  date: Date;
  title: string;
  time?: string;
  type: EventType;
  location?: string;
}

const EVENTS: CalEvent[] = [
  { id: 1, date: new Date(2026, 2, 10), title: "Team Standup", time: "9:00 AM", type: "meeting", location: "Video call" },
  { id: 2, date: new Date(2026, 2, 10), title: "Design Review", time: "2:00 PM", type: "review", location: "Boardroom A" },
  { id: 3, date: new Date(2026, 2, 13), title: "Tax Filing Deadline", time: "All day", type: "deadline" },
  { id: 4, date: new Date(2026, 2, 17), title: "Product Demo", time: "11:00 AM", type: "meeting", location: "Video call" },
  { id: 5, date: new Date(2026, 2, 20), title: "Quarterly Review", time: "3:00 PM", type: "review", location: "Conference Room 2" },
  { id: 6, date: new Date(2026, 2, 25), title: "Team Social", time: "6:00 PM", type: "social", location: "The Alchemist" },
  { id: 7, date: new Date(2026, 2, 27), title: "Sprint Planning", time: "10:00 AM", type: "meeting", location: "Video call" },
];

/* ─── Time slots ──────────────────────────────────────────────── */
const TIME_SLOTS = [
  { id: "0900", label: "9:00 AM",  available: true },
  { id: "1000", label: "10:00 AM", available: false },
  { id: "1100", label: "11:00 AM", available: true },
  { id: "1300", label: "1:00 PM",  available: true },
  { id: "1400", label: "2:00 PM",  available: false },
  { id: "1500", label: "3:00 PM",  available: true },
  { id: "1600", label: "4:00 PM",  available: true },
];

/* ─── Event type styling ──────────────────────────────────────── */
const EVENT_DOT: Record<EventType, string> = {
  meeting:  "bg-mz-blue-500",
  review:   "bg-mz-purple-500",
  deadline: "bg-negative-500",
  social:   "bg-positive-500",
};

const EVENT_BADGE: Record<EventType, string> = {
  meeting:  "bg-mz-blue-50  text-mz-blue-700  border-mz-blue-300/40",
  review:   "bg-dp-100      text-dp-500        border-dp-300/30",
  deadline: "bg-negative-50 text-negative-700  border-negative-500/30",
  social:   "bg-positive-50 text-positive-700  border-positive-500/30",
};

const EVENT_LABEL: Record<EventType, string> = {
  meeting:  "Meeting",
  review:   "Review",
  deadline: "Deadline",
  social:   "Social",
};

/* ─── Helper: dots content for a given date ──────────────────── */
function EventDots({ date }: { date: Date }) {
  const dayEvents = EVENTS.filter((e) => isSameDay(e.date, date));
  if (!dayEvents.length) return null;
  return (
    <span
      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex gap-0.5"
      aria-hidden
    >
      {dayEvents.slice(0, 3).map((e, i) => (
        <span
          key={i}
          className={`w-1 h-1 rounded-full ${EVENT_DOT[e.type]}`}
        />
      ))}
    </span>
  );
}

/* ─── Tab strip ────────────────────────────────────────────────── */
type Tab = "schedule" | "range" | "events";
const TABS: { key: Tab; label: string }[] = [
  { key: "schedule", label: "Schedule" },
  { key: "range",    label: "Date Range" },
  { key: "events",   label: "Event Calendar" },
];

/* ═══════════════════════════════════════════════════════════════ */
/*  Main example component                                        */
/* ═══════════════════════════════════════════════════════════════ */
export default function CalendarExample() {
  const [activeTab, setActiveTab] = useState<Tab>("schedule");

  return (
    <div className="space-y-6 font-sans">
      {/* Tab switcher */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
              activeTab === tab.key
                ? "bg-card shadow-sm text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      {activeTab === "schedule" && <SchedulePanel />}
      {activeTab === "range"    && <RangePanel />}
      {activeTab === "events"   && <EventsPanel />}
    </div>
  );
}

/* ─── 1. Schedule (single date + time slots) ─────────────────── */
function SchedulePanel() {
  const [date, setDate] = useState<Date | undefined>(TODAY);
  const [time, setTime] = useState("1100");

  const selectedSlot = TIME_SLOTS.find((s) => s.id === time);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-0 rounded-2xl border border-border overflow-hidden bg-card">
      {/* Calendar */}
      <div className="border-b lg:border-b-0 lg:border-r border-border">
        <div className="px-5 pt-5 pb-0">
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            Select date
          </p>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={TODAY}
          disabled={[{ before: TODAY }]}
        />
      </div>

      {/* Right panel */}
      <div className="flex flex-col p-6 gap-5">
        {/* Selected date header */}
        <div className="flex items-start gap-3">
          <div className="size-10 rounded-xl bg-dp-100 flex items-center justify-center shrink-0">
            <CalendarDays className="size-5 text-dp-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Booking for
            </p>
            <p className="text-sm text-foreground">
              {date ? format(date, "EEEE, MMMM d, yyyy") : "No date selected"}
            </p>
          </div>
        </div>

        <div
          className="h-px bg-border"
          role="separator"
          aria-hidden="true"
        />

        {/* Time slots */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
            Available times
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.id}
                disabled={!slot.available}
                onClick={() => setTime(slot.id)}
                className={`px-3 py-2 rounded-xl border text-sm transition-colors cursor-pointer ${
                  !slot.available
                    ? "opacity-35 cursor-not-allowed border-border text-muted-foreground bg-muted/40"
                    : time === slot.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-dp-300 hover:bg-dp-100/50"
                }`}
              >
                <Clock className="size-3 inline mr-1.5 opacity-70" />
                {slot.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="h-px bg-border"
          role="separator"
          aria-hidden="true"
        />

        {/* Meeting details */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <Clock className="size-4 text-mz-blue-500 shrink-0" />
            <span>30 minutes</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <Video className="size-4 text-mz-blue-500 shrink-0" />
            <span>Video call — link sent on confirmation</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <Users className="size-4 text-mz-blue-500 shrink-0" />
            <span>Up to 10 attendees</span>
          </div>
        </div>

        {/* CTA */}
        <button
          disabled={!date || !selectedSlot}
          className={`mt-auto flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm transition-colors cursor-pointer ${
            date && selectedSlot
              ? "bg-primary text-primary-foreground hover:bg-dp-700"
              : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
          }`}
        >
          Confirm booking
          {date && selectedSlot && <ArrowRight className="size-4" />}
        </button>
      </div>
    </div>
  );
}

/* ─── 2. Date Range ────────────────────────────────────────────── */
function RangePanel() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 2, 14),
    to:   new Date(2026, 2, 20),
  });

  const nights =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-0">
        <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Select date range
        </p>
      </div>

      {/* Calendar */}
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        defaultMonth={new Date(2026, 2, 1)}
        numberOfMonths={2}
        disabled={[{ before: TODAY }]}
        className="pb-2"
      />

      {/* Summary bar */}
      <div className="border-t border-border bg-muted/30 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-6">
          {/* From */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-0.5">
              From
            </p>
            <p className="text-sm text-foreground">
              {range?.from ? format(range.from, "d MMM yyyy") : "—"}
            </p>
          </div>

          <ArrowRight className="size-4 text-muted-foreground shrink-0" />

          {/* To */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-0.5">
              To
            </p>
            <p className="text-sm text-foreground">
              {range?.to ? format(range.to, "d MMM yyyy") : "—"}
            </p>
          </div>
        </div>

        {/* Duration chip + action */}
        <div className="flex items-center gap-3">
          {nights > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dp-100 text-dp-500 text-xs">
              <CalendarDays className="size-3" />
              {nights} {nights === 1 ? "day" : "days"} selected
            </span>
          )}
          <button
            disabled={!range?.from || !range?.to}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer ${
              range?.from && range?.to
                ? "bg-primary text-primary-foreground hover:bg-dp-700"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
            }`}
          >
            Apply range
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── 3. Event Calendar ────────────────────────────────────────── */
function EventsPanel() {
  const [selected, setSelected] = useState<Date | undefined>(new Date(2026, 2, 10));

  const eventsForSelected = selected
    ? EVENTS.filter((e) => isSameDay(e.date, selected))
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-0 rounded-2xl border border-border overflow-hidden bg-card">
      {/* Calendar with event dots */}
      <div className="border-b lg:border-b-0 lg:border-r border-border">
        <div className="px-5 pt-5 pb-0 flex items-center justify-between">
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            March 2026
          </p>
          {/* Legend */}
          <div className="flex items-center gap-3">
            {(Object.keys(EVENT_DOT) as EventType[]).map((type) => (
              <span key={type} className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${EVENT_DOT[type]}`} />
                <span className="text-[9px] text-muted-foreground uppercase tracking-wide">
                  {EVENT_LABEL[type]}
                </span>
              </span>
            ))}
          </div>
        </div>

        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          defaultMonth={new Date(2026, 2, 1)}
          classNames={{
            /* make day cells taller to accommodate event dots */
            day: [
              "relative inline-flex items-center justify-center w-9 h-10",
              "rounded-full text-sm font-normal aria-selected:opacity-100 transition-colors cursor-pointer",
              "hover:bg-muted hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              "overflow-visible",
            ].join(" "),
            row: "flex w-full mt-1 mb-1.5",
          }}
          components={{
            DayContent: ({ date }) => (
              <>
                {date.getDate()}
                <EventDots date={date} />
              </>
            ),
          }}
        />
      </div>

      {/* Right: event list */}
      <div className="flex flex-col gap-4 p-6 overflow-y-auto max-h-[420px]">
        {/* Selected day events */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
            {selected ? format(selected, "EEEE, MMMM d") : "Select a date"}
          </p>

          {eventsForSelected.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CalendarDays className="size-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">No events on this day</p>
            </div>
          ) : (
            <div className="space-y-2">
              {eventsForSelected.map((event) => (
                <div
                  key={event.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border ${EVENT_BADGE[event.type]}`}
                >
                  <span
                    className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${EVENT_DOT[event.type]}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{event.title}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      {event.time && (
                        <span className="flex items-center gap-1 text-xs opacity-70">
                          <Clock className="size-3" />
                          {event.time}
                        </span>
                      )}
                      {event.location && (
                        <span className="flex items-center gap-1 text-xs opacity-70">
                          <MapPin className="size-3" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full border ${EVENT_BADGE[event.type]}`}
                  >
                    {EVENT_LABEL[event.type]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-px bg-border" role="separator" aria-hidden="true" />

        {/* All events this month */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
            All March events
          </p>
          <div className="space-y-1">
            {EVENTS.map((event) => (
              <button
                key={event.id}
                onClick={() => setSelected(event.date)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                  selected && isSameDay(event.date, selected)
                    ? "bg-dp-100"
                    : "hover:bg-muted"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${EVENT_DOT[event.type]}`}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-foreground block truncate">
                    {event.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(event.date, "EEE, MMM d")}
                    {event.time && ` · ${event.time}`}
                  </span>
                </div>
                <ChevronRight className="size-3.5 text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}