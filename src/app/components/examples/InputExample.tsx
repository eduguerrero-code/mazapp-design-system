import { useState } from "react";
import { Input } from "../ui/input";
import { Label, LabelHint } from "../ui/label";
import { cn } from "../ui/utils";
import {
  Check,
  Lock,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Internal helpers
───────────────────────────────────────────── */

/** Pill badge that marks each state */
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

/** Input wrapper that overlays a trailing icon */
function InputWithTrailingIcon({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
        {icon}
      </span>
    </div>
  );
}

/** Row shared layout: [badge + description] | [label + field + note] */
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

      {/* Right — label + input + note */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`input-${badge.toLowerCase().replace(/\s+/g, "-")}`}>
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

/** Section card: groups a set of StateRows under a titled header */
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
export default function InputExample() {
  const [showPassword, setShowPassword] = useState(false);
  const [filledValue, setFilledValue] = useState("Laura Miller");

  return (
    <div className="w-full max-w-2xl space-y-5">

      {/* ══ CORE STATES ══════════════════════════════════════ */}
      <StateGroup title="Core States">

        {/* 1 ── Default */}
        <StateRow
          badge="Default"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Transparent fill. Greyed placeholder awaiting input."
          fieldLabel="Account holder name"
        >
          <Input
            id="input-default"
            placeholder="Please enter"
          />
        </StateRow>

        {/* 2 ── Focus */}
        <StateRow
          badge="Focus"
          badgeClassName="bg-dp-100 text-dp-500 border border-dp-300/30 dark:bg-dp-700/30 dark:text-dp-300 dark:border-dp-500/30"
          description="Active field. Purple ring communicates keyboard / pointer focus."
          fieldLabel="Email address"
        >
          {/* Simulate the focus ring by applying the classes directly */}
          <Input
            id="input-focus"
            placeholder="hello@mazapp.co.uk"
            className="border-mz-purple-500 ring-[3px] ring-mz-purple-500/20"
          />
        </StateRow>

        {/* 3 ── Filled */}
        <StateRow
          badge="Filled"
          badgeClassName="bg-foreground/[0.06] text-foreground border border-foreground/[0.12] dark:bg-foreground/10 dark:border-foreground/20"
          description="User has entered text. Charcoal (#121212) foreground."
          fieldLabel="Full name"
        >
          <Input
            id="input-filled"
            value={filledValue}
            onChange={(e) => setFilledValue(e.target.value)}
          />
        </StateRow>

        {/* 4 ── Error */}
        <StateRow
          badge="Error"
          badgeClassName="bg-negative-50 text-negative-700 border border-negative-500/30 dark:bg-negative-500/10 dark:text-negative-500 dark:border-negative-500/30"
          description="Validation failed. Red border + ring draws attention to the issue."
          fieldLabel="Email address"
          note={
            <p className="flex items-center gap-1.5 text-xs text-negative-700 dark:text-negative-500">
              <AlertCircle className="size-3.5 shrink-0" />
              Please enter a valid email address
            </p>
          }
        >
          <InputWithTrailingIcon
            icon={<AlertCircle className="size-4 text-negative-500" />}
          >
            <Input
              id="input-error"
              defaultValue="not-valid@"
              aria-invalid
              className="pr-10"
            />
          </InputWithTrailingIcon>
        </StateRow>

        {/* 5 ── Disabled */}
        <StateRow
          badge="Disabled"
          badgeClassName="bg-muted text-muted-foreground border border-border"
          description="Field is unavailable. Opacity reduced; pointer events blocked."
          fieldLabel="Account number"
          note={
            <p className="text-xs text-muted-foreground">
              This field is currently unavailable
            </p>
          }
        >
          <Input
            id="input-disabled"
            placeholder="Not available"
            disabled
          />
        </StateRow>

        {/* 6 ── Read-only */}
        <StateRow
          badge="Read-only"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Value is shown but cannot be edited. Muted fill signals non-interactivity."
          fieldLabel="Sort code"
          labelHint="Cannot be changed"
        >
          <InputWithTrailingIcon
            icon={<Lock className="size-3.5 text-muted-foreground" />}
          >
            <Input
              id="input-readonly"
              defaultValue="04 - 00 - 04"
              readOnly
              className="pr-10 text-muted-foreground"
            />
          </InputWithTrailingIcon>
        </StateRow>

      </StateGroup>

      {/* ══ OPTIONAL STATES ══════════════════════════════════ */}
      <StateGroup title="Optional States">

        {/* 7 ── Success */}
        <StateRow
          badge="Success"
          badgeClassName="bg-positive-50 text-positive-700 border border-positive-500/30 dark:bg-positive-500/10 dark:text-positive-500 dark:border-positive-500/30"
          description="Real-time validation passed. Green border + check icon confirms the value."
          fieldLabel="UTR number"
          note={
            <p className="flex items-center gap-1.5 text-xs text-positive-700 dark:text-positive-500">
              <CheckCircle2 className="size-3.5 shrink-0" />
              UTR verified successfully
            </p>
          }
        >
          <InputWithTrailingIcon
            icon={<Check className="size-4 text-positive-500" />}
          >
            <Input
              id="input-success"
              defaultValue="1234567890"
              className="border-positive-500 ring-[3px] ring-positive-500/20 pr-10"
            />
          </InputWithTrailingIcon>
        </StateRow>

        {/* 8 ── Loading */}
        <StateRow
          badge="Loading"
          badgeClassName="bg-mz-blue-50 text-mz-blue-700 border border-mz-blue-300/30 dark:bg-mz-blue-700/20 dark:text-mz-blue-300 dark:border-mz-blue-500/30"
          description="Async validation in progress. Spinner communicates background activity."
          fieldLabel="Company registration number"
          note={
            <p className="text-xs text-muted-foreground">
              Checking against Companies House…
            </p>
          }
        >
          <InputWithTrailingIcon
            icon={
              <Loader2 className="size-4 text-mz-blue-500 animate-spin" />
            }
          >
            <Input
              id="input-loading"
              defaultValue="12345678"
              className="border-mz-blue-300 ring-[3px] ring-mz-blue-300/20 pr-10"
              readOnly
            />
          </InputWithTrailingIcon>
        </StateRow>

        {/* 9 ── Complete */}
        <StateRow
          badge="Complete"
          badgeClassName="bg-positive-50 text-positive-700 border border-positive-500/30 dark:bg-positive-500/10 dark:text-positive-500 dark:border-positive-500/30"
          description="Field accepted and locked after submission. Light positive tint + lock icon."
          fieldLabel="National Insurance number"
          note={
            <p className="flex items-center gap-1.5 text-xs text-positive-700 dark:text-positive-500">
              <CheckCircle2 className="size-3.5 shrink-0" />
              Accepted — this field is now locked
            </p>
          }
        >
          <InputWithTrailingIcon
            icon={<Lock className="size-4 text-positive-600 dark:text-positive-500" />}
          >
            <Input
              id="input-complete"
              defaultValue="AB 12 34 56 C"
              readOnly
              className="border-positive-500 ring-[3px] ring-positive-500/20 bg-positive-50/60 dark:bg-positive-500/10 text-foreground pr-10 read-only:bg-positive-50/60 dark:read-only:bg-positive-500/10"
            />
          </InputWithTrailingIcon>
        </StateRow>

      </StateGroup>

      {/* ══ COMPOSITION EXAMPLES ═════════════════════════════ */}
      <StateGroup title="Common Compositions">

        {/* Password */}
        <StateRow
          badge="Password"
          badgeClassName="bg-dp-100 text-dp-500 border border-dp-300/30 dark:bg-dp-700/30 dark:text-dp-300 dark:border-dp-500/30"
          description="Sensitive input with show/hide toggle for user convenience."
          fieldLabel="Password"
        >
          <InputWithTrailingIcon
            icon={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors pointer-events-auto"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            }
          >
            <Input
              id="input-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pr-10"
            />
          </InputWithTrailingIcon>
        </StateRow>

        {/* Side-by-side */}
        <div className="px-5 py-4">
          <div className="grid grid-cols-[192px_1fr] items-start gap-6">
            <div className="flex flex-col gap-2 pt-[26px]">
              <StateBadge className="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border">
                Two-up
              </StateBadge>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Side-by-side fields for related values.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="input-sort">Sort code</Label>
                <Input id="input-sort" placeholder="00 - 00 - 00" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="input-account">Account number</Label>
                <Input id="input-account" placeholder="8-digit number" />
              </div>
            </div>
          </div>
        </div>

        {/* With hint */}
        <StateRow
          badge="With hint"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="LabelHint provides secondary context without cluttering the label."
          fieldLabel="SWIFT / BIC"
          labelHint="International payments only"
        >
          <Input id="input-hint" placeholder="e.g. NWBKGB2L" />
        </StateRow>

      </StateGroup>

    </div>
  );
}