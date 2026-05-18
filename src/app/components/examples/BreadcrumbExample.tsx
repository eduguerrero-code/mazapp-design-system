import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "../ui/breadcrumb";
import { cn } from "../ui/utils";
import {
  Home,
  Settings,
  Users,
  FileText,
  FolderOpen,
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

      {/* Right — breadcrumb content */}
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
export default function BreadcrumbExample() {
  return (
    <div className="w-full max-w-2xl space-y-5">

      {/* ══ CORE STATES ══════════════════════════════════════ */}
      <StateGroup title="Core States">

        {/* 1 ── Default */}
        <StateRow
          badge="Default"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Standard breadcrumb with ChevronRight separators. Links are muted; current page is foreground."
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Settings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>General</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </StateRow>

        {/* 2 ── With Icons */}
        <StateRow
          badge="With Icons"
          badgeClassName="bg-dp-100 text-dp-500 border border-dp-300/30 dark:bg-dp-700/30 dark:text-dp-300 dark:border-dp-500/30"
          description="Icons paired with labels improve scanability. Home icon anchors the start."
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="inline-flex items-center gap-1.5">
                  <Home className="size-3.5" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="inline-flex items-center gap-1.5">
                  <Settings className="size-3.5" />
                  Settings
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="inline-flex items-center gap-1.5">
                  <Users className="size-3.5" />
                  Team
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </StateRow>

        {/* 3 ── Single Level */}
        <StateRow
          badge="Single Level"
          badgeClassName="bg-foreground/[0.06] text-foreground border border-foreground/[0.12] dark:bg-foreground/10 dark:border-foreground/20"
          description="Minimal breadcrumb for top-level pages — just the current page, no links."
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </StateRow>

      </StateGroup>

      {/* ══ VARIANTS ═════════════════════════════════════════ */}
      <StateGroup title="Separator Variants">

        {/* ChevronRight (default) */}
        <StateRow
          badge="Chevron"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Default separator — ChevronRight icon at 3.5 size."
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Documents</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Invoices</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>INV-001</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </StateRow>

        {/* Text separator */}
        <StateRow
          badge="Text"
          badgeClassName="bg-foreground/[0.06] text-foreground border border-foreground/[0.12] dark:bg-foreground/10 dark:border-foreground/20"
          description="Plain text separator — use any character or string between items."
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Documents</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <span className="text-muted-foreground">/</span>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Invoices</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <span className="text-muted-foreground">/</span>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>INV-001</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </StateRow>

      </StateGroup>

      {/* ══ COMPOSITIONS ═════════════════════════════════════ */}
      <StateGroup title="Compositions">

        {/* With Ellipsis */}
        <StateRow
          badge="Ellipsis"
          badgeClassName="bg-dp-100 text-dp-500 border border-dp-300/30 dark:bg-dp-700/30 dark:text-dp-300 dark:border-dp-500/30"
          description="Deep hierarchy collapsed with BreadcrumbEllipsis — keeps breadcrumbs compact."
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="inline-flex items-center gap-1.5">
                  <Home className="size-3.5" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Payroll</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Employee Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </StateRow>

        {/* Deep Path */}
        <StateRow
          badge="Deep Path"
          badgeClassName="bg-mz-purple-50 text-mz-purple-700 border border-mz-purple-300/40 dark:bg-mz-purple-900/40 dark:text-mz-purple-300 dark:border-mz-purple-500/30"
          description="Full hierarchy — all levels visible. Wraps naturally on small viewports."
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="inline-flex items-center gap-1.5">
                  <Home className="size-3.5" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="inline-flex items-center gap-1.5">
                  <Settings className="size-3.5" />
                  Settings
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Business Details</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Payroll</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>New Employee</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </StateRow>

        {/* Document Trail */}
        <StateRow
          badge="Doc Trail"
          badgeClassName="bg-mz-blue-50 text-mz-blue-700 border border-mz-blue-300/30 dark:bg-mz-blue-700/20 dark:text-mz-blue-300 dark:border-mz-blue-500/30"
          description="Document management trail with folder and file icons — matches the MazApp OCR document path."
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="inline-flex items-center gap-1.5">
                  <FolderOpen className="size-3.5" />
                  Documents
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="inline-flex items-center gap-1.5">
                  <FolderOpen className="size-3.5" />
                  Sales Invoices
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="inline-flex items-center gap-1.5">
                  <FileText className="size-3.5" />
                  INV-2025-0042.pdf
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </StateRow>

        {/* Icon-only Home */}
        <StateRow
          badge="Icon Home"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Home link as an icon-only anchor — saves horizontal space in compact layouts."
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" aria-label="Home">
                  <Home className="size-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">My Tasks</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Review Contract</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </StateRow>

      </StateGroup>

    </div>
  );
}
