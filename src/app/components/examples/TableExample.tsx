import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import {
  ArrowDown,
  Clock,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { OcrStatusTag, type OcrStatus } from "../ui/ocr-status-tag";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

/* ─── Data ─── */
type SuggestedAction = "View" | "Manual entry";

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
  check: "w-[48px]",
  date: "w-[80px]",
  desc: "w-[180px]",
  type: "w-[180px]",
  clock: "w-[48px]",
  ocr: "w-[150px]",
  action: "w-[120px]",
  kebab: "w-[48px]",
} as const;

/* ─── Action button ─── */
function ActionButton({ action }: { action: SuggestedAction }) {
  if (action === "Manual entry") {
    return (
      <button className="px-3 py-1 rounded-lg bg-dp-500 text-white text-xs font-medium hover:bg-dp-700 transition-colors cursor-pointer whitespace-nowrap inline-block">
        Manual entry
      </button>
    );
  }
  return (
    <button className="px-3 py-1 rounded-lg border border-grey-200 dark:border-border text-xs font-medium text-foreground hover:bg-grey-blue-500 dark:hover:bg-muted transition-colors cursor-pointer whitespace-nowrap inline-block">
      View
    </button>
  );
}

/* ─── Sortable header cell ─── */
function SortHeader({
  children,
  isActive = false,
  direction = "desc",
  onClick,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  direction?: "asc" | "desc";
  onClick?: () => void;
}) {
  return (
    <button
      className="inline-flex items-center gap-1.5 cursor-pointer group"
      onClick={onClick}
    >
      <span className="uppercase tracking-wide text-grey-600 dark:text-grey-600 font-medium text-[9px]">
        {children}
      </span>
      {isActive ? (
        <div className="flex items-center justify-center size-4 rounded-full bg-table-sort-arrow text-white">
          <ArrowDown
            className={`size-2.5 stroke-[3] transition-transform ${
              direction === "asc" ? "rotate-180" : ""
            }`}
          />
        </div>
      ) : (
        <ArrowDown className="size-3 text-table-sort-arrow transition-colors stroke-[2.5]" />
      )}
    </button>
  );
}

