import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "../ui/input-otp";
import { Label } from "../ui/label";
import { cn } from "../ui/utils";
import { AlertCircle, CheckCircle2, Lock } from "lucide-react";

/* ─────────────────────────────────────────────
   Slot class variants
   Each variant is a complete override so that all
   slots show the correct border/ring regardless of
   focus state.
───────────────────────────────────────────── */

/** Default — purple ring on the active (focused) slot */
const slotBase =
  "!size-12 !rounded-xl !border !border-grey-200 dark:!border-border bg-card text-lg " +
  "first:!rounded-xl last:!rounded-xl " +
  "data-[active=true]:!border-mz-purple-500 data-[active=true]:!ring-[3px] data-[active=true]:!ring-mz-purple-500/25";

/** Error — negative-500 border on every slot; ring on active */
const slotError =
  "!size-12 !rounded-xl !border !border-negative-500 dark:!border-negative-500 " +
  "bg-negative-50/30 dark:bg-negative-500/10 text-lg " +
  "first:!rounded-xl last:!rounded-xl " +
  "data-[active=true]:!border-negative-500 data-[active=true]:!ring-[3px] data-[active=true]:!ring-negative-500/20";

/** Success — positive-500 border on every slot; ring on active */
const slotSuccess =
  "!size-12 !rounded-xl !border !border-positive-500 dark:!border-positive-500 " +
  "bg-positive-50/20 dark:bg-positive-500/10 text-lg " +
  "first:!rounded-xl last:!rounded-xl " +
  "data-[active=true]:!border-positive-500 data-[active=true]:!ring-[3px] data-[active=true]:!ring-positive-500/20";

/** Disabled — base style at reduced opacity */
const slotDisabled = `${slotBase} opacity-50`;

/* ─────────────────────────────────────────────
   Layout helpers
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
  note,
  children,
}: {
  badge: string;
  badgeClassName: string;
  description: string;
  fieldLabel: string;
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

      {/* Right — label + OTP + status note */}
      <div className="flex flex-col gap-1.5">
        <Label>{fieldLabel}</Label>
        {children}
        {note && <div className="mt-0.5">{note}</div>}
      </div>
    </div>
  );
}

/** Inline error / success message — mirrors the Input example pattern */
function StatusNote({
  variant,
  children,
}: {
  variant: "error" | "success";
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-1.5 text-xs",
        variant === "error" ? "text-negative-500" : "text-positive-600 dark:text-positive-400",
      )}
    >
      {variant === "error" ? (
        <AlertCircle className="size-3.5 shrink-0" />
      ) : (
        <CheckCircle2 className="size-3.5 shrink-0" />
      )}
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Shared OTP slot helper
───────────────────────────────────────────── */

