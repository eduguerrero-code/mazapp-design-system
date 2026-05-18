import { useState } from "react";
import { TaskCard } from "../task-card";
import { TaskList } from "../task-list";

export default function TaskCardExample() {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div className="w-full max-w-3xl space-y-10">
      {/* ── Severity Variants ── */}
      <div className="space-y-3">
        <h3 className="text-sm text-muted-foreground">Severity Variants</h3>
        <div className="grid gap-3">
          <TaskCard
            severity="frozen"
            title="We've updated your contract — please review and sign"
            subtitle="Your account is frozen until this action is taken"
            badgeVariant="act-now"
            onClick={() => setClicked("frozen")}
          />
          <TaskCard
            severity="critical"
            title="We need more information about a document you uploaded"
            subtitle="Due on 30th of August"
            badgeVariant="overdue"
            onClick={() => setClicked("critical")}
          />
          <TaskCard
            severity="warning"
            title="Update Unique Tax Reference (UTR) before 13th of September"
            subtitle="Due on 13th September"
            badgeVariant="days-left"
            badgeLabel="13 DAYS LEFT"
            onClick={() => setClicked("warning")}
          />
          <TaskCard
            severity="info"
            title="Link your bank accounts securely with Open Banking"
            subtitle="Free feature included in your plan"
            onClick={() => setClicked("info")}
          />
        </div>
        {clicked && (
          <p className="text-xs text-muted-foreground">
            Clicked: <code className="bg-muted px-1.5 py-0.5 rounded text-[11px]">{clicked}</code>
          </p>
        )}
      </div>

      {/* ── Badge Variants ── */}
      <div className="space-y-3">
        <h3 className="text-sm text-muted-foreground">Badge Variants</h3>
        <div className="grid gap-3">
          <TaskCard
            severity="frozen"
            title="Act Now badge"
            subtitle="Purple tint with no icon"
            badgeVariant="act-now"
          />
          <TaskCard
            severity="critical"
            title="Overdue badge"
            subtitle="Red tint, signalling missed deadline"
            badgeVariant="overdue"
          />
          <TaskCard
            severity="critical"
            title="Upgrade badge"
            subtitle="Includes a rocket icon"
            badgeVariant="upgrade"
          />
          <TaskCard
            severity="warning"
            title="Days Left badge with custom label"
            subtitle="Neutral tint, accepts any string"
            badgeVariant="days-left"
            badgeLabel="7 DAYS LEFT"
          />
          <TaskCard
            severity="info"
            title="No badge"
            subtitle="Clean card with chevron only"
            badgeVariant="none"
          />
        </div>
      </div>

      {/* ── Timeline Dots ── */}
      <div className="space-y-3">
        <h3 className="text-sm text-muted-foreground">With Timeline Dots</h3>
        <div className="grid gap-3 pr-4">
          <TaskCard
            severity="frozen"
            title="First related task"
            subtitle="Timeline dot visible on the right edge"
            badgeVariant="act-now"
            timelineDot
          />
          <TaskCard
            severity="frozen"
            title="Second related task"
            subtitle="Dots connect tasks visually"
            badgeVariant="act-now"
            timelineDot
          />
          <TaskCard
            severity="warning"
            title="Unrelated task"
            subtitle="No timeline dot"
          />
        </div>
      </div>

      {/* ── Full TaskList Composition ── */}
      <div className="space-y-3">
        <h3 className="text-sm text-muted-foreground">
          TaskList Composition
        </h3>
        <p className="text-xs text-muted-foreground">
          TaskList wraps TaskCards with a header bar featuring back button,
          title, segmented tabs, and a filter icon.
        </p>
        <div className="rounded-xl border border-grey-200 dark:border-border bg-[#F5F6F8] dark:bg-muted/30 p-6">
          <TaskList
            title="My tasks"
            tabs={[{ label: "To do", count: 3 }, { label: "Done" }]}
          >
            <TaskCard
              severity="frozen"
              title="Review and sign updated contract"
              subtitle="Your account is frozen until this action is taken"
              badgeVariant="act-now"
              timelineDot
            />
            <TaskCard
              severity="critical"
              title="Provide additional document information"
              subtitle="Due on 30th of August"
              badgeVariant="overdue"
              timelineDot
            />
            <TaskCard
              severity="info"
              title="Start using Crezco for client payments"
              subtitle="Free feature included in your plan"
            />
          </TaskList>
        </div>
      </div>
    </div>
  );
}
