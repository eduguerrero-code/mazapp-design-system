import { Button } from "../ui/button";
import { ArrowRight, Download, Mail, Loader2, ChevronRight, Plus } from "lucide-react";

export default function ButtonExample() {
  return (
    <div className="w-full space-y-10">
      {/* ── Primary ── */}
      <Section title="Primary">
        <Row label="Solid">
          <Button size="lg">Button</Button>
          <Button>Button</Button>
          <Button size="sm">Button</Button>
        </Row>
        <Row label="Outlined">
          <Button variant="outline" size="lg">Button</Button>
          <Button variant="outline">Button</Button>
          <Button variant="outline" size="sm">Button</Button>
        </Row>
        <Row label="Text Only">
          <Button variant="ghost" size="lg">Button</Button>
          <Button variant="ghost">Button</Button>
          <Button variant="ghost" size="sm">Button</Button>
        </Row>
      </Section>

      {/* ── Secondary ── */}
      <Section title="Secondary">
        <Row label="Solid">
          <Button variant="secondary" size="lg">Button</Button>
          <Button variant="secondary">Button</Button>
          <Button variant="secondary" size="sm">Button</Button>
        </Row>
        <Row label="Outlined">
          <Button variant="secondary-outline" size="lg">Button</Button>
          <Button variant="secondary-outline">Button</Button>
          <Button variant="secondary-outline" size="sm">Button</Button>
        </Row>
        <Row label="Text Only">
          <Button variant="secondary-ghost" size="lg">Button</Button>
          <Button variant="secondary-ghost">Button</Button>
          <Button variant="secondary-ghost" size="sm">Button</Button>
        </Row>
      </Section>

      {/* ── With Icons ── */}
      <Section title="With Icons">
        <Row label="Icon Right">
          <Button>Button <ArrowRight /></Button>
          <Button variant="outline">Button <ChevronRight /></Button>
          <Button variant="secondary">Button <ArrowRight /></Button>
          <Button variant="secondary-outline">Button <ChevronRight /></Button>
        </Row>
        <Row label="Icon Left">
          <Button><Download /> Button</Button>
          <Button variant="outline"><Download /> Button</Button>
          <Button variant="secondary"><Download /> Button</Button>
          <Button variant="secondary-outline"><Download /> Button</Button>
        </Row>
        <Row label="Icon Both">
          <Button><Mail /> Button <ArrowRight /></Button>
          <Button variant="secondary"><Mail /> Button <ArrowRight /></Button>
        </Row>
        <Row label="Icon Solo">
          <Button size="icon-lg"><Plus /></Button>
          <Button size="icon"><Mail /></Button>
          <Button size="icon-sm"><Plus /></Button>
          <Button variant="outline" size="icon"><Mail /></Button>
          <Button variant="secondary" size="icon"><Plus /></Button>
          <Button variant="secondary-outline" size="icon"><Mail /></Button>
        </Row>
      </Section>

      {/* ── Main Action ── */}
      <Section title="Main Action">
        <Row label="Sizes">
          <Button variant="main-action" size="lg">Button <ArrowRight /></Button>
          <Button variant="main-action">Button <ArrowRight /></Button>
          <Button variant="main-action" size="sm">Button <ArrowRight /></Button>
        </Row>
      </Section>

      {/* ── States ── */}
      <Section title="States">
        <Row label="Disabled">
          <Button disabled>Primary</Button>
          <Button variant="outline" disabled>Outlined</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="ghost" disabled>Ghost</Button>
        </Row>
        <Row label="Loading">
          <Button disabled><Loader2 className="animate-spin" /> Loading</Button>
          <Button variant="secondary" disabled><Loader2 className="animate-spin" /> Loading</Button>
        </Row>
      </Section>

      {/* ── Destructive & Link ── */}
      <Section title="Utility">
        <Row label="Destructive">
          <Button variant="destructive" size="lg">Delete</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="destructive" size="sm">Delete</Button>
        </Row>
        <Row label="Link">
          <Button variant="link">Link Button</Button>
        </Row>
      </Section>
    </div>
  );
}

/* ─── Layout helpers ─── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-4">{title}</h4>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="w-20 text-xs text-muted-foreground shrink-0">{label}</span>
      {children}
    </div>
  );
}
