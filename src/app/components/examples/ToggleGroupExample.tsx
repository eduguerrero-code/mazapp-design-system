import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { cn } from "../ui/utils";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  LayoutGrid,
  Table,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Internal helpers
───────────────────────────────────────────── */

function StateBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-[3px] text-[10px] tracking-wide uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

function StateRow({
  badge,
  badgeClassName,
  description,
  children,
}: {
  badge: string;
  badgeClassName: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[192px_1fr] items-start gap-6 px-5 py-4">
      <div className="flex flex-col gap-2 pt-1">
        <StateBadge className={badgeClassName}>{badge}</StateBadge>
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-0.5">{children}</div>
    </div>
  );
}

function StateGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="border-b border-border bg-muted/30 px-5 py-3">
        <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
      </div>
      <div className="divide-y divide-border">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function ToggleGroupExample() {
  const [formatting, setFormatting] = useState<string[]>(["bold"]);
  const [align, setAlign] = useState("left");
  const [view, setView] = useState("list");

  return (
    <div className="w-full max-w-2xl space-y-5">

      {/* ══ SELECTION TYPES ══════════════════════════════════ */}
      <StateGroup title="Selection Types">

        {/* Single (mutually exclusive) */}
        <StateRow
          badge="Single"
          badgeClassName="bg-dp-100 text-dp-500 border border-dp-300/30 dark:bg-dp-700/30 dark:text-dp-300 dark:border-dp-500/30"
          description="type=\"single\" — only one item can be active at a time. Selecting a new item deactivates the previous selection."
        >
          <div className="flex flex-col gap-2">
            <ToggleGroup
              type="single"
              value={align}
              onValueChange={(v) => v && setAlign(v)}
              variant="outline"
            >
              <ToggleGroupItem value="left" aria-label="Align left">
                <AlignLeft />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center">
                <AlignCenter />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right">
                <AlignRight />
              </ToggleGroupItem>
              <ToggleGroupItem value="justify" aria-label="Align justify">
                <AlignJustify />
              </ToggleGroupItem>
            </ToggleGroup>
            <p className="text-[11px] text-muted-foreground">
              Selected: {align}
            </p>
          </div>
        </StateRow>

        {/* Multiple (independent) */}
        <StateRow
          badge="Multiple"
          badgeClassName="bg-dp-100 text-dp-500 border border-dp-300/30 dark:bg-dp-700/30 dark:text-dp-300 dark:border-dp-500/30"
          description="type=\"multiple\" — each item toggles independently. Any number of items can be active simultaneously."
        >
          <div className="flex flex-col gap-2">
            <ToggleGroup
              type="multiple"
              value={formatting}
              onValueChange={setFormatting}
              variant="outline"
            >
              <ToggleGroupItem value="bold" aria-label="Bold">
                <Bold />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <Italic />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <Underline />
              </ToggleGroupItem>
            </ToggleGroup>
            {formatting.length > 0 && (
              <p className="text-[11px] text-muted-foreground">
                Active: {formatting.join(", ")}
              </p>
            )}
          </div>
        </StateRow>

      </StateGroup>

      {/* ══ VARIANTS ═════════════════════════════════════════ */}
      <StateGroup title="Variants">

        {/* Default variant */}
        <StateRow
          badge="Default"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="No border at rest. Hover shows muted fill; active items use purple-50 background."
        >
          <ToggleGroup type="single" defaultValue="bold">
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold /> Bold
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic /> Italic
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline /> Underline
            </ToggleGroupItem>
          </ToggleGroup>
        </StateRow>

        {/* Outline variant */}
        <StateRow
          badge="Outline"
          badgeClassName="bg-foreground/[0.06] text-foreground border border-foreground/[0.12] dark:bg-foreground/10 dark:border-foreground/20"
          description="grey-200 border at rest. Matches Input height and styling — ideal for toolbars."
        >
          <ToggleGroup type="single" defaultValue="bold" variant="outline">
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold /> Bold
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic /> Italic
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline /> Underline
            </ToggleGroupItem>
          </ToggleGroup>
        </StateRow>

      </StateGroup>

      {/* ══ SIZES ════════════════════════════════════════════ */}
      <StateGroup title="Sizes">

        {/* Small */}
        <StateRow
          badge="Small"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="h-8 — compact toolbars and dense inline controls."
        >
          <ToggleGroup type="single" defaultValue="left" variant="outline" size="sm">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight />
            </ToggleGroupItem>
          </ToggleGroup>
        </StateRow>

        {/* Default */}
        <StateRow
          badge="Default"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="h-9 — standard toolbar height, matches Input default size."
        >
          <ToggleGroup type="single" defaultValue="left" variant="outline" size="default">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight />
            </ToggleGroupItem>
          </ToggleGroup>
        </StateRow>

        {/* Large */}
        <StateRow
          badge="Large"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="h-10 — prominent controls or larger touch targets."
        >
          <ToggleGroup type="single" defaultValue="left" variant="outline" size="lg">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight />
            </ToggleGroupItem>
          </ToggleGroup>
        </StateRow>

      </StateGroup>

      {/* ══ USE CASES ════════════════════════════════════════ */}
      <StateGroup title="Common Use Cases">

        {/* Formatting toolbar */}
        <StateRow
          badge="Formatting"
          badgeClassName="bg-mz-blue-50 text-mz-blue-700 border border-mz-blue-300/40 dark:bg-mz-blue-900/40 dark:text-mz-blue-300 dark:border-mz-blue-500/30"
          description="Text formatting toolbar with multiple independent toggles."
        >
          <ToggleGroup
            type="multiple"
            defaultValue={["bold"]}
            variant="outline"
          >
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline />
            </ToggleGroupItem>
          </ToggleGroup>
        </StateRow>

        {/* View switcher */}
        <StateRow
          badge="View Switcher"
          badgeClassName="bg-mz-blue-50 text-mz-blue-700 border border-mz-blue-300/40 dark:bg-mz-blue-900/40 dark:text-mz-blue-300 dark:border-mz-blue-500/30"
          description="Mutually exclusive view mode selection with icon and label."
        >
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(v) => v && setView(v)}
            variant="outline"
          >
            <ToggleGroupItem value="list" aria-label="List view">
              <List /> List
            </ToggleGroupItem>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <LayoutGrid /> Grid
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Table view">
              <Table /> Table
            </ToggleGroupItem>
          </ToggleGroup>
        </StateRow>

        {/* Disabled group */}
        <StateRow
          badge="Disabled"
          badgeClassName="bg-muted text-muted-foreground border border-border"
          description="Entire group disabled — all items non-interactive with reduced opacity."
        >
          <ToggleGroup
            type="single"
            defaultValue="left"
            variant="outline"
            disabled
          >
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight />
            </ToggleGroupItem>
          </ToggleGroup>
        </StateRow>

      </StateGroup>

    </div>
  );
}