function OTPSlots({
  count,
  slotClass,
  disabled,
}: {
  count: number;
  slotClass: string;
  disabled?: boolean;
}) {
  return (
    <InputOTPGroup className="gap-3">
      {Array.from({ length: count }, (_, i) => (
        <InputOTPSlot
          key={i}
          index={i}
          className={slotClass}
          aria-disabled={disabled}
        />
      ))}
    </InputOTPGroup>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export default function InputOTPExample() {
  /* Core state values */
  const [defaultVal, setDefaultVal] = useState("");
  const [filledVal]                 = useState("847291");
  const [errorVal]                  = useState("123456");
  const [successVal]                = useState("847291");

  /* Composition values */
  const [sepVal, setSepVal]         = useState("");
  const [pinVal, setPinVal]         = useState("");

  return (
    <div className="w-full max-w-2xl space-y-5">

      {/* ══ CORE STATES ══════════════════════════════════════ */}
      <StateGroup title="Core States">

        {/* 1 ── Default */}
        <StateRow
          badge="Default"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Empty slots. Purple ring appears on the active slot when the user begins entry."
          fieldLabel="Verification code"
        >
          <InputOTP
            maxLength={6}
            value={defaultVal}
            onChange={setDefaultVal}
            containerClassName="gap-3"
          >
            <OTPSlots count={6} slotClass={slotBase} />
          </InputOTP>
        </StateRow>

        {/* 2 ── Filled */}
        <StateRow
          badge="Filled"
          badgeClassName="bg-mz-blue-50 text-mz-blue-700 border border-mz-blue-200 dark:bg-mz-blue-900/30 dark:text-mz-blue-300 dark:border-mz-blue-700/40"
          description="All slots completed. Border returns to default grey — code is ready to submit."
          fieldLabel="Verification code"
        >
          <InputOTP
            maxLength={6}
            value={filledVal}
            onChange={() => {}}
            containerClassName="gap-3"
          >
            <OTPSlots count={6} slotClass={slotBase} />
          </InputOTP>
        </StateRow>

        {/* 3 ── Error */}
        <StateRow
          badge="Error"
          badgeClassName="bg-negative-50 text-negative-700 border border-negative-200 dark:bg-negative-700/20 dark:text-negative-400 dark:border-negative-500/30"
          description="Incorrect code entered. All slot borders switch to negative-500 red with a matching ring."
          fieldLabel="Verification code"
          note={
            <StatusNote variant="error">
              Invalid code. Please check and try again.
            </StatusNote>
          }
        >
          <InputOTP
            maxLength={6}
            value={errorVal}
            onChange={() => {}}
            containerClassName="gap-3"
          >
            <OTPSlots count={6} slotClass={slotError} />
          </InputOTP>
        </StateRow>

        {/* 4 ── Success */}
        <StateRow
          badge="Success"
          badgeClassName="bg-positive-50 text-positive-700 border border-positive-200 dark:bg-positive-700/20 dark:text-positive-400 dark:border-positive-500/30"
          description="Code accepted. All slot borders switch to positive-500 green — identity confirmed."
          fieldLabel="Verification code"
          note={
            <StatusNote variant="success">
              Code verified successfully. Continuing…
            </StatusNote>
          }
        >
          <InputOTP
            maxLength={6}
            value={successVal}
            onChange={() => {}}
            containerClassName="gap-3"
          >
            <OTPSlots count={6} slotClass={slotSuccess} />
          </InputOTP>
        </StateRow>

        {/* 5 ── Disabled */}
        <StateRow
          badge="Disabled"
          badgeClassName="bg-grey-100 text-grey-500 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Non-interactive — rendered while a resend timer is active or the step is locked."
          fieldLabel="Verification code"
          note={
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="size-3.5 shrink-0" />
              Request a new code to continue.
            </span>
          }
        >
          <InputOTP
            maxLength={6}
            value=""
            onChange={() => {}}
            disabled
            containerClassName="gap-3"
          >
            <OTPSlots count={6} slotClass={slotDisabled} disabled />
          </InputOTP>
        </StateRow>

      </StateGroup>

      {/* ══ COMPOSITIONS ════════════════════════════════════ */}
      <StateGroup title="Compositions">

        {/* With separator */}
        <StateRow
          badge="Separator"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Two groups of three split by a dash — common for backup codes and licence keys."
          fieldLabel="Backup code"
        >
          <InputOTP
            maxLength={6}
            value={sepVal}
            onChange={setSepVal}
            containerClassName="gap-2"
          >
            <InputOTPGroup className="gap-3">
              {[0, 1, 2].map((i) => (
                <InputOTPSlot key={i} index={i} className={slotBase} />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className="gap-3">
              {[3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} className={slotBase} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </StateRow>

        {/* 4-digit PIN */}
        <StateRow
          badge="4-digit PIN"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Shorter code length — used for card CVC, PIN entry, or any numeric passcode."
          fieldLabel="PIN"
        >
          <InputOTP
            maxLength={4}
            value={pinVal}
            onChange={setPinVal}
            containerClassName="gap-3"
          >
            <OTPSlots count={4} slotClass={slotBase} />
          </InputOTP>
        </StateRow>

      </StateGroup>

    </div>
  );
}
