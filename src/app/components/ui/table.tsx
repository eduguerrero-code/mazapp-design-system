"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto rounded-xl border border-grey-200 dark:border-border"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "bg-table-header-bg dark:bg-muted [&_tr]:border-b [&_tr]:border-grey-200 dark:[&_tr]:border-border [&_th:first-child]:rounded-tl-xl [&_th:last-child]:rounded-tr-xl",
        className,
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-grey-blue-500/50 dark:hover:bg-muted/50 data-[state=selected]:bg-muted border-b border-grey-200 dark:border-border transition-colors",
        className,
      )}
      {...props}
    />
  );
}

const tableHeadVariants = cva(
  "px-3 py-2.5 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
  {
    variants: {
      variant: {
        default: "text-left text-grey-600 dark:text-grey-600 font-medium text-[9px] uppercase tracking-wide",
        centered: "text-center text-grey-600 dark:text-grey-600 font-medium text-[9px] uppercase tracking-wide",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TableHead({
  className,
  variant,
  style,
  ...props
}: React.ComponentProps<"th"> & VariantProps<typeof tableHeadVariants>) {
  return (
    <th
      data-slot="table-head"
      className={cn(tableHeadVariants({ variant }), className)}
      style={style}
      {...props}
    />
  );
}

const tableCellVariants = cva(
  "px-3 py-3 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
  {
    variants: {
      variant: {
        default: "text-foreground text-xs",
        text: "text-foreground text-xs",
        muted: "text-grey-500 dark:text-muted-foreground text-xs",
        numeric: "text-grey-500 dark:text-muted-foreground text-xs tabular-nums",
        action: "text-center",
        icon: "text-center",
        status: "",
        checkbox: "",
      },
      truncate: {
        true: "whitespace-nowrap overflow-hidden text-ellipsis",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      truncate: true,
    },
  }
);

function TableCell({
  className,
  variant,
  truncate,
  ...props
}: React.ComponentProps<"td"> & VariantProps<typeof tableCellVariants>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(tableCellVariants({ variant, truncate }), className)}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  tableCellVariants,
  tableHeadVariants,
};