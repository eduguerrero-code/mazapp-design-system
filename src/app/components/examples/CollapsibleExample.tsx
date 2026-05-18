import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

export default function CollapsibleExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Basic Collapsible</h3>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Can I use this in my project?
              <ChevronDown className="size-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">
              Yes. Free to use for personal and commercial projects. No attribution required.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Controlled Collapsible</h3>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {isOpen ? "Hide" : "Show"} Details
              <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            <div className="p-4 border rounded-lg">
              <p className="text-sm">Item 1</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm">Item 2</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm">Item 3</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
