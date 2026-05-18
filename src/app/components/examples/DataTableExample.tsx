import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import {
  ArrowDown,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Settings2,
  FileDown,
} from "lucide-react";

/* ─── Types ─── */
type NoteType = "Note" | "System" | "Complaint";

interface NoteRow {
  id: string;
  createdOn: string;
  source: {
    type: "user" | "system";
    name: string;
    avatar?: string;
    initials: string;
  };
  description: string;
  statusDots?: Array<{ color: string; label: string }>;
  noteType: NoteType;
}

/* ─── Mock Data ─── */
const defaultNotes: NoteRow[] = [
  {
    id: "NO05",
    createdOn: "4th Apr 25",
    source: {
      type: "user",
      name: "James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzA4NTMyNHww&ixlib=rb-4.1.0&q=80&w=1080",
      initials: "JW",
    },
    description:
      "Please note client wants year end asap to apply for business finance",
    noteType: "Note",
  },
  {
    id: "NO04",
    createdOn: "4th Apr 25",
    source: {
      type: "user",
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwcG9ydHJhaXQlMjBvZmZpY2V8ZW58MXx8fHwxNzczMTMwMzkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      initials: "SC",
    },
    description: "Mortgage reference provided",
    noteType: "Note",
  },
  {
    id: "SYS04",
    createdOn: "2nd Apr 25",
    source: {
      type: "user",
      name: "Lena Rossi",
      avatar:
        "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzA0NDgwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      initials: "LR",
    },
    description: "Payment details updated",
    noteType: "System",
  },
  {
    id: "NO03",
    createdOn: "28th Mar 25",
    source: {
      type: "user",
      name: "James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzA4NTMyNHww&ixlib=rb-4.1.0&q=80&w=1080",
      initials: "JW",
    },
    description: "Sent follow-up email regarding outstanding documents",
    noteType: "Note",
  },
  {
    id: "SYS03",
    createdOn: "25th Mar 25",
    source: {
      type: "user",
      name: "Daniel Kim",
      avatar:
        "https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzA4NTMyNHww&ixlib=rb-4.1.0&q=80&w=1080",
      initials: "DK",
    },
    description: "Invoice INV-0866 matched and reconciled automatically",
    statusDots: [{ color: "bg-positive-500", label: "Complete" }],
    noteType: "System",
  },
  {
    id: "NO06",
    createdOn: "14th Apr 25",
    source: {
      type: "user",
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMTIzMDU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      initials: "SC",
    },
    description: "Client call held about switching to VAT Cash Accounting",
    noteType: "Note",
  },
  {
    id: "SYS05",
    createdOn: "12th Apr 25",
    source: {
      type: "user",
      name: "Marcus Thorne",
      avatar:
        "https://images.unsplash.com/photo-1554765345-6ad6a5417cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzMxMDgwOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      initials: "MT",
    },
    description: "Natalie Peake has been assigned to this envelope",
    noteType: "System",
  },
];

/* ─── Sort Header ─── */
function SortHeader({
  children,
  isActive = false,
  hasArrow = false,
  direction = "desc",
  onClick,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  hasArrow?: boolean;
  direction?: "asc" | "desc";
  onClick?: () => void;
}) {
  return (
    <button
      className="inline-flex items-center gap-1.5 cursor-pointer group"
      onClick={onClick}
    >
      <span
        className="uppercase tracking-wide text-[var(--color-grey-600)] dark:text-grey-600"
        style={{ fontWeight: "var(--font-weight-medium)" }}
      >
        {children}
      </span>
      {hasArrow &&
        (isActive ? (
          <div className="flex items-center justify-center size-4 rounded-full bg-table-sort-arrow text-white">
            <ArrowDown
              className={`size-2.5 stroke-[3] transition-transform ${
                direction === "asc" ? "rotate-180" : ""
              }`}
            />
          </div>
        ) : (
          <ArrowDown className="size-3 text-table-sort-arrow transition-colors stroke-[2.5]" />
        ))}
    </button>
  );
}

