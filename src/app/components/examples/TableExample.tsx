import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import {
  ArrowDown,
  ArrowUpDown,
  Clock,
  MoreVertical,
} from "lucide-react";
import { OcrStatusTag, type OcrStatus } from "../ui/ocr-status-tag";

/* ─── Data ─── */
type SuggestedAction = "View" | "Manual entry";
type RowSize = "S" | "M" | "L";

interface DocRow {
  id: string;
  date: string;
  description: string;
  descriptionLink?: boolean;
  documentType: string;
  ocrStatus: OcrStatus;
  suggestedAction: SuggestedAction;
}

const documents: DocRow[] = [
  { id: "1", date: "31/03/25", description: "Invoice-157", documentType: "Sales > Sales invoice", ocrStatus: "COMPLETED", suggestedAction: "View" },
  { id: "2", date: "29/03/25", description: "Invoice-154", documentType: "Sales > Sales invoice", ocrStatus: "COMPLETED", suggestedAction: "View" },
  { id: "3", date: "28/03/25", description: "Invoice-146", documentType: "Sales > Sales invoice", ocrStatus: "CORRECTED", suggestedAction: "View" },
  { id: "4", date: "25/03/25", description: "Invoice-147", documentType: "Sales > Sales invoice", ocrStatus: "COMPLETED", suggestedAction: "View" },
  { id: "5", date: "21/03/25", description: "Invoice_2481.pdf", documentType: "Expenses > Receipt", ocrStatus: "PENDING", suggestedAction: "Manual entry" },
  { id: "6", date: "21/03/25", description: "Invoice_no_E2420458-232.pdf", descriptionLink: true, documentType: "Expenses > Purchase invoice", ocrStatus: "COMPLETED", suggestedAction: "View" },
  { id: "7", date: "20/03/25", description: "Invoice INV-0866", documentType: "Expenses > Purchase invoice", ocrStatus: "COMPLETED", suggestedAction: "View" },
  { id: "8", date: "18/03/25", description: "Trip-receipt.pdf", documentType: "Expenses > Receipt", ocrStatus: "EXCLUDED", suggestedAction: "Manual entry" },
  { id: "9", date: "16/03/25", description: "Invoice_1.pdf", documentType: "Expenses > Receipt", ocrStatus: "COMPLETED", suggestedAction: "View" },
  { id: "10", date: "15/03/25", description: "Fuel receipt", documentType: "Expenses > Receipt", ocrStatus: "COMPLETED", suggestedAction: "View" },
  { id: "11", date: "14/03/25", description: "IMG_4918", documentType: "Expenses > Receipt", ocrStatus: "FAILED", suggestedAction: "Manual entry" },
  { id: "12", date: "11/03/25", description: "Invoice-83EBDF17-0001.pdf", documentType: "Expenses > Purchase Invoice", ocrStatus: "COMPLETED", suggestedAction: "View" },
  { id: "13", date: "10/03/25", description: "Food receipt", documentType: "Expenses > Receipt", ocrStatus: "CORRECTED", suggestedAction: "View" },
  { id: "14", date: "09/03/25", description: "Invoice-152", documentType: "Sales > Sales invoice", ocrStatus: "PENDING", suggestedAction: "Manual entry" },
  { id: "15", date: "08/03/25", description: "Invoice-150", documentType: "Sales > Sales invoice", ocrStatus: "COMPLETED", suggestedAction: "View" },
];

/* ─── Column widths ─── */
const COL = {
  check: "w-[3%]",
  date: "w-[9%]",
  desc: "w-[22%]",
  type: "w-[22%]",
  clock: "w-[3%]",
  ocr: "w-[18%]",
  action: "w-[15%]",
  kebab: "w-[3%]",
} as const;

/* ─── Row size padding ─── */
const ROW_SIZES = {
  S: { header: "py-2", data: "py-2" },
  M: { header: "py-3", data: "py-3.5" },
  L: { header: "py-4", data: "py-5" },
} as const;

/* ─── Cell base class ─── */
const thBase = "px-2 text-left text-[9px] font-medium uppercase tracking-wide text-grey-500 dark:text-muted-foreground whitespace-nowrap align-middle font-sans";
const tdBase = "px-2 align-middle whitespace-nowrap text-xs";

