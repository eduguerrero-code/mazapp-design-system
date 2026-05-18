import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Receipt,
  CreditCard,
  Wallet,
  Building2,
  Coins,
  Trash2,
  Pencil,
  Copy,
  Share2,
  MoreVertical,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Mail,
  MessageSquare,
  PlusCircle,
  UserPlus,
  Cloud,
  LifeBuoy,
  Keyboard,
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
        "inline-flex items-center rounded-full px-2.5 py-[3px] text-[10px] tracking-wide uppercase font-sans",
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
        <p className="text-[11px] leading-relaxed text-muted-foreground font-sans">
          {description}
        </p>
      </div>

      {/* Right — dropdown content */}
      <div className="flex flex-wrap items-start gap-3 pt-0.5">{children}</div>
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
        <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground font-sans">
          {title}
        </p>
      </div>
      <div className="divide-y divide-border">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Label with line — matches Figma design
   (purple text + horizontal rule extending right)
───────────────────────────────────────────── */
function LabelWithLine({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenuLabel className="flex items-center gap-2.5">
      <span className="shrink-0 font-sans">{children}</span>
      <span className="h-px flex-1 bg-border" />
    </DropdownMenuLabel>
  );
}

/* ─────────────────────────────────────────────
   Collapsible label with line + chevron
   Purple text → horizontal rule → chevron toggle.
   Clicking the label row expands / collapses the
   children (menu items) beneath it.
───────────────────────────────────────────── */
function CollapsibleGroup({
  label,
  children,
  defaultOpen = true,
}: {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <DropdownMenuGroup>
      {/* Clickable label header */}
      <DropdownMenuLabel
        className="flex items-center gap-2.5 cursor-pointer select-none"
        onClick={(e) => {
          e.preventDefault();
          setOpen((prev) => !prev);
        }}
      >
        <span className="shrink-0 font-sans">{label}</span>
        <span className="h-px flex-1 bg-border" />
        <ChevronRight
          className={cn(
            "size-3.5 shrink-0 text-dp-500 transition-transform duration-200",
            open && "rotate-90",
          )}
        />
      </DropdownMenuLabel>

      {/* Collapsible items */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </DropdownMenuGroup>
  );
}

/* ─────────────────────────────────────────────
   Main component
──────────────────────────────────────────── */
export default function DropdownMenuExample() {
  const [checkboxA, setCheckboxA] = useState(true);
  const [checkboxB, setCheckboxB] = useState(false);
  const [checkboxC, setCheckboxC] = useState(false);
  const [radioValue, setRadioValue] = useState("receipt");

  return (
    <div className="w-full max-w-2xl space-y-5">

      {/* ══ CORE STATES ══════════════════════════════════════ */}
      <StateGroup title="Core States">

        {/* 1 ── Grouped (Figma reference) */}
        <StateRow
          badge="Collapsible"
          badgeClassName="bg-dp-100 text-dp-500 border border-dp-300/30 dark:bg-dp-700/30 dark:text-dp-300 dark:border-dp-500/30"
          description="Collapsible section headers — click the label row or chevron to expand/collapse items beneath each group. Chevron rotates to indicate state."
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 font-sans">
                Document type <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              <CollapsibleGroup label="Sales">
                <DropdownMenuItem>Sales invoice</DropdownMenuItem>
                <DropdownMenuItem>Sales refund</DropdownMenuItem>
              </CollapsibleGroup>
              <CollapsibleGroup label="Expenses">
                <DropdownMenuItem>Receipt</DropdownMenuItem>
                <DropdownMenuItem>Purchase invoice</DropdownMenuItem>
                <DropdownMenuItem>Purchase refund</DropdownMenuItem>
              </CollapsibleGroup>
              <CollapsibleGroup label="Bank statement" defaultOpen={false}>
                <DropdownMenuItem>Current account</DropdownMenuItem>
                <DropdownMenuItem>Deposit account</DropdownMenuItem>
                <DropdownMenuItem>Credit Card</DropdownMenuItem>
                <DropdownMenuItem>PayPal</DropdownMenuItem>
                <DropdownMenuItem>Petty Cash</DropdownMenuItem>
              </CollapsibleGroup>
              <CollapsibleGroup label="Other" defaultOpen={false}>
                <DropdownMenuItem>HMRC</DropdownMenuItem>
                <DropdownMenuItem>Other</DropdownMenuItem>
              </CollapsibleGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </StateRow>

        {/* 2 ── Grouped (static, non-collapsible) */}
        <StateRow
          badge="Grouped"
          badgeClassName="bg-mz-purple-50 text-mz-purple-700 border border-mz-purple-300/40 dark:bg-mz-purple-900/40 dark:text-mz-purple-300 dark:border-mz-purple-500/30"
          description="Static grouped items with purple section labels and a horizontal rule — non-collapsible variant for simpler menus."
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 font-sans">
                Document type <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              <DropdownMenuGroup>
                <LabelWithLine>Sales</LabelWithLine>
                <DropdownMenuItem>Sales invoice</DropdownMenuItem>
                <DropdownMenuItem>Sales refund</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <LabelWithLine>Expenses</LabelWithLine>
                <DropdownMenuItem>Receipt</DropdownMenuItem>
                <DropdownMenuItem>Purchase invoice</DropdownMenuItem>
                <DropdownMenuItem>Purchase refund</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <LabelWithLine>Other</LabelWithLine>
                <DropdownMenuItem>HMRC</DropdownMenuItem>
                <DropdownMenuItem>Other</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </StateRow>

        {/* 3 ── Default */}
        <StateRow
          badge="Default"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Standard dropdown with simple items — focus highlights in mz-purple-50, text stays foreground."
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 font-sans">
                Actions <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem>
                <Pencil className="size-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="size-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="size-4" /> Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 className="size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </StateRow>

        {/* 4 ── With Shortcuts */}
        <StateRow
          badge="With Shortcuts"
          badgeClassName="bg-mz-blue-50 text-mz-blue-700 border border-mz-blue-300/30 dark:bg-mz-blue-700/20 dark:text-mz-blue-300 dark:border-mz-blue-500/30"
          description="Items paired with keyboard shortcut hints — right-aligned in muted-foreground for power users."
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 font-sans">
                Edit <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuItem>
                <Pencil className="size-4" /> Edit
                <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="size-4" /> Duplicate
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="size-4" /> Share
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 className="size-4" /> Delete
                <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </StateRow>

        {/* 5 ── Disabled Items */}
        <StateRow
          badge="Disabled"
          badgeClassName="bg-foreground/[0.06] text-foreground border border-foreground/[0.12] dark:bg-foreground/10 dark:border-foreground/20"
          description="Individual items can be disabled — opacity-50 and pointer-events blocked. Useful for permission-gated actions."
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 font-sans">
                Manage <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem>
                <Pencil className="size-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="size-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Share2 className="size-4" /> Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled variant="destructive">
                <Trash2 className="size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </StateRow>

      </StateGroup>

      {/* ══ VARIANTS ═════════════════════════════════════════ */}
      <StateGroup title="Variants">

        {/* Checkbox Items */}
        <StateRow
          badge="Checkbox"
          badgeClassName="bg-mz-purple-50 text-mz-purple-700 border border-mz-purple-300/40 dark:bg-mz-purple-900/40 dark:text-mz-purple-300 dark:border-mz-purple-500/30"
          description="Multi-select with checkbox indicators — each item toggles independently. Uses CheckboxItem sub-component."
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 font-sans">
                Columns <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={checkboxA}
                onCheckedChange={setCheckboxA}
              >
                Document date
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={checkboxB}
                onCheckedChange={setCheckboxB}
              >
                Description
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={checkboxC}
                onCheckedChange={setCheckboxC}
              >
                OCR status
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </StateRow>

        {/* Radio Items */}
        <StateRow
          badge="Radio"
          badgeClassName="bg-dp-100 text-dp-500 border border-dp-300/30 dark:bg-dp-700/30 dark:text-dp-300 dark:border-dp-500/30"
          description="Single-select with radio indicators — mutually exclusive. Uses RadioGroup + RadioItem sub-components."
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 font-sans">
                Sort by <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Sort order</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={radioValue}
                onValueChange={setRadioValue}
              >
                <DropdownMenuRadioItem value="date">
                  Date uploaded
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="receipt">
                  Document type
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name">
                  Name (A–Z)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="amount">
                  Amount
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </StateRow>

        {/* Sub-menu */}
        <StateRow
          badge="Sub-menu"
          badgeClassName="bg-mz-blue-50 text-mz-blue-700 border border-mz-blue-300/30 dark:bg-mz-blue-700/20 dark:text-mz-blue-300 dark:border-mz-blue-500/30"
          description="Nested sub-menus via DropdownMenuSub — hover or keyboard-right to reveal the child content panel."
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 font-sans">
                Options <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuItem>
                <User className="size-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className="size-4 mr-2" /> Invite users
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail className="size-4" /> Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="size-4" /> Message
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle className="size-4" /> More…
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="size-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </StateRow>

      </StateGroup>

      {/* ══ COMPOSITIONS ═════════════════════════════════════ */}
      <StateGroup title="Compositions">

        {/* Icon-only trigger */}
        <StateRow
          badge="Icon Trigger"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Icon-only kebab trigger — common in table rows and card headers for overflow actions."
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuItem>
                <Pencil className="size-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="size-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="size-4" /> Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 className="size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </StateRow>

        {/* Account menu */}
        <StateRow
          badge="Account Menu"
          badgeClassName="bg-mz-purple-50 text-mz-purple-700 border border-mz-purple-300/40 dark:bg-mz-purple-900/40 dark:text-mz-purple-300 dark:border-mz-purple-500/30"
          description="Full account/profile dropdown — label + groups + separator + shortcuts. A common header-bar pattern."
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 font-sans">
                <div className="flex size-6 items-center justify-center rounded-full bg-dp-500 text-primary-foreground font-sans" style={{ fontSize: "10px" }}>
                  LM
                </div>
                Laura Miller
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-sans">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-foreground">Laura Miller</span>
                  <span className="text-xs text-muted-foreground">laura@mazapp.co.uk</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="size-4" /> Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="size-4" /> Settings
                  <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Keyboard className="size-4" /> Shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Cloud className="size-4" /> API
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy className="size-4" /> Support
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="size-4" /> Help centre
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="size-4" /> Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </StateRow>

        {/* Destructive confirmation */}
        <StateRow
          badge="Destructive"
          badgeClassName="bg-negative-50 text-negative-700 border border-negative-500/20 dark:bg-negative-700/20 dark:text-negative-500 dark:border-negative-500/30"
          description="Destructive variant items use text-destructive with a red-tinted focus background for dangerous actions."
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 font-sans">
                Danger zone <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuItem>
                <Pencil className="size-4" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="size-4" /> Transfer ownership
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 className="size-4" /> Delete document
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <LogOut className="size-4" /> Revoke access
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </StateRow>

      </StateGroup>

    </div>
  );
}