/* ─── Type Badge ─── */
function TypeBadge({ type }: { type: NoteType }) {
  const styles: Record<NoteType, string> = {
    Note: "border-grey-200 text-grey-900 bg-transparent dark:border-border dark:text-muted-foreground",
    System:
      "border-grey-200 text-grey-500 bg-transparent dark:border-border dark:text-muted-foreground",
    Complaint:
      "border-negative-500/30 text-negative-500 bg-negative-50 dark:bg-negative-500/10",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border px-3 py-0.5 font-sans w-[90px] ${styles[type]}`}
      style={{ fontSize: "var(--text-xs)" }}
    >
      {type}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   DataTableExample — single source of truth
   for the sortable data table with floating header,
   avatar sources, type badges, and row-level kebab
   menus. Used standalone under Visualization > Data Table
   and consumed by Patterns > Notes & History.
   ═══════════════════════════════════════════════ */
export default function DataTableExample() {
  type SortColumn = "id" | "createdOn" | "source" | "type" | null;
  type SortDirection = "asc" | "desc";

  const [sortColumn, setSortColumn] = useState<SortColumn>("createdOn");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedNotes, setSelectedNotes] = useState<Set<string>>(new Set());

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  /* ── Build the sorted list ── */
  const sortedNotes = [...defaultNotes];

  if (sortColumn) {
    sortedNotes.sort((a, b) => {
      let aVal: string;
      let bVal: string;
      if (sortColumn === "id") {
        aVal = a.id;
        bVal = b.id;
      } else if (sortColumn === "createdOn") {
        aVal = a.createdOn;
        bVal = b.createdOn;
      } else if (sortColumn === "source") {
        aVal = a.source.name || "System";
        bVal = b.source.name || "System";
      } else {
        aVal = a.noteType;
        bVal = b.noteType;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNotes(new Set(sortedNotes.map((n) => n.id)));
    } else {
      setSelectedNotes(new Set());
    }
  };

  const handleSelectNote = (id: string, checked: boolean) => {
    const next = new Set(selectedNotes);
    if (checked) next.add(id);
    else next.delete(id);
    setSelectedNotes(next);
  };

  const allVisibleSelected =
    sortedNotes.length > 0 &&
    sortedNotes.every((n) => selectedNotes.has(n.id));
  const hasSelection = selectedNotes.size > 0;

  return (
    <div className="w-full overflow-x-auto">
      <table
        className="w-full min-w-[800px] font-sans table-fixed"
        style={{
          borderCollapse: "separate",
          borderSpacing: 0,
          fontSize: "var(--text-sm)",
        }}
      >
        {/* ── Floating header row ── */}
        <thead>
          <tr className="bg-table-header-bg dark:bg-muted/40 group">
            <th className="pl-5 pr-2 py-2 w-[40px] rounded-l-xl">
              <div
                className={`flex items-center justify-center transition-opacity ${
                  hasSelection
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <Checkbox
                  checked={allVisibleSelected && sortedNotes.length > 0}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                />
              </div>
            </th>
            <th className="px-4 py-2 text-left whitespace-nowrap w-[10%]">
              <SortHeader
                hasArrow
                isActive={sortColumn === "id"}
                direction={sortDirection}
                onClick={() => handleSort("id")}
              >
                ID
              </SortHeader>
            </th>
            <th className="px-4 py-2 text-left whitespace-nowrap w-[18%]">
              <SortHeader
                hasArrow
                isActive={sortColumn === "createdOn"}
                direction={sortDirection}
                onClick={() => handleSort("createdOn")}
              >
                Created on
              </SortHeader>
            </th>
            <th className="px-4 py-2 text-left whitespace-nowrap w-[12%]">
              <SortHeader
                hasArrow
                isActive={sortColumn === "source"}
                direction={sortDirection}
                onClick={() => handleSort("source")}
              >
                Source
              </SortHeader>
            </th>
            <th className="px-4 py-2 text-left whitespace-nowrap">
              <span
                className="uppercase tracking-wide text-grey-600 dark:text-grey-600"
                style={{ fontWeight: "var(--font-weight-medium)" }}
              >
                Description
              </span>
            </th>
            <th className="px-4 py-2 text-left whitespace-nowrap w-[15%]">
              <SortHeader
                hasArrow
                isActive={sortColumn === "type"}
                direction={sortDirection}
                onClick={() => handleSort("type")}
              >
                Type
              </SortHeader>
            </th>
            <th className="px-4 py-2 text-center whitespace-nowrap w-[5%] rounded-r-xl">
              <DropdownMenu>
                <DropdownMenuTrigger className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer mx-auto inline-flex outline-none ring-0 focus-visible:ring-2 focus-visible:ring-ring">
                  <MoreVertical className="size-5 text-dp-500 dark:text-dp-100" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 font-sans">
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings2 className="size-4 mr-2 text-muted-foreground" />
                    Manage columns
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <FileDown className="size-4 mr-2 text-muted-foreground" />
                    Export view
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </th>
          </tr>
        </thead>

        <tbody>
          {/* Spacer — visual gap between floating header and body */}
          <tr aria-hidden="true">
            <td colSpan={7} className="h-3 p-0" />
          </tr>

          {sortedNotes.map((note, idx) => {
            const isEven = idx % 2 === 0;
            const isFirst = idx === 0;
            const isLast = idx === sortedNotes.length - 1;

            const borderY = "border-b border-grey-200 dark:border-border";
            const topBorder = isFirst
              ? "border-t border-grey-200 dark:border-border"
              : "";

            return (
              <tr
                key={note.id}
                className={`group hover:bg-grey-blue-500/60 dark:hover:bg-muted/30 transition-colors ${
                  isEven ? "bg-card" : "bg-grey-blue-500/30 dark:bg-muted/10"
                }`}
              >
                {/* Checkbox */}
                <td
                  className={`pl-5 pr-2 py-2.5 border-l border-grey-200 dark:border-border ${borderY} ${topBorder} ${
                    isFirst ? "rounded-tl-lg" : ""
                  } ${isLast ? "rounded-bl-lg" : ""}`}
                >
                  <div
                    className={`flex items-center justify-center transition-opacity ${
                      hasSelection
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Checkbox
                      checked={selectedNotes.has(note.id)}
                      onCheckedChange={(checked) =>
                        handleSelectNote(note.id, !!checked)
                      }
                    />
                  </div>
                </td>

                {/* ID */}
                <td
                  className={`px-4 py-2.5 text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis ${borderY} ${topBorder}`}
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  {note.id}
                </td>

                {/* Created On */}
                <td
                  className={`px-4 py-2.5 text-charcoal dark:text-foreground whitespace-nowrap overflow-hidden text-ellipsis ${borderY} ${topBorder}`}
                  style={{
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  {note.createdOn}
                </td>

                {/* Source */}
                <td className={`px-4 py-2.5 ${borderY} ${topBorder}`}>
                  {note.source.avatar ? (
                    <Avatar className="size-8 rounded-full">
                      <AvatarImage
                        src={note.source.avatar}
                        alt={note.source.name}
                        className="rounded-full object-cover"
                      />
                      <AvatarFallback
                        className="rounded-full"
                        style={{ fontSize: "10px" }}
                      >
                        {note.source.initials}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="size-8 rounded-full">
                      <AvatarFallback
                        className="bg-mz-purple-50 text-dp-500 rounded-full"
                        style={{ fontSize: "10px" }}
                      >
                        {note.source.initials}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </td>

                {/* Description + status dots */}
                <td
                  className={`px-4 py-2.5 text-foreground ${borderY} ${topBorder}`}
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="truncate">{note.description}</span>
                    {note.statusDots?.map((dot, i) => (
                      <span
                        key={i}
                        className={`inline-block size-2.5 rounded-full ${dot.color} shrink-0`}
                        title={dot.label}
                      />
                    ))}
                  </div>
                </td>

                {/* Type */}
                <td className={`px-4 py-2.5 ${borderY} ${topBorder}`}>
                  <TypeBadge type={note.noteType} />
                </td>

                {/* Kebab */}
                <td
                  className={`px-4 py-2.5 text-center border-r border-grey-200 dark:border-border ${borderY} ${topBorder} ${
                    isFirst ? "rounded-tr-lg" : ""
                  } ${isLast ? "rounded-br-lg" : ""}`}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 rounded-md hover:bg-grey-200/60 dark:hover:bg-muted transition-colors cursor-pointer mx-auto inline-flex outline-none ring-0 focus-visible:ring-2 focus-visible:ring-ring">
                      <MoreVertical className="size-4 text-grey-500 hover:text-foreground transition-colors" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-40 font-sans"
                    >
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye className="size-4 mr-2 text-muted-foreground" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Pencil className="size-4 mr-2 text-muted-foreground" />
                        Edit note
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

          {sortedNotes.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="px-5 py-10 text-center text-muted-foreground border border-grey-200 dark:border-border rounded-lg"
                style={{ fontSize: "var(--text-sm)" }}
              >
                No data to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
