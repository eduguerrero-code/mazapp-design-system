import { useParams, Navigate } from "react-router";
import { Badge } from "../components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

// Import all component examples
import ButtonExample from "../components/examples/ButtonExample";
import CardExample from "../components/examples/CardExample";
import InputExample from "../components/examples/InputExample";
import BadgeExample from "../components/examples/BadgeExample";
import AlertExample from "../components/examples/AlertExample";
import AccordionExample from "../components/examples/AccordionExample";
import AlertDialogExample from "../components/examples/AlertDialogExample";
import AvatarExample from "../components/examples/AvatarExample";
import CheckboxExample from "../components/examples/CheckboxExample";
import SelectExample from "../components/examples/SelectExample";
import SwitchExample from "../components/examples/SwitchExample";
import TabsExample from "../components/examples/TabsExample";
import TooltipExample from "../components/examples/TooltipExample";
import ProgressExample from "../components/examples/ProgressExample";
import SliderExample from "../components/examples/SliderExample";
import RadioGroupExample from "../components/examples/RadioGroupExample";
import TextareaExample from "../components/examples/TextareaExample";
import SeparatorExample from "../components/examples/SeparatorExample";
import TableExample from "../components/examples/TableExample";
import SkeletonExample from "../components/examples/SkeletonExample";
import InputOTPExample from "../components/examples/InputOTPExample";
import TaskCardExample from "../components/examples/TaskCardExample";
import CalendarExample from "../components/examples/CalendarExample";
import FormExample from "../components/examples/FormExample";
import ToggleExample from "../components/examples/ToggleExample";
import ToggleGroupExample from "../components/examples/ToggleGroupExample";
import BreadcrumbExample from "../components/examples/BreadcrumbExample";
import PaginationExample from "../components/examples/PaginationExample";
import DropdownMenuExample from "../components/examples/DropdownMenuExample";
import ChartExample from "../components/examples/ChartExample";
import DataTableExample from "../components/examples/DataTableExample";
import { StatusLabelExample } from "../components/examples/StatusLabelExample";
import LabelExample from "../components/examples/LabelExample";
import DialogExample from "../components/examples/DialogExample";
import PopoverExample from "../components/examples/PopoverExample";
import SonnerExample from "../components/examples/SonnerExample";
import CollapsibleExample from "../components/examples/CollapsibleExample";
import SheetExample from "../components/examples/SheetExample";
import AspectRatioExample from "../components/examples/AspectRatioExample";
import CommandExample from "../components/examples/CommandExample";
import HoverCardExample from "../components/examples/HoverCardExample";
import ContextMenuExample from "../components/examples/ContextMenuExample";
import ScrollAreaExample from "../components/examples/ScrollAreaExample";
import DrawerExample from "../components/examples/DrawerExample";
import MenubarExample from "../components/examples/MenubarExample";
import NavigationMenuExample from "../components/examples/NavigationMenuExample";
import CarouselExample from "../components/examples/CarouselExample";
import ResizableExample from "../components/examples/ResizableExample";
import SidebarExample from "../components/examples/SidebarExample";

