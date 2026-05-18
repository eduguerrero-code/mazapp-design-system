import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Pencil,
  ExternalLink,
  Building2,
  User,
  Briefcase,
  ClipboardCheck,
  AlertCircle,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────── */
type YesNo = "yes" | "no" | "";
type SectionId = "payroll" | "employer" | "employee" | "review";

interface FormValues {
  /* Section 1 – Payroll Address */
  addr1: string;
  addr2: string;
  town: string;
  county: string;
  postcode: string;
  /* Section 2 – Employer Registration */
  isRegistered: YesNo;
  utr: string;
  payeRef: string;
  accountsRef: string;
  /* Section 3 – New Employee */
  forename: string;
  surname: string;
  dob: string;
  ni: string;
  empAddr1: string;
  empAddr2: string;
  empTown: string;
  empPostcode: string;
  startDate: string;
  employmentType: string;
  payType: string;
  salary: string;
  taxCode: string;
  studentLoan: YesNo;
  firstJob: YesNo;
}

const EMPTY: FormValues = {
  addr1: "", addr2: "", town: "", county: "", postcode: "",
  isRegistered: "", utr: "", payeRef: "", accountsRef: "",
  forename: "", surname: "", dob: "", ni: "",
  empAddr1: "", empAddr2: "", empTown: "", empPostcode: "",
  startDate: "", employmentType: "", payType: "", salary: "", taxCode: "",
  studentLoan: "", firstJob: "",
};

/* ─── Section config ─────────────────────────────────────────── */
const SECTIONS: { id: SectionId; label: string; sublabel?: string; icon: React.ElementType }[] = [
  { id: "payroll",  label: "Payroll address",            icon: Building2 },
  { id: "employer", label: "Register as an employer",    sublabel: "UTR", icon: Briefcase },
  { id: "employee", label: "New employee",               icon: User },
  { id: "review",   label: "Review & submit",            icon: ClipboardCheck },
];

const SECTION_ORDER: SectionId[] = ["payroll", "employer", "employee", "review"];