/* ─── Action button ─── */
function ActionButton({ action }: { action: SuggestedAction }) {
  if (action === "Manual entry") {
    return (
      <button className="px-3 py-1 rounded-lg bg-dp-500 text-white text-xs font-medium hover:bg-dp-700 transition-colors cursor-pointer">
        Manual entry
      </button>
    );
  }
  return (
    <button className="px-3 py-1 rounded-lg border border-grey-200 dark:border-border text-xs font-medium text-foreground hover:bg-grey-blue-500 dark:hover:bg-muted transition-colors cursor-pointer">
      View
    </button>
  );
}

/* ─── Sortable header cell ─── */
function SortTh({
  children,
  active = false,
  colClass,
  rowSize,
}: {
  children: React.ReactNode;
  active?: boolean;
  colClass?: string;
  rowSize: RowSize;
}) {
  return (
    <th className={`${thBase} ${ROW_SIZES[rowSize].header} ${colClass ?? ""} border-y border-grey-200 dark:border-border`}>
      <button className="inline-flex items-center gap-1.5 cursor-pointer group">
        {children}
        {active ? (
          <span className="inline-flex items-center justify-center size-5 rounded-full bg-[#E57373]">
            <ArrowDown className="size-3 text-white" />
          </span>
        ) : (
          <span className="inline-flex items-center justify-center size-5 rounded-full bg-transparent group-hover:bg-grey-400/20 transition-colors">
            <ArrowUpDown className="size-3 text-grey-400 group-hover:text-grey-700 dark:group-hover:text-muted-foreground transition-colors" />
          </span>
        )}
      </button>
    </th>
  );
}

