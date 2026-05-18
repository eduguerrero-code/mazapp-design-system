import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../ui/pagination";
import { cn } from "../ui/utils";

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

      {/* Right — pagination content */}
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
        <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground font-sans">
          {title}
        </p>
      </div>
      <div className="divide-y divide-border">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Interactive pagination helper
───────────────────────────────────────────── */

function InteractivePagination({ totalPages }: { totalPages: number }) {
  const [current, setCurrent] = useState(1);

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push("ellipsis");
      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrent((p) => Math.max(1, p - 1));
            }}
            className={cn(current === 1 && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
        {getPageNumbers().map((page, idx) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === current}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrent(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrent((p) => Math.min(totalPages, p + 1));
            }}
            className={cn(
              current === totalPages && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function PaginationExample() {
  return (
    <div className="w-full max-w-2xl space-y-5">

      {/* ══ CORE STATES ══════════════════════════════════════ */}
      <StateGroup title="Core States">

        {/* 1 ── Default */}
        <StateRow
          badge="Default"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Standard pagination with Previous/Next and numbered pages. Active page uses the outline variant."
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </StateRow>

        {/* 2 ── With Ellipsis */}
        <StateRow
          badge="With Ellipsis"
          badgeClassName="bg-dp-100 text-dp-500 border border-dp-300/30 dark:bg-dp-700/30 dark:text-dp-300 dark:border-dp-500/30"
          description="Ellipsis collapses middle pages — keeps the pagination compact for large data sets."
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">12</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </StateRow>

        {/* 3 ── First Page (Previous disabled) */}
        <StateRow
          badge="First Page"
          badgeClassName="bg-foreground/[0.06] text-foreground border border-foreground/[0.12] dark:bg-foreground/10 dark:border-foreground/20"
          description="On the first page — Previous is visually disabled with reduced opacity and no pointer events."
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </StateRow>

        {/* 4 ── Last Page (Next disabled) */}
        <StateRow
          badge="Last Page"
          badgeClassName="bg-foreground/[0.06] text-foreground border border-foreground/[0.12] dark:bg-foreground/10 dark:border-foreground/20"
          description="On the last page — Next is visually disabled. The last page number is the active item."
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">8</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">9</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="pointer-events-none opacity-50" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </StateRow>

      </StateGroup>

      {/* ══ VARIANTS ═════════════════════════════════════════ */}
      <StateGroup title="Variants">

        {/* Simple — Previous / Next only */}
        <StateRow
          badge="Simple"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Previous and Next only — no page numbers. Useful for step-by-step wizards or card stacks."
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </StateRow>

        {/* Few Pages — no ellipsis needed */}
        <StateRow
          badge="Few Pages"
          badgeClassName="bg-mz-purple-50 text-mz-purple-700 border border-mz-purple-300/40 dark:bg-mz-purple-900/40 dark:text-mz-purple-300 dark:border-mz-purple-500/30"
          description="Five or fewer pages — all page numbers are shown without ellipsis."
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </StateRow>

        {/* Double Ellipsis */}
        <StateRow
          badge="Double Ellipsis"
          badgeClassName="bg-dp-100 text-dp-500 border border-dp-300/30 dark:bg-dp-700/30 dark:text-dp-300 dark:border-dp-500/30"
          description="Ellipsis on both sides — the current page sits in the middle of a large range."
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">11</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>12</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">13</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">25</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </StateRow>

      </StateGroup>

      {/* ══ COMPOSITIONS ═════════════════════════════════════ */}
      <StateGroup title="Compositions">

        {/* Interactive */}
        <StateRow
          badge="Interactive"
          badgeClassName="bg-mz-blue-50 text-mz-blue-700 border border-mz-blue-300/30 dark:bg-mz-blue-700/20 dark:text-mz-blue-300 dark:border-mz-blue-500/30"
          description="Fully interactive pagination — click pages or Previous/Next to navigate. Ellipsis collapses automatically."
        >
          <InteractivePagination totalPages={12} />
        </StateRow>

        {/* With Page Info */}
        <StateRow
          badge="With Info"
          badgeClassName="bg-mz-purple-50 text-mz-purple-700 border border-mz-purple-300/40 dark:bg-mz-purple-900/40 dark:text-mz-purple-300 dark:border-mz-purple-500/30"
          description="Pagination paired with a text summary — shows the current range and total items for context."
        >
          <div className="flex flex-col items-center gap-3">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">8</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <p className="text-muted-foreground font-sans" style={{ fontSize: "12px" }}>
              Showing 11 – 20 of 80 results
            </p>
          </div>
        </StateRow>

        {/* Compact — Icon-only Previous/Next */}
        <StateRow
          badge="Compact"
          badgeClassName="bg-grey-blue-500 text-grey-900 border border-grey-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
          description="Icon-only Previous/Next buttons — saves horizontal space in tight layouts like table footers."
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="[&>span]:hidden px-2.5" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="[&>span]:hidden px-2.5" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </StateRow>

      </StateGroup>

    </div>
  );
}