/* ─── Main Example ─── */
export default function TableExample() {
  type SortColumn = "date" | "description" | "type" | "ocr" | null;
  type SortDirection = "asc" | "desc";

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState<SortColumn>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

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
    <div className="w-full overflow-x-auto">
      <table
        className="w-full font-sans"
        style={{
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
      >
        {/* ── Floating header row ── */}
        <thead>
          <tr className="bg-table-header-bg dark:bg-muted/40 group">
            <th className={`px-3 py-2.5 ${COL.check} rounded-l-xl`}>
              <div
                className={`flex items-center justify-center transition-opacity ${
                  someSelected || allSelected
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <Checkbox
                  checked={allSelected ? true : someSelected ? "indeterminate" : false}
                  onCheckedChange={toggleAll}
                  aria-label="Select all rows"
                />
              </div>
            </th>
            <th className={`px-3 py-2.5 text-left whitespace-nowrap ${COL.date}`}>
              <SortHeader
                isActive={sortColumn === "date"}
                direction={sortDirection}
                onClick={() => handleSort("date")}
              >
                DOC. DATE
              </SortHeader>
            </th>
            <th className={`px-3 py-2.5 text-left whitespace-nowrap ${COL.desc}`}>
              <SortHeader
                isActive={sortColumn === "description"}
                direction={sortDirection}
                onClick={() => handleSort("description")}
              >
                DESCRIPTION
              </SortHeader>
            </th>
            <th className={`px-3 py-2.5 text-left whitespace-nowrap ${COL.type}`}>
              <SortHeader
                isActive={sortColumn === "type"}
                direction={sortDirection}
                onClick={() => handleSort("type")}
              >
                DOCUMENT TYPE
              </SortHeader>
            </th>
            <th className={`px-3 py-2.5 text-center whitespace-nowrap ${COL.clock}`}>
              <span className="uppercase tracking-wide text-grey-600 dark:text-grey-600 font-medium text-[9px]" />
            </th>
            <th className={`px-3 py-2.5 text-left whitespace-nowrap ${COL.ocr}`}>
              <SortHeader
                isActive={sortColumn === "ocr"}
                direction={sortDirection}
                onClick={() => handleSort("ocr")}
              >
                OCR STATUS
              </SortHeader>
            </th>
            <th className={`px-3 py-2.5 text-center whitespace-nowrap ${COL.action}`}>
              <span className="uppercase tracking-wide text-grey-600 dark:text-grey-600 font-medium text-[9px]">
                SUGG. ACTION
              </span>
            </th>
            <th className={`px-3 py-2.5 text-center whitespace-nowrap ${COL.kebab} rounded-r-xl`} />
          </tr>
        </thead>

        <tbody>
          {/* Spacer — visual gap between floating header and body */}
          <tr aria-hidden="true">
            <td colSpan={8} className="h-3 p-0" />
          </tr>

          {documents.map((doc, idx) => {
            const isEven = idx % 2 === 0;
            const isFirst = idx === 0;
            const isLast = idx === documents.length - 1;
            const isSelected = selected.has(doc.id);

            const borderY = "border-b border-grey-200 dark:border-border";
            const topBorder = isFirst ? "border-t border-grey-200 dark:border-border" : "";

            return (
              <tr
                key={doc.id}
                className={`group transition-colors ${
                  isSelected
                    ? "bg-mz-purple-50/50 dark:bg-mz-purple-900/20"
                    : isEven
                    ? "bg-card"
                    : "bg-grey-blue-500/30 dark:bg-muted/10"
                } [&:not(:has(td:hover))]:hover:bg-grey-blue-500/60 [&:not(:has(td:hover))]:dark:hover:bg-muted/30`}
              >
                {/* Checkbox */}
                <td
                  className={`px-3 py-3 border-l border-grey-200 dark:border-border ${borderY} ${topBorder} ${
                    isFirst ? "rounded-tl-lg" : ""
                  } ${isLast ? "rounded-bl-lg" : ""}`}
                >
                  <div
                    className={`flex items-center justify-center transition-opacity ${
                      someSelected || allSelected
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleRow(doc.id)}
                      aria-label={`Select ${doc.description}`}
                    />
                  </div>
                </td>

                {/* Date */}
                <td
                  className={`px-3 py-3 text-grey-500 dark:text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis ${borderY} ${topBorder} text-xs`}
                >
                  {doc.date}
                </td>

                {/* Description */}
                <td
                  className={`px-3 py-3 text-foreground whitespace-nowrap overflow-hidden ${borderY} ${topBorder} text-xs`}
                >
                  {doc.descriptionLink ? (
                    <button className="text-foreground hover:text-foreground/80 transition-colors cursor-pointer truncate block">
                      {doc.description}
                    </button>
                  ) : (
                    <span className="truncate block">{doc.description}</span>
                  )}
                </td>

                {/* Document Type */}
                <td
                  className={`px-3 py-3 text-grey-500 dark:text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis ${borderY} ${topBorder} text-xs`}
                >
                  {doc.documentType}
                </td>

                {/* Clock icon */}
                <td className={`px-3 py-3 text-center ${borderY} ${topBorder}`}>
                  <Clock className="size-4 text-grey-500 dark:text-grey-700 mx-auto" />
                </td>

                {/* OCR Status */}
                <td className={`px-3 py-3 ${borderY} ${topBorder}`}>
                  <OcrStatusTag status={doc.ocrStatus} />
                </td>

                {/* Suggested Action */}
                <td className={`px-3 py-3 text-center ${borderY} ${topBorder} hover:bg-transparent`}>
                  <ActionButton action={doc.suggestedAction} />
                </td>

                {/* Kebab */}
                <td
                  className={`px-3 py-3 text-center border-r border-grey-200 dark:border-border ${borderY} ${topBorder} ${
                    isFirst ? "rounded-tr-lg" : ""
                  } ${isLast ? "rounded-br-lg" : ""} hover:bg-transparent`}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 rounded-md hover:bg-grey-200/60 dark:hover:bg-muted transition-colors cursor-pointer mx-auto inline-flex outline-none ring-0 focus-visible:ring-2 focus-visible:ring-ring">
                      <MoreVertical className="size-4 text-grey-500 hover:text-foreground transition-colors" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 font-sans">
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye className="size-4 mr-2 text-muted-foreground" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Pencil className="size-4 mr-2 text-muted-foreground" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-negative-500 hover:text-negative-600 focus:text-negative-600 dark:text-negative-400 dark:hover:text-negative-300 dark:focus:text-negative-300 focus:bg-negative-50 dark:focus:bg-negative-900/20">
                        <Trash2 className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}