const componentData: Record<string, {
  title: string;
  description: string;
  component: React.ComponentType;
  usage: string;
  props?: Array<{ name: string; type: string; default?: string; description: string }>;
  variants?: Array<{ name: string; description: string }>;
}> = {
  "button": {
    title: "Button",
    description: "Displays a button or a component that looks like a button.",
    component: ButtonExample,
    usage: `import { Button } from "./components/ui/button";

// Primary variants
<Button>Solid</Button>
<Button variant="outline">Outlined</Button>
<Button variant="ghost">Text Only</Button>

// Secondary variants
<Button variant="secondary">Solid</Button>
<Button variant="secondary-outline">Outlined</Button>
<Button variant="secondary-ghost">Text Only</Button>

// Main Action (CTA)
<Button variant="main-action">Get Started</Button>

// With icons
<Button><Download /> Download</Button>
<Button>Next <ArrowRight /></Button>
<Button size="icon"><Plus /></Button>`,
    variants: [
      { name: "default", description: "Primary solid — MDP-500 (#370E51) background, white text" },
      { name: "outline", description: "Primary outlined — MDP-500 border & text, transparent background" },
      { name: "ghost", description: "Primary text only — MDP-500 text, no border or background" },
      { name: "secondary", description: "Secondary solid — MazApp-Purple-500 (#7B08B5) background, white text" },
      { name: "secondary-outline", description: "Secondary outlined — MazApp-Purple-500 border & text" },
      { name: "secondary-ghost", description: "Secondary text only — MazApp-Purple-500 text, no border" },
      { name: "main-action", description: "Main action / CTA — MazApp-Blue-500 (#2E5AAC) background" },
      { name: "destructive", description: "Destructive — Negative-500 (#B00020) for dangerous actions" },
      { name: "link", description: "Styled as a hyperlink with underline on hover" },
    ],
    props: [
      { name: "variant", type: "string", default: "default", description: "Visual style variant (default | outline | ghost | secondary | secondary-outline | secondary-ghost | main-action | destructive | link)" },
      { name: "size", type: "string", default: "default", description: "Button size (sm | default | lg | icon | icon-sm | icon-lg)" },
      { name: "asChild", type: "boolean", default: "false", description: "Render as child element using Radix Slot" },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the button and reduces opacity" },
    ],
  },
  "card": {
    title: "Card",
    description: "Displays a card with header, content, and footer sections.",
    component: CardExample,
    usage: `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>`,
    props: [
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
  },
  "input": {
    title: "Input",
    description: "Text input with nine design-system states: Default, Focus, Filled, Error, Disabled, Read-only, Success, Loading, and Complete — all driven by CSS-variable tokens so states update globally from theme.css.",
    component: InputExample,
    usage: `import { Input } from "./components/ui/input";
import { Label, LabelHint } from "./components/ui/label";

// Default — transparent fill, grey placeholder
<Label htmlFor="name">Account holder name</Label>
<Input id="name" placeholder="Please enter" />

// Filled — user input shown in charcoal (#121212)
<Input id="filled" value="Laura Miller" onChange={...} />

// Error — aria-invalid drives red border + ring
<Input id="email" aria-invalid placeholder="Please enter" />
<p className="text-xs text-negative-700">
  Please enter a valid email address
</p>

// Read-only — muted fill, lock cursor, non-editable
<Input id="sort" defaultValue="04 - 00 - 04" readOnly />

// Disabled — 50% opacity, pointer-events blocked
<Input id="acct" placeholder="Not available" disabled />

// Success — override border + ring, add trailing icon
<div className="relative">
  <Input
    id="utr"
    defaultValue="1234567890"
    className="border-positive-500 ring-[3px] ring-positive-500/20 pr-10"
  />
  <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-positive-500 pointer-events-none" />
</div>

// Loading — spinner icon + mz-blue ring
<div className="relative">
  <Input
    id="crn"
    defaultValue="12345678"
    className="border-mz-blue-300 ring-[3px] ring-mz-blue-300/20 pr-10"
    readOnly
  />
  <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-mz-blue-500 animate-spin pointer-events-none" />
</div>

// Complete — positive tint fill + locked
<div className="relative">
  <Input
    id="ni"
    defaultValue="AB 12 34 56 C"
    readOnly
    className="border-positive-500 ring-[3px] ring-positive-500/20
               bg-positive-50/60 read-only:bg-positive-50/60 pr-10"
  />
  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-positive-600 pointer-events-none" />
</div>

// Label hint — secondary context beside the label
<Label htmlFor="swift">
  SWIFT <LabelHint>International payments only</LabelHint>
</Label>
<Input id="swift" placeholder="e.g. NWBKGB2L" />`,
    variants: [
      { name: "Default",   description: "Transparent fill · grey-500 placeholder · charcoal text on input — the base resting state." },
      { name: "Focus",     description: "border-mz-purple-500 + ring-mz-purple-500/20 at ring-[3px] — driven by :focus-visible." },
      { name: "Filled",    description: "Same transparent fill as Default; text-foreground (charcoal #121212) renders the user's value." },
      { name: "Error",     description: "aria-invalid attr triggers border-negative-500 + ring-negative-500/20. Pair with an error message below." },
      { name: "Disabled",  description: "disabled prop sets opacity-50 + pointer-events-none; placeholder text remains at grey-500." },
      { name: "Read-only", description: "readOnly prop adds bg-muted/40 + cursor-default. Pair with a trailing Lock icon for clarity." },
      { name: "Success",   description: "Optional — border-positive-500 + ring-positive-500/20 + trailing Check icon confirms validated value." },
      { name: "Loading",   description: "Optional — border-mz-blue-300 + ring-mz-blue-300/20 + trailing Loader2 (animate-spin) during async check." },
      { name: "Complete",  description: "Optional — positive-50/60 fill + border-positive-500 + Lock icon. Read-only field accepted after submission." },
    ],
    props: [
      { name: "placeholder",  type: "string",   description: "Greyed hint text shown when the field is empty (text-grey-500)" },
      { name: "value",        type: "string",   description: "Controlled value — renders in charcoal (text-foreground)" },
      { name: "defaultValue", type: "string",   description: "Uncontrolled initial value" },
      { name: "readOnly",     type: "boolean",  default: "false",  description: "Adds bg-muted/40 + cursor-default; value is visible but not editable" },
      { name: "disabled",     type: "boolean",  default: "false",  description: "Applies opacity-50 + pointer-events-none" },
      { name: "aria-invalid", type: "boolean",  description: "Triggers error state: border-negative-500 + ring-negative-500/20" },
      { name: "className",    type: "string",   description: "Override or extend — use design-system tokens (border-positive-500, ring-mz-blue-300/20, etc.) to add optional states" },
      { name: "type",         type: "string",   default: "text",   description: "HTML input type — text | email | password | number | tel | url | search" },
    ],
  },
  "badge": {
    title: "Badge",
    description: "Displays a badge or a component that looks like a badge.",
    component: BadgeExample,
    usage: `import { Badge } from "./components/ui/badge";

<Badge>Badge</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>`,
    variants: [
      { name: "default", description: "Primary badge with solid background" },
      { name: "secondary", description: "Secondary badge style" },
      { name: "destructive", description: "For errors or warnings" },
      { name: "outline", description: "Badge with border only" },
    ],
    props: [
      { name: "variant", type: "string", default: "default", description: "Visual style variant" },
    ],
  },
  "status-label": {
    title: "Status Label",
    description: "Status label/tag component for displaying process states with colors, icons, and optional remove button. Supports completed, failed, excluded, pending, and corrected states.",
    component: StatusLabelExample,
    usage: `import { StatusLabel } from "./components/ui/status-label";

// Basic status labels
<StatusLabel variant="completed">Completed</StatusLabel>
<StatusLabel variant="failed">Failed</StatusLabel>
<StatusLabel variant="excluded">Excluded</StatusLabel>
<StatusLabel variant="pending">Pending</StatusLabel>
<StatusLabel variant="corrected">Corrected</StatusLabel>

// With icons
<StatusLabel variant="completed" showIcon>Completed</StatusLabel>
<StatusLabel variant="failed" showIcon>Failed</StatusLabel>

// Removable
<StatusLabel variant="pending" removable onRemove={() => handleRemove()}>
  Pending
</StatusLabel>

// Outline variants
<StatusLabel variant="completed-outline">Completed</StatusLabel>
<StatusLabel variant="failed-outline">Failed</StatusLabel>`,
    variants: [
      { name: "completed", description: "Success state with green background (positive-50)" },
      { name: "failed", description: "Error state with red background (negative-50)" },
      { name: "excluded", description: "Neutral/excluded state with grey background" },
      { name: "pending", description: "Pending/warning state with orange background (warning-50)" },
      { name: "corrected", description: "Corrected state with purple background (mz-purple-50)" },
      { name: "neutral", description: "Generic neutral state" },
      { name: "*-outline", description: "Outline variants for each status (e.g., completed-outline, failed-outline)" },
    ],
    props: [
      { name: "variant", type: "string", default: "neutral", description: "Status variant - completed | failed | excluded | pending | corrected | neutral | *-outline" },
      { name: "showIcon", type: "boolean", default: "false", description: "Display status icon (check, X, warning, etc.)" },
      { name: "removable", type: "boolean", default: "false", description: "Show remove/close button" },
      { name: "onRemove", type: "() => void", description: "Callback when remove button is clicked" },
      { name: "children", type: "ReactNode", description: "Label text content" },
    ],
  },
  "alert": {
    title: "Alert",
    description: "Displays a callout for user attention.",
    component: AlertExample,
    usage: `import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app.
  </AlertDescription>
</Alert>`,
    variants: [
      { name: "default", description: "Default informational alert" },
      { name: "destructive", description: "For errors and warnings" },
    ],
  },
  "accordion": {
    title: "Accordion",
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
    component: AccordionExample,
    usage: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/ui/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  "alert-dialog": {
    title: "Alert Dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
    component: AlertDialogExample,
    usage: `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "./components/ui/alert-dialog";

<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  },
  "avatar": {
    title: "Avatar",
    description: "An image element with a fallback for representing the user.",
    component: AvatarExample,
    usage: `import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
  },
  "checkbox": {
    title: "Checkbox",
    description: "A control that allows the user to toggle between checked and not checked.",
    component: CheckboxExample,
    usage: `import { Checkbox } from "./components/ui/checkbox";

<Checkbox id="terms" />
<label htmlFor="terms">Accept terms and conditions</label>`,
  },
  "select": {
    title: "Select",
    description: "Dropdown select aligned to the Input component — transparent fill, grey-200 border, mz-purple-500 focus ring, and aria-invalid error state. Supports Default, Focus, Filled, Error, Disabled, Read-only, Success, grouped options, and label hints.",
    component: SelectExample,
    usage: `import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectSeparator, SelectTrigger, SelectValue,
} from "./components/ui/select";
import { Label, LabelHint } from "./components/ui/label";

// Default — transparent fill, grey placeholder
<Label htmlFor="type">Employment type</Label>
<Select>
  <SelectTrigger id="type">
    <SelectValue placeholder="Please select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="full-time">Full-time</SelectItem>
    <SelectItem value="part-time">Part-time</SelectItem>
  </SelectContent>
</Select>

// Error — aria-invalid drives red border + ring
<Select>
  <SelectTrigger aria-invalid>
    <SelectValue placeholder="Please select" />
  </SelectTrigger>
  ...
</Select>
<p className="text-xs text-negative-700">
  Please select a document type to continue
</p>

// Disabled
<Select disabled>
  <SelectTrigger><SelectValue placeholder="Not available" /></SelectTrigger>
  ...
</Select>

// Read-only — pointer-events-none + muted fill + Lock icon
<div className="relative">
  <Select value="gbp">
    <SelectTrigger
      className="pointer-events-none bg-muted/40 cursor-default text-muted-foreground pr-10"
      tabIndex={-1}
    >
      <SelectValue />
    </SelectTrigger>
    ...
  </Select>
  <Lock className="absolute right-9 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
</div>

// Success — override border + ring
<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="border-positive-500 ring-[3px] ring-positive-500/20">
    <SelectValue />
  </SelectTrigger>
  ...
</Select>

// Grouped options
<Select>
  <SelectTrigger><SelectValue placeholder="Please select" /></SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Income</SelectLabel>
      <SelectItem value="invoice">Sales invoice</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Expenses</SelectLabel>
      <SelectItem value="receipt">Receipt</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

// With label hint
<Label htmlFor="tax">
  Tax code <LabelHint>Leave blank to use 1257L</LabelHint>
</Label>
<Select>
  <SelectTrigger id="tax"><SelectValue placeholder="Please select" /></SelectTrigger>
  ...
</Select>`,
    variants: [
      { name: "Default",   description: "Transparent fill · grey-500 placeholder · grey-200 border — resting state, mirrors Input." },
      { name: "Focus",     description: "border-mz-purple-500 + ring-[3px] ring-mz-purple-500/20 on :focus-visible — identical to Input." },
      { name: "Filled",    description: "A value is selected; text-foreground (charcoal #121212) renders the chosen option." },
      { name: "Error",     description: "aria-invalid triggers border-negative-500 + ring-negative-500/20. Pair with an error message below." },
      { name: "Disabled",  description: "disabled prop — opacity-50 + pointer-events-none, matching Input disabled." },
      { name: "Read-only", description: "No native readOnly — apply pointer-events-none + bg-muted/40 + tabIndex={-1} + Lock icon." },
      { name: "Success",   description: "Optional — border-positive-500 + ring-positive-500/20 + CheckCircle2 confirmation message." },
      { name: "Grouped",   description: "SelectGroup + SelectLabel + SelectSeparator for categorised option lists." },
    ],
    props: [
      { name: "value",          type: "string",             description: "Controlled selected value" },
      { name: "defaultValue",   type: "string",             description: "Uncontrolled initial value" },
      { name: "onValueChange",  type: "(value: string) => void", description: "Callback when selection changes" },
      { name: "disabled",       type: "boolean", default: "false", description: "Disables the trigger — opacity-50 + pointer-events-none" },
      { name: "aria-invalid",   type: "boolean",            description: "On SelectTrigger — triggers border-negative-500 + ring-negative-500/20" },
      { name: "size",           type: "'default' | 'sm'", default: "'default'", description: "Trigger height — default h-11, sm h-8" },
      { name: "className",      type: "string",             description: "Override on SelectTrigger — use design tokens (border-positive-500, bg-muted/40, etc.) to set optional states" },
    ],
  },
  "switch": {
    title: "Switch",
    description: "A control that allows the user to toggle between checked and not checked.",
    component: SwitchExample,
    usage: `import { Switch } from "./components/ui/switch";

<Switch id="airplane-mode" />
<label htmlFor="airplane-mode">Airplane Mode</label>`,
  },
  "tabs": {
    title: "Tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    component: TabsExample,
    usage: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content</TabsContent>
  <TabsContent value="password">Password content</TabsContent>
</Tabs>`,
  },
  "tooltip": {
    title: "Tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    component: TooltipExample,
    usage: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  },
  "progress": {
    title: "Progress",
    description: "Displays an indicator showing the completion progress of a task.",
    component: ProgressExample,
    usage: `import { Progress } from "./components/ui/progress";

<Progress value={60} />`,
    props: [
      { name: "value", type: "number", description: "Progress value (0-100)" },
    ],
  },
  "slider": {
    title: "Slider",
    description: "An input where the user selects a value from within a given range.",
    component: SliderExample,
    usage: `import { Slider } from "./components/ui/slider";

<Slider defaultValue={[50]} max={100} step={1} />`,
  },
  "radio-group": {
    title: "Radio Group",
    description: "A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.",
    component: RadioGroupExample,
    usage: `import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";

<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <label htmlFor="option-one">Option One</label>
  </div>
</RadioGroup>`,
  },
  "textarea": {
    title: "Textarea",
    description: "Displays a form textarea field.",
    component: TextareaExample,
    usage: `import { Textarea } from "./components/ui/textarea";

<Textarea placeholder="Type your message here." />`,
  },
  "separator": {
    title: "Separator",
    description: "Visually or semantically separates content.",
    component: SeparatorExample,
    usage: `import { Separator } from "./components/ui/separator";

<Separator />
<Separator orientation="vertical" />`,
  },
  "table": {
    title: "Table",
    description: "A data table with a detached header bar and body container, row-level checkboxes, sortable column headers, OCR status badges, action buttons, and kebab menus — matching the MazApp document management pattern.",
    component: TableExample,
    usage: `import { Checkbox } from "./components/ui/checkbox";
import { ArrowDown, MoreVertical, CheckCircle2, Clock } from "lucide-react";

{/* Detached header bar */}
<div className="rounded-xl bg-grey-blue-500 border border-grey-200">
  <table className="w-full text-sm">
    <thead>
      <tr>
        <th className="px-4 py-2.5 w-[52px]">
          <Checkbox aria-label="Select all" />
        </th>
        <th className="px-4 py-2.5 text-left text-xs uppercase">
          <button className="inline-flex items-center gap-1">
            Doc. Date <ArrowDown className="size-3 text-mz-purple-500" />
          </button>
        </th>
        <th className="px-4 py-2.5 text-left text-xs uppercase">Description</th>
        <th className="px-4 py-2.5 text-left text-xs uppercase">Document Type</th>
        <th className="px-4 py-2.5 text-left text-xs uppercase">OCR Status</th>
        <th className="px-4 py-2.5 text-left text-xs uppercase">Sugg. Action</th>
        <th className="px-4 py-2.5 w-[44px]">
          <MoreVertical className="size-4 text-mz-purple-500" />
        </th>
      </tr>
    </thead>
  </table>
</div>

{/* Detached body container */}
<div className="rounded-xl bg-card border border-grey-200 overflow-hidden mt-2">
  <table className="w-full text-sm">
    <tbody>
      <tr className="border-b border-grey-200 hover:bg-grey-blue-500/50">
        <td className="px-4 py-3 w-[52px]"><Checkbox /></td>
        <td className="px-4 py-3 text-muted-foreground">31/03/25</td>
        <td className="px-4 py-3">Invoice-157</td>
        <td className="px-4 py-3">
          <span className="text-muted-foreground">Sales &gt; </span>
          <span>Sales invoice</span>
        </td>
        <td className="px-4 py-3">
          <CheckCircle2 className="size-4 text-positive-500 inline" /> COMPLETE
        </td>
        <td className="px-4 py-3">
          <button className="px-3 py-1.5 rounded-lg border text-xs">View</button>
        </td>
        <td className="px-4 py-3 w-[44px]">
          <MoreVertical className="size-4" />
        </td>
      </tr>
    </tbody>
  </table>
</div>`,
    props: [
      { name: "className", type: "string", description: "Additional CSS classes for the table element" },
    ],
  },
  "skeleton": {
    title: "Skeleton",
    description: "Use to show a placeholder while content is loading.",
    component: SkeletonExample,
    usage: `import { Skeleton } from "./components/ui/skeleton";

<Skeleton className="w-12 h-12 rounded-full" />
<Skeleton className="h-4 w-64" />`,
  },
  "input-otp": {
    title: "Input OTP",
    description: "A one-time password input with individually focusable slots, separator support, and MazApp-styled purple focus rings — built on top of input-otp.",
    component: InputOTPExample,
    usage: `import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./components/ui/input-otp";

// 6-digit OTP (MazApp style)
<InputOTP maxLength={6} value={otp} onChange={setOtp}>
  <InputOTPGroup className="gap-3">
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <InputOTPSlot
        key={i}
        index={i}
        className="!size-12 !rounded-xl !border !border-grey-200
          data-[active=true]:!border-mz-purple-500
          data-[active=true]:!ring-mz-purple-500/25"
      />
    ))}
  </InputOTPGroup>
</InputOTP>

// With separator (3 + 3)
<InputOTP maxLength={6}>
  <InputOTPGroup className="gap-3">
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup className="gap-3">
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    props: [
      { name: "maxLength", type: "number", description: "Maximum number of characters (slots) the input accepts" },
      { name: "value", type: "string", description: "Controlled OTP value" },
      { name: "onChange", type: "(value: string) => void", description: "Callback fired when the OTP value changes" },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the input and reduces opacity" },
      { name: "containerClassName", type: "string", description: "Additional CSS classes for the outer container div" },
    ],
  },
  "task-card": {
    title: "Task Card",
    description: "An actionable card for prioritised task items with 4 severity levels (frozen, critical, warning, info), status badges, optional timeline dots, and a chevron action — extracted from the My Tasks pattern.",
    component: TaskCardExample,
    usage: `import { TaskCard } from "./components/task-card";
import { TaskList } from "./components/task-list";

// Single card with severity + badge
<TaskCard
  severity="frozen"
  title="We've updated your contract — please review and sign"
  subtitle="Your account is frozen until this action is taken"
  badgeVariant="act-now"
  onClick={() => console.log("clicked")}
/>

// With timeline dot
<TaskCard
  severity="critical"
  title="We need more information about a document you uploaded"
  subtitle="Due on 30th of August"
  badgeVariant="overdue"
  timelineDot
/>

// Days-left badge with custom label
<TaskCard
  severity="warning"
  title="Update UTR before 13th of September"
  subtitle="Due on 13th September"
  badgeVariant="days-left"
  badgeLabel="13 DAYS LEFT"
/>

// Wrapped in a TaskList container
<TaskList title="My tasks" tabs={[{ label: "To do", count: 3 }, { label: "Done" }]}>
  <TaskCard severity="frozen" title="..." badgeVariant="act-now" />
  <TaskCard severity="critical" title="..." badgeVariant="overdue" />
  <TaskCard severity="info" title="..." />
</TaskList>`,
    variants: [
      { name: "frozen", description: "Purple Ban icon, mz-purple-300/40 border — account is blocked until action is taken" },
      { name: "critical", description: "Red CircleAlert icon, negative-500/30 border — overdue or storage-full situations" },
      { name: "warning", description: "Orange TriangleAlert icon, neutral border — upcoming deadline" },
      { name: "info", description: "No severity icon, default grey border — optional actions or feature suggestions" },
    ],
    props: [
      { name: "severity", type: "'frozen' | 'critical' | 'warning' | 'info'", description: "Controls the left icon and border colour accent" },
      { name: "title", type: "string", description: "Primary text displayed in the card" },
      { name: "subtitle", type: "string", description: "Secondary description text below the title" },
      { name: "badgeVariant", type: "'act-now' | 'overdue' | 'upgrade' | 'days-left' | 'none'", default: "none", description: "Status badge shown to the right of the text" },
      { name: "badgeLabel", type: "string", description: "Custom label for the badge (e.g. '13 DAYS LEFT')" },
      { name: "showChevron", type: "boolean", default: "true", description: "Show the right-side chevron button" },
      { name: "timelineDot", type: "boolean", default: "false", description: "Show a blue dot on the right edge for timeline grouping" },
      { name: "onClick", type: "() => void", description: "Click handler for the entire card" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
  },
  "task-list": {
    title: "Task List",
    description: "A container component for TaskCards with a header bar featuring a back button, icon, title with active indicator, segmented To do / Done tabs with counts, and a filter button.",
    component: TaskCardExample,
    usage: `import { TaskList } from "./components/task-list";
import { TaskCard } from "./components/task-card";

<TaskList
  title="My tasks"
  showActiveDot
  tabs={[{ label: "To do", count: 9 }, { label: "Done" }]}
  showFilter
  onBack={() => navigate(-1)}
>
  <TaskCard severity="frozen" title="Review contract" badgeVariant="act-now" />
  <TaskCard severity="critical" title="Upload documents" badgeVariant="overdue" />
  <TaskCard severity="info" title="Try Open Banking" />
</TaskList>`,
    props: [
      { name: "title", type: "string", default: "My tasks", description: "Title displayed next to the icon" },
      { name: "showActiveDot", type: "boolean", default: "true", description: "Green dot indicating the task list is active" },
      { name: "tabs", type: "{ label: string; count?: number }[]", description: "Segmented tab definitions — first tab is selected by default" },
      { name: "showFilter", type: "boolean", default: "true", description: "Show the filter (sliders) icon button" },
      { name: "onBack", type: "() => void", description: "Handler for the back arrow button" },
      { name: "children", type: "ReactNode", description: "TaskCard components to render in the list" },
      { name: "className", type: "string", description: "Additional CSS classes for the outer wrapper" },
    ],
  },
  "calendar": {
    title: "Calendar",
    description: "A calendar component for selecting dates, with support for single and multiple date selection, date ranges, and custom event markers.",
    component: CalendarExample,
    usage: `import { Calendar } from "./components/ui/calendar";

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`,
    props: [
      { name: "mode", type: "'single' | 'multiple' | 'range'", default: "'single'", description: "Selection mode for the calendar" },
      { name: "selected", type: "Date | Date[] | { from: Date; to: Date }", description: "Currently selected date(s)" },
      { name: "onSelect", type: "(date: Date | Date[] | { from: Date; to: Date }) => void", description: "Callback fired when a date is selected" },
      { name: "className", type: "string", description: "Additional CSS classes for the calendar" },
    ],
  },
  "form": {
    title: "Form",
    description: "A multi-step employee payroll form with section navigation, validation, review, and a support footer — styled to match the MazApp Settings › Business Details › Payroll design pattern.",
    component: FormExample,
    usage: `import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./components/ui/select";

// ── Progress bar ──
<div className="h-1 bg-muted">
  <div className="h-full bg-primary" style={{ width: \`\${progress}%\` }} />
</div>

// ── Two-column layout: section nav + form fields ──
<div className="flex min-h-[480px]">
  {/* Left section nav */}
  <div className="w-48 border-r border-border bg-muted/20 py-4 px-2">
    {sections.map((s, i) => (
      <button key={s.id} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl">
        <span className="size-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
          {completed ? <Check className="size-3.5" /> : i + 1}
        </span>
        <span className="text-sm">{s.label}</span>
      </button>
    ))}
  </div>

  {/* Right form panel */}
  <div className="flex-1 px-6 py-5 space-y-4">
    <Label htmlFor="forename">Forename</Label>
    <Input id="forename" placeholder="Please enter" />

    <Label htmlFor="dob">Date of birth</Label>
    <Input id="dob" placeholder="DD/MM/YYYY" />

    {/* Yes / No toggle */}
    <div className="inline-flex rounded-lg border border-border overflow-hidden">
      <button className="px-5 py-2 bg-primary text-primary-foreground text-sm">Yes</button>
      <button className="px-5 py-2 bg-card text-foreground text-sm hover:bg-muted">No</button>
    </div>
  </div>
</div>

// ── Navigation footer ──
<div className="flex justify-between px-6 py-4 border-t border-border bg-muted/20">
  <Button variant="ghost"><ChevronLeft /> Back</Button>
  <Button>Continue <ChevronRight /></Button>
</div>

// ── Support bar ──
<div className="flex items-center gap-1.5 px-6 py-3 bg-mz-blue-50 border-t border-mz-blue-300/20">
  <HelpCircle className="size-3.5 text-mz-blue-500" />
  <p className="text-xs text-mz-blue-700">
    Questions? <a className="font-medium underline">Our Support Team is here to help</a>
  </p>
</div>`,
    variants: [
      { name: "Payroll address", description: "Address fields with postcode — Section 1 of the payroll wizard" },
      { name: "Employer registration", description: "Yes/No toggle for HMRC registration, UTR and PAYE ref fields" },
      { name: "New employee", description: "Personal details, home address, employment type, salary, and tax code" },
      { name: "Review & submit", description: "Read-only summary of all sections with per-section edit links" },
    ],
    props: [
      { name: "forename / surname", type: "string", description: "Employee personal name fields" },
      { name: "dob", type: "string", description: "Date of birth in DD/MM/YYYY format" },
      { name: "ni", type: "string", description: "National Insurance number — auto-uppercased" },
      { name: "isRegistered", type: "'yes' | 'no' | ''", description: "Whether the employer is registered with HMRC" },
      { name: "utr", type: "string", description: "Unique Taxpayer Reference — 10 digit numeric" },
      { name: "employmentType", type: "string", description: "Full-time | Part-time | Casual | Agency | Director" },
      { name: "studentLoan / firstJob", type: "'yes' | 'no' | ''", description: "Yes/No toggles for tax-related flags" },
    ],
  },
  "toggle": {
    title: "Toggle",
    description: "A two-state button built on Radix UI Toggle — transparent fill at rest, mz-purple-50 fill with mz-purple-500 border and text when active. Supports Default and Outline variants, three sizes, and works standalone or inside a ToggleGroup.",
    component: ToggleExample,
    usage: `import { Toggle } from "./components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

// Standalone toggle (default variant — no border at rest)
<Toggle aria-label="Bold"><Bold /> Bold</Toggle>

// Outline variant — grey-200 border at rest
<Toggle variant="outline" aria-label="Italic"><Italic /></Toggle>

// Controlled pressed state
<Toggle variant="outline" pressed={isOn} onPressedChange={setIsOn}>
  <Bold />
</Toggle>

// Disabled
<Toggle variant="outline" disabled aria-label="Bold"><Bold /></Toggle>

// Sizes
<Toggle size="sm" variant="outline" aria-label="Bold"><Bold /></Toggle>
<Toggle size="default" variant="outline" aria-label="Bold"><Bold /></Toggle>
<Toggle size="lg" variant="outline" aria-label="Bold"><Bold /></Toggle>

// ToggleGroup — multiple (independent toggles, like formatting)
<ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting} variant="outline">
  <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
</ToggleGroup>

// ToggleGroup — single (mutually exclusive, like alignment)
<ToggleGroup type="single" value={align} onValueChange={(v) => v && setAlign(v)} variant="outline">
  <ToggleGroupItem value="left" aria-label="Left"><AlignLeft /></ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Center"><AlignCenter /></ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Right"><AlignRight /></ToggleGroupItem>
</ToggleGroup>`,
    variants: [
      { name: "default", description: "No border at rest. Subtle muted hover tint; active state uses mz-purple-50 fill + mz-purple-500 text." },
      { name: "outline", description: "grey-200 border at rest; hover fills grey-blue-500. Recommended for toolbars alongside Input fields." },
    ],
    props: [
      { name: "variant", type: "'default' | 'outline'", default: "'default'", description: "Visual style — default has no border at rest; outline shows a grey-200 border" },
      { name: "size", type: "'sm' | 'default' | 'lg'", default: "'default'", description: "Height of the toggle — sm h-8, default h-9, lg h-10" },
      { name: "pressed", type: "boolean", description: "Controlled active/on state" },
      { name: "defaultPressed", type: "boolean", default: "false", description: "Uncontrolled initial pressed state" },
      { name: "onPressedChange", type: "(pressed: boolean) => void", description: "Callback fired when the pressed state changes" },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the toggle — opacity-50 + pointer-events-none" },
      { name: "aria-label", type: "string", description: "Accessible label — required when the toggle contains only an icon" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
  },
  "toggle-group": {
    title: "Toggle Group",
    description: "A set of Toggle buttons with shared variant and size context. Supports single (mutually exclusive) or multiple (independent) selection modes — ideal for formatting toolbars, alignment pickers, and view switchers.",
    component: ToggleGroupExample,
    usage: `import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from "lucide-react";

// Single — mutually exclusive (alignment picker)
const [align, setAlign] = useState("left");

<ToggleGroup
  type="single"
  value={align}
  onValueChange={(v) => v && setAlign(v)}
  variant="outline"
>
  <ToggleGroupItem value="left" aria-label="Left"><AlignLeft /></ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Center"><AlignCenter /></ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Right"><AlignRight /></ToggleGroupItem>
</ToggleGroup>

// Multiple — independent toggles (text formatting)
const [formatting, setFormatting] = useState<string[]>(["bold"]);

<ToggleGroup
  type="multiple"
  value={formatting}
  onValueChange={setFormatting}
  variant="outline"
>
  <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
</ToggleGroup>`,
    variants: [
      { name: "single", description: "type=\"single\" — at most one item active at a time; selecting another deactivates the previous" },
      { name: "multiple", description: "type=\"multiple\" — each item toggles independently; any number can be active simultaneously" },
    ],
    props: [
      { name: "type", type: "'single' | 'multiple'", description: "Selection mode — single for mutually exclusive choices, multiple for independent toggles" },
      { name: "value", type: "string | string[]", description: "Controlled selected value(s) — string for single, string[] for multiple" },
      { name: "onValueChange", type: "(value: string | string[]) => void", description: "Callback fired when the selection changes" },
      { name: "variant", type: "'default' | 'outline'", default: "'default'", description: "Passed to all ToggleGroupItems via context" },
      { name: "size", type: "'sm' | 'default' | 'lg'", default: "'default'", description: "Passed to all ToggleGroupItems via context" },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the entire group" },
      { name: "className", type: "string", description: "Additional CSS classes for the group wrapper" },
    ],
  },
  "breadcrumb": {
    title: "Breadcrumb",
    description: "A navigation trail showing the user's location within a hierarchy — built from composable sub-components: Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, and BreadcrumbEllipsis.",
    component: BreadcrumbExample,
    usage: `import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage,
  BreadcrumbSeparator, BreadcrumbEllipsis,
} from "./components/ui/breadcrumb";
import { Home } from "lucide-react";

// Default — ChevronRight separators
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

// With icons
<BreadcrumbLink href="#" className="inline-flex items-center gap-1.5">
  <Home className="size-3.5" /> Home
</BreadcrumbLink>

// Custom text separator
<BreadcrumbSeparator>
  <span className="text-muted-foreground">/</span>
</BreadcrumbSeparator>

// Collapsed with ellipsis
<BreadcrumbItem>
  <BreadcrumbEllipsis />
</BreadcrumbItem>

// Icon-only home link
<BreadcrumbLink href="#" aria-label="Home">
  <Home className="size-4" />
</BreadcrumbLink>`,
    variants: [
      { name: "Default", description: "ChevronRight separator between items. Links use text-muted-foreground; current page uses text-foreground." },
      { name: "With Icons", description: "Lucide icons paired with labels — Home, Settings, FolderOpen, FileText — improve scanability." },
      { name: "Text Separator", description: "Plain text character as separator — common for file-system or URL-style paths." },
      { name: "Ellipsis", description: "BreadcrumbEllipsis collapses middle levels — keeps deep hierarchies compact." },
      { name: "Icon-only Home", description: "Home link rendered as an icon-only anchor with aria-label — saves horizontal space." },
    ],
    props: [
      { name: "BreadcrumbLink href", type: "string", description: "URL for the breadcrumb link — renders as an anchor tag" },
      { name: "BreadcrumbLink asChild", type: "boolean", default: "false", description: "Render as child element using Radix Slot — useful for React Router <Link>" },
      { name: "BreadcrumbPage", type: "ReactNode", description: "Current page indicator — renders as a span with aria-current=\"page\" and text-foreground" },
      { name: "BreadcrumbSeparator children", type: "ReactNode", description: "Custom separator — defaults to ChevronRight; pass <Slash /> or text for alternatives" },
      { name: "BreadcrumbEllipsis", type: "—", description: "Renders a MoreHorizontal icon in a size-9 container — used to collapse middle breadcrumb levels" },
      { name: "className", type: "string", description: "Additional CSS classes on any sub-component" },
    ],
  },
  "pagination": {
    title: "Pagination",
    description: "A composable navigation component for paging through lists and data sets — built from Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, and PaginationEllipsis sub-components. Active page uses the outline button variant; inactive pages use ghost.",
    component: PaginationExample,
    usage: `import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationPrevious, PaginationNext,
  PaginationEllipsis,
} from "./components/ui/pagination";

// Default — numbered pages with Previous/Next
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

// With ellipsis for large page counts
<PaginationItem>
  <PaginationEllipsis />
</PaginationItem>

// Disabled Previous (first page)
<PaginationPrevious href="#" className="pointer-events-none opacity-50" />

// Disabled Next (last page)
<PaginationNext href="#" className="pointer-events-none opacity-50" />

// Compact — icon-only Previous/Next
<PaginationPrevious href="#" className="[&>span]:hidden px-2.5" />
<PaginationNext href="#" className="[&>span]:hidden px-2.5" />`,
    variants: [
      { name: "Default", description: "Numbered pages with Previous/Next — active page uses outline variant, inactive uses ghost." },
      { name: "With Ellipsis", description: "PaginationEllipsis collapses skipped page ranges with a MoreHorizontal icon." },
      { name: "First Page", description: "Previous is visually disabled with pointer-events-none and opacity-50." },
      { name: "Last Page", description: "Next is visually disabled — the last numbered page is the active item." },
      { name: "Simple", description: "Previous and Next only — no page numbers. Useful for step-by-step wizards." },
      { name: "Double Ellipsis", description: "Ellipsis on both sides — the current page sits in the middle of a large range." },
      { name: "Compact", description: "Icon-only Previous/Next using [&>span]:hidden — saves horizontal space in table footers." },
    ],
    props: [
      { name: "PaginationLink href", type: "string", description: "URL for the page link — renders as an anchor tag" },
      { name: "PaginationLink isActive", type: "boolean", default: "false", description: "Marks the current page — uses outline button variant and sets aria-current=\"page\"" },
      { name: "PaginationLink size", type: "'default' | 'icon'", default: "'icon'", description: "Button size — icon for page numbers, default for Previous/Next" },
      { name: "PaginationPrevious", type: "PaginationLinkProps", description: "Renders ChevronLeft + \"Previous\" label — extends PaginationLink" },
      { name: "PaginationNext", type: "PaginationLinkProps", description: "Renders \"Next\" label + ChevronRight — extends PaginationLink" },
      { name: "PaginationEllipsis", type: "ComponentProps<'span'>", description: "Renders a MoreHorizontal icon in a size-9 container — used to collapse skipped page ranges" },
      { name: "className", type: "string", description: "Additional CSS classes on any sub-component" },
    ],
  },
  "dropdown-menu": {
    title: "Dropdown Menu",
    description: "A composable menu component for displaying a list of actions or options — built from DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, and DropdownMenuPortal sub-components. Supports nested menus, keyboard navigation, and custom positioning.",
    component: DropdownMenuExample,
    usage: `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuPortal,
} from "./components/ui/dropdown-menu";

// Simple — single-level menu
<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// With labels and separators
<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// Nested — multi-level menu
<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <DropdownMenuTrigger>More</DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// Checkbox items
<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem>Remember me</DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>

// Radio items
<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
      <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`,
    variants: [
      { name: "Simple", description: "Single-level menu with a trigger and content — no labels or separators." },
      { name: "With Labels", description: "Add DropdownMenuLabel to group related items and improve accessibility." },
      { name: "With Separators", description: "Use DropdownMenuSeparator to visually divide sections of the menu." },
      { name: "Nested", description: "Embed DropdownMenuTrigger inside DropdownMenuItem to create multi-level menus." },
      { name: "Checkbox Items", description: "Add DropdownMenuCheckboxItem for toggleable options within the menu." },
      { name: "Radio Items", description: "Use DropdownMenuRadioGroup and DropdownMenuRadioItem for mutually exclusive choices." },
      { name: "Portal", description: "Render DropdownMenuContent in a separate portal to avoid clipping by parent containers." },
    ],
    props: [
      { name: "DropdownMenuTrigger", type: "ComponentProps<'button'>", description: "Renders a button that opens the menu — extends button props" },
      { name: "DropdownMenuContent", type: "ComponentProps<'div'>", description: "Renders a div containing the menu items — extends div props" },
      { name: "DropdownMenuItem", type: "ComponentProps<'button'>", description: "Renders a button for each menu item — extends button props" },
      { name: "DropdownMenuLabel", type: "ComponentProps<'div'>", description: "Renders a div for labels — extends div props" },
      { name: "DropdownMenuSeparator", type: "ComponentProps<'div'>", description: "Renders a div for separators — extends div props" },
      { name: "DropdownMenuCheckboxItem", type: "ComponentProps<'button'>", description: "Renders a button for checkbox items — extends button props" },
      { name: "DropdownMenuRadioGroup", type: "ComponentProps<'div'>", description: "Renders a div for radio groups — extends div props" },
      { name: "DropdownMenuRadioItem", type: "ComponentProps<'button'>", description: "Renders a button for radio items — extends button props" },
      { name: "DropdownMenuPortal", type: "ComponentProps<'div'>", description: "Renders a div for portals — extends div props" },
      { name: "className", type: "string", description: "Additional CSS classes on any sub-component" },
    ],
  },
  "chart": {
    title: "Chart",
    description: "A Recharts-powered area chart card with a header bar featuring a square sticky-note icon and large bold typographic toggle tabs (Notes | History) styled with dp-700 active / grey-500 inactive states, a gradient-filled dual-series area chart using chart-1 and chart-3 tokens, and a custom tooltip. This is the single source of truth for the chart used in the Notes & History pattern.",
    component: ChartExample,
    usage: `import ChartExample from "./components/examples/ChartExample";

// Standalone usage — renders a self-contained card
<ChartExample />

// Inside the Notes & History pattern
// ChartExample is imported and rendered above the notes table`,
    variants: [
      { name: "Default", description: "Dual-series area chart (Revenue + Expenses) with gradient fills, custom tooltip, and Notes | History header toggle." },
    ],
  },
  "data-table": {
    title: "Data Table",
    description: "A sortable data table with a detached floating header row, row-level checkboxes (shown on hover), avatar source column, truncated description text with optional status dots, pill-style type badges (Note / System / Complaint), and per-row kebab menus — all styled with design-system CSS variables. This is the single source of truth for the table used in the Notes & History pattern.",
    component: DataTableExample,
    usage: `import DataTableExample from "./components/examples/DataTableExample";

// Standalone usage — renders the full table
<DataTableExample />

// Inside the Notes & History pattern
// DataTableExample is imported and rendered below the chart`,
    variants: [
      { name: "Default", description: "Sortable table with floating header, alternating row backgrounds, hover checkboxes, avatar sources, type badges, status dots, and kebab action menus." },
    ],
    props: [
      { name: "SortHeader", type: "internal", description: "Column header button with sort-arrow indicator — active state shows a filled circle with directional arrow" },
      { name: "TypeBadge", type: "internal", description: "Pill badge for Note / System / Complaint — styled with border-grey-200 and design-system colour tokens" },
      { name: "Checkbox", type: "component", description: "Row-level and header-level select — appears on row hover or when any row is selected" },
      { name: "Avatar", type: "component", description: "Circular user avatar with image + fallback initials in the Source column" },
      { name: "DropdownMenu", type: "component", description: "Kebab menu per row (View details, Edit note, Delete) and header kebab (Manage columns, Export view)" },
    ],
  },
  "label": {
    title: "Label",
    description: "Form label component for associating text with inputs, checkboxes, radio buttons, and other form controls.",
    component: LabelExample,
    usage: `import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";

<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />`,
  },
  "dialog": {
    title: "Dialog",
    description: "Modal dialog component for important messages, forms, and user interactions that require focus.",
    component: DialogExample,
    usage: `import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./components/ui/dialog";
import { Button } from "./components/ui/button";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description goes here.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  "popover": {
    title: "Popover",
    description: "Popover overlay component for displaying rich content in a floating panel.",
    component: PopoverExample,
    usage: `import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { Button } from "./components/ui/button";

<Popover>
  <PopoverTrigger asChild>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Popover content goes here.</p>
  </PopoverContent>
</Popover>`,
  },
  "sonner": {
    title: "Sonner",
    description: "Toast notification system for displaying brief messages and alerts.",
    component: SonnerExample,
    usage: `import { toast } from "sonner";

toast("Event created successfully");
toast.success("Operation completed");
toast.error("Something went wrong");
toast.promise(promise, {
  loading: "Loading...",
  success: "Success!",
  error: "Failed",
});`,
  },
  "collapsible": {
    title: "Collapsible",
    description: "Component for creating expandable and collapsible content sections.",
    component: CollapsibleExample,
    usage: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/ui/collapsible";

<Collapsible>
  <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
  <CollapsibleContent>
    Hidden content goes here.
  </CollapsibleContent>
</Collapsible>`,
  },
  "sheet": {
    title: "Sheet",
    description: "Side sheet component that slides in from the edge of the screen.",
    component: SheetExample,
    usage: `import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./components/ui/sheet";

<Sheet>
  <SheetTrigger asChild>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
  },
  "aspect-ratio": {
    title: "Aspect Ratio",
    description: "Container component for maintaining a specific aspect ratio for content.",
    component: AspectRatioExample,
    usage: `import { AspectRatio } from "./components/ui/aspect-ratio";

<AspectRatio ratio={16 / 9}>
  <img src="image.jpg" alt="Image" />
</AspectRatio>`,
  },
  "command": {
    title: "Command",
    description: "Command menu component for keyboard-driven navigation and actions.",
    component: CommandExample,
    usage: `import { Command, CommandInput, CommandList, CommandItem } from "./components/ui/command";

<Command>
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandItem>Calendar</CommandItem>
    <CommandItem>Settings</CommandItem>
  </CommandList>
</Command>`,
  },
  "hover-card": {
    title: "Hover Card",
    description: "Card that appears on hover, useful for displaying additional information.",
    component: HoverCardExample,
    usage: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "./components/ui/hover-card";

<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>
    Additional information appears here.
  </HoverCardContent>
</HoverCard>`,
  },
  "context-menu": {
    title: "Context Menu",
    description: "Right-click context menu for providing contextual actions.",
    component: ContextMenuExample,
    usage: `import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./components/ui/context-menu";

<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Paste</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  },
  "scroll-area": {
    title: "Scroll Area",
    description: "Custom scrollable area with styled scrollbars.",
    component: ScrollAreaExample,
    usage: `import { ScrollArea } from "./components/ui/scroll-area";

<ScrollArea className="h-72 w-full">
  <div>Long content goes here...</div>
</ScrollArea>`,
  },
  "drawer": {
    title: "Drawer",
    description: "Drawer component that slides up from the bottom of the screen.",
    component: DrawerExample,
    usage: `import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./components/ui/drawer";

<Drawer>
  <DrawerTrigger>Open Drawer</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`,
  },
  "menubar": {
    title: "Menubar",
    description: "Application menubar component for desktop-style menus.",
    component: MenubarExample,
    usage: `import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "./components/ui/menubar";

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarItem>Open</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
  },
  "navigation-menu": {
    title: "Navigation Menu",
    description: "Multi-level navigation menu with dropdown support.",
    component: NavigationMenuExample,
    usage: `import { NavigationMenu, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "./components/ui/navigation-menu";

<NavigationMenu>
  <NavigationMenuItem>
    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
    <NavigationMenuContent>
      Navigation content
    </NavigationMenuContent>
  </NavigationMenuItem>
</NavigationMenu>`,
  },
  "carousel": {
    title: "Carousel",
    description: "Image and content carousel with navigation controls.",
    component: CarouselExample,
    usage: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./components/ui/carousel";

<Carousel>
  <CarouselContent>
    <CarouselItem>Item 1</CarouselItem>
    <CarouselItem>Item 2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  },
  "resizable": {
    title: "Resizable",
    description: "Resizable panel layouts with draggable handles.",
    component: ResizableExample,
    usage: `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./components/ui/resizable";

<ResizablePanelGroup direction="horizontal">
  <ResizablePanel>Panel 1</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Panel 2</ResizablePanel>
</ResizablePanelGroup>`,
  },
  "sidebar": {
    title: "Sidebar",
    description: "Application sidebar component for navigation.",
    component: SidebarExample,
    usage: `import { Sidebar, SidebarContent, SidebarGroup, SidebarProvider } from "./components/ui/sidebar";

<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      Navigation items
    </SidebarContent>
  </Sidebar>
</SidebarProvider>`,
  },
};

function CodeBlock({ code, onCopy }: { code: string; onCopy: () => void }) {
  const [justCopied, setJustCopied] = useState(false);
  
  const handleCopy = () => {
    onCopy();
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-[#0f1729] text-[#e2e8f0] p-4 rounded-xl overflow-x-auto text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white"
      >
        {justCopied ? <Check className="size-4 text-positive-500" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}

export default function ComponentPage() {
  const { componentName } = useParams<{ componentName: string }>();
  const [copied, setCopied] = useState(false);

  if (!componentName) {
    return <Navigate to="/" />;
  }

  const data = componentData[componentName];

  if (!data) {
    return (
      <div className="space-y-4">
        <h1>Component Not Found</h1>
        <p className="text-muted-foreground">
          The component "{componentName}" doesn't have documentation yet.
        </p>
      </div>
    );
  }

  const ExampleComponent = data.component;

  const handleCopy = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn("Clipboard API not available:", error);
      // Fallback: still show the copied state even if clipboard fails
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge className="mb-3 bg-dp-100 text-dp-500 dark:bg-mz-purple-900 dark:text-mz-purple-300 border-dp-300/20">
          Component
        </Badge>
        <h1 className="mb-2">{data.title}</h1>
        <p className="text-muted-foreground">{data.description}</p>
      </div>

      {/* Example */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Preview</CardTitle>
            <Badge variant="outline" className="text-xs">Interactive</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px] flex items-center justify-center p-4 bg-muted/30 rounded-lg">
            <div className="w-full">
              <ExampleComponent />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Usage, Props, etc. */}
      <Tabs defaultValue="usage">
        <TabsList>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          {data.props && <TabsTrigger value="props">API</TabsTrigger>}
          {data.variants && <TabsTrigger value="variants">Variants</TabsTrigger>}
        </TabsList>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Code Example</CardTitle>
              <CardDescription>
                Copy and paste into your project to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={data.usage}
                onCopy={() => handleCopy(data.usage)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {data.props && (
          <TabsContent value="props">
            <Card>
              <CardHeader>
                <CardTitle>Props</CardTitle>
                <CardDescription>
                  Available props for the {data.title} component.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.props.map((prop, index) => (
                    <div key={prop.name}>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <code className="font-mono text-sm font-medium">
                              {prop.name}
                            </code>
                            <Badge variant="outline" className="text-xs">
                              {prop.type}
                            </Badge>
                            {prop.default && (
                              <Badge variant="secondary" className="text-xs">
                                default: {prop.default}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {prop.description}
                          </p>
                        </div>
                      </div>
                      {index < data.props!.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {data.variants && (
          <TabsContent value="variants">
            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>
                  Available variants for the {data.title} component.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.variants.map((variant, index) => (
                    <div key={variant.name}>
                      <div className="mb-2">
                        <code className="font-mono text-sm font-medium">
                          {variant.name}
                        </code>
                        <p className="text-sm text-muted-foreground mt-1">
                          {variant.description}
                        </p>
                      </div>
                      {index < data.variants!.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}