/* ─── Yes / No toggle ─────��──────────────────────────────────── */
function YesNoToggle({
  value,
  onChange,
}: {
  value: YesNo;
  onChange: (v: YesNo) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-border overflow-hidden">
      {(["yes", "no"] as const).map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-5 py-2 text-sm transition-colors cursor-pointer capitalize ${
            value === opt
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground hover:bg-muted"
          }`}
        >
          {opt === "yes" ? "Yes" : "No"}
        </button>
      ))}
    </div>
  );
}

/* ─── Field wrapper ──────────────────────────────────────────── */
function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id?: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <Label htmlFor={id} className="text-sm">
          {label}
        </Label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-negative-700">
          <AlertCircle className="size-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Section nav item ───────────────────────────────────────── */
function SectionNavItem({
  section,
  index,
  active,
  complete,
  summary,
  onClick,
}: {
  section: (typeof SECTIONS)[number];
  index: number;
  active: boolean;
  complete: boolean;
  summary?: string;
  onClick: () => void;
}) {
  const Icon = section.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer group ${
        active
          ? "bg-dp-100 dark:bg-dp-700/30"
          : complete
          ? "hover:bg-muted/60"
          : "hover:bg-muted/40 opacity-60"
      }`}
    >
      {/* Step circle */}
      <span
        className={`mt-0.5 shrink-0 flex items-center justify-center size-6 rounded-full text-[11px] transition-colors ${
          complete
            ? "bg-positive-500 text-white"
            : active
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground border border-border"
        }`}
      >
        {complete ? <Check className="size-3.5" /> : <span>{index + 1}</span>}
      </span>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm leading-snug ${
            active ? "text-dp-500 dark:text-dp-300" : complete ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {section.label}
          {section.sublabel && (
            <span className="text-muted-foreground"> — {section.sublabel}</span>
          )}
        </p>
        {summary && (
          <p className="text-xs text-muted-foreground truncate mt-0.5">{summary}</p>
        )}
      </div>

      {/* Edit icon when complete */}
      {complete && !active && (
        <Pencil className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
      )}
    </button>
  );
}

/* ════════════════════════════════════════════���══════════════════ */
/*  Main component                                               */
/* ═══════════════════════════════════════════════════════════════ */
export default function FormExample() {
  const [activeSection, setActiveSection] = useState<SectionId>("payroll");
  const [completedSections, setCompletedSections] = useState<Set<SectionId>>(new Set());
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const currentIndex = SECTION_ORDER.indexOf(activeSection);
  const progressPct = Math.round(((currentIndex) / (SECTION_ORDER.length - 1)) * 100);

  const set = <K extends keyof FormValues>(key: K, val: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  /* ─── Validation per section ─ */
  function validateSection(id: SectionId): boolean {
    const errs: typeof errors = {};

    if (id === "payroll") {
      if (!values.addr1.trim()) errs.addr1 = "Address line 1 is required";
      if (!values.town.trim())  errs.town  = "Town or city is required";
      if (!values.postcode.trim()) errs.postcode = "Postcode is required";
    }
    if (id === "employer") {
      if (!values.isRegistered) errs.isRegistered = "Please select yes or no" as any;
      if (values.isRegistered === "yes" && !values.utr.trim()) errs.utr = "UTR number is required";
      if (values.isRegistered === "yes" && !values.payeRef.trim()) errs.payeRef = "PAYE reference is required";
    }
    if (id === "employee") {
      if (!values.forename.trim())  errs.forename  = "Forename is required";
      if (!values.surname.trim())   errs.surname   = "Surname is required";
      if (!values.dob.trim())       errs.dob       = "Date of birth is required";
      if (!values.ni.trim())        errs.ni        = "National Insurance number is required";
      if (!values.startDate.trim()) errs.startDate = "Start date is required";
      if (!values.employmentType)   errs.employmentType = "Please select employment type" as any;
      if (!values.salary.trim())    errs.salary    = "Please enter salary or hourly rate";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (activeSection === "review") {
      setSubmitted(true);
      return;
    }
    if (!validateSection(activeSection)) return;
    setCompletedSections((prev) => new Set([...prev, activeSection]));
    const nextIndex = currentIndex + 1;
    setActiveSection(SECTION_ORDER[nextIndex]);
  }

  function handleBack() {
    if (currentIndex === 0) return;
    setActiveSection(SECTION_ORDER[currentIndex - 1]);
  }

  /* ─── Summaries for left nav ─ */
  const summaries: Partial<Record<SectionId, string>> = {
    payroll:  values.addr1 ? `${values.addr1}, ${values.postcode}` : undefined,
    employer: values.isRegistered === "yes" ? `UTR: ${values.utr || "—"}` : values.isRegistered === "no" ? "Not registered" : undefined,
    employee: values.forename ? `${values.forename} ${values.surname}` : undefined,
  };

  const statusBadge = submitted
    ? { label: "Submitted", cls: "bg-positive-50 text-positive-700 border border-positive-500/30" }
    : activeSection === "review"
    ? { label: "Submit Now", cls: "bg-mz-purple-50 text-mz-purple-700 border border-mz-purple-300/30 dark:bg-mz-purple-900/40 dark:text-mz-purple-300" }
    : { label: "In Progress", cls: "bg-mz-blue-50 text-mz-blue-700 border border-mz-blue-300/30" };

  /* ─── Success screen ─ */
  if (submitted) {
    return (
      <div className="flex items-start justify-center py-4">
        <div className="w-full max-w-2xl bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          {/* Progress bar — full */}
          <div className="h-1 bg-muted">
            <div className="h-full bg-positive-500 w-full transition-all duration-500" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="text-sm text-foreground">New Employees</h3>
            <span className={`text-xs px-2.5 py-1 rounded-full ${statusBadge.cls}`}>
              {statusBadge.label}
            </span>
          </div>

          {/* Success body */}
          <div className="flex flex-col items-center justify-center gap-5 py-14 px-6 text-center">
            <div className="size-16 rounded-full bg-positive-50 border-2 border-positive-500/30 flex items-center justify-center">
              <Check className="size-8 text-positive-500" />
            </div>
            <div>
              <h2 className="text-foreground mb-1">Employee added successfully</h2>
              <p className="text-sm text-muted-foreground max-w-sm">
                {values.forename} {values.surname} has been added to your payroll. You'll receive a confirmation shortly.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => { setSubmitted(false); setActiveSection("payroll"); setCompletedSections(new Set()); setValues(EMPTY); }}>
                Add another employee
              </Button>
              <Button>
                View payroll
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* Support bar */}
          <SupportBar />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center py-4">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl overflow-hidden shadow-sm">

        {/* ── Top progress bar ── */}
        <div className="h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* ── Card header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <h3 className="text-sm text-foreground">New Employees</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1} of {SECTION_ORDER.length} Steps
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full ${statusBadge.cls}`}>
              {statusBadge.label}
            </span>
          </div>
        </div>

        {/* ── Two-column body ── */}
        <div className="flex min-h-[480px]">

          {/* LEFT: Section navigation */}
          <div className="w-48 shrink-0 border-r border-border bg-muted/20 py-4 px-2 flex flex-col gap-1">
            <p className="px-4 pb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Sections
            </p>
            {SECTIONS.map((section, i) => (
              <SectionNavItem
                key={section.id}
                section={section}
                index={i}
                active={activeSection === section.id}
                complete={completedSections.has(section.id)}
                summary={summaries[section.id]}
                onClick={() => {
                  if (completedSections.has(section.id) || i <= currentIndex) {
                    setActiveSection(section.id);
                  }
                }}
              />
            ))}
          </div>

          {/* RIGHT: Form fields */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-5">

              {/* Section header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  {(() => {
                    const s = SECTIONS.find((x) => x.id === activeSection)!;
                    const Icon = s.icon;
                    return (
                      <>
                        <span className="inline-flex items-center justify-center size-8 rounded-lg bg-dp-100 dark:bg-dp-700/40">
                          <Icon className="size-4 text-dp-500 dark:text-dp-300" />
                        </span>
                        <div>
                          <h4 className="text-sm text-foreground">{s.label}</h4>
                          {s.sublabel && (
                            <p className="text-xs text-muted-foreground">{s.sublabel}</p>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>
                {activeSection !== "review" && (
                  <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-mz-purple-50 text-mz-purple-700 border border-mz-purple-300/30 dark:bg-mz-purple-900/30 dark:text-mz-purple-300 uppercase tracking-wide">
                    Edit
                  </span>
                )}
              </div>

              {/* ── Section 1: Payroll address ── */}
              {activeSection === "payroll" && (
                <div className="space-y-4">
                  <Field id="addr1" label="Address line 1" error={errors.addr1}>
                    <Input
                      id="addr1"
                      placeholder="Please enter"
                      value={values.addr1}
                      onChange={(e) => set("addr1", e.target.value)}
                      aria-invalid={!!errors.addr1}
                    />
                  </Field>
                  <Field id="addr2" label="Address line 2" hint="Optional">
                    <Input
                      id="addr2"
                      placeholder="Please enter"
                      value={values.addr2}
                      onChange={(e) => set("addr2", e.target.value)}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field id="town" label="Town or city" error={errors.town}>
                      <Input
                        id="town"
                        placeholder="Please enter"
                        value={values.town}
                        onChange={(e) => set("town", e.target.value)}
                        aria-invalid={!!errors.town}
                      />
                    </Field>
                    <Field id="county" label="County" hint="Optional">
                      <Input
                        id="county"
                        placeholder="Please enter"
                        value={values.county}
                        onChange={(e) => set("county", e.target.value)}
                      />
                    </Field>
                  </div>
                  <Field id="postcode" label="Postcode" error={errors.postcode}>
                    <Input
                      id="postcode"
                      placeholder="e.g. SW1A 1AA"
                      value={values.postcode}
                      onChange={(e) => set("postcode", e.target.value.toUpperCase())}
                      aria-invalid={!!errors.postcode}
                      className="max-w-[160px]"
                    />
                  </Field>
                </div>
              )}

              {/* ── Section 2: Employer registration ── */}
              {activeSection === "employer" && (
                <div className="space-y-5">
                  <Field
                    label="Are you registered as an employer?"
                    error={errors.isRegistered as string}
                  >
                    <YesNoToggle
                      value={values.isRegistered}
                      onChange={(v) => set("isRegistered", v)}
                    />
                  </Field>

                  {values.isRegistered === "yes" && (
                    <>
                      <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-4">
                        <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                          HMRC Credentials
                        </p>
                        <Field
                          id="utr"
                          label="Unique Taxpayer Reference (UTR)"
                          hint="10 digits"
                          error={errors.utr}
                        >
                          <Input
                            id="utr"
                            placeholder="e.g. 1234567890"
                            value={values.utr}
                            onChange={(e) => set("utr", e.target.value)}
                            aria-invalid={!!errors.utr}
                            maxLength={10}
                          />
                        </Field>
                        <Field
                          id="payeRef"
                          label="PAYE reference number"
                          hint="13 characters"
                          error={errors.payeRef}
                        >
                          <Input
                            id="payeRef"
                            placeholder="e.g. 123/AB45678"
                            value={values.payeRef}
                            onChange={(e) => set("payeRef", e.target.value)}
                            aria-invalid={!!errors.payeRef}
                          />
                        </Field>
                        <Field
                          id="accountsRef"
                          label="Accounts Office reference"
                          hint="Optional"
                        >
                          <Input
                            id="accountsRef"
                            placeholder="e.g. 123PA00123456"
                            value={values.accountsRef}
                            onChange={(e) => set("accountsRef", e.target.value)}
                          />
                        </Field>
                      </div>
                    </>
                  )}

                  {values.isRegistered === "no" && (
                    <div className="flex items-start gap-3 rounded-xl border border-notice-500/30 bg-notice-50 p-4">
                      <AlertCircle className="size-4 text-notice-700 shrink-0 mt-0.5" />
                      <p className="text-sm text-notice-700">
                        You'll need to register as an employer with HMRC before running payroll.
                        This usually takes 5 working days.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ── Section 3: New employee ── */}
              {activeSection === "employee" && (
                <div className="space-y-4">
                  {/* Personal details */}
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground -mb-1">
                    Personal details
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Field id="forename" label="Forename" error={errors.forename}>
                      <Input
                        id="forename"
                        placeholder="Please enter"
                        value={values.forename}
                        onChange={(e) => set("forename", e.target.value)}
                        aria-invalid={!!errors.forename}
                      />
                    </Field>
                    <Field id="surname" label="Surname" error={errors.surname}>
                      <Input
                        id="surname"
                        placeholder="Please enter"
                        value={values.surname}
                        onChange={(e) => set("surname", e.target.value)}
                        aria-invalid={!!errors.surname}
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field id="dob" label="Date of birth" hint="DD/MM/YYYY" error={errors.dob}>
                      <Input
                        id="dob"
                        placeholder="DD/MM/YYYY"
                        value={values.dob}
                        onChange={(e) => set("dob", e.target.value)}
                        aria-invalid={!!errors.dob}
                      />
                    </Field>
                    <Field id="ni" label="National Insurance number" error={errors.ni}>
                      <Input
                        id="ni"
                        placeholder="e.g. AB123456C"
                        value={values.ni}
                        onChange={(e) => set("ni", e.target.value.toUpperCase())}
                        aria-invalid={!!errors.ni}
                      />
                    </Field>
                  </div>

                  {/* Address */}
                  <div className="h-px bg-border" />
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground -mb-1">
                    Home address
                  </p>
                  <Field id="empAddr1" label="Address line 1">
                    <Input
                      id="empAddr1"
                      placeholder="Please enter"
                      value={values.empAddr1}
                      onChange={(e) => set("empAddr1", e.target.value)}
                    />
                  </Field>
                  <Field id="empAddr2" label="Address line 2" hint="Optional">
                    <Input
                      id="empAddr2"
                      placeholder="Please enter"
                      value={values.empAddr2}
                      onChange={(e) => set("empAddr2", e.target.value)}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field id="empTown" label="Town or city">
                      <Input
                        id="empTown"
                        placeholder="Please enter"
                        value={values.empTown}
                        onChange={(e) => set("empTown", e.target.value)}
                      />
                    </Field>
                    <Field id="empPostcode" label="Postcode">
                      <Input
                        id="empPostcode"
                        placeholder="e.g. SW1A 1AA"
                        value={values.empPostcode}
                        onChange={(e) => set("empPostcode", e.target.value.toUpperCase())}
                      />
                    </Field>
                  </div>

                  {/* Employment */}
                  <div className="h-px bg-border" />
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground -mb-1">
                    Employment details
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Field id="startDate" label="Start date" hint="DD/MM/YYYY" error={errors.startDate}>
                      <Input
                        id="startDate"
                        placeholder="DD/MM/YYYY"
                        value={values.startDate}
                        onChange={(e) => set("startDate", e.target.value)}
                        aria-invalid={!!errors.startDate}
                      />
                    </Field>
                    <Field id="employmentType" label="Employment type" error={errors.employmentType as string}>
                      <Select
                        value={values.employmentType}
                        onValueChange={(v) => set("employmentType", v)}
                      >
                        <SelectTrigger id="employmentType" aria-invalid={!!errors.employmentType}>
                          <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="casual">Casual / Zero hours</SelectItem>
                          <SelectItem value="agency">Agency worker</SelectItem>
                          <SelectItem value="director">Company director</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  {/* Pay */}
                  <div className="grid grid-cols-2 gap-4">
                    <Field id="payType" label="Pay frequency">
                      <Select
                        value={values.payType}
                        onValueChange={(v) => set("payType", v)}
                      >
                        <SelectTrigger id="payType">
                          <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="fortnightly">Fortnightly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field id="salary" label="Gross salary / rate" hint="£ per year or hour" error={errors.salary}>
                      <Input
                        id="salary"
                        placeholder="e.g. 32000"
                        value={values.salary}
                        onChange={(e) => set("salary", e.target.value)}
                        aria-invalid={!!errors.salary}
                      />
                    </Field>
                  </div>

                  {/* Tax */}
                  <div className="h-px bg-border" />
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground -mb-1">
                    Tax details
                  </p>
                  <Field id="taxCode" label="Tax code" hint="Leave blank to use 1257L">
                    <Input
                      id="taxCode"
                      placeholder="e.g. 1257L"
                      value={values.taxCode}
                      onChange={(e) => set("taxCode", e.target.value.toUpperCase())}
                      className="max-w-[160px]"
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Does this employee have a student loan?">
                      <YesNoToggle
                        value={values.studentLoan}
                        onChange={(v) => set("studentLoan", v)}
                      />
                    </Field>
                    <Field label="Is this their first job since 6 April?">
                      <YesNoToggle
                        value={values.firstJob}
                        onChange={(v) => set("firstJob", v)}
                      />
                    </Field>
                  </div>
                </div>
              )}

              {/* ── Section 4: Review ── */}
              {activeSection === "review" && (
                <div className="space-y-5">
                  <p className="text-sm text-muted-foreground">
                    Please review all details before submitting. You can go back to any section to make changes.
                  </p>

                  {/* Payroll address */}
                  <ReviewSection
                    title="Payroll address"
                    icon={Building2}
                    onEdit={() => setActiveSection("payroll")}
                    rows={[
                      { label: "Address", value: [values.addr1, values.addr2, values.town, values.postcode].filter(Boolean).join(", ") || "—" },
                    ]}
                  />

                  {/* Employer */}
                  <ReviewSection
                    title="Employer registration"
                    icon={Briefcase}
                    onEdit={() => setActiveSection("employer")}
                    rows={[
                      { label: "Registered employer", value: values.isRegistered === "yes" ? "Yes" : values.isRegistered === "no" ? "No" : "—" },
                      ...(values.isRegistered === "yes"
                        ? [
                            { label: "UTR", value: values.utr || "—" },
                            { label: "PAYE ref.", value: values.payeRef || "—" },
                          ]
                        : []),
                    ]}
                  />

                  {/* Employee */}
                  <ReviewSection
                    title="New employee"
                    icon={User}
                    onEdit={() => setActiveSection("employee")}
                    rows={[
                      { label: "Name", value: [values.forename, values.surname].filter(Boolean).join(" ") || "—" },
                      { label: "Date of birth", value: values.dob || "—" },
                      { label: "NI number", value: values.ni || "—" },
                      { label: "Start date", value: values.startDate || "—" },
                      { label: "Employment type", value: values.employmentType || "—" },
                      { label: "Salary", value: values.salary ? `£${values.salary}` : "—" },
                      { label: "Tax code", value: values.taxCode || "1257L (default)" },
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Navigation bar ── */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="size-4" />
            Back
          </Button>

          <Button type="button" onClick={handleNext} className="gap-2">
            {activeSection === "review" ? (
              <>
                Submit
                <Check className="size-4" />
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="size-4" />
              </>
            )}
          </Button>
        </div>

        {/* ── Support bar ── */}
        <SupportBar />
      </div>
    </div>
  );
}

/* ─── Review section card ────────────────────────────────────── */
function ReviewSection({
  title,
  icon: Icon,
  onEdit,
  rows,
}: {
  title: string;
  icon: React.ElementType;
  onEdit: () => void;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground" />
          <span className="text-sm text-foreground">{title}</span>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1 text-xs text-dp-500 dark:text-dp-300 hover:underline cursor-pointer"
        >
          <Pencil className="size-3" />
          Edit
        </button>
      </div>
      <div className="divide-y divide-border">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex items-start justify-between px-4 py-2.5 gap-4">
            <span className="text-xs text-muted-foreground shrink-0">{label}</span>
            <span className="text-xs text-foreground text-right">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Support bar ────────────────────────────────────────────── */
function SupportBar() {
  return (
    <div className="flex items-center justify-center gap-1.5 px-6 py-3 bg-mz-blue-50 dark:bg-mz-blue-900/20 border-t border-mz-blue-300/20">
      <HelpCircle className="size-3.5 text-mz-blue-500 shrink-0" />
      <p className="text-xs text-mz-blue-700 dark:text-mz-blue-300">
        Questions?{" "}
        <button
          type="button"
          className="font-medium underline underline-offset-2 hover:no-underline cursor-pointer inline-flex items-center gap-1"
        >
          Our Support Team is here to help
          <ExternalLink className="size-3" />
        </button>
      </p>
    </div>
  );
}
