import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CollapsibleSelect } from "../ui/collapsible-select";
import { Label, LabelHint } from "../ui/label";
import { cn } from "../ui/utils";
import {
  AlertCircle,
  CheckCircle2,
  Lock,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Shared layout helpers (mirrors InputExample)
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

function StateRow({
  badge,
  badgeClassName,
  description,
  fieldLabel,
  labelHint,
  note,
  children,
}: {
  badge: string;
  badgeClassName: string;
  description: string;
  fieldLabel: string;
  labelHint?: string;
  note?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[192px_1fr] items-start gap-6 px-5 py-4">
      {/* Left — badge + description */}
      <div className="flex flex-col gap-2 pt-[26px]">
        <StateBadge className={badgeClassName}>{badge}</StateBadge>
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Right — label + trigger + note */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`select-${badge.toLowerCase().replace(/\s+/g, "-")}`}>
          {fieldLabel}
          {labelHint && (
            <LabelHint className="ml-1.5">{labelHint}</LabelHint>
          )}
        </Label>
        {children}
        {note && <div className="mt-0.5">{note}</div>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Shared option sets
───────────────────────────────────────────── */

/** Document category groups — matches the Figma collapsible dropdown spec */
const DOCUMENT_GROUPS = [
  {
    id: "sales",
    label: "Sales",
    options: [
      { value: "sales-invoice", label: "Sales invoice" },
      { value: "sales-refund",  label: "Sales refund" },
    ],
  },
  {
    id: "expenses",
    label: "Expenses",
    options: [
      { value: "receipt",          label: "Receipt" },
      { value: "purchase-invoice", label: "Purchase invoice" },
      { value: "purchase-refund",  label: "Purchase refund" },
    ],
  },
  {
    id: "bank",
    label: "Bank statement",
    options: [
      { value: "current-account",  label: "Current account" },
      { value: "deposit-account",  label: "Deposit account" },
      { value: "credit-card",      label: "Credit Card" },
      { value: "paypal",           label: "PayPal" },
      { value: "petty-cash",       label: "Petty Cash" },
    ],
  },
  {
    id: "other",
    label: "Other",
    options: [
      { value: "hmrc",  label: "HMRC" },
      { value: "other", label: "Other" },
    ],
  },
];

function EmploymentOptions() {
  return (
    <>
      <SelectItem value="full-time">Full-time</SelectItem>
      <SelectItem value="part-time">Part-time</SelectItem>
      <SelectItem value="casual">Casual / Zero hours</SelectItem>
      <SelectItem value="agency">Agency worker</SelectItem>
      <SelectItem value="director">Company director</SelectItem>
    </>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function SelectExample() {
  const [filledValue, setFilledValue] = useState("full-time");
  const [successValue, setSuccessValue] = useState("monthly");
  const [collapsibleValue, setCollapsibleValue] = useState("receipt");

  return (
    <div className="w-full max-w-2xl space-y-5">

      {/* ══ CORE STATES ══════════════════════════════════════ */}
      <StateGroup title="Core States">

        {/* 1 ── Default */}
        <StateRow
          badge="Default"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Transparent fill. Grey placeholder awaiting selection."
          fieldLabel="Employment type"
        >
          <Select>
            <SelectTrigger id="select-default">
              <SelectValue placeholder="Please select" />
            </SelectTrigger>
            <SelectContent>
              <EmploymentOptions />
            </SelectContent>
          </Select>
        </StateRow>

        {/* 2 ── Focus */}
        <StateRow
          badge="Focus"
          badgeClassName="bg-dp-100 text-dp-500 border border-dp-300/30 dark:bg-dp-700/30 dark:text-dp-300 dark:border-dp-500/30"
          description="Active trigger. Purple ring communicates keyboard / pointer focus."
          fieldLabel="Pay frequency"
        >
          {/* Simulate focus ring — same technique as InputExample */}
          <Select>
            <SelectTrigger
              id="select-focus"
              className="border-mz-purple-500 ring-[3px] ring-mz-purple-500/20"
            >
              <SelectValue placeholder="Please select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="fortnightly">Fortnightly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </StateRow>

        {/* 3 ── Filled */}
        <StateRow
          badge="Filled"
          badgeClassName="bg-foreground/[0.06] text-foreground border border-foreground/[0.12] dark:bg-foreground/10 dark:border-foreground/20"
          description="A value has been selected. Charcoal foreground text."
          fieldLabel="Employment type"
        >
          <Select value={filledValue} onValueChange={setFilledValue}>
            <SelectTrigger id="select-filled">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <EmploymentOptions />
            </SelectContent>
          </Select>
        </StateRow>

        {/* 4 ── Error */}
        <StateRow
          badge="Error"
          badgeClassName="bg-negative-50 text-negative-700 border border-negative-500/30 dark:bg-negative-500/10 dark:text-negative-500 dark:border-negative-500/30"
          description="Validation failed. Red border + ring draws attention to the field."
          fieldLabel="Document type"
          note={
            <p className="flex items-center gap-1.5 text-xs text-negative-700 dark:text-negative-500">
              <AlertCircle className="size-3.5 shrink-0" />
              Please select a document type to continue
            </p>
          }
        >
          <Select>
            <SelectTrigger id="select-error" aria-invalid>
              <SelectValue placeholder="Please select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="invoice">Invoice</SelectItem>
              <SelectItem value="receipt">Receipt</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>
        </StateRow>

        {/* 5 ── Disabled */}
        <StateRow
          badge="Disabled"
          badgeClassName="bg-muted text-muted-foreground border border-border"
          description="Field is unavailable. Opacity reduced; interaction blocked."
          fieldLabel="Currency"
          note={
            <p className="text-xs text-muted-foreground">
              Currency is fixed for this account type
            </p>
          }
        >
          <Select disabled>
            <SelectTrigger id="select-disabled">
              <SelectValue placeholder="Not available" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gbp">GBP — British Pound</SelectItem>
            </SelectContent>
          </Select>
        </StateRow>

        {/* 6 ── Read-only */}
        <StateRow
          badge="Read-only"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Value shown but cannot be changed. Muted fill + lock signals non-interactivity."
          fieldLabel="Account currency"
          labelHint="Cannot be changed"
        >
          {/* Select has no native readOnly — simulate with pointer-events-none + muted bg */}
          <div className="relative">
            <Select value="gbp">
              <SelectTrigger
                id="select-readonly"
                className="pointer-events-none bg-muted/40 cursor-default text-muted-foreground pr-10"
                tabIndex={-1}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gbp">GBP — British Pound</SelectItem>
              </SelectContent>
            </Select>
            <span className="pointer-events-none absolute right-9 top-1/2 -translate-y-1/2">
              <Lock className="size-3.5 text-muted-foreground" />
            </span>
          </div>
        </StateRow>

      </StateGroup>

      {/* ══ OPTIONAL STATES ══════════════════════════════════ */}
      <StateGroup title="Optional States">

        {/* 7 ── Success */}
        <StateRow
          badge="Success"
          badgeClassName="bg-positive-50 text-positive-700 border border-positive-500/30 dark:bg-positive-500/10 dark:text-positive-500 dark:border-positive-500/30"
          description="Selection validated. Green border + confirmation message."
          fieldLabel="Pay frequency"
          note={
            <p className="flex items-center gap-1.5 text-xs text-positive-700 dark:text-positive-500">
              <CheckCircle2 className="size-3.5 shrink-0" />
              Pay frequency confirmed
            </p>
          }
        >
          <Select value={successValue} onValueChange={setSuccessValue}>
            <SelectTrigger
              id="select-success"
              className="border-positive-500 ring-[3px] ring-positive-500/20"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="fortnightly">Fortnightly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </StateRow>

      </StateGroup>

      {/* ══ COMMON COMPOSITIONS ══════════════════════════════ */}
      <StateGroup title="Common Compositions">

        {/* Side-by-side */}
        <div className="px-5 py-4">
          <div className="grid grid-cols-[192px_1fr] items-start gap-6">
            <div className="flex flex-col gap-2 pt-[26px]">
              <StateBadge className="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border">
                Two-up
              </StateBadge>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Side-by-side selects for related fields.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="select-pay-type">Pay type</Label>
                <Select>
                  <SelectTrigger id="select-pay-type">
                    <SelectValue placeholder="Please select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salary">Annual salary</SelectItem>
                    <SelectItem value="hourly">Hourly rate</SelectItem>
                    <SelectItem value="daily">Daily rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="select-pay-freq">Frequency</Label>
                <Select>
                  <SelectTrigger id="select-pay-freq">
                    <SelectValue placeholder="Please select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="fortnightly">Fortnightly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* With label hint */}
        <StateRow
          badge="With hint"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="LabelHint provides secondary context without cluttering the label."
          fieldLabel="Tax code"
          labelHint="Leave blank to use 1257L"
        >
          <Select>
            <SelectTrigger id="select-hint">
              <SelectValue placeholder="Please select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1257l">1257L — Standard personal allowance</SelectItem>
              <SelectItem value="br">BR — Basic rate, no personal allowance</SelectItem>
              <SelectItem value="d0">D0 — Higher rate, no personal allowance</SelectItem>
              <SelectItem value="nt">NT — No tax</SelectItem>
            </SelectContent>
          </Select>
        </StateRow>

        {/* Grouped options — CollapsibleSelect */}
        <StateRow
          badge="Collapsible"
          badgeClassName="bg-dp-100 text-dp-500 border border-dp-300/30 dark:bg-dp-700/30 dark:text-dp-300 dark:border-dp-500/30"
          description="CollapsibleSelect — groups expand and collapse. Selected item uses dp-100 highlight, matching the Figma spec."
          fieldLabel="Document category"
        >
          <CollapsibleSelect
            groups={DOCUMENT_GROUPS}
            value={collapsibleValue}
            onValueChange={setCollapsibleValue}
            placeholder="Please select"
          />
        </StateRow>

      </StateGroup>

    </div>
  );
}