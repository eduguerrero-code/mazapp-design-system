import { useState } from "react";
import { Toggle } from "../ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { cn } from "../ui/utils";
import {
  Bold,
  Italic,
  Underline,
  List,
  LayoutGrid,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bell,
  Star,
  Bookmark,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Internal helpers  (mirror InputExample)
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
      {/* Left — badge + description */}
      <div className="flex flex-col gap-2 pt-1">
        <StateBadge className={badgeClassName}>{badge}</StateBadge>
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Right — toggle content */}
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
export default function ToggleExample() {
  const [formatting, setFormatting] = useState<string[]>(["bold"]);
  const [align, setAlign] = useState("left");
  const [view, setView] = useState("list");

  return (
    <div className="w-full max-w-2xl space-y-5">

      {/* ══ CORE STATES ══════════════════════════════════════ */}
      <StateGroup title="Core States">

        {/* 1 ── Default / Off */}
        <StateRow
          badge="Default"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Resting state. Transparent fill, no active styling."
        >
          <Toggle variant="outline" aria-label="Toggle bold">
            <Bold />
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle italic">
            <Italic />
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle star">
            <Star />
          </Toggle>
        </StateRow>

        {/* 2 ── Pressed / On */}
        <StateRow
          badge="Pressed"
          badgeClassName="bg-mz-purple-50 text-mz-purple-700 border border-mz-purple-300/40 dark:bg-mz-purple-900/40 dark:text-mz-purple-300 dark:border-mz-purple-500/30"
          description="Active / on state. Purple-50 fill, mz-purple-500 border and text."
        >
          <Toggle variant="outline" pressed aria-label="Toggle bold">
            <Bold />
          </Toggle>
          <Toggle variant="outline" pressed aria-label="Toggle italic">
            <Italic />
          </Toggle>
          <Toggle variant="outline" pressed aria-label="Toggle star">
            <Star />
          </Toggle>
        </StateRow>

        {/* 3 ── Disabled / Off */}
        <StateRow
          badge="Disabled"
          badgeClassName="bg-muted text-muted-foreground border border-border"
          description="Unavailable. Opacity reduced; pointer events blocked."
        >
          <Toggle variant="outline" disabled aria-label="Toggle bold">
            <Bold />
          </Toggle>
          <Toggle variant="outline" disabled aria-label="Toggle italic">
            <Italic />
          </Toggle>
          <Toggle variant="outline" disabled aria-label="Toggle star">
            <Star />
          </Toggle>
        </StateRow>

        {/* 4 ── Disabled + On */}
        <StateRow
          badge="Disabled + On"
          badgeClassName="bg-muted text-muted-foreground border border-border"
          description="Locked in the active state — visually on but not interactive."
        >
          <Toggle variant="outline" disabled pressed aria-label="Toggle bold">
            <Bold />
          </Toggle>
          <Toggle variant="outline" disabled pressed aria-label="Toggle bookmark">
            <Bookmark />
          </Toggle>
        </StateRow>

      </StateGroup>

      {/* ══ VARIANTS ═════════════════════════════════════════ */}
      <StateGroup title="Variants">

        {/* Default variant — no border at rest */}
        <StateRow
          badge="Default"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="No border at rest. Hover shows a muted tint; active state uses purple-50."
        >
          <Toggle aria-label="Bold"><Bold /> Bold</Toggle>
          <Toggle aria-label="Italic"><Italic /> Italic</Toggle>
          <Toggle defaultPressed aria-label="Underline"><Underline /> Underline</Toggle>
        </StateRow>

        {/* Outline variant — border at rest */}
        <StateRow
          badge="Outline"
          badgeClassName="bg-foreground/[0.06] text-foreground border border-foreground/[0.12] dark:bg-foreground/10 dark:border-foreground/20"
          description="grey-200 border at rest, hover fills grey-blue-500. Ideal for toolbars alongside Input."
        >
          <Toggle variant="outline" aria-label="Bold"><Bold /> Bold</Toggle>
          <Toggle variant="outline" aria-label="Italic"><Italic /> Italic</Toggle>
          <Toggle variant="outline" defaultPressed aria-label="Underline"><Underline /> Underline</Toggle>
        </StateRow>

      </StateGroup>

      {/* ══ SIZES ════════════════════════════════════════════ */}
      <StateGroup title="Sizes">

        {/* sm */}
        <StateRow
          badge="Small"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="h-8 — compact toolbars and dense inline controls."
        >
          <Toggle variant="outline" size="sm" aria-label="Bold"><Bold /></Toggle>
          <Toggle variant="outline" size="sm" aria-label="Italic"><Italic /></Toggle>
          <Toggle variant="outline" size="sm" defaultPressed aria-label="Underline"><Underline /></Toggle>
        </StateRow>

        {/* default */}
        <StateRow
          badge="Default"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="h-9 — standard toolbar height."
        >
          <Toggle variant="outline" size="default" aria-label="Bold"><Bold /></Toggle>
          <Toggle variant="outline" size="default" aria-label="Italic"><Italic /></Toggle>
          <Toggle variant="outline" size="default" defaultPressed aria-label="Underline"><Underline /></Toggle>
        </StateRow>

        {/* lg */}
        <StateRow
          badge="Large"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="h-10 — prominent actions or larger touch targets."
        >
          <Toggle variant="outline" size="lg" aria-label="Bold"><Bold /></Toggle>
          <Toggle variant="outline" size="lg" aria-label="Italic"><Italic /></Toggle>
          <Toggle variant="outline" size="lg" defaultPressed aria-label="Underline"><Underline /></Toggle>
        </StateRow>

      </StateGroup>

      {/* ══ COMPOSITIONS ═════════════════════════════════════ */}
      <StateGroup title="Compositions">

        {/* ToggleGroup — multiple (formatting) */}
        <StateRow
          badge="Formatting"
          badgeClassName="bg-dp-100 text-dp-500 border border-dp-300/30 dark:bg-dp-700/30 dark:text-dp-300 dark:border-dp-500/30"
          description="ToggleGroup (multiple) — Bold, Italic, Underline can all be active simultaneously."
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

        {/* ToggleGroup — single (alignment) */}
        <StateRow
          badge="Alignment"
          badgeClassName="bg-dp-100 text-dp-500 border border-dp-300/30 dark:bg-dp-700/30 dark:text-dp-300 dark:border-dp-500/30"
          description="ToggleGroup (single) — only one alignment option can be active at a time."
        >
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
          </ToggleGroup>
        </StateRow>

        {/* ToggleGroup — single (view switcher) */}
        <StateRow
          badge="View Switcher"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="ToggleGroup (single) — mutually exclusive view mode selection."
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
          </ToggleGroup>
        </StateRow>

        {/* Standalone with icon + label */}
        <StateRow
          badge="With Label"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Standalone toggle with icon + label text — useful for settings and preference controls."
        >
          <Toggle variant="outline" aria-label="Notifications">
            <Bell /> Notifications
          </Toggle>
          <Toggle variant="outline" defaultPressed aria-label="Starred">
            <Star /> Starred
          </Toggle>
          <Toggle variant="outline" defaultPressed aria-label="Saved">
            <Bookmark /> Saved
          </Toggle>
        </StateRow>

      </StateGroup>

    </div>
  );
}