/* ─── Main Example ─── */
export default function TableExample() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [rowSize, setRowSize] = useState<RowSize>("M");

  const allSelected = selected.size === documents.length;
  const someSelected = selected.size > 0 && !allSelected;

  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(documents.map((d) => d.id)));
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      {/* Row Size Controls */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">Row height:</span>
        <div className="inline-flex rounded-lg border border-grey-200 dark:border-border overflow-hidden">
          {(["S", "M", "L"] as const).map((size) => (
            <button
              key={size}
              onClick={() => setRowSize(size)}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                rowSize === size
                  ? "bg-mz-purple-500 text-white"
                  : "bg-white dark:bg-card text-foreground hover:bg-grey-blue-500 dark:hover:bg-muted"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden">
      <table className="w-full text-xs table-fixed" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead className="bg-[#F5F5F5] dark:bg-muted">
          <tr>
            {/* Checkbox */}
            <th className={`${thBase} ${ROW_SIZES[rowSize].header} ${COL.check} rounded-l-lg border-y border-l border-grey-200 dark:border-border`}>
              <Checkbox
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onCheckedChange={toggleAll}
                aria-label="Select all rows"
                className="data-[state=checked]:bg-mz-purple-500 data-[state=checked]:border-mz-purple-500"
              />
            </th>
            <SortTh active colClass={COL.date} rowSize={rowSize}>
              DOC. DATE
            </SortTh>
            <SortTh colClass={COL.desc} rowSize={rowSize}>DESCRIPTION</SortTh>
            <SortTh active colClass={COL.type} rowSize={rowSize}>DOCUMENT TYPE</SortTh>
            {/* Clock/eye spacer */}
            <th className={`${thBase} ${ROW_SIZES[rowSize].header} ${COL.clock} border-y border-grey-200 dark:border-border`} />
            <SortTh colClass={COL.ocr} rowSize={rowSize}>OCR STATUS</SortTh>
            <th className={`${thBase} ${ROW_SIZES[rowSize].header} ${COL.action} border-y border-grey-200 dark:border-border text-center`}>
              <button className="inline-flex items-center gap-2 cursor-pointer group mx-auto">
                SUGG. ACTION
                <span className="inline-flex items-center justify-center size-6 rounded-full bg-transparent group-hover:bg-grey-400/20 transition-colors">
                  <ArrowUpDown className="size-3.5 text-grey-400 group-hover:text-grey-700 dark:group-hover:text-muted-foreground transition-colors" />
                </span>
              </button>
            </th>
            {/* Kebab header */}
            <th className={`${thBase} ${ROW_SIZES[rowSize].header} ${COL.kebab} rounded-r-lg border-y border-r border-grey-200 dark:border-border`}>
              <button className="p-1 rounded hover:bg-grey-200 dark:hover:bg-white/10 transition-colors cursor-pointer">
                <MoreVertical className="size-4 text-grey-500 dark:text-muted-foreground" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Spacer between header and data */}
          <tr aria-hidden="true">
            <td colSpan={8} className="h-3 p-0" />
          </tr>
          {documents.map((doc, idx) => {
            const isLast = idx === documents.length - 1;
            const isSelected = selected.has(doc.id);
            const isEven = idx % 2 === 0;
            const isFirst = idx === 0;
            return (
              <tr
                key={doc.id}
                className={`
                  transition-colors
                  ${isSelected ? "bg-mz-purple-50/50 dark:bg-mz-purple-900/20" : isEven ? "bg-white dark:bg-card" : "bg-grey-blue-500/30 dark:bg-muted/30"}
                  hover:bg-grey-blue-500/60 dark:hover:bg-muted/50
                `}
              >
                {/* Checkbox */}
                <td className={`${tdBase} ${ROW_SIZES[rowSize].data} ${COL.check} border-l border-grey-200 dark:border-border ${isFirst ? "rounded-tl-lg border-t" : ""} ${isLast ? "rounded-bl-lg border-b" : "border-b"}`}>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleRow(doc.id)}
                    aria-label={`Select ${doc.description}`}
                    className="data-[state=checked]:bg-mz-purple-500 data-[state=checked]:border-mz-purple-500"
                  />
                </td>

                {/* Date */}
                <td className={`${tdBase} ${ROW_SIZES[rowSize].data} ${COL.date} text-foreground ${isFirst ? "border-t border-grey-200 dark:border-border" : ""} ${isLast ? "border-b border-grey-200 dark:border-border" : "border-b border-grey-200 dark:border-border"}`}>
                  {doc.date}
                </td>

                {/* Description */}
                <td className={`${tdBase} ${ROW_SIZES[rowSize].data} ${COL.desc} ${isFirst ? "border-t border-grey-200 dark:border-border" : ""} ${isLast ? "border-b border-grey-200 dark:border-border" : "border-b border-grey-200 dark:border-border"}`}>
                  {doc.descriptionLink ? (
                    <button className="text-foreground hover:text-foreground/80 transition-colors cursor-pointer font-normal">
                      {doc.description}
                    </button>
                  ) : (
                    <span className="text-foreground">{doc.description}</span>
                  )}
                </td>

                {/* Document Type */}
                <td className={`${tdBase} ${ROW_SIZES[rowSize].data} ${COL.type} text-foreground ${isFirst ? "border-t border-grey-200 dark:border-border" : ""} ${isLast ? "border-b border-grey-200 dark:border-border" : "border-b border-grey-200 dark:border-border"}`}>
                  {doc.documentType}
                </td>

                {/* Clock icon */}
                <td className={`${tdBase} ${ROW_SIZES[rowSize].data} ${COL.clock} ${isFirst ? "border-t border-grey-200 dark:border-border" : ""} ${isLast ? "border-b border-grey-200 dark:border-border" : "border-b border-grey-200 dark:border-border"}`}>
                  <Clock className="size-4 text-grey-500 dark:text-grey-700" />
                </td>

                {/* OCR Status */}
                <td className={`${tdBase} ${ROW_SIZES[rowSize].data} ${COL.ocr} ${isFirst ? "border-t border-grey-200 dark:border-border" : ""} ${isLast ? "border-b border-grey-200 dark:border-border" : "border-b border-grey-200 dark:border-border"}`}>
                  <OcrStatusTag status={doc.ocrStatus} />
                </td>

                {/* Suggested Action */}
                <td className={`${tdBase} ${ROW_SIZES[rowSize].data} ${COL.action} text-center ${isFirst ? "border-t border-grey-200 dark:border-border" : ""} ${isLast ? "border-b border-grey-200 dark:border-border" : "border-b border-grey-200 dark:border-border"}`}>
                  <ActionButton action={doc.suggestedAction} />
                </td>

                {/* Kebab */}
                <td className={`${tdBase} ${ROW_SIZES[rowSize].data} ${COL.kebab} border-r border-grey-200 dark:border-border ${isFirst ? "rounded-tr-lg border-t" : ""} ${isLast ? "rounded-br-lg border-b" : "border-b"}`}>
                  <button className="p-1 rounded hover:bg-grey-200 dark:hover:bg-muted transition-colors cursor-pointer">
                    <MoreVertical className="size-4 text-grey-500 hover:text-foreground dark:hover:text-foreground" